/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Renderer2 } from '@angular/core';
export class NzCarouselContentDirective {
    constructor(elementRef, renderer) {
        this.renderer = renderer;
        this._active = false;
        this.el = elementRef.nativeElement;
        this.renderer.addClass(elementRef.nativeElement, 'slick-slide');
    }
    set isActive(value) {
        this._active = value;
        if (this.isActive) {
            this.renderer.addClass(this.el, 'slick-active');
        }
        else {
            this.renderer.removeClass(this.el, 'slick-active');
        }
    }
    get isActive() {
        return this._active;
    }
}
NzCarouselContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-carousel-content]',
                exportAs: 'nzCarouselContent'
            },] }
];
NzCarouselContentDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtY29udGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwtY29udGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTWpFLE1BQU0sT0FBTywwQkFBMEI7SUFrQnJDLFlBQVksVUFBc0IsRUFBVSxRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBRnZELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHdEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQWxCRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7OztZQUxtQixVQUFVO1lBQUUsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1jYXJvdXNlbC1jb250ZW50XScsXG4gIGV4cG9ydEFzOiAnbnpDYXJvdXNlbENvbnRlbnQnXG59KVxuZXhwb3J0IGNsYXNzIE56Q2Fyb3VzZWxDb250ZW50RGlyZWN0aXZlIHtcbiAgcmVhZG9ubHkgZWw6IEhUTUxFbGVtZW50O1xuXG4gIHNldCBpc0FjdGl2ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwsICdzbGljay1hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsLCAnc2xpY2stYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2xpY2stc2xpZGUnKTtcbiAgfVxufVxuIl19