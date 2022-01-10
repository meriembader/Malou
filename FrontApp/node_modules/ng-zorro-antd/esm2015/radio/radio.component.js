/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzRadioButtonDirective } from './radio-button.directive';
import { NzRadioService } from './radio.service';
export class NzRadioComponent {
    constructor(elementRef, cdr, focusMonitor, nzRadioService, nzRadioButtonDirective) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.nzRadioService = nzRadioService;
        this.nzRadioButtonDirective = nzRadioButtonDirective;
        this.isNgModel = false;
        this.destroy$ = new Subject();
        this.isChecked = false;
        this.name = null;
        this.isRadioButton = !!this.nzRadioButtonDirective;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzValue = null;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
    }
    onHostClick(event) {
        /** prevent label click triggered twice. **/
        event.stopPropagation();
        event.preventDefault();
        if (!this.nzDisabled && !this.isChecked) {
            if (this.nzRadioService) {
                this.nzRadioService.select(this.nzValue);
            }
            if (this.isNgModel) {
                this.isChecked = true;
                this.onChange(true);
            }
        }
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
    writeValue(value) {
        this.isChecked = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.isNgModel = true;
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    ngOnInit() {
        if (this.nzRadioService) {
            this.nzRadioService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => {
                this.name = name;
                this.cdr.markForCheck();
            });
            this.nzRadioService.disabled$.pipe(takeUntil(this.destroy$)).subscribe(disabled => {
                this.nzDisabled = disabled;
                this.cdr.markForCheck();
            });
            this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
                this.isChecked = this.nzValue === value;
                this.cdr.markForCheck();
            });
        }
        this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
                if (this.nzRadioService) {
                    this.nzRadioService.touch();
                }
            }
        });
    }
    ngAfterViewInit() {
        if (this.nzAutoFocus) {
            this.focus();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
NzRadioComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-radio],[nz-radio-button]',
                exportAs: 'nzRadio',
                preserveWhitespaces: false,
                template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzRadioComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-radio-wrapper]': '!isRadioButton',
                    '[class.ant-radio-button-wrapper]': 'isRadioButton',
                    '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
                    '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
                    '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
                    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
                    '(click)': 'onHostClick($event)'
                }
            },] }
];
NzRadioComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FocusMonitor },
    { type: NzRadioService, decorators: [{ type: Optional }] },
    { type: NzRadioButtonDirective, decorators: [{ type: Optional }] }
];
NzRadioComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['inputElement', { static: false },] }],
    nzValue: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzAutoFocus: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzRadioComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzRadioComponent.prototype, "nzAutoFocus", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9yYWRpby8iLCJzb3VyY2VzIjpbInJhZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLEtBQUssRUFHTCxRQUFRLEVBQ1IsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWdEakQsTUFBTSxPQUFPLGdCQUFnQjtJQXVDM0IsWUFDVSxVQUFzQixFQUN0QixHQUFzQixFQUN0QixZQUEwQixFQUNkLGNBQThCLEVBQzlCLHNCQUE4QztRQUoxRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUF4QzVELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkMsY0FBUyxH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d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDL0MsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDJCQUEyQixFQUFFLGdCQUFnQjtvQkFDN0Msa0NBQWtDLEVBQUUsZUFBZTtvQkFDbkQsbUNBQW1DLEVBQUUsNkJBQTZCO29CQUNsRSwwQ0FBMEMsRUFBRSw0QkFBNEI7b0JBQ3hFLG9DQUFvQyxFQUFFLDhCQUE4QjtvQkFDcEUsMkNBQTJDLEVBQUUsNkJBQTZCO29CQUMxRSxTQUFTLEVBQUUscUJBQXFCO2lCQUNqQzthQUNGOzs7WUEvREMsVUFBVTtZQUZWLGlCQUFpQjtZQUpWLFlBQVk7WUFzQlosY0FBYyx1QkEyRmxCLFFBQVE7WUE1Rkosc0JBQXNCLHVCQTZGMUIsUUFBUTs7OzJCQWpDVixTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtzQkFDM0MsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7O0FBRG1CO0lBQWYsWUFBWSxFQUFFOztvREFBb0I7QUFDbkI7SUFBZixZQUFZLEVBQUU7O3FEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSwgT25DaGFuZ2VUeXBlLCBPblRvdWNoZWRUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56UmFkaW9CdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL3JhZGlvLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpSYWRpb1NlcnZpY2UgfSBmcm9tICcuL3JhZGlvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotcmFkaW9dLFtuei1yYWRpby1idXR0b25dJyxcbiAgZXhwb3J0QXM6ICduelJhZGlvJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIFtjbGFzcy5hbnQtcmFkaW9dPVwiIWlzUmFkaW9CdXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1yYWRpby1jaGVja2VkXT1cImlzQ2hlY2tlZCAmJiAhaXNSYWRpb0J1dHRvblwiXG4gICAgICBbY2xhc3MuYW50LXJhZGlvLWRpc2FibGVkXT1cIm56RGlzYWJsZWQgJiYgIWlzUmFkaW9CdXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1yYWRpby1idXR0b25dPVwiaXNSYWRpb0J1dHRvblwiXG4gICAgICBbY2xhc3MuYW50LXJhZGlvLWJ1dHRvbi1jaGVja2VkXT1cImlzQ2hlY2tlZCAmJiBpc1JhZGlvQnV0dG9uXCJcbiAgICAgIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWRpc2FibGVkXT1cIm56RGlzYWJsZWQgJiYgaXNSYWRpb0J1dHRvblwiXG4gICAgPlxuICAgICAgPGlucHV0XG4gICAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cIm56QXV0b0ZvY3VzID8gJ2F1dG9mb2N1cycgOiBudWxsXCJcbiAgICAgICAgW2NsYXNzLmFudC1yYWRpby1pbnB1dF09XCIhaXNSYWRpb0J1dHRvblwiXG4gICAgICAgIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWlucHV0XT1cImlzUmFkaW9CdXR0b25cIlxuICAgICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAvPlxuICAgICAgPHNwYW4gW2NsYXNzLmFudC1yYWRpby1pbm5lcl09XCIhaXNSYWRpb0J1dHRvblwiIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWlubmVyXT1cImlzUmFkaW9CdXR0b25cIj48L3NwYW4+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56UmFkaW9Db21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1yYWRpby13cmFwcGVyXSc6ICchaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLXdyYXBwZXJdJzogJ2lzUmFkaW9CdXR0b24nLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLXdyYXBwZXItY2hlY2tlZF0nOiAnaXNDaGVja2VkICYmICFpc1JhZGlvQnV0dG9uJyxcbiAgICAnW2NsYXNzLmFudC1yYWRpby1idXR0b24td3JhcHBlci1jaGVja2VkXSc6ICdpc0NoZWNrZWQgJiYgaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8td3JhcHBlci1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCAmJiAhaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLXdyYXBwZXItZGlzYWJsZWRdJzogJ256RGlzYWJsZWQgJiYgaXNSYWRpb0J1dHRvbicsXG4gICAgJyhjbGljayknOiAnb25Ib3N0Q2xpY2soJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJhZGlvQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b0ZvY3VzOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSBpc05nTW9kZWwgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIGlzQ2hlY2tlZCA9IGZhbHNlO1xuICBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgaXNSYWRpb0J1dHRvbiA9ICEhdGhpcy5uelJhZGlvQnV0dG9uRGlyZWN0aXZlO1xuICBvbkNoYW5nZTogT25DaGFuZ2VUeXBlID0gKCkgPT4ge307XG4gIG9uVG91Y2hlZDogT25Ub3VjaGVkVHlwZSA9ICgpID0+IHt9O1xuICBAVmlld0NoaWxkKCdpbnB1dEVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgaW5wdXRFbGVtZW50PzogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgbnpWYWx1ZTogTnpTYWZlQW55IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9Gb2N1cyA9IGZhbHNlO1xuXG4gIG9uSG9zdENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLyoqIHByZXZlbnQgbGFiZWwgY2xpY2sgdHJpZ2dlcmVkIHR3aWNlLiAqKi9cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5uekRpc2FibGVkICYmICF0aGlzLmlzQ2hlY2tlZCkge1xuICAgICAgaWYgKHRoaXMubnpSYWRpb1NlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5uelJhZGlvU2VydmljZS5zZWxlY3QodGhpcy5uelZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmlzTmdNb2RlbCkge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5pbnB1dEVsZW1lbnQhLCAna2V5Ym9hcmQnKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQhLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbnpSYWRpb1NlcnZpY2U6IE56UmFkaW9TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbnpSYWRpb0J1dHRvbkRpcmVjdGl2ZTogTnpSYWRpb0J1dHRvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNDaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBPbkNoYW5nZVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLmlzTmdNb2RlbCA9IHRydWU7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IE9uVG91Y2hlZFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpSYWRpb1NlcnZpY2UpIHtcbiAgICAgIHRoaXMubnpSYWRpb1NlcnZpY2UubmFtZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShuYW1lID0+IHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubnpSYWRpb1NlcnZpY2UuZGlzYWJsZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZGlzYWJsZWQgPT4ge1xuICAgICAgICB0aGlzLm56RGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubnpSYWRpb1NlcnZpY2Uuc2VsZWN0ZWQkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHRoaXMubnpWYWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKS5zdWJzY3JpYmUoZm9jdXNPcmlnaW4gPT4ge1xuICAgICAgaWYgKCFmb2N1c09yaWdpbikge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMub25Ub3VjaGVkKCkpO1xuICAgICAgICBpZiAodGhpcy5uelJhZGlvU2VydmljZSkge1xuICAgICAgICAgIHRoaXMubnpSYWRpb1NlcnZpY2UudG91Y2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QXV0b0ZvY3VzKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZik7XG4gIH1cbn1cbiJdfQ==