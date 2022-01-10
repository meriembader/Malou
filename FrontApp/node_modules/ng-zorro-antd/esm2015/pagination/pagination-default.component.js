/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
export class NzPaginationDefaultComponent {
    constructor(renderer, elementRef) {
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    buildIndexes() {
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    getListOfPageItem(pageIndex, lastIndex) {
        const concatWithPrevNext = (listOfPage) => {
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        };
        const generatePage = (start, end) => {
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        };
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            const generateRangeItem = (selected, last) => {
                let listOfRange = [];
                const prevFiveItem = {
                    type: 'prev_5'
                };
                const nextFiveItem = {
                    type: 'next_5'
                };
                const firstPageItem = generatePage(1, 1);
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 4) {
                    listOfRange = [...generatePage(2, 5), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    listOfRange = [prevFiveItem, ...generatePage(last - 4, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            };
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
}
NzPaginationDefaultComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-pagination-default',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template [ngTemplateOutlet]="showTotal" [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `
            },] }
];
NzPaginationDefaultComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzPaginationDefaultComponent.propDecorators = {
    template: [{ type: ViewChild, args: ['containerTemplate', { static: true },] }],
    nzSize: [{ type: Input }],
    itemRender: [{ type: Input }],
    showTotal: [{ type: Input }],
    disabled: [{ type: Input }],
    locale: [{ type: Input }],
    showSizeChanger: [{ type: Input }],
    showQuickJumper: [{ type: Input }],
    total: [{ type: Input }],
    pageIndex: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }],
    pageIndexChange: [{ type: Output }],
    pageSizeChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1kZWZhdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcGFnaW5hdGlvbi8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24tZGVmYXVsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQThDdkIsTUFBTSxPQUFPLDRCQUE0QjtJQWtCdkMsWUFBWSxRQUFtQixFQUFFLFVBQXNCO1FBaEI5QyxXQUFNLEdBQXdCLFNBQVMsQ0FBQztRQUN4QyxlQUFVLEdBQW9ELElBQUksQ0FBQztRQUNuRSxjQUFTLEdBQXVFLElBQUksQ0FBQztRQUNyRixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLG9CQUFlLEdBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQy9ELFdBQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQixtQkFBYyxHQUE4QyxFQUFFLENBQUM7UUFHN0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMs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USxFQUFFLHVCQUF1QjtnQkFDakMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDVDthQUNGOzs7WUFsREMsU0FBUztZQUxULFVBQVU7Ozt1QkF5RFQsU0FBUyxTQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFDL0MsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQgfSBmcm9tICcuL3BhZ2luYXRpb24udHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wYWdpbmF0aW9uLWRlZmF1bHQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXJUZW1wbGF0ZT5cbiAgICAgIDxsaSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLXRvdGFsLXRleHRcIiAqbmdJZj1cInNob3dUb3RhbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2hvd1RvdGFsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0b3RhbCwgcmFuZ2U6IHJhbmdlcyB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgbGlzdE9mUGFnZUl0ZW07IHRyYWNrQnk6IHRyYWNrQnlQYWdlSXRlbVwiXG4gICAgICAgIG56LXBhZ2luYXRpb24taXRlbVxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFt0eXBlXT1cInBhZ2UudHlwZVwiXG4gICAgICAgIFtpbmRleF09XCJwYWdlLmluZGV4XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhcGFnZS5kaXNhYmxlZFwiXG4gICAgICAgIFtpdGVtUmVuZGVyXT1cIml0ZW1SZW5kZXJcIlxuICAgICAgICBbYWN0aXZlXT1cInBhZ2VJbmRleCA9PT0gcGFnZS5pbmRleFwiXG4gICAgICAgIChnb3RvSW5kZXgpPVwianVtcFBhZ2UoJGV2ZW50KVwiXG4gICAgICAgIChkaWZmSW5kZXgpPVwianVtcERpZmYoJGV2ZW50KVwiXG4gICAgICA+PC9saT5cbiAgICAgIDxkaXZcbiAgICAgICAgbnotcGFnaW5hdGlvbi1vcHRpb25zXG4gICAgICAgICpuZ0lmPVwic2hvd1F1aWNrSnVtcGVyIHx8IHNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFt0b3RhbF09XCJ0b3RhbFwiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW256U2l6ZV09XCJuelNpemVcIlxuICAgICAgICBbc2hvd1NpemVDaGFuZ2VyXT1cInNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFtzaG93UXVpY2tKdW1wZXJdPVwic2hvd1F1aWNrSnVtcGVyXCJcbiAgICAgICAgW3BhZ2VJbmRleF09XCJwYWdlSW5kZXhcIlxuICAgICAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIChwYWdlSW5kZXhDaGFuZ2UpPVwib25QYWdlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChwYWdlU2l6ZUNoYW5nZSk9XCJvblBhZ2VTaXplQ2hhbmdlKCRldmVudClcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpQYWdpbmF0aW9uRGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lclRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBuelNpemU6ICdkZWZhdWx0JyB8ICdzbWFsbCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1RvdGFsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyOyByYW5nZTogW251bWJlciwgbnVtYmVyXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBzaG93U2l6ZUNoYW5nZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1F1aWNrSnVtcGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFsxMCwgMjAsIDMwLCA0MF07XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHJhbmdlcyA9IFswLCAwXTtcbiAgbGlzdE9mUGFnZUl0ZW06IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0gW107XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSwgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGp1bXBQYWdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGluZGV4KTtcbiAgfVxuXG4gIGp1bXBEaWZmKGRpZmY6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuanVtcFBhZ2UodGhpcy5wYWdlSW5kZXggKyBkaWZmKTtcbiAgfVxuXG4gIHRyYWNrQnlQYWdlSXRlbShfOiBudW1iZXIsIHZhbHVlOiBQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dmFsdWUudHlwZX0tJHt2YWx1ZS5pbmRleH1gO1xuICB9XG5cbiAgb25QYWdlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZUluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICB9XG5cbiAgb25QYWdlU2l6ZUNoYW5nZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VTaXplQ2hhbmdlLm5leHQoc2l6ZSk7XG4gIH1cblxuICBnZXRMYXN0SW5kZXgodG90YWw6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbCAvIHBhZ2VTaXplKTtcbiAgfVxuXG4gIGJ1aWxkSW5kZXhlcygpOiB2b2lkIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmdldExhc3RJbmRleCh0aGlzLnRvdGFsLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmxpc3RPZlBhZ2VJdGVtID0gdGhpcy5nZXRMaXN0T2ZQYWdlSXRlbSh0aGlzLnBhZ2VJbmRleCwgbGFzdEluZGV4KTtcbiAgfVxuXG4gIGdldExpc3RPZlBhZ2VJdGVtKHBhZ2VJbmRleDogbnVtYmVyLCBsYXN0SW5kZXg6IG51bWJlcik6IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+IHtcbiAgICBjb25zdCBjb25jYXRXaXRoUHJldk5leHQgPSAobGlzdE9mUGFnZTogQXJyYXk8UGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pj4pID0+IHtcbiAgICAgIGNvbnN0IHByZXZJdGVtID0ge1xuICAgICAgICB0eXBlOiAncHJldicsXG4gICAgICAgIGRpc2FibGVkOiBwYWdlSW5kZXggPT09IDFcbiAgICAgIH07XG4gICAgICBjb25zdCBuZXh0SXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ25leHQnLFxuICAgICAgICBkaXNhYmxlZDogcGFnZUluZGV4ID09PSBsYXN0SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gW3ByZXZJdGVtLCAuLi5saXN0T2ZQYWdlLCBuZXh0SXRlbV07XG4gICAgfTtcbiAgICBjb25zdCBnZW5lcmF0ZVBhZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PiA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0eXBlOiAncGFnZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIGlmIChsYXN0SW5kZXggPD0gOSkge1xuICAgICAgcmV0dXJuIGNvbmNhdFdpdGhQcmV2TmV4dChnZW5lcmF0ZVBhZ2UoMSwgbGFzdEluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZ2VJdGVtID0gKHNlbGVjdGVkOiBudW1iZXIsIGxhc3Q6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgbGlzdE9mUmFuZ2UgPSBbXTtcbiAgICAgICAgY29uc3QgcHJldkZpdmVJdGVtID0ge1xuICAgICAgICAgIHR5cGU6ICdwcmV2XzUnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG5leHRGaXZlSXRlbSA9IHtcbiAgICAgICAgICB0eXBlOiAnbmV4dF81J1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaXJzdFBhZ2VJdGVtID0gZ2VuZXJhdGVQYWdlKDEsIDEpO1xuICAgICAgICBjb25zdCBsYXN0UGFnZUl0ZW0gPSBnZW5lcmF0ZVBhZ2UobGFzdEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQgPCA0KSB7XG4gICAgICAgICAgbGlzdE9mUmFuZ2UgPSBbLi4uZ2VuZXJhdGVQYWdlKDIsIDUpLCBuZXh0Rml2ZUl0ZW1dO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkIDwgbGFzdCAtIDMpIHtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFtwcmV2Rml2ZUl0ZW0sIC4uLmdlbmVyYXRlUGFnZShzZWxlY3RlZCAtIDIsIHNlbGVjdGVkICsgMiksIG5leHRGaXZlSXRlbV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdE9mUmFuZ2UgPSBbcHJldkZpdmVJdGVtLCAuLi5nZW5lcmF0ZVBhZ2UobGFzdCAtIDQsIGxhc3QgLSAxKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5maXJzdFBhZ2VJdGVtLCAuLi5saXN0T2ZSYW5nZSwgLi4ubGFzdFBhZ2VJdGVtXTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29uY2F0V2l0aFByZXZOZXh0KGdlbmVyYXRlUmFuZ2VJdGVtKHBhZ2VJbmRleCwgbGFzdEluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFnZUluZGV4LCBwYWdlU2l6ZSwgdG90YWwgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHBhZ2VJbmRleCB8fCBwYWdlU2l6ZSB8fCB0b3RhbCkge1xuICAgICAgdGhpcy5yYW5nZXMgPSBbKHRoaXMucGFnZUluZGV4IC0gMSkgKiB0aGlzLnBhZ2VTaXplICsgMSwgTWF0aC5taW4odGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnRvdGFsKV07XG4gICAgICB0aGlzLmJ1aWxkSW5kZXhlcygpO1xuICAgIH1cbiAgfVxufVxuIl19