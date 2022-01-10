/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { fromEvent, merge, Subject } from 'rxjs';
import { delay, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
export class NzTableInnerScrollComponent {
    constructor(renderer, ngZone, platform, resizeService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.contentTemplate = null;
        this.widthConfig = [];
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.virtualTemplate = null;
        this.virtualItemSize = 0;
        this.virtualMaxBufferPx = 200;
        this.virtualMinBufferPx = 100;
        this.virtualForTrackBy = index => index;
        this.headerStyleMap = {};
        this.bodyStyleMap = {};
        this.verticalScrollBarWidth = 0;
        this.noDateVirtualHeight = '182px';
        this.data$ = new Subject();
        this.scroll$ = new Subject();
        this.destroy$ = new Subject();
    }
    setScrollPositionClassName(clear = false) {
        const { scrollWidth, scrollLeft, clientWidth } = this.tableBodyElement.nativeElement;
        const leftClassName = 'ant-table-ping-left';
        const rightClassName = 'ant-table-ping-right';
        if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.removeClass(this.tableMainElement, rightClassName);
        }
        else if (scrollLeft === 0) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
        else if (scrollWidth === scrollLeft + clientWidth) {
            this.renderer.removeClass(this.tableMainElement, rightClassName);
            this.renderer.addClass(this.tableMainElement, leftClassName);
        }
        else {
            this.renderer.addClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
    }
    ngOnChanges(changes) {
        const { scrollX, scrollY, data } = changes;
        if (scrollX || scrollY) {
            const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
            this.headerStyleMap = {
                overflowX: 'hidden',
                overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
            };
            this.bodyStyleMap = {
                overflowY: this.scrollY ? 'scroll' : 'hidden',
                overflowX: this.scrollX ? 'auto' : null,
                maxHeight: this.scrollY
            };
            this.scroll$.next();
        }
        if (data) {
            this.data$.next();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                const scrollEvent$ = this.scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEvent(this.tableBodyElement.nativeElement, 'scroll').pipe(startWith(true))), takeUntil(this.destroy$));
                const resize$ = this.resizeService.subscribe().pipe(takeUntil(this.destroy$));
                const data$ = this.data$.pipe(takeUntil(this.destroy$));
                const setClassName$ = merge(scrollEvent$, resize$, data$, this.scroll$).pipe(startWith(true), delay(0), takeUntil(this.destroy$));
                setClassName$.subscribe(() => this.setScrollPositionClassName());
                scrollEvent$
                    .pipe(filter(() => !!this.scrollY))
                    .subscribe(() => (this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft));
            });
        }
    }
    ngOnDestroy() {
        this.setScrollPositionClassName(true);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableInnerScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-inner-scroll',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *ngIf="scrollY">
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
        ></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualTemplate" class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualTemplate"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="data.length ? scrollY : noDateVirtualHeight"
      >
        <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template [ngTemplateOutlet]="virtualTemplate" [ngTemplateOutletContext]="{ $implicit: item, index: i }"></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <div class="ant-table-content" *ngIf="!scrollY">
      <div #tableBodyElement class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
    </div>
  `,
                host: {
                    '[class.ant-table-container]': 'true'
                }
            },] }
];
NzTableInnerScrollComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: Platform },
    { type: NzResizeService }
];
NzTableInnerScrollComponent.propDecorators = {
    data: [{ type: Input }],
    scrollX: [{ type: Input }],
    scrollY: [{ type: Input }],
    contentTemplate: [{ type: Input }],
    widthConfig: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    virtualTemplate: [{ type: Input }],
    virtualItemSize: [{ type: Input }],
    virtualMaxBufferPx: [{ type: Input }],
    virtualMinBufferPx: [{ type: Input }],
    tableMainElement: [{ type: Input }],
    virtualForTrackBy: [{ type: Input }],
    tableHeaderElement: [{ type: ViewChild, args: ['tableHeaderElement', { read: ElementRef },] }],
    tableBodyElement: [{ type: ViewChild, args: ['tableBodyElement', { read: ElementRef },] }],
    cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport },] }],
    verticalScrollBarWidth: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaW5uZXItc2Nyb2xsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUvdGFibGUtaW5uZXItc2Nyb2xsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBR04sU0FBUyxFQUlULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRTlELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBNkRoRixNQUFNLE9BQU8sMkJBQTJCO0lBNkN0QyxZQUFvQixRQUFtQixFQUFVLE1BQWMsRUFBVSxRQUFrQixFQUFVLGFBQThCO1FBQS9HLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQTVDMUgsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFDOUIsb0JBQWUsR0FBa0MsSUFBSSxDQUFDO1FBQ3RELGdCQUFXLEdBQWEsRUFBRSxD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QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLEtBQUs7aUNBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUNMLEtBQUs7aUNBQ0wsU0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTsrQkFDcEQsU0FBUyxTQUFDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTt1Q0FDbEQsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFO3FDQUl0RSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHJhY2tCeUZ1bmN0aW9uLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpSZXNpemVTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpUYWJsZURhdGEgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLWlubmVyLXNjcm9sbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzY3JvbGxZXCI+XG4gICAgICA8ZGl2ICN0YWJsZUhlYWRlckVsZW1lbnQgW25nU3R5bGVdPVwiaGVhZGVyU3R5bGVNYXBcIiBjbGFzcz1cImFudC10YWJsZS1oZWFkZXIgbnotdGFibGUtaGlkZS1zY3JvbGxiYXJcIj5cbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgbnotdGFibGUtY29udGVudFxuICAgICAgICAgIHRhYmxlTGF5b3V0PVwiZml4ZWRcIlxuICAgICAgICAgIFtzY3JvbGxYXT1cInNjcm9sbFhcIlxuICAgICAgICAgIFtsaXN0T2ZDb2xXaWR0aF09XCJsaXN0T2ZDb2xXaWR0aFwiXG4gICAgICAgICAgW3RoZWFkVGVtcGxhdGVdPVwidGhlYWRUZW1wbGF0ZVwiXG4gICAgICAgID48L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICN0YWJsZUJvZHlFbGVtZW50ICpuZ0lmPVwiIXZpcnR1YWxUZW1wbGF0ZVwiIGNsYXNzPVwiYW50LXRhYmxlLWJvZHlcIiBbbmdTdHlsZV09XCJib2R5U3R5bGVNYXBcIj5cbiAgICAgICAgPHRhYmxlXG4gICAgICAgICAgbnotdGFibGUtY29udGVudFxuICAgICAgICAgIHRhYmxlTGF5b3V0PVwiZml4ZWRcIlxuICAgICAgICAgIFtzY3JvbGxYXT1cInNjcm9sbFhcIlxuICAgICAgICAgIFtsaXN0T2ZDb2xXaWR0aF09XCJsaXN0T2ZDb2xXaWR0aFwiXG4gICAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZV09XCJjb250ZW50VGVtcGxhdGVcIlxuICAgICAgICA+PC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydFxuICAgICAgICAjdGFibGVCb2R5RWxlbWVudFxuICAgICAgICAqbmdJZj1cInZpcnR1YWxUZW1wbGF0ZVwiXG4gICAgICAgIFtpdGVtU2l6ZV09XCJ2aXJ0dWFsSXRlbVNpemVcIlxuICAgICAgICBbbWF4QnVmZmVyUHhdPVwidmlydHVhbE1heEJ1ZmZlclB4XCJcbiAgICAgICAgW21pbkJ1ZmZlclB4XT1cInZpcnR1YWxNaW5CdWZmZXJQeFwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHRdPVwiZGF0YS5sZW5ndGggPyBzY3JvbGxZIDogbm9EYXRlVmlydHVhbEhlaWdodFwiXG4gICAgICA+XG4gICAgICAgIDx0YWJsZSBuei10YWJsZS1jb250ZW50IHRhYmxlTGF5b3V0PVwiZml4ZWRcIiBbc2Nyb2xsWF09XCJzY3JvbGxYXCIgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZkNvbFdpZHRoXCI+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIGRhdGE7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IHZpcnR1YWxGb3JUcmFja0J5XCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ2aXJ0dWFsVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpIH1cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdGFibGUtY29udGVudFwiICpuZ0lmPVwiIXNjcm9sbFlcIj5cbiAgICAgIDxkaXYgI3RhYmxlQm9keUVsZW1lbnQgY2xhc3M9XCJhbnQtdGFibGUtYm9keVwiIFtuZ1N0eWxlXT1cImJvZHlTdHlsZU1hcFwiPlxuICAgICAgICA8dGFibGVcbiAgICAgICAgICBuei10YWJsZS1jb250ZW50XG4gICAgICAgICAgdGFibGVMYXlvdXQ9XCJmaXhlZFwiXG4gICAgICAgICAgW3Njcm9sbFhdPVwic2Nyb2xsWFwiXG4gICAgICAgICAgW2xpc3RPZkNvbFdpZHRoXT1cImxpc3RPZkNvbFdpZHRoXCJcbiAgICAgICAgICBbdGhlYWRUZW1wbGF0ZV09XCJ0aGVhZFRlbXBsYXRlXCJcbiAgICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgID48L3RhYmxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jb250YWluZXJdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUlubmVyU2Nyb2xsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRhOiBOelRhYmxlRGF0YVtdID0gW107XG4gIEBJbnB1dCgpIHNjcm9sbFg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBzY3JvbGxZOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHdpZHRoQ29uZmlnOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBsaXN0T2ZDb2xXaWR0aDogQXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcbiAgQElucHV0KCkgdGhlYWRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB2aXJ0dWFsVGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdmlydHVhbEl0ZW1TaXplID0gMDtcbiAgQElucHV0KCkgdmlydHVhbE1heEJ1ZmZlclB4ID0gMjAwO1xuICBASW5wdXQoKSB2aXJ0dWFsTWluQnVmZmVyUHggPSAxMDA7XG4gIEBJbnB1dCgpIHRhYmxlTWFpbkVsZW1lbnQ/OiBIVE1MRGl2RWxlbWVudDtcbiAgQElucHV0KCkgdmlydHVhbEZvclRyYWNrQnk6IFRyYWNrQnlGdW5jdGlvbjxOelRhYmxlRGF0YT4gPSBpbmRleCA9PiBpbmRleDtcbiAgQFZpZXdDaGlsZCgndGFibGVIZWFkZXJFbGVtZW50JywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHRhYmxlSGVhZGVyRWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYmxlQm9keUVsZW1lbnQnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgdGFibGVCb2R5RWxlbWVudCE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7IHJlYWQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9KVxuICBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ/OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIGhlYWRlclN0eWxlTWFwID0ge307XG4gIGJvZHlTdHlsZU1hcCA9IHt9O1xuICBASW5wdXQoKSB2ZXJ0aWNhbFNjcm9sbEJhcldpZHRoID0gMDtcbiAgbm9EYXRlVmlydHVhbEhlaWdodCA9ICcxODJweCc7XG4gIHByaXZhdGUgZGF0YSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHNjcm9sbCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBzZXRTY3JvbGxQb3NpdGlvbkNsYXNzTmFtZShjbGVhcjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgeyBzY3JvbGxXaWR0aCwgc2Nyb2xsTGVmdCwgY2xpZW50V2lkdGggfSA9IHRoaXMudGFibGVCb2R5RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGxlZnRDbGFzc05hbWUgPSAnYW50LXRhYmxlLXBpbmctbGVmdCc7XG4gICAgY29uc3QgcmlnaHRDbGFzc05hbWUgPSAnYW50LXRhYmxlLXBpbmctcmlnaHQnO1xuICAgIGlmICgoc2Nyb2xsV2lkdGggPT09IGNsaWVudFdpZHRoICYmIHNjcm9sbFdpZHRoICE9PSAwKSB8fCBjbGVhcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIGxlZnRDbGFzc05hbWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIHJpZ2h0Q2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbExlZnQgPT09IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy50YWJsZU1haW5FbGVtZW50LCBsZWZ0Q2xhc3NOYW1lKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50YWJsZU1haW5FbGVtZW50LCByaWdodENsYXNzTmFtZSk7XG4gICAgfSBlbHNlIGlmIChzY3JvbGxXaWR0aCA9PT0gc2Nyb2xsTGVmdCArIGNsaWVudFdpZHRoKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgcmlnaHRDbGFzc05hbWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRhYmxlTWFpbkVsZW1lbnQsIGxlZnRDbGFzc05hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgbGVmdENsYXNzTmFtZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudGFibGVNYWluRWxlbWVudCwgcmlnaHRDbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sIHByaXZhdGUgcmVzaXplU2VydmljZTogTnpSZXNpemVTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNjcm9sbFgsIHNjcm9sbFksIGRhdGEgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHNjcm9sbFggfHwgc2Nyb2xsWSkge1xuICAgICAgY29uc3QgaGFzVmVydGljYWxTY3JvbGxCYXIgPSB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyV2lkdGggIT09IDA7XG4gICAgICB0aGlzLmhlYWRlclN0eWxlTWFwID0ge1xuICAgICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgICBvdmVyZmxvd1k6IHRoaXMuc2Nyb2xsWSAmJiBoYXNWZXJ0aWNhbFNjcm9sbEJhciA/ICdzY3JvbGwnIDogJ2hpZGRlbidcbiAgICAgIH07XG4gICAgICB0aGlzLmJvZHlTdHlsZU1hcCA9IHtcbiAgICAgICAgb3ZlcmZsb3dZOiB0aGlzLnNjcm9sbFkgPyAnc2Nyb2xsJyA6ICdoaWRkZW4nLFxuICAgICAgICBvdmVyZmxvd1g6IHRoaXMuc2Nyb2xsWCA/ICdhdXRvJyA6IG51bGwsXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5zY3JvbGxZXG4gICAgICB9O1xuICAgICAgdGhpcy5zY3JvbGwkLm5leHQoKTtcbiAgICB9XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRoaXMuZGF0YSQubmV4dCgpO1xuICAgIH1cbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcm9sbEV2ZW50JCA9IHRoaXMuc2Nyb2xsJC5waXBlKFxuICAgICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgICBkZWxheSgwKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHRoaXMudGFibGVCb2R5RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJykucGlwZShzdGFydFdpdGgodHJ1ZSkpKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzaXplJCA9IHRoaXMucmVzaXplU2VydmljZS5zdWJzY3JpYmUoKS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSk7XG4gICAgICAgIGNvbnN0IGRhdGEkID0gdGhpcy5kYXRhJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSk7XG4gICAgICAgIGNvbnN0IHNldENsYXNzTmFtZSQgPSBtZXJnZShzY3JvbGxFdmVudCQsIHJlc2l6ZSQsIGRhdGEkLCB0aGlzLnNjcm9sbCQpLnBpcGUoc3RhcnRXaXRoKHRydWUpLCBkZWxheSgwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKTtcbiAgICAgICAgc2V0Q2xhc3NOYW1lJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRTY3JvbGxQb3NpdGlvbkNsYXNzTmFtZSgpKTtcbiAgICAgICAgc2Nyb2xsRXZlbnQkXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKCgpID0+ICEhdGhpcy5zY3JvbGxZKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+ICh0aGlzLnRhYmxlSGVhZGVyRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSB0aGlzLnRhYmxlQm9keUVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zZXRTY3JvbGxQb3NpdGlvbkNsYXNzTmFtZSh0cnVlKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==