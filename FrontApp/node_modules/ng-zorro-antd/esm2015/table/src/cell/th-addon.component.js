import { __decorate, __metadata } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzThAddOnComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.manualClickOrder$ = new Subject();
        this.calcOperatorChange$ = new Subject();
        this.nzFilterValue = null;
        this.sortOrder = null;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrderChange$ = new Subject();
        this.destroy$ = new Subject();
        this.isNzShowSortChanged = false;
        this.isNzShowFilterChanged = false;
        this.nzFilterMultiple = true;
        this.nzSortOrder = null;
        this.nzSortPriority = false;
        this.nzSortDirections = ['ascend', 'descend', null];
        this.nzFilters = [];
        this.nzSortFn = null;
        this.nzFilterFn = null;
        this.nzShowSort = false;
        this.nzShowFilter = false;
        this.nzCustomFilter = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.nzFilterChange = new EventEmitter();
    }
    getNextSortDirection(sortDirections, current) {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
            return sortDirections[0];
        }
        else {
            return sortDirections[index + 1];
        }
    }
    emitNextSortValue() {
        if (this.nzShowSort) {
            const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
            this.setSortOrder(nextOrder);
            this.manualClickOrder$.next(this);
        }
    }
    setSortOrder(order) {
        this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
        if (this.sortOrder !== null) {
            this.setSortOrder(null);
        }
    }
    onFilterValueChange(value) {
        this.nzFilterChange.emit(value);
        this.nzFilterValue = value;
        this.updateCalcOperator();
    }
    updateCalcOperator() {
        this.calcOperatorChange$.next();
    }
    ngOnInit() {
        this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
            if (this.sortOrder !== order) {
                this.sortOrder = order;
                this.nzSortOrderChange.emit(order);
            }
            this.updateCalcOperator();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSortDirections, nzFilters, nzSortOrder, nzSortFn, nzFilterFn, nzSortPriority, nzFilterMultiple, nzShowSort, nzShowFilter } = changes;
        if (nzSortDirections) {
            if (this.nzSortDirections && this.nzSortDirections.length) {
                this.sortDirections = this.nzSortDirections;
            }
        }
        if (nzSortOrder) {
            this.sortOrder = this.nzSortOrder;
            this.setSortOrder(this.nzSortOrder);
        }
        if (nzShowSort) {
            this.isNzShowSortChanged = true;
        }
        if (nzShowFilter) {
            this.isNzShowFilterChanged = true;
        }
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
            this.nzShowSort = true;
        }
        if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
            this.nzShowFilter = true;
        }
        if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
            const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
            this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
        }
        if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
            this.updateCalcOperator();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzThAddOnComponent.decorators = [
    { type: Component, args: [{
                selector: 'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate"></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-table-column-has-sorters]': 'nzShowSort',
                    '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
                    '(click)': 'emitNextSortValue()'
                }
            },] }
];
NzThAddOnComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzThAddOnComponent.propDecorators = {
    nzColumnKey: [{ type: Input }],
    nzFilterMultiple: [{ type: Input }],
    nzSortOrder: [{ type: Input }],
    nzSortPriority: [{ type: Input }],
    nzSortDirections: [{ type: Input }],
    nzFilters: [{ type: Input }],
    nzSortFn: [{ type: Input }],
    nzFilterFn: [{ type: Input }],
    nzShowSort: [{ type: Input }],
    nzShowFilter: [{ type: Input }],
    nzCustomFilter: [{ type: Input }],
    nzCheckedChange: [{ type: Output }],
    nzSortOrderChange: [{ type: Output }],
    nzFilterChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowSort", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtYWRkb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy9jZWxsL3RoLWFkZG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHO0FBQ0gsdUNBQXVDO0FBQ3ZDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBc0MzQyxNQUFNLE9BQU8sa0JBQWtCO0lBa0U3QixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTdEMUMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDdEQsd0JBQW1CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNwQyxrQkFBYSxHQUF1QixJQUFJLENBQUM7UUFDekMsY0FBUyxHQUFxQixJQUFJLENBQUM7UUFDbkMsbUJBQWMsR0FBdUIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ25ELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QiwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFFN0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGdCQUFXLEdBQXFCLElBQUksQ0FBQztRQUNyQyxtQkFBYyxHQUFxQixLQUFLLENB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IFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuLyogdHNsaW50OmRpc2FibGU6Y29tcG9uZW50LXNlbGVjdG9yICovXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVGaWx0ZXJGbiwgTnpUYWJsZUZpbHRlckxpc3QsIE56VGFibGVGaWx0ZXJWYWx1ZSwgTnpUYWJsZVNvcnRGbiwgTnpUYWJsZVNvcnRPcmRlciB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhbbnpDb2x1bW5LZXldLCB0aFtuelNvcnRGbl0sIHRoW256U29ydE9yZGVyXSwgdGhbbnpGaWx0ZXJzXSwgdGhbbnpTaG93U29ydF0sIHRoW256U2hvd0ZpbHRlcl0sIHRoW256Q3VzdG9tRmlsdGVyXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdGFibGUtZmlsdGVyXG4gICAgICAqbmdJZj1cIm56U2hvd0ZpbHRlciB8fCBuekN1c3RvbUZpbHRlcjsgZWxzZSBub3RGaWx0ZXJUZW1wbGF0ZVwiXG4gICAgICBbY29udGVudFRlbXBsYXRlXT1cIm5vdEZpbHRlclRlbXBsYXRlXCJcbiAgICAgIFtleHRyYVRlbXBsYXRlXT1cImV4dHJhVGVtcGxhdGVcIlxuICAgICAgW2N1c3RvbUZpbHRlcl09XCJuekN1c3RvbUZpbHRlclwiXG4gICAgICBbZmlsdGVyTXVsdGlwbGVdPVwibnpGaWx0ZXJNdWx0aXBsZVwiXG4gICAgICBbbGlzdE9mRmlsdGVyXT1cIm56RmlsdGVyc1wiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cIm9uRmlsdGVyVmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPjwvbnotdGFibGUtZmlsdGVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjbm90RmlsdGVyVGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpTaG93U29ydCA/IHNvcnRUZW1wbGF0ZSA6IGNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2V4dHJhVGVtcGxhdGU+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbbnotdGgtZXh0cmFdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotZmlsdGVyLXRyaWdnZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI3NvcnRUZW1wbGF0ZT5cbiAgICAgIDxuei10YWJsZS1zb3J0ZXJzIFtzb3J0T3JkZXJdPVwic29ydE9yZGVyXCIgW3NvcnREaXJlY3Rpb25zXT1cInNvcnREaXJlY3Rpb25zXCIgW2NvbnRlbnRUZW1wbGF0ZV09XCJjb250ZW50VGVtcGxhdGVcIj48L256LXRhYmxlLXNvcnRlcnM+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtY29sdW1uLWhhcy1zb3J0ZXJzXSc6ICduelNob3dTb3J0JyxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jb2x1bW4tc29ydF0nOiBgc29ydE9yZGVyID09PSAnZGVzY2VuZCcgfHwgc29ydE9yZGVyID09PSAnYXNjZW5kJ2AsXG4gICAgJyhjbGljayknOiAnZW1pdE5leHRTb3J0VmFsdWUoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRoQWRkT25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1NvcnQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0ZpbHRlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDdXN0b21GaWx0ZXI6IEJvb2xlYW5JbnB1dDtcblxuICBtYW51YWxDbGlja09yZGVyJCA9IG5ldyBTdWJqZWN0PE56VGhBZGRPbkNvbXBvbmVudD4oKTtcbiAgY2FsY09wZXJhdG9yQ2hhbmdlJCA9IG5ldyBTdWJqZWN0KCk7XG4gIG56RmlsdGVyVmFsdWU6IE56VGFibGVGaWx0ZXJWYWx1ZSA9IG51bGw7XG4gIHNvcnRPcmRlcjogTnpUYWJsZVNvcnRPcmRlciA9IG51bGw7XG4gIHNvcnREaXJlY3Rpb25zOiBOelRhYmxlU29ydE9yZGVyW10gPSBbJ2FzY2VuZCcsICdkZXNjZW5kJywgbnVsbF07XG4gIHByaXZhdGUgc29ydE9yZGVyQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PE56VGFibGVTb3J0T3JkZXI+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGlzTnpTaG93U29ydENoYW5nZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc056U2hvd0ZpbHRlckNoYW5nZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDb2x1bW5LZXk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56RmlsdGVyTXVsdGlwbGUgPSB0cnVlO1xuICBASW5wdXQoKSBuelNvcnRPcmRlcjogTnpUYWJsZVNvcnRPcmRlciA9IG51bGw7XG4gIEBJbnB1dCgpIG56U29ydFByaW9yaXR5OiBudW1iZXIgfCBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56U29ydERpcmVjdGlvbnM6IE56VGFibGVTb3J0T3JkZXJbXSA9IFsnYXNjZW5kJywgJ2Rlc2NlbmQnLCBudWxsXTtcbiAgQElucHV0KCkgbnpGaWx0ZXJzOiBOelRhYmxlRmlsdGVyTGlzdCA9IFtdO1xuICBASW5wdXQoKSBuelNvcnRGbjogTnpUYWJsZVNvcnRGbiB8IGJvb2xlYW4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpGaWx0ZXJGbjogTnpUYWJsZUZpbHRlckZuIHwgYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93U29ydCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93RmlsdGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekN1c3RvbUZpbHRlciA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGVja2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bGw+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekZpbHRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJsZUZpbHRlclZhbHVlPigpO1xuXG4gIGdldE5leHRTb3J0RGlyZWN0aW9uKHNvcnREaXJlY3Rpb25zOiBOelRhYmxlU29ydE9yZGVyW10sIGN1cnJlbnQ6IE56VGFibGVTb3J0T3JkZXIpOiBOelRhYmxlU29ydE9yZGVyIHtcbiAgICBjb25zdCBpbmRleCA9IHNvcnREaXJlY3Rpb25zLmluZGV4T2YoY3VycmVudCk7XG4gICAgaWYgKGluZGV4ID09PSBzb3J0RGlyZWN0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gc29ydERpcmVjdGlvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzb3J0RGlyZWN0aW9uc1tpbmRleCArIDFdO1xuICAgIH1cbiAgfVxuXG4gIGVtaXROZXh0U29ydFZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56U2hvd1NvcnQpIHtcbiAgICAgIGNvbnN0IG5leHRPcmRlciA9IHRoaXMuZ2V0TmV4dFNvcnREaXJlY3Rpb24odGhpcy5zb3J0RGlyZWN0aW9ucywgdGhpcy5zb3J0T3JkZXIhKTtcbiAgICAgIHRoaXMuc2V0U29ydE9yZGVyKG5leHRPcmRlcik7XG4gICAgICB0aGlzLm1hbnVhbENsaWNrT3JkZXIkLm5leHQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0U29ydE9yZGVyKG9yZGVyOiBOelRhYmxlU29ydE9yZGVyKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UkLm5leHQob3JkZXIpO1xuICB9XG5cbiAgY2xlYXJTb3J0T3JkZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc29ydE9yZGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFNvcnRPcmRlcihudWxsKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbHRlclZhbHVlQ2hhbmdlKHZhbHVlOiBOelRhYmxlRmlsdGVyVmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLm56RmlsdGVyQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIHRoaXMubnpGaWx0ZXJWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlQ2FsY09wZXJhdG9yKCk7XG4gIH1cblxuICB1cGRhdGVDYWxjT3BlcmF0b3IoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjT3BlcmF0b3JDaGFuZ2UkLm5leHQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnRPcmRlckNoYW5nZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShvcmRlciA9PiB7XG4gICAgICBpZiAodGhpcy5zb3J0T3JkZXIgIT09IG9yZGVyKSB7XG4gICAgICAgIHRoaXMuc29ydE9yZGVyID0gb3JkZXI7XG4gICAgICAgIHRoaXMubnpTb3J0T3JkZXJDaGFuZ2UuZW1pdChvcmRlcik7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZUNhbGNPcGVyYXRvcigpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgbnpTb3J0RGlyZWN0aW9ucyxcbiAgICAgIG56RmlsdGVycyxcbiAgICAgIG56U29ydE9yZGVyLFxuICAgICAgbnpTb3J0Rm4sXG4gICAgICBuekZpbHRlckZuLFxuICAgICAgbnpTb3J0UHJpb3JpdHksXG4gICAgICBuekZpbHRlck11bHRpcGxlLFxuICAgICAgbnpTaG93U29ydCxcbiAgICAgIG56U2hvd0ZpbHRlclxuICAgIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelNvcnREaXJlY3Rpb25zKSB7XG4gICAgICBpZiAodGhpcy5uelNvcnREaXJlY3Rpb25zICYmIHRoaXMubnpTb3J0RGlyZWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9ucyA9IHRoaXMubnpTb3J0RGlyZWN0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG56U29ydE9yZGVyKSB7XG4gICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMubnpTb3J0T3JkZXI7XG4gICAgICB0aGlzLnNldFNvcnRPcmRlcih0aGlzLm56U29ydE9yZGVyKTtcbiAgICB9XG4gICAgaWYgKG56U2hvd1NvcnQpIHtcbiAgICAgIHRoaXMuaXNOelNob3dTb3J0Q2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChuelNob3dGaWx0ZXIpIHtcbiAgICAgIHRoaXMuaXNOelNob3dGaWx0ZXJDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgaXNGaXJzdENoYW5nZSA9ICh2YWx1ZTogU2ltcGxlQ2hhbmdlKSA9PiB2YWx1ZSAmJiB2YWx1ZS5maXJzdENoYW5nZSAmJiB2YWx1ZS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICBpZiAoKGlzRmlyc3RDaGFuZ2UobnpTb3J0T3JkZXIpIHx8IGlzRmlyc3RDaGFuZ2UobnpTb3J0Rm4pKSAmJiAhdGhpcy5pc056U2hvd1NvcnRDaGFuZ2VkKSB7XG4gICAgICB0aGlzLm56U2hvd1NvcnQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNGaXJzdENoYW5nZShuekZpbHRlcnMpICYmICF0aGlzLmlzTnpTaG93RmlsdGVyQ2hhbmdlZCkge1xuICAgICAgdGhpcy5uelNob3dGaWx0ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoKG56RmlsdGVycyB8fCBuekZpbHRlck11bHRpcGxlKSAmJiB0aGlzLm56U2hvd0ZpbHRlcikge1xuICAgICAgY29uc3QgbGlzdE9mVmFsdWUgPSB0aGlzLm56RmlsdGVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLmJ5RGVmYXVsdCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgICB0aGlzLm56RmlsdGVyVmFsdWUgPSB0aGlzLm56RmlsdGVyTXVsdGlwbGUgPyBsaXN0T2ZWYWx1ZSA6IGxpc3RPZlZhbHVlWzBdIHx8IG51bGw7XG4gICAgfVxuICAgIGlmIChuelNvcnRGbiB8fCBuekZpbHRlckZuIHx8IG56U29ydFByaW9yaXR5IHx8IG56RmlsdGVycykge1xuICAgICAgdGhpcy51cGRhdGVDYWxjT3BlcmF0b3IoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=