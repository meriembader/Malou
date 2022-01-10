/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzTabBodyComponent {
    constructor() {
        this.content = null;
        this.active = false;
        this.tabPaneAnimated = true;
        this.forceRender = false;
    }
}
NzTabBodyComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-tab-body]',
                exportAs: 'nzTabBody',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="active || forceRender">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </ng-container>
  `,
                host: {
                    class: 'ant-tabs-tabpane',
                    '[class.ant-tabs-tabpane-active]': 'active',
                    '[attr.tabindex]': 'active ? 0 : -1',
                    '[attr.aria-hidden]': '!active',
                    '[style.visibility]': 'tabPaneAnimated ? active ? null : "hidden" : null',
                    '[style.height]': 'tabPaneAnimated ? active ? null : 0 : null',
                    '[style.overflow-y]': 'tabPaneAnimated ? active ? null : "none" : null',
                    '[style.display]': '!tabPaneAnimated ? active ? null : "none" : null'
                }
            },] }
];
NzTabBodyComponent.propDecorators = {
    content: [{ type: Input }],
    active: [{ type: Input }],
    tabPaneAnimated: [{ type: Input }],
    forceRender: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWJvZHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWJvZHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0IxRyxNQUFNLE9BQU8sa0JBQWtCO0lBdEIvQjtRQXVCVyxZQUFPLEdBQTZCLElBQUksQ0FBQztRQUN6QyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2Ysb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQzs7O1lBM0JBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLGlDQUFpQyxFQUFFLFFBQVE7b0JBQzNDLGlCQUFpQixFQUFFLGlCQUFpQjtvQkFDcEMsb0JBQW9CLEVBQUUsU0FBUztvQkFDL0Isb0JBQW9CLEVBQUUsbURBQW1EO29CQUN6RSxnQkFBZ0IsRUFBRSw0Q0FBNEM7b0JBQzlELG9CQUFvQixFQUFFLGlEQUFpRDtvQkFDdkUsaUJBQWlCLEVBQUUsa0RBQWtEO2lCQUN0RTthQUNGOzs7c0JBRUUsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW256LXRhYi1ib2R5XScsXG4gIGV4cG9ydEFzOiAnbnpUYWJCb2R5JyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3RpdmUgfHwgZm9yY2VSZW5kZXJcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRhYnMtdGFicGFuZScsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy10YWJwYW5lLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2FjdGl2ZSA/IDAgOiAtMScsXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchYWN0aXZlJyxcbiAgICAnW3N0eWxlLnZpc2liaWxpdHldJzogJ3RhYlBhbmVBbmltYXRlZCA/IGFjdGl2ZSA/IG51bGwgOiBcImhpZGRlblwiIDogbnVsbCcsXG4gICAgJ1tzdHlsZS5oZWlnaHRdJzogJ3RhYlBhbmVBbmltYXRlZCA/IGFjdGl2ZSA/IG51bGwgOiAwIDogbnVsbCcsXG4gICAgJ1tzdHlsZS5vdmVyZmxvdy15XSc6ICd0YWJQYW5lQW5pbWF0ZWQgPyBhY3RpdmUgPyBudWxsIDogXCJub25lXCIgOiBudWxsJyxcbiAgICAnW3N0eWxlLmRpc3BsYXldJzogJyF0YWJQYW5lQW5pbWF0ZWQgPyBhY3RpdmUgPyBudWxsIDogXCJub25lXCIgOiBudWxsJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFiQm9keUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSB0YWJQYW5lQW5pbWF0ZWQgPSB0cnVlO1xuICBASW5wdXQoKSBmb3JjZVJlbmRlciA9IGZhbHNlO1xufVxuIl19