/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzDateCellDirective as DateCell, NzDateFullCellDirective as DateFullCell, NzMonthCellDirective as MonthCell, NzMonthFullCellDirective as MonthFullCell } from './calendar-cells';
export class NzCalendarComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.activeDate = new CandyDate();
        this.prefixCls = 'ant-picker-calendar';
        this.onChangeFn = () => { };
        this.onTouchFn = () => { };
        this.nzMode = 'month';
        this.nzModeChange = new EventEmitter();
        this.nzPanelChange = new EventEmitter();
        this.nzSelectChange = new EventEmitter();
        this.nzValueChange = new EventEmitter();
        this.nzFullscreen = true;
    }
    get dateCell() {
        return (this.nzDateCell || this.nzDateCellChild);
    }
    get dateFullCell() {
        return (this.nzDateFullCell || this.nzDateFullCellChild);
    }
    get monthCell() {
        return (this.nzMonthCell || this.nzMonthCellChild);
    }
    get monthFullCell() {
        return (this.nzMonthFullCell || this.nzMonthFullCellChild);
    }
    onModeChange(mode) {
        this.nzModeChange.emit(mode);
        this.nzPanelChange.emit({ date: this.activeDate.nativeDate, mode });
    }
    onYearSelect(year) {
        const date = this.activeDate.setYear(year);
        this.updateDate(date);
    }
    onMonthSelect(month) {
        const date = this.activeDate.setMonth(month);
        this.updateDate(date);
    }
    onDateSelect(date) {
        // Only activeDate is enough in calendar
        // this.value = date;
        this.updateDate(date);
    }
    writeValue(value) {
        this.updateDate(new CandyDate(value), false);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    updateDate(date, touched = true) {
        this.activeDate = date;
        if (touched) {
            this.onChangeFn(date.nativeDate);
            this.onTouchFn();
            this.nzSelectChange.emit(date.nativeDate);
            this.nzValueChange.emit(date.nativeDate);
        }
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.updateDate(new CandyDate(this.nzValue), false);
        }
    }
}
NzCalendarComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-calendar',
                exportAs: 'nzCalendar',
                template: `
    <nz-calendar-header
      [fullscreen]="nzFullscreen"
      [activeDate]="activeDate"
      [(mode)]="nzMode"
      (modeChange)="onModeChange($event)"
      (yearChange)="onYearSelect($event)"
      (monthChange)="onMonthSelect($event)"
    >
    </nz-calendar-header>

    <div class="ant-picker-panel">
      <div class="ant-picker-{{ nzMode === 'month' ? 'date' : 'month' }}-panel">
        <div class="ant-picker-body">
          <ng-container *ngIf="nzMode === 'month'; then monthModeTable; else yearModeTable"></ng-container>
        </div>
      </div>
    </div>
    <ng-template #monthModeTable>
      <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
      <date-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(dateCell)"
        [fullCellRender]="$any(dateFullCell)"
        [disabledDate]="nzDisabledDate"
        (valueChange)="onDateSelect($event)"
      ></date-table>
    </ng-template>

    <!--  TODO(@wenqi73) [cellRender] [fullCellRender] -->
    <ng-template #yearModeTable>
      <month-table
        [prefixCls]="prefixCls"
        [value]="activeDate"
        [activeDate]="activeDate"
        [cellRender]="$any(monthCell)"
        [fullCellRender]="$any(monthFullCell)"
        (valueChange)="onDateSelect($event)"
      ></month-table>
    </ng-template>
  `,
                host: {
                    '[class.ant-picker-calendar]': 'true',
                    '[class.ant-picker-calendar-full]': 'nzFullscreen',
                    '[class.ant-picker-calendar-mini]': '!nzFullscreen'
                },
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NzCalendarComponent), multi: true }]
            },] }
];
NzCalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzCalendarComponent.propDecorators = {
    nzMode: [{ type: Input }],
    nzValue: [{ type: Input }],
    nzDisabledDate: [{ type: Input }],
    nzModeChange: [{ type: Output }],
    nzPanelChange: [{ type: Output }],
    nzSelectChange: [{ type: Output }],
    nzValueChange: [{ type: Output }],
    nzDateCell: [{ type: Input }],
    nzDateCellChild: [{ type: ContentChild, args: [DateCell, { static: false, read: TemplateRef },] }],
    nzDateFullCell: [{ type: Input }],
    nzDateFullCellChild: [{ type: ContentChild, args: [DateFullCell, { static: false, read: TemplateRef },] }],
    nzMonthCell: [{ type: Input }],
    nzMonthCellChild: [{ type: ContentChild, args: [MonthCell, { static: false, read: TemplateRef },] }],
    nzMonthFullCell: [{ type: Input }],
    nzMonthFullCellChild: [{ type: ContentChild, args: [MonthFullCell, { static: false, read: TemplateRef },] }],
    nzFullscreen: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCalendarComponent.prototype, "nzFullscreen", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jYWxlbmRhci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEVBRU4sV0FBVyxFQUNYLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsbUJBQW1CLElBQUksUUFBUSxFQUMvQix1QkFBdUIsSUFBSSxZQUFZLEVBQ3ZDLG9CQUFvQixJQUFJLFNBQVMsRUFDakMsd0JBQXdCLElBQUksYUFBYSxFQUMxQyxNQUFNLGtCQUFrQixDQUFDO0FBNEQxQixNQUFNLE9BQU8sbUJBQW1CO0lBZ0Q5QixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTdDMUMsZUFBVSxHQUFjLElBQUksU0FBUyxFQUFFLENBQUM7UUFDeEMsY0FBUyxHQUFXLHFCQUFxQixDQUFDO1FBRWxDLGVBQVUsR0FBeUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzVDLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFaEMsV0FBTSxHQUFtQixPQUFPLENBQUM7UUFJdkIsaUJBQVksR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRSxrQkFBYSxHQUF1RCxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3ZGLG1CQUFj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b3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7XG4gIE56RGF0ZUNlbGxEaXJlY3RpdmUgYXMgRGF0ZUNlbGwsXG4gIE56RGF0ZUZ1bGxDZWxsRGlyZWN0aXZlIGFzIERhdGVGdWxsQ2VsbCxcbiAgTnpNb250aENlbGxEaXJlY3RpdmUgYXMgTW9udGhDZWxsLFxuICBOek1vbnRoRnVsbENlbGxEaXJlY3RpdmUgYXMgTW9udGhGdWxsQ2VsbFxufSBmcm9tICcuL2NhbGVuZGFyLWNlbGxzJztcblxuZXhwb3J0IHR5cGUgTnpDYWxlbmRhck1vZGUgPSAnbW9udGgnIHwgJ3llYXInO1xudHlwZSBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlID0gVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IERhdGUgfT47XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICduei1jYWxlbmRhcicsXG4gIGV4cG9ydEFzOiAnbnpDYWxlbmRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG56LWNhbGVuZGFyLWhlYWRlclxuICAgICAgW2Z1bGxzY3JlZW5dPVwibnpGdWxsc2NyZWVuXCJcbiAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgWyhtb2RlKV09XCJuek1vZGVcIlxuICAgICAgKG1vZGVDaGFuZ2UpPVwib25Nb2RlQ2hhbmdlKCRldmVudClcIlxuICAgICAgKHllYXJDaGFuZ2UpPVwib25ZZWFyU2VsZWN0KCRldmVudClcIlxuICAgICAgKG1vbnRoQ2hhbmdlKT1cIm9uTW9udGhTZWxlY3QoJGV2ZW50KVwiXG4gICAgPlxuICAgIDwvbnotY2FsZW5kYXItaGVhZGVyPlxuXG4gICAgPGRpdiBjbGFzcz1cImFudC1waWNrZXItcGFuZWxcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcGlja2VyLXt7IG56TW9kZSA9PT0gJ21vbnRoJyA/ICdkYXRlJyA6ICdtb250aCcgfX0tcGFuZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1waWNrZXItYm9keVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuek1vZGUgPT09ICdtb250aCc7IHRoZW4gbW9udGhNb2RlVGFibGU7IGVsc2UgeWVhck1vZGVUYWJsZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSAjbW9udGhNb2RlVGFibGU+XG4gICAgICA8IS0tICBUT0RPKEB3ZW5xaTczKSBbY2VsbFJlbmRlcl0gW2Z1bGxDZWxsUmVuZGVyXSAtLT5cbiAgICAgIDxkYXRlLXRhYmxlXG4gICAgICAgIFtwcmVmaXhDbHNdPVwicHJlZml4Q2xzXCJcbiAgICAgICAgW3ZhbHVlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbYWN0aXZlRGF0ZV09XCJhY3RpdmVEYXRlXCJcbiAgICAgICAgW2NlbGxSZW5kZXJdPVwiJGFueShkYXRlQ2VsbClcIlxuICAgICAgICBbZnVsbENlbGxSZW5kZXJdPVwiJGFueShkYXRlRnVsbENlbGwpXCJcbiAgICAgICAgW2Rpc2FibGVkRGF0ZV09XCJuekRpc2FibGVkRGF0ZVwiXG4gICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICA+PC9kYXRlLXRhYmxlPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tICBUT0RPKEB3ZW5xaTczKSBbY2VsbFJlbmRlcl0gW2Z1bGxDZWxsUmVuZGVyXSAtLT5cbiAgICA8bmctdGVtcGxhdGUgI3llYXJNb2RlVGFibGU+XG4gICAgICA8bW9udGgtdGFibGVcbiAgICAgICAgW3ByZWZpeENsc109XCJwcmVmaXhDbHNcIlxuICAgICAgICBbdmFsdWVdPVwiYWN0aXZlRGF0ZVwiXG4gICAgICAgIFthY3RpdmVEYXRlXT1cImFjdGl2ZURhdGVcIlxuICAgICAgICBbY2VsbFJlbmRlcl09XCIkYW55KG1vbnRoQ2VsbClcIlxuICAgICAgICBbZnVsbENlbGxSZW5kZXJdPVwiJGFueShtb250aEZ1bGxDZWxsKVwiXG4gICAgICAgICh2YWx1ZUNoYW5nZSk9XCJvbkRhdGVTZWxlY3QoJGV2ZW50KVwiXG4gICAgICA+PC9tb250aC10YWJsZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcGlja2VyLWNhbGVuZGFyXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItY2FsZW5kYXItZnVsbF0nOiAnbnpGdWxsc2NyZWVuJyxcbiAgICAnW2NsYXNzLmFudC1waWNrZXItY2FsZW5kYXItbWluaV0nOiAnIW56RnVsbHNjcmVlbidcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpDYWxlbmRhckNvbXBvbmVudCksIG11bHRpOiB0cnVlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE56Q2FsZW5kYXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RnVsbHNjcmVlbjogQm9vbGVhbklucHV0O1xuXG4gIGFjdGl2ZURhdGU6IENhbmR5RGF0ZSA9IG5ldyBDYW5keURhdGUoKTtcbiAgcHJlZml4Q2xzOiBzdHJpbmcgPSAnYW50LXBpY2tlci1jYWxlbmRhcic7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZUZuOiAoZGF0ZTogRGF0ZSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hGbjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIEBJbnB1dCgpIG56TW9kZTogTnpDYWxlbmRhck1vZGUgPSAnbW9udGgnO1xuICBASW5wdXQoKSBuelZhbHVlPzogRGF0ZTtcbiAgQElucHV0KCkgbnpEaXNhYmxlZERhdGU/OiAoZGF0ZTogRGF0ZSkgPT4gYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpNb2RlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpDYWxlbmRhck1vZGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpQYW5lbENoYW5nZTogRXZlbnRFbWl0dGVyPHsgZGF0ZTogRGF0ZTsgbW9kZTogTnpDYWxlbmRhck1vZGUgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelNlbGVjdENoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpWYWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYW5ub3QgdXNlIEBJbnB1dCBhbmQgQENvbnRlbnRDaGlsZCBvbiBvbmUgdmFyaWFibGVcbiAgICogYmVjYXVzZSB7IHN0YXRpYzogZmFsc2UgfSB3aWxsIG1ha2UgQElucHV0IHByb3BlcnR5IGdldCBkZWxheWVkXG4gICAqKi9cbiAgQElucHV0KCkgbnpEYXRlQ2VsbD86IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGU7XG4gIEBDb250ZW50Q2hpbGQoRGF0ZUNlbGwsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbnpEYXRlQ2VsbENoaWxkPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgZ2V0IGRhdGVDZWxsKCk6IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGUge1xuICAgIHJldHVybiAodGhpcy5uekRhdGVDZWxsIHx8IHRoaXMubnpEYXRlQ2VsbENoaWxkKSE7XG4gIH1cblxuICBASW5wdXQoKSBuekRhdGVGdWxsQ2VsbD86IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGU7XG4gIEBDb250ZW50Q2hpbGQoRGF0ZUZ1bGxDZWxsLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG56RGF0ZUZ1bGxDZWxsQ2hpbGQ/OiBOekNhbGVuZGFyRGF0ZVRlbXBsYXRlO1xuICBnZXQgZGF0ZUZ1bGxDZWxsKCk6IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGUge1xuICAgIHJldHVybiAodGhpcy5uekRhdGVGdWxsQ2VsbCB8fCB0aGlzLm56RGF0ZUZ1bGxDZWxsQ2hpbGQpITtcbiAgfVxuXG4gIEBJbnB1dCgpIG56TW9udGhDZWxsPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgQENvbnRlbnRDaGlsZChNb250aENlbGwsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgbnpNb250aENlbGxDaGlsZD86IE56Q2FsZW5kYXJEYXRlVGVtcGxhdGU7XG4gIGdldCBtb250aENlbGwoKTogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZSB7XG4gICAgcmV0dXJuICh0aGlzLm56TW9udGhDZWxsIHx8IHRoaXMubnpNb250aENlbGxDaGlsZCkhO1xuICB9XG5cbiAgQElucHV0KCkgbnpNb250aEZ1bGxDZWxsPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgQENvbnRlbnRDaGlsZChNb250aEZ1bGxDZWxsLCB7IHN0YXRpYzogZmFsc2UsIHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG56TW9udGhGdWxsQ2VsbENoaWxkPzogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZTtcbiAgZ2V0IG1vbnRoRnVsbENlbGwoKTogTnpDYWxlbmRhckRhdGVUZW1wbGF0ZSB7XG4gICAgcmV0dXJuICh0aGlzLm56TW9udGhGdWxsQ2VsbCB8fCB0aGlzLm56TW9udGhGdWxsQ2VsbENoaWxkKSE7XG4gIH1cblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpGdWxsc2NyZWVuOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgb25Nb2RlQ2hhbmdlKG1vZGU6IE56Q2FsZW5kYXJNb2RlKTogdm9pZCB7XG4gICAgdGhpcy5uek1vZGVDaGFuZ2UuZW1pdChtb2RlKTtcbiAgICB0aGlzLm56UGFuZWxDaGFuZ2UuZW1pdCh7IGRhdGU6IHRoaXMuYWN0aXZlRGF0ZS5uYXRpdmVEYXRlLCBtb2RlIH0pO1xuICB9XG5cbiAgb25ZZWFyU2VsZWN0KHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmFjdGl2ZURhdGUuc2V0WWVhcih5ZWFyKTtcbiAgICB0aGlzLnVwZGF0ZURhdGUoZGF0ZSk7XG4gIH1cblxuICBvbk1vbnRoU2VsZWN0KG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5hY3RpdmVEYXRlLnNldE1vbnRoKG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZURhdGUoZGF0ZSk7XG4gIH1cblxuICBvbkRhdGVTZWxlY3QoZGF0ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgLy8gT25seSBhY3RpdmVEYXRlIGlzIGVub3VnaCBpbiBjYWxlbmRhclxuICAgIC8vIHRoaXMudmFsdWUgPSBkYXRlO1xuICAgIHRoaXMudXBkYXRlRGF0ZShkYXRlKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IERhdGUgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVEYXRlKG5ldyBDYW5keURhdGUodmFsdWUgYXMgRGF0ZSksIGZhbHNlKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChkYXRlOiBEYXRlKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaEZuID0gZm47XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZURhdGUoZGF0ZTogQ2FuZHlEYXRlLCB0b3VjaGVkOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGRhdGU7XG5cbiAgICBpZiAodG91Y2hlZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZUZuKGRhdGUubmF0aXZlRGF0ZSk7XG4gICAgICB0aGlzLm9uVG91Y2hGbigpO1xuICAgICAgdGhpcy5uelNlbGVjdENoYW5nZS5lbWl0KGRhdGUubmF0aXZlRGF0ZSk7XG4gICAgICB0aGlzLm56VmFsdWVDaGFuZ2UuZW1pdChkYXRlLm5hdGl2ZURhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZURhdGUobmV3IENhbmR5RGF0ZSh0aGlzLm56VmFsdWUpLCBmYWxzZSk7XG4gICAgfVxuICB9XG59XG4iXX0=