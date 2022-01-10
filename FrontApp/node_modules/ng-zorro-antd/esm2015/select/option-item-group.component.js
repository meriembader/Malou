/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzOptionItemGroupComponent {
    constructor() {
        this.nzLabel = null;
    }
}
NzOptionItemGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-option-item-group',
                template: ` <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-select-item]': 'true',
                    '[class.ant-select-item-group]': 'true'
                }
            },] }
];
NzOptionItemGroupComponent.propDecorators = {
    nzLabel: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWl0ZW0tZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zZWxlY3QvIiwic291cmNlcyI6WyJvcHRpb24taXRlbS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFhMUcsTUFBTSxPQUFPLDBCQUEwQjtJQVZ2QztRQVdXLFlBQU8sR0FBMkMsSUFBSSxDQUFDO0lBQ2xFLENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsZ0ZBQWdGO2dCQUMxRixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSix5QkFBeUIsRUFBRSxNQUFNO29CQUNqQywrQkFBK0IsRUFBRSxNQUFNO2lCQUN4QzthQUNGOzs7c0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW9wdGlvbi1pdGVtLWdyb3VwJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56TGFiZWxcIj57eyBuekxhYmVsIH19PC9uZy1jb250YWluZXI+IGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWl0ZW1dJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1pdGVtLWdyb3VwXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56T3B0aW9uSXRlbUdyb3VwQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpMYWJlbDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xufVxuIl19