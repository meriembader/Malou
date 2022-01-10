/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzCheckboxGroupComponent {
    constructor(elementRef, focusMonitor, cdr) {
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.cdr = cdr;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.options = [];
        this.nzDisabled = false;
    }
    trackByOption(_, option) {
        return option.value;
    }
    onCheckedChange(option, checked) {
        option.checked = checked;
        this.onChange(this.options);
    }
    ngOnInit() {
        this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
            }
        });
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    writeValue(value) {
        this.options = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
}
NzCheckboxGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-checkbox-group',
                exportAs: 'nzCheckboxGroup',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                template: `
    <label
      nz-checkbox
      class="ant-checkbox-group-item"
      *ngFor="let o of options; trackBy: trackByOption"
      [nzDisabled]="o.disabled || nzDisabled"
      [nzChecked]="o.checked!"
      (nzCheckedChange)="onCheckedChange(o, $event)"
    >
      <span>{{ o.label }}</span>
    </label>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzCheckboxGroupComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-checkbox-group]': 'true'
                }
            },] }
];
NzCheckboxGroupComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: ChangeDetectorRef }
];
NzCheckboxGroupComponent.propDecorators = {
    nzDisabled: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCheckboxGroupComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jaGVja2JveC8iLCJzb3VyY2VzIjpbImNoZWNrYm94LWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xJLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFxQ3ZELE1BQU0sT0FBTyx3QkFBd0I7SUFpQm5DLFlBQW9CLFVBQXNCLEVBQVUsWUFBMEIsRUFBVSxHQUFzQjtRQUExRixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWQ5RyxhQUFRLEdBQWlCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNsQyxjQUFTLEdBQWtCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNwQyxZQUFPLEdBQWdDLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO0lBV3FFLENBQUM7SUFUbEgsYUFBYSxDQUFDLENBQVMsRUFBRSxNQUFpQztRQUN4RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFpQyxFQUFFLE9BQWdCO1FBQ2pFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkUsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFrQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFnQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBaUI7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWlCO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBM0VGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2dCQUNELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHdCQUF3QixDQUFDO3dCQUN2RCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osNEJBQTRCLEVBQUUsTUFBTTtpQkFDckM7YUFDRjs7O1lBdkNzQyxVQUFVO1lBRHhDLFlBQVk7WUFDWixpQkFBaUI7Ozt5QkE4Q3ZCLEtBQUs7O0FBQW1CO0lBQWYsWUFBWSxFQUFFOzs0REFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpDaGVja0JveE9wdGlvbkludGVyZmFjZSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGNoZWNrZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNoZWNrYm94LWdyb3VwJyxcbiAgZXhwb3J0QXM6ICduekNoZWNrYm94R3JvdXAnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bGFiZWxcbiAgICAgIG56LWNoZWNrYm94XG4gICAgICBjbGFzcz1cImFudC1jaGVja2JveC1ncm91cC1pdGVtXCJcbiAgICAgICpuZ0Zvcj1cImxldCBvIG9mIG9wdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlPcHRpb25cIlxuICAgICAgW256RGlzYWJsZWRdPVwiby5kaXNhYmxlZCB8fCBuekRpc2FibGVkXCJcbiAgICAgIFtuekNoZWNrZWRdPVwiby5jaGVja2VkIVwiXG4gICAgICAobnpDaGVja2VkQ2hhbmdlKT1cIm9uQ2hlY2tlZENoYW5nZShvLCAkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8c3Bhbj57eyBvLmxhYmVsIH19PC9zcGFuPlxuICAgIDwvbGFiZWw+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpDaGVja2JveEdyb3VwQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtY2hlY2tib3gtZ3JvdXBdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDaGVja2JveEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcblxuICBvbkNoYW5nZTogT25DaGFuZ2VUeXBlID0gKCkgPT4ge307XG4gIG9uVG91Y2hlZDogT25Ub3VjaGVkVHlwZSA9ICgpID0+IHt9O1xuICBvcHRpb25zOiBOekNoZWNrQm94T3B0aW9uSW50ZXJmYWNlW10gPSBbXTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcblxuICB0cmFja0J5T3B0aW9uKF86IG51bWJlciwgb3B0aW9uOiBOekNoZWNrQm94T3B0aW9uSW50ZXJmYWNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gb3B0aW9uLnZhbHVlO1xuICB9XG5cbiAgb25DaGVja2VkQ2hhbmdlKG9wdGlvbjogTnpDaGVja0JveE9wdGlvbkludGVyZmFjZSwgY2hlY2tlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIG9wdGlvbi5jaGVja2VkID0gY2hlY2tlZDtcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMub3B0aW9ucyk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuZWxlbWVudFJlZiwgdHJ1ZSkuc3Vic2NyaWJlKGZvY3VzT3JpZ2luID0+IHtcbiAgICAgIGlmICghZm9jdXNPcmlnaW4pIHtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLm9uVG91Y2hlZCgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZik7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBOekNoZWNrQm94T3B0aW9uSW50ZXJmYWNlW10pOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB2YWx1ZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IE9uQ2hhbmdlVHlwZSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBPblRvdWNoZWRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19