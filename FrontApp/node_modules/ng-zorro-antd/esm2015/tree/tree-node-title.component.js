/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
export class NzTreeNodeTitleComponent {
    constructor() {
        this.treeTemplate = null;
        this.selectMode = false;
    }
    get canDraggable() {
        return this.draggable && !this.isDisabled ? true : null;
    }
    get matchedValue() {
        return this.isMatched ? this.searchValue : '';
    }
    get isSwitcherOpen() {
        return this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
}
NzTreeNodeTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-title',
                template: ` <ng-template [ngTemplateOutlet]="treeTemplate" [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }">
    </ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <i nz-icon *ngIf="icon" [nzType]="icon"></i>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"> </span>
    </ng-container>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[attr.title]': 'title',
                    '[attr.draggable]': 'canDraggable',
                    '[attr.aria-grabbed]': 'canDraggable',
                    '[class.draggable]': 'canDraggable',
                    '[class.ant-select-tree-node-content-wrapper]': `selectMode`,
                    '[class.ant-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
                    '[class.ant-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
                    '[class.ant-select-tree-node-selected]': `selectMode && isSelected`,
                    '[class.ant-tree-node-content-wrapper]': `!selectMode`,
                    '[class.ant-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
                    '[class.ant-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
                    '[class.ant-tree-node-selected]': `!selectMode && isSelected`
                }
            },] }
];
NzTreeNodeTitleComponent.propDecorators = {
    searchValue: [{ type: Input }],
    treeTemplate: [{ type: Input }],
    draggable: [{ type: Input }],
    showIcon: [{ type: Input }],
    selectMode: [{ type: Input }],
    context: [{ type: Input }],
    icon: [{ type: Input }],
    title: [{ type: Input }],
    isLoading: [{ type: Input }],
    isSelected: [{ type: Input }],
    isDisabled: [{ type: Input }],
    isMatched: [{ type: Input }],
    isExpanded: [{ type: Input }],
    isLeaf: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUtbm9kZS10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQTJDeEUsTUFBTSxPQUFPLHdCQUF3QjtJQXpDckM7UUEyQ1csaUJBQVksR0FBNkUsSUFBSSxDQUFDO1FBRzlGLGVBQVUsR0FBRyxLQUFLLENBQUM7SUEwQjlCLENBQUM7SUFmQyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRCxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzFDLENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBcUJRO2dCQUNsQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxPQUFPO29CQUN2QixrQkFBa0IsRUFBRSxjQUFjO29CQUNsQyxxQkFBcUIsRUFBRSxjQUFjO29CQUNyQyxtQkFBbUIsRUFBRSxjQUFjO29CQUNuQyw4Q0FBOEMsRUFBRSxZQUFZO29CQUM1RCxtREFBbUQsRUFBRSw4QkFBOEI7b0JBQ25GLG9EQUFvRCxFQUFFLCtCQUErQjtvQkFDckYsdUNBQXVDLEVBQUUsMEJBQTBCO29CQUNuRSx1Q0FBdUMsRUFBRSxhQUFhO29CQUN0RCw0Q0FBNEMsRUFBRSwrQkFBK0I7b0JBQzdFLDZDQUE2QyxFQUFFLGdDQUFnQztvQkFDL0UsZ0NBQWdDLEVBQUUsMkJBQTJCO2lCQUM5RDthQUNGOzs7MEJBRUUsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3NCQUNMLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRyZWVOb2RlLCBOelRyZWVOb2RlT3B0aW9ucyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRyZWVUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogY29udGV4dCwgb3JpZ2luOiBjb250ZXh0Lm9yaWdpbiB9XCI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXRyZWVUZW1wbGF0ZVwiPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJpY29uICYmIHNob3dJY29uXCJcbiAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25fX29wZW5dPVwiaXNTd2l0Y2hlck9wZW5cIlxuICAgICAgICBbY2xhc3MuYW50LXRyZWUtaWNvbl9fY2xvc2VdPVwiaXNTd2l0Y2hlckNsb3NlXCJcbiAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25fbG9hZGluZ109XCJpc0xvYWRpbmdcIlxuICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWljb25FbGVdPVwic2VsZWN0TW9kZVwiXG4gICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uRWxlXT1cIiFzZWxlY3RNb2RlXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBbY2xhc3MuYW50LXNlbGVjdC10cmVlLWljb25FbGVdPVwic2VsZWN0TW9kZVwiXG4gICAgICAgICAgW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1pY29uX19jdXN0b21pemVdPVwic2VsZWN0TW9kZVwiXG4gICAgICAgICAgW2NsYXNzLmFudC10cmVlLWljb25FbGVdPVwiIXNlbGVjdE1vZGVcIlxuICAgICAgICAgIFtjbGFzcy5hbnQtdHJlZS1pY29uX19jdXN0b21pemVdPVwiIXNlbGVjdE1vZGVcIlxuICAgICAgICA+XG4gICAgICAgICAgPGkgbnotaWNvbiAqbmdJZj1cImljb25cIiBbbnpUeXBlXT1cImljb25cIj48L2k+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyZWUtdGl0bGVcIiBbaW5uZXJIVE1MXT1cInRpdGxlIHwgbnpIaWdobGlnaHQ6IG1hdGNoZWRWYWx1ZTonaSc6J2ZvbnQtaGlnaGxpZ2h0J1wiPiA8L3NwYW4+XG4gICAgPC9uZy1jb250YWluZXI+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLnRpdGxlXSc6ICd0aXRsZScsXG4gICAgJ1thdHRyLmRyYWdnYWJsZV0nOiAnY2FuRHJhZ2dhYmxlJyxcbiAgICAnW2F0dHIuYXJpYS1ncmFiYmVkXSc6ICdjYW5EcmFnZ2FibGUnLFxuICAgICdbY2xhc3MuZHJhZ2dhYmxlXSc6ICdjYW5EcmFnZ2FibGUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLW5vZGUtY29udGVudC13cmFwcGVyXSc6IGBzZWxlY3RNb2RlYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlci1vcGVuXSc6IGBzZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJPcGVuYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlci1jbG9zZV0nOiBgc2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyQ2xvc2VgLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLW5vZGUtc2VsZWN0ZWRdJzogYHNlbGVjdE1vZGUgJiYgaXNTZWxlY3RlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ub2RlLWNvbnRlbnQtd3JhcHBlcl0nOiBgIXNlbGVjdE1vZGVgLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItb3Blbl0nOiBgIXNlbGVjdE1vZGUgJiYgaXNTd2l0Y2hlck9wZW5gLFxuICAgICdbY2xhc3MuYW50LXRyZWUtbm9kZS1jb250ZW50LXdyYXBwZXItY2xvc2VdJzogYCFzZWxlY3RNb2RlICYmIGlzU3dpdGNoZXJDbG9zZWAsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1ub2RlLXNlbGVjdGVkXSc6IGAhc2VsZWN0TW9kZSAmJiBpc1NlbGVjdGVkYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVUaXRsZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNlYXJjaFZhbHVlITogc3RyaW5nO1xuICBASW5wdXQoKSB0cmVlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBOelRyZWVOb2RlOyBvcmlnaW46IE56VHJlZU5vZGVPcHRpb25zIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGRyYWdnYWJsZSE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dJY29uITogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0TW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjb250ZXh0ITogTnpUcmVlTm9kZTtcbiAgQElucHV0KCkgaWNvbiE6IHN0cmluZztcbiAgQElucHV0KCkgdGl0bGUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzTG9hZGluZyE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzU2VsZWN0ZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBpc0Rpc2FibGVkITogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNNYXRjaGVkITogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNFeHBhbmRlZCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzTGVhZiE6IGJvb2xlYW47XG5cbiAgZ2V0IGNhbkRyYWdnYWJsZSgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlICYmICF0aGlzLmlzRGlzYWJsZWQgPyB0cnVlIDogbnVsbDtcbiAgfVxuXG4gIGdldCBtYXRjaGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc01hdGNoZWQgPyB0aGlzLnNlYXJjaFZhbHVlIDogJyc7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlck9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZCAmJiAhdGhpcy5pc0xlYWY7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlckNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzTGVhZjtcbiAgfVxufVxuIl19