/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, Host, Input, Optional, Output, SkipSelf, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { treeCollapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { flattenTreeData, NzTreeBase, NzTreeBaseService, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd/core/tree';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTreeService } from './tree.service';
export function NzTreeServiceFactory(higherOrderService, treeService) {
    return higherOrderService ? higherOrderService : treeService;
}
const NZ_CONFIG_MODULE_NAME = 'tree';
export class NzTreeComponent extends NzTreeBase {
    // Handle emit event end
    constructor(nzTreeService, nzConfigService, cdr, noAnimation) {
        super(nzTreeService);
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShowIcon = false;
        this.nzHideUnMatched = false;
        this.nzBlockNode = false;
        this.nzExpandAll = false;
        this.nzSelectMode = false;
        this.nzCheckStrictly = false;
        this.nzShowExpand = true;
        this.nzShowLine = false;
        this.nzCheckable = false;
        this.nzAsyncData = false;
        this.nzDraggable = false;
        this.nzMultiple = false;
        this.nzVirtualItemSize = 28;
        this.nzVirtualMaxBufferPx = 500;
        this.nzVirtualMinBufferPx = 28;
        this.nzVirtualHeight = null;
        this.nzData = [];
        this.nzExpandedKeys = [];
        this.nzSelectedKeys = [];
        this.nzCheckedKeys = [];
        this.nzSearchValue = '';
        this.nzFlattenNodes = [];
        this.beforeInit = true;
        this.nzExpandedKeysChange = new EventEmitter();
        this.nzSelectedKeysChange = new EventEmitter();
        this.nzCheckedKeysChange = new EventEmitter();
        this.nzSearchValueChange = new EventEmitter();
        this.nzClick = new EventEmitter();
        this.nzDblClick = new EventEmitter();
        this.nzContextMenu = new EventEmitter();
        this.nzCheckBoxChange = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.nzOnDragStart = new EventEmitter();
        this.nzOnDragEnter = new EventEmitter();
        this.nzOnDragOver = new EventEmitter();
        this.nzOnDragLeave = new EventEmitter();
        this.nzOnDrop = new EventEmitter();
        this.nzOnDragEnd = new EventEmitter();
        this.HIDDEN_STYLE = {
            width: 0,
            height: 0,
            display: 'flex',
            overflow: 'hidden',
            opacity: 0,
            border: 0,
            padding: 0,
            margin: 0
        };
        this.destroy$ = new Subject();
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    writeValue(value) {
        this.handleNzData(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Render all properties of nzTree
     * @param changes: all changes from @Input
     */
    renderTreeProperties(changes) {
        let useDefaultExpandedKeys = false;
        let expandAll = false;
        const { nzData, nzExpandedKeys, nzSelectedKeys, nzCheckedKeys, nzCheckStrictly, nzExpandAll, nzMultiple, nzSearchValue } = changes;
        if (nzExpandAll) {
            useDefaultExpandedKeys = true;
            expandAll = this.nzExpandAll;
        }
        if (nzMultiple) {
            this.nzTreeService.isMultiple = this.nzMultiple;
        }
        if (nzCheckStrictly) {
            this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
        }
        if (nzData) {
            this.handleNzData(this.nzData);
        }
        if (nzCheckedKeys) {
            this.handleCheckedKeys(this.nzCheckedKeys);
        }
        if (nzCheckStrictly) {
            this.handleCheckedKeys(null);
        }
        if (nzExpandedKeys || nzExpandAll) {
            useDefaultExpandedKeys = true;
            this.handleExpandedKeys(expandAll || this.nzExpandedKeys);
        }
        if (nzSelectedKeys) {
            this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
        }
        if (nzSearchValue) {
            if (!(nzSearchValue.firstChange && !this.nzSearchValue)) {
                useDefaultExpandedKeys = false;
                this.handleSearchValue(nzSearchValue.currentValue, this.nzSearchFunc);
                this.nzSearchValueChange.emit(this.nzTreeService.formatEvent('search', null, null));
            }
        }
        // flatten data
        const currentExpandedKeys = this.getExpandedNodeList().map(v => v.key);
        const newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
        this.handleFlattenNodes(this.nzTreeService.rootNodes, newExpandedKeys);
    }
    trackByFlattenNode(_, node) {
        return node.key;
    }
    // Deal with properties
    /**
     * nzData
     * @param value
     */
    handleNzData(value) {
        if (Array.isArray(value)) {
            const data = this.coerceTreeNodes(value);
            this.nzTreeService.initTree(data);
        }
    }
    handleFlattenNodes(data, expandKeys = []) {
        this.nzTreeService.flattenTreeData(data, expandKeys);
    }
    handleCheckedKeys(keys) {
        this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
    }
    handleExpandedKeys(keys = []) {
        this.nzTreeService.conductExpandedKeys(keys);
    }
    handleSelectedKeys(keys, isMulti) {
        this.nzTreeService.conductSelectedKeys(keys, isMulti);
    }
    handleSearchValue(value, searchFunc) {
        const dataList = flattenTreeData(this.nzTreeService.rootNodes, true).map(v => v.data);
        const checkIfMatched = (node) => {
            if (searchFunc) {
                return searchFunc(node.origin);
            }
            return !value || !node.title.toLowerCase().includes(value.toLowerCase()) ? false : true;
        };
        dataList.forEach(v => {
            v.isMatched = checkIfMatched(v);
            v.canHide = !v.isMatched;
            if (!v.isMatched) {
                v.setExpanded(false);
                this.nzTreeService.setExpandedNodeList(v);
            }
            else {
                // expand
                this.nzTreeService.expandNodeAllParentBySearch(v);
            }
            this.nzTreeService.setMatchedNodeList(v);
        });
    }
    /**
     * Handle emit event
     * @param event
     * handle each event
     */
    eventTriggerChanged(event) {
        const node = event.node;
        switch (event.eventName) {
            case 'expand':
                this.renderTree();
                this.nzExpandChange.emit(event);
                break;
            case 'click':
                this.nzClick.emit(event);
                break;
            case 'dblclick':
                this.nzDblClick.emit(event);
                break;
            case 'contextmenu':
                this.nzContextMenu.emit(event);
                break;
            case 'check':
                // Render checked state with nodes' property `isChecked`
                this.nzTreeService.setCheckedNodeList(node);
                if (!this.nzCheckStrictly) {
                    this.nzTreeService.conduct(node);
                }
                // Cause check method will rerender list, so we need recover it and next the new event to user
                const eventNext = this.nzTreeService.formatEvent('check', node, event.event);
                this.nzCheckBoxChange.emit(eventNext);
                break;
            case 'dragstart':
                // if node is expanded
                if (node.isExpanded) {
                    node.setExpanded(!node.isExpanded);
                    this.renderTree();
                }
                this.nzOnDragStart.emit(event);
                break;
            case 'dragenter':
                const selectedNode = this.nzTreeService.getSelectedNode();
                if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
                    node.setExpanded(true);
                    this.renderTree();
                }
                this.nzOnDragEnter.emit(event);
                break;
            case 'dragover':
                this.nzOnDragOver.emit(event);
                break;
            case 'dragleave':
                this.nzOnDragLeave.emit(event);
                break;
            case 'dragend':
                this.nzOnDragEnd.emit(event);
                break;
            case 'drop':
                this.renderTree();
                this.nzOnDrop.emit(event);
                break;
        }
    }
    /**
     * Click expand icon
     */
    renderTree() {
        this.handleFlattenNodes(this.nzTreeService.rootNodes, this.getExpandedNodeList().map(v => v.key));
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzTreeService.flattenNodes$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.nzFlattenNodes = data;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        this.renderTreeProperties(changes);
    }
    ngAfterViewInit() {
        this.beforeInit = false;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree',
                exportAs: 'nzTree',
                animations: [treeCollapseMotion],
                template: `
    <div role="tree">
      <input [ngStyle]="HIDDEN_STYLE" />
    </div>
    <div class="ant-tree-list" [class.ant-select-tree-list]="nzSelectMode">
      <div>
        <cdk-virtual-scroll-viewport
          *ngIf="nzVirtualHeight"
          [class.ant-select-tree-list-holder-inner]="nzSelectMode"
          [class.ant-tree-list-holder-inner]="!nzSelectMode"
          [itemSize]="nzVirtualItemSize"
          [minBufferPx]="nzVirtualMinBufferPx"
          [maxBufferPx]="nzVirtualMaxBufferPx"
          [style.height]="nzVirtualHeight"
        >
          <ng-container *cdkVirtualFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
            <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
          </ng-container>
        </cdk-virtual-scroll-viewport>

        <div
          *ngIf="!nzVirtualHeight"
          [class.ant-select-tree-list-holder-inner]="nzSelectMode"
          [class.ant-tree-list-holder-inner]="!nzSelectMode"
          [@.disabled]="beforeInit || noAnimation?.nzNoAnimation"
          [nzNoAnimation]="noAnimation?.nzNoAnimation"
          [@treeCollapseMotion]="nzFlattenNodes.length"
        >
          <ng-container *ngFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
            <ng-template [ngTemplateOutlet]="nodeTemplate" [ngTemplateOutletContext]="{ $implicit: node }"></ng-template>
          </ng-container>
        </div>
      </div>
    </div>
    <ng-template #nodeTemplate let-treeNode>
      <nz-tree-node
        [icon]="treeNode.icon"
        [title]="treeNode.title"
        [isLoading]="treeNode.isLoading"
        [isSelected]="treeNode.isSelected"
        [isDisabled]="treeNode.isDisabled"
        [isMatched]="treeNode.isMatched"
        [isExpanded]="treeNode.isExpanded"
        [isLeaf]="treeNode.isLeaf"
        [isStart]="treeNode.isStart"
        [isEnd]="treeNode.isEnd"
        [isChecked]="treeNode.isChecked"
        [isHalfChecked]="treeNode.isHalfChecked"
        [isDisableCheckbox]="treeNode.isDisableCheckbox"
        [isSelectable]="treeNode.isSelectable"
        [canHide]="treeNode.canHide"
        [nzTreeNode]="treeNode"
        [nzSelectMode]="nzSelectMode"
        [nzShowLine]="nzShowLine"
        [nzExpandedIcon]="nzExpandedIcon"
        [nzDraggable]="nzDraggable"
        [nzCheckable]="nzCheckable"
        [nzShowExpand]="nzShowExpand"
        [nzAsyncData]="nzAsyncData"
        [nzSearchValue]="nzSearchValue"
        [nzHideUnMatched]="nzHideUnMatched"
        [nzBeforeDrop]="nzBeforeDrop"
        [nzShowIcon]="nzShowIcon"
        [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
        (nzExpandChange)="eventTriggerChanged($event)"
        (nzClick)="eventTriggerChanged($event)"
        (nzDblClick)="eventTriggerChanged($event)"
        (nzContextMenu)="eventTriggerChanged($event)"
        (nzCheckBoxChange)="eventTriggerChanged($event)"
        (nzOnDragStart)="eventTriggerChanged($event)"
        (nzOnDragEnter)="eventTriggerChanged($event)"
        (nzOnDragOver)="eventTriggerChanged($event)"
        (nzOnDragLeave)="eventTriggerChanged($event)"
        (nzOnDragEnd)="eventTriggerChanged($event)"
        (nzOnDrop)="eventTriggerChanged($event)"
      ></nz-tree-node>
    </ng-template>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    NzTreeService,
                    {
                        provide: NzTreeBaseService,
                        useFactory: NzTreeServiceFactory,
                        deps: [[new SkipSelf(), new Optional(), NzTreeHigherOrderServiceToken], NzTreeService]
                    },
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzTreeComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-select-tree]': `nzSelectMode`,
                    '[class.ant-select-tree-show-line]': `nzSelectMode && nzShowLine`,
                    '[class.ant-select-tree-icon-hide]': `nzSelectMode && !nzShowIcon`,
                    '[class.ant-select-tree-block-node]': `nzSelectMode && nzBlockNode`,
                    '[class.ant-tree]': `!nzSelectMode`,
                    '[class.ant-tree-show-line]': `!nzSelectMode && nzShowLine`,
                    '[class.ant-tree-icon-hide]': `!nzSelectMode && !nzShowIcon`,
                    '[class.ant-tree-block-node]': `!nzSelectMode && nzBlockNode`,
                    '[class.draggable-tree]': `nzDraggable`
                }
            },] }
];
NzTreeComponent.ctorParameters = () => [
    { type: NzTreeBaseService },
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzTreeComponent.propDecorators = {
    nzShowIcon: [{ type: Input }],
    nzHideUnMatched: [{ type: Input }],
    nzBlockNode: [{ type: Input }],
    nzExpandAll: [{ type: Input }],
    nzSelectMode: [{ type: Input }],
    nzCheckStrictly: [{ type: Input }],
    nzShowExpand: [{ type: Input }],
    nzShowLine: [{ type: Input }],
    nzCheckable: [{ type: Input }],
    nzAsyncData: [{ type: Input }],
    nzDraggable: [{ type: Input }],
    nzMultiple: [{ type: Input }],
    nzExpandedIcon: [{ type: Input }],
    nzVirtualItemSize: [{ type: Input }],
    nzVirtualMaxBufferPx: [{ type: Input }],
    nzVirtualMinBufferPx: [{ type: Input }],
    nzVirtualHeight: [{ type: Input }],
    nzTreeTemplate: [{ type: Input }],
    nzBeforeDrop: [{ type: Input }],
    nzData: [{ type: Input }],
    nzExpandedKeys: [{ type: Input }],
    nzSelectedKeys: [{ type: Input }],
    nzCheckedKeys: [{ type: Input }],
    nzSearchValue: [{ type: Input }],
    nzSearchFunc: [{ type: Input }],
    nzTreeTemplateChild: [{ type: ContentChild, args: ['nzTreeTemplate', { static: true },] }],
    cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport },] }],
    nzExpandedKeysChange: [{ type: Output }],
    nzSelectedKeysChange: [{ type: Output }],
    nzCheckedKeysChange: [{ type: Output }],
    nzSearchValueChange: [{ type: Output }],
    nzClick: [{ type: Output }],
    nzDblClick: [{ type: Output }],
    nzContextMenu: [{ type: Output }],
    nzCheckBoxChange: [{ type: Output }],
    nzExpandChange: [{ type: Output }],
    nzOnDragStart: [{ type: Output }],
    nzOnDragEnter: [{ type: Output }],
    nzOnDragOver: [{ type: Output }],
    nzOnDragLeave: [{ type: Output }],
    nzOnDrop: [{ type: Output }],
    nzOnDragEnd: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    WithConfig(),
    __metadata("design:type", Boolean)
], NzTreeComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean(),
    WithConfig(),
    __metadata("design:type", Boolean)
], NzTreeComponent.prototype, "nzHideUnMatched", void 0);
__decorate([
    InputBoolean(),
    WithConfig(),
    __metadata("design:type", Boolean)
], NzTreeComponent.prototype, "nzBlockNode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzExpandAll", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzSelectMode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzCheckStrictly", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzShowLine", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzCheckable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzAsyncData", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeComponent.prototype, "nzDraggable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeComponent.prototype, "nzMultiple", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RyZWUvIiwic291cmNlcyI6WyJ0cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osVUFBVSxFQUNWLElBQUksRUFDSixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6RSxPQUFPLEVBQ0wsZUFBZSxFQUdmLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsNkJBQTZCLEVBSTlCLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxNQUFNLFVBQVUsb0JBQW9CLENBQUMsa0JBQXFDLEVBQUUsV0FBMEI7SUFDcEcsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMs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QVksRUFBRTtJQUFFLFVBQVUsRUFBRTs7d0RBQWtDO0FBQ2pDO0lBQTdCLFlBQVksRUFBRTtJQUFFLFVBQVUsRUFBRTs7b0RBQThCO0FBQzNDO0lBQWYsWUFBWSxFQUFFOztvREFBcUI7QUFDcEI7SUFBZixZQUFZLEVBQUU7O3FEQUFzQjtBQUNyQjtJQUFmLFlBQVksRUFBRTs7d0RBQXlCO0FBQ3hCO0lBQWYsWUFBWSxFQUFFOztxREFBOEI7QUFDN0I7SUFBZixZQUFZLEVBQUU7O21EQUFvQjtBQUNuQjtJQUFmLFlBQVksRUFBRTs7b0RBQXFCO0FBQ3BCO0lBQWYsWUFBWSxFQUFFOztvREFBcUI7QUFDcEI7SUFBZixZQUFZLEVBQUU7O29EQUE4QjtBQUM3QjtJQUFmLFlBQVksRUFBRTs7bURBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFNraXBTZWxmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdHJlZUNvbGxhcHNlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQge1xuICBmbGF0dGVuVHJlZURhdGEsXG4gIE56Rm9ybWF0QmVmb3JlRHJvcEV2ZW50LFxuICBOekZvcm1hdEVtaXRFdmVudCxcbiAgTnpUcmVlQmFzZSxcbiAgTnpUcmVlQmFzZVNlcnZpY2UsXG4gIE56VHJlZUhpZ2hlck9yZGVyU2VydmljZVRva2VuLFxuICBOelRyZWVOb2RlLFxuICBOelRyZWVOb2RlS2V5LFxuICBOelRyZWVOb2RlT3B0aW9uc1xufSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHJlZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOelRyZWVTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gTnpUcmVlU2VydmljZUZhY3RvcnkoaGlnaGVyT3JkZXJTZXJ2aWNlOiBOelRyZWVCYXNlU2VydmljZSwgdHJlZVNlcnZpY2U6IE56VHJlZVNlcnZpY2UpOiBOelRyZWVCYXNlU2VydmljZSB7XG4gIHJldHVybiBoaWdoZXJPcmRlclNlcnZpY2UgPyBoaWdoZXJPcmRlclNlcnZpY2UgOiB0cmVlU2VydmljZTtcbn1cblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICd0cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZScsXG4gIGV4cG9ydEFzOiAnbnpUcmVlJyxcbiAgYW5pbWF0aW9uczogW3RyZWVDb2xsYXBzZU1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiByb2xlPVwidHJlZVwiPlxuICAgICAgPGlucHV0IFtuZ1N0eWxlXT1cIkhJRERFTl9TVFlMRVwiIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC10cmVlLWxpc3RcIiBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWxpc3RdPVwibnpTZWxlY3RNb2RlXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0XG4gICAgICAgICAgKm5nSWY9XCJuelZpcnR1YWxIZWlnaHRcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtbGlzdC1ob2xkZXItaW5uZXJdPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRyZWUtbGlzdC1ob2xkZXItaW5uZXJdPVwiIW56U2VsZWN0TW9kZVwiXG4gICAgICAgICAgW2l0ZW1TaXplXT1cIm56VmlydHVhbEl0ZW1TaXplXCJcbiAgICAgICAgICBbbWluQnVmZmVyUHhdPVwibnpWaXJ0dWFsTWluQnVmZmVyUHhcIlxuICAgICAgICAgIFttYXhCdWZmZXJQeF09XCJuelZpcnR1YWxNYXhCdWZmZXJQeFwiXG4gICAgICAgICAgW3N0eWxlLmhlaWdodF09XCJuelZpcnR1YWxIZWlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBub2RlIG9mIG56RmxhdHRlbk5vZGVzOyB0cmFja0J5OiB0cmFja0J5RmxhdHRlbk5vZGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJub2RlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0PlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdJZj1cIiFuelZpcnR1YWxIZWlnaHRcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtbGlzdC1ob2xkZXItaW5uZXJdPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgICAgICBbY2xhc3MuYW50LXRyZWUtbGlzdC1ob2xkZXItaW5uZXJdPVwiIW56U2VsZWN0TW9kZVwiXG4gICAgICAgICAgW0AuZGlzYWJsZWRdPVwiYmVmb3JlSW5pdCB8fCBub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICAgIFtAdHJlZUNvbGxhcHNlTW90aW9uXT1cIm56RmxhdHRlbk5vZGVzLmxlbmd0aFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBub2RlIG9mIG56RmxhdHRlbk5vZGVzOyB0cmFja0J5OiB0cmFja0J5RmxhdHRlbk5vZGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJub2RlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG5vZGUgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlICNub2RlVGVtcGxhdGUgbGV0LXRyZWVOb2RlPlxuICAgICAgPG56LXRyZWUtbm9kZVxuICAgICAgICBbaWNvbl09XCJ0cmVlTm9kZS5pY29uXCJcbiAgICAgICAgW3RpdGxlXT1cInRyZWVOb2RlLnRpdGxlXCJcbiAgICAgICAgW2lzTG9hZGluZ109XCJ0cmVlTm9kZS5pc0xvYWRpbmdcIlxuICAgICAgICBbaXNTZWxlY3RlZF09XCJ0cmVlTm9kZS5pc1NlbGVjdGVkXCJcbiAgICAgICAgW2lzRGlzYWJsZWRdPVwidHJlZU5vZGUuaXNEaXNhYmxlZFwiXG4gICAgICAgIFtpc01hdGNoZWRdPVwidHJlZU5vZGUuaXNNYXRjaGVkXCJcbiAgICAgICAgW2lzRXhwYW5kZWRdPVwidHJlZU5vZGUuaXNFeHBhbmRlZFwiXG4gICAgICAgIFtpc0xlYWZdPVwidHJlZU5vZGUuaXNMZWFmXCJcbiAgICAgICAgW2lzU3RhcnRdPVwidHJlZU5vZGUuaXNTdGFydFwiXG4gICAgICAgIFtpc0VuZF09XCJ0cmVlTm9kZS5pc0VuZFwiXG4gICAgICAgIFtpc0NoZWNrZWRdPVwidHJlZU5vZGUuaXNDaGVja2VkXCJcbiAgICAgICAgW2lzSGFsZkNoZWNrZWRdPVwidHJlZU5vZGUuaXNIYWxmQ2hlY2tlZFwiXG4gICAgICAgIFtpc0Rpc2FibGVDaGVja2JveF09XCJ0cmVlTm9kZS5pc0Rpc2FibGVDaGVja2JveFwiXG4gICAgICAgIFtpc1NlbGVjdGFibGVdPVwidHJlZU5vZGUuaXNTZWxlY3RhYmxlXCJcbiAgICAgICAgW2NhbkhpZGVdPVwidHJlZU5vZGUuY2FuSGlkZVwiXG4gICAgICAgIFtuelRyZWVOb2RlXT1cInRyZWVOb2RlXCJcbiAgICAgICAgW256U2VsZWN0TW9kZV09XCJuelNlbGVjdE1vZGVcIlxuICAgICAgICBbbnpTaG93TGluZV09XCJuelNob3dMaW5lXCJcbiAgICAgICAgW256RXhwYW5kZWRJY29uXT1cIm56RXhwYW5kZWRJY29uXCJcbiAgICAgICAgW256RHJhZ2dhYmxlXT1cIm56RHJhZ2dhYmxlXCJcbiAgICAgICAgW256Q2hlY2thYmxlXT1cIm56Q2hlY2thYmxlXCJcbiAgICAgICAgW256U2hvd0V4cGFuZF09XCJuelNob3dFeHBhbmRcIlxuICAgICAgICBbbnpBc3luY0RhdGFdPVwibnpBc3luY0RhdGFcIlxuICAgICAgICBbbnpTZWFyY2hWYWx1ZV09XCJuelNlYXJjaFZhbHVlXCJcbiAgICAgICAgW256SGlkZVVuTWF0Y2hlZF09XCJuekhpZGVVbk1hdGNoZWRcIlxuICAgICAgICBbbnpCZWZvcmVEcm9wXT1cIm56QmVmb3JlRHJvcFwiXG4gICAgICAgIFtuelNob3dJY29uXT1cIm56U2hvd0ljb25cIlxuICAgICAgICBbbnpUcmVlVGVtcGxhdGVdPVwibnpUcmVlVGVtcGxhdGUgfHwgbnpUcmVlVGVtcGxhdGVDaGlsZFwiXG4gICAgICAgIChuekV4cGFuZENoYW5nZSk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpDbGljayk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpEYmxDbGljayk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpDb250ZXh0TWVudSk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpDaGVja0JveENoYW5nZSk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpPbkRyYWdTdGFydCk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpPbkRyYWdFbnRlcik9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpPbkRyYWdPdmVyKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJhZ0xlYXZlKT1cImV2ZW50VHJpZ2dlckNoYW5nZWQoJGV2ZW50KVwiXG4gICAgICAgIChuek9uRHJhZ0VuZCk9XCJldmVudFRyaWdnZXJDaGFuZ2VkKCRldmVudClcIlxuICAgICAgICAobnpPbkRyb3ApPVwiZXZlbnRUcmlnZ2VyQ2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgID48L256LXRyZWUtbm9kZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTnpUcmVlU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOelRyZWVCYXNlU2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6IE56VHJlZVNlcnZpY2VGYWN0b3J5LFxuICAgICAgZGVwczogW1tuZXcgU2tpcFNlbGYoKSwgbmV3IE9wdGlvbmFsKCksIE56VHJlZUhpZ2hlck9yZGVyU2VydmljZVRva2VuXSwgTnpUcmVlU2VydmljZV1cbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpUcmVlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWVdJzogYG56U2VsZWN0TW9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtc2hvdy1saW5lXSc6IGBuelNlbGVjdE1vZGUgJiYgbnpTaG93TGluZWAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaWNvbi1oaWRlXSc6IGBuelNlbGVjdE1vZGUgJiYgIW56U2hvd0ljb25gLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLWJsb2NrLW5vZGVdJzogYG56U2VsZWN0TW9kZSAmJiBuekJsb2NrTm9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZV0nOiBgIW56U2VsZWN0TW9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1zaG93LWxpbmVdJzogYCFuelNlbGVjdE1vZGUgJiYgbnpTaG93TGluZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1pY29uLWhpZGVdJzogYCFuelNlbGVjdE1vZGUgJiYgIW56U2hvd0ljb25gLFxuICAgICdbY2xhc3MuYW50LXRyZWUtYmxvY2stbm9kZV0nOiBgIW56U2VsZWN0TW9kZSAmJiBuekJsb2NrTm9kZWAsXG4gICAgJ1tjbGFzcy5kcmFnZ2FibGUtdHJlZV0nOiBgbnpEcmFnZ2FibGVgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlQ29tcG9uZW50IGV4dGVuZHMgTnpUcmVlQmFzZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0ljb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SGlkZVVuTWF0Y2hlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCbG9ja05vZGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RXhwYW5kQWxsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNlbGVjdE1vZGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2hlY2tTdHJpY3RseTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93RXhwYW5kOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dMaW5lOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNoZWNrYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBc3luY0RhdGE6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RHJhZ2dhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek11bHRpcGxlOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIEBXaXRoQ29uZmlnKCkgbnpTaG93SWNvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgQFdpdGhDb25maWcoKSBuekhpZGVVbk1hdGNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIEBXaXRoQ29uZmlnKCkgbnpCbG9ja05vZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RXhwYW5kQWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNlbGVjdE1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2tTdHJpY3RseSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93RXhwYW5kOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0xpbmUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2thYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekFzeW5jRGF0YSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEcmFnZ2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TXVsdGlwbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpFeHBhbmRlZEljb24/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpUcmVlTm9kZTsgb3JpZ2luOiBOelRyZWVOb2RlT3B0aW9ucyB9PjtcbiAgQElucHV0KCkgbnpWaXJ0dWFsSXRlbVNpemUgPSAyODtcbiAgQElucHV0KCkgbnpWaXJ0dWFsTWF4QnVmZmVyUHggPSA1MDA7XG4gIEBJbnB1dCgpIG56VmlydHVhbE1pbkJ1ZmZlclB4ID0gMjg7XG4gIEBJbnB1dCgpIG56VmlydHVhbEhlaWdodDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VHJlZVRlbXBsYXRlPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56VHJlZU5vZGU7IG9yaWdpbjogTnpUcmVlTm9kZU9wdGlvbnMgfT47XG4gIEBJbnB1dCgpIG56QmVmb3JlRHJvcD86IChjb25maXJtOiBOekZvcm1hdEJlZm9yZURyb3BFdmVudCkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgQElucHV0KCkgbnpEYXRhOiBOelRyZWVOb2RlT3B0aW9uc1tdIHwgTnpUcmVlTm9kZVtdID0gW107XG4gIEBJbnB1dCgpIG56RXhwYW5kZWRLZXlzOiBOelRyZWVOb2RlS2V5W10gPSBbXTtcbiAgQElucHV0KCkgbnpTZWxlY3RlZEtleXM6IE56VHJlZU5vZGVLZXlbXSA9IFtdO1xuICBASW5wdXQoKSBuekNoZWNrZWRLZXlzOiBOelRyZWVOb2RlS2V5W10gPSBbXTtcbiAgQElucHV0KCkgbnpTZWFyY2hWYWx1ZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG56U2VhcmNoRnVuYz86IChub2RlOiBOelRyZWVOb2RlT3B0aW9ucykgPT4gYm9vbGVhbjtcbiAgQENvbnRlbnRDaGlsZCgnbnpUcmVlVGVtcGxhdGUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBuelRyZWVUZW1wbGF0ZUNoaWxkITogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56VHJlZU5vZGU7IG9yaWdpbjogTnpUcmVlTm9kZU9wdGlvbnMgfT47XG4gIEBWaWV3Q2hpbGQoQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCB7IHJlYWQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB9KSBjZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQhOiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG4gIG56RmxhdHRlbk5vZGVzOiBOelRyZWVOb2RlW10gPSBbXTtcbiAgYmVmb3JlSW5pdCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXhwYW5kZWRLZXlzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2VsZWN0ZWRLZXlzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2hlY2tlZEtleXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWFyY2hWYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDb250ZXh0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNoZWNrQm94Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56RXhwYW5kQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25EcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdFbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJhZ092ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG5cbiAgSElEREVOX1NUWUxFID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIG9wYWNpdHk6IDAsXG4gICAgYm9yZGVyOiAwLFxuICAgIHBhZGRpbmc6IDAsXG4gICAgbWFyZ2luOiAwXG4gIH07XG5cbiAgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIG9uQ2hhbmdlOiAodmFsdWU6IE56VHJlZU5vZGVbXSkgPT4gdm9pZCA9ICgpID0+IG51bGw7XG4gIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IG51bGw7XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogTnpUcmVlTm9kZVtdKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVOekRhdGEodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IE56VHJlZU5vZGVbXSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYWxsIHByb3BlcnRpZXMgb2YgbnpUcmVlXG4gICAqIEBwYXJhbSBjaGFuZ2VzOiBhbGwgY2hhbmdlcyBmcm9tIEBJbnB1dFxuICAgKi9cbiAgcmVuZGVyVHJlZVByb3BlcnRpZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIGxldCB1c2VEZWZhdWx0RXhwYW5kZWRLZXlzID0gZmFsc2U7XG4gICAgbGV0IGV4cGFuZEFsbCA9IGZhbHNlO1xuICAgIGNvbnN0IHsgbnpEYXRhLCBuekV4cGFuZGVkS2V5cywgbnpTZWxlY3RlZEtleXMsIG56Q2hlY2tlZEtleXMsIG56Q2hlY2tTdHJpY3RseSwgbnpFeHBhbmRBbGwsIG56TXVsdGlwbGUsIG56U2VhcmNoVmFsdWUgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAobnpFeHBhbmRBbGwpIHtcbiAgICAgIHVzZURlZmF1bHRFeHBhbmRlZEtleXMgPSB0cnVlO1xuICAgICAgZXhwYW5kQWxsID0gdGhpcy5uekV4cGFuZEFsbDtcbiAgICB9XG5cbiAgICBpZiAobnpNdWx0aXBsZSkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmlzTXVsdGlwbGUgPSB0aGlzLm56TXVsdGlwbGU7XG4gICAgfVxuXG4gICAgaWYgKG56Q2hlY2tTdHJpY3RseSkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmlzQ2hlY2tTdHJpY3RseSA9IHRoaXMubnpDaGVja1N0cmljdGx5O1xuICAgIH1cblxuICAgIGlmIChuekRhdGEpIHtcbiAgICAgIHRoaXMuaGFuZGxlTnpEYXRhKHRoaXMubnpEYXRhKTtcbiAgICB9XG5cbiAgICBpZiAobnpDaGVja2VkS2V5cykge1xuICAgICAgdGhpcy5oYW5kbGVDaGVja2VkS2V5cyh0aGlzLm56Q2hlY2tlZEtleXMpO1xuICAgIH1cblxuICAgIGlmIChuekNoZWNrU3RyaWN0bHkpIHtcbiAgICAgIHRoaXMuaGFuZGxlQ2hlY2tlZEtleXMobnVsbCk7XG4gICAgfVxuXG4gICAgaWYgKG56RXhwYW5kZWRLZXlzIHx8IG56RXhwYW5kQWxsKSB7XG4gICAgICB1c2VEZWZhdWx0RXhwYW5kZWRLZXlzID0gdHJ1ZTtcbiAgICAgIHRoaXMuaGFuZGxlRXhwYW5kZWRLZXlzKGV4cGFuZEFsbCB8fCB0aGlzLm56RXhwYW5kZWRLZXlzKTtcbiAgICB9XG5cbiAgICBpZiAobnpTZWxlY3RlZEtleXMpIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VsZWN0ZWRLZXlzKHRoaXMubnpTZWxlY3RlZEtleXMsIHRoaXMubnpNdWx0aXBsZSk7XG4gICAgfVxuXG4gICAgaWYgKG56U2VhcmNoVmFsdWUpIHtcbiAgICAgIGlmICghKG56U2VhcmNoVmFsdWUuZmlyc3RDaGFuZ2UgJiYgIXRoaXMubnpTZWFyY2hWYWx1ZSkpIHtcbiAgICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkS2V5cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhbmRsZVNlYXJjaFZhbHVlKG56U2VhcmNoVmFsdWUuY3VycmVudFZhbHVlLCB0aGlzLm56U2VhcmNoRnVuYyk7XG4gICAgICAgIHRoaXMubnpTZWFyY2hWYWx1ZUNoYW5nZS5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnc2VhcmNoJywgbnVsbCwgbnVsbCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZsYXR0ZW4gZGF0YVxuICAgIGNvbnN0IGN1cnJlbnRFeHBhbmRlZEtleXMgPSB0aGlzLmdldEV4cGFuZGVkTm9kZUxpc3QoKS5tYXAodiA9PiB2LmtleSk7XG4gICAgY29uc3QgbmV3RXhwYW5kZWRLZXlzID0gdXNlRGVmYXVsdEV4cGFuZGVkS2V5cyA/IGV4cGFuZEFsbCB8fCB0aGlzLm56RXhwYW5kZWRLZXlzIDogY3VycmVudEV4cGFuZGVkS2V5cztcbiAgICB0aGlzLmhhbmRsZUZsYXR0ZW5Ob2Rlcyh0aGlzLm56VHJlZVNlcnZpY2Uucm9vdE5vZGVzLCBuZXdFeHBhbmRlZEtleXMpO1xuICB9XG5cbiAgdHJhY2tCeUZsYXR0ZW5Ob2RlKF86IG51bWJlciwgbm9kZTogTnpUcmVlTm9kZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGUua2V5O1xuICB9XG4gIC8vIERlYWwgd2l0aCBwcm9wZXJ0aWVzXG4gIC8qKlxuICAgKiBuekRhdGFcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBoYW5kbGVOekRhdGEodmFsdWU6IE56U2FmZUFueVtdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5jb2VyY2VUcmVlTm9kZXModmFsdWUpO1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmluaXRUcmVlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZsYXR0ZW5Ob2RlcyhkYXRhOiBOelRyZWVOb2RlW10sIGV4cGFuZEtleXM6IE56VHJlZU5vZGVLZXlbXSB8IHRydWUgPSBbXSk6IHZvaWQge1xuICAgIHRoaXMubnpUcmVlU2VydmljZS5mbGF0dGVuVHJlZURhdGEoZGF0YSwgZXhwYW5kS2V5cyk7XG4gIH1cblxuICBoYW5kbGVDaGVja2VkS2V5cyhrZXlzOiBOelRyZWVOb2RlS2V5W10gfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RDaGVjayhrZXlzLCB0aGlzLm56Q2hlY2tTdHJpY3RseSk7XG4gIH1cblxuICBoYW5kbGVFeHBhbmRlZEtleXMoa2V5czogTnpUcmVlTm9kZUtleVtdIHwgdHJ1ZSA9IFtdKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RFeHBhbmRlZEtleXMoa2V5cyk7XG4gIH1cblxuICBoYW5kbGVTZWxlY3RlZEtleXMoa2V5czogTnpUcmVlTm9kZUtleVtdLCBpc011bHRpOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLmNvbmR1Y3RTZWxlY3RlZEtleXMoa2V5cywgaXNNdWx0aSk7XG4gIH1cblxuICBoYW5kbGVTZWFyY2hWYWx1ZSh2YWx1ZTogc3RyaW5nLCBzZWFyY2hGdW5jPzogKG5vZGU6IE56VHJlZU5vZGVPcHRpb25zKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgZGF0YUxpc3QgPSBmbGF0dGVuVHJlZURhdGEodGhpcy5uelRyZWVTZXJ2aWNlLnJvb3ROb2RlcywgdHJ1ZSkubWFwKHYgPT4gdi5kYXRhKTtcbiAgICBjb25zdCBjaGVja0lmTWF0Y2hlZCA9IChub2RlOiBOelRyZWVOb2RlKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAoc2VhcmNoRnVuYykge1xuICAgICAgICByZXR1cm4gc2VhcmNoRnVuYyhub2RlLm9yaWdpbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gIXZhbHVlIHx8ICFub2RlLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkgPyBmYWxzZSA6IHRydWU7XG4gICAgfTtcbiAgICBkYXRhTGlzdC5mb3JFYWNoKHYgPT4ge1xuICAgICAgdi5pc01hdGNoZWQgPSBjaGVja0lmTWF0Y2hlZCh2KTtcbiAgICAgIHYuY2FuSGlkZSA9ICF2LmlzTWF0Y2hlZDtcbiAgICAgIGlmICghdi5pc01hdGNoZWQpIHtcbiAgICAgICAgdi5zZXRFeHBhbmRlZChmYWxzZSk7XG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXhwYW5kXG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5leHBhbmROb2RlQWxsUGFyZW50QnlTZWFyY2godik7XG4gICAgICB9XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2Uuc2V0TWF0Y2hlZE5vZGVMaXN0KHYpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBlbWl0IGV2ZW50XG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBoYW5kbGUgZWFjaCBldmVudFxuICAgKi9cbiAgZXZlbnRUcmlnZ2VyQ2hhbmdlZChldmVudDogTnpGb3JtYXRFbWl0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gZXZlbnQubm9kZSE7XG4gICAgc3dpdGNoIChldmVudC5ldmVudE5hbWUpIHtcbiAgICAgIGNhc2UgJ2V4cGFuZCc6XG4gICAgICAgIHRoaXMucmVuZGVyVHJlZSgpO1xuICAgICAgICB0aGlzLm56RXhwYW5kQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgdGhpcy5uekNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RibGNsaWNrJzpcbiAgICAgICAgdGhpcy5uekRibENsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbnRleHRtZW51JzpcbiAgICAgICAgdGhpcy5uekNvbnRleHRNZW51LmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoZWNrJzpcbiAgICAgICAgLy8gUmVuZGVyIGNoZWNrZWQgc3RhdGUgd2l0aCBub2RlcycgcHJvcGVydHkgYGlzQ2hlY2tlZGBcbiAgICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldENoZWNrZWROb2RlTGlzdChub2RlKTtcbiAgICAgICAgaWYgKCF0aGlzLm56Q2hlY2tTdHJpY3RseSkge1xuICAgICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5jb25kdWN0KG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENhdXNlIGNoZWNrIG1ldGhvZCB3aWxsIHJlcmVuZGVyIGxpc3QsIHNvIHdlIG5lZWQgcmVjb3ZlciBpdCBhbmQgbmV4dCB0aGUgbmV3IGV2ZW50IHRvIHVzZXJcbiAgICAgICAgY29uc3QgZXZlbnROZXh0ID0gdGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdjaGVjaycsIG5vZGUsIGV2ZW50LmV2ZW50ISk7XG4gICAgICAgIHRoaXMubnpDaGVja0JveENoYW5nZS5lbWl0KGV2ZW50TmV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ3N0YXJ0JzpcbiAgICAgICAgLy8gaWYgbm9kZSBpcyBleHBhbmRlZFxuICAgICAgICBpZiAobm9kZS5pc0V4cGFuZGVkKSB7XG4gICAgICAgICAgbm9kZS5zZXRFeHBhbmRlZCghbm9kZS5pc0V4cGFuZGVkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlclRyZWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm56T25EcmFnU3RhcnQuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlID0gdGhpcy5uelRyZWVTZXJ2aWNlLmdldFNlbGVjdGVkTm9kZSgpO1xuICAgICAgICBpZiAoc2VsZWN0ZWROb2RlICYmIHNlbGVjdGVkTm9kZS5rZXkgIT09IG5vZGUua2V5ICYmICFub2RlLmlzRXhwYW5kZWQgJiYgIW5vZGUuaXNMZWFmKSB7XG4gICAgICAgICAgbm9kZS5zZXRFeHBhbmRlZCh0cnVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlclRyZWUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm56T25EcmFnRW50ZXIuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgICB0aGlzLm56T25EcmFnT3Zlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkcmFnbGVhdmUnOlxuICAgICAgICB0aGlzLm56T25EcmFnTGVhdmUuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgIHRoaXMubnpPbkRyYWdFbmQuZW1pdChldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHJvcCc6XG4gICAgICAgIHRoaXMucmVuZGVyVHJlZSgpO1xuICAgICAgICB0aGlzLm56T25Ecm9wLmVtaXQoZXZlbnQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xpY2sgZXhwYW5kIGljb25cbiAgICovXG4gIHJlbmRlclRyZWUoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVGbGF0dGVuTm9kZXMoXG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2Uucm9vdE5vZGVzLFxuICAgICAgdGhpcy5nZXRFeHBhbmRlZE5vZGVMaXN0KCkubWFwKHYgPT4gdi5rZXkpXG4gICAgKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICAvLyBIYW5kbGUgZW1pdCBldmVudCBlbmRcblxuICBjb25zdHJ1Y3RvcihcbiAgICBuelRyZWVTZXJ2aWNlOiBOelRyZWVCYXNlU2VydmljZSxcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHtcbiAgICBzdXBlcihuelRyZWVTZXJ2aWNlKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpUcmVlU2VydmljZS5mbGF0dGVuTm9kZXMkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLm56RmxhdHRlbk5vZGVzID0gZGF0YTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyVHJlZVByb3BlcnRpZXMoY2hhbmdlcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5iZWZvcmVJbml0ID0gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==