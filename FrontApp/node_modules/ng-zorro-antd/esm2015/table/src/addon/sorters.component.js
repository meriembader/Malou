/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzTableSortersComponent {
    constructor() {
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
    }
    ngOnChanges(changes) {
        const { sortDirections } = changes;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    }
}
NzTableSortersComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-sorters',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i nz-icon nzType="caret-up" *ngIf="isUp" class="ant-table-column-sorter-up" [class.active]="sortOrder == 'ascend'"></i>
        <i nz-icon nzType="caret-down" *ngIf="isDown" class="ant-table-column-sorter-down" [class.active]="sortOrder == 'descend'"></i>
      </span>
    </span>
  `,
                host: {
                    '[class.ant-table-column-sorters]': 'true'
                }
            },] }
];
NzTableSortersComponent.propDecorators = {
    sortDirections: [{ type: Input }],
    sortOrder: [{ type: Input }],
    contentTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2FkZG9uL3NvcnRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF5QyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCcEksTUFBTSxPQUFPLHVCQUF1QjtJQWxCcEM7UUFtQlcsbUJBQWMsR0FBdUIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ25DLG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUMvRCxTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsV0FBTSxHQUFHLEtBQUssQ0FBQztJQVFqQixDQUFDO0lBUEMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDbkMsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7R0FRVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osa0NBQWtDLEVBQUUsTUFBTTtpQkFDM0M7YUFDRjs7OzZCQUVFLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpUYWJsZVNvcnRPcmRlciB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFibGUtc29ydGVycycsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3Bhbj48bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlclwiIFtjbGFzcy5hbnQtdGFibGUtY29sdW1uLXNvcnRlci1mdWxsXT1cImlzRG93biAmJiBpc1VwXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC10YWJsZS1jb2x1bW4tc29ydGVyLWlubmVyXCI+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2FyZXQtdXBcIiAqbmdJZj1cImlzVXBcIiBjbGFzcz1cImFudC10YWJsZS1jb2x1bW4tc29ydGVyLXVwXCIgW2NsYXNzLmFjdGl2ZV09XCJzb3J0T3JkZXIgPT0gJ2FzY2VuZCdcIj48L2k+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2FyZXQtZG93blwiICpuZ0lmPVwiaXNEb3duXCIgY2xhc3M9XCJhbnQtdGFibGUtY29sdW1uLXNvcnRlci1kb3duXCIgW2NsYXNzLmFjdGl2ZV09XCJzb3J0T3JkZXIgPT0gJ2Rlc2NlbmQnXCI+PC9pPlxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNvbHVtbi1zb3J0ZXJzXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFibGVTb3J0ZXJzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgc29ydERpcmVjdGlvbnM6IE56VGFibGVTb3J0T3JkZXJbXSA9IFsnYXNjZW5kJywgJ2Rlc2NlbmQnLCBudWxsXTtcbiAgQElucHV0KCkgc29ydE9yZGVyOiBOelRhYmxlU29ydE9yZGVyID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIGlzVXAgPSBmYWxzZTtcbiAgaXNEb3duID0gZmFsc2U7XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNvcnREaXJlY3Rpb25zIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChzb3J0RGlyZWN0aW9ucykge1xuICAgICAgdGhpcy5pc1VwID0gdGhpcy5zb3J0RGlyZWN0aW9ucy5pbmRleE9mKCdhc2NlbmQnKSAhPT0gLTE7XG4gICAgICB0aGlzLmlzRG93biA9IHRoaXMuc29ydERpcmVjdGlvbnMuaW5kZXhPZignZGVzY2VuZCcpICE9PSAtMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==