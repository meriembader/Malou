/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzSelectItemComponent {
    constructor() {
        this.disabled = false;
        this.label = null;
        this.deletable = false;
        this.removeIcon = null;
        this.contentTemplateOutletContext = null;
        this.contentTemplateOutlet = null;
        this.delete = new EventEmitter();
    }
    onDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!this.disabled) {
            this.delete.next(e);
        }
    }
}
NzSelectItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-item',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: { $implicit: contentTemplateOutletContext }">
      <div class="ant-select-selection-item-content" *ngIf="deletable; else labelTemplate">{{ label }}</div>
      <ng-template #labelTemplate>{{ label }}</ng-template>
    </ng-container>
    <span *ngIf="deletable && !disabled" class="ant-select-selection-item-remove" (click)="onDelete($event)">
      <i nz-icon nzType="close" *ngIf="!removeIcon; else removeIcon"></i>
    </span>
  `,
                host: {
                    '[attr.title]': 'label',
                    '[class.ant-select-selection-item]': 'true',
                    '[class.ant-select-selection-item-disabled]': 'disabled'
                }
            },] }
];
NzSelectItemComponent.propDecorators = {
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    deletable: [{ type: Input }],
    removeIcon: [{ type: Input }],
    contentTemplateOutletContext: [{ type: Input }],
    contentTemplateOutlet: [{ type: Input }],
    delete: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zZWxlY3QvIiwic291cmNlcyI6WyJzZWxlY3QtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCaEksTUFBTSxPQUFPLHFCQUFxQjtJQW5CbEM7UUFvQlcsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQThCLElBQUksQ0FBQztRQUN4QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBa0MsSUFBSSxDQUFDO1FBQ2pELGlDQUE0QixHQUFxQixJQUFJLENBQUM7UUFDdEQsMEJBQXFCLEdBQTJDLElBQUksQ0FBQztRQUMzRCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQVE3RCxDQUFDO0lBUEMsUUFBUSxDQUFDLENBQWE7UUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtJQUNILENBQUM7OztZQWpDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLGNBQWMsRUFBRSxPQUFPO29CQUN2QixtQ0FBbUMsRUFBRSxNQUFNO29CQUMzQyw0Q0FBNEMsRUFBRSxVQUFVO2lCQUN6RDthQUNGOzs7dUJBRUUsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQ0FDTCxLQUFLO29DQUNMLEtBQUs7cUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1zZWxlY3QtaXRlbScsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVPdXRsZXQ7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBjb250ZW50VGVtcGxhdGVPdXRsZXRDb250ZXh0IH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGlvbi1pdGVtLWNvbnRlbnRcIiAqbmdJZj1cImRlbGV0YWJsZTsgZWxzZSBsYWJlbFRlbXBsYXRlXCI+e3sgbGFiZWwgfX08L2Rpdj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbGFiZWxUZW1wbGF0ZT57eyBsYWJlbCB9fTwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPHNwYW4gKm5nSWY9XCJkZWxldGFibGUgJiYgIWRpc2FibGVkXCIgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGlvbi1pdGVtLXJlbW92ZVwiIChjbGljayk9XCJvbkRlbGV0ZSgkZXZlbnQpXCI+XG4gICAgICA8aSBuei1pY29uIG56VHlwZT1cImNsb3NlXCIgKm5nSWY9XCIhcmVtb3ZlSWNvbjsgZWxzZSByZW1vdmVJY29uXCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50aXRsZV0nOiAnbGFiZWwnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1zZWxlY3Rpb24taXRlbV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXNlbGVjdGlvbi1pdGVtLWRpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNlbGVjdEl0ZW1Db21wb25lbnQge1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XG4gIEBJbnB1dCgpIGRlbGV0YWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSByZW1vdmVJY29uOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbnRlbnRUZW1wbGF0ZU91dGxldENvbnRleHQ6IE56U2FmZUFueSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGVPdXRsZXQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgb25EZWxldGUoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5kZWxldGUubmV4dChlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==