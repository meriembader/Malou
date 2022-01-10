/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeHolder } from './time-holder';
function makeRange(length, step = 1, start = 0) {
    return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
export class NzTimePickerPanelComponent {
    constructor(cdr, dateHelper) {
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this._nzHourStep = 1;
        this._nzMinuteStep = 1;
        this._nzSecondStep = 1;
        this.unsubscribe$ = new Subject();
        this._format = 'HH:mm:ss';
        this._disabledHours = () => [];
        this._disabledMinutes = () => [];
        this._disabledSeconds = () => [];
        this._allowEmpty = true;
        this.time = new TimeHolder();
        this.hourEnabled = true;
        this.minuteEnabled = true;
        this.secondEnabled = true;
        this.firstScrolled = false;
        this.enabledColumns = 3;
        this.nzInDatePicker = false; // If inside a date-picker, more diff works need to be done
        this.nzHideDisabledOptions = false;
        this.nzUse12Hours = false;
        this.closePanel = new EventEmitter();
    }
    set nzAllowEmpty(value) {
        if (isNotNil(value)) {
            this._allowEmpty = value;
        }
    }
    get nzAllowEmpty() {
        return this._allowEmpty;
    }
    set nzDisabledHours(value) {
        this._disabledHours = value;
        if (!!this._disabledHours) {
            this.buildHours();
        }
    }
    get nzDisabledHours() {
        return this._disabledHours;
    }
    set nzDisabledMinutes(value) {
        if (isNotNil(value)) {
            this._disabledMinutes = value;
            this.buildMinutes();
        }
    }
    get nzDisabledMinutes() {
        return this._disabledMinutes;
    }
    set nzDisabledSeconds(value) {
        if (isNotNil(value)) {
            this._disabledSeconds = value;
            this.buildSeconds();
        }
    }
    get nzDisabledSeconds() {
        return this._disabledSeconds;
    }
    set format(value) {
        if (isNotNil(value)) {
            this._format = value;
            this.enabledColumns = 0;
            const charSet = new Set(value);
            this.hourEnabled = charSet.has('H') || charSet.has('h');
            this.minuteEnabled = charSet.has('m');
            this.secondEnabled = charSet.has('s');
            if (this.hourEnabled) {
                this.enabledColumns++;
            }
            if (this.minuteEnabled) {
                this.enabledColumns++;
            }
            if (this.secondEnabled) {
                this.enabledColumns++;
            }
            if (this.nzUse12Hours) {
                this.build12Hours();
            }
        }
    }
    get format() {
        return this._format;
    }
    set nzHourStep(value) {
        if (isNotNil(value)) {
            this._nzHourStep = value;
            this.buildHours();
        }
    }
    get nzHourStep() {
        return this._nzHourStep;
    }
    set nzMinuteStep(value) {
        if (isNotNil(value)) {
            this._nzMinuteStep = value;
            this.buildMinutes();
        }
    }
    get nzMinuteStep() {
        return this._nzMinuteStep;
    }
    set nzSecondStep(value) {
        if (isNotNil(value)) {
            this._nzSecondStep = value;
            this.buildSeconds();
        }
    }
    get nzSecondStep() {
        return this._nzSecondStep;
    }
    buildHours() {
        var _a;
        let hourRanges = 24;
        let disabledHours = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this);
        let startIndex = 0;
        if (this.nzUse12Hours) {
            hourRanges = 12;
            if (disabledHours) {
                if (this.time.selected12Hours === 'PM') {
                    /**
                     * Filter and transform hours which greater or equal to 12
                     * [0, 1, 2, ..., 12, 13, 14, 15, ..., 23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i >= 12).map(i => (i > 12 ? i - 12 : i));
                }
                else {
                    /**
                     * Filter and transform hours which less than 12
                     * [0, 1, 2,..., 12, 13, 14, 15, ...23] => [12, 1, 2, 3, ..., 11]
                     */
                    disabledHours = disabledHours.filter(i => i < 12 || i === 24).map(i => (i === 24 || i === 0 ? 12 : i));
                }
            }
            startIndex = 1;
        }
        this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map(r => {
            return {
                index: r,
                disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
            };
        });
        if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
            const temp = [...this.hourRange];
            temp.unshift(temp[temp.length - 1]);
            temp.splice(temp.length - 1, 1);
            this.hourRange = temp;
        }
    }
    buildMinutes() {
        this.minuteRange = makeRange(60, this.nzMinuteStep).map(r => {
            return {
                index: r,
                disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
            };
        });
    }
    buildSeconds() {
        this.secondRange = makeRange(60, this.nzSecondStep).map(r => {
            return {
                index: r,
                disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
            };
        });
    }
    build12Hours() {
        const isUpperFormat = this._format.includes('A');
        this.use12HoursRange = [
            {
                index: 0,
                value: isUpperFormat ? 'AM' : 'am'
            },
            {
                index: 1,
                value: isUpperFormat ? 'PM' : 'pm'
            }
        ];
    }
    buildTimes() {
        this.buildHours();
        this.buildMinutes();
        this.buildSeconds();
        this.build12Hours();
    }
    scrollToTime(delay = 0) {
        if (this.hourEnabled && this.hourListElement) {
            this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay, 'hour');
        }
        if (this.minuteEnabled && this.minuteListElement) {
            this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay, 'minute');
        }
        if (this.secondEnabled && this.secondListElement) {
            this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay, 'second');
        }
        if (this.nzUse12Hours && this.use12HoursListElement) {
            const selectedHours = this.time.selected12Hours;
            const index = selectedHours === 'AM' ? 0 : 1;
            this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, '12-hour');
        }
    }
    selectHour(hour) {
        this.time.setHours(hour.index, hour.disabled);
        if (!!this._disabledMinutes) {
            this.buildMinutes();
        }
        if (this._disabledSeconds || this._disabledMinutes) {
            this.buildSeconds();
        }
    }
    selectMinute(minute) {
        this.time.setMinutes(minute.index, minute.disabled);
        if (!!this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    selectSecond(second) {
        this.time.setSeconds(second.index, second.disabled);
    }
    select12Hours(value) {
        this.time.setSelected12Hours(value.value);
        if (!!this._disabledHours) {
            this.buildHours();
        }
        if (!!this._disabledMinutes) {
            this.buildMinutes();
        }
        if (!!this._disabledSeconds) {
            this.buildSeconds();
        }
    }
    scrollToSelected(instance, index, duration = 0, unit) {
        if (!instance) {
            return;
        }
        const transIndex = this.translateIndex(index, unit);
        const currentOption = (instance.children[transIndex] || instance.children[0]);
        this.scrollTo(instance, currentOption.offsetTop, duration);
    }
    translateIndex(index, unit) {
        var _a, _b, _c;
        if (unit === 'hour') {
            return this.calcIndex((_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this), this.hourRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'minute') {
            return this.calcIndex((_b = this.nzDisabledMinutes) === null || _b === void 0 ? void 0 : _b.call(this, this.time.hours), this.minuteRange.map(item => item.index).indexOf(index));
        }
        else if (unit === 'second') {
            // second
            return this.calcIndex((_c = this.nzDisabledSeconds) === null || _c === void 0 ? void 0 : _c.call(this, this.time.hours, this.time.minutes), this.secondRange.map(item => item.index).indexOf(index));
        }
        else {
            // 12-hour
            return this.calcIndex([], this.use12HoursRange.map(item => item.index).indexOf(index));
        }
    }
    scrollTo(element, to, duration) {
        if (duration <= 0) {
            element.scrollTop = to;
            return;
        }
        const difference = to - element.scrollTop;
        const perTick = (difference / duration) * 10;
        reqAnimFrame(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) {
                return;
            }
            this.scrollTo(element, to, duration - 10);
        });
    }
    calcIndex(array, index) {
        if ((array === null || array === void 0 ? void 0 : array.length) && this.nzHideDisabledOptions) {
            return (index -
                array.reduce((pre, value) => {
                    return pre + (value < index ? 1 : 0);
                }, 0));
        }
        else {
            return index;
        }
    }
    changed() {
        if (this.onChange) {
            this.onChange(this.time.value);
        }
    }
    touched() {
        if (this.onTouch) {
            this.onTouch();
        }
    }
    timeDisabled(value) {
        var _a, _b, _c, _d, _e, _f;
        const hour = value.getHours();
        const minute = value.getMinutes();
        const second = value.getSeconds();
        return (((_b = (_a = this.nzDisabledHours) === null || _a === void 0 ? void 0 : _a.call(this).indexOf(hour)) !== null && _b !== void 0 ? _b : -1) > -1 ||
            ((_d = (_c = this.nzDisabledMinutes) === null || _c === void 0 ? void 0 : _c.call(this, hour).indexOf(minute)) !== null && _d !== void 0 ? _d : -1) > -1 ||
            ((_f = (_e = this.nzDisabledSeconds) === null || _e === void 0 ? void 0 : _e.call(this, hour, minute).indexOf(second)) !== null && _f !== void 0 ? _f : -1) > -1);
    }
    onClickNow() {
        const now = new Date();
        if (this.timeDisabled(now)) {
            return;
        }
        this.time.setValue(now);
        this.changed();
        this.closePanel.emit();
    }
    onClickOk() {
        this.closePanel.emit();
    }
    isSelectedHour(hour) {
        return hour.index === this.time.viewHours;
    }
    isSelectedMinute(minute) {
        return minute.index === this.time.minutes;
    }
    isSelectedSecond(second) {
        return second.index === this.time.seconds;
    }
    isSelected12Hours(value) {
        return value.value.toUpperCase() === this.time.selected12Hours;
    }
    ngOnInit() {
        this.time.changes.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.changed();
            this.touched();
            this.scrollToTime(120);
        });
        this.buildTimes();
        setTimeout(() => {
            this.scrollToTime();
            this.firstScrolled = true;
        });
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnChanges(changes) {
        const { nzUse12Hours, nzDefaultOpenValue } = changes;
        if (!(nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.previousValue) && (nzUse12Hours === null || nzUse12Hours === void 0 ? void 0 : nzUse12Hours.currentValue)) {
            this.build12Hours();
            this.enabledColumns++;
        }
        if (nzDefaultOpenValue === null || nzDefaultOpenValue === void 0 ? void 0 : nzDefaultOpenValue.currentValue) {
            this.time.setDefaultOpenValue(this.nzDefaultOpenValue || new Date());
        }
    }
    writeValue(value) {
        this.time.setValue(value, this.nzUse12Hours);
        this.buildTimes();
        if (value && this.firstScrolled) {
            this.scrollToTime(120);
        }
        // Mark this component to be checked manually with internal properties changing (see: https://github.com/angular/angular/issues/10816)
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
}
NzTimePickerPanelComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-time-picker-panel',
                exportAs: 'nzTimePickerPanel',
                template: `
    <div *ngIf="nzInDatePicker" class="ant-picker-header">
      <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
    </div>
    <div class="ant-picker-content">
      <ul *ngIf="hourEnabled" #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let hour of hourRange">
          <li
            *ngIf="!(nzHideDisabledOptions && hour.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectHour(hour)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
            [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="minuteEnabled" #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let minute of minuteRange">
          <li
            *ngIf="!(nzHideDisabledOptions && minute.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectMinute(minute)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
            [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="secondEnabled" #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let second of secondRange">
          <li
            *ngIf="!(nzHideDisabledOptions && second.disabled)"
            class="ant-picker-time-panel-cell"
            (click)="selectSecond(second)"
            [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
            [class.ant-picker-time-panel-cell-disabled]="second.disabled"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
          </li>
        </ng-container>
      </ul>
      <ul *ngIf="nzUse12Hours" #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
        <ng-container *ngFor="let range of use12HoursRange">
          <li
            *ngIf="!nzHideDisabledOptions"
            (click)="select12Hours(range)"
            class="ant-picker-time-panel-cell"
            [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
          >
            <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
          </li>
        </ng-container>
      </ul>
    </div>
    <div *ngIf="!nzInDatePicker" class="ant-picker-footer">
      <div *ngIf="nzAddOn" class="ant-picker-footer-extra">
        <ng-template [ngTemplateOutlet]="nzAddOn"></ng-template>
      </div>
      <ul class="ant-picker-ranges">
        <li class="ant-picker-now">
          <a (click)="onClickNow()">
            {{ 'Calendar.lang.now' | nzI18n }}
          </a>
        </li>
        <li class="ant-picker-ok">
          <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
            {{ 'Calendar.lang.ok' | nzI18n }}
          </button>
        </li>
      </ul>
    </div>
  `,
                host: {
                    '[class.ant-picker-time-panel]': `true`,
                    '[class.ant-picker-time-panel-column-0]': `enabledColumns === 0 && !nzInDatePicker`,
                    '[class.ant-picker-time-panel-column-1]': `enabledColumns === 1 && !nzInDatePicker`,
                    '[class.ant-picker-time-panel-column-2]': `enabledColumns === 2 && !nzInDatePicker`,
                    '[class.ant-picker-time-panel-column-3]': `enabledColumns === 3 && !nzInDatePicker`,
                    '[class.ant-picker-time-panel-narrow]': `enabledColumns < 3`,
                    '[class.ant-picker-time-panel-placement-bottomLeft]': `!nzInDatePicker`
                },
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NzTimePickerPanelComponent, multi: true }]
            },] }
];
NzTimePickerPanelComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateHelperService }
];
NzTimePickerPanelComponent.propDecorators = {
    hourListElement: [{ type: ViewChild, args: ['hourListElement', { static: false },] }],
    minuteListElement: [{ type: ViewChild, args: ['minuteListElement', { static: false },] }],
    secondListElement: [{ type: ViewChild, args: ['secondListElement', { static: false },] }],
    use12HoursListElement: [{ type: ViewChild, args: ['use12HoursListElement', { static: false },] }],
    nzInDatePicker: [{ type: Input }],
    nzAddOn: [{ type: Input }],
    nzHideDisabledOptions: [{ type: Input }],
    nzClearText: [{ type: Input }],
    nzPlaceHolder: [{ type: Input }],
    nzUse12Hours: [{ type: Input }],
    nzDefaultOpenValue: [{ type: Input }],
    closePanel: [{ type: Output }],
    nzAllowEmpty: [{ type: Input }],
    nzDisabledHours: [{ type: Input }],
    nzDisabledMinutes: [{ type: Input }],
    nzDisabledSeconds: [{ type: Input }],
    format: [{ type: Input }],
    nzHourStep: [{ type: Input }],
    nzMinuteStep: [{ type: Input }],
    nzSecondStep: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTimePickerPanelComponent.prototype, "nzUse12Hours", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbInRpbWUtcGlja2VyLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFFTixXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxTQUFTLFNBQVMsQ0FBQyxNQUFjLEVBQUUsT0FBZSxDQUFDLEVBQUUsUUFBZ0IsQ0FBQztJQUNwRSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3ZGLENB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LFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dDQUNoRCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29DQUNoRCxTQUFTLFNBQUMsdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzZCQUVwRCxLQUFLO3NCQUNMLEtBQUs7b0NBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxLQUFLO3lCQUVMLE1BQU07MkJBRU4sS0FBSzs4QkFXTCxLQUFLO2dDQVlMLEtBQUs7Z0NBWUwsS0FBSztxQkFZTCxLQUFLO3lCQTRCTCxLQUFLOzJCQVlMLEtBQUs7MkJBWUwsS0FBSzs7QUF4R21CO0lBQWYsWUFBWSxFQUFFOztnRUFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGVidWdFbGVtZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgcmVxQW5pbUZyYW1lIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3BvbHlmaWxsJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUaW1lSG9sZGVyIH0gZnJvbSAnLi90aW1lLWhvbGRlcic7XG5cbmZ1bmN0aW9uIG1ha2VSYW5nZShsZW5ndGg6IG51bWJlciwgc3RlcDogbnVtYmVyID0gMSwgc3RhcnQ6IG51bWJlciA9IDApOiBudW1iZXJbXSB7XG4gIHJldHVybiBuZXcgQXJyYXkoTWF0aC5jZWlsKGxlbmd0aCAvIHN0ZXApKS5maWxsKDApLm1hcCgoXywgaSkgPT4gKGkgKyBzdGFydCkgKiBzdGVwKTtcbn1cblxuZXhwb3J0IHR5cGUgTnpUaW1lUGlja2VyVW5pdCA9ICdob3VyJyB8ICdtaW51dGUnIHwgJ3NlY29uZCcgfCAnMTItaG91cic7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei10aW1lLXBpY2tlci1wYW5lbCcsXG4gIGV4cG9ydEFzOiAnbnpUaW1lUGlja2VyUGFuZWwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJuekluRGF0ZVBpY2tlclwiIGNsYXNzPVwiYW50LXBpY2tlci1oZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLWhlYWRlci12aWV3XCI+e3sgZGF0ZUhlbHBlci5mb3JtYXQoJGFueSh0aW1lPy52YWx1ZSksIGZvcm1hdCkgfHwgJyZuYnNwOycgfX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LXBpY2tlci1jb250ZW50XCI+XG4gICAgICA8dWwgKm5nSWY9XCJob3VyRW5hYmxlZFwiICNob3VyTGlzdEVsZW1lbnQgY2xhc3M9XCJhbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91clJhbmdlXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICAqbmdJZj1cIiEobnpIaWRlRGlzYWJsZWRPcHRpb25zICYmIGhvdXIuZGlzYWJsZWQpXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LXBpY2tlci10aW1lLXBhbmVsLWNlbGxcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEhvdXIoaG91cilcIlxuICAgICAgICAgICAgW2NsYXNzLmFudC1waWNrZXItdGltZS1wYW5lbC1jZWxsLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWRIb3VyKGhvdXIpXCJcbiAgICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbC1kaXNhYmxlZF09XCJob3VyLmRpc2FibGVkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBpY2tlci10aW1lLXBhbmVsLWNlbGwtaW5uZXJcIj57eyBob3VyLmluZGV4IHwgbnVtYmVyOiAnMi4wLTAnIH19PC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3VsPlxuICAgICAgPHVsICpuZ0lmPVwibWludXRlRW5hYmxlZFwiICNtaW51dGVMaXN0RWxlbWVudCBjbGFzcz1cImFudC1waWNrZXItdGltZS1wYW5lbC1jb2x1bW5cIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTtcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbWludXRlIG9mIG1pbnV0ZVJhbmdlXCI+XG4gICAgICAgICAgPGxpXG4gICAgICAgICAgICAqbmdJZj1cIiEobnpIaWRlRGlzYWJsZWRPcHRpb25zICYmIG1pbnV0ZS5kaXNhYmxlZClcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWludXRlKG1pbnV0ZSlcIlxuICAgICAgICAgICAgW2NsYXNzLmFudC1waWNrZXItdGltZS1wYW5lbC1jZWxsLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWRNaW51dGUobWludXRlKVwiXG4gICAgICAgICAgICBbY2xhc3MuYW50LXBpY2tlci10aW1lLXBhbmVsLWNlbGwtZGlzYWJsZWRdPVwibWludXRlLmRpc2FibGVkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBpY2tlci10aW1lLXBhbmVsLWNlbGwtaW5uZXJcIj57eyBtaW51dGUuaW5kZXggfCBudW1iZXI6ICcyLjAtMCcgfX08L2Rpdj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvdWw+XG4gICAgICA8dWwgKm5nSWY9XCJzZWNvbmRFbmFibGVkXCIgI3NlY29uZExpc3RFbGVtZW50IGNsYXNzPVwiYW50LXBpY2tlci10aW1lLXBhbmVsLWNvbHVtblwiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzZWNvbmQgb2Ygc2Vjb25kUmFuZ2VcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgICpuZ0lmPVwiIShuekhpZGVEaXNhYmxlZE9wdGlvbnMgJiYgc2Vjb25kLmRpc2FibGVkKVwiXG4gICAgICAgICAgICBjbGFzcz1cImFudC1waWNrZXItdGltZS1wYW5lbC1jZWxsXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RTZWNvbmQoc2Vjb25kKVwiXG4gICAgICAgICAgICBbY2xhc3MuYW50LXBpY2tlci10aW1lLXBhbmVsLWNlbGwtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFNlY29uZChzZWNvbmQpXCJcbiAgICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbC1kaXNhYmxlZF09XCJzZWNvbmQuZGlzYWJsZWRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbC1pbm5lclwiPnt7IHNlY29uZC5pbmRleCB8IG51bWJlcjogJzIuMC0wJyB9fTwvZGl2PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC91bD5cbiAgICAgIDx1bCAqbmdJZj1cIm56VXNlMTJIb3Vyc1wiICN1c2UxMkhvdXJzTGlzdEVsZW1lbnQgY2xhc3M9XCJhbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7XCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJhbmdlIG9mIHVzZTEySG91cnNSYW5nZVwiPlxuICAgICAgICAgIDxsaVxuICAgICAgICAgICAgKm5nSWY9XCIhbnpIaWRlRGlzYWJsZWRPcHRpb25zXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3QxMkhvdXJzKHJhbmdlKVwiXG4gICAgICAgICAgICBjbGFzcz1cImFudC1waWNrZXItdGltZS1wYW5lbC1jZWxsXCJcbiAgICAgICAgICAgIFtjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbC1zZWxlY3RlZF09XCJpc1NlbGVjdGVkMTJIb3VycyhyYW5nZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLXRpbWUtcGFuZWwtY2VsbC1pbm5lclwiPnt7IHJhbmdlLnZhbHVlIH19PC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhbnpJbkRhdGVQaWNrZXJcIiBjbGFzcz1cImFudC1waWNrZXItZm9vdGVyXCI+XG4gICAgICA8ZGl2ICpuZ0lmPVwibnpBZGRPblwiIGNsYXNzPVwiYW50LXBpY2tlci1mb290ZXItZXh0cmFcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56QWRkT25cIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgICA8dWwgY2xhc3M9XCJhbnQtcGlja2VyLXJhbmdlc1wiPlxuICAgICAgICA8bGkgY2xhc3M9XCJhbnQtcGlja2VyLW5vd1wiPlxuICAgICAgICAgIDxhIChjbGljayk9XCJvbkNsaWNrTm93KClcIj5cbiAgICAgICAgICAgIHt7ICdDYWxlbmRhci5sYW5nLm5vdycgfCBuekkxOG4gfX1cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaSBjbGFzcz1cImFudC1waWNrZXItb2tcIj5cbiAgICAgICAgICA8YnV0dG9uIG56LWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbnpTaXplPVwic21hbGxcIiBuelR5cGU9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9uQ2xpY2tPaygpXCI+XG4gICAgICAgICAgICB7eyAnQ2FsZW5kYXIubGFuZy5vaycgfCBuekkxOG4gfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1waWNrZXItdGltZS1wYW5lbF0nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uLTBdJzogYGVuYWJsZWRDb2x1bW5zID09PSAwICYmICFuekluRGF0ZVBpY2tlcmAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uLTFdJzogYGVuYWJsZWRDb2x1bW5zID09PSAxICYmICFuekluRGF0ZVBpY2tlcmAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uLTJdJzogYGVuYWJsZWRDb2x1bW5zID09PSAyICYmICFuekluRGF0ZVBpY2tlcmAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtY29sdW1uLTNdJzogYGVuYWJsZWRDb2x1bW5zID09PSAzICYmICFuekluRGF0ZVBpY2tlcmAsXG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLXRpbWUtcGFuZWwtbmFycm93XSc6IGBlbmFibGVkQ29sdW1ucyA8IDNgLFxuICAgICdbY2xhc3MuYW50LXBpY2tlci10aW1lLXBhbmVsLXBsYWNlbWVudC1ib3R0b21MZWZ0XSc6IGAhbnpJbkRhdGVQaWNrZXJgXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudCwgbXVsdGk6IHRydWUgfV1cbn0pXG5leHBvcnQgY2xhc3MgTnpUaW1lUGlja2VyUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelVzZTEySG91cnM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIF9uekhvdXJTdGVwID0gMTtcbiAgcHJpdmF0ZSBfbnpNaW51dGVTdGVwID0gMTtcbiAgcHJpdmF0ZSBfbnpTZWNvbmRTdGVwID0gMTtcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIG9uQ2hhbmdlPzogKHZhbHVlOiBEYXRlKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uVG91Y2g/OiAoKSA9PiB2b2lkO1xuICBwcml2YXRlIF9mb3JtYXQgPSAnSEg6bW06c3MnO1xuICBwcml2YXRlIF9kaXNhYmxlZEhvdXJzPzogKCkgPT4gbnVtYmVyW10gPSAoKSA9PiBbXTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWRNaW51dGVzPzogKGhvdXI6IG51bWJlcikgPT4gbnVtYmVyW10gPSAoKSA9PiBbXTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWRTZWNvbmRzPzogKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIpID0+IG51bWJlcltdID0gKCkgPT4gW107XG4gIHByaXZhdGUgX2FsbG93RW1wdHkgPSB0cnVlO1xuICB0aW1lID0gbmV3IFRpbWVIb2xkZXIoKTtcbiAgaG91ckVuYWJsZWQgPSB0cnVlO1xuICBtaW51dGVFbmFibGVkID0gdHJ1ZTtcbiAgc2Vjb25kRW5hYmxlZCA9IHRydWU7XG4gIGZpcnN0U2Nyb2xsZWQgPSBmYWxzZTtcbiAgZW5hYmxlZENvbHVtbnMgPSAzO1xuICBob3VyUmFuZ2UhOiBSZWFkb25seUFycmF5PHsgaW5kZXg6IG51bWJlcjsgZGlzYWJsZWQ6IGJvb2xlYW4gfT47XG4gIG1pbnV0ZVJhbmdlITogUmVhZG9ubHlBcnJheTx7IGluZGV4OiBudW1iZXI7IGRpc2FibGVkOiBib29sZWFuIH0+O1xuICBzZWNvbmRSYW5nZSE6IFJlYWRvbmx5QXJyYXk8eyBpbmRleDogbnVtYmVyOyBkaXNhYmxlZDogYm9vbGVhbiB9PjtcbiAgdXNlMTJIb3Vyc1JhbmdlITogUmVhZG9ubHlBcnJheTx7IGluZGV4OiBudW1iZXI7IHZhbHVlOiBzdHJpbmcgfT47XG5cbiAgQFZpZXdDaGlsZCgnaG91ckxpc3RFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIGhvdXJMaXN0RWxlbWVudD86IERlYnVnRWxlbWVudDtcbiAgQFZpZXdDaGlsZCgnbWludXRlTGlzdEVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgbWludXRlTGlzdEVsZW1lbnQ/OiBEZWJ1Z0VsZW1lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3NlY29uZExpc3RFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNlY29uZExpc3RFbGVtZW50PzogRGVidWdFbGVtZW50O1xuICBAVmlld0NoaWxkKCd1c2UxMkhvdXJzTGlzdEVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgdXNlMTJIb3Vyc0xpc3RFbGVtZW50PzogRGVidWdFbGVtZW50O1xuXG4gIEBJbnB1dCgpIG56SW5EYXRlUGlja2VyOiBib29sZWFuID0gZmFsc2U7IC8vIElmIGluc2lkZSBhIGRhdGUtcGlja2VyLCBtb3JlIGRpZmYgd29ya3MgbmVlZCB0byBiZSBkb25lXG4gIEBJbnB1dCgpIG56QWRkT24/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpIaWRlRGlzYWJsZWRPcHRpb25zID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56Q2xlYXJUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuelBsYWNlSG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpVc2UxMkhvdXJzID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56RGVmYXVsdE9wZW5WYWx1ZT86IERhdGU7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlUGFuZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQElucHV0KClcbiAgc2V0IG56QWxsb3dFbXB0eSh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2FsbG93RW1wdHkgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpBbGxvd0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxvd0VtcHR5O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWRIb3Vycyh2YWx1ZTogdW5kZWZpbmVkIHwgKCgpID0+IG51bWJlcltdKSkge1xuICAgIHRoaXMuX2Rpc2FibGVkSG91cnMgPSB2YWx1ZTtcbiAgICBpZiAoISF0aGlzLl9kaXNhYmxlZEhvdXJzKSB7XG4gICAgICB0aGlzLmJ1aWxkSG91cnMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZEhvdXJzKCk6IHVuZGVmaW5lZCB8ICgoKSA9PiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZEhvdXJzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWRNaW51dGVzKHZhbHVlOiB1bmRlZmluZWQgfCAoKGhvdXI6IG51bWJlcikgPT4gbnVtYmVyW10pKSB7XG4gICAgaWYgKGlzTm90TmlsKHZhbHVlKSkge1xuICAgICAgdGhpcy5fZGlzYWJsZWRNaW51dGVzID0gdmFsdWU7XG4gICAgICB0aGlzLmJ1aWxkTWludXRlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuekRpc2FibGVkTWludXRlcygpOiB1bmRlZmluZWQgfCAoKGhvdXI6IG51bWJlcikgPT4gbnVtYmVyW10pIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWRNaW51dGVzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWRTZWNvbmRzKHZhbHVlOiB1bmRlZmluZWQgfCAoKGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIpID0+IG51bWJlcltdKSkge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkU2Vjb25kcyA9IHZhbHVlO1xuICAgICAgdGhpcy5idWlsZFNlY29uZHMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZFNlY29uZHMoKTogdW5kZWZpbmVkIHwgKChob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyKSA9PiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZFNlY29uZHM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZm9ybWF0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9mb3JtYXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW5hYmxlZENvbHVtbnMgPSAwO1xuICAgICAgY29uc3QgY2hhclNldCA9IG5ldyBTZXQodmFsdWUpO1xuICAgICAgdGhpcy5ob3VyRW5hYmxlZCA9IGNoYXJTZXQuaGFzKCdIJykgfHwgY2hhclNldC5oYXMoJ2gnKTtcbiAgICAgIHRoaXMubWludXRlRW5hYmxlZCA9IGNoYXJTZXQuaGFzKCdtJyk7XG4gICAgICB0aGlzLnNlY29uZEVuYWJsZWQgPSBjaGFyU2V0LmhhcygncycpO1xuICAgICAgaWYgKHRoaXMuaG91ckVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkQ29sdW1ucysrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWludXRlRW5hYmxlZCkge1xuICAgICAgICB0aGlzLmVuYWJsZWRDb2x1bW5zKys7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zZWNvbmRFbmFibGVkKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZENvbHVtbnMrKztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm56VXNlMTJIb3Vycykge1xuICAgICAgICB0aGlzLmJ1aWxkMTJIb3VycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBmb3JtYXQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56SG91clN0ZXAodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX256SG91clN0ZXAgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYnVpbGRIb3VycygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuekhvdXJTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX256SG91clN0ZXA7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpNaW51dGVTdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9uek1pbnV0ZVN0ZXAgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYnVpbGRNaW51dGVzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56TWludXRlU3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uek1pbnV0ZVN0ZXA7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpTZWNvbmRTdGVwKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9uelNlY29uZFN0ZXAgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYnVpbGRTZWNvbmRzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56U2Vjb25kU3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9uelNlY29uZFN0ZXA7XG4gIH1cblxuICBidWlsZEhvdXJzKCk6IHZvaWQge1xuICAgIGxldCBob3VyUmFuZ2VzID0gMjQ7XG4gICAgbGV0IGRpc2FibGVkSG91cnMgPSB0aGlzLm56RGlzYWJsZWRIb3Vycz8uKCk7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSAwO1xuICAgIGlmICh0aGlzLm56VXNlMTJIb3Vycykge1xuICAgICAgaG91clJhbmdlcyA9IDEyO1xuICAgICAgaWYgKGRpc2FibGVkSG91cnMpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZS5zZWxlY3RlZDEySG91cnMgPT09ICdQTScpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGaWx0ZXIgYW5kIHRyYW5zZm9ybSBob3VycyB3aGljaCBncmVhdGVyIG9yIGVxdWFsIHRvIDEyXG4gICAgICAgICAgICogWzAsIDEsIDIsIC4uLiwgMTIsIDEzLCAxNCwgMTUsIC4uLiwgMjNdID0+IFsxMiwgMSwgMiwgMywgLi4uLCAxMV1cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBkaXNhYmxlZEhvdXJzID0gZGlzYWJsZWRIb3Vycy5maWx0ZXIoaSA9PiBpID49IDEyKS5tYXAoaSA9PiAoaSA+IDEyID8gaSAtIDEyIDogaSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZpbHRlciBhbmQgdHJhbnNmb3JtIGhvdXJzIHdoaWNoIGxlc3MgdGhhbiAxMlxuICAgICAgICAgICAqIFswLCAxLCAyLC4uLiwgMTIsIDEzLCAxNCwgMTUsIC4uLjIzXSA9PiBbMTIsIDEsIDIsIDMsIC4uLiwgMTFdXG4gICAgICAgICAgICovXG4gICAgICAgICAgZGlzYWJsZWRIb3VycyA9IGRpc2FibGVkSG91cnMuZmlsdGVyKGkgPT4gaSA8IDEyIHx8IGkgPT09IDI0KS5tYXAoaSA9PiAoaSA9PT0gMjQgfHwgaSA9PT0gMCA/IDEyIDogaSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFydEluZGV4ID0gMTtcbiAgICB9XG4gICAgdGhpcy5ob3VyUmFuZ2UgPSBtYWtlUmFuZ2UoaG91clJhbmdlcywgdGhpcy5uekhvdXJTdGVwLCBzdGFydEluZGV4KS5tYXAociA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmRleDogcixcbiAgICAgICAgZGlzYWJsZWQ6ICEhZGlzYWJsZWRIb3VycyAmJiBkaXNhYmxlZEhvdXJzLmluZGV4T2YocikgIT09IC0xXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGlmICh0aGlzLm56VXNlMTJIb3VycyAmJiB0aGlzLmhvdXJSYW5nZVt0aGlzLmhvdXJSYW5nZS5sZW5ndGggLSAxXS5pbmRleCA9PT0gMTIpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSBbLi4udGhpcy5ob3VyUmFuZ2VdO1xuICAgICAgdGVtcC51bnNoaWZ0KHRlbXBbdGVtcC5sZW5ndGggLSAxXSk7XG4gICAgICB0ZW1wLnNwbGljZSh0ZW1wLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgdGhpcy5ob3VyUmFuZ2UgPSB0ZW1wO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkTWludXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLm1pbnV0ZVJhbmdlID0gbWFrZVJhbmdlKDYwLCB0aGlzLm56TWludXRlU3RlcCkubWFwKHIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IHIsXG4gICAgICAgIGRpc2FibGVkOiAhIXRoaXMubnpEaXNhYmxlZE1pbnV0ZXMgJiYgdGhpcy5uekRpc2FibGVkTWludXRlcyh0aGlzLnRpbWUuaG91cnMhKS5pbmRleE9mKHIpICE9PSAtMVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkU2Vjb25kcygpOiB2b2lkIHtcbiAgICB0aGlzLnNlY29uZFJhbmdlID0gbWFrZVJhbmdlKDYwLCB0aGlzLm56U2Vjb25kU3RlcCkubWFwKHIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXg6IHIsXG4gICAgICAgIGRpc2FibGVkOiAhIXRoaXMubnpEaXNhYmxlZFNlY29uZHMgJiYgdGhpcy5uekRpc2FibGVkU2Vjb25kcyh0aGlzLnRpbWUuaG91cnMhLCB0aGlzLnRpbWUubWludXRlcyEpLmluZGV4T2YocikgIT09IC0xXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGQxMkhvdXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzVXBwZXJGb3JtYXQgPSB0aGlzLl9mb3JtYXQuaW5jbHVkZXMoJ0EnKTtcbiAgICB0aGlzLnVzZTEySG91cnNSYW5nZSA9IFtcbiAgICAgIHtcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIHZhbHVlOiBpc1VwcGVyRm9ybWF0ID8gJ0FNJyA6ICdhbSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGluZGV4OiAxLFxuICAgICAgICB2YWx1ZTogaXNVcHBlckZvcm1hdCA/ICdQTScgOiAncG0nXG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIGJ1aWxkVGltZXMoKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZEhvdXJzKCk7XG4gICAgdGhpcy5idWlsZE1pbnV0ZXMoKTtcbiAgICB0aGlzLmJ1aWxkU2Vjb25kcygpO1xuICAgIHRoaXMuYnVpbGQxMkhvdXJzKCk7XG4gIH1cblxuICBzY3JvbGxUb1RpbWUoZGVsYXk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ob3VyRW5hYmxlZCAmJiB0aGlzLmhvdXJMaXN0RWxlbWVudCkge1xuICAgICAgdGhpcy5zY3JvbGxUb1NlbGVjdGVkKHRoaXMuaG91ckxpc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMudGltZS52aWV3SG91cnMhLCBkZWxheSwgJ2hvdXInKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWludXRlRW5hYmxlZCAmJiB0aGlzLm1pbnV0ZUxpc3RFbGVtZW50KSB7XG4gICAgICB0aGlzLnNjcm9sbFRvU2VsZWN0ZWQodGhpcy5taW51dGVMaXN0RWxlbWVudC5uYXRpdmVFbGVtZW50LCB0aGlzLnRpbWUubWludXRlcyEsIGRlbGF5LCAnbWludXRlJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNlY29uZEVuYWJsZWQgJiYgdGhpcy5zZWNvbmRMaXN0RWxlbWVudCkge1xuICAgICAgdGhpcy5zY3JvbGxUb1NlbGVjdGVkKHRoaXMuc2Vjb25kTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy50aW1lLnNlY29uZHMhLCBkZWxheSwgJ3NlY29uZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelVzZTEySG91cnMgJiYgdGhpcy51c2UxMkhvdXJzTGlzdEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSG91cnMgPSB0aGlzLnRpbWUuc2VsZWN0ZWQxMkhvdXJzO1xuICAgICAgY29uc3QgaW5kZXggPSBzZWxlY3RlZEhvdXJzID09PSAnQU0nID8gMCA6IDE7XG4gICAgICB0aGlzLnNjcm9sbFRvU2VsZWN0ZWQodGhpcy51c2UxMkhvdXJzTGlzdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgaW5kZXgsIGRlbGF5LCAnMTItaG91cicpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEhvdXIoaG91cjogeyBpbmRleDogbnVtYmVyOyBkaXNhYmxlZDogYm9vbGVhbiB9KTogdm9pZCB7XG4gICAgdGhpcy50aW1lLnNldEhvdXJzKGhvdXIuaW5kZXgsIGhvdXIuZGlzYWJsZWQpO1xuICAgIGlmICghIXRoaXMuX2Rpc2FibGVkTWludXRlcykge1xuICAgICAgdGhpcy5idWlsZE1pbnV0ZXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkU2Vjb25kcyB8fCB0aGlzLl9kaXNhYmxlZE1pbnV0ZXMpIHtcbiAgICAgIHRoaXMuYnVpbGRTZWNvbmRzKCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0TWludXRlKG1pbnV0ZTogeyBpbmRleDogbnVtYmVyOyBkaXNhYmxlZDogYm9vbGVhbiB9KTogdm9pZCB7XG4gICAgdGhpcy50aW1lLnNldE1pbnV0ZXMobWludXRlLmluZGV4LCBtaW51dGUuZGlzYWJsZWQpO1xuICAgIGlmICghIXRoaXMuX2Rpc2FibGVkU2Vjb25kcykge1xuICAgICAgdGhpcy5idWlsZFNlY29uZHMoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RTZWNvbmQoc2Vjb25kOiB7IGluZGV4OiBudW1iZXI7IGRpc2FibGVkOiBib29sZWFuIH0pOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUuc2V0U2Vjb25kcyhzZWNvbmQuaW5kZXgsIHNlY29uZC5kaXNhYmxlZCk7XG4gIH1cblxuICBzZWxlY3QxMkhvdXJzKHZhbHVlOiB7IGluZGV4OiBudW1iZXI7IHZhbHVlOiBzdHJpbmcgfSk6IHZvaWQge1xuICAgIHRoaXMudGltZS5zZXRTZWxlY3RlZDEySG91cnModmFsdWUudmFsdWUpO1xuICAgIGlmICghIXRoaXMuX2Rpc2FibGVkSG91cnMpIHtcbiAgICAgIHRoaXMuYnVpbGRIb3VycygpO1xuICAgIH1cbiAgICBpZiAoISF0aGlzLl9kaXNhYmxlZE1pbnV0ZXMpIHtcbiAgICAgIHRoaXMuYnVpbGRNaW51dGVzKCk7XG4gICAgfVxuICAgIGlmICghIXRoaXMuX2Rpc2FibGVkU2Vjb25kcykge1xuICAgICAgdGhpcy5idWlsZFNlY29uZHMoKTtcbiAgICB9XG4gIH1cblxuICBzY3JvbGxUb1NlbGVjdGVkKGluc3RhbmNlOiBIVE1MRWxlbWVudCwgaW5kZXg6IG51bWJlciwgZHVyYXRpb246IG51bWJlciA9IDAsIHVuaXQ6IE56VGltZVBpY2tlclVuaXQpOiB2b2lkIHtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRyYW5zSW5kZXggPSB0aGlzLnRyYW5zbGF0ZUluZGV4KGluZGV4LCB1bml0KTtcbiAgICBjb25zdCBjdXJyZW50T3B0aW9uID0gKGluc3RhbmNlLmNoaWxkcmVuW3RyYW5zSW5kZXhdIHx8IGluc3RhbmNlLmNoaWxkcmVuWzBdKSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLnNjcm9sbFRvKGluc3RhbmNlLCBjdXJyZW50T3B0aW9uLm9mZnNldFRvcCwgZHVyYXRpb24pO1xuICB9XG5cbiAgdHJhbnNsYXRlSW5kZXgoaW5kZXg6IG51bWJlciwgdW5pdDogTnpUaW1lUGlja2VyVW5pdCk6IG51bWJlciB7XG4gICAgaWYgKHVuaXQgPT09ICdob3VyJykge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsY0luZGV4KHRoaXMubnpEaXNhYmxlZEhvdXJzPy4oKSwgdGhpcy5ob3VyUmFuZ2UubWFwKGl0ZW0gPT4gaXRlbS5pbmRleCkuaW5kZXhPZihpbmRleCkpO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gJ21pbnV0ZScpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGNJbmRleCh0aGlzLm56RGlzYWJsZWRNaW51dGVzPy4odGhpcy50aW1lLmhvdXJzISksIHRoaXMubWludXRlUmFuZ2UubWFwKGl0ZW0gPT4gaXRlbS5pbmRleCkuaW5kZXhPZihpbmRleCkpO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3NlY29uZCcpIHtcbiAgICAgIC8vIHNlY29uZFxuICAgICAgcmV0dXJuIHRoaXMuY2FsY0luZGV4KFxuICAgICAgICB0aGlzLm56RGlzYWJsZWRTZWNvbmRzPy4odGhpcy50aW1lLmhvdXJzISwgdGhpcy50aW1lLm1pbnV0ZXMhKSxcbiAgICAgICAgdGhpcy5zZWNvbmRSYW5nZS5tYXAoaXRlbSA9PiBpdGVtLmluZGV4KS5pbmRleE9mKGluZGV4KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gMTItaG91clxuICAgICAgcmV0dXJuIHRoaXMuY2FsY0luZGV4KFtdLCB0aGlzLnVzZTEySG91cnNSYW5nZS5tYXAoaXRlbSA9PiBpdGVtLmluZGV4KS5pbmRleE9mKGluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG8oZWxlbWVudDogSFRNTEVsZW1lbnQsIHRvOiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSB0bztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHRvIC0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgY29uc3QgcGVyVGljayA9IChkaWZmZXJlbmNlIC8gZHVyYXRpb24pICogMTA7XG5cbiAgICByZXFBbmltRnJhbWUoKCkgPT4ge1xuICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBlbGVtZW50LnNjcm9sbFRvcCArIHBlclRpY2s7XG4gICAgICBpZiAoZWxlbWVudC5zY3JvbGxUb3AgPT09IHRvKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2Nyb2xsVG8oZWxlbWVudCwgdG8sIGR1cmF0aW9uIC0gMTApO1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY0luZGV4KGFycmF5OiBudW1iZXJbXSB8IHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGFycmF5Py5sZW5ndGggJiYgdGhpcy5uekhpZGVEaXNhYmxlZE9wdGlvbnMpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGluZGV4IC1cbiAgICAgICAgYXJyYXkucmVkdWNlKChwcmUsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByZSArICh2YWx1ZSA8IGluZGV4ID8gMSA6IDApO1xuICAgICAgICB9LCAwKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjaGFuZ2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZS52YWx1ZSEpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB0b3VjaGVkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uVG91Y2gpIHtcbiAgICAgIHRoaXMub25Ub3VjaCgpO1xuICAgIH1cbiAgfVxuXG4gIHRpbWVEaXNhYmxlZCh2YWx1ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGhvdXIgPSB2YWx1ZS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbnV0ZSA9IHZhbHVlLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWNvbmQgPSB2YWx1ZS5nZXRTZWNvbmRzKCk7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLm56RGlzYWJsZWRIb3Vycz8uKCkuaW5kZXhPZihob3VyKSA/PyAtMSkgPiAtMSB8fFxuICAgICAgKHRoaXMubnpEaXNhYmxlZE1pbnV0ZXM/Lihob3VyKS5pbmRleE9mKG1pbnV0ZSkgPz8gLTEpID4gLTEgfHxcbiAgICAgICh0aGlzLm56RGlzYWJsZWRTZWNvbmRzPy4oaG91ciwgbWludXRlKS5pbmRleE9mKHNlY29uZCkgPz8gLTEpID4gLTFcbiAgICApO1xuICB9XG5cbiAgb25DbGlja05vdygpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIGlmICh0aGlzLnRpbWVEaXNhYmxlZChub3cpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudGltZS5zZXRWYWx1ZShub3cpO1xuICAgIHRoaXMuY2hhbmdlZCgpO1xuICAgIHRoaXMuY2xvc2VQYW5lbC5lbWl0KCk7XG4gIH1cblxuICBvbkNsaWNrT2soKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZVBhbmVsLmVtaXQoKTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWRIb3VyKGhvdXI6IHsgaW5kZXg6IG51bWJlcjsgZGlzYWJsZWQ6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBob3VyLmluZGV4ID09PSB0aGlzLnRpbWUudmlld0hvdXJzO1xuICB9XG5cbiAgaXNTZWxlY3RlZE1pbnV0ZShtaW51dGU6IHsgaW5kZXg6IG51bWJlcjsgZGlzYWJsZWQ6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBtaW51dGUuaW5kZXggPT09IHRoaXMudGltZS5taW51dGVzO1xuICB9XG5cbiAgaXNTZWxlY3RlZFNlY29uZChzZWNvbmQ6IHsgaW5kZXg6IG51bWJlcjsgZGlzYWJsZWQ6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzZWNvbmQuaW5kZXggPT09IHRoaXMudGltZS5zZWNvbmRzO1xuICB9XG5cbiAgaXNTZWxlY3RlZDEySG91cnModmFsdWU6IHsgaW5kZXg6IG51bWJlcjsgdmFsdWU6IHN0cmluZyB9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlLnZhbHVlLnRvVXBwZXJDYXNlKCkgPT09IHRoaXMudGltZS5zZWxlY3RlZDEySG91cnM7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZWQoKTtcbiAgICAgIHRoaXMudG91Y2hlZCgpO1xuICAgICAgdGhpcy5zY3JvbGxUb1RpbWUoMTIwKTtcbiAgICB9KTtcbiAgICB0aGlzLmJ1aWxkVGltZXMoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9UaW1lKCk7XG4gICAgICB0aGlzLmZpcnN0U2Nyb2xsZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZSQubmV4dCgpO1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelVzZTEySG91cnMsIG56RGVmYXVsdE9wZW5WYWx1ZSB9ID0gY2hhbmdlcztcbiAgICBpZiAoIW56VXNlMTJIb3Vycz8ucHJldmlvdXNWYWx1ZSAmJiBuelVzZTEySG91cnM/LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgdGhpcy5idWlsZDEySG91cnMoKTtcbiAgICAgIHRoaXMuZW5hYmxlZENvbHVtbnMrKztcbiAgICB9XG4gICAgaWYgKG56RGVmYXVsdE9wZW5WYWx1ZT8uY3VycmVudFZhbHVlKSB7XG4gICAgICB0aGlzLnRpbWUuc2V0RGVmYXVsdE9wZW5WYWx1ZSh0aGlzLm56RGVmYXVsdE9wZW5WYWx1ZSB8fCBuZXcgRGF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy50aW1lLnNldFZhbHVlKHZhbHVlLCB0aGlzLm56VXNlMTJIb3Vycyk7XG4gICAgdGhpcy5idWlsZFRpbWVzKCk7XG5cbiAgICBpZiAodmFsdWUgJiYgdGhpcy5maXJzdFNjcm9sbGVkKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvVGltZSgxMjApO1xuICAgIH1cbiAgICAvLyBNYXJrIHRoaXMgY29tcG9uZW50IHRvIGJlIGNoZWNrZWQgbWFudWFsbHkgd2l0aCBpbnRlcm5hbCBwcm9wZXJ0aWVzIGNoYW5naW5nIChzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwODE2KVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBEYXRlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxufVxuIl19