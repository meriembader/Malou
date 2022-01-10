/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, TemplateRef } from '@angular/core';
export class NzTableVirtualScrollDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzTableVirtualScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-virtual-scroll]',
                exportAs: 'nzVirtualScroll'
            },] }
];
NzTableVirtualScrollDirective.ctorParameters = () => [
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlydHVhbC1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90YWJsZS12aXJ0dWFsLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLDZCQUE2QjtJQUN4QyxZQUFtQixXQUFpRTtRQUFqRSxnQkFBVyxHQUFYLFdBQVcsQ0FBc0Q7SUFBRyxDQUFDOzs7WUFMekYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7OztZQU5tQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXZpcnR1YWwtc2Nyb2xsXScsXG4gIGV4cG9ydEFzOiAnbnpWaXJ0dWFsU2Nyb2xsJ1xufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56U2FmZUFueTsgaW5kZXg6IG51bWJlciB9Pikge31cbn1cbiJdfQ==