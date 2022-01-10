/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzTableFilterComponent {
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChanged = false;
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
    }
    trackByValue(_, item) {
        return item.value;
    }
    check(filter) {
        this.isChanged = true;
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
                if (item === filter) {
                    return Object.assign(Object.assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            });
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
                return Object.assign(Object.assign({}, item), { checked: item === filter });
            });
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
    confirm() {
        this.isVisible = false;
        this.emitFilterData();
    }
    reset() {
        this.isChanged = true;
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    }
    onVisibleChange(value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
    }
    emitFilterData() {
        if (this.isChanged) {
            const listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
            }
            this.isChanged = false;
        }
    }
    parseListOfFilter(listOfFilter, reset) {
        return listOfFilter.map(item => {
            const checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked };
        });
    }
    getCheckedStatus(listOfParsedFilter) {
        return listOfParsedFilter.some(item => item.checked);
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Table');
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { listOfFilter } = changes;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-filter',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span class="ant-table-filter-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li nz-menu-item [nzSelected]="f.checked" *ngFor="let f of listOfParsedFilter; trackBy: trackByValue" (click)="check(f)">
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">{{ locale.filterReset }}</button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
                host: {
                    '[class.ant-table-filter-column]': 'true'
                }
            },] }
];
NzTableFilterComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzTableFilterComponent.propDecorators = {
    contentTemplate: [{ type: Input }],
    customFilter: [{ type: Input }],
    extraTemplate: [{ type: Input }],
    filterMultiple: [{ type: Input }],
    listOfFilter: [{ type: Input }],
    filterChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvYWRkb24vZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sb0JBQW9CLENBQUM7QUFDekUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnRDNDLE1BQU0sT0FBTyxzQkFBc0I7SUFnRmpDLFlBQW9CLEdBQXNCLEVBQVUsSUFBbUI7UUFBbkQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBL0U5RCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7UUFDdEQsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGlCQUFZLEdBQXNCLEVBQUUsQ0FBQztRQUMzQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQ3RFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRWpDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHVCQUFrQixHQUF3QixFQUFFLENBQUM7SUFvRTZCLENBQUM7SUFsRTNFLFlBQVksQ0FBQyxDQUFTLEVBQUUsSUFBdUI7UUFDN0MsT0FBTyxJQUFJLENB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QUUsaUJBQWlCO2dCQUMzQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGlDQUFpQyxFQUFFLE1BQU07aUJBQzFDO2FBQ0Y7OztZQTlEQyxpQkFBaUI7WUFhVixhQUFhOzs7OEJBbURuQixLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBOelRhYmxlSTE4bkludGVyZmFjZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOelRhYmxlRmlsdGVyTGlzdCB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcblxuaW50ZXJmYWNlIE56VGhJdGVtSW50ZXJmYWNlIHtcbiAgdGV4dDogc3RyaW5nO1xuICB2YWx1ZTogTnpTYWZlQW55O1xuICBjaGVja2VkOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWJsZS1maWx0ZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtZmlsdGVyLWNvbHVtbi10aXRsZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9zcGFuPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY3VzdG9tRmlsdGVyOyBlbHNlIGV4dHJhVGVtcGxhdGVcIj5cbiAgICAgIDxuei1maWx0ZXItdHJpZ2dlclxuICAgICAgICBbbnpWaXNpYmxlXT1cImlzVmlzaWJsZVwiXG4gICAgICAgIFtuekFjdGl2ZV09XCJpc0NoZWNrZWRcIlxuICAgICAgICBbbnpEcm9wZG93bk1lbnVdPVwiZmlsdGVyTWVudVwiXG4gICAgICAgIChuelZpc2libGVDaGFuZ2UpPVwib25WaXNpYmxlQ2hhbmdlKCRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImZpbHRlclwiIG56VGhlbWU9XCJmaWxsXCI+PC9pPlxuICAgICAgPC9uei1maWx0ZXItdHJpZ2dlcj5cbiAgICAgIDxuei1kcm9wZG93bi1tZW51ICNmaWx0ZXJNZW51PVwibnpEcm9wZG93bk1lbnVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1maWx0ZXItZHJvcGRvd25cIj5cbiAgICAgICAgICA8dWwgbnotbWVudT5cbiAgICAgICAgICAgIDxsaSBuei1tZW51LWl0ZW0gW256U2VsZWN0ZWRdPVwiZi5jaGVja2VkXCIgKm5nRm9yPVwibGV0IGYgb2YgbGlzdE9mUGFyc2VkRmlsdGVyOyB0cmFja0J5OiB0cmFja0J5VmFsdWVcIiAoY2xpY2spPVwiY2hlY2soZilcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIG56LXJhZGlvICpuZ0lmPVwiIWZpbHRlck11bHRpcGxlXCIgW25nTW9kZWxdPVwiZi5jaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2soZilcIj48L2xhYmVsPlxuICAgICAgICAgICAgICA8bGFiZWwgbnotY2hlY2tib3ggKm5nSWY9XCJmaWx0ZXJNdWx0aXBsZVwiIFtuZ01vZGVsXT1cImYuY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrKGYpXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNwYW4+e3sgZi50ZXh0IH19PC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFibGUtZmlsdGVyLWRyb3Bkb3duLWJ0bnNcIj5cbiAgICAgICAgICAgIDxidXR0b24gbnotYnV0dG9uIG56VHlwZT1cImxpbmtcIiBuelNpemU9XCJzbWFsbFwiIChjbGljayk9XCJyZXNldCgpXCIgW2Rpc2FibGVkXT1cIiFpc0NoZWNrZWRcIj57eyBsb2NhbGUuZmlsdGVyUmVzZXQgfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gbnotYnV0dG9uIG56VHlwZT1cInByaW1hcnlcIiBuelNpemU9XCJzbWFsbFwiIChjbGljayk9XCJjb25maXJtKClcIj57eyBsb2NhbGUuZmlsdGVyQ29uZmlybSB9fTwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbnotZHJvcGRvd24tbWVudT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWZpbHRlci1jb2x1bW5dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY3VzdG9tRmlsdGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV4dHJhVGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZmlsdGVyTXVsdGlwbGUgPSB0cnVlO1xuICBASW5wdXQoKSBsaXN0T2ZGaWx0ZXI6IE56VGFibGVGaWx0ZXJMaXN0ID0gW107XG4gIEBPdXRwdXQoKSByZWFkb25seSBmaWx0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56U2FmZUFueVtdIHwgTnpTYWZlQW55PigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgbG9jYWxlITogTnpUYWJsZUkxOG5JbnRlcmZhY2U7XG4gIGlzQ2hhbmdlZCA9IGZhbHNlO1xuICBpc0NoZWNrZWQgPSBmYWxzZTtcbiAgaXNWaXNpYmxlID0gZmFsc2U7XG4gIGxpc3RPZlBhcnNlZEZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2VbXSA9IFtdO1xuXG4gIHRyYWNrQnlWYWx1ZShfOiBudW1iZXIsIGl0ZW06IE56VGhJdGVtSW50ZXJmYWNlKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgfVxuXG4gIGNoZWNrKGZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2UpOiB2b2lkIHtcbiAgICB0aGlzLmlzQ2hhbmdlZCA9IHRydWU7XG4gICAgaWYgKHRoaXMuZmlsdGVyTXVsdGlwbGUpIHtcbiAgICAgIHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyID0gdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSA9PT0gZmlsdGVyKSB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uaXRlbSwgY2hlY2tlZDogIWZpbHRlci5jaGVja2VkIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZmlsdGVyLmNoZWNrZWQgPSAhZmlsdGVyLmNoZWNrZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdE9mUGFyc2VkRmlsdGVyID0gdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4geyAuLi5pdGVtLCBjaGVja2VkOiBpdGVtID09PSBmaWx0ZXIgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmlzQ2hlY2tlZCA9IHRoaXMuZ2V0Q2hlY2tlZFN0YXR1cyh0aGlzLmxpc3RPZlBhcnNlZEZpbHRlcik7XG4gIH1cblxuICBjb25maXJtKCk6IHZvaWQge1xuICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0RmlsdGVyRGF0YSgpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0NoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIgPSB0aGlzLnBhcnNlTGlzdE9mRmlsdGVyKHRoaXMubGlzdE9mRmlsdGVyLCB0cnVlKTtcbiAgICB0aGlzLmlzQ2hlY2tlZCA9IHRoaXMuZ2V0Q2hlY2tlZFN0YXR1cyh0aGlzLmxpc3RPZlBhcnNlZEZpbHRlcik7XG4gICAgdGhpcy5lbWl0RmlsdGVyRGF0YSgpO1xuICB9XG5cbiAgb25WaXNpYmxlQ2hhbmdlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc1Zpc2libGUgPSB2YWx1ZTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLmVtaXRGaWx0ZXJEYXRhKCk7XG4gICAgfVxuICB9XG5cbiAgZW1pdEZpbHRlckRhdGEoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBsaXN0T2ZDaGVja2VkID0gdGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jaGVja2VkKS5tYXAoaXRlbSA9PiBpdGVtLnZhbHVlKTtcbiAgICAgIGlmICh0aGlzLmZpbHRlck11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyQ2hhbmdlLmVtaXQobGlzdE9mQ2hlY2tlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbHRlckNoYW5nZS5lbWl0KGxpc3RPZkNoZWNrZWQubGVuZ3RoID4gMCA/IGxpc3RPZkNoZWNrZWRbMF0gOiBudWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VMaXN0T2ZGaWx0ZXIobGlzdE9mRmlsdGVyOiBOelRhYmxlRmlsdGVyTGlzdCwgcmVzZXQ/OiBib29sZWFuKTogTnpUaEl0ZW1JbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGxpc3RPZkZpbHRlci5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCBjaGVja2VkID0gcmVzZXQgPyBmYWxzZSA6ICEhaXRlbS5ieURlZmF1bHQ7XG4gICAgICByZXR1cm4geyB0ZXh0OiBpdGVtLnRleHQsIHZhbHVlOiBpdGVtLnZhbHVlLCBjaGVja2VkIH07XG4gICAgfSk7XG4gIH1cblxuICBnZXRDaGVja2VkU3RhdHVzKGxpc3RPZlBhcnNlZEZpbHRlcjogTnpUaEl0ZW1JbnRlcmZhY2VbXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaXN0T2ZQYXJzZWRGaWx0ZXIuc29tZShpdGVtID0+IGl0ZW0uY2hlY2tlZCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGFibGUnKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbGlzdE9mRmlsdGVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsaXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIgJiYgdGhpcy5saXN0T2ZGaWx0ZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxpc3RPZlBhcnNlZEZpbHRlciA9IHRoaXMucGFyc2VMaXN0T2ZGaWx0ZXIodGhpcy5saXN0T2ZGaWx0ZXIpO1xuICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLmdldENoZWNrZWRTdGF0dXModGhpcy5saXN0T2ZQYXJzZWRGaWx0ZXIpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==