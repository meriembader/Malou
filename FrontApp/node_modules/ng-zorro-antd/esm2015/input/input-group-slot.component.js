/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzInputGroupSlotComponent {
    constructor() {
        this.icon = null;
        this.type = null;
        this.template = null;
    }
}
NzInputGroupSlotComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-input-group-slot]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i nz-icon [nzType]="icon" *ngIf="icon"></i>
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
  `,
                host: {
                    '[class.ant-input-group-addon]': `type === 'addon'`,
                    '[class.ant-input-prefix]': `type === 'prefix'`,
                    '[class.ant-input-suffix]': `type === 'suffix'`
                }
            },] }
];
NzInputGroupSlotComponent.propDecorators = {
    icon: [{ type: Input }],
    type: [{ type: Input }],
    template: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAtc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2lucHV0LyIsInNvdXJjZXMiOlsiaW5wdXQtZ3JvdXAtc2xvdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFpQjFHLE1BQU0sT0FBTyx5QkFBeUI7SUFmdEM7UUFnQlcsU0FBSSxHQUFtQixJQUFJLENBQUM7UUFDNUIsU0FBSSxHQUF5QyxJQUFJLENBQUM7UUFDbEQsYUFBUSxHQUF1QyxJQUFJLENBQUM7SUFDL0QsQ0FBQzs7O1lBbkJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7O0dBR1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLCtCQUErQixFQUFFLGtCQUFrQjtvQkFDbkQsMEJBQTBCLEVBQUUsbUJBQW1CO29CQUMvQywwQkFBMEIsRUFBRSxtQkFBbUI7aUJBQ2hEO2FBQ0Y7OzttQkFFRSxLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW256LWlucHV0LWdyb3VwLXNsb3RdJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCIgKm5nSWY9XCJpY29uXCI+PC9pPlxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVwiPnt7IHRlbXBsYXRlIH19PC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC1hZGRvbl0nOiBgdHlwZSA9PT0gJ2FkZG9uJ2AsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtcHJlZml4XSc6IGB0eXBlID09PSAncHJlZml4J2AsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtc3VmZml4XSc6IGB0eXBlID09PSAnc3VmZml4J2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOeklucHV0R3JvdXBTbG90Q29tcG9uZW50IHtcbiAgQElucHV0KCkgaWNvbj86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB0eXBlOiAnYWRkb24nIHwgJ3ByZWZpeCcgfCAnc3VmZml4JyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB0ZW1wbGF0ZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG59XG4iXX0=