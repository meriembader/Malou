/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractTable } from './abstract-table';
export class YearTableComponent extends AbstractTable {
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
        const currentYear = this.activeDate && this.activeDate.getYear();
        const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
        const endYear = startYear + 9;
        const previousYear = startYear - 1;
        const years = [];
        let yearValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            const row = {
                dateCells: [],
                trackByIndex: startYear
            };
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                const yearNum = previousYear + yearValue;
                const year = this.activeDate.setYear(yearNum);
                const content = this.dateHelper.format(year.nativeDate, 'yyyy');
                const isDisabled = this.isDisabledYear(year);
                const cell = {
                    trackByIndex: content,
                    value: year.nativeDate,
                    isDisabled,
                    isSameDecade: yearNum >= startYear && yearNum <= endYear,
                    isSelected: yearNum === (this.value && this.value.getYear()),
                    content,
                    title: content,
                    classMap: {},
                    isLastCellInPanel: year.getYear() === endYear,
                    isFirstCellInPanel: year.getYear() === startYear,
                    cellRender: valueFunctionProp(this.cellRender, year),
                    fullCellRender: valueFunctionProp(this.fullCellRender, year),
                    onClick: () => this.chooseYear(cell.value.getFullYear()),
                    onMouseEnter: () => this.cellHover.emit(year)
                };
                this.addCellProperty(cell, year);
                row.dateCells.push(cell);
                yearValue++;
            }
            years.push(row);
        }
        return years;
    }
    getClassMap(cell) {
        return Object.assign(Object.assign({}, super.getClassMap(cell)), { [`ant-picker-cell-in-view`]: !!cell.isSameDecade });
    }
    isDisabledYear(year) {
        if (!this.disabledDate) {
            return false;
        }
        const firstOfMonth = year.setMonth(0).setDate(1);
        for (let date = firstOfMonth; date.getYear() === year.getYear(); date = date.addDays(1)) {
            if (!this.disabledDate(date.nativeDate)) {
                return false;
            }
        }
        return true;
    }
    addCellProperty(cell, year) {
        if (this.hasRangeValue()) {
            const [startHover, endHover] = this.hoverValue;
            const [startSelected, endSelected] = this.selectedValue;
            // Selected
            if (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isSameYear(year)) {
                cell.isSelectedStart = true;
                cell.isSelected = true;
            }
            if (endSelected === null || endSelected === void 0 ? void 0 : endSelected.isSameYear(year)) {
                cell.isSelectedEnd = true;
                cell.isSelected = true;
            }
            if (startHover && endHover) {
                cell.isHoverStart = startHover.isSameYear(year);
                cell.isHoverEnd = endHover.isSameYear(year);
                cell.isInHoverRange = startHover.isBeforeYear(year) && year.isBeforeYear(endHover);
            }
            cell.isStartSingle = startSelected && !endSelected;
            cell.isEndSingle = !startSelected && endSelected;
            cell.isInSelectedRange = (startSelected === null || startSelected === void 0 ? void 0 : startSelected.isBeforeYear(year)) && (year === null || year === void 0 ? void 0 : year.isBeforeYear(endSelected));
            cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
            cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
        }
        else if (year.isSameYear(this.value)) {
            cell.isSelected = true;
        }
        cell.classMap = this.getClassMap(cell);
    }
    chooseYear(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }
}
YearTableComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'year-table',
                exportAs: 'yearTable',
                template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
            },] }
];
YearTableComponent.ctorParameters = () => [
    { type: DateHelperService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL3llYXItdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBV2pELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxhQUFhO0lBSW5ELFlBQW9CLFVBQTZCO1FBQy9DLEtBQUssRUFBRSxDQUFDO1FBRFUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFIakQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFDLENBQUM7SUFJWixDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVELFlBQVk7UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsV0FBVyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzRCxNQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sWUFBWSxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkMsTUFBTSxLQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbEIs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b3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbmR5RGF0ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90aW1lJztcbmltcG9ydCB7IHZhbHVlRnVuY3Rpb25Qcm9wIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgRGF0ZUhlbHBlclNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgQWJzdHJhY3RUYWJsZSB9IGZyb20gJy4vYWJzdHJhY3QtdGFibGUnO1xuaW1wb3J0IHsgRGF0ZUJvZHlSb3csIERhdGVDZWxsLCBZZWFyQ2VsbCB9IGZyb20gJy4vaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAneWVhci10YWJsZScsXG4gIGV4cG9ydEFzOiAneWVhclRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICdhYnN0cmFjdC10YWJsZS5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBZZWFyVGFibGVDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFRhYmxlIHtcbiAgTUFYX1JPVyA9IDQ7XG4gIE1BWF9DT0wgPSAzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUhlbHBlcjogRGF0ZUhlbHBlclNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbWFrZUhlYWRSb3coKTogRGF0ZUNlbGxbXSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgbWFrZUJvZHlSb3dzKCk6IERhdGVCb2R5Um93W10ge1xuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdGhpcy5hY3RpdmVEYXRlICYmIHRoaXMuYWN0aXZlRGF0ZS5nZXRZZWFyKCk7XG4gICAgY29uc3Qgc3RhcnRZZWFyID0gcGFyc2VJbnQoYCR7Y3VycmVudFllYXIgLyAxMH1gLCAxMCkgKiAxMDtcbiAgICBjb25zdCBlbmRZZWFyID0gc3RhcnRZZWFyICsgOTtcbiAgICBjb25zdCBwcmV2aW91c1llYXIgPSBzdGFydFllYXIgLSAxO1xuICAgIGNvbnN0IHllYXJzOiBEYXRlQm9keVJvd1tdID0gW107XG4gICAgbGV0IHllYXJWYWx1ZSA9IDA7XG5cbiAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgdGhpcy5NQVhfUk9XOyByb3dJbmRleCsrKSB7XG4gICAgICBjb25zdCByb3c6IERhdGVCb2R5Um93ID0ge1xuICAgICAgICBkYXRlQ2VsbHM6IFtdLFxuICAgICAgICB0cmFja0J5SW5kZXg6IHN0YXJ0WWVhclxuICAgICAgfTtcbiAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCB0aGlzLk1BWF9DT0w7IGNvbEluZGV4KyspIHtcbiAgICAgICAgY29uc3QgeWVhck51bSA9IHByZXZpb3VzWWVhciArIHllYXJWYWx1ZTtcbiAgICAgICAgY29uc3QgeWVhciA9IHRoaXMuYWN0aXZlRGF0ZS5zZXRZZWFyKHllYXJOdW0pO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5kYXRlSGVscGVyLmZvcm1hdCh5ZWFyLm5hdGl2ZURhdGUsICd5eXl5Jyk7XG4gICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPSB0aGlzLmlzRGlzYWJsZWRZZWFyKHllYXIpO1xuICAgICAgICBjb25zdCBjZWxsOiBZZWFyQ2VsbCA9IHtcbiAgICAgICAgICB0cmFja0J5SW5kZXg6IGNvbnRlbnQsXG4gICAgICAgICAgdmFsdWU6IHllYXIubmF0aXZlRGF0ZSxcbiAgICAgICAgICBpc0Rpc2FibGVkLFxuICAgICAgICAgIGlzU2FtZURlY2FkZTogeWVhck51bSA+PSBzdGFydFllYXIgJiYgeWVhck51bSA8PSBlbmRZZWFyLFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IHllYXJOdW0gPT09ICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUuZ2V0WWVhcigpKSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIHRpdGxlOiBjb250ZW50LFxuICAgICAgICAgIGNsYXNzTWFwOiB7fSxcbiAgICAgICAgICBpc0xhc3RDZWxsSW5QYW5lbDogeWVhci5nZXRZZWFyKCkgPT09IGVuZFllYXIsXG4gICAgICAgICAgaXNGaXJzdENlbGxJblBhbmVsOiB5ZWFyLmdldFllYXIoKSA9PT0gc3RhcnRZZWFyLFxuICAgICAgICAgIGNlbGxSZW5kZXI6IHZhbHVlRnVuY3Rpb25Qcm9wKHRoaXMuY2VsbFJlbmRlciEsIHllYXIpLCAvLyBDdXN0b21pemVkIGNvbnRlbnRcbiAgICAgICAgICBmdWxsQ2VsbFJlbmRlcjogdmFsdWVGdW5jdGlvblByb3AodGhpcy5mdWxsQ2VsbFJlbmRlciEsIHllYXIpLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hvb3NlWWVhcihjZWxsLnZhbHVlLmdldEZ1bGxZZWFyKCkpLCAvLyBkb24ndCB1c2UgeWVhclZhbHVlIGhlcmUsXG4gICAgICAgICAgb25Nb3VzZUVudGVyOiAoKSA9PiB0aGlzLmNlbGxIb3Zlci5lbWl0KHllYXIpXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5hZGRDZWxsUHJvcGVydHkoY2VsbCwgeWVhcik7XG4gICAgICAgIHJvdy5kYXRlQ2VsbHMucHVzaChjZWxsKTtcbiAgICAgICAgeWVhclZhbHVlKys7XG4gICAgICB9XG4gICAgICB5ZWFycy5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiB5ZWFycztcbiAgfVxuXG4gIGdldENsYXNzTWFwKGNlbGw6IFllYXJDZWxsKTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXRDbGFzc01hcChjZWxsKSxcbiAgICAgIFtgYW50LXBpY2tlci1jZWxsLWluLXZpZXdgXTogISFjZWxsLmlzU2FtZURlY2FkZVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGlzRGlzYWJsZWRZZWFyKHllYXI6IENhbmR5RGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZERhdGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdE9mTW9udGggPSB5ZWFyLnNldE1vbnRoKDApLnNldERhdGUoMSk7XG5cbiAgICBmb3IgKGxldCBkYXRlID0gZmlyc3RPZk1vbnRoOyBkYXRlLmdldFllYXIoKSA9PT0geWVhci5nZXRZZWFyKCk7IGRhdGUgPSBkYXRlLmFkZERheXMoMSkpIHtcbiAgICAgIGlmICghdGhpcy5kaXNhYmxlZERhdGUoZGF0ZS5uYXRpdmVEYXRlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGFkZENlbGxQcm9wZXJ0eShjZWxsOiBEYXRlQ2VsbCwgeWVhcjogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGFzUmFuZ2VWYWx1ZSgpKSB7XG4gICAgICBjb25zdCBbc3RhcnRIb3ZlciwgZW5kSG92ZXJdID0gdGhpcy5ob3ZlclZhbHVlO1xuICAgICAgY29uc3QgW3N0YXJ0U2VsZWN0ZWQsIGVuZFNlbGVjdGVkXSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZTtcbiAgICAgIC8vIFNlbGVjdGVkXG4gICAgICBpZiAoc3RhcnRTZWxlY3RlZD8uaXNTYW1lWWVhcih5ZWFyKSkge1xuICAgICAgICBjZWxsLmlzU2VsZWN0ZWRTdGFydCA9IHRydWU7XG4gICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmRTZWxlY3RlZD8uaXNTYW1lWWVhcih5ZWFyKSkge1xuICAgICAgICBjZWxsLmlzU2VsZWN0ZWRFbmQgPSB0cnVlO1xuICAgICAgICBjZWxsLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnRIb3ZlciAmJiBlbmRIb3Zlcikge1xuICAgICAgICBjZWxsLmlzSG92ZXJTdGFydCA9IHN0YXJ0SG92ZXIuaXNTYW1lWWVhcih5ZWFyKTtcbiAgICAgICAgY2VsbC5pc0hvdmVyRW5kID0gZW5kSG92ZXIuaXNTYW1lWWVhcih5ZWFyKTtcbiAgICAgICAgY2VsbC5pc0luSG92ZXJSYW5nZSA9IHN0YXJ0SG92ZXIuaXNCZWZvcmVZZWFyKHllYXIpICYmIHllYXIuaXNCZWZvcmVZZWFyKGVuZEhvdmVyKTtcbiAgICAgIH1cbiAgICAgIGNlbGwuaXNTdGFydFNpbmdsZSA9IHN0YXJ0U2VsZWN0ZWQgJiYgIWVuZFNlbGVjdGVkO1xuICAgICAgY2VsbC5pc0VuZFNpbmdsZSA9ICFzdGFydFNlbGVjdGVkICYmIGVuZFNlbGVjdGVkO1xuICAgICAgY2VsbC5pc0luU2VsZWN0ZWRSYW5nZSA9IHN0YXJ0U2VsZWN0ZWQ/LmlzQmVmb3JlWWVhcih5ZWFyKSAmJiB5ZWFyPy5pc0JlZm9yZVllYXIoZW5kU2VsZWN0ZWQpO1xuICAgICAgY2VsbC5pc1JhbmdlU3RhcnROZWFySG92ZXIgPSBzdGFydFNlbGVjdGVkICYmIGNlbGwuaXNJbkhvdmVyUmFuZ2U7XG4gICAgICBjZWxsLmlzUmFuZ2VFbmROZWFySG92ZXIgPSBlbmRTZWxlY3RlZCAmJiBjZWxsLmlzSW5Ib3ZlclJhbmdlO1xuICAgIH0gZWxzZSBpZiAoeWVhci5pc1NhbWVZZWFyKHRoaXMudmFsdWUpKSB7XG4gICAgICBjZWxsLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICBjZWxsLmNsYXNzTWFwID0gdGhpcy5nZXRDbGFzc01hcChjZWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hvb3NlWWVhcih5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5hY3RpdmVEYXRlLnNldFllYXIoeWVhcik7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cbn1cbiJdfQ==