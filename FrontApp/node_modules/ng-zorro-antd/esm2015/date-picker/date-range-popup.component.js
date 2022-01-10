/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CandyDate, cloneDate, wrongSortOrder } from 'ng-zorro-antd/core/time';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import { getTimeConfig, isAllowedDate, PREFIX_CLASS } from './util';
export class DateRangePopupComponent {
    constructor(datePickerService, cdr) {
        this.datePickerService = datePickerService;
        this.cdr = cdr;
        this.panelModeChange = new EventEmitter();
        this.calendarChange = new EventEmitter();
        this.resultOk = new EventEmitter(); // Emitted when done with date selecting
        this.prefixCls = PREFIX_CLASS;
        this.endPanelMode = 'date';
        this.timeOptions = null;
        this.hoverValue = []; // Range ONLY
        this.checkedPartArr = [false, false];
        this.destroy$ = new Subject();
        this.disabledStartTime = (value) => {
            return this.disabledTime && this.disabledTime(value, 'start');
        };
        this.disabledEndTime = (value) => {
            return this.disabledTime && this.disabledTime(value, 'end');
        };
    }
    get hasTimePicker() {
        return !!this.showTime;
    }
    get hasFooter() {
        return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
    }
    ngOnInit() {
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateActiveDate();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        // Parse showTime options
        if (changes.showTime || changes.disabledTime) {
            if (this.showTime) {
                this.buildTimeOptions();
            }
        }
        if (changes.panelMode) {
            this.endPanelMode = this.panelMode;
        }
        if (changes.defaultPickerValue) {
            this.updateActiveDate();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateActiveDate() {
        const activeDate = this.datePickerService.hasValue()
            ? this.datePickerService.value
            : this.datePickerService.makeValue(this.defaultPickerValue);
        this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode));
    }
    init() {
        this.checkedPartArr = [false, false];
        this.updateActiveDate();
    }
    onClickOk() {
        const inputIndex = { left: 0, right: 1 }[this.datePickerService.activeInput];
        const value = this.isRange
            ? this.datePickerService.value[inputIndex]
            : this.datePickerService.value;
        this.changeValueFromSelect(value);
        this.resultOk.emit();
    }
    onClickToday(value) {
        this.changeValueFromSelect(value, !this.showTime);
    }
    onCellHover(value) {
        if (!this.isRange) {
            return;
        }
        const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
        const base = this.datePickerService.value[otherInputIndex];
        if (base) {
            if (base.isBeforeDay(value)) {
                this.hoverValue = [base, value];
            }
            else {
                this.hoverValue = [value, base];
            }
        }
    }
    onPanelModeChange(mode, partType) {
        if (this.isRange) {
            const index = this.datePickerService.getActiveIndex(partType);
            if (index === 0) {
                this.panelMode = [mode, this.panelMode[1]];
            }
            else {
                this.panelMode = [this.panelMode[0], mode];
            }
        }
        else {
            this.panelMode = mode;
        }
        this.panelModeChange.emit(this.panelMode);
    }
    onActiveDateChange(value, partType) {
        if (this.isRange) {
            const activeDate = [];
            activeDate[this.datePickerService.getActiveIndex(partType)] = value;
            this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode, partType));
        }
        else {
            this.datePickerService.setActiveDate(value);
        }
    }
    onSelectTime(value, partType) {
        if (this.isRange) {
            const newValue = cloneDate(this.datePickerService.value);
            const index = this.datePickerService.getActiveIndex(partType);
            newValue[index] = this.overrideHms(value, newValue[index]);
            this.datePickerService.setValue(newValue);
        }
        else {
            const newValue = this.overrideHms(value, this.datePickerService.value);
            this.datePickerService.setValue(newValue); // If not select a date currently, use today
        }
        this.datePickerService.inputPartChange$.next();
        this.buildTimeOptions();
    }
    changeValueFromSelect(value, emitValue = true) {
        if (this.isRange) {
            const selectedValue = cloneDate(this.datePickerService.value);
            const checkedPart = this.datePickerService.activeInput;
            let nextPart = checkedPart;
            selectedValue[this.datePickerService.getActiveIndex(checkedPart)] = value;
            this.checkedPartArr[this.datePickerService.getActiveIndex(checkedPart)] = true;
            this.hoverValue = selectedValue;
            if (emitValue) {
                /**
                 * if sort order is wrong, clear the other part's value
                 */
                if (wrongSortOrder(selectedValue)) {
                    nextPart = this.reversedPart(checkedPart);
                    selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
                    this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
                }
                this.datePickerService.setValue(selectedValue);
                /**
                 * range date usually selected paired,
                 * so we emit the date value only both date is allowed and both part are checked
                 */
                if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
                    this.calendarChange.emit(selectedValue);
                    this.clearHoverValue();
                    this.datePickerService.emitValue$.next();
                }
                else if (this.isAllowed(selectedValue)) {
                    nextPart = this.reversedPart(checkedPart);
                    this.calendarChange.emit([value.clone()]);
                }
            }
            else {
                this.datePickerService.setValue(selectedValue);
            }
            this.datePickerService.inputPartChange$.next(nextPart);
        }
        else {
            this.datePickerService.setValue(value);
            this.datePickerService.inputPartChange$.next();
            if (emitValue && this.isAllowed(value)) {
                this.datePickerService.emitValue$.next();
            }
        }
    }
    reversedPart(part) {
        return part === 'left' ? 'right' : 'left';
    }
    getPanelMode(panelMode, partType) {
        if (this.isRange) {
            return panelMode[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return panelMode;
        }
    }
    // Get single value or part value of a range
    getValue(partType) {
        if (this.isRange) {
            return (this.datePickerService.value || [])[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return this.datePickerService.value;
        }
    }
    getActiveDate(partType) {
        if (this.isRange) {
            return this.datePickerService.activeDate[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return this.datePickerService.activeDate;
        }
    }
    isOneAllowed(selectedValue) {
        const index = this.datePickerService.getActiveIndex();
        const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
        return isAllowedDate(selectedValue[index], this.disabledDate, disabledTimeArr[index]);
    }
    isBothAllowed(selectedValue) {
        return (isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime) &&
            isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime));
    }
    isAllowed(value, isBoth = false) {
        if (this.isRange) {
            return isBoth ? this.isBothAllowed(value) : this.isOneAllowed(value);
        }
        else {
            return isAllowedDate(value, this.disabledDate, this.disabledTime);
        }
    }
    getTimeOptions(partType) {
        if (this.showTime && this.timeOptions) {
            return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
        }
        return null;
    }
    onClickPresetRange(val) {
        const value = typeof val === 'function' ? val() : val;
        if (value) {
            this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
            this.datePickerService.emitValue$.next();
        }
    }
    onPresetRangeMouseLeave() {
        this.clearHoverValue();
    }
    onHoverPresetRange(val) {
        if (typeof val !== 'function') {
            this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
        }
    }
    getObjectKeys(obj) {
        return obj ? Object.keys(obj) : [];
    }
    show(partType) {
        const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
        return !hide;
    }
    clearHoverValue() {
        this.hoverValue = [];
    }
    buildTimeOptions() {
        if (this.showTime) {
            const showTime = typeof this.showTime === 'object' ? this.showTime : {};
            if (this.isRange) {
                const value = this.datePickerService.value;
                this.timeOptions = [this.overrideTimeOptions(showTime, value[0], 'start'), this.overrideTimeOptions(showTime, value[1], 'end')];
            }
            else {
                this.timeOptions = this.overrideTimeOptions(showTime, this.datePickerService.value);
            }
        }
        else {
            this.timeOptions = null;
        }
    }
    overrideTimeOptions(origin, value, partial) {
        let disabledTimeFn;
        if (partial) {
            disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
        }
        else {
            disabledTimeFn = this.disabledTime;
        }
        return Object.assign(Object.assign({}, origin), getTimeConfig(value, disabledTimeFn));
    }
    overrideHms(newValue, oldValue) {
        // tslint:disable-next-line:no-parameter-reassignment
        newValue = newValue || new CandyDate();
        // tslint:disable-next-line:no-parameter-reassignment
        oldValue = oldValue || new CandyDate();
        return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
    }
}
DateRangePopupComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'date-range-popup',
                exportAs: 'dateRangePopup',
                template: `
    <ng-container *ngIf="isRange; else singlePanel">
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [style.left.px]="datePickerService?.arrowLeft"></div>
        <div class="{{ prefixCls }}-panel-container">
          <div class="{{ prefixCls }}-panels">
            <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'left' }"></ng-container>
            <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'right' }"></ng-container>
          </div>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-container>
    <ng-template #singlePanel>
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup"></ng-container>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-template>

    <ng-template #tplInnerPopup let-partType="partType">
      <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
      <inner-popup
        *ngIf="show(partType)"
        [showWeek]="showWeek"
        [endPanelMode]="getPanelMode(endPanelMode, partType)"
        [partType]="partType"
        [locale]="locale!"
        [showTimePicker]="hasTimePicker"
        [timeOptions]="getTimeOptions(partType)"
        [panelMode]="getPanelMode(panelMode, partType)"
        (panelModeChange)="onPanelModeChange($event, partType)"
        [activeDate]="getActiveDate(partType)"
        [value]="getValue(partType)"
        [disabledDate]="disabledDate"
        [dateRender]="dateRender"
        [selectedValue]="$any(datePickerService?.value)"
        [hoverValue]="$any(hoverValue)"
        (cellHover)="onCellHover($event)"
        (selectDate)="changeValueFromSelect($event, !showTime)"
        (selectTime)="onSelectTime($event, partType)"
        (headerChange)="onActiveDateChange($event, partType)"
      ></inner-popup>
    </ng-template>

    <ng-template #tplFooter>
      <calendar-footer
        *ngIf="hasFooter"
        [locale]="locale!"
        [isRange]="isRange"
        [showToday]="showToday"
        [hasTimePicker]="hasTimePicker"
        [okDisabled]="!isAllowed($any(datePickerService?.value))"
        [extraFooter]="extraFooter"
        [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
        (clickOk)="onClickOk()"
        (clickToday)="onClickToday($event)"
      ></calendar-footer>
    </ng-template>

    <ng-template #tplRangePart let-partType="partType">
      <div class="{{ prefixCls }}-panel">
        <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: partType }"></ng-container>
      </div>
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      <li
        *ngFor="let name of getObjectKeys(ranges)"
        class="{{ prefixCls }}-preset"
        (click)="onClickPresetRange(ranges![name])"
        (mouseenter)="onHoverPresetRange(ranges![name])"
        (mouseleave)="onPresetRangeMouseLeave()"
      >
        <span class="ant-tag ant-tag-blue">{{ name }}</span>
      </li>
    </ng-template>
  `
            },] }
];
DateRangePopupComponent.ctorParameters = () => [
    { type: DatePickerService },
    { type: ChangeDetectorRef }
];
DateRangePopupComponent.propDecorators = {
    isRange: [{ type: Input }],
    showWeek: [{ type: Input }],
    locale: [{ type: Input }],
    disabledDate: [{ type: Input }],
    disabledTime: [{ type: Input }],
    showToday: [{ type: Input }],
    showTime: [{ type: Input }],
    extraFooter: [{ type: Input }],
    ranges: [{ type: Input }],
    dateRender: [{ type: Input }],
    panelMode: [{ type: Input }],
    defaultPickerValue: [{ type: Input }],
    panelModeChange: [{ type: Output }],
    calendarChange: [{ type: Output }],
    resultOk: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS1wb3B1cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZS1yYW5nZS1wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBZ0QsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHN0gsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFXMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBK0ZwRSxNQUFNLE9BQU8sdUJBQXVCO0lBZ0NsQyxZQUFtQixpQkFBb0MsRUFBUyxHQUFzQjtRQUFuRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFuQm5FLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQTZCLENBQUM7UUFDaEUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUNyRCxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQyxDQUFDLHdDQUF3QztRQUVoRyxjQUFTLEdBQVcsWUFBWSxDQUFDO1FBQ2pDLGlCQUFZLEdBQThCLE1BQU0sQ0FBQztRQUNqRCxnQkFBVyxHQUFxRCxJQUFJLENBQUM7UUFDckUsZUFBVSxHQUFrQixFQUFFLENBQUMs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QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sTUFBTTt1QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYW5keURhdGUsIGNsb25lRGF0ZSwgQ29tcGF0aWJsZVZhbHVlLCBOb3JtYWxpemVkTW9kZSwgU2luZ2xlVmFsdWUsIHdyb25nU29ydE9yZGVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgRnVuY3Rpb25Qcm9wIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERhdGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9kYXRlLXBpY2tlci5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbXBhdGlibGVEYXRlLFxuICBEaXNhYmxlZERhdGVGbixcbiAgRGlzYWJsZWRUaW1lRm4sXG4gIERpc2FibGVkVGltZVBhcnRpYWwsXG4gIE56RGF0ZU1vZGUsXG4gIFByZXNldFJhbmdlcyxcbiAgUmFuZ2VQYXJ0VHlwZSxcbiAgU3VwcG9ydFRpbWVPcHRpb25zXG59IGZyb20gJy4vc3RhbmRhcmQtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0VGltZUNvbmZpZywgaXNBbGxvd2VkRGF0ZSwgUFJFRklYX0NMQVNTIH0gZnJvbSAnLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnZGF0ZS1yYW5nZS1wb3B1cCcsXG4gIGV4cG9ydEFzOiAnZGF0ZVJhbmdlUG9wdXAnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1JhbmdlOyBlbHNlIHNpbmdsZVBhbmVsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LXJhbmdlLXdyYXBwZXIge3sgcHJlZml4Q2xzIH19LWRhdGUtcmFuZ2Utd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LXJhbmdlLWFycm93XCIgW3N0eWxlLmxlZnQucHhdPVwiZGF0ZVBpY2tlclNlcnZpY2U/LmFycm93TGVmdFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LXBhbmVsLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tcGFuZWxzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidHBsUmFuZ2VQYXJ0OyBjb250ZXh0OiB7IHBhcnRUeXBlOiAnbGVmdCcgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbFJhbmdlUGFydDsgY29udGV4dDogeyBwYXJ0VHlwZTogJ3JpZ2h0JyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbEZvb3RlclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjc2luZ2xlUGFuZWw+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LXBhbmVsLWNvbnRhaW5lciB7eyBzaG93V2VlayA/IHByZWZpeENscyArICctd2Vlay1udW1iZXInIDogJycgfX0ge3tcbiAgICAgICAgICBoYXNUaW1lUGlja2VyID8gcHJlZml4Q2xzICsgJy10aW1lJyA6ICcnXG4gICAgICAgIH19IHt7IGlzUmFuZ2UgPyBwcmVmaXhDbHMgKyAnLXJhbmdlJyA6ICcnIH19XCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cInt7IHByZWZpeENscyB9fS1wYW5lbFwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICAgICAgICA8IS0tIFNpbmdsZSBPTkxZIC0tPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cGxJbm5lclBvcHVwXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbEZvb3RlclwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgI3RwbElubmVyUG9wdXAgbGV0LXBhcnRUeXBlPVwicGFydFR5cGVcIj5cbiAgICAgIDwhLS0gVE9ETyhAd2VucWk3MykgW3NlbGVjdGVkVmFsdWVdIFtob3ZlclZhbHVlXSB0eXBlcy0tPlxuICAgICAgPGlubmVyLXBvcHVwXG4gICAgICAgICpuZ0lmPVwic2hvdyhwYXJ0VHlwZSlcIlxuICAgICAgICBbc2hvd1dlZWtdPVwic2hvd1dlZWtcIlxuICAgICAgICBbZW5kUGFuZWxNb2RlXT1cImdldFBhbmVsTW9kZShlbmRQYW5lbE1vZGUsIHBhcnRUeXBlKVwiXG4gICAgICAgIFtwYXJ0VHlwZV09XCJwYXJ0VHlwZVwiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlIVwiXG4gICAgICAgIFtzaG93VGltZVBpY2tlcl09XCJoYXNUaW1lUGlja2VyXCJcbiAgICAgICAgW3RpbWVPcHRpb25zXT1cImdldFRpbWVPcHRpb25zKHBhcnRUeXBlKVwiXG4gICAgICAgIFtwYW5lbE1vZGVdPVwiZ2V0UGFuZWxNb2RlKHBhbmVsTW9kZSwgcGFydFR5cGUpXCJcbiAgICAgICAgKHBhbmVsTW9kZUNoYW5nZSk9XCJvblBhbmVsTW9kZUNoYW5nZSgkZXZlbnQsIHBhcnRUeXBlKVwiXG4gICAgICAgIFthY3RpdmVEYXRlXT1cImdldEFjdGl2ZURhdGUocGFydFR5cGUpXCJcbiAgICAgICAgW3ZhbHVlXT1cImdldFZhbHVlKHBhcnRUeXBlKVwiXG4gICAgICAgIFtkaXNhYmxlZERhdGVdPVwiZGlzYWJsZWREYXRlXCJcbiAgICAgICAgW2RhdGVSZW5kZXJdPVwiZGF0ZVJlbmRlclwiXG4gICAgICAgIFtzZWxlY3RlZFZhbHVlXT1cIiRhbnkoZGF0ZVBpY2tlclNlcnZpY2U/LnZhbHVlKVwiXG4gICAgICAgIFtob3ZlclZhbHVlXT1cIiRhbnkoaG92ZXJWYWx1ZSlcIlxuICAgICAgICAoY2VsbEhvdmVyKT1cIm9uQ2VsbEhvdmVyKCRldmVudClcIlxuICAgICAgICAoc2VsZWN0RGF0ZSk9XCJjaGFuZ2VWYWx1ZUZyb21TZWxlY3QoJGV2ZW50LCAhc2hvd1RpbWUpXCJcbiAgICAgICAgKHNlbGVjdFRpbWUpPVwib25TZWxlY3RUaW1lKCRldmVudCwgcGFydFR5cGUpXCJcbiAgICAgICAgKGhlYWRlckNoYW5nZSk9XCJvbkFjdGl2ZURhdGVDaGFuZ2UoJGV2ZW50LCBwYXJ0VHlwZSlcIlxuICAgICAgPjwvaW5uZXItcG9wdXA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjdHBsRm9vdGVyPlxuICAgICAgPGNhbGVuZGFyLWZvb3RlclxuICAgICAgICAqbmdJZj1cImhhc0Zvb3RlclwiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlIVwiXG4gICAgICAgIFtpc1JhbmdlXT1cImlzUmFuZ2VcIlxuICAgICAgICBbc2hvd1RvZGF5XT1cInNob3dUb2RheVwiXG4gICAgICAgIFtoYXNUaW1lUGlja2VyXT1cImhhc1RpbWVQaWNrZXJcIlxuICAgICAgICBbb2tEaXNhYmxlZF09XCIhaXNBbGxvd2VkKCRhbnkoZGF0ZVBpY2tlclNlcnZpY2U/LnZhbHVlKSlcIlxuICAgICAgICBbZXh0cmFGb290ZXJdPVwiZXh0cmFGb290ZXJcIlxuICAgICAgICBbcmFuZ2VRdWlja1NlbGVjdG9yXT1cInJhbmdlcyA/IHRwbFJhbmdlUXVpY2tTZWxlY3RvciA6IG51bGxcIlxuICAgICAgICAoY2xpY2tPayk9XCJvbkNsaWNrT2soKVwiXG4gICAgICAgIChjbGlja1RvZGF5KT1cIm9uQ2xpY2tUb2RheSgkZXZlbnQpXCJcbiAgICAgID48L2NhbGVuZGFyLWZvb3Rlcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICN0cGxSYW5nZVBhcnQgbGV0LXBhcnRUeXBlPVwicGFydFR5cGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ7eyBwcmVmaXhDbHMgfX0tcGFuZWxcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRwbElubmVyUG9wdXA7IGNvbnRleHQ6IHsgcGFydFR5cGU6IHBhcnRUeXBlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tIFJhbmdlIE9OTFk6IFJhbmdlIFF1aWNrIFNlbGVjdG9yIC0tPlxuICAgIDxuZy10ZW1wbGF0ZSAjdHBsUmFuZ2VRdWlja1NlbGVjdG9yPlxuICAgICAgPGxpXG4gICAgICAgICpuZ0Zvcj1cImxldCBuYW1lIG9mIGdldE9iamVjdEtleXMocmFuZ2VzKVwiXG4gICAgICAgIGNsYXNzPVwie3sgcHJlZml4Q2xzIH19LXByZXNldFwiXG4gICAgICAgIChjbGljayk9XCJvbkNsaWNrUHJlc2V0UmFuZ2UocmFuZ2VzIVtuYW1lXSlcIlxuICAgICAgICAobW91c2VlbnRlcik9XCJvbkhvdmVyUHJlc2V0UmFuZ2UocmFuZ2VzIVtuYW1lXSlcIlxuICAgICAgICAobW91c2VsZWF2ZSk9XCJvblByZXNldFJhbmdlTW91c2VMZWF2ZSgpXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFnIGFudC10YWctYmx1ZVwiPnt7IG5hbWUgfX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaXNSYW5nZSE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dXZWVrITogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9jYWxlITogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2UgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGRpc2FibGVkRGF0ZT86IERpc2FibGVkRGF0ZUZuO1xuICBASW5wdXQoKSBkaXNhYmxlZFRpbWU/OiBEaXNhYmxlZFRpbWVGbjsgLy8gVGhpcyB3aWxsIGxlYWQgdG8gcmVidWlsZCB0aW1lIG9wdGlvbnNcbiAgQElucHV0KCkgc2hvd1RvZGF5ITogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1RpbWUhOiBTdXBwb3J0VGltZU9wdGlvbnMgfCBib29sZWFuO1xuICBASW5wdXQoKSBleHRyYUZvb3Rlcj86IFRlbXBsYXRlUmVmPHZvaWQ+IHwgc3RyaW5nO1xuICBASW5wdXQoKSByYW5nZXM/OiBQcmVzZXRSYW5nZXM7XG4gIEBJbnB1dCgpIGRhdGVSZW5kZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxEYXRlPiB8IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZz47XG4gIEBJbnB1dCgpIHBhbmVsTW9kZSE6IE56RGF0ZU1vZGUgfCBOekRhdGVNb2RlW107XG4gIEBJbnB1dCgpIGRlZmF1bHRQaWNrZXJWYWx1ZSE6IENvbXBhdGlibGVEYXRlIHwgdW5kZWZpbmVkIHwgbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhbmVsTW9kZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpEYXRlTW9kZSB8IE56RGF0ZU1vZGVbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNhbGVuZGFyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb21wYXRpYmxlVmFsdWU+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSByZXN1bHRPayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTsgLy8gRW1pdHRlZCB3aGVuIGRvbmUgd2l0aCBkYXRlIHNlbGVjdGluZ1xuXG4gIHByZWZpeENsczogc3RyaW5nID0gUFJFRklYX0NMQVNTO1xuICBlbmRQYW5lbE1vZGU6IE56RGF0ZU1vZGUgfCBOekRhdGVNb2RlW10gPSAnZGF0ZSc7XG4gIHRpbWVPcHRpb25zOiBTdXBwb3J0VGltZU9wdGlvbnMgfCBTdXBwb3J0VGltZU9wdGlvbnNbXSB8IG51bGwgPSBudWxsO1xuICBob3ZlclZhbHVlOiBTaW5nbGVWYWx1ZVtdID0gW107IC8vIFJhbmdlIE9OTFlcbiAgY2hlY2tlZFBhcnRBcnI6IGJvb2xlYW5bXSA9IFtmYWxzZSwgZmFsc2VdO1xuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgZ2V0IGhhc1RpbWVQaWNrZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zaG93VGltZTtcbiAgfVxuXG4gIGdldCBoYXNGb290ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1RvZGF5IHx8IHRoaXMuaGFzVGltZVBpY2tlciB8fCAhIXRoaXMuZXh0cmFGb290ZXIgfHwgISF0aGlzLnJhbmdlcztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlUGlja2VyU2VydmljZTogRGF0ZVBpY2tlclNlcnZpY2UsIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWVDaGFuZ2UkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVBY3RpdmVEYXRlKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAvLyBQYXJzZSBzaG93VGltZSBvcHRpb25zXG4gICAgaWYgKGNoYW5nZXMuc2hvd1RpbWUgfHwgY2hhbmdlcy5kaXNhYmxlZFRpbWUpIHtcbiAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgIHRoaXMuYnVpbGRUaW1lT3B0aW9ucygpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5wYW5lbE1vZGUpIHtcbiAgICAgIHRoaXMuZW5kUGFuZWxNb2RlID0gdGhpcy5wYW5lbE1vZGU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmRlZmF1bHRQaWNrZXJWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVBY3RpdmVEYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgdXBkYXRlQWN0aXZlRGF0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBhY3RpdmVEYXRlID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5oYXNWYWx1ZSgpXG4gICAgICA/IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWVcbiAgICAgIDogdGhpcy5kYXRlUGlja2VyU2VydmljZS5tYWtlVmFsdWUodGhpcy5kZWZhdWx0UGlja2VyVmFsdWUhKTtcbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNldEFjdGl2ZURhdGUoYWN0aXZlRGF0ZSwgdGhpcy5oYXNUaW1lUGlja2VyLCB0aGlzLmdldFBhbmVsTW9kZSh0aGlzLmVuZFBhbmVsTW9kZSkgYXMgTm9ybWFsaXplZE1vZGUpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrZWRQYXJ0QXJyID0gW2ZhbHNlLCBmYWxzZV07XG4gICAgdGhpcy51cGRhdGVBY3RpdmVEYXRlKCk7XG4gIH1cblxuICBvbkNsaWNrT2soKTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRJbmRleCA9IHsgbGVmdDogMCwgcmlnaHQ6IDEgfVt0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFjdGl2ZUlucHV0XTtcbiAgICBjb25zdCB2YWx1ZTogQ2FuZHlEYXRlID0gdGhpcy5pc1JhbmdlXG4gICAgICA/ICh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlIGFzIENhbmR5RGF0ZVtdKVtpbnB1dEluZGV4XVxuICAgICAgOiAodGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZSBhcyBDYW5keURhdGUpO1xuICAgIHRoaXMuY2hhbmdlVmFsdWVGcm9tU2VsZWN0KHZhbHVlKTtcbiAgICB0aGlzLnJlc3VsdE9rLmVtaXQoKTtcbiAgfVxuXG4gIG9uQ2xpY2tUb2RheSh2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZUZyb21TZWxlY3QodmFsdWUsICF0aGlzLnNob3dUaW1lKTtcbiAgfVxuXG4gIG9uQ2VsbEhvdmVyKHZhbHVlOiBDYW5keURhdGUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNSYW5nZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvdGhlcklucHV0SW5kZXggPSB7IGxlZnQ6IDEsIHJpZ2h0OiAwIH1bdGhpcy5kYXRlUGlja2VyU2VydmljZS5hY3RpdmVJbnB1dF07XG4gICAgY29uc3QgYmFzZSA9ICh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlIGFzIENhbmR5RGF0ZVtdKVtvdGhlcklucHV0SW5kZXhdITtcbiAgICBpZiAoYmFzZSkge1xuICAgICAgaWYgKGJhc2UuaXNCZWZvcmVEYXkodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuaG92ZXJWYWx1ZSA9IFtiYXNlLCB2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhvdmVyVmFsdWUgPSBbdmFsdWUsIGJhc2VdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUGFuZWxNb2RlQ2hhbmdlKG1vZGU6IE56RGF0ZU1vZGUsIHBhcnRUeXBlPzogUmFuZ2VQYXJ0VHlwZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRBY3RpdmVJbmRleChwYXJ0VHlwZSk7XG4gICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy5wYW5lbE1vZGUgPSBbbW9kZSwgdGhpcy5wYW5lbE1vZGVbMV1dIGFzIE56RGF0ZU1vZGVbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFuZWxNb2RlID0gW3RoaXMucGFuZWxNb2RlWzBdLCBtb2RlXSBhcyBOekRhdGVNb2RlW107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFuZWxNb2RlID0gbW9kZTtcbiAgICB9XG4gICAgdGhpcy5wYW5lbE1vZGVDaGFuZ2UuZW1pdCh0aGlzLnBhbmVsTW9kZSk7XG4gIH1cblxuICBvbkFjdGl2ZURhdGVDaGFuZ2UodmFsdWU6IENhbmR5RGF0ZSwgcGFydFR5cGU6IFJhbmdlUGFydFR5cGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICBjb25zdCBhY3RpdmVEYXRlOiBTaW5nbGVWYWx1ZVtdID0gW107XG4gICAgICBhY3RpdmVEYXRlW3RoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0QWN0aXZlSW5kZXgocGFydFR5cGUpXSA9IHZhbHVlO1xuICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRBY3RpdmVEYXRlKFxuICAgICAgICBhY3RpdmVEYXRlLFxuICAgICAgICB0aGlzLmhhc1RpbWVQaWNrZXIsXG4gICAgICAgIHRoaXMuZ2V0UGFuZWxNb2RlKHRoaXMuZW5kUGFuZWxNb2RlLCBwYXJ0VHlwZSkgYXMgTm9ybWFsaXplZE1vZGVcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2V0QWN0aXZlRGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25TZWxlY3RUaW1lKHZhbHVlOiBDYW5keURhdGUsIHBhcnRUeXBlPzogUmFuZ2VQYXJ0VHlwZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY2xvbmVEYXRlKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUpIGFzIFNpbmdsZVZhbHVlW107XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0QWN0aXZlSW5kZXgocGFydFR5cGUpO1xuICAgICAgbmV3VmFsdWVbaW5kZXhdID0gdGhpcy5vdmVycmlkZUhtcyh2YWx1ZSwgbmV3VmFsdWVbaW5kZXhdKTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2V0VmFsdWUobmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMub3ZlcnJpZGVIbXModmFsdWUsIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUgYXMgQ2FuZHlEYXRlKTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2V0VmFsdWUobmV3VmFsdWUpOyAvLyBJZiBub3Qgc2VsZWN0IGEgZGF0ZSBjdXJyZW50bHksIHVzZSB0b2RheVxuICAgIH1cbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0UGFydENoYW5nZSQubmV4dCgpO1xuICAgIHRoaXMuYnVpbGRUaW1lT3B0aW9ucygpO1xuICB9XG5cbiAgY2hhbmdlVmFsdWVGcm9tU2VsZWN0KHZhbHVlOiBDYW5keURhdGUsIGVtaXRWYWx1ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZFZhbHVlOiBTaW5nbGVWYWx1ZVtdID0gY2xvbmVEYXRlKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUpIGFzIENhbmR5RGF0ZVtdO1xuICAgICAgY29uc3QgY2hlY2tlZFBhcnQ6IFJhbmdlUGFydFR5cGUgPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFjdGl2ZUlucHV0O1xuICAgICAgbGV0IG5leHRQYXJ0OiBSYW5nZVBhcnRUeXBlID0gY2hlY2tlZFBhcnQ7XG5cbiAgICAgIHNlbGVjdGVkVmFsdWVbdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRBY3RpdmVJbmRleChjaGVja2VkUGFydCldID0gdmFsdWU7XG4gICAgICB0aGlzLmNoZWNrZWRQYXJ0QXJyW3RoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0QWN0aXZlSW5kZXgoY2hlY2tlZFBhcnQpXSA9IHRydWU7XG4gICAgICB0aGlzLmhvdmVyVmFsdWUgPSBzZWxlY3RlZFZhbHVlO1xuXG4gICAgICBpZiAoZW1pdFZhbHVlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpZiBzb3J0IG9yZGVyIGlzIHdyb25nLCBjbGVhciB0aGUgb3RoZXIgcGFydCdzIHZhbHVlXG4gICAgICAgICAqL1xuICAgICAgICBpZiAod3JvbmdTb3J0T3JkZXIoc2VsZWN0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICBuZXh0UGFydCA9IHRoaXMucmV2ZXJzZWRQYXJ0KGNoZWNrZWRQYXJ0KTtcbiAgICAgICAgICBzZWxlY3RlZFZhbHVlW3RoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0QWN0aXZlSW5kZXgobmV4dFBhcnQpXSA9IG51bGw7XG4gICAgICAgICAgdGhpcy5jaGVja2VkUGFydEFyclt0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KG5leHRQYXJ0KV0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2Uuc2V0VmFsdWUoc2VsZWN0ZWRWYWx1ZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJhbmdlIGRhdGUgdXN1YWxseSBzZWxlY3RlZCBwYWlyZWQsXG4gICAgICAgICAqIHNvIHdlIGVtaXQgdGhlIGRhdGUgdmFsdWUgb25seSBib3RoIGRhdGUgaXMgYWxsb3dlZCBhbmQgYm90aCBwYXJ0IGFyZSBjaGVja2VkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5pc0JvdGhBbGxvd2VkKHNlbGVjdGVkVmFsdWUpICYmIHRoaXMuY2hlY2tlZFBhcnRBcnJbMF0gJiYgdGhpcy5jaGVja2VkUGFydEFyclsxXSkge1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXJDaGFuZ2UuZW1pdChzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICB0aGlzLmNsZWFySG92ZXJWYWx1ZSgpO1xuICAgICAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZW1pdFZhbHVlJC5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0FsbG93ZWQoc2VsZWN0ZWRWYWx1ZSkpIHtcbiAgICAgICAgICBuZXh0UGFydCA9IHRoaXMucmV2ZXJzZWRQYXJ0KGNoZWNrZWRQYXJ0KTtcbiAgICAgICAgICB0aGlzLmNhbGVuZGFyQ2hhbmdlLmVtaXQoW3ZhbHVlLmNsb25lKCldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRWYWx1ZShzZWxlY3RlZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaW5wdXRQYXJ0Q2hhbmdlJC5uZXh0KG5leHRQYXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kYXRlUGlja2VyU2VydmljZS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlucHV0UGFydENoYW5nZSQubmV4dCgpO1xuXG4gICAgICBpZiAoZW1pdFZhbHVlICYmIHRoaXMuaXNBbGxvd2VkKHZhbHVlKSkge1xuICAgICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmVtaXRWYWx1ZSQubmV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldmVyc2VkUGFydChwYXJ0OiBSYW5nZVBhcnRUeXBlKTogUmFuZ2VQYXJ0VHlwZSB7XG4gICAgcmV0dXJuIHBhcnQgPT09ICdsZWZ0JyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gIH1cblxuICBnZXRQYW5lbE1vZGUocGFuZWxNb2RlOiBOekRhdGVNb2RlIHwgTnpEYXRlTW9kZVtdLCBwYXJ0VHlwZT86IFJhbmdlUGFydFR5cGUpOiBOekRhdGVNb2RlIHtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICByZXR1cm4gcGFuZWxNb2RlW3RoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZ2V0QWN0aXZlSW5kZXgocGFydFR5cGUpXSBhcyBOekRhdGVNb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFuZWxNb2RlIGFzIE56RGF0ZU1vZGU7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IHNpbmdsZSB2YWx1ZSBvciBwYXJ0IHZhbHVlIG9mIGEgcmFuZ2VcbiAgZ2V0VmFsdWUocGFydFR5cGU/OiBSYW5nZVBhcnRUeXBlKTogQ2FuZHlEYXRlIHtcbiAgICBpZiAodGhpcy5pc1JhbmdlKSB7XG4gICAgICByZXR1cm4gKCh0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlIGFzIENhbmR5RGF0ZVtdKSB8fCBbXSlbdGhpcy5kYXRlUGlja2VyU2VydmljZS5nZXRBY3RpdmVJbmRleChwYXJ0VHlwZSldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlUGlja2VyU2VydmljZS52YWx1ZSBhcyBDYW5keURhdGU7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWN0aXZlRGF0ZShwYXJ0VHlwZT86IFJhbmdlUGFydFR5cGUpOiBDYW5keURhdGUge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIHJldHVybiAodGhpcy5kYXRlUGlja2VyU2VydmljZS5hY3RpdmVEYXRlIGFzIENhbmR5RGF0ZVtdKVt0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KHBhcnRUeXBlKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmFjdGl2ZURhdGUgYXMgQ2FuZHlEYXRlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVkU3RhcnRUaW1lOiBEaXNhYmxlZFRpbWVGbiA9ICh2YWx1ZTogRGF0ZSB8IERhdGVbXSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkVGltZSAmJiB0aGlzLmRpc2FibGVkVGltZSh2YWx1ZSwgJ3N0YXJ0Jyk7XG4gIH07XG5cbiAgZGlzYWJsZWRFbmRUaW1lOiBEaXNhYmxlZFRpbWVGbiA9ICh2YWx1ZTogRGF0ZSB8IERhdGVbXSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkVGltZSAmJiB0aGlzLmRpc2FibGVkVGltZSh2YWx1ZSwgJ2VuZCcpO1xuICB9O1xuXG4gIGlzT25lQWxsb3dlZChzZWxlY3RlZFZhbHVlOiBTaW5nbGVWYWx1ZVtdKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KCk7XG4gICAgY29uc3QgZGlzYWJsZWRUaW1lQXJyID0gW3RoaXMuZGlzYWJsZWRTdGFydFRpbWUsIHRoaXMuZGlzYWJsZWRFbmRUaW1lXTtcbiAgICByZXR1cm4gaXNBbGxvd2VkRGF0ZShzZWxlY3RlZFZhbHVlW2luZGV4XSEsIHRoaXMuZGlzYWJsZWREYXRlLCBkaXNhYmxlZFRpbWVBcnJbaW5kZXhdKTtcbiAgfVxuXG4gIGlzQm90aEFsbG93ZWQoc2VsZWN0ZWRWYWx1ZTogU2luZ2xlVmFsdWVbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBpc0FsbG93ZWREYXRlKHNlbGVjdGVkVmFsdWVbMF0hLCB0aGlzLmRpc2FibGVkRGF0ZSwgdGhpcy5kaXNhYmxlZFN0YXJ0VGltZSkgJiZcbiAgICAgIGlzQWxsb3dlZERhdGUoc2VsZWN0ZWRWYWx1ZVsxXSEsIHRoaXMuZGlzYWJsZWREYXRlLCB0aGlzLmRpc2FibGVkRW5kVGltZSlcbiAgICApO1xuICB9XG5cbiAgaXNBbGxvd2VkKHZhbHVlOiBDb21wYXRpYmxlVmFsdWUsIGlzQm90aDogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgcmV0dXJuIGlzQm90aCA/IHRoaXMuaXNCb3RoQWxsb3dlZCh2YWx1ZSBhcyBDYW5keURhdGVbXSkgOiB0aGlzLmlzT25lQWxsb3dlZCh2YWx1ZSBhcyBDYW5keURhdGVbXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc0FsbG93ZWREYXRlKHZhbHVlIGFzIENhbmR5RGF0ZSwgdGhpcy5kaXNhYmxlZERhdGUsIHRoaXMuZGlzYWJsZWRUaW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXRUaW1lT3B0aW9ucyhwYXJ0VHlwZT86IFJhbmdlUGFydFR5cGUpOiBTdXBwb3J0VGltZU9wdGlvbnMgfCBudWxsIHtcbiAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLnRpbWVPcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy50aW1lT3B0aW9ucyBpbnN0YW5jZW9mIEFycmF5ID8gdGhpcy50aW1lT3B0aW9uc1t0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmdldEFjdGl2ZUluZGV4KHBhcnRUeXBlKV0gOiB0aGlzLnRpbWVPcHRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG9uQ2xpY2tQcmVzZXRSYW5nZSh2YWw6IFByZXNldFJhbmdlc1trZXlvZiBQcmVzZXRSYW5nZXNdKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nID8gdmFsKCkgOiB2YWw7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnNldFZhbHVlKFtuZXcgQ2FuZHlEYXRlKHZhbHVlWzBdKSwgbmV3IENhbmR5RGF0ZSh2YWx1ZVsxXSldKTtcbiAgICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuZW1pdFZhbHVlJC5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgb25QcmVzZXRSYW5nZU1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckhvdmVyVmFsdWUoKTtcbiAgfVxuXG4gIG9uSG92ZXJQcmVzZXRSYW5nZSh2YWw6IFByZXNldFJhbmdlc1trZXlvZiBQcmVzZXRSYW5nZXNdKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuaG92ZXJWYWx1ZSA9IFtuZXcgQ2FuZHlEYXRlKHZhbFswXSksIG5ldyBDYW5keURhdGUodmFsWzFdKV07XG4gICAgfVxuICB9XG5cbiAgZ2V0T2JqZWN0S2V5cyhvYmo/OiBQcmVzZXRSYW5nZXMpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIG9iaiA/IE9iamVjdC5rZXlzKG9iaikgOiBbXTtcbiAgfVxuXG4gIHNob3cocGFydFR5cGU6IFJhbmdlUGFydFR5cGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBoaWRlID0gdGhpcy5zaG93VGltZSAmJiB0aGlzLmlzUmFuZ2UgJiYgdGhpcy5kYXRlUGlja2VyU2VydmljZS5hY3RpdmVJbnB1dCAhPT0gcGFydFR5cGU7XG4gICAgcmV0dXJuICFoaWRlO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckhvdmVyVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5ob3ZlclZhbHVlID0gW107XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkVGltZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgIGNvbnN0IHNob3dUaW1lID0gdHlwZW9mIHRoaXMuc2hvd1RpbWUgPT09ICdvYmplY3QnID8gdGhpcy5zaG93VGltZSA6IHt9O1xuICAgICAgaWYgKHRoaXMuaXNSYW5nZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UudmFsdWUgYXMgQ2FuZHlEYXRlW107XG4gICAgICAgIHRoaXMudGltZU9wdGlvbnMgPSBbdGhpcy5vdmVycmlkZVRpbWVPcHRpb25zKHNob3dUaW1lLCB2YWx1ZVswXSwgJ3N0YXJ0JyksIHRoaXMub3ZlcnJpZGVUaW1lT3B0aW9ucyhzaG93VGltZSwgdmFsdWVbMV0sICdlbmQnKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRpbWVPcHRpb25zID0gdGhpcy5vdmVycmlkZVRpbWVPcHRpb25zKHNob3dUaW1lLCB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLnZhbHVlIGFzIENhbmR5RGF0ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZU9wdGlvbnMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVUaW1lT3B0aW9ucyhvcmlnaW46IFN1cHBvcnRUaW1lT3B0aW9ucywgdmFsdWU6IENhbmR5RGF0ZSwgcGFydGlhbD86IERpc2FibGVkVGltZVBhcnRpYWwpOiBTdXBwb3J0VGltZU9wdGlvbnMge1xuICAgIGxldCBkaXNhYmxlZFRpbWVGbjtcbiAgICBpZiAocGFydGlhbCkge1xuICAgICAgZGlzYWJsZWRUaW1lRm4gPSBwYXJ0aWFsID09PSAnc3RhcnQnID8gdGhpcy5kaXNhYmxlZFN0YXJ0VGltZSA6IHRoaXMuZGlzYWJsZWRFbmRUaW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNhYmxlZFRpbWVGbiA9IHRoaXMuZGlzYWJsZWRUaW1lO1xuICAgIH1cbiAgICByZXR1cm4geyAuLi5vcmlnaW4sIC4uLmdldFRpbWVDb25maWcodmFsdWUsIGRpc2FibGVkVGltZUZuKSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZUhtcyhuZXdWYWx1ZTogQ2FuZHlEYXRlIHwgbnVsbCwgb2xkVmFsdWU6IENhbmR5RGF0ZSB8IG51bGwpOiBDYW5keURhdGUge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgbmV3VmFsdWUgPSBuZXdWYWx1ZSB8fCBuZXcgQ2FuZHlEYXRlKCk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICBvbGRWYWx1ZSA9IG9sZFZhbHVlIHx8IG5ldyBDYW5keURhdGUoKTtcbiAgICByZXR1cm4gb2xkVmFsdWUuc2V0SG1zKG5ld1ZhbHVlLmdldEhvdXJzKCksIG5ld1ZhbHVlLmdldE1pbnV0ZXMoKSwgbmV3VmFsdWUuZ2V0U2Vjb25kcygpKTtcbiAgfVxufVxuIl19