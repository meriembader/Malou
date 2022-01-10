/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
export class MonthTableComponent extends AbstractTable {
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
        this.MAX_ROW = 4;
        this.MAX_COL = 3;
    }
    makeHeadRow() {
        return [];
    }
    makeBodyRows() {
        const months = [];
        let monthValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: this.activeDate.getYear()
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const month = this.activeDate.setMonth(monthValue);
                const isDisabled = this.isDisabledMonth(month);
                const content = this.dateHelper.format(month.nativeDate, 'MMM');
                const cell = {
                    trackByIndex: content,
                    value: month.nativeDate,
                    isDisabled,
                    isSelected: month.isSameMonth(this.value),
                    content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp(this.cellRender, month),
                    fullCellRender: valueFunctionProp(this.fullCellRender, month),
                    onClick: () => this.chooseMonth(cell.value.getMonth()),
                    onMouseEnter: () => this.cellHover.emit(month)
                };
                this.addCellProperty(cell, month);
                row.dateCells.push(cell);
                monthValue++;
            }
            months.push(row);
        }
        return months;
    }
    isDisabledMonth(month) {
        if (!this.disabledDate) {
            return false;
        }
        const firstOfMonth = month.setDate(1);
        for (let date = firstOfMonth; date.getMonth() === month.getMonth(); date = date.addDays(1)) {
            if (!this.disabledDate(date.nativeDate)) {
                return false;
            }
        }
        return true;
    }
    addCellProperty(cell, month) {
        if (this.hasRangeValue()) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isSameMonth(month)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected === null || endSelected === void 0 ? void 0 : endSelected.isSameMonth(month)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameMonth(month);
                cell.isHoverEnd = endHover.isSameMonth(month);
                cell.isLastCellInPanel = month.getMonth() === 11;
                cell.isFirstCellInPanel = month.getMonth() === 0;
                cell.isInHoverRange = startHover.isBeforeMonth(month) && month.isBeforeMonth(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isBeforeMonth(month)) && (month === null || month === void 0 ? void 0 : month.isBeforeMonth(endSelected));
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        else if (month.isSameMonth(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }
    chooseMonth(month) {
        this.value = this.activeDate.setMonth(month);
        this.valueChange.emit(this.value);
    }
}
MonthTableComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'month-table',
                exportAs: 'monthTable',
                template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
            },] }
];
MonthTableComponent.ctorParameters = () => [
    { type: DateHelperService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9tb250aC10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBcUIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBV2pELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxhQUFhO0lBSXBELFlBQW9CLFVBQTZCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFIakQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFDLENBQUM7SUFJWixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLE1BQU0sR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixLQUFLLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUMxRCxNQUFNLEdBQUcsR0FBZ0I7Z0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTthQUN4QyxDQUFDO1lBRUYsS0FBSyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUs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Q3pDLENBQUM7SUFFTyxXQUFXLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUE3R0YsU0FBUyxTQUFDO2dCQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsOENBQThDO2dCQUM5QyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG9rR0FBa0M7YUFDbkM7OztZQVhRLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uQ2hhbmdlcywgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RpbWUnO1xuaW1wb3J0IHsgdmFsdWVGdW5jdGlvblByb3AgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBBYnN0cmFjdFRhYmxlIH0gZnJvbSAnLi9hYnN0cmFjdC10YWJsZSc7XG5pbXBvcnQgeyBEYXRlQm9keVJvdywgRGF0ZUNlbGwgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ21vbnRoLXRhYmxlJyxcbiAgZXhwb3J0QXM6ICdtb250aFRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICdhYnN0cmFjdC10YWJsZS5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBNb250aFRhYmxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RUYWJsZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgTUFYX1JPVyA9IDQ7XG4gIE1BWF9DT0wgPSAzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUhlbHBlcjogRGF0ZUhlbHBlclNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbWFrZUhlYWRSb3coKTogRGF0ZUNlbGxbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbWFrZUJvZHlSb3dzKCk6IERhdGVCb2R5Um93W10ge1xuICAgIGNvbnN0IG1vbnRoczogRGF0ZUJvZHlSb3dbXSA9IFtdO1xuICAgIGxldCBtb250aFZhbHVlID0gMDtcblxuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLk1BWF9ST1c7IHJvd0luZGV4KyspIHtcbiAgICAgIGNvbnN0IHJvdzogRGF0ZUJvZHlSb3cgPSB7XG4gICAgICAgIGRhdGVDZWxsczogW10sXG4gICAgICAgIHRyYWNrQnlJbmRleDogdGhpcy5hY3RpdmVEYXRlLmdldFllYXIoKVxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHRoaXMuTUFYX0NPTDsgY29sSW5kZXgrKykge1xuICAgICAgICBjb25zdCBtb250aCA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRNb250aChtb250aFZhbHVlKTtcbiAgICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IHRoaXMuaXNEaXNhYmxlZE1vbnRoKG1vbnRoKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQobW9udGgubmF0aXZlRGF0ZSwgJ01NTScpO1xuICAgICAgICBjb25zdCBjZWxsOiBEYXRlQ2VsbCA9IHtcbiAgICAgICAgICB0cmFja0J5SW5kZXg6IGNvbnRlbnQsXG4gICAgICAgICAgdmFsdWU6IG1vbnRoLm5hdGl2ZURhdGUsXG4gICAgICAgICAgaXNEaXNhYmxlZCxcbiAgICAgICAgICBpc1NlbGVjdGVkOiBtb250aC5pc1NhbWVNb250aCh0aGlzLnZhbHVlKSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICAgIGNsYXNzTWFwOiB7fSxcbiAgICAgICAgICBjZWxsUmVuZGVyOiB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLmNlbGxSZW5kZXIhLCBtb250aCksIC8vIEN1c3RvbWl6ZWQgY29udGVudFxuICAgICAgICAgIGZ1bGxDZWxsUmVuZGVyOiB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLmZ1bGxDZWxsUmVuZGVyISwgbW9udGgpLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hvb3NlTW9udGgoY2VsbC52YWx1ZS5nZXRNb250aCgpKSwgLy8gZG9uJ3QgdXNlIG1vbnRoVmFsdWUgaGVyZSxcbiAgICAgICAgICBvbk1vdXNlRW50ZXI6ICgpID0+IHRoaXMuY2VsbEhvdmVyLmVtaXQobW9udGgpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRDZWxsUHJvcGVydHkoY2VsbCwgbW9udGgpO1xuICAgICAgICByb3cuZGF0ZUNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgIG1vbnRoVmFsdWUrKztcbiAgICAgIH1cbiAgICAgIG1vbnRocy5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBtb250aHM7XG4gIH1cblxuICBwcml2YXRlIGlzRGlzYWJsZWRNb250aChtb250aDogQ2FuZHlEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkRGF0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0T2ZNb250aCA9IG1vbnRoLnNldERhdGUoMSk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gZmlyc3RPZk1vbnRoOyBkYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoLmdldE1vbnRoKCk7IGRhdGUgPSBkYXRlLmFkZERheXMoMSkpIHtcbiAgICAgIGlmICghdGhpcy5kaXNhYmxlZERhdGUoZGF0ZS5uYXRpdmVEYXRlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGFkZENlbGxQcm9wZXJ0eShjZWxsOiBEYXRlQ2VsbCwgbW9udGg6IENhbmR5RGF0ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhhc1JhbmdlVmFsdWUoKSkge1xuICAgICAgY29uc3QgW3N0YXJ0SG92ZXIsIGVuZEhvdmVyXSA9IHRoaXMuaG92ZXJWYWx1ZTtcbiAgICAgIGNvbnN0IFtzdGFydFNlbGVjdGVkLCBlbmRTZWxlY3RlZF0gPSB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgICAvLyBTZWxlY3RlZFxuICAgICAgaWYgKHN0YXJ0U2VsZWN0ZWQ/LmlzU2FtZU1vbnRoKG1vbnRoKSkge1xuICAgICAgICBjZWxsLmlzU2VsZWN0ZWRTdGFydCA9IHRydWU7XG4gICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmRTZWxlY3RlZD8uaXNTYW1lTW9udGgobW9udGgpKSB7XG4gICAgICAgIGNlbGwuaXNTZWxlY3RlZEVuZCA9IHRydWU7XG4gICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFydEhvdmVyICYmIGVuZEhvdmVyKSB7XG4gICAgICAgIGNlbGwuaXNIb3ZlclN0YXJ0ID0gc3RhcnRIb3Zlci5pc1NhbWVNb250aChtb250aCk7XG4gICAgICAgIGNlbGwuaXNIb3ZlckVuZCA9IGVuZEhvdmVyLmlzU2FtZU1vbnRoKG1vbnRoKTtcbiAgICAgICAgY2VsbC5pc0xhc3RDZWxsSW5QYW5lbCA9IG1vbnRoLmdldE1vbnRoKCkgPT09IDExO1xuICAgICAgICBjZWxsLmlzRmlyc3RDZWxsSW5QYW5lbCA9IG1vbnRoLmdldE1vbnRoKCkgPT09IDA7XG4gICAgICAgIGNlbGwuaXNJbkhvdmVyUmFuZ2UgPSBzdGFydEhvdmVyLmlzQmVmb3JlTW9udGgobW9udGgpICYmIG1vbnRoLmlzQmVmb3JlTW9udGgoZW5kSG92ZXIpO1xuICAgICAgfVxuICAgICAgY2VsbC5pc1N0YXJ0U2luZ2xlID0gc3RhcnRTZWxlY3RlZCAmJiAhZW5kU2VsZWN0ZWQ7XG4gICAgICBjZWxsLmlzRW5kU2luZ2xlID0gIXN0YXJ0U2VsZWN0ZWQgJiYgZW5kU2VsZWN0ZWQ7XG4gICAgICBjZWxsLmlzSW5TZWxlY3RlZFJhbmdlID0gc3RhcnRTZWxlY3RlZD8uaXNCZWZvcmVNb250aChtb250aCkgJiYgbW9udGg/LmlzQmVmb3JlTW9udGgoZW5kU2VsZWN0ZWQpO1xuICAgICAgY2VsbC5pc1JhbmdlU3RhcnROZWFySG92ZXIgPSBzdGFydFNlbGVjdGVkICYmIGNlbGwuaXNJbkhvdmVyUmFuZ2U7XG4gICAgICBjZWxsLmlzUmFuZ2VFbmROZWFySG92ZXIgPSBlbmRTZWxlY3RlZCAmJiBjZWxsLmlzSW5Ib3ZlclJhbmdlO1xuICAgIH0gZWxzZSBpZiAobW9udGguaXNTYW1lTW9udGgodGhpcy52YWx1ZSkpIHtcbiAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgfVxuICAgIGNlbGwuY2xhc3NNYXAgPSB0aGlzLmdldENsYXNzTWFwKGNlbGwpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRNb250aChtb250aCk7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG59XG4iXX0=