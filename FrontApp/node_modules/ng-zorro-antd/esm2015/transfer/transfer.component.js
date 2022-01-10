/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { InputBoolean, toArray } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTransferListComponent } from './transfer-list.component';
export class NzTransferComponent {
    // #endregion
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.unsubscribe$ = new Subject();
        this.leftFilter = '';
        this.rightFilter = '';
        // #region fields
        this.nzDisabled = false;
        this.nzDataSource = [];
        this.nzTitles = ['', ''];
        this.nzOperations = [];
        this.nzListStyle = {};
        this.nzShowSelectAll = true;
        this.nzCanMove = (arg) => of(arg.list);
        this.nzRenderList = null;
        this.nzRender = null;
        this.nzFooter = null;
        this.nzShowSearch = false;
        this.nzTargetKeys = [];
        this.nzSelectedKeys = [];
        // events
        this.nzChange = new EventEmitter();
        this.nzSearchChange = new EventEmitter();
        this.nzSelectChange = new EventEmitter();
        // #endregion
        // #region process data
        // left
        this.leftDataSource = [];
        // right
        this.rightDataSource = [];
        this.handleLeftSelectAll = (checked) => this.handleSelect('left', checked);
        this.handleRightSelectAll = (checked) => this.handleSelect('right', checked);
        this.handleLeftSelect = (item) => this.handleSelect('left', !!item.checked, item);
        this.handleRightSelect = (item) => this.handleSelect('right', !!item.checked, item);
        // #endregion
        // #region operation
        this.leftActive = false;
        this.rightActive = false;
        this.moveToLeft = () => this.moveTo('left');
        this.moveToRight = () => this.moveTo('right');
    }
    splitDataSource() {
        this.leftDataSource = [];
        this.rightDataSource = [];
        this.nzDataSource.forEach(record => {
            if (record.direction === 'right') {
                record.direction = 'right';
                this.rightDataSource.push(record);
            }
            else {
                record.direction = 'left';
                this.leftDataSource.push(record);
            }
        });
    }
    getCheckedData(direction) {
        return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
    }
    handleSelect(direction, checked, item) {
        const list = this.getCheckedData(direction);
        this.updateOperationStatus(direction, list.length);
        this.nzSelectChange.emit({ direction, checked, list, item });
    }
    handleFilterChange(ret) {
        this.nzSearchChange.emit(ret);
    }
    updateOperationStatus(direction, count) {
        this[direction === 'right' ? 'leftActive' : 'rightActive'] =
            (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
    }
    moveTo(direction) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        this.updateOperationStatus(oppositeDirection, 0);
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const moveList = datasource.filter(item => item.checked === true && !item.disabled);
        this.nzCanMove({ direction, list: moveList }).subscribe(newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)), () => moveList.forEach(i => (i.checked = false)));
    }
    truthMoveTo(direction, list) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
        for (const item of list) {
            item.checked = false;
            item.hide = false;
            item.direction = direction;
            datasource.splice(datasource.indexOf(item), 1);
        }
        targetDatasource.splice(0, 0, ...list);
        this.updateOperationStatus(oppositeDirection);
        this.nzChange.emit({
            from: oppositeDirection,
            to: direction,
            list
        });
        this.markForCheckAllList();
    }
    markForCheckAllList() {
        if (!this.lists) {
            return;
        }
        this.lists.forEach(i => i.markForCheck());
    }
    handleNzTargetKeys() {
        const keys = toArray(this.nzTargetKeys);
        const hasOwnKey = (e) => e.hasOwnProperty('key');
        this.leftDataSource.forEach(e => {
            if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
                e.checked = true;
            }
        });
        this.moveToRight();
    }
    handleNzSelectedKeys() {
        const keys = toArray(this.nzSelectedKeys);
        this.nzDataSource.forEach(e => {
            if (keys.indexOf(e.key) !== -1) {
                e.checked = true;
            }
        });
        const term = (ld) => ld.disabled === false && ld.checked === true;
        this.rightActive = this.leftDataSource.some(term);
        this.leftActive = this.rightDataSource.some(term);
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Transfer');
            this.markForCheckAllList();
        });
    }
    ngOnChanges(changes) {
        if (changes.nzDataSource) {
            this.splitDataSource();
            this.updateOperationStatus('left');
            this.updateOperationStatus('right');
            this.cdr.detectChanges();
            this.markForCheckAllList();
        }
        if (changes.nzTargetKeys) {
            this.handleNzTargetKeys();
        }
        if (changes.nzSelectedKeys) {
            this.handleNzSelectedKeys();
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
NzTransferComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-transfer',
                exportAs: 'nzTransfer',
                preserveWhitespaces: false,
                template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    >
    </nz-transfer-list>
    <div class="ant-transfer-operation">
      <button nz-button (click)="moveToLeft()" [disabled]="nzDisabled || !leftActive" [nzType]="'primary'" [nzSize]="'small'">
        <i nz-icon nzType="left"></i><span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
      <button nz-button (click)="moveToRight()" [disabled]="nzDisabled || !rightActive" [nzType]="'primary'" [nzSize]="'small'">
        <i nz-icon nzType="right"></i><span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
    </div>
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    >
    </nz-transfer-list>
  `,
                host: {
                    '[class.ant-transfer]': `true`,
                    '[class.ant-transfer-disabled]': `nzDisabled`,
                    '[class.ant-transfer-customize-list]': `nzRenderList`
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzTransferComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzTransferComponent.propDecorators = {
    lists: [{ type: ViewChildren, args: [NzTransferListComponent,] }],
    nzDisabled: [{ type: Input }],
    nzDataSource: [{ type: Input }],
    nzTitles: [{ type: Input }],
    nzOperations: [{ type: Input }],
    nzListStyle: [{ type: Input }],
    nzShowSelectAll: [{ type: Input }],
    nzItemUnit: [{ type: Input }],
    nzItemsUnit: [{ type: Input }],
    nzCanMove: [{ type: Input }],
    nzRenderList: [{ type: Input }],
    nzRender: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzShowSearch: [{ type: Input }],
    nzFilterOption: [{ type: Input }],
    nzSearchPlaceholder: [{ type: Input }],
    nzNotFoundContent: [{ type: Input }],
    nzTargetKeys: [{ type: Input }],
    nzSelectedKeys: [{ type: Input }],
    nzChange: [{ type: Output }],
    nzSearchChange: [{ type: Output }],
    nzSelectChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTransferComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTransferComponent.prototype, "nzShowSelectAll", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTransferComponent.prototype, "nzShowSearch", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90cmFuc2Zlci8iLCJzb3VyY2VzIjpbInRyYW5zZmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsRUFHVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBMkIsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUF3RXBFLE1BQU0sT0FBTyxtQkFBbUI7SUFxSTlCLGFBQWE7SUFFYixZQUFvQixHQUFzQixFQUFVLElBQW1CO1FBQW5ELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBZTtRQWxJL0QsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBSzNDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakIsaUJBQWlCO1FBRVEsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQyxpQkFBWSxHQUFtQixFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLGdCQUFXLEdBQXFC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S0FBSzt1QkFHTCxNQUFNOzZCQUNOLE1BQU07NkJBQ04sTUFBTTs7QUF0QmtCO0lBQWYsWUFBWSxFQUFFOzt1REFBb0I7QUFLbkI7SUFBZixZQUFZLEVBQUU7OzREQUF3QjtBQU92QjtJQUFmLFlBQVksRUFBRTs7eURBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTmdTdHlsZUludGVyZmFjZSwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgdG9BcnJheSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VHJhbnNmZXJJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVHJhbnNmZXJDYW5Nb3ZlLCBUcmFuc2ZlckNoYW5nZSwgVHJhbnNmZXJEaXJlY3Rpb24sIFRyYW5zZmVySXRlbSwgVHJhbnNmZXJTZWFyY2hDaGFuZ2UsIFRyYW5zZmVyU2VsZWN0Q2hhbmdlIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnpUcmFuc2Zlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3RyYW5zZmVyLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJhbnNmZXInLFxuICBleHBvcnRBczogJ256VHJhbnNmZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdHJhbnNmZXItbGlzdFxuICAgICAgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdFwiXG4gICAgICBbbmdTdHlsZV09XCJuekxpc3RTdHlsZVwiXG4gICAgICBkYXRhLWRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICBbdGl0bGVUZXh0XT1cIm56VGl0bGVzWzBdXCJcbiAgICAgIFtzaG93U2VsZWN0QWxsXT1cIm56U2hvd1NlbGVjdEFsbFwiXG4gICAgICBbZGF0YVNvdXJjZV09XCJsZWZ0RGF0YVNvdXJjZVwiXG4gICAgICBbZmlsdGVyXT1cImxlZnRGaWx0ZXJcIlxuICAgICAgW2ZpbHRlck9wdGlvbl09XCJuekZpbHRlck9wdGlvblwiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIFtyZW5kZXJMaXN0XT1cIm56UmVuZGVyTGlzdCAmJiBuelJlbmRlckxpc3RbMF1cIlxuICAgICAgW3JlbmRlcl09XCJuelJlbmRlclwiXG4gICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbc2hvd1NlYXJjaF09XCJuelNob3dTZWFyY2hcIlxuICAgICAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cIm56U2VhcmNoUGxhY2Vob2xkZXIgfHwgbG9jYWxlPy5zZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICBbbm90Rm91bmRDb250ZW50XT1cIm56Tm90Rm91bmRDb250ZW50XCJcbiAgICAgIFtpdGVtVW5pdF09XCJuekl0ZW1Vbml0IHx8IGxvY2FsZT8uaXRlbVVuaXRcIlxuICAgICAgW2l0ZW1zVW5pdF09XCJuekl0ZW1zVW5pdCB8fCBsb2NhbGU/Lml0ZW1zVW5pdFwiXG4gICAgICBbZm9vdGVyXT1cIm56Rm9vdGVyXCJcbiAgICAgIChoYW5kbGVTZWxlY3QpPVwiaGFuZGxlTGVmdFNlbGVjdCgkZXZlbnQpXCJcbiAgICAgIChoYW5kbGVTZWxlY3RBbGwpPVwiaGFuZGxlTGVmdFNlbGVjdEFsbCgkZXZlbnQpXCJcbiAgICA+XG4gICAgPC9uei10cmFuc2Zlci1saXN0PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJhbnNmZXItb3BlcmF0aW9uXCI+XG4gICAgICA8YnV0dG9uIG56LWJ1dHRvbiAoY2xpY2spPVwibW92ZVRvTGVmdCgpXCIgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWQgfHwgIWxlZnRBY3RpdmVcIiBbbnpUeXBlXT1cIidwcmltYXJ5J1wiIFtuelNpemVdPVwiJ3NtYWxsJ1wiPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cImxlZnRcIj48L2k+PHNwYW4gKm5nSWY9XCJuek9wZXJhdGlvbnNbMV1cIj57eyBuek9wZXJhdGlvbnNbMV0gfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gbnotYnV0dG9uIChjbGljayk9XCJtb3ZlVG9SaWdodCgpXCIgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWQgfHwgIXJpZ2h0QWN0aXZlXCIgW256VHlwZV09XCIncHJpbWFyeSdcIiBbbnpTaXplXT1cIidzbWFsbCdcIj5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJyaWdodFwiPjwvaT48c3BhbiAqbmdJZj1cIm56T3BlcmF0aW9uc1swXVwiPnt7IG56T3BlcmF0aW9uc1swXSB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuei10cmFuc2Zlci1saXN0XG4gICAgICBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0XCJcbiAgICAgIFtuZ1N0eWxlXT1cIm56TGlzdFN0eWxlXCJcbiAgICAgIGRhdGEtZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgW3RpdGxlVGV4dF09XCJuelRpdGxlc1sxXVwiXG4gICAgICBbc2hvd1NlbGVjdEFsbF09XCJuelNob3dTZWxlY3RBbGxcIlxuICAgICAgW2RhdGFTb3VyY2VdPVwicmlnaHREYXRhU291cmNlXCJcbiAgICAgIFtmaWx0ZXJdPVwicmlnaHRGaWx0ZXJcIlxuICAgICAgW2ZpbHRlck9wdGlvbl09XCJuekZpbHRlck9wdGlvblwiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIFtyZW5kZXJMaXN0XT1cIm56UmVuZGVyTGlzdCAmJiBuelJlbmRlckxpc3RbMV1cIlxuICAgICAgW3JlbmRlcl09XCJuelJlbmRlclwiXG4gICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbc2hvd1NlYXJjaF09XCJuelNob3dTZWFyY2hcIlxuICAgICAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cIm56U2VhcmNoUGxhY2Vob2xkZXIgfHwgbG9jYWxlPy5zZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICBbbm90Rm91bmRDb250ZW50XT1cIm56Tm90Rm91bmRDb250ZW50XCJcbiAgICAgIFtpdGVtVW5pdF09XCJuekl0ZW1Vbml0IHx8IGxvY2FsZT8uaXRlbVVuaXRcIlxuICAgICAgW2l0ZW1zVW5pdF09XCJuekl0ZW1zVW5pdCB8fCBsb2NhbGU/Lml0ZW1zVW5pdFwiXG4gICAgICBbZm9vdGVyXT1cIm56Rm9vdGVyXCJcbiAgICAgIChoYW5kbGVTZWxlY3QpPVwiaGFuZGxlUmlnaHRTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAoaGFuZGxlU2VsZWN0QWxsKT1cImhhbmRsZVJpZ2h0U2VsZWN0QWxsKCRldmVudClcIlxuICAgID5cbiAgICA8L256LXRyYW5zZmVyLWxpc3Q+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10cmFuc2Zlcl0nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJhbnNmZXItZGlzYWJsZWRdJzogYG56RGlzYWJsZWRgLFxuICAgICdbY2xhc3MuYW50LXRyYW5zZmVyLWN1c3RvbWl6ZS1saXN0XSc6IGBuelJlbmRlckxpc3RgXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56VHJhbnNmZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1NlbGVjdEFsbDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93U2VhcmNoOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBAVmlld0NoaWxkcmVuKE56VHJhbnNmZXJMaXN0Q29tcG9uZW50KVxuICBwcml2YXRlIGxpc3RzITogUXVlcnlMaXN0PE56VHJhbnNmZXJMaXN0Q29tcG9uZW50PjtcbiAgbG9jYWxlITogTnpUcmFuc2ZlckkxOG5JbnRlcmZhY2U7XG5cbiAgbGVmdEZpbHRlciA9ICcnO1xuICByaWdodEZpbHRlciA9ICcnO1xuXG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpEYXRhU291cmNlOiBUcmFuc2Zlckl0ZW1bXSA9IFtdO1xuICBASW5wdXQoKSBuelRpdGxlczogc3RyaW5nW10gPSBbJycsICcnXTtcbiAgQElucHV0KCkgbnpPcGVyYXRpb25zOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBuekxpc3RTdHlsZTogTmdTdHlsZUludGVyZmFjZSA9IHt9O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93U2VsZWN0QWxsID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpJdGVtVW5pdD86IHN0cmluZztcbiAgQElucHV0KCkgbnpJdGVtc1VuaXQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56Q2FuTW92ZTogKGFyZzogVHJhbnNmZXJDYW5Nb3ZlKSA9PiBPYnNlcnZhYmxlPFRyYW5zZmVySXRlbVtdPiA9IChhcmc6IFRyYW5zZmVyQ2FuTW92ZSkgPT4gb2YoYXJnLmxpc3QpO1xuICBASW5wdXQoKSBuelJlbmRlckxpc3Q6IEFycmF5PFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelJlbmRlcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekZvb3RlcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93U2VhcmNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56RmlsdGVyT3B0aW9uPzogKGlucHV0VmFsdWU6IHN0cmluZywgaXRlbTogVHJhbnNmZXJJdGVtKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBuelNlYXJjaFBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBuek5vdEZvdW5kQ29udGVudD86IHN0cmluZztcbiAgQElucHV0KCkgbnpUYXJnZXRLZXlzOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBuelNlbGVjdGVkS2V5czogc3RyaW5nW10gPSBbXTtcblxuICAvLyBldmVudHNcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2ZlckNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VhcmNoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2ZlclNlYXJjaENoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VsZWN0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUcmFuc2ZlclNlbGVjdENoYW5nZT4oKTtcblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBwcm9jZXNzIGRhdGFcblxuICAvLyBsZWZ0XG4gIGxlZnREYXRhU291cmNlOiBUcmFuc2Zlckl0ZW1bXSA9IFtdO1xuXG4gIC8vIHJpZ2h0XG4gIHJpZ2h0RGF0YVNvdXJjZTogVHJhbnNmZXJJdGVtW10gPSBbXTtcblxuICBwcml2YXRlIHNwbGl0RGF0YVNvdXJjZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxlZnREYXRhU291cmNlID0gW107XG4gICAgdGhpcy5yaWdodERhdGFTb3VyY2UgPSBbXTtcbiAgICB0aGlzLm56RGF0YVNvdXJjZS5mb3JFYWNoKHJlY29yZCA9PiB7XG4gICAgICBpZiAocmVjb3JkLmRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICByZWNvcmQuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgdGhpcy5yaWdodERhdGFTb3VyY2UucHVzaChyZWNvcmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjb3JkLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICAgICAgdGhpcy5sZWZ0RGF0YVNvdXJjZS5wdXNoKHJlY29yZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldENoZWNrZWREYXRhKGRpcmVjdGlvbjogVHJhbnNmZXJEaXJlY3Rpb24pOiBUcmFuc2Zlckl0ZW1bXSB7XG4gICAgcmV0dXJuIHRoaXNbZGlyZWN0aW9uID09PSAnbGVmdCcgPyAnbGVmdERhdGFTb3VyY2UnIDogJ3JpZ2h0RGF0YVNvdXJjZSddLmZpbHRlcih3ID0+IHcuY2hlY2tlZCk7XG4gIH1cblxuICBoYW5kbGVMZWZ0U2VsZWN0QWxsID0gKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHRoaXMuaGFuZGxlU2VsZWN0KCdsZWZ0JywgY2hlY2tlZCk7XG4gIGhhbmRsZVJpZ2h0U2VsZWN0QWxsID0gKGNoZWNrZWQ6IGJvb2xlYW4pID0+IHRoaXMuaGFuZGxlU2VsZWN0KCdyaWdodCcsIGNoZWNrZWQpO1xuXG4gIGhhbmRsZUxlZnRTZWxlY3QgPSAoaXRlbTogVHJhbnNmZXJJdGVtKSA9PiB0aGlzLmhhbmRsZVNlbGVjdCgnbGVmdCcsICEhaXRlbS5jaGVja2VkLCBpdGVtKTtcbiAgaGFuZGxlUmlnaHRTZWxlY3QgPSAoaXRlbTogVHJhbnNmZXJJdGVtKSA9PiB0aGlzLmhhbmRsZVNlbGVjdCgncmlnaHQnLCAhIWl0ZW0uY2hlY2tlZCwgaXRlbSk7XG5cbiAgaGFuZGxlU2VsZWN0KGRpcmVjdGlvbjogVHJhbnNmZXJEaXJlY3Rpb24sIGNoZWNrZWQ6IGJvb2xlYW4sIGl0ZW0/OiBUcmFuc2Zlckl0ZW0pOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRDaGVja2VkRGF0YShkaXJlY3Rpb24pO1xuICAgIHRoaXMudXBkYXRlT3BlcmF0aW9uU3RhdHVzKGRpcmVjdGlvbiwgbGlzdC5sZW5ndGgpO1xuICAgIHRoaXMubnpTZWxlY3RDaGFuZ2UuZW1pdCh7IGRpcmVjdGlvbiwgY2hlY2tlZCwgbGlzdCwgaXRlbSB9KTtcbiAgfVxuXG4gIGhhbmRsZUZpbHRlckNoYW5nZShyZXQ6IHsgZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbjsgdmFsdWU6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgdGhpcy5uelNlYXJjaENoYW5nZS5lbWl0KHJldCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgLy8gI3JlZ2lvbiBvcGVyYXRpb25cblxuICBsZWZ0QWN0aXZlID0gZmFsc2U7XG4gIHJpZ2h0QWN0aXZlID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB1cGRhdGVPcGVyYXRpb25TdGF0dXMoZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbiwgY291bnQ/OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzW2RpcmVjdGlvbiA9PT0gJ3JpZ2h0JyA/ICdsZWZ0QWN0aXZlJyA6ICdyaWdodEFjdGl2ZSddID1cbiAgICAgICh0eXBlb2YgY291bnQgPT09ICd1bmRlZmluZWQnID8gdGhpcy5nZXRDaGVja2VkRGF0YShkaXJlY3Rpb24pLmZpbHRlcih3ID0+ICF3LmRpc2FibGVkKS5sZW5ndGggOiBjb3VudCkgPiAwO1xuICB9XG5cbiAgbW92ZVRvTGVmdCA9ICgpID0+IHRoaXMubW92ZVRvKCdsZWZ0Jyk7XG4gIG1vdmVUb1JpZ2h0ID0gKCkgPT4gdGhpcy5tb3ZlVG8oJ3JpZ2h0Jyk7XG5cbiAgbW92ZVRvKGRpcmVjdGlvbjogVHJhbnNmZXJEaXJlY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCBvcHBvc2l0ZURpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB0aGlzLnVwZGF0ZU9wZXJhdGlvblN0YXR1cyhvcHBvc2l0ZURpcmVjdGlvbiwgMCk7XG4gICAgY29uc3QgZGF0YXNvdXJjZSA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gdGhpcy5yaWdodERhdGFTb3VyY2UgOiB0aGlzLmxlZnREYXRhU291cmNlO1xuICAgIGNvbnN0IG1vdmVMaXN0ID0gZGF0YXNvdXJjZS5maWx0ZXIoaXRlbSA9PiBpdGVtLmNoZWNrZWQgPT09IHRydWUgJiYgIWl0ZW0uZGlzYWJsZWQpO1xuICAgIHRoaXMubnpDYW5Nb3ZlKHsgZGlyZWN0aW9uLCBsaXN0OiBtb3ZlTGlzdCB9KS5zdWJzY3JpYmUoXG4gICAgICBuZXdNb3ZlTGlzdCA9PlxuICAgICAgICB0aGlzLnRydXRoTW92ZVRvKFxuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICBuZXdNb3ZlTGlzdC5maWx0ZXIoaSA9PiAhIWkpXG4gICAgICAgICksXG4gICAgICAoKSA9PiBtb3ZlTGlzdC5mb3JFYWNoKGkgPT4gKGkuY2hlY2tlZCA9IGZhbHNlKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB0cnV0aE1vdmVUbyhkaXJlY3Rpb246IFRyYW5zZmVyRGlyZWN0aW9uLCBsaXN0OiBUcmFuc2Zlckl0ZW1bXSk6IHZvaWQge1xuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIGNvbnN0IGRhdGFzb3VyY2UgPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IHRoaXMucmlnaHREYXRhU291cmNlIDogdGhpcy5sZWZ0RGF0YVNvdXJjZTtcbiAgICBjb25zdCB0YXJnZXREYXRhc291cmNlID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyB0aGlzLmxlZnREYXRhU291cmNlIDogdGhpcy5yaWdodERhdGFTb3VyY2U7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGxpc3QpIHtcbiAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgaXRlbS5oaWRlID0gZmFsc2U7XG4gICAgICBpdGVtLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgIGRhdGFzb3VyY2Uuc3BsaWNlKGRhdGFzb3VyY2UuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgfVxuICAgIHRhcmdldERhdGFzb3VyY2Uuc3BsaWNlKDAsIDAsIC4uLmxpc3QpO1xuICAgIHRoaXMudXBkYXRlT3BlcmF0aW9uU3RhdHVzKG9wcG9zaXRlRGlyZWN0aW9uKTtcbiAgICB0aGlzLm56Q2hhbmdlLmVtaXQoe1xuICAgICAgZnJvbTogb3Bwb3NpdGVEaXJlY3Rpb24sXG4gICAgICB0bzogZGlyZWN0aW9uLFxuICAgICAgbGlzdFxuICAgIH0pO1xuICAgIHRoaXMubWFya0ZvckNoZWNrQWxsTGlzdCgpO1xuICB9XG5cbiAgLy8gI2VuZHJlZ2lvblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlKSB7fVxuXG4gIHByaXZhdGUgbWFya0ZvckNoZWNrQWxsTGlzdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGlzdHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5saXN0cy5mb3JFYWNoKGkgPT4gaS5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU56VGFyZ2V0S2V5cygpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlzID0gdG9BcnJheSh0aGlzLm56VGFyZ2V0S2V5cyk7XG4gICAgY29uc3QgaGFzT3duS2V5ID0gKGU6IFRyYW5zZmVySXRlbSkgPT4gZS5oYXNPd25Qcm9wZXJ0eSgna2V5Jyk7XG4gICAgdGhpcy5sZWZ0RGF0YVNvdXJjZS5mb3JFYWNoKGUgPT4ge1xuICAgICAgaWYgKGhhc093bktleShlKSAmJiBrZXlzLmluZGV4T2YoZS5rZXkpICE9PSAtMSAmJiAhZS5kaXNhYmxlZCkge1xuICAgICAgICBlLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubW92ZVRvUmlnaHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTnpTZWxlY3RlZEtleXMoKTogdm9pZCB7XG4gICAgY29uc3Qga2V5cyA9IHRvQXJyYXkodGhpcy5uelNlbGVjdGVkS2V5cyk7XG4gICAgdGhpcy5uekRhdGFTb3VyY2UuZm9yRWFjaChlID0+IHtcbiAgICAgIGlmIChrZXlzLmluZGV4T2YoZS5rZXkpICE9PSAtMSkge1xuICAgICAgICBlLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHRlcm0gPSAobGQ6IFRyYW5zZmVySXRlbSkgPT4gbGQuZGlzYWJsZWQgPT09IGZhbHNlICYmIGxkLmNoZWNrZWQgPT09IHRydWU7XG4gICAgdGhpcy5yaWdodEFjdGl2ZSA9IHRoaXMubGVmdERhdGFTb3VyY2Uuc29tZSh0ZXJtKTtcbiAgICB0aGlzLmxlZnRBY3RpdmUgPSB0aGlzLnJpZ2h0RGF0YVNvdXJjZS5zb21lKHRlcm0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdUcmFuc2ZlcicpO1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2tBbGxMaXN0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubnpEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNwbGl0RGF0YVNvdXJjZSgpO1xuICAgICAgdGhpcy51cGRhdGVPcGVyYXRpb25TdGF0dXMoJ2xlZnQnKTtcbiAgICAgIHRoaXMudXBkYXRlT3BlcmF0aW9uU3RhdHVzKCdyaWdodCcpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tYXJrRm9yQ2hlY2tBbGxMaXN0KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm56VGFyZ2V0S2V5cykge1xuICAgICAgdGhpcy5oYW5kbGVOelRhcmdldEtleXMoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubnpTZWxlY3RlZEtleXMpIHtcbiAgICAgIHRoaXMuaGFuZGxlTnpTZWxlY3RlZEtleXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5uZXh0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19