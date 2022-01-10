/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
export class NzTreeNodeSwitcherComponent {
    constructor() {
        this.nzSelectMode = false;
    }
    get isShowLineIcon() {
        return !this.isLeaf && !!this.nzShowLine;
    }
    get isShowSwitchIcon() {
        return !this.isLeaf && !this.nzShowLine;
    }
    get isSwitcherOpen() {
        return !!this.isExpanded && !this.isLeaf;
    }
    get isSwitcherClose() {
        return !this.isExpanded && !this.isLeaf;
    }
}
NzTreeNodeSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node-switcher',
                template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <i
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></i>
          <i *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></i>
    </ng-template>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[class.ant-select-tree-switcher]': 'nzSelectMode',
                    '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
                    '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
                    '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
                    '[class.ant-tree-switcher]': '!nzSelectMode',
                    '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
                    '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
                    '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
                }
            },] }
];
NzTreeNodeSwitcherComponent.propDecorators = {
    nzShowExpand: [{ type: Input }],
    nzShowLine: [{ type: Input }],
    nzExpandedIcon: [{ type: Input }],
    nzSelectMode: [{ type: Input }],
    context: [{ type: Input }],
    isLeaf: [{ type: Input }],
    isLoading: [{ type: Input }],
    isExpanded: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLXN3aXRjaGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUtbm9kZS1zd2l0Y2hlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxVQUFVLEVBQXFCLE1BQU0seUJBQXlCLENBQUM7QUErQ3hFLE1BQU0sT0FBTywyQkFBMkI7SUE3Q3hDO1FBaURXLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBcUJoQyxDQUFDO0lBZkMsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDOzs7WUFyRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLElBQUksRUFBRTtvQkFDSixrQ0FBa0MsRUFBRSxjQUFjO29CQUNsRCx1Q0FBdUMsRUFBRSx3QkFBd0I7b0JBQ2pFLHVDQUF1QyxFQUFFLGdDQUFnQztvQkFDekUsd0NBQXdDLEVBQUUsaUNBQWlDO29CQUMzRSwyQkFBMkIsRUFBRSxlQUFlO29CQUM1QyxnQ0FBZ0MsRUFBRSx5QkFBeUI7b0JBQzNELGdDQUFnQyxFQUFFLGlDQUFpQztvQkFDbkUsaUNBQWlDLEVBQUUsa0NBQWtDO2lCQUN0RTthQUNGOzs7MkJBRUUsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRyZWVOb2RlLCBOelRyZWVOb2RlT3B0aW9ucyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90cmVlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1ub2RlLXN3aXRjaGVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNTaG93U3dpdGNoSWNvblwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0xvYWRpbmc7IGVsc2UgbG9hZGluZ1RlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekV4cGFuZGVkSWNvbjsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbnRleHQsIG9yaWdpbjogY29udGV4dC5vcmlnaW4gfVwiPlxuICAgICAgICAgIDxpXG4gICAgICAgICAgICBuei1pY29uXG4gICAgICAgICAgICBuelR5cGU9XCJjYXJldC1kb3duXCJcbiAgICAgICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LXRyZWUtc3dpdGNoZXItaWNvbl09XCJuelNlbGVjdE1vZGVcIlxuICAgICAgICAgICAgW2NsYXNzLmFudC10cmVlLXN3aXRjaGVyLWljb25dPVwiIW56U2VsZWN0TW9kZVwiXG4gICAgICAgICAgPjwvaT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpTaG93TGluZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0xvYWRpbmc7IGVsc2UgbG9hZGluZ1RlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekV4cGFuZGVkSWNvbjsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbnRleHQsIG9yaWdpbjogY29udGV4dC5vcmlnaW4gfVwiPlxuICAgICAgICAgIDxpXG4gICAgICAgICAgICAqbmdJZj1cImlzU2hvd0xpbmVJY29uXCJcbiAgICAgICAgICAgIG56LWljb25cbiAgICAgICAgICAgIFtuelR5cGVdPVwiaXNTd2l0Y2hlck9wZW4gPyAnbWludXMtc3F1YXJlJyA6ICdwbHVzLXNxdWFyZSdcIlxuICAgICAgICAgICAgY2xhc3M9XCJhbnQtdHJlZS1zd2l0Y2hlci1saW5lLWljb25cIlxuICAgICAgICAgID48L2k+XG4gICAgICAgICAgPGkgKm5nSWY9XCIhaXNTaG93TGluZUljb25cIiBuei1pY29uIG56VHlwZT1cImZpbGVcIiBjbGFzcz1cImFudC10cmVlLXN3aXRjaGVyLWxpbmUtaWNvblwiPjwvaT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2xvYWRpbmdUZW1wbGF0ZT5cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwibG9hZGluZ1wiIFtuelNwaW5dPVwidHJ1ZVwiIGNsYXNzPVwiYW50LXRyZWUtc3dpdGNoZXItbG9hZGluZy1pY29uXCI+PC9pPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXN3aXRjaGVyXSc6ICduelNlbGVjdE1vZGUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXN3aXRjaGVyLW5vb3BdJzogJ256U2VsZWN0TW9kZSAmJiBpc0xlYWYnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC10cmVlLXN3aXRjaGVyX29wZW5dJzogJ256U2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyT3BlbicsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtc3dpdGNoZXJfY2xvc2VdJzogJ256U2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyQ2xvc2UnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtc3dpdGNoZXJdJzogJyFuelNlbGVjdE1vZGUnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtc3dpdGNoZXItbm9vcF0nOiAnIW56U2VsZWN0TW9kZSAmJiBpc0xlYWYnLFxuICAgICdbY2xhc3MuYW50LXRyZWUtc3dpdGNoZXJfb3Blbl0nOiAnIW56U2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyT3BlbicsXG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1zd2l0Y2hlcl9jbG9zZV0nOiAnIW56U2VsZWN0TW9kZSAmJiBpc1N3aXRjaGVyQ2xvc2UnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlTm9kZVN3aXRjaGVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpTaG93RXhwYW5kPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbnpTaG93TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG56RXhwYW5kZWRJY29uPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56VHJlZU5vZGU7IG9yaWdpbjogTnpUcmVlTm9kZU9wdGlvbnMgfT47XG4gIEBJbnB1dCgpIG56U2VsZWN0TW9kZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjb250ZXh0ITogTnpUcmVlTm9kZTtcbiAgQElucHV0KCkgaXNMZWFmPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNMb2FkaW5nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNFeHBhbmRlZD86IGJvb2xlYW47XG5cbiAgZ2V0IGlzU2hvd0xpbmVJY29uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc0xlYWYgJiYgISF0aGlzLm56U2hvd0xpbmU7XG4gIH1cblxuICBnZXQgaXNTaG93U3dpdGNoSWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMZWFmICYmICF0aGlzLm56U2hvd0xpbmU7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlck9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5pc0V4cGFuZGVkICYmICF0aGlzLmlzTGVhZjtcbiAgfVxuXG4gIGdldCBpc1N3aXRjaGVyQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzRXhwYW5kZWQgJiYgIXRoaXMuaXNMZWFmO1xuICB9XG59XG4iXX0=