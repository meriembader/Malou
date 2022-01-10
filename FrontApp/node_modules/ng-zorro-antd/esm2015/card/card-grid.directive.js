/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directive, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzCardGridDirective {
    constructor() {
        this.nzHoverable = true;
    }
}
NzCardGridDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-card-grid]',
                exportAs: 'nzCardGrid',
                host: {
                    '[class.ant-card-grid]': 'true',
                    '[class.ant-card-hoverable]': 'nzHoverable'
                }
            },] }
];
NzCardGridDirective.propDecorators = {
    nzHoverable: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCardGridDirective.prototype, "nzHoverable", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1ncmlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQtZ3JpZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQVV2RCxNQUFNLE9BQU8sbUJBQW1CO0lBUmhDO1FBVTJCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzlDLENBQUM7OztZQVhBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsSUFBSSxFQUFFO29CQUNKLHVCQUF1QixFQUFFLE1BQU07b0JBQy9CLDRCQUE0QixFQUFFLGFBQWE7aUJBQzVDO2FBQ0Y7OzswQkFHRSxLQUFLOztBQUFtQjtJQUFmLFlBQVksRUFBRTs7d0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LWNhcmQtZ3JpZF0nLFxuICBleHBvcnRBczogJ256Q2FyZEdyaWQnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1ncmlkXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLWhvdmVyYWJsZV0nOiAnbnpIb3ZlcmFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXJkR3JpZERpcmVjdGl2ZSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhvdmVyYWJsZTogQm9vbGVhbklucHV0O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpIb3ZlcmFibGUgPSB0cnVlO1xufVxuIl19