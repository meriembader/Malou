/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
export class NzThMeasureDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changes$ = new Subject();
        this.nzWidth = null;
        this.colspan = null;
        this.colSpan = null;
        this.rowspan = null;
        this.rowSpan = null;
    }
    ngOnChanges(changes) {
        const { nzWidth, colspan, rowspan, colSpan, rowSpan } = changes;
        if (colspan || colSpan) {
            const col = this.colspan || this.colSpan;
            if (!isNil(col)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', `${col}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
            }
        }
        if (rowspan || rowSpan) {
            const row = this.rowspan || this.rowSpan;
            if (!isNil(row)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', `${row}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
            }
        }
        if (nzWidth || colspan) {
            this.changes$.next();
        }
    }
}
NzThMeasureDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th'
            },] }
];
NzThMeasureDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzThMeasureDirective.propDecorators = {
    nzWidth: [{ type: Input }],
    colspan: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowspan: [{ type: Input }],
    rowSpan: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGgtbWVhc3VyZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvdGgtbWVhc3VyZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUFvQixRQUFtQixFQUFVLFVBQXNCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBTnZFLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLFlBQU8sR0FBMkIsSUFBSSxDQUFDO0lBQzBCLENBQUM7SUFDM0UsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2hFLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pFO1NBQ0Y7UUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUNoRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN6RTtTQUNGO1FBQ0QsSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7WUFoQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7OztZQU5pRCxTQUFTO1lBQXZDLFVBQVU7OztzQkFTM0IsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGgnXG59KVxuZXhwb3J0IGNsYXNzIE56VGhNZWFzdXJlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgY2hhbmdlcyQgPSBuZXcgU3ViamVjdCgpO1xuICBASW5wdXQoKSBueldpZHRoOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29sc3Bhbjogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGNvbFNwYW46IHN0cmluZyB8IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByb3dzcGFuOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcm93U3Bhbjogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBueldpZHRoLCBjb2xzcGFuLCByb3dzcGFuLCBjb2xTcGFuLCByb3dTcGFuIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChjb2xzcGFuIHx8IGNvbFNwYW4pIHtcbiAgICAgIGNvbnN0IGNvbCA9IHRoaXMuY29sc3BhbiB8fCB0aGlzLmNvbFNwYW47XG4gICAgICBpZiAoIWlzTmlsKGNvbCkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjb2xzcGFuJywgYCR7Y29sfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjb2xzcGFuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyb3dzcGFuIHx8IHJvd1NwYW4pIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMucm93c3BhbiB8fCB0aGlzLnJvd1NwYW47XG4gICAgICBpZiAoIWlzTmlsKHJvdykpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyb3dzcGFuJywgYCR7cm93fWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyb3dzcGFuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChueldpZHRoIHx8IGNvbHNwYW4pIHtcbiAgICAgIHRoaXMuY2hhbmdlcyQubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIl19