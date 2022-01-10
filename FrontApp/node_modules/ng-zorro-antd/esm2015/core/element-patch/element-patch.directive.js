/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef } from '@angular/core';
/**
 * A patch directive to select the element of a component.
 */
export class NzElementPatchDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    get nativeElement() {
        return this.elementRef.nativeElement;
    }
}
NzElementPatchDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzElement], [nz-element]',
                exportAs: 'nzElement'
            },] }
];
NzElementPatchDirective.ctorParameters = () => [
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1wYXRjaC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvZWxlbWVudC1wYXRjaC8iLCJzb3VyY2VzIjpbImVsZW1lbnQtcGF0Y2guZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3REOztHQUVHO0FBS0gsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxZQUFtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUo3QyxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7OztZQVBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxRQUFRLEVBQUUsV0FBVzthQUN0Qjs7O1lBVG1CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbi8qKlxuICogQSBwYXRjaCBkaXJlY3RpdmUgdG8gc2VsZWN0IHRoZSBlbGVtZW50IG9mIGEgY29tcG9uZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpFbGVtZW50XSwgW256LWVsZW1lbnRdJyxcbiAgZXhwb3J0QXM6ICduekVsZW1lbnQnXG59KVxuZXhwb3J0IGNsYXNzIE56RWxlbWVudFBhdGNoRGlyZWN0aXZlIHtcbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogTnpTYWZlQW55IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cbiJdfQ==