/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, ElementRef, Input } from '@angular/core';
export class NzTabAddButtonComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.addIcon = 'plus';
        this.element = this.elementRef.nativeElement;
    }
    getElementWidth() {
        var _a;
        return ((_a = this.element) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
    }
    getElementHeight() {
        var _a;
        return ((_a = this.element) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
    }
}
NzTabAddButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tab-add-button, button[nz-tab-add-button]',
                template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `,
                host: {
                    class: 'ant-tabs-nav-add',
                    'aria-label': 'Add tab',
                    type: 'button'
                }
            },] }
];
NzTabAddButtonComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzTabAddButtonComponent.propDecorators = {
    addIcon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWFkZC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWFkZC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQWlCMUUsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxZQUFvQixVQUFtQztRQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUo5QyxZQUFPLEdBQW9DLE1BQU0sQ0FBQztRQUt6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFRCxlQUFlOztRQUNiLE9BQU8sT0FBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxXQUFXLEtBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxnQkFBZ0I7O1FBQ2QsT0FBTyxPQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksS0FBSSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOENBQThDO2dCQUN4RCxRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtvQkFDekIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7OztZQWhCbUIsVUFBVTs7O3NCQWtCM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYi1hZGQtYnV0dG9uLCBidXR0b25bbnotdGFiLWFkZC1idXR0b25dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiYWRkSWNvbjsgbGV0IGljb25cIj5cbiAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCIgbnpUaGVtZT1cIm91dGxpbmVcIj48L2k+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10YWJzLW5hdi1hZGQnLFxuICAgICdhcmlhLWxhYmVsJzogJ0FkZCB0YWInLFxuICAgIHR5cGU6ICdidXR0b24nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJBZGRCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBhZGRJY29uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+ID0gJ3BsdXMnO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0RWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudD8ub2Zmc2V0V2lkdGggfHwgMDtcbiAgfVxuXG4gIGdldEVsZW1lbnRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Py5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgfVxufVxuIl19