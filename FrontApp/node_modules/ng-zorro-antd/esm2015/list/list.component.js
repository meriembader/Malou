/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { BehaviorSubject } from 'rxjs';
import { NzListFooterComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';
export class NzListComponent {
    constructor() {
        this.nzBordered = false;
        this.nzGrid = '';
        this.nzItemLayout = 'horizontal';
        this.nzRenderItem = null;
        this.nzLoading = false;
        this.nzLoadMore = null;
        this.nzSize = 'default';
        this.nzSplit = true;
        this.hasSomethingAfterLastItem = false;
        this.itemLayoutNotifySource = new BehaviorSubject(this.nzItemLayout);
    }
    get itemLayoutNotify$() {
        return this.itemLayoutNotifySource.asObservable();
    }
    getSomethingAfterLastItem() {
        return !!(this.nzLoadMore ||
            this.nzPagination ||
            this.nzFooter ||
            this.nzListFooterComponent ||
            this.nzListPaginationComponent ||
            this.nzListLoadMoreDirective);
    }
    ngOnChanges(changes) {
        if (changes.nzItemLayout) {
            this.itemLayoutNotifySource.next(this.nzItemLayout);
        }
    }
    ngOnDestroy() {
        this.itemLayoutNotifySource.unsubscribe();
    }
    ngAfterContentInit() {
        this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
    }
}
NzListComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list, [nz-list]',
                exportAs: 'nzList',
                template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: item, index: index }"></ng-template>
        </ng-container>
        <ng-content select="nz-list-item, [nz-list-item]"></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template [ngTemplateOutlet]="nzRenderItem" [ngTemplateOutletContext]="{ $implicit: item, index: index }"></ng-template>
          </div>
        </div>
        <nz-list-empty *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0" [nzNoResult]="nzNoResult"></nz-list-empty>
      </ng-container>
      <ng-content></ng-content>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `,
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.ant-list]': 'true',
                    '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
                    '[class.ant-list-lg]': 'nzSize === "large"',
                    '[class.ant-list-sm]': 'nzSize === "small"',
                    '[class.ant-list-split]': 'nzSplit',
                    '[class.ant-list-bordered]': 'nzBordered',
                    '[class.ant-list-loading]': 'nzLoading',
                    '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
                }
            },] }
];
NzListComponent.ctorParameters = () => [];
NzListComponent.propDecorators = {
    nzDataSource: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzGrid: [{ type: Input }],
    nzHeader: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzItemLayout: [{ type: Input }],
    nzRenderItem: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzLoadMore: [{ type: Input }],
    nzPagination: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzSplit: [{ type: Input }],
    nzNoResult: [{ type: Input }],
    nzListFooterComponent: [{ type: ContentChild, args: [NzListFooterComponent,] }],
    nzListPaginationComponent: [{ type: ContentChild, args: [NzListPaginationComponent,] }],
    nzListLoadMoreDirective: [{ type: ContentChild, args: [NzListLoadMoreDirective,] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzListComponent.prototype, "nzBordered", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzListComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzListComponent.prototype, "nzSplit", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2xpc3QvIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQXNFeEcsTUFBTSxPQUFPLGVBQWU7SUFnQzFCO1FBekJ5QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25DLFdBQU0sR0FBcUIsRUFBRSxDQUFDO1FBRzlCLGlCQUFZLEdBQXNCLFlBQVksQ0FBQztRQUMvQyxpQkFBWSxHQUE2QixJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQyxlQUFVLEdBQTZCLElBQUksQ0FBQztRQUU1QyxXQUFNLEdBQWtCLFNBQVMsQ0FBQztRQUNsQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBT3hDLDhCQUF5QixHQUFHLEtBQUssQ0FBQztRQUUxQiwyQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBTTVFLENBQUM7SUFKaEIsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUlELHlCQUF5QjtRQUN2QixPQUFPLENBQUMsQ0FBQyxDQUNQLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLFlBQVk7WUFDakIsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMscUJBQXFCO1lBQzFCLElBQUksQ0FBQyx5QkFBeUI7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUM3QixDQUFDO0lBQ0osQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUNwRSxDQUFDOzs7WUE1SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RUO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLDJCQUEyQixFQUFFLDZCQUE2QjtvQkFDMUQscUJBQXFCLEVBQUUsb0JBQW9CO29CQUMzQyxxQkFBcUIsRUFBRSxvQkFBb0I7b0JBQzNDLHdCQUF3QixFQUFFLFNBQVM7b0JBQ25DLDJCQUEyQixFQUFFLFlBQVk7b0JBQ3pDLDBCQUEwQixFQUFFLFdBQVc7b0JBQ3ZDLDRDQUE0QyxFQUFFLDJCQUEyQjtpQkFDMUU7YUFDRjs7OzsyQkFPRSxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO29DQUVMLFlBQVksU0FBQyxxQkFBcUI7d0NBQ2xDLFlBQVksU0FBQyx5QkFBeUI7c0NBQ3RDLFlBQVksU0FBQyx1QkFBdUI7O0FBZlo7SUFBZixZQUFZLEVBQUU7O21EQUFvQjtBQU1uQjtJQUFmLFlBQVksRUFBRTs7a0RBQW1CO0FBSWxCO0lBQWYsWUFBWSxFQUFFOztnREFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOekRpcmVjdGlvblZIVHlwZSwgTnpTYWZlQW55LCBOelNpemVMRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTnpMaXN0R3JpZCB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IE56TGlzdEZvb3RlckNvbXBvbmVudCwgTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmUsIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QsIFtuei1saXN0XScsXG4gIGV4cG9ydEFzOiAnbnpMaXN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2l0ZW1zVHBsPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1saXN0LWl0ZW1zXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbnpEYXRhU291cmNlOyBsZXQgaW5kZXggPSBpbmRleFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuelJlbmRlckl0ZW1cIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpbmRleCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtaXRlbSwgW256LWxpc3QtaXRlbV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG56LWxpc3QtaGVhZGVyICpuZ0lmPVwibnpIZWFkZXJcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekhlYWRlclwiPnt7IG56SGVhZGVyIH19PC9uZy1jb250YWluZXI+XG4gICAgPC9uei1saXN0LWhlYWRlcj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1saXN0LWhlYWRlclwiPjwvbmctY29udGVudD5cblxuICAgIDxuei1zcGluIFtuelNwaW5uaW5nXT1cIm56TG9hZGluZ1wiPlxuICAgICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm56TG9hZGluZyAmJiBuekRhdGFTb3VyY2UgJiYgbnpEYXRhU291cmNlLmxlbmd0aCA9PT0gMFwiIFtzdHlsZS5taW4taGVpZ2h0LnB4XT1cIjUzXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJuekdyaWQgJiYgbnpEYXRhU291cmNlOyBlbHNlIGl0ZW1zVHBsXCIgbnotcm93IFtuekd1dHRlcl09XCJuekdyaWQuZ3V0dGVyIHx8IG51bGxcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBuei1jb2xcbiAgICAgICAgICAgIFtuelNwYW5dPVwibnpHcmlkLnNwYW4gfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpYc109XCJuekdyaWQueHMgfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpTbV09XCJuekdyaWQuc20gfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpNZF09XCJuekdyaWQubWQgfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpMZ109XCJuekdyaWQubGcgfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpYbF09XCJuekdyaWQueGwgfHwgbnVsbFwiXG4gICAgICAgICAgICBbbnpYWGxdPVwibnpHcmlkLnh4bCB8fCBudWxsXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIG56RGF0YVNvdXJjZTsgbGV0IGluZGV4ID0gaW5kZXhcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJuelJlbmRlckl0ZW1cIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpbmRleCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1saXN0LWVtcHR5ICpuZ0lmPVwiIW56TG9hZGluZyAmJiBuekRhdGFTb3VyY2UgJiYgbnpEYXRhU291cmNlLmxlbmd0aCA9PT0gMFwiIFtuek5vUmVzdWx0XT1cIm56Tm9SZXN1bHRcIj48L256LWxpc3QtZW1wdHk+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L256LXNwaW4+XG5cbiAgICA8bnotbGlzdC1mb290ZXIgKm5nSWY9XCJuekZvb3RlclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56Rm9vdGVyXCI+e3sgbnpGb290ZXIgfX08L25nLWNvbnRhaW5lcj5cbiAgICA8L256LWxpc3QtZm9vdGVyPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtZm9vdGVyLCBbbnotbGlzdC1mb290ZXJdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56TG9hZE1vcmVcIj48L25nLXRlbXBsYXRlPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWxpc3QtbG9hZC1tb3JlLCBbbnotbGlzdC1sb2FkLW1vcmVdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPG56LWxpc3QtcGFnaW5hdGlvbiAqbmdJZj1cIm56UGFnaW5hdGlvblwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56UGFnaW5hdGlvblwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uei1saXN0LXBhZ2luYXRpb24+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1wYWdpbmF0aW9uLCBbbnotbGlzdC1wYWdpbmF0aW9uXVwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtbGlzdF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC12ZXJ0aWNhbF0nOiAnbnpJdGVtTGF5b3V0ID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuYW50LWxpc3QtbGddJzogJ256U2l6ZSA9PT0gXCJsYXJnZVwiJyxcbiAgICAnW2NsYXNzLmFudC1saXN0LXNtXSc6ICduelNpemUgPT09IFwic21hbGxcIicsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1zcGxpdF0nOiAnbnpTcGxpdCcsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1ib3JkZXJlZF0nOiAnbnpCb3JkZXJlZCcsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1sb2FkaW5nXSc6ICduekxvYWRpbmcnLFxuICAgICdbY2xhc3MuYW50LWxpc3Qtc29tZXRoaW5nLWFmdGVyLWxhc3QtaXRlbV0nOiAnaGFzU29tZXRoaW5nQWZ0ZXJMYXN0SXRlbSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvcmRlcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxvYWRpbmc6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3BsaXQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R3JpZDogJycgfCBOekxpc3RHcmlkIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBuekRhdGFTb3VyY2U/OiBOelNhZmVBbnlbXTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Qm9yZGVyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpHcmlkPzogTnpMaXN0R3JpZCB8ICcnID0gJyc7XG4gIEBJbnB1dCgpIG56SGVhZGVyPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56Rm9vdGVyPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56SXRlbUxheW91dDogTnpEaXJlY3Rpb25WSFR5cGUgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIG56UmVuZGVySXRlbTogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBuekxvYWRNb3JlOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelBhZ2luYXRpb24/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTcGxpdCA9IHRydWU7XG4gIEBJbnB1dCgpIG56Tm9SZXN1bHQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBAQ29udGVudENoaWxkKE56TGlzdEZvb3RlckNvbXBvbmVudCkgbnpMaXN0Rm9vdGVyQ29tcG9uZW50ITogTnpMaXN0Rm9vdGVyQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQpIG56TGlzdFBhZ2luYXRpb25Db21wb25lbnQhOiBOekxpc3RQYWdpbmF0aW9uQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKE56TGlzdExvYWRNb3JlRGlyZWN0aXZlKSBuekxpc3RMb2FkTW9yZURpcmVjdGl2ZSE6IE56TGlzdExvYWRNb3JlRGlyZWN0aXZlO1xuXG4gIGhhc1NvbWV0aGluZ0FmdGVyTGFzdEl0ZW0gPSBmYWxzZTtcblxuICBwcml2YXRlIGl0ZW1MYXlvdXROb3RpZnlTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE56RGlyZWN0aW9uVkhUeXBlPih0aGlzLm56SXRlbUxheW91dCk7XG5cbiAgZ2V0IGl0ZW1MYXlvdXROb3RpZnkkKCk6IE9ic2VydmFibGU8TnpEaXJlY3Rpb25WSFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5pdGVtTGF5b3V0Tm90aWZ5U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFNvbWV0aGluZ0FmdGVyTGFzdEl0ZW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgdGhpcy5uekxvYWRNb3JlIHx8XG4gICAgICB0aGlzLm56UGFnaW5hdGlvbiB8fFxuICAgICAgdGhpcy5uekZvb3RlciB8fFxuICAgICAgdGhpcy5uekxpc3RGb290ZXJDb21wb25lbnQgfHxcbiAgICAgIHRoaXMubnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudCB8fFxuICAgICAgdGhpcy5uekxpc3RMb2FkTW9yZURpcmVjdGl2ZVxuICAgICk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56SXRlbUxheW91dCkge1xuICAgICAgdGhpcy5pdGVtTGF5b3V0Tm90aWZ5U291cmNlLm5leHQodGhpcy5uekl0ZW1MYXlvdXQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUxheW91dE5vdGlmeVNvdXJjZS51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaGFzU29tZXRoaW5nQWZ0ZXJMYXN0SXRlbSA9IHRoaXMuZ2V0U29tZXRoaW5nQWZ0ZXJMYXN0SXRlbSgpO1xuICB9XG59XG4iXX0=