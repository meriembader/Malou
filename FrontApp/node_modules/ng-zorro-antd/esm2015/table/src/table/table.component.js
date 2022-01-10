/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers';
import { InputBoolean, measureScrollbar } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { NzTableDataService } from '../table-data.service';
import { NzTableStyleService } from '../table-style.service';
import { NzTableInnerScrollComponent } from './table-inner-scroll.component';
import { NzTableVirtualScrollDirective } from './table-virtual-scroll.directive';
const NZ_CONFIG_MODULE_NAME = 'table';
export class NzTableComponent {
    constructor(elementRef, nzResizeObserver, nzConfigService, cdr, nzTableStyleService, nzTableDataService) {
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzTableLayout = 'auto';
        this.nzShowTotal = null;
        this.nzItemRender = null;
        this.nzTitle = null;
        this.nzFooter = null;
        this.nzNoResult = undefined;
        this.nzPageSizeOptions = [10, 20, 30, 40, 50];
        this.nzVirtualItemSize = 0;
        this.nzVirtualMaxBufferPx = 200;
        this.nzVirtualMinBufferPx = 100;
        this.nzVirtualForTrackBy = index => index;
        this.nzLoadingDelay = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.nzTotal = 0;
        this.nzWidthConfig = [];
        this.nzData = [];
        this.nzPaginationPosition = 'bottom';
        this.nzScroll = { x: null, y: null };
        this.nzFrontPagination = true;
        this.nzTemplateMode = false;
        this.nzShowPagination = true;
        this.nzLoading = false;
        this.nzOuterBordered = false;
        this.nzLoadingIndicator = null;
        this.nzBordered = false;
        this.nzSize = 'default';
        this.nzShowSizeChanger = false;
        this.nzHideOnSinglePage = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzQueryParams = new EventEmitter();
        this.nzCurrentPageDataChange = new EventEmitter();
        /** public data for ngFor tr */
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.theadTemplate = null;
        this.listOfAutoColWidth = [];
        this.listOfManualColWidth = [];
        this.hasFixLeft = false;
        this.hasFixRight = false;
        this.destroy$ = new Subject();
        this.loading$ = new BehaviorSubject(false);
        this.templateMode$ = new BehaviorSubject(false);
        this.verticalScrollBarWidth = 0;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    onPageSizeChange(size) {
        this.nzTableDataService.updatePageSize(size);
    }
    onPageIndexChange(index) {
        this.nzTableDataService.updatePageIndex(index);
    }
    ngOnInit() {
        const { pageIndexDistinct$, pageSizeDistinct$, listOfCurrentPageData$, total$, queryParams$ } = this.nzTableDataService;
        const { theadTemplate$, hasFixLeft$, hasFixRight$ } = this.nzTableStyleService;
        queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
        pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageIndex => {
            if (pageIndex !== this.nzPageIndex) {
                this.nzPageIndex = pageIndex;
                this.nzPageIndexChange.next(pageIndex);
            }
        });
        pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
            if (pageSize !== this.nzPageSize) {
                this.nzPageSize = pageSize;
                this.nzPageSizeChange.next(pageSize);
            }
        });
        total$
            .pipe(takeUntil(this.destroy$), filter(() => this.nzFrontPagination))
            .subscribe(total => {
            if (total !== this.nzTotal) {
                this.nzTotal = total;
                this.cdr.markForCheck();
            }
        });
        listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.data = data;
            this.nzCurrentPageDataChange.next(data);
            this.cdr.markForCheck();
        });
        theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe(theadTemplate => {
            this.theadTemplate = theadTemplate;
            this.cdr.markForCheck();
        });
        hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe(hasFixLeft => {
            this.hasFixLeft = hasFixLeft;
            this.cdr.markForCheck();
        });
        hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe(hasFixRight => {
            this.hasFixRight = hasFixRight;
            this.cdr.markForCheck();
        });
        combineLatest([total$, this.loading$, this.templateMode$])
            .pipe(map(([total, loading, templateMode]) => total === 0 && !loading && !templateMode), takeUntil(this.destroy$))
            .subscribe(empty => {
            this.nzTableStyleService.setShowEmpty(empty);
        });
        this.verticalScrollBarWidth = measureScrollbar('vertical');
        this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfAutoColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
        this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfManualColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzScroll, nzPageIndex, nzPageSize, nzFrontPagination, nzData, nzWidthConfig, nzNoResult, nzLoading, nzTemplateMode } = changes;
        if (nzPageIndex) {
            this.nzTableDataService.updatePageIndex(this.nzPageIndex);
        }
        if (nzPageSize) {
            this.nzTableDataService.updatePageSize(this.nzPageSize);
        }
        if (nzData) {
            this.nzData = this.nzData || [];
            this.nzTableDataService.updateListOfData(this.nzData);
        }
        if (nzFrontPagination) {
            this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
        }
        if (nzScroll) {
            this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
            this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
            this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
        }
        if (nzWidthConfig) {
            this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
        }
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
        if (nzTemplateMode) {
            this.templateMode$.next(this.nzTemplateMode);
        }
        if (nzNoResult) {
            this.nzTableStyleService.setNoResult(this.nzNoResult);
        }
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => {
            const { width } = entry.target.getBoundingClientRect();
            const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
            return Math.floor(width - scrollBarWidth);
        }), takeUntil(this.destroy$))
            .subscribe(this.nzTableStyleService.hostWidth$);
        if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
            this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table',
                exportAs: 'nzTable',
                providers: [NzTableStyleService, NzTableDataService],
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-scroll
          *ngIf="scrollY || scrollX; else defaultTemplate"
          [data]="data"
          [scrollX]="scrollX"
          [scrollY]="scrollY"
          [contentTemplate]="contentTemplate"
          [listOfColWidth]="listOfAutoColWidth"
          [theadTemplate]="theadTemplate"
          [verticalScrollBarWidth]="verticalScrollBarWidth"
          [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
          [virtualItemSize]="nzVirtualItemSize"
          [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [virtualMinBufferPx]="nzVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="nzVirtualForTrackBy"
        ></nz-table-inner-scroll>
        <ng-template #defaultTemplate>
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></nz-table-inner-default>
        </ng-template>
        <nz-table-title-footer [footer]="nzFooter" *ngIf="nzFooter"></nz-table-title-footer>
      </div>
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </nz-spin>
    <ng-template #paginationTemplate>
      <nz-pagination
        *ngIf="nzShowPagination && data.length"
        class="ant-table-pagination ant-table-pagination-right"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzPageSizeOptions]="nzPageSizeOptions"
        [nzItemRender]="nzItemRender!"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzHideOnSinglePage]="nzHideOnSinglePage"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="nzSize === 'default' ? 'default' : 'small'"
        [nzPageSize]="nzPageSize"
        [nzTotal]="nzTotal"
        [nzSimple]="nzSimple"
        [nzPageIndex]="nzPageIndex"
        (nzPageSizeChange)="onPageSizeChange($event)"
        (nzPageIndexChange)="onPageIndexChange($event)"
      ></nz-pagination>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                host: {
                    '[class.ant-table-wrapper]': 'true'
                }
            },] }
];
NzTableComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzResizeObserver },
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzTableStyleService },
    { type: NzTableDataService }
];
NzTableComponent.propDecorators = {
    nzTableLayout: [{ type: Input }],
    nzShowTotal: [{ type: Input }],
    nzItemRender: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzNoResult: [{ type: Input }],
    nzPageSizeOptions: [{ type: Input }],
    nzVirtualItemSize: [{ type: Input }],
    nzVirtualMaxBufferPx: [{ type: Input }],
    nzVirtualMinBufferPx: [{ type: Input }],
    nzVirtualForTrackBy: [{ type: Input }],
    nzLoadingDelay: [{ type: Input }],
    nzPageIndex: [{ type: Input }],
    nzPageSize: [{ type: Input }],
    nzTotal: [{ type: Input }],
    nzWidthConfig: [{ type: Input }],
    nzData: [{ type: Input }],
    nzPaginationPosition: [{ type: Input }],
    nzScroll: [{ type: Input }],
    nzFrontPagination: [{ type: Input }],
    nzTemplateMode: [{ type: Input }],
    nzShowPagination: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzOuterBordered: [{ type: Input }],
    nzLoadingIndicator: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzShowSizeChanger: [{ type: Input }],
    nzHideOnSinglePage: [{ type: Input }],
    nzShowQuickJumper: [{ type: Input }],
    nzSimple: [{ type: Input }],
    nzPageSizeChange: [{ type: Output }],
    nzPageIndexChange: [{ type: Output }],
    nzQueryParams: [{ type: Output }],
    nzCurrentPageDataChange: [{ type: Output }],
    nzVirtualScrollDirective: [{ type: ContentChild, args: [NzTableVirtualScrollDirective, { static: false },] }],
    nzTableInnerScrollComponent: [{ type: ViewChild, args: [NzTableInnerScrollComponent,] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzFrontPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzTemplateMode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzShowPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzOuterBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTableComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzSimple", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUdILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUlOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWpGLE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQW9GbkQsTUFBTSxPQUFPLGdCQUFnQjtJQTJFM0IsWUFDVSxVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsR0FBc0IsRUFDdEIsbUJBQXdDLEVBQ3hDLGtCQUFzQztRQUx0QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQWhGdkMsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFhbkQsa0JBQWEsR0FBa0IsTUFBTSxDQUFDO1FBQ3RDLGdCQUFXLEdBQXVFLElBQUksQ0FBQztRQUN2RixpQkFBWSxHQUFvRCxJQUFJLENBQUM7UUFDckUsWUFBTyxHQUEyQyxJQUFJLENBQUM7UUFDdkQsYUFBUSxHQUEyQyxJQUFJLENBQUM7UUFDeEQsZUFBVSxHQUFnRCxTQUFTLENBQUM7UUFDcEUsc0JBQWlCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLHlCQUFvQixHQUFHLEdBQUcsQ0FBQztRQUMzQix5QkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDM0Isd0JBQW1CLEdBQWlDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ25FLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLGtCQUFhLEdBQXlCLEVBQUUsQ0FBQztRQUN6QyxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLHlCQUFvQixHQUE4QixRQUFRLENBQUM7UUFDM0QsYUFBUSxHQUE2QyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzFELHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBa0IsR0FBa0MsSUFBSSxDQUFDO1FBQ3pDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUMsV0FBTSxHQUFnQixTQUFTLENBQUM7UUFDaEIsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUM5QyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzlDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUN2RCw0QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUUvRSwrQkFBK0I7UUFDeEIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUV0QixZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixZQUFPLEdBQWtCLElBQUksQ0FBQztRQUM5QixrQkFBYSxHQUFrQyxJQUFJLENBQUM7UUFDcEQsdUJBQWtCLEdBQXlCLEVBQUUsQ0FBQztRQUM5Qyx5QkFBb0IsR0FBeUIsRUFBRSxDQUFDO1FBQ2hELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDWixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUk1RCwyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFpQnpCLElBQUksQ0FBQyxlQUFlO2FBQ2pCLGdDQUFnQyxDQUFDLHFCQUFxQixDQUFDO2FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXRCRCxnQkFBZ0IsQ0FBQyxJQUFZO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBa0JELFFBQVE7UUFDTixNQUFNLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUN4SCxNQUFNLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDL0UsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0RSxJQUFJLFNBQVMsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU07YUFDSCxJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDeEIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUNyQzthQUNBLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBRUgsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDakYsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekI7YUFDQSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ25HLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxXQUFXLENBQUM7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDdkksSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQ7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDtRQUNELElBQUksaUJBQWlCLEVBQUU7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQjthQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN4QixJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ2QsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN2RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxFQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2FBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksQ0FBQywyQkFBMkIsSUFBSSxJQUFJLENBQUMsMkJBQTJCLENBQUMsd0JBQXdCLEVBQUU7WUFDakcsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyx3QkFBd0IsQ0FBQztTQUMzRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXZTRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQztnQkFDcEQsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDJCQUEyQixFQUFFLE1BQU07aUJBQ3BDO2FBQ0Y7OztZQTdHQyxVQUFVO1lBY0gsZ0JBQWdCO1lBREgsZUFBZTtZQWhCbkMsaUJBQWlCO1lBd0JWLG1CQUFtQjtZQURuQixrQkFBa0I7Ozs0QkF3R3hCLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSzttQ0FDTCxLQUFLO21DQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSztzQkFDTCxLQUFLOzRCQUNMLEtBQUs7cUJBQ0wsS0FBSzttQ0FDTCxLQUFLO3VCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUNMLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFDTCxLQUFLO2dDQUNMLEtBQUs7aUNBQ0wsS0FBSztnQ0FDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsTUFBTTtnQ0FDTixNQUFNOzRCQUNOLE1BQU07c0NBQ04sTUFBTTt1Q0FlTixZQUFZLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzBDQUU3RCxTQUFTLFNBQUMsMkJBQTJCOztBQWhDYjtJQUFmLFlBQVksRUFBRTs7MkRBQTBCO0FBQ3pCO0lBQWYsWUFBWSxFQUFFOzt3REFBd0I7QUFDdkI7SUFBZixZQUFZLEVBQUU7OzBEQUF5QjtBQUN4QjtJQUFmLFlBQVksRUFBRTs7bURBQW1CO0FBQ2xCO0lBQWYsWUFBWSxFQUFFOzt5REFBeUI7QUFDMUI7SUFBYixVQUFVLEVBQUU7OzREQUEwRDtBQUN6QztJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7O29EQUE2QjtBQUM1QztJQUFiLFVBQVUsRUFBRTs7Z0RBQWlDO0FBQ2hCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7MkRBQW9DO0FBQ25DO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7NERBQXFDO0FBQ3BDO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7MkRBQW9DO0FBQ25DO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7a0RBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBUcmFja0J5RnVuY3Rpb24sXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3Jlc2l6ZS1vYnNlcnZlcnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBtZWFzdXJlU2Nyb2xsYmFyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9wYWdpbmF0aW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56VGFibGVEYXRhU2VydmljZSB9IGZyb20gJy4uL3RhYmxlLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBOelRhYmxlU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vdGFibGUtc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBOelRhYmxlRGF0YSwgTnpUYWJsZUxheW91dCwgTnpUYWJsZVBhZ2luYXRpb25Qb3NpdGlvbiwgTnpUYWJsZVF1ZXJ5UGFyYW1zLCBOelRhYmxlU2l6ZSB9IGZyb20gJy4uL3RhYmxlLnR5cGVzJztcbmltcG9ydCB7IE56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtaW5uZXItc2Nyb2xsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYmxlVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtdmlydHVhbC1zY3JvbGwuZGlyZWN0aXZlJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICd0YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlJyxcbiAgZXhwb3J0QXM6ICduelRhYmxlJyxcbiAgcHJvdmlkZXJzOiBbTnpUYWJsZVN0eWxlU2VydmljZSwgTnpUYWJsZURhdGFTZXJ2aWNlXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei1zcGluIFtuekRlbGF5XT1cIm56TG9hZGluZ0RlbGF5XCIgW256U3Bpbm5pbmddPVwibnpMb2FkaW5nXCIgW256SW5kaWNhdG9yXT1cIm56TG9hZGluZ0luZGljYXRvclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UGFnaW5hdGlvblBvc2l0aW9uID09PSAnYm90aCcgfHwgbnpQYWdpbmF0aW9uUG9zaXRpb24gPT09ICd0b3AnXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwYWdpbmF0aW9uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8ZGl2XG4gICAgICAgICN0YWJsZU1haW5FbGVtZW50XG4gICAgICAgIGNsYXNzPVwiYW50LXRhYmxlXCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1maXhlZC1oZWFkZXJdPVwibnpEYXRhLmxlbmd0aCAmJiBzY3JvbGxZXCJcbiAgICAgICAgW2NsYXNzLmFudC10YWJsZS1maXhlZC1jb2x1bW5dPVwic2Nyb2xsWFwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFibGUtaGFzLWZpeC1sZWZ0XT1cImhhc0ZpeExlZnRcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYmxlLWhhcy1maXgtcmlnaHRdPVwiaGFzRml4UmlnaHRcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYmxlLWJvcmRlcmVkXT1cIm56Qm9yZGVyZWRcIlxuICAgICAgICBbY2xhc3MubnotdGFibGUtb3V0LWJvcmRlcmVkXT1cIm56T3V0ZXJCb3JkZXJlZCAmJiAhbnpCb3JkZXJlZFwiXG4gICAgICAgIFtjbGFzcy5hbnQtdGFibGUtbWlkZGxlXT1cIm56U2l6ZSA9PT0gJ21pZGRsZSdcIlxuICAgICAgICBbY2xhc3MuYW50LXRhYmxlLXNtYWxsXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICA+XG4gICAgICAgIDxuei10YWJsZS10aXRsZS1mb290ZXIgW3RpdGxlXT1cIm56VGl0bGVcIiAqbmdJZj1cIm56VGl0bGVcIj48L256LXRhYmxlLXRpdGxlLWZvb3Rlcj5cbiAgICAgICAgPG56LXRhYmxlLWlubmVyLXNjcm9sbFxuICAgICAgICAgICpuZ0lmPVwic2Nyb2xsWSB8fCBzY3JvbGxYOyBlbHNlIGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICAgICAgW2RhdGFdPVwiZGF0YVwiXG4gICAgICAgICAgW3Njcm9sbFhdPVwic2Nyb2xsWFwiXG4gICAgICAgICAgW3Njcm9sbFldPVwic2Nyb2xsWVwiXG4gICAgICAgICAgW2NvbnRlbnRUZW1wbGF0ZV09XCJjb250ZW50VGVtcGxhdGVcIlxuICAgICAgICAgIFtsaXN0T2ZDb2xXaWR0aF09XCJsaXN0T2ZBdXRvQ29sV2lkdGhcIlxuICAgICAgICAgIFt0aGVhZFRlbXBsYXRlXT1cInRoZWFkVGVtcGxhdGVcIlxuICAgICAgICAgIFt2ZXJ0aWNhbFNjcm9sbEJhcldpZHRoXT1cInZlcnRpY2FsU2Nyb2xsQmFyV2lkdGhcIlxuICAgICAgICAgIFt2aXJ0dWFsVGVtcGxhdGVdPVwibnpWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlID8gbnpWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLnRlbXBsYXRlUmVmIDogbnVsbFwiXG4gICAgICAgICAgW3ZpcnR1YWxJdGVtU2l6ZV09XCJuelZpcnR1YWxJdGVtU2l6ZVwiXG4gICAgICAgICAgW3ZpcnR1YWxNYXhCdWZmZXJQeF09XCJuelZpcnR1YWxNYXhCdWZmZXJQeFwiXG4gICAgICAgICAgW3ZpcnR1YWxNaW5CdWZmZXJQeF09XCJuelZpcnR1YWxNaW5CdWZmZXJQeFwiXG4gICAgICAgICAgW3RhYmxlTWFpbkVsZW1lbnRdPVwidGFibGVNYWluRWxlbWVudFwiXG4gICAgICAgICAgW3ZpcnR1YWxGb3JUcmFja0J5XT1cIm56VmlydHVhbEZvclRyYWNrQnlcIlxuICAgICAgICA+PC9uei10YWJsZS1pbm5lci1zY3JvbGw+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgICAgIDxuei10YWJsZS1pbm5lci1kZWZhdWx0XG4gICAgICAgICAgICBbdGFibGVMYXlvdXRdPVwibnpUYWJsZUxheW91dFwiXG4gICAgICAgICAgICBbbGlzdE9mQ29sV2lkdGhdPVwibGlzdE9mTWFudWFsQ29sV2lkdGhcIlxuICAgICAgICAgICAgW3RoZWFkVGVtcGxhdGVdPVwidGhlYWRUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgPjwvbnotdGFibGUtaW5uZXItZGVmYXVsdD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG56LXRhYmxlLXRpdGxlLWZvb3RlciBbZm9vdGVyXT1cIm56Rm9vdGVyXCIgKm5nSWY9XCJuekZvb3RlclwiPjwvbnotdGFibGUtdGl0bGUtZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpQYWdpbmF0aW9uUG9zaXRpb24gPT09ICdib3RoJyB8fCBuelBhZ2luYXRpb25Qb3NpdGlvbiA9PT0gJ2JvdHRvbSdcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBhZ2luYXRpb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L256LXNwaW4+XG4gICAgPG5nLXRlbXBsYXRlICNwYWdpbmF0aW9uVGVtcGxhdGU+XG4gICAgICA8bnotcGFnaW5hdGlvblxuICAgICAgICAqbmdJZj1cIm56U2hvd1BhZ2luYXRpb24gJiYgZGF0YS5sZW5ndGhcIlxuICAgICAgICBjbGFzcz1cImFudC10YWJsZS1wYWdpbmF0aW9uIGFudC10YWJsZS1wYWdpbmF0aW9uLXJpZ2h0XCJcbiAgICAgICAgW256U2hvd1NpemVDaGFuZ2VyXT1cIm56U2hvd1NpemVDaGFuZ2VyXCJcbiAgICAgICAgW256UGFnZVNpemVPcHRpb25zXT1cIm56UGFnZVNpemVPcHRpb25zXCJcbiAgICAgICAgW256SXRlbVJlbmRlcl09XCJuekl0ZW1SZW5kZXIhXCJcbiAgICAgICAgW256U2hvd1F1aWNrSnVtcGVyXT1cIm56U2hvd1F1aWNrSnVtcGVyXCJcbiAgICAgICAgW256SGlkZU9uU2luZ2xlUGFnZV09XCJuekhpZGVPblNpbmdsZVBhZ2VcIlxuICAgICAgICBbbnpTaG93VG90YWxdPVwibnpTaG93VG90YWxcIlxuICAgICAgICBbbnpTaXplXT1cIm56U2l6ZSA9PT0gJ2RlZmF1bHQnID8gJ2RlZmF1bHQnIDogJ3NtYWxsJ1wiXG4gICAgICAgIFtuelBhZ2VTaXplXT1cIm56UGFnZVNpemVcIlxuICAgICAgICBbbnpUb3RhbF09XCJuelRvdGFsXCJcbiAgICAgICAgW256U2ltcGxlXT1cIm56U2ltcGxlXCJcbiAgICAgICAgW256UGFnZUluZGV4XT1cIm56UGFnZUluZGV4XCJcbiAgICAgICAgKG56UGFnZVNpemVDaGFuZ2UpPVwib25QYWdlU2l6ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgKG56UGFnZUluZGV4Q2hhbmdlKT1cIm9uUGFnZUluZGV4Q2hhbmdlKCRldmVudClcIlxuICAgICAgPjwvbnotcGFnaW5hdGlvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS13cmFwcGVyXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFibGVDb21wb25lbnQ8VCA9IE56U2FmZUFueT4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RnJvbnRQYWdpbmF0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelRlbXBsYXRlTW9kZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93UGFnaW5hdGlvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMb2FkaW5nOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvcmRlcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek91dGVyQm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1NpemVDaGFuZ2VyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhpZGVPblNpbmdsZVBhZ2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1F1aWNrSnVtcGVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbXBsZTogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56VGFibGVMYXlvdXQ6IE56VGFibGVMYXlvdXQgPSAnYXV0byc7XG4gIEBJbnB1dCgpIG56U2hvd1RvdGFsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyOyByYW5nZTogW251bWJlciwgbnVtYmVyXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUaXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekZvb3Rlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuek5vUmVzdWx0OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelBhZ2VTaXplT3B0aW9ucyA9IFsxMCwgMjAsIDMwLCA0MCwgNTBdO1xuICBASW5wdXQoKSBuelZpcnR1YWxJdGVtU2l6ZSA9IDA7XG4gIEBJbnB1dCgpIG56VmlydHVhbE1heEJ1ZmZlclB4ID0gMjAwO1xuICBASW5wdXQoKSBuelZpcnR1YWxNaW5CdWZmZXJQeCA9IDEwMDtcbiAgQElucHV0KCkgbnpWaXJ0dWFsRm9yVHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPE56VGFibGVEYXRhPiA9IGluZGV4ID0+IGluZGV4O1xuICBASW5wdXQoKSBuekxvYWRpbmdEZWxheSA9IDA7XG4gIEBJbnB1dCgpIG56UGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgbnpQYWdlU2l6ZSA9IDEwO1xuICBASW5wdXQoKSBuelRvdGFsID0gMDtcbiAgQElucHV0KCkgbnpXaWR0aENvbmZpZzogQXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcbiAgQElucHV0KCkgbnpEYXRhOiBUW10gPSBbXTtcbiAgQElucHV0KCkgbnpQYWdpbmF0aW9uUG9zaXRpb246IE56VGFibGVQYWdpbmF0aW9uUG9zaXRpb24gPSAnYm90dG9tJztcbiAgQElucHV0KCkgbnpTY3JvbGw6IHsgeD86IHN0cmluZyB8IG51bGw7IHk/OiBzdHJpbmcgfCBudWxsIH0gPSB7IHg6IG51bGwsIHk6IG51bGwgfTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RnJvbnRQYWdpbmF0aW9uID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56VGVtcGxhdGVNb2RlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dQYWdpbmF0aW9uID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpPdXRlckJvcmRlcmVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpMb2FkaW5nSW5kaWNhdG9yOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56Qm9yZGVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNpemU6IE56VGFibGVTaXplID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTaXplQ2hhbmdlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekhpZGVPblNpbmdsZVBhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93UXVpY2tKdW1wZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpTaW1wbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UGFnZVNpemVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UGFnZUluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelF1ZXJ5UGFyYW1zID0gbmV3IEV2ZW50RW1pdHRlcjxOelRhYmxlUXVlcnlQYXJhbXM+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekN1cnJlbnRQYWdlRGF0YUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJsZURhdGFbXT4oKTtcblxuICAvKiogcHVibGljIGRhdGEgZm9yIG5nRm9yIHRyICovXG4gIHB1YmxpYyBkYXRhOiBUW10gPSBbXTtcbiAgcHVibGljIGNka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydD86IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcbiAgc2Nyb2xsWDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHNjcm9sbFk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICB0aGVhZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIGxpc3RPZkF1dG9Db2xXaWR0aDogQXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcbiAgbGlzdE9mTWFudWFsQ29sV2lkdGg6IEFycmF5PHN0cmluZyB8IG51bGw+ID0gW107XG4gIGhhc0ZpeExlZnQgPSBmYWxzZTtcbiAgaGFzRml4UmlnaHQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSB0ZW1wbGF0ZU1vZGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIEBDb250ZW50Q2hpbGQoTnpUYWJsZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBuelZpcnR1YWxTY3JvbGxEaXJlY3RpdmUhOiBOelRhYmxlVmlydHVhbFNjcm9sbERpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZChOelRhYmxlSW5uZXJTY3JvbGxDb21wb25lbnQpIG56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCE6IE56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudDtcbiAgdmVydGljYWxTY3JvbGxCYXJXaWR0aCA9IDA7XG4gIG9uUGFnZVNpemVDaGFuZ2Uoc2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYmxlRGF0YVNlcnZpY2UudXBkYXRlUGFnZVNpemUoc2l6ZSk7XG4gIH1cblxuICBvblBhZ2VJbmRleENoYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5uelRhYmxlRGF0YVNlcnZpY2UudXBkYXRlUGFnZUluZGV4KGluZGV4KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG56UmVzaXplT2JzZXJ2ZXI6IE56UmVzaXplT2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBuelRhYmxlU3R5bGVTZXJ2aWNlOiBOelRhYmxlU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbnpUYWJsZURhdGFTZXJ2aWNlOiBOelRhYmxlRGF0YVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFnZUluZGV4RGlzdGluY3QkLCBwYWdlU2l6ZURpc3RpbmN0JCwgbGlzdE9mQ3VycmVudFBhZ2VEYXRhJCwgdG90YWwkLCBxdWVyeVBhcmFtcyQgfSA9IHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlO1xuICAgIGNvbnN0IHsgdGhlYWRUZW1wbGF0ZSQsIGhhc0ZpeExlZnQkLCBoYXNGaXhSaWdodCQgfSA9IHRoaXMubnpUYWJsZVN0eWxlU2VydmljZTtcbiAgICBxdWVyeVBhcmFtcyQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh0aGlzLm56UXVlcnlQYXJhbXMpO1xuICAgIHBhZ2VJbmRleERpc3RpbmN0JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHBhZ2VJbmRleCA9PiB7XG4gICAgICBpZiAocGFnZUluZGV4ICE9PSB0aGlzLm56UGFnZUluZGV4KSB7XG4gICAgICAgIHRoaXMubnpQYWdlSW5kZXggPSBwYWdlSW5kZXg7XG4gICAgICAgIHRoaXMubnpQYWdlSW5kZXhDaGFuZ2UubmV4dChwYWdlSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHBhZ2VTaXplRGlzdGluY3QkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUocGFnZVNpemUgPT4ge1xuICAgICAgaWYgKHBhZ2VTaXplICE9PSB0aGlzLm56UGFnZVNpemUpIHtcbiAgICAgICAgdGhpcy5uelBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgICAgIHRoaXMubnpQYWdlU2l6ZUNoYW5nZS5uZXh0KHBhZ2VTaXplKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0b3RhbCRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLm56RnJvbnRQYWdpbmF0aW9uKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0b3RhbCA9PiB7XG4gICAgICAgIGlmICh0b3RhbCAhPT0gdGhpcy5uelRvdGFsKSB7XG4gICAgICAgICAgdGhpcy5uelRvdGFsID0gdG90YWw7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGxpc3RPZkN1cnJlbnRQYWdlRGF0YSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLm56Q3VycmVudFBhZ2VEYXRhQ2hhbmdlLm5leHQoZGF0YSk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIHRoZWFkVGVtcGxhdGUkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodGhlYWRUZW1wbGF0ZSA9PiB7XG4gICAgICB0aGlzLnRoZWFkVGVtcGxhdGUgPSB0aGVhZFRlbXBsYXRlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICBoYXNGaXhMZWZ0JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGhhc0ZpeExlZnQgPT4ge1xuICAgICAgdGhpcy5oYXNGaXhMZWZ0ID0gaGFzRml4TGVmdDtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgaGFzRml4UmlnaHQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoaGFzRml4UmlnaHQgPT4ge1xuICAgICAgdGhpcy5oYXNGaXhSaWdodCA9IGhhc0ZpeFJpZ2h0O1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICBjb21iaW5lTGF0ZXN0KFt0b3RhbCQsIHRoaXMubG9hZGluZyQsIHRoaXMudGVtcGxhdGVNb2RlJF0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbdG90YWwsIGxvYWRpbmcsIHRlbXBsYXRlTW9kZV0pID0+IHRvdGFsID09PSAwICYmICFsb2FkaW5nICYmICF0ZW1wbGF0ZU1vZGUpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZW1wdHkgPT4ge1xuICAgICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0U2hvd0VtcHR5KGVtcHR5KTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhcldpZHRoID0gbWVhc3VyZVNjcm9sbGJhcigndmVydGljYWwnKTtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UubGlzdE9mTGlzdE9mVGhXaWR0aFB4JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGxpc3RPZldpZHRoID0+IHtcbiAgICAgIHRoaXMubGlzdE9mQXV0b0NvbFdpZHRoID0gbGlzdE9mV2lkdGg7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UubWFudWFsV2lkdGhDb25maWdQeCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShsaXN0T2ZXaWR0aCA9PiB7XG4gICAgICB0aGlzLmxpc3RPZk1hbnVhbENvbFdpZHRoID0gbGlzdE9mV2lkdGg7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U2Nyb2xsLCBuelBhZ2VJbmRleCwgbnpQYWdlU2l6ZSwgbnpGcm9udFBhZ2luYXRpb24sIG56RGF0YSwgbnpXaWR0aENvbmZpZywgbnpOb1Jlc3VsdCwgbnpMb2FkaW5nLCBuelRlbXBsYXRlTW9kZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpQYWdlSW5kZXgpIHtcbiAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLnVwZGF0ZVBhZ2VJbmRleCh0aGlzLm56UGFnZUluZGV4KTtcbiAgICB9XG4gICAgaWYgKG56UGFnZVNpemUpIHtcbiAgICAgIHRoaXMubnpUYWJsZURhdGFTZXJ2aWNlLnVwZGF0ZVBhZ2VTaXplKHRoaXMubnpQYWdlU2l6ZSk7XG4gICAgfVxuICAgIGlmIChuekRhdGEpIHtcbiAgICAgIHRoaXMubnpEYXRhID0gdGhpcy5uekRhdGEgfHwgW107XG4gICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS51cGRhdGVMaXN0T2ZEYXRhKHRoaXMubnpEYXRhKTtcbiAgICB9XG4gICAgaWYgKG56RnJvbnRQYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLm56VGFibGVEYXRhU2VydmljZS51cGRhdGVGcm9udFBhZ2luYXRpb24odGhpcy5uekZyb250UGFnaW5hdGlvbik7XG4gICAgfVxuICAgIGlmIChuelNjcm9sbCkge1xuICAgICAgdGhpcy5zY3JvbGxYID0gKHRoaXMubnpTY3JvbGwgJiYgdGhpcy5uelNjcm9sbC54KSB8fCBudWxsO1xuICAgICAgdGhpcy5zY3JvbGxZID0gKHRoaXMubnpTY3JvbGwgJiYgdGhpcy5uelNjcm9sbC55KSB8fCBudWxsO1xuICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldFNjcm9sbCh0aGlzLnNjcm9sbFgsIHRoaXMuc2Nyb2xsWSk7XG4gICAgfVxuICAgIGlmIChueldpZHRoQ29uZmlnKSB7XG4gICAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0VGFibGVXaWR0aENvbmZpZyh0aGlzLm56V2lkdGhDb25maWcpO1xuICAgIH1cbiAgICBpZiAobnpMb2FkaW5nKSB7XG4gICAgICB0aGlzLmxvYWRpbmckLm5leHQodGhpcy5uekxvYWRpbmcpO1xuICAgIH1cbiAgICBpZiAobnpUZW1wbGF0ZU1vZGUpIHtcbiAgICAgIHRoaXMudGVtcGxhdGVNb2RlJC5uZXh0KHRoaXMubnpUZW1wbGF0ZU1vZGUpO1xuICAgIH1cbiAgICBpZiAobnpOb1Jlc3VsdCkge1xuICAgICAgdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLnNldE5vUmVzdWx0KHRoaXMubnpOb1Jlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpSZXNpemVPYnNlcnZlclxuICAgICAgLm9ic2VydmUodGhpcy5lbGVtZW50UmVmKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2VudHJ5XSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgd2lkdGggfSA9IGVudHJ5LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IHRoaXMuc2Nyb2xsWSA/IHRoaXMudmVydGljYWxTY3JvbGxCYXJXaWR0aCA6IDA7XG4gICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3Iod2lkdGggLSBzY3JvbGxCYXJXaWR0aCk7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlLmhvc3RXaWR0aCQpO1xuICAgIGlmICh0aGlzLm56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudCAmJiB0aGlzLm56VGFibGVJbm5lclNjcm9sbENvbXBvbmVudC5jZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHtcbiAgICAgIHRoaXMuY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0ID0gdGhpcy5uelRhYmxlSW5uZXJTY3JvbGxDb21wb25lbnQuY2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19