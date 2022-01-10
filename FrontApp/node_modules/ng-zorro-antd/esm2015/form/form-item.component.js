/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
export class NzFormItemComponent {
    constructor(elementRef, renderer, cdr) {
        this.cdr = cdr;
        this.status = null;
        this.hasFeedback = false;
        this.withHelpClass = false;
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item');
    }
    setWithHelpViaTips(value) {
        this.withHelpClass = value;
        this.cdr.markForCheck();
    }
    setStatus(status) {
        this.status = status;
        this.cdr.markForCheck();
    }
    setHasFeedback(hasFeedback) {
        this.hasFeedback = hasFeedback;
        this.cdr.markForCheck();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-item',
                exportAs: 'nzFormItem',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-form-item-has-success]': 'status === "success"',
                    '[class.ant-form-item-has-warning]': 'status === "warning"',
                    '[class.ant-form-item-has-error]': 'status === "error"',
                    '[class.ant-form-item-is-validating]': 'status === "validating"',
                    '[class.ant-form-item-has-feedback]': 'hasFeedback && status',
                    '[class.ant-form-item-with-help]': 'withHelpClass'
                },
                template: `
    <ng-content></ng-content>
  `
            },] }
];
NzFormItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZm9ybS8iLCJzb3VyY2VzIjpbImZvcm0taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNJLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsaUdBQWlHO0FBbUJqRyxNQUFNLE9BQU8sbUJBQW1CO0lBc0I5QixZQUFZLFVBQXNCLEVBQUUsUUFBbUIsRUFBVSxHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJCdkYsV0FBTSxHQUE0QixJQUFJLENBQUM7UUFDdkMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFZCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQWtCL0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFqQkQsa0JBQWtCLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBK0I7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYyxDQUFDLFdBQW9CO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQU1ELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsSUFBSSxFQUFFO29CQUNKLG1DQUFtQyxFQUFFLHNCQUFzQjtvQkFDM0QsbUNBQW1DLEVBQUUsc0JBQXNCO29CQUMzRCxpQ0FBaUMsRUFBRSxvQkFBb0I7b0JBQ3ZELHFDQUFxQyxFQUFFLHlCQUF5QjtvQkFDaEUsb0NBQW9DLEVBQUUsdUJBQXVCO29CQUM3RCxpQ0FBaUMsRUFBRSxlQUFlO2lCQUNuRDtnQkFDRCxRQUFRLEVBQUU7O0dBRVQ7YUFDRjs7O1lBeEIrRCxVQUFVO1lBQWEsU0FBUztZQUE5RCxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IHR5cGUgTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUgPSAnc3VjY2VzcycgfCAnZXJyb3InIHwgJ3dhcm5pbmcnIHwgJ3ZhbGlkYXRpbmcnIHwgbnVsbDtcblxuLyoqIHNob3VsZCBhZGQgbnotcm93IGRpcmVjdGl2ZSB0byBob3N0LCB0cmFjayBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84Nzg1ICoqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZm9ybS1pdGVtJyxcbiAgZXhwb3J0QXM6ICduekZvcm1JdGVtJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtZm9ybS1pdGVtLWhhcy1zdWNjZXNzXSc6ICdzdGF0dXMgPT09IFwic3VjY2Vzc1wiJyxcbiAgICAnW2NsYXNzLmFudC1mb3JtLWl0ZW0taGFzLXdhcm5pbmddJzogJ3N0YXR1cyA9PT0gXCJ3YXJuaW5nXCInLFxuICAgICdbY2xhc3MuYW50LWZvcm0taXRlbS1oYXMtZXJyb3JdJzogJ3N0YXR1cyA9PT0gXCJlcnJvclwiJyxcbiAgICAnW2NsYXNzLmFudC1mb3JtLWl0ZW0taXMtdmFsaWRhdGluZ10nOiAnc3RhdHVzID09PSBcInZhbGlkYXRpbmdcIicsXG4gICAgJ1tjbGFzcy5hbnQtZm9ybS1pdGVtLWhhcy1mZWVkYmFja10nOiAnaGFzRmVlZGJhY2sgJiYgc3RhdHVzJyxcbiAgICAnW2NsYXNzLmFudC1mb3JtLWl0ZW0td2l0aC1oZWxwXSc6ICd3aXRoSGVscENsYXNzJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekZvcm1JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkRlc3Ryb3kge1xuICBzdGF0dXM6IE56Rm9ybUNvbnRyb2xTdGF0dXNUeXBlID0gbnVsbDtcbiAgaGFzRmVlZGJhY2sgPSBmYWxzZTtcbiAgd2l0aEhlbHBDbGFzcyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHNldFdpdGhIZWxwVmlhVGlwcyh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMud2l0aEhlbHBDbGFzcyA9IHZhbHVlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0U3RhdHVzKHN0YXR1czogTnpGb3JtQ29udHJvbFN0YXR1c1R5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldEhhc0ZlZWRiYWNrKGhhc0ZlZWRiYWNrOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5oYXNGZWVkYmFjayA9IGhhc0ZlZWRiYWNrO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWZvcm0taXRlbScpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=