/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CandyDate } from 'ng-zorro-antd/core/time';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
import { transCompatFormat } from './util';
export class DateTableComponent extends AbstractTable {
    constructor(i18n, dateHelper) {
        super();
        this.i18n = i18n;
        this.dateHelper = dateHelper;
    }
    changeValueFromInside(value) {
        // Only change date not change time
        this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
        this.valueChange.emit(this.activeDate);
        if (!this.activeDate.isSameMonth(this.value)) {
            this.render();
        }
    }
    makeHeadRow() {
        const weekDays = [];
        const start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
            const day = start.addDays(colIndex);
            weekDays.push({
                trackByIndex: null,
                value: day.nativeDate,
                title: this.dateHelper.format(day.nativeDate, 'E'),
                content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
                isSelected: false,
                isDisabled: false,
                onClick() { },
                onMouseEnter() { }
            });
        }
        return weekDays;
    }
    getVeryShortWeekFormat() {
        return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
    }
    makeBodyRows() {
        const weekRows = [];
        const firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let week = 0; week < this.MAX_ROW; week++) {
            const weekStart = firstDayOfMonth.addDays(week * 7);
            const row = {
                isActive: false,
                dateCells: [],
                trackByIndex: `${weekStart.getYear()}`
            };
            for (let day = 0; day < 7; day++) {
                const date = weekStart.addDays(day);
                const dateFormat = transCompatFormat(this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
                const title = this.dateHelper.format(date.nativeDate, dateFormat);
                const label = this.dateHelper.format(date.nativeDate, 'dd');
                const cell = {
                    trackByIndex: title,
                    value: date.nativeDate,
                    label: label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: title,
                    cellRender: valueFunctionProp(this.cellRender, date),
                    fullCellRender: valueFunctionProp(this.fullCellRender, date),
                    content: `${date.getDate()}`,
                    onClick: () => this.changeValueFromInside(date),
                    onMouseEnter: () => this.cellHover.emit(date)
                };
                this.addCellProperty(cell, date);
                if (this.showWeek && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }
                if (date.isSameDay(this.value)) {
                    row.isActive = date.isSameDay(this.value);
                }
                row.dateCells.push(cell);
            }
            row.classMap = {
                [`ant-picker-week-panel-row`]: this.showWeek,
                [`ant-picker-week-panel-row-selected`]: this.showWeek && row.isActive
            };
            weekRows.push(row);
        }
        return weekRows;
    }
    addCellProperty(cell, date) {
        var _a;
        if (this.hasRangeValue() && !this.showWeek) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isSameDay(date)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected === null || endSelected === void 0 ? void 0 : endSelected.isSameDay(date)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameDay(date);
                cell.isHoverEnd = endHover.isSameDay(date);
                cell.isLastCellInPanel = date.isLastDayOfMonth();
                cell.isFirstCellInPanel = date.isFirstDayOfMonth();
                cell.isInHoverRange = startHover.isBeforeDay(date) && date.isBeforeDay(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isBeforeDay(date)) && date.isBeforeDay(endSelected);
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        cell.isToday = date.isToday();
        cell.isSelected = date.isSameDay(this.value);
        cell.isDisabled = !!((_a = this.disabledDate) === null || _a === void 0 ? void 0 : _a.call(this, date.nativeDate));
        cell.classMap = this.getClassMap(cell);
    }
    getClassMap(cell) {
        const date = new CandyDate(cell.value);
        return Object.assign(Object.assign({}, super.getClassMap(cell)), { [`ant-picker-cell-today`]: !!cell.isToday, [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate) });
    }
}
DateTableComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'date-table',
                exportAs: 'dateTable',
                template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
            },] }
];
DateTableComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: DateHelperService }
];
DateTableComponent.propDecorators = {
    locale: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsT0FBTyxFQUFFLGlCQUFpQixFQUEyQixhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBVTNDLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxhQUFhO0lBR25ELFlBQW9CLElBQW1CLEVBQVUsVUFBNkI7UUFDNUUsS0FBSyxFQUFFLENBQUM7UUFEVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7SUFFOUUsQ0FBQztJQUVPLHFCQUFxQixDQUFDLEtBQWdCO1FBQzVDLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZD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LENBQUMsSUFBSSxDQUFDLEtBQzFCLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDekMsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUM5RDtJQUNKLENBQUM7OztZQTdJRixTQUFTLFNBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyw4Q0FBOEM7Z0JBQzlDLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsb2tHQUFvQzthQUNyQzs7O1lBWm9ELGFBQWE7WUFBekQsaUJBQWlCOzs7cUJBY3ZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5keURhdGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdGltZSc7XG5pbXBvcnQgeyB2YWx1ZUZ1bmN0aW9uUHJvcCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgRGF0ZUhlbHBlclNlcnZpY2UsIE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlLCBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IEFic3RyYWN0VGFibGUgfSBmcm9tICcuL2Fic3RyYWN0LXRhYmxlJztcbmltcG9ydCB7IERhdGVCb2R5Um93LCBEYXRlQ2VsbCB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IHRyYW5zQ29tcGF0Rm9ybWF0IH0gZnJvbSAnLi91dGlsJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnZGF0ZS10YWJsZScsXG4gIGV4cG9ydEFzOiAnZGF0ZVRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Fic3RyYWN0LXRhYmxlLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUYWJsZUNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0VGFibGUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGxvY2FsZSE6IE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSwgcHJpdmF0ZSBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVZhbHVlRnJvbUluc2lkZSh2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgLy8gT25seSBjaGFuZ2UgZGF0ZSBub3QgY2hhbmdlIHRpbWVcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLmFjdGl2ZURhdGUuc2V0WWVhcih2YWx1ZS5nZXRZZWFyKCkpLnNldE1vbnRoKHZhbHVlLmdldE1vbnRoKCkpLnNldERhdGUodmFsdWUuZ2V0RGF0ZSgpKTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcblxuICAgIGlmICghdGhpcy5hY3RpdmVEYXRlLmlzU2FtZU1vbnRoKHRoaXMudmFsdWUpKSB7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VIZWFkUm93KCk6IERhdGVDZWxsW10ge1xuICAgIGNvbnN0IHdlZWtEYXlzOiBEYXRlQ2VsbFtdID0gW107XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmFjdGl2ZURhdGUuY2FsZW5kYXJTdGFydCh7IHdlZWtTdGFydHNPbjogdGhpcy5kYXRlSGVscGVyLmdldEZpcnN0RGF5T2ZXZWVrKCkgfSk7XG4gICAgZm9yIChsZXQgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHRoaXMuTUFYX0NPTDsgY29sSW5kZXgrKykge1xuICAgICAgY29uc3QgZGF5ID0gc3RhcnQuYWRkRGF5cyhjb2xJbmRleCk7XG4gICAgICB3ZWVrRGF5cy5wdXNoKHtcbiAgICAgICAgdHJhY2tCeUluZGV4OiBudWxsLFxuICAgICAgICB2YWx1ZTogZGF5Lm5hdGl2ZURhdGUsXG4gICAgICAgIHRpdGxlOiB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KGRheS5uYXRpdmVEYXRlLCAnRScpLCAvLyBlZy4gVHVlXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQoZGF5Lm5hdGl2ZURhdGUsIHRoaXMuZ2V0VmVyeVNob3J0V2Vla0Zvcm1hdCgpKSwgLy8gZWcuIFR1LFxuICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgaXNEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9uQ2xpY2soKTogdm9pZCB7fSxcbiAgICAgICAgb25Nb3VzZUVudGVyKCk6IHZvaWQge31cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla0RheXM7XG4gIH1cblxuICBwcml2YXRlIGdldFZlcnlTaG9ydFdlZWtGb3JtYXQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pMThuLmdldExvY2FsZUlkKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd6aCcpID09PSAwID8gJ0VFRUVFJyA6ICdFRUVFRUUnOyAvLyBVc2UgZXh0cmVtZSBzaG9ydCBmb3IgY2hpbmVzZVxuICB9XG5cbiAgbWFrZUJvZHlSb3dzKCk6IERhdGVCb2R5Um93W10ge1xuICAgIGNvbnN0IHdlZWtSb3dzOiBEYXRlQm9keVJvd1tdID0gW107XG4gICAgY29uc3QgZmlyc3REYXlPZk1vbnRoID0gdGhpcy5hY3RpdmVEYXRlLmNhbGVuZGFyU3RhcnQoeyB3ZWVrU3RhcnRzT246IHRoaXMuZGF0ZUhlbHBlci5nZXRGaXJzdERheU9mV2VlaygpIH0pO1xuXG4gICAgZm9yIChsZXQgd2VlayA9IDA7IHdlZWsgPCB0aGlzLk1BWF9ST1c7IHdlZWsrKykge1xuICAgICAgY29uc3Qgd2Vla1N0YXJ0ID0gZmlyc3REYXlPZk1vbnRoLmFkZERheXMod2VlayAqIDcpO1xuICAgICAgY29uc3Qgcm93OiBEYXRlQm9keVJvdyA9IHtcbiAgICAgICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgICAgICBkYXRlQ2VsbHM6IFtdLFxuICAgICAgICB0cmFja0J5SW5kZXg6IGAke3dlZWtTdGFydC5nZXRZZWFyKCl9YFxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgZGF5ID0gMDsgZGF5IDwgNzsgZGF5KyspIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHdlZWtTdGFydC5hZGREYXlzKGRheSk7XG4gICAgICAgIGNvbnN0IGRhdGVGb3JtYXQgPSB0cmFuc0NvbXBhdEZvcm1hdCh0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnRGF0ZVBpY2tlci5sYW5nLmRhdGVGb3JtYXQnLCAnWVlZWS1NTS1ERCcpKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KGRhdGUubmF0aXZlRGF0ZSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5kYXRlSGVscGVyLmZvcm1hdChkYXRlLm5hdGl2ZURhdGUsICdkZCcpO1xuICAgICAgICBjb25zdCBjZWxsOiBEYXRlQ2VsbCA9IHtcbiAgICAgICAgICB0cmFja0J5SW5kZXg6IHRpdGxlLFxuICAgICAgICAgIHZhbHVlOiBkYXRlLm5hdGl2ZURhdGUsXG4gICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzVG9kYXk6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICBjZWxsUmVuZGVyOiB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLmNlbGxSZW5kZXIhLCBkYXRlKSwgLy8gQ3VzdG9taXplZCBjb250ZW50XG4gICAgICAgICAgZnVsbENlbGxSZW5kZXI6IHZhbHVlRnVuY3Rpb25Qcm9wKHRoaXMuZnVsbENlbGxSZW5kZXIhLCBkYXRlKSxcbiAgICAgICAgICBjb250ZW50OiBgJHtkYXRlLmdldERhdGUoKX1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hhbmdlVmFsdWVGcm9tSW5zaWRlKGRhdGUpLFxuICAgICAgICAgIG9uTW91c2VFbnRlcjogKCkgPT4gdGhpcy5jZWxsSG92ZXIuZW1pdChkYXRlKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYWRkQ2VsbFByb3BlcnR5KGNlbGwsIGRhdGUpO1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrICYmICFyb3cud2Vla051bSkge1xuICAgICAgICAgIHJvdy53ZWVrTnVtID0gdGhpcy5kYXRlSGVscGVyLmdldElTT1dlZWsoZGF0ZS5uYXRpdmVEYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZS5pc1NhbWVEYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICByb3cuaXNBY3RpdmUgPSBkYXRlLmlzU2FtZURheSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByb3cuZGF0ZUNlbGxzLnB1c2goY2VsbCk7XG4gICAgICB9XG4gICAgICByb3cuY2xhc3NNYXAgPSB7XG4gICAgICAgIFtgYW50LXBpY2tlci13ZWVrLXBhbmVsLXJvd2BdOiB0aGlzLnNob3dXZWVrLFxuICAgICAgICBbYGFudC1waWNrZXItd2Vlay1wYW5lbC1yb3ctc2VsZWN0ZWRgXTogdGhpcy5zaG93V2VlayAmJiByb3cuaXNBY3RpdmVcbiAgICAgIH07XG4gICAgICB3ZWVrUm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiB3ZWVrUm93cztcbiAgfVxuXG4gIGFkZENlbGxQcm9wZXJ0eShjZWxsOiBEYXRlQ2VsbCwgZGF0ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzUmFuZ2VWYWx1ZSgpICYmICF0aGlzLnNob3dXZWVrKSB7XG4gICAgICBjb25zdCBbc3RhcnRIb3ZlciwgZW5kSG92ZXJdID0gdGhpcy5ob3ZlclZhbHVlO1xuICAgICAgY29uc3QgW3N0YXJ0U2VsZWN0ZWQsIGVuZFNlbGVjdGVkXSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZTtcbiAgICAgIC8vIFNlbGVjdGVkXG4gICAgICBpZiAoc3RhcnRTZWxlY3RlZD8uaXNTYW1lRGF5KGRhdGUpKSB7XG4gICAgICAgIGNlbGwuaXNTZWxlY3RlZFN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFNlbGVjdGVkPy5pc1NhbWVEYXkoZGF0ZSkpIHtcbiAgICAgICAgY2VsbC5pc1NlbGVjdGVkRW5kID0gdHJ1ZTtcbiAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0SG92ZXIgJiYgZW5kSG92ZXIpIHtcbiAgICAgICAgY2VsbC5pc0hvdmVyU3RhcnQgPSBzdGFydEhvdmVyLmlzU2FtZURheShkYXRlKTtcbiAgICAgICAgY2VsbC5pc0hvdmVyRW5kID0gZW5kSG92ZXIuaXNTYW1lRGF5KGRhdGUpO1xuICAgICAgICBjZWxsLmlzTGFzdENlbGxJblBhbmVsID0gZGF0ZS5pc0xhc3REYXlPZk1vbnRoKCk7XG4gICAgICAgIGNlbGwuaXNGaXJzdENlbGxJblBhbmVsID0gZGF0ZS5pc0ZpcnN0RGF5T2ZNb250aCgpO1xuICAgICAgICBjZWxsLmlzSW5Ib3ZlclJhbmdlID0gc3RhcnRIb3Zlci5pc0JlZm9yZURheShkYXRlKSAmJiBkYXRlLmlzQmVmb3JlRGF5KGVuZEhvdmVyKTtcbiAgICAgIH1cbiAgICAgIGNlbGwuaXNTdGFydFNpbmdsZSA9IHN0YXJ0U2VsZWN0ZWQgJiYgIWVuZFNlbGVjdGVkO1xuICAgICAgY2VsbC5pc0VuZFNpbmdsZSA9ICFzdGFydFNlbGVjdGVkICYmIGVuZFNlbGVjdGVkO1xuICAgICAgY2VsbC5pc0luU2VsZWN0ZWRSYW5nZSA9IHN0YXJ0U2VsZWN0ZWQ/LmlzQmVmb3JlRGF5KGRhdGUpICYmIGRhdGUuaXNCZWZvcmVEYXkoZW5kU2VsZWN0ZWQpO1xuICAgICAgY2VsbC5pc1JhbmdlU3RhcnROZWFySG92ZXIgPSBzdGFydFNlbGVjdGVkICYmIGNlbGwuaXNJbkhvdmVyUmFuZ2U7XG4gICAgICBjZWxsLmlzUmFuZ2VFbmROZWFySG92ZXIgPSBlbmRTZWxlY3RlZCAmJiBjZWxsLmlzSW5Ib3ZlclJhbmdlO1xuICAgIH1cblxuICAgIGNlbGwuaXNUb2RheSA9IGRhdGUuaXNUb2RheSgpO1xuICAgIGNlbGwuaXNTZWxlY3RlZCA9IGRhdGUuaXNTYW1lRGF5KHRoaXMudmFsdWUpO1xuICAgIGNlbGwuaXNEaXNhYmxlZCA9ICEhdGhpcy5kaXNhYmxlZERhdGU/LihkYXRlLm5hdGl2ZURhdGUpO1xuICAgIGNlbGwuY2xhc3NNYXAgPSB0aGlzLmdldENsYXNzTWFwKGNlbGwpO1xuICB9XG5cbiAgZ2V0Q2xhc3NNYXAoY2VsbDogRGF0ZUNlbGwpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBDYW5keURhdGUoY2VsbC52YWx1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldENsYXNzTWFwKGNlbGwpLFxuICAgICAgW2BhbnQtcGlja2VyLWNlbGwtdG9kYXlgXTogISFjZWxsLmlzVG9kYXksXG4gICAgICBbYGFudC1waWNrZXItY2VsbC1pbi12aWV3YF06IGRhdGUuaXNTYW1lTW9udGgodGhpcy5hY3RpdmVEYXRlKVxuICAgIH07XG4gIH1cbn1cbiJdfQ==