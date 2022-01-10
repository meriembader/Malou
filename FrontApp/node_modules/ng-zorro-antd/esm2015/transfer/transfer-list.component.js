/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzTransferListComponent {
    // #endregion
    constructor(cdr) {
        this.cdr = cdr;
        // #region fields
        this.direction = 'left';
        this.titleText = '';
        this.showSelectAll = true;
        this.dataSource = [];
        this.itemUnit = '';
        this.itemsUnit = '';
        this.filter = '';
        this.disabled = false;
        this.renderList = null;
        this.render = null;
        this.footer = null;
        // events
        this.handleSelectAll = new EventEmitter();
        this.handleSelect = new EventEmitter();
        this.filterChange = new EventEmitter();
        this.stat = {
            checkAll: false,
            checkHalf: false,
            checkCount: 0,
            shownCount: 0
        };
        this.onItemSelect = (item) => {
            if (this.disabled || item.disabled) {
                return;
            }
            item.checked = !item.checked;
            this.updateCheckStatus();
            this.handleSelect.emit(item);
        };
        this.onItemSelectAll = (status) => {
            this.dataSource.forEach(item => {
                if (!item.disabled && !item.hide) {
                    item.checked = status;
                }
            });
            this.updateCheckStatus();
            this.handleSelectAll.emit(status);
        };
    }
    updateCheckStatus() {
        const validCount = this.dataSource.filter(w => !w.disabled).length;
        this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
        this.stat.shownCount = this.dataSource.filter(w => !w.hide).length;
        this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
        this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    }
    // #endregion
    // #region search
    handleFilter(value) {
        this.filter = value;
        this.dataSource.forEach(item => {
            item.hide = value.length > 0 && !this.matchFilter(value, item);
        });
        this.stat.shownCount = this.dataSource.filter(w => !w.hide).length;
        this.filterChange.emit({ direction: this.direction, value });
    }
    handleClear() {
        this.handleFilter('');
    }
    matchFilter(text, item) {
        if (this.filterOption) {
            return this.filterOption(text, item);
        }
        return item.title.includes(text);
    }
    markForCheck() {
        this.updateCheckStatus();
        this.cdr.markForCheck();
    }
}
NzTransferListComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-transfer-list',
                exportAs: 'nzTransferList',
                preserveWhitespaces: false,
                template: `
    <ng-template #defaultRenderList>
      <ul *ngIf="stat.shownCount > 0" class="ant-transfer-list-content">
        <div class="LazyLoad" *ngFor="let item of dataSource">
          <li
            *ngIf="!item.hide"
            (click)="onItemSelect(item)"
            class="ant-transfer-list-content-item"
            [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
          >
            <label
              nz-checkbox
              [nzChecked]="item.checked"
              (nzCheckedChange)="onItemSelect(item)"
              (click)="$event.stopPropagation()"
              [nzDisabled]="disabled || item.disabled"
            >
              <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
              <ng-template #renderContainer [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
            </label>
          </li>
        </div>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="ant-transfer-list-body-not-found">
        <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
    </ng-template>
    <div class="ant-transfer-list-header">
      <label
        *ngIf="showSelectAll"
        nz-checkbox
        [nzChecked]="stat.checkAll"
        (nzCheckedChange)="onItemSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf"
        [nzDisabled]="stat.shownCount == 0 || disabled"
      ></label>
      <span class="ant-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }} {{ dataSource.length > 1 ? itemsUnit : itemUnit }}
        </span>
        <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
      </span>
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <div
          nz-transfer-search
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></div>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: dataSource,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
      <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.ant-transfer-list]': 'true',
                    '[class.ant-transfer-list-with-footer]': '!!footer'
                }
            },] }
];
NzTransferListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzTransferListComponent.propDecorators = {
    direction: [{ type: Input }],
    titleText: [{ type: Input }],
    showSelectAll: [{ type: Input }],
    dataSource: [{ type: Input }],
    itemUnit: [{ type: Input }],
    itemsUnit: [{ type: Input }],
    filter: [{ type: Input }],
    disabled: [{ type: Input }],
    showSearch: [{ type: Input }],
    searchPlaceholder: [{ type: Input }],
    notFoundContent: [{ type: Input }],
    filterOption: [{ type: Input }],
    renderList: [{ type: Input }],
    render: [{ type: Input }],
    footer: [{ type: Input }],
    handleSelectAll: [{ type: Output }],
    handleSelect: [{ type: Output }],
    filterChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RyYW5zZmVyLyIsInNvdXJjZXMiOlsidHJhbnNmZXItbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQThGdkIsTUFBTSxPQUFPLHVCQUF1QjtJQXNGbEMsYUFBYTtJQUViLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBdkYxQyxpQkFBaUI7UUFFUixjQUFTLEdBQXNCLE1BQU0sQ0FBQztRQUN0QyxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFFaEMsYUFBUSxHQUF1QixFQUFFLENBQUM7UUFDbEMsY0FBUyxHQUF1QixFQUFFLENBQUM7UUFDbkMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFNMUIsZUFBVSxHQUE2QixJQUFJLENBQUM7UUFDNUMsV0FBTSxHQUE2QixJQUFJLENBQUM7UUFDeEMsV0FBTSxHQUE2QixJQUFJLENBQUM7UUFFakQsU0FBUztRQUNVLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDckUsaUJBQVksR0FBK0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5RCxpQkFBWSxHQUFrRSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBILFNBQUksR0FBRztZQUNMLFFBQVEsRUFBRSxLQUFLO1lBQ2YsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLENBQUM7WUFDYixVQUFVLEVBQUUsQ0FBQztTQUNk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WSxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFNRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7WUF2TEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEVUO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLDJCQUEyQixFQUFFLE1BQU07b0JBQ25DLHVDQUF1QyxFQUFFLFVBQVU7aUJBQ3BEO2FBQ0Y7OztZQXBHQyxpQkFBaUI7Ozt3QkF3R2hCLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUVMLEtBQUs7dUJBRUwsS0FBSzt3QkFDTCxLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUVMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLOzhCQUdMLE1BQU07MkJBQ04sTUFBTTsyQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBUcmFuc2ZlckRpcmVjdGlvbiwgVHJhbnNmZXJJdGVtIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmFuc2Zlci1saXN0JyxcbiAgZXhwb3J0QXM6ICduelRyYW5zZmVyTGlzdCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFJlbmRlckxpc3Q+XG4gICAgICA8dWwgKm5nSWY9XCJzdGF0LnNob3duQ291bnQgPiAwXCIgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJMYXp5TG9hZFwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGRhdGFTb3VyY2VcIj5cbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgICpuZ0lmPVwiIWl0ZW0uaGlkZVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25JdGVtU2VsZWN0KGl0ZW0pXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3QtY29udGVudC1pdGVtXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2FudC10cmFuc2Zlci1saXN0LWNvbnRlbnQtaXRlbS1kaXNhYmxlZCc6IGRpc2FibGVkIHx8IGl0ZW0uZGlzYWJsZWQgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgIG56LWNoZWNrYm94XG4gICAgICAgICAgICAgIFtuekNoZWNrZWRdPVwiaXRlbS5jaGVja2VkXCJcbiAgICAgICAgICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJvbkl0ZW1TZWxlY3QoaXRlbSlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgICAgICAgICAgW256RGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhcmVuZGVyOyBlbHNlIHJlbmRlckNvbnRhaW5lclwiPnt7IGl0ZW0udGl0bGUgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNyZW5kZXJDb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwicmVuZGVyXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpdGVtIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2ICpuZ0lmPVwic3RhdC5zaG93bkNvdW50ID09PSAwXCIgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1ib2R5LW5vdC1mb3VuZFwiPlxuICAgICAgICA8bnotZW1iZWQtZW1wdHkgW256Q29tcG9uZW50TmFtZV09XCIndHJhbnNmZXInXCIgW3NwZWNpZmljQ29udGVudF09XCJub3RGb3VuZENvbnRlbnRcIj48L256LWVtYmVkLWVtcHR5PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3QtaGVhZGVyXCI+XG4gICAgICA8bGFiZWxcbiAgICAgICAgKm5nSWY9XCJzaG93U2VsZWN0QWxsXCJcbiAgICAgICAgbnotY2hlY2tib3hcbiAgICAgICAgW256Q2hlY2tlZF09XCJzdGF0LmNoZWNrQWxsXCJcbiAgICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJvbkl0ZW1TZWxlY3RBbGwoJGV2ZW50KVwiXG4gICAgICAgIFtuekluZGV0ZXJtaW5hdGVdPVwic3RhdC5jaGVja0hhbGZcIlxuICAgICAgICBbbnpEaXNhYmxlZF09XCJzdGF0LnNob3duQ291bnQgPT0gMCB8fCBkaXNhYmxlZFwiXG4gICAgICA+PC9sYWJlbD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3QtaGVhZGVyLXNlbGVjdGVkXCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIHt7IChzdGF0LmNoZWNrQ291bnQgPiAwID8gc3RhdC5jaGVja0NvdW50ICsgJy8nIDogJycpICsgc3RhdC5zaG93bkNvdW50IH19IHt7IGRhdGFTb3VyY2UubGVuZ3RoID4gMSA/IGl0ZW1zVW5pdCA6IGl0ZW1Vbml0IH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJ0aXRsZVRleHRcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWhlYWRlci10aXRsZVwiPnt7IHRpdGxlVGV4dCB9fTwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInt7IHNob3dTZWFyY2ggPyAnYW50LXRyYW5zZmVyLWxpc3QtYm9keSBhbnQtdHJhbnNmZXItbGlzdC1ib2R5LXdpdGgtc2VhcmNoJyA6ICdhbnQtdHJhbnNmZXItbGlzdC1ib2R5JyB9fVwiXG4gICAgICBbbmdDbGFzc109XCJ7ICdhbnQtdHJhbnNmZXJfX25vZGF0YSc6IHN0YXQuc2hvd25Db3VudCA9PT0gMCB9XCJcbiAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd1NlYXJjaFwiIGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3QtYm9keS1zZWFyY2gtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgbnotdHJhbnNmZXItc2VhcmNoXG4gICAgICAgICAgKHZhbHVlQ2hhbmdlZCk9XCJoYW5kbGVGaWx0ZXIoJGV2ZW50KVwiXG4gICAgICAgICAgKHZhbHVlQ2xlYXIpPVwiaGFuZGxlQ2xlYXIoKVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInNlYXJjaFBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJmaWx0ZXJcIlxuICAgICAgICA+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZW5kZXJMaXN0OyBlbHNlIGRlZmF1bHRSZW5kZXJMaXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1ib2R5LWN1c3RvbWl6ZS13cmFwcGVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgcmVuZGVyTGlzdDtcbiAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICRpbXBsaWNpdDogZGF0YVNvdXJjZSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgb25JdGVtU2VsZWN0QWxsOiBvbkl0ZW1TZWxlY3RBbGwsXG4gICAgICAgICAgICAgICAgb25JdGVtU2VsZWN0OiBvbkl0ZW1TZWxlY3QsXG4gICAgICAgICAgICAgICAgc3RhdDogc3RhdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcIlxuICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwiZm9vdGVyXCIgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1mb290ZXJcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGRpcmVjdGlvbiB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10cmFuc2Zlci1saXN0XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC10cmFuc2Zlci1saXN0LXdpdGgtZm9vdGVyXSc6ICchIWZvb3RlcidcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyYW5zZmVyTGlzdENvbXBvbmVudCB7XG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgQElucHV0KCkgdGl0bGVUZXh0ID0gJyc7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IFRyYW5zZmVySXRlbVtdID0gW107XG5cbiAgQElucHV0KCkgaXRlbVVuaXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICcnO1xuICBASW5wdXQoKSBpdGVtc1VuaXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICcnO1xuICBASW5wdXQoKSBmaWx0ZXIgPSAnJztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1NlYXJjaD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlYXJjaFBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBub3RGb3VuZENvbnRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZpbHRlck9wdGlvbj86IChpbnB1dFZhbHVlOiBzdHJpbmcsIGl0ZW06IFRyYW5zZmVySXRlbSkgPT4gYm9vbGVhbjtcblxuICBASW5wdXQoKSByZW5kZXJMaXN0OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZW5kZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGZvb3RlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICAvLyBldmVudHNcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGhhbmRsZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGFuZGxlU2VsZWN0OiBFdmVudEVtaXR0ZXI8VHJhbnNmZXJJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPHsgZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbjsgdmFsdWU6IHN0cmluZyB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzdGF0ID0ge1xuICAgIGNoZWNrQWxsOiBmYWxzZSxcbiAgICBjaGVja0hhbGY6IGZhbHNlLFxuICAgIGNoZWNrQ291bnQ6IDAsXG4gICAgc2hvd25Db3VudDogMFxuICB9O1xuXG4gIG9uSXRlbVNlbGVjdCA9IChpdGVtOiBUcmFuc2Zlckl0ZW0pID0+IHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBpdGVtLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgdGhpcy51cGRhdGVDaGVja1N0YXR1cygpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0LmVtaXQoaXRlbSk7XG4gIH07XG5cbiAgb25JdGVtU2VsZWN0QWxsID0gKHN0YXR1czogYm9vbGVhbikgPT4ge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKCFpdGVtLmRpc2FibGVkICYmICFpdGVtLmhpZGUpIHtcbiAgICAgICAgaXRlbS5jaGVja2VkID0gc3RhdHVzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVDaGVja1N0YXR1cygpO1xuICAgIHRoaXMuaGFuZGxlU2VsZWN0QWxsLmVtaXQoc3RhdHVzKTtcbiAgfTtcblxuICBwcml2YXRlIHVwZGF0ZUNoZWNrU3RhdHVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHZhbGlkQ291bnQgPSB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyKHcgPT4gIXcuZGlzYWJsZWQpLmxlbmd0aDtcbiAgICB0aGlzLnN0YXQuY2hlY2tDb3VudCA9IHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIodyA9PiB3LmNoZWNrZWQgJiYgIXcuZGlzYWJsZWQpLmxlbmd0aDtcbiAgICB0aGlzLnN0YXQuc2hvd25Db3VudCA9IHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIodyA9PiAhdy5oaWRlKS5sZW5ndGg7XG4gICAgdGhpcy5zdGF0LmNoZWNrQWxsID0gdmFsaWRDb3VudCA+IDAgJiYgdmFsaWRDb3VudCA9PT0gdGhpcy5zdGF0LmNoZWNrQ291bnQ7XG4gICAgdGhpcy5zdGF0LmNoZWNrSGFsZiA9IHRoaXMuc3RhdC5jaGVja0NvdW50ID4gMCAmJiAhdGhpcy5zdGF0LmNoZWNrQWxsO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIC8vICNyZWdpb24gc2VhcmNoXG5cbiAgaGFuZGxlRmlsdGVyKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlciA9IHZhbHVlO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5oaWRlID0gdmFsdWUubGVuZ3RoID4gMCAmJiAhdGhpcy5tYXRjaEZpbHRlcih2YWx1ZSwgaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5zdGF0LnNob3duQ291bnQgPSB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyKHcgPT4gIXcuaGlkZSkubGVuZ3RoO1xuICAgIHRoaXMuZmlsdGVyQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIGhhbmRsZUNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlRmlsdGVyKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgbWF0Y2hGaWx0ZXIodGV4dDogc3RyaW5nLCBpdGVtOiBUcmFuc2Zlckl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5maWx0ZXJPcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlck9wdGlvbih0ZXh0LCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0udGl0bGUuaW5jbHVkZXModGV4dCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNoZWNrU3RhdHVzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==