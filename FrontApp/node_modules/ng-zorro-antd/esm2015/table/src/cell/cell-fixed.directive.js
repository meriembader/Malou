/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
export class NzCellFixedDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzRight = false;
        this.nzLeft = false;
        this.colspan = null;
        this.colSpan = null;
        this.changes$ = new Subject();
        this.isAutoLeft = false;
        this.isAutoRight = false;
        this.isFixedLeft = false;
        this.isFixedRight = false;
        this.isFixed = false;
    }
    setAutoLeftWidth(autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    }
    setAutoRightWidth(autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    }
    setIsFirstRight(isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    }
    setIsLastLeft(isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    }
    setFixClass(flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    }
    ngOnChanges() {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        const validatePx = (value) => {
            if (typeof value === 'string' && value !== '') {
                return value;
            }
            else {
                return null;
            }
        };
        this.setAutoLeftWidth(validatePx(this.nzLeft));
        this.setAutoRightWidth(validatePx(this.nzRight));
        this.changes$.next();
    }
}
NzCellFixedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                host: {
                    '[class.ant-table-cell-fix-right]': `isFixedRight`,
                    '[class.ant-table-cell-fix-left]': `isFixedLeft`,
                    '[style.position]': `isFixed? 'sticky' : null`
                }
            },] }
];
NzCellFixedDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzCellFixedDirective.propDecorators = {
    nzRight: [{ type: Input }],
    nzLeft: [{ type: Input }],
    colspan: [{ type: Input }],
    colSpan: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1maXhlZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL2NlbGwvY2VsbC1maXhlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVS9CLE1BQU0sT0FBTyxvQkFBb0I7SUFxQy9CLFlBQW9CLFFBQW1CLEVBQVUsVUFBc0I7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFwQzlELFlBQU8sR0FBcUIsS0FBSyxDQUFDO1FBQ2xDLFdBQU0sR0FBcUIsS0FBSyxDQUFDO1FBQ2pDLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQzlCLFlBQU8sR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsWUFBTyxHQUFHLEtBQUssQ0FBQztJQTJCMEQsQ0FBQztJQXpCM0UsZ0JBQWdCLENBQUMsUUFBdUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxTQUF3QjtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELGVBQWUsQ0FBQyxZQUFxQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBbUI7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsOEJBQThCLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sV0FBVyxDQUFDLElBQWEsRUFBRSxTQUFpQjtRQUNsRCxvRUFBb0U7UUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFcEUsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFJRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQztRQUNoRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUF1QixFQUFpQixFQUFFO1lBQzVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7Z0JBQzdDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtDQUErQztnQkFDekQsSUFBSSxFQUFFO29CQUNKLGtDQUFrQyxFQUFFLGNBQWM7b0JBQ2xELGlDQUFpQyxFQUFFLGFBQWE7b0JBQ2hELGtCQUFrQixFQUFFLDBCQUEwQjtpQkFDL0M7YUFDRjs7O1lBVmlELFNBQVM7WUFBdkMsVUFBVTs7O3NCQVkzQixLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGRbbnpSaWdodF0sdGhbbnpSaWdodF0sdGRbbnpMZWZ0XSx0aFtuekxlZnRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGwtZml4LXJpZ2h0XSc6IGBpc0ZpeGVkUmlnaHRgLFxuICAgICdbY2xhc3MuYW50LXRhYmxlLWNlbGwtZml4LWxlZnRdJzogYGlzRml4ZWRMZWZ0YCxcbiAgICAnW3N0eWxlLnBvc2l0aW9uXSc6IGBpc0ZpeGVkPyAnc3RpY2t5JyA6IG51bGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDZWxsRml4ZWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuelJpZ2h0OiBzdHJpbmcgfCBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TGVmdDogc3RyaW5nIHwgYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjb2xzcGFuOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgY29sU3BhbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGNoYW5nZXMkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNBdXRvTGVmdCA9IGZhbHNlO1xuICBpc0F1dG9SaWdodCA9IGZhbHNlO1xuICBpc0ZpeGVkTGVmdCA9IGZhbHNlO1xuICBpc0ZpeGVkUmlnaHQgPSBmYWxzZTtcbiAgaXNGaXhlZCA9IGZhbHNlO1xuXG4gIHNldEF1dG9MZWZ0V2lkdGgoYXV0b0xlZnQ6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGF1dG9MZWZ0KTtcbiAgfVxuXG4gIHNldEF1dG9SaWdodFdpZHRoKGF1dG9SaWdodDogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyaWdodCcsIGF1dG9SaWdodCk7XG4gIH1cblxuICBzZXRJc0ZpcnN0UmlnaHQoaXNGaXJzdFJpZ2h0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5zZXRGaXhDbGFzcyhpc0ZpcnN0UmlnaHQsICdhbnQtdGFibGUtY2VsbC1maXgtcmlnaHQtZmlyc3QnKTtcbiAgfVxuXG4gIHNldElzTGFzdExlZnQoaXNMYXN0TGVmdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuc2V0Rml4Q2xhc3MoaXNMYXN0TGVmdCwgJ2FudC10YWJsZS1jZWxsLWZpeC1sZWZ0LWxhc3QnKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rml4Q2xhc3MoZmxhZzogYm9vbGVhbiwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyB0aGUgc2V0Rml4Q2xhc3MgZnVuY3Rpb24gbWF5IGNhbGwgbWFueSB0aW1lcywgc28gcmVtb3ZlIGl0IGZpcnN0LlxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG5cbiAgICBpZiAoZmxhZykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNldElzRmlyc3RSaWdodChmYWxzZSk7XG4gICAgdGhpcy5zZXRJc0xhc3RMZWZ0KGZhbHNlKTtcbiAgICB0aGlzLmlzQXV0b0xlZnQgPSB0aGlzLm56TGVmdCA9PT0gJycgfHwgdGhpcy5uekxlZnQgPT09IHRydWU7XG4gICAgdGhpcy5pc0F1dG9SaWdodCA9IHRoaXMubnpSaWdodCA9PT0gJycgfHwgdGhpcy5uelJpZ2h0ID09PSB0cnVlO1xuICAgIHRoaXMuaXNGaXhlZExlZnQgPSB0aGlzLm56TGVmdCAhPT0gZmFsc2U7XG4gICAgdGhpcy5pc0ZpeGVkUmlnaHQgPSB0aGlzLm56UmlnaHQgIT09IGZhbHNlO1xuICAgIHRoaXMuaXNGaXhlZCA9IHRoaXMuaXNGaXhlZExlZnQgfHwgdGhpcy5pc0ZpeGVkUmlnaHQ7XG4gICAgY29uc3QgdmFsaWRhdGVQeCA9ICh2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbik6IHN0cmluZyB8IG51bGwgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZXRBdXRvTGVmdFdpZHRoKHZhbGlkYXRlUHgodGhpcy5uekxlZnQpKTtcbiAgICB0aGlzLnNldEF1dG9SaWdodFdpZHRoKHZhbGlkYXRlUHgodGhpcy5uelJpZ2h0KSk7XG4gICAgdGhpcy5jaGFuZ2VzJC5uZXh0KCk7XG4gIH1cbn1cbiJdfQ==