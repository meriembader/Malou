/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractTable } from './abstract-table';
const MAX_ROW = 4;
const MAX_COL = 3;
export class DecadeTableComponent extends AbstractTable {
    get startYear() {
        return parseInt(`${this.activeDate.getYear() / 100}`, 10) * 100;
    }
    get endYear() {
        return this.startYear + 99;
    }
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const decades = [];
        const currentYear = this.value && this.value.getYear();
        const startYear = this.startYear;
        const endYear = this.endYear;
        const previousYear = startYear - 10;
        let index = 0;
        for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: previousYear
            };
            for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
                const start = previousYear + index * 10;
                const end = previousYear + index * 10 + 9;
                const content = `${start}-${end}`;
                const cell = {
                    trackByIndex: content,
                    value: this.activeDate.setYear(start).nativeDate,
                    content,
                    title: content,
                    isDisabled: false,
                    isSelected: currentYear >= start && currentYear <= end,
                    isLowerThanStart: end < startYear,
                    isBiggerThanEnd: start > endYear,
                    classMap: {},
                    onClick() { },
                    onMouseEnter() { }
                };
                cell.classMap = this.getClassMap(cell);
                cell.onClick = () => this.chooseDecade(start);
                index++;
                row.dateCells.push(cell);
            }
            decades.push(row);
        }
        return decades;
    }
    getClassMap(cell) {
        return {
            [`${this.prefixCls}-cell`]: true,
            [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
            [`${this.prefixCls}-cell-selected`]: cell.isSelected,
            [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
        };
    }
    chooseDecade(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
    }
}
DecadeTableComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'decade-table',
                exportAs: 'decadeTable',
                template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjYWRlLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZGF0ZS1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvZGVjYWRlLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFhLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRCxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBVWxCLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxhQUFhO0lBQ3JELElBQUksU0FBUztRQUNYLE9BQU8sUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbEUsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxPQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLE1BQU0sWUFBWSxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNyRCxNQUFNLEdBQUcsR0FBZ0I7Z0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFlBQVksRUFBRSxZQUFZO2FBQzNCLENBQUM7WUFFRixLQUFLLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNyRCxNQUFNLEtBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxHQUFHLEdBQUcsWUFBWSxHQUFHLEtBQUssR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLE9BQU8sR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFFbEMsTUFBTSxJQUFJLEdBQWU7b0JBQ3ZCLFlBQVksRUFBRSxPQUFPO29CQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVTtvQkFDaEQsT0FBTztvQkFDUCxLQUFLLEVBQUUsT0FBTztvQkFDZCxVQUFVLEVBQUUsS0FBSztvQkFDakIsVUFBVSxFQUFFLFdBQVcsSUFBSSxLQUFLLElBQUksV0FBVyxJQUFJLEdBQUc7b0JBQ3RELGdCQUFnQixFQUFFLEdBQUcsR0FBRyxTQUFTO29CQUNqQyxlQUFlLEVBQUUsS0FBSyxHQUFHLE9BQU87b0JBQ2hDLFFBQVEsRUFBRSxFQUFFO29CQUNaLE9BQU8sS0FBVSxDQUFDO29CQUNsQixZQUFZLEtBQVUsQ0FBQztpQkFDeEIsQ0FBQztnQkFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFnQjtRQUMxQixPQUFPO1lBQ0wsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLE9BQU8sQ0FBQyxFQUFFLElBQUk7WUFDaEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0I7WUFDbkYsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDcEQsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLGdCQUFnQixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDckQsQ0FBQztJQUNKLENBQUM7SUFFTyxZQUFZLENBQUMsSUFBWTtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUE3RUYsU0FBUyxTQUFDO2dCQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsOENBQThDO2dCQUM5QyxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLG9rR0FBa0M7YUFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFRhYmxlIH0gZnJvbSAnLi9hYnN0cmFjdC10YWJsZSc7XG5pbXBvcnQgeyBEYXRlQm9keVJvdywgRGF0ZUNlbGwsIERlY2FkZUNlbGwgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbmNvbnN0IE1BWF9ST1cgPSA0O1xuY29uc3QgTUFYX0NPTCA9IDM7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2RlY2FkZS10YWJsZScsXG4gIGV4cG9ydEFzOiAnZGVjYWRlVGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJ2Fic3RyYWN0LXRhYmxlLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIERlY2FkZVRhYmxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RUYWJsZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIGdldCBzdGFydFllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYCR7dGhpcy5hY3RpdmVEYXRlLmdldFllYXIoKSAvIDEwMH1gLCAxMCkgKiAxMDA7XG4gIH1cblxuICBnZXQgZW5kWWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0WWVhciArIDk5O1xuICB9XG5cbiAgbWFrZUhlYWRSb3coKTogRGF0ZUNlbGxbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbWFrZUJvZHlSb3dzKCk6IERhdGVCb2R5Um93W10ge1xuICAgIGNvbnN0IGRlY2FkZXM6IERhdGVCb2R5Um93W10gPSBbXTtcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5nZXRZZWFyKCk7XG4gICAgY29uc3Qgc3RhcnRZZWFyID0gdGhpcy5zdGFydFllYXI7XG4gICAgY29uc3QgZW5kWWVhciA9IHRoaXMuZW5kWWVhcjtcbiAgICBjb25zdCBwcmV2aW91c1llYXIgPSBzdGFydFllYXIgLSAxMDtcblxuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IE1BWF9ST1c7IHJvd0luZGV4KyspIHtcbiAgICAgIGNvbnN0IHJvdzogRGF0ZUJvZHlSb3cgPSB7XG4gICAgICAgIGRhdGVDZWxsczogW10sXG4gICAgICAgIHRyYWNrQnlJbmRleDogcHJldmlvdXNZZWFyXG4gICAgICB9O1xuXG4gICAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgTUFYX0NPTDsgY29sSW5kZXgrKykge1xuICAgICAgICBjb25zdCBzdGFydCA9IHByZXZpb3VzWWVhciArIGluZGV4ICogMTA7XG4gICAgICAgIGNvbnN0IGVuZCA9IHByZXZpb3VzWWVhciArIGluZGV4ICogMTAgKyA5O1xuICAgICAgICBjb25zdCBjb250ZW50ID0gYCR7c3RhcnR9LSR7ZW5kfWA7XG5cbiAgICAgICAgY29uc3QgY2VsbDogRGVjYWRlQ2VsbCA9IHtcbiAgICAgICAgICB0cmFja0J5SW5kZXg6IGNvbnRlbnQsXG4gICAgICAgICAgdmFsdWU6IHRoaXMuYWN0aXZlRGF0ZS5zZXRZZWFyKHN0YXJ0KS5uYXRpdmVEYXRlLFxuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgICAgaXNEaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgaXNTZWxlY3RlZDogY3VycmVudFllYXIgPj0gc3RhcnQgJiYgY3VycmVudFllYXIgPD0gZW5kLFxuICAgICAgICAgIGlzTG93ZXJUaGFuU3RhcnQ6IGVuZCA8IHN0YXJ0WWVhcixcbiAgICAgICAgICBpc0JpZ2dlclRoYW5FbmQ6IHN0YXJ0ID4gZW5kWWVhcixcbiAgICAgICAgICBjbGFzc01hcDoge30sXG4gICAgICAgICAgb25DbGljaygpOiB2b2lkIHt9LFxuICAgICAgICAgIG9uTW91c2VFbnRlcigpOiB2b2lkIHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgY2VsbC5jbGFzc01hcCA9IHRoaXMuZ2V0Q2xhc3NNYXAoY2VsbCk7XG4gICAgICAgIGNlbGwub25DbGljayA9ICgpID0+IHRoaXMuY2hvb3NlRGVjYWRlKHN0YXJ0KTtcbiAgICAgICAgaW5kZXgrKztcbiAgICAgICAgcm93LmRhdGVDZWxscy5wdXNoKGNlbGwpO1xuICAgICAgfVxuXG4gICAgICBkZWNhZGVzLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY2FkZXM7XG4gIH1cblxuICBnZXRDbGFzc01hcChjZWxsOiBEZWNhZGVDZWxsKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0ge1xuICAgIHJldHVybiB7XG4gICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWNlbGxgXTogdHJ1ZSxcbiAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY2VsbC1pbi12aWV3YF06ICFjZWxsLmlzQmlnZ2VyVGhhbkVuZCAmJiAhY2VsbC5pc0xvd2VyVGhhblN0YXJ0LFxuICAgICAgW2Ake3RoaXMucHJlZml4Q2xzfS1jZWxsLXNlbGVjdGVkYF06IGNlbGwuaXNTZWxlY3RlZCxcbiAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY2VsbC1kaXNhYmxlZGBdOiBjZWxsLmlzRGlzYWJsZWRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VEZWNhZGUoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRZZWFyKHllYXIpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl19