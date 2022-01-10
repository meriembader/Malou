/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Host, Input, NgZone, Optional, Output, Renderer2, TemplateRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzTreeBaseService, NzTreeNode } from 'ng-zorro-antd/core/tree';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzTreeNodeComponent {
    constructor(nzTreeService, ngZone, renderer, elementRef, cdr, noAnimation) {
        this.nzTreeService = nzTreeService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.noAnimation = noAnimation;
        /**
         * for global property
         */
        this.icon = '';
        this.title = '';
        this.isLoading = false;
        this.isSelected = false;
        this.isDisabled = false;
        this.isMatched = false;
        this.nzHideUnMatched = false;
        this.nzNoAnimation = false;
        this.nzSelectMode = false;
        this.nzShowIcon = false;
        this.nzTreeTemplate = null;
        this.nzSearchValue = '';
        this.nzDraggable = false;
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
        /**
         * drag var
         */
        this.destroy$ = new Subject();
        this.dragPos = 2;
        this.dragPosClass = {
            '0': 'drag-over',
            '1': 'drag-over-gap-bottom',
            '-1': 'drag-over-gap-top'
        };
    }
    /**
     * default set
     */
    get displayStyle() {
        // to hide unmatched nodes
        return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide ? 'none' : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
    onMousedown(event) {
        if (this.nzSelectMode) {
            event.preventDefault();
        }
    }
    /**
     * collapse node
     * @param event
     */
    clickExpand(event) {
        event.preventDefault();
        if (!this.isLoading && !this.isLeaf) {
            // set async state
            if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.isExpanded) {
                this.nzTreeNode.isLoading = true;
            }
            this.nzTreeNode.setExpanded(!this.isExpanded);
        }
        this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('expand', this.nzTreeNode, event);
        this.nzExpandChange.emit(eventNext);
    }
    clickSelect(event) {
        event.preventDefault();
        if (this.isSelectable && !this.isDisabled) {
            this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
        }
        this.nzTreeService.setSelectedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('click', this.nzTreeNode, event);
        this.nzClick.emit(eventNext);
    }
    dblClick(event) {
        event.preventDefault();
        const eventNext = this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event);
        this.nzDblClick.emit(eventNext);
    }
    contextMenu(event) {
        event.preventDefault();
        const eventNext = this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event);
        this.nzContextMenu.emit(eventNext);
    }
    /**
     * check node
     * @param event
     */
    clickCheckBox(event) {
        event.preventDefault();
        // return if node is disabled
        if (this.isDisabled || this.isDisableCheckbox) {
            return;
        }
        this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
        this.nzTreeNode.isHalfChecked = false;
        this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('check', this.nzTreeNode, event);
        this.nzCheckBoxChange.emit(eventNext);
    }
    clearDragClass() {
        const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
        dragClass.forEach(e => {
            this.renderer.removeClass(this.elementRef.nativeElement, e);
        });
    }
    /**
     * drag event
     * @param e
     */
    handleDragStart(e) {
        try {
            // ie throw error
            // firefox-need-it
            e.dataTransfer.setData('text/plain', this.nzTreeNode.key);
        }
        catch (error) {
            // empty
        }
        this.nzTreeService.setSelectedNode(this.nzTreeNode);
        const eventNext = this.nzTreeService.formatEvent('dragstart', this.nzTreeNode, e);
        this.nzOnDragStart.emit(eventNext);
    }
    handleDragEnter(e) {
        e.preventDefault();
        // reset position
        this.dragPos = 2;
        this.ngZone.run(() => {
            const eventNext = this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e);
            this.nzOnDragEnter.emit(eventNext);
        });
    }
    handleDragOver(e) {
        e.preventDefault();
        const dropPosition = this.nzTreeService.calcDropPosition(e);
        if (this.dragPos !== dropPosition) {
            this.clearDragClass();
            this.dragPos = dropPosition;
            // leaf node will pass
            if (!(this.dragPos === 0 && this.isLeaf)) {
                this.renderer.addClass(this.elementRef.nativeElement, this.dragPosClass[this.dragPos]);
            }
        }
        const eventNext = this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e);
        this.nzOnDragOver.emit(eventNext);
    }
    handleDragLeave(e) {
        e.preventDefault();
        this.clearDragClass();
        const eventNext = this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e);
        this.nzOnDragLeave.emit(eventNext);
    }
    handleDragDrop(e) {
        this.ngZone.run(() => {
            this.clearDragClass();
            const node = this.nzTreeService.getSelectedNode();
            if (!node || (node && node.key === this.nzTreeNode.key) || (this.dragPos === 0 && this.isLeaf)) {
                return;
            }
            // pass if node is leafNo
            const dropEvent = this.nzTreeService.formatEvent('drop', this.nzTreeNode, e);
            const dragEndEvent = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
            if (this.nzBeforeDrop) {
                this.nzBeforeDrop({
                    dragNode: this.nzTreeService.getSelectedNode(),
                    node: this.nzTreeNode,
                    pos: this.dragPos
                }).subscribe((canDrop) => {
                    if (canDrop) {
                        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                    }
                    this.nzOnDrop.emit(dropEvent);
                    this.nzOnDragEnd.emit(dragEndEvent);
                });
            }
            else if (this.nzTreeNode) {
                this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                this.nzOnDrop.emit(dropEvent);
            }
        });
    }
    handleDragEnd(e) {
        e.preventDefault();
        this.ngZone.run(() => {
            // if user do not custom beforeDrop
            if (!this.nzBeforeDrop) {
                const eventNext = this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e);
                this.nzOnDragEnd.emit(eventNext);
            }
        });
    }
    /**
     * Listening to dragging events.
     */
    handDragEvent() {
        this.ngZone.runOutsideAngular(() => {
            if (this.nzDraggable) {
                const nativeElement = this.elementRef.nativeElement;
                this.destroy$ = new Subject();
                fromEvent(nativeElement, 'dragstart')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragStart(e));
                fromEvent(nativeElement, 'dragenter')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragEnter(e));
                fromEvent(nativeElement, 'dragover')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragOver(e));
                fromEvent(nativeElement, 'dragleave')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragLeave(e));
                fromEvent(nativeElement, 'drop')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragDrop(e));
                fromEvent(nativeElement, 'dragend')
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((e) => this.handleDragEnd(e));
            }
            else {
                this.destroy$.next();
                this.destroy$.complete();
            }
        });
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzTreeNode.component = this;
    }
    ngOnChanges(changes) {
        const { nzDraggable } = changes;
        if (nzDraggable) {
            this.handDragEvent();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node',
                exportAs: 'nzTreeNode',
                template: `
    <nz-tree-indent [nzTreeLevel]="nzTreeNode.level" [nzSelectMode]="nzSelectMode" [nzIsStart]="isStart" [nzIsEnd]="isEnd"></nz-tree-indent>
    <nz-tree-node-switcher
      *ngIf="nzShowExpand"
      [nzShowExpand]="nzShowExpand"
      [nzShowLine]="nzShowLine"
      [nzExpandedIcon]="nzExpandedIcon"
      [nzSelectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [isLeaf]="isLeaf"
      [isExpanded]="isExpanded"
      [isLoading]="isLoading"
      (click)="clickExpand($event)"
    ></nz-tree-node-switcher>
    <nz-tree-node-checkbox
      *ngIf="nzCheckable"
      (click)="clickCheckBox($event)"
      [nzSelectMode]="nzSelectMode"
      [isChecked]="isChecked"
      [isHalfChecked]="isHalfChecked"
      [isDisabled]="isDisabled"
      [isDisableCheckbox]="isDisableCheckbox"
    ></nz-tree-node-checkbox>
    <nz-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="nzSearchValue"
      [treeTemplate]="nzTreeTemplate"
      [draggable]="nzDraggable"
      [showIcon]="nzShowIcon"
      [selectMode]="nzSelectMode"
      [context]="nzTreeNode"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    ></nz-tree-node-title>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[class.ant-select-tree-treenode]': `nzSelectMode`,
                    '[class.ant-select-tree-treenode-disabled]': `nzSelectMode && isDisabled`,
                    '[class.ant-select-tree-treenode-switcher-open]': `nzSelectMode && isSwitcherOpen`,
                    '[class.ant-select-tree-treenode-switcher-close]': `nzSelectMode && isSwitcherClose`,
                    '[class.ant-select-tree-treenode-checkbox-checked]': `nzSelectMode && isChecked`,
                    '[class.ant-select-tree-treenode-checkbox-indeterminate]': `nzSelectMode && isHalfChecked`,
                    '[class.ant-select-tree-treenode-selected]': `nzSelectMode && isSelected`,
                    '[class.ant-select-tree-treenode-loading]': `nzSelectMode && isLoading`,
                    '[class.ant-tree-treenode]': `!nzSelectMode`,
                    '[class.ant-tree-treenode-disabled]': `!nzSelectMode && isDisabled`,
                    '[class.ant-tree-treenode-switcher-open]': `!nzSelectMode && isSwitcherOpen`,
                    '[class.ant-tree-treenode-switcher-close]': `!nzSelectMode && isSwitcherClose`,
                    '[class.ant-tree-treenode-checkbox-checked]': `!nzSelectMode && isChecked`,
                    '[class.ant-tree-treenode-checkbox-indeterminate]': `!nzSelectMode && isHalfChecked`,
                    '[class.ant-tree-treenode-selected]': `!nzSelectMode && isSelected`,
                    '[class.ant-tree-treenode-loading]': `!nzSelectMode && isLoading`,
                    '[style.display]': 'displayStyle',
                    '(mousedown)': 'onMousedown($event)'
                }
            },] }
];
NzTreeNodeComponent.ctorParameters = () => [
    { type: NzTreeBaseService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzTreeNodeComponent.propDecorators = {
    icon: [{ type: Input }],
    title: [{ type: Input }],
    isLoading: [{ type: Input }],
    isSelected: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isMatched: [{ type: Input }],
    isExpanded: [{ type: Input }],
    isLeaf: [{ type: Input }],
    isChecked: [{ type: Input }],
    isHalfChecked: [{ type: Input }],
    isDisableCheckbox: [{ type: Input }],
    isSelectable: [{ type: Input }],
    canHide: [{ type: Input }],
    isStart: [{ type: Input }],
    isEnd: [{ type: Input }],
    nzTreeNode: [{ type: Input }],
    nzShowLine: [{ type: Input }],
    nzShowExpand: [{ type: Input }],
    nzCheckable: [{ type: Input }],
    nzAsyncData: [{ type: Input }],
    nzHideUnMatched: [{ type: Input }],
    nzNoAnimation: [{ type: Input }],
    nzSelectMode: [{ type: Input }],
    nzShowIcon: [{ type: Input }],
    nzExpandedIcon: [{ type: Input }],
    nzTreeTemplate: [{ type: Input }],
    nzBeforeDrop: [{ type: Input }],
    nzSearchValue: [{ type: Input }],
    nzDraggable: [{ type: Input }],
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
    __metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzShowLine", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzCheckable", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzAsyncData", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeComponent.prototype, "nzHideUnMatched", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeComponent.prototype, "nzNoAnimation", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeComponent.prototype, "nzSelectMode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTreeNodeComponent.prototype, "nzShowIcon", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLElBQUksRUFDSixLQUFLLEVBQ0wsTUFBTSxFQUlOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUVULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6RSxPQUFPLEVBQThDLGlCQUFpQixFQUFFLFVBQVUsRUFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQUV2SSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBdUUzQyxNQUFNLE9BQU8sbUJBQW1CO0lBcVI5QixZQUNTLGFBQWdDLEVBQy9CLE1BQWMsRUFDZCxRQUFtQixFQUNuQixVQUFzQixFQUN0QixHQUFzQixFQUNILFdBQW9DO1FBTHhELGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ0gsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBalJqRTs7V0FFRztRQUNNLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixjQUFTLEdB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WUFGVixpQkFBaUI7WUFnQlYsc0JBQXNCLHVCQXdXMUIsSUFBSSxZQUFJLFFBQVE7OzttQkE5UWxCLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxNQUFNO3lCQUNOLE1BQU07NEJBQ04sTUFBTTsrQkFDTixNQUFNOzZCQUNOLE1BQU07NEJBQ04sTUFBTTs0QkFDTixNQUFNOzJCQUNOLE1BQU07NEJBQ04sTUFBTTt1QkFDTixNQUFNOzBCQUNOLE1BQU07O0FBdkJrQjtJQUFmLFlBQVksRUFBRTs7dURBQXNCO0FBQ3JCO0lBQWYsWUFBWSxFQUFFOzt5REFBd0I7QUFDdkI7SUFBZixZQUFZLEVBQUU7O3dEQUF1QjtBQUN0QjtJQUFmLFlBQVksRUFBRTs7d0RBQXVCO0FBQ3RCO0lBQWYsWUFBWSxFQUFFOzs0REFBeUI7QUFDeEI7SUFBZixZQUFZLEVBQUU7OzBEQUF1QjtBQUN0QjtJQUFmLFlBQVksRUFBRTs7eURBQXNCO0FBQ3JCO0lBQWYsWUFBWSxFQUFFOzt1REFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uRGlyZWN0aXZlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5cbmltcG9ydCB7IE56Rm9ybWF0QmVmb3JlRHJvcEV2ZW50LCBOekZvcm1hdEVtaXRFdmVudCwgTnpUcmVlQmFzZVNlcnZpY2UsIE56VHJlZU5vZGUsIE56VHJlZU5vZGVPcHRpb25zIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RyZWUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLW5vZGUnLFxuICBleHBvcnRBczogJ256VHJlZU5vZGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuei10cmVlLWluZGVudCBbbnpUcmVlTGV2ZWxdPVwibnpUcmVlTm9kZS5sZXZlbFwiIFtuelNlbGVjdE1vZGVdPVwibnpTZWxlY3RNb2RlXCIgW256SXNTdGFydF09XCJpc1N0YXJ0XCIgW256SXNFbmRdPVwiaXNFbmRcIj48L256LXRyZWUtaW5kZW50PlxuICAgIDxuei10cmVlLW5vZGUtc3dpdGNoZXJcbiAgICAgICpuZ0lmPVwibnpTaG93RXhwYW5kXCJcbiAgICAgIFtuelNob3dFeHBhbmRdPVwibnpTaG93RXhwYW5kXCJcbiAgICAgIFtuelNob3dMaW5lXT1cIm56U2hvd0xpbmVcIlxuICAgICAgW256RXhwYW5kZWRJY29uXT1cIm56RXhwYW5kZWRJY29uXCJcbiAgICAgIFtuelNlbGVjdE1vZGVdPVwibnpTZWxlY3RNb2RlXCJcbiAgICAgIFtjb250ZXh0XT1cIm56VHJlZU5vZGVcIlxuICAgICAgW2lzTGVhZl09XCJpc0xlYWZcIlxuICAgICAgW2lzRXhwYW5kZWRdPVwiaXNFeHBhbmRlZFwiXG4gICAgICBbaXNMb2FkaW5nXT1cImlzTG9hZGluZ1wiXG4gICAgICAoY2xpY2spPVwiY2xpY2tFeHBhbmQoJGV2ZW50KVwiXG4gICAgPjwvbnotdHJlZS1ub2RlLXN3aXRjaGVyPlxuICAgIDxuei10cmVlLW5vZGUtY2hlY2tib3hcbiAgICAgICpuZ0lmPVwibnpDaGVja2FibGVcIlxuICAgICAgKGNsaWNrKT1cImNsaWNrQ2hlY2tCb3goJGV2ZW50KVwiXG4gICAgICBbbnpTZWxlY3RNb2RlXT1cIm56U2VsZWN0TW9kZVwiXG4gICAgICBbaXNDaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICBbaXNIYWxmQ2hlY2tlZF09XCJpc0hhbGZDaGVja2VkXCJcbiAgICAgIFtpc0Rpc2FibGVkXT1cImlzRGlzYWJsZWRcIlxuICAgICAgW2lzRGlzYWJsZUNoZWNrYm94XT1cImlzRGlzYWJsZUNoZWNrYm94XCJcbiAgICA+PC9uei10cmVlLW5vZGUtY2hlY2tib3g+XG4gICAgPG56LXRyZWUtbm9kZS10aXRsZVxuICAgICAgW2ljb25dPVwiaWNvblwiXG4gICAgICBbdGl0bGVdPVwidGl0bGVcIlxuICAgICAgW2lzTG9hZGluZ109XCJpc0xvYWRpbmdcIlxuICAgICAgW2lzU2VsZWN0ZWRdPVwiaXNTZWxlY3RlZFwiXG4gICAgICBbaXNEaXNhYmxlZF09XCJpc0Rpc2FibGVkXCJcbiAgICAgIFtpc01hdGNoZWRdPVwiaXNNYXRjaGVkXCJcbiAgICAgIFtpc0V4cGFuZGVkXT1cImlzRXhwYW5kZWRcIlxuICAgICAgW2lzTGVhZl09XCJpc0xlYWZcIlxuICAgICAgW3NlYXJjaFZhbHVlXT1cIm56U2VhcmNoVmFsdWVcIlxuICAgICAgW3RyZWVUZW1wbGF0ZV09XCJuelRyZWVUZW1wbGF0ZVwiXG4gICAgICBbZHJhZ2dhYmxlXT1cIm56RHJhZ2dhYmxlXCJcbiAgICAgIFtzaG93SWNvbl09XCJuelNob3dJY29uXCJcbiAgICAgIFtzZWxlY3RNb2RlXT1cIm56U2VsZWN0TW9kZVwiXG4gICAgICBbY29udGV4dF09XCJuelRyZWVOb2RlXCJcbiAgICAgIChkYmxjbGljayk9XCJkYmxDbGljaygkZXZlbnQpXCJcbiAgICAgIChjbGljayk9XCJjbGlja1NlbGVjdCgkZXZlbnQpXCJcbiAgICAgIChjb250ZXh0bWVudSk9XCJjb250ZXh0TWVudSgkZXZlbnQpXCJcbiAgICA+PC9uei10cmVlLW5vZGUtdGl0bGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXRyZWVub2RlXSc6IGBuelNlbGVjdE1vZGVgLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXRyZWVub2RlLWRpc2FibGVkXSc6IGBuelNlbGVjdE1vZGUgJiYgaXNEaXNhYmxlZGAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtdHJlZW5vZGUtc3dpdGNoZXItb3Blbl0nOiBgbnpTZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJPcGVuYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS10cmVlbm9kZS1zd2l0Y2hlci1jbG9zZV0nOiBgbnpTZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJDbG9zZWAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtdHJlZW5vZGUtY2hlY2tib3gtY2hlY2tlZF0nOiBgbnpTZWxlY3RNb2RlICYmIGlzQ2hlY2tlZGAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtdHJlZW5vZGUtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZV0nOiBgbnpTZWxlY3RNb2RlICYmIGlzSGFsZkNoZWNrZWRgLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXRyZWVub2RlLXNlbGVjdGVkXSc6IGBuelNlbGVjdE1vZGUgJiYgaXNTZWxlY3RlZGAsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtdHJlZW5vZGUtbG9hZGluZ10nOiBgbnpTZWxlY3RNb2RlICYmIGlzTG9hZGluZ2AsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS10cmVlbm9kZV0nOiBgIW56U2VsZWN0TW9kZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS10cmVlbm9kZS1kaXNhYmxlZF0nOiBgIW56U2VsZWN0TW9kZSAmJiBpc0Rpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLXRyZWVub2RlLXN3aXRjaGVyLW9wZW5dJzogYCFuelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlck9wZW5gLFxuICAgICdbY2xhc3MuYW50LXRyZWUtdHJlZW5vZGUtc3dpdGNoZXItY2xvc2VdJzogYCFuelNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlckNsb3NlYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLXRyZWVub2RlLWNoZWNrYm94LWNoZWNrZWRdJzogYCFuelNlbGVjdE1vZGUgJiYgaXNDaGVja2VkYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLXRyZWVub2RlLWNoZWNrYm94LWluZGV0ZXJtaW5hdGVdJzogYCFuelNlbGVjdE1vZGUgJiYgaXNIYWxmQ2hlY2tlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS10cmVlbm9kZS1zZWxlY3RlZF0nOiBgIW56U2VsZWN0TW9kZSAmJiBpc1NlbGVjdGVkYCxcbiAgICAnW2NsYXNzLmFudC10cmVlLXRyZWVub2RlLWxvYWRpbmddJzogYCFuelNlbGVjdE1vZGUgJiYgaXNMb2FkaW5nYCxcbiAgICAnW3N0eWxlLmRpc3BsYXldJzogJ2Rpc3BsYXlTdHlsZScsXG4gICAgJyhtb3VzZWRvd24pJzogJ29uTW91c2Vkb3duKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93TGluZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93RXhwYW5kOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNoZWNrYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBc3luY0RhdGE6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SGlkZVVuTWF0Y2hlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpOb0FuaW1hdGlvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTZWxlY3RNb2RlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dJY29uOiBCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIGZvciBnbG9iYWwgcHJvcGVydHlcbiAgICovXG4gIEBJbnB1dCgpIGljb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGlzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpc1NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaXNNYXRjaGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzRXhwYW5kZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0xlYWYhOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0NoZWNrZWQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBpc0hhbGZDaGVja2VkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNEaXNhYmxlQ2hlY2tib3g/OiBib29sZWFuO1xuICBASW5wdXQoKSBpc1NlbGVjdGFibGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBjYW5IaWRlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNTdGFydD86IGJvb2xlYW5bXTtcbiAgQElucHV0KCkgaXNFbmQ/OiBib29sZWFuW107XG4gIEBJbnB1dCgpIG56VHJlZU5vZGUhOiBOelRyZWVOb2RlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dFeHBhbmQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDaGVja2FibGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBc3luY0RhdGE/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpIaWRlVW5NYXRjaGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek5vQW5pbWF0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNlbGVjdE1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0ljb24gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpFeHBhbmRlZEljb24/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpUcmVlTm9kZTsgb3JpZ2luOiBOelRyZWVOb2RlT3B0aW9ucyB9PjtcbiAgQElucHV0KCkgbnpUcmVlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56QmVmb3JlRHJvcD86IChjb25maXJtOiBOekZvcm1hdEJlZm9yZURyb3BFdmVudCkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgQElucHV0KCkgbnpTZWFyY2hWYWx1ZSA9ICcnO1xuICBASW5wdXQoKSBuekRyYWdnYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekRibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29udGV4dE1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGVja0JveENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekV4cGFuZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25EcmFnRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdPdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25EcmFnTGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyb3AgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBkcmFnIHZhclxuICAgKi9cbiAgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBkcmFnUG9zID0gMjtcbiAgZHJhZ1Bvc0NsYXNzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICcwJzogJ2RyYWctb3ZlcicsXG4gICAgJzEnOiAnZHJhZy1vdmVyLWdhcC1ib3R0b20nLFxuICAgICctMSc6ICdkcmFnLW92ZXItZ2FwLXRvcCdcbiAgfTtcblxuICAvKipcbiAgICogZGVmYXVsdCBzZXRcbiAgICovXG4gIGdldCBkaXNwbGF5U3R5bGUoKTogc3RyaW5nIHtcbiAgICAvLyB0byBoaWRlIHVubWF0Y2hlZCBub2Rlc1xuICAgIHJldHVybiB0aGlzLm56U2VhcmNoVmFsdWUgJiYgdGhpcy5uekhpZGVVbk1hdGNoZWQgJiYgIXRoaXMuaXNNYXRjaGVkICYmICF0aGlzLmlzRXhwYW5kZWQgJiYgdGhpcy5jYW5IaWRlID8gJ25vbmUnIDogJyc7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlck9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0xlYWY7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlckNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzTGVhZjtcbiAgfVxuXG4gIG9uTW91c2Vkb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpTZWxlY3RNb2RlKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjb2xsYXBzZSBub2RlXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgY2xpY2tFeHBhbmQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5pc0xvYWRpbmcgJiYgIXRoaXMuaXNMZWFmKSB7XG4gICAgICAvLyBzZXQgYXN5bmMgc3RhdGVcbiAgICAgIGlmICh0aGlzLm56QXN5bmNEYXRhICYmIHRoaXMubnpUcmVlTm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgJiYgIXRoaXMuaXNFeHBhbmRlZCkge1xuICAgICAgICB0aGlzLm56VHJlZU5vZGUuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMubnpUcmVlTm9kZS5zZXRFeHBhbmRlZCghdGhpcy5pc0V4cGFuZGVkKTtcbiAgICB9XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldEV4cGFuZGVkTm9kZUxpc3QodGhpcy5uelRyZWVOb2RlKTtcbiAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2V4cGFuZCcsIHRoaXMubnpUcmVlTm9kZSwgZXZlbnQpO1xuICAgIHRoaXMubnpFeHBhbmRDaGFuZ2UuZW1pdChldmVudE5leHQpO1xuICB9XG5cbiAgY2xpY2tTZWxlY3QoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmlzU2VsZWN0YWJsZSAmJiAhdGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLm56VHJlZU5vZGUuaXNTZWxlY3RlZCA9ICF0aGlzLm56VHJlZU5vZGUuaXNTZWxlY3RlZDtcbiAgICB9XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldFNlbGVjdGVkTm9kZUxpc3QodGhpcy5uelRyZWVOb2RlKTtcbiAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2NsaWNrJywgdGhpcy5uelRyZWVOb2RlLCBldmVudCk7XG4gICAgdGhpcy5uekNsaWNrLmVtaXQoZXZlbnROZXh0KTtcbiAgfVxuXG4gIGRibENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2RibGNsaWNrJywgdGhpcy5uelRyZWVOb2RlLCBldmVudCk7XG4gICAgdGhpcy5uekRibENsaWNrLmVtaXQoZXZlbnROZXh0KTtcbiAgfVxuXG4gIGNvbnRleHRNZW51KGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2NvbnRleHRtZW51JywgdGhpcy5uelRyZWVOb2RlLCBldmVudCk7XG4gICAgdGhpcy5uekNvbnRleHRNZW51LmVtaXQoZXZlbnROZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBub2RlXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgY2xpY2tDaGVja0JveChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gcmV0dXJuIGlmIG5vZGUgaXMgZGlzYWJsZWRcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkIHx8IHRoaXMuaXNEaXNhYmxlQ2hlY2tib3gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uelRyZWVOb2RlLmlzQ2hlY2tlZCA9ICF0aGlzLm56VHJlZU5vZGUuaXNDaGVja2VkO1xuICAgIHRoaXMubnpUcmVlTm9kZS5pc0hhbGZDaGVja2VkID0gZmFsc2U7XG4gICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldENoZWNrZWROb2RlTGlzdCh0aGlzLm56VHJlZU5vZGUpO1xuICAgIGNvbnN0IGV2ZW50TmV4dCA9IHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnY2hlY2snLCB0aGlzLm56VHJlZU5vZGUsIGV2ZW50KTtcbiAgICB0aGlzLm56Q2hlY2tCb3hDaGFuZ2UuZW1pdChldmVudE5leHQpO1xuICB9XG5cbiAgY2xlYXJEcmFnQ2xhc3MoKTogdm9pZCB7XG4gICAgY29uc3QgZHJhZ0NsYXNzID0gWydkcmFnLW92ZXItZ2FwLXRvcCcsICdkcmFnLW92ZXItZ2FwLWJvdHRvbScsICdkcmFnLW92ZXInXTtcbiAgICBkcmFnQ2xhc3MuZm9yRWFjaChlID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZXZlbnRcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGhhbmRsZURyYWdTdGFydChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgLy8gaWUgdGhyb3cgZXJyb3JcbiAgICAgIC8vIGZpcmVmb3gtbmVlZC1pdFxuICAgICAgZS5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLm56VHJlZU5vZGUua2V5ISk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIGVtcHR5XG4gICAgfVxuICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRTZWxlY3RlZE5vZGUodGhpcy5uelRyZWVOb2RlKTtcbiAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2RyYWdzdGFydCcsIHRoaXMubnpUcmVlTm9kZSwgZSk7XG4gICAgdGhpcy5uek9uRHJhZ1N0YXJ0LmVtaXQoZXZlbnROZXh0KTtcbiAgfVxuXG4gIGhhbmRsZURyYWdFbnRlcihlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gcmVzZXQgcG9zaXRpb25cbiAgICB0aGlzLmRyYWdQb3MgPSAyO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2RyYWdlbnRlcicsIHRoaXMubnpUcmVlTm9kZSwgZSk7XG4gICAgICB0aGlzLm56T25EcmFnRW50ZXIuZW1pdChldmVudE5leHQpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlRHJhZ092ZXIoZTogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGRyb3BQb3NpdGlvbiA9IHRoaXMubnpUcmVlU2VydmljZS5jYWxjRHJvcFBvc2l0aW9uKGUpO1xuICAgIGlmICh0aGlzLmRyYWdQb3MgIT09IGRyb3BQb3NpdGlvbikge1xuICAgICAgdGhpcy5jbGVhckRyYWdDbGFzcygpO1xuICAgICAgdGhpcy5kcmFnUG9zID0gZHJvcFBvc2l0aW9uO1xuICAgICAgLy8gbGVhZiBub2RlIHdpbGwgcGFzc1xuICAgICAgaWYgKCEodGhpcy5kcmFnUG9zID09PSAwICYmIHRoaXMuaXNMZWFmKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmRyYWdQb3NDbGFzc1t0aGlzLmRyYWdQb3NdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZXZlbnROZXh0ID0gdGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcmFnb3ZlcicsIHRoaXMubnpUcmVlTm9kZSwgZSk7XG4gICAgdGhpcy5uek9uRHJhZ092ZXIuZW1pdChldmVudE5leHQpO1xuICB9XG5cbiAgaGFuZGxlRHJhZ0xlYXZlKGU6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNsZWFyRHJhZ0NsYXNzKCk7XG4gICAgY29uc3QgZXZlbnROZXh0ID0gdGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcmFnbGVhdmUnLCB0aGlzLm56VHJlZU5vZGUsIGUpO1xuICAgIHRoaXMubnpPbkRyYWdMZWF2ZS5lbWl0KGV2ZW50TmV4dCk7XG4gIH1cblxuICBoYW5kbGVEcmFnRHJvcChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhckRyYWdDbGFzcygpO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubnpUcmVlU2VydmljZS5nZXRTZWxlY3RlZE5vZGUoKTtcbiAgICAgIGlmICghbm9kZSB8fCAobm9kZSAmJiBub2RlLmtleSA9PT0gdGhpcy5uelRyZWVOb2RlLmtleSkgfHwgKHRoaXMuZHJhZ1BvcyA9PT0gMCAmJiB0aGlzLmlzTGVhZikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gcGFzcyBpZiBub2RlIGlzIGxlYWZOb1xuICAgICAgY29uc3QgZHJvcEV2ZW50ID0gdGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcm9wJywgdGhpcy5uelRyZWVOb2RlLCBlKTtcbiAgICAgIGNvbnN0IGRyYWdFbmRFdmVudCA9IHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZHJhZ2VuZCcsIHRoaXMubnpUcmVlTm9kZSwgZSk7XG4gICAgICBpZiAodGhpcy5uekJlZm9yZURyb3ApIHtcbiAgICAgICAgdGhpcy5uekJlZm9yZURyb3Aoe1xuICAgICAgICAgIGRyYWdOb2RlOiB0aGlzLm56VHJlZVNlcnZpY2UuZ2V0U2VsZWN0ZWROb2RlKCkhLFxuICAgICAgICAgIG5vZGU6IHRoaXMubnpUcmVlTm9kZSxcbiAgICAgICAgICBwb3M6IHRoaXMuZHJhZ1Bvc1xuICAgICAgICB9KS5zdWJzY3JpYmUoKGNhbkRyb3A6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBpZiAoY2FuRHJvcCkge1xuICAgICAgICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLmRyb3BBbmRBcHBseSh0aGlzLm56VHJlZU5vZGUsIHRoaXMuZHJhZ1Bvcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubnpPbkRyb3AuZW1pdChkcm9wRXZlbnQpO1xuICAgICAgICAgIHRoaXMubnpPbkRyYWdFbmQuZW1pdChkcmFnRW5kRXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5uelRyZWVOb2RlKSB7XG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5kcm9wQW5kQXBwbHkodGhpcy5uelRyZWVOb2RlLCB0aGlzLmRyYWdQb3MpO1xuICAgICAgICB0aGlzLm56T25Ecm9wLmVtaXQoZHJvcEV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZURyYWdFbmQoZTogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAvLyBpZiB1c2VyIGRvIG5vdCBjdXN0b20gYmVmb3JlRHJvcFxuICAgICAgaWYgKCF0aGlzLm56QmVmb3JlRHJvcCkge1xuICAgICAgICBjb25zdCBldmVudE5leHQgPSB0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2RyYWdlbmQnLCB0aGlzLm56VHJlZU5vZGUsIGUpO1xuICAgICAgICB0aGlzLm56T25EcmFnRW5kLmVtaXQoZXZlbnROZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5pbmcgdG8gZHJhZ2dpbmcgZXZlbnRzLlxuICAgKi9cbiAgaGFuZERyYWdFdmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5uekRyYWdnYWJsZSkge1xuICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBmcm9tRXZlbnQ8RHJhZ0V2ZW50PihuYXRpdmVFbGVtZW50LCAnZHJhZ3N0YXJ0JylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdTdGFydChlKSk7XG4gICAgICAgIGZyb21FdmVudDxEcmFnRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdkcmFnZW50ZXInKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChlOiBEcmFnRXZlbnQpID0+IHRoaXMuaGFuZGxlRHJhZ0VudGVyKGUpKTtcbiAgICAgICAgZnJvbUV2ZW50PERyYWdFdmVudD4obmF0aXZlRWxlbWVudCwgJ2RyYWdvdmVyJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdPdmVyKGUpKTtcbiAgICAgICAgZnJvbUV2ZW50PERyYWdFdmVudD4obmF0aXZlRWxlbWVudCwgJ2RyYWdsZWF2ZScpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGU6IERyYWdFdmVudCkgPT4gdGhpcy5oYW5kbGVEcmFnTGVhdmUoZSkpO1xuICAgICAgICBmcm9tRXZlbnQ8RHJhZ0V2ZW50PihuYXRpdmVFbGVtZW50LCAnZHJvcCcpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGU6IERyYWdFdmVudCkgPT4gdGhpcy5oYW5kbGVEcmFnRHJvcChlKSk7XG4gICAgICAgIGZyb21FdmVudDxEcmFnRXZlbnQ+KG5hdGl2ZUVsZW1lbnQsICdkcmFnZW5kJylcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdFbmQoZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuelRyZWVTZXJ2aWNlOiBOelRyZWVCYXNlU2VydmljZSxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uelRyZWVOb2RlLmNvbXBvbmVudCA9IHRoaXM7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XG4gICAgY29uc3QgeyBuekRyYWdnYWJsZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpEcmFnZ2FibGUpIHtcbiAgICAgIHRoaXMuaGFuZERyYWdFdmVudCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19