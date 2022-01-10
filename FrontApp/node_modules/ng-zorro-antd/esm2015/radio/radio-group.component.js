/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { NzRadioService } from './radio.service';
export class NzRadioGroupComponent {
    constructor(cdr, nzRadioService) {
        this.cdr = cdr;
        this.nzRadioService = nzRadioService;
        this.value = null;
        this.destroy$ = new Subject();
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzDisabled = false;
        this.nzButtonStyle = 'outline';
        this.nzSize = 'default';
        this.nzName = null;
    }
    ngOnInit() {
        this.nzRadioService.selected$.subscribe(value => {
            if (this.value !== value) {
                this.value = value;
                this.onChange(this.value);
            }
        });
        this.nzRadioService.touched$.subscribe(() => {
            Promise.resolve().then(() => this.onTouched());
        });
    }
    ngOnChanges(changes) {
        const { nzDisabled, nzName } = changes;
        if (nzDisabled) {
            this.nzRadioService.setDisabled(this.nzDisabled);
        }
        if (nzName) {
            this.nzRadioService.setName(this.nzName);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.value = value;
        this.nzRadioService.select(value);
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.nzRadioService.setDisabled(isDisabled);
        this.cdr.markForCheck();
    }
}
NzRadioGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-radio-group',
                exportAs: 'nzRadioGroup',
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    NzRadioService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzRadioGroupComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-radio-group]': `true`,
                    '[class.ant-radio-group-large]': `nzSize === 'large'`,
                    '[class.ant-radio-group-small]': `nzSize === 'small'`,
                    '[class.ant-radio-group-solid]': `nzButtonStyle === 'solid'`
                }
            },] }
];
NzRadioGroupComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzRadioService }
];
NzRadioGroupComponent.propDecorators = {
    nzDisabled: [{ type: Input }],
    nzButtonStyle: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzName: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzRadioGroupComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9yYWRpby8iLCJzb3VyY2VzIjpbInJhZGlvLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBS0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUEwQmpELE1BQU0sT0FBTyxxQkFBcUI7SUFZaEMsWUFBb0IsR0FBc0IsRUFBVSxjQUE4QjtRQUE5RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVQxRSxVQUFLLEdBQXFCLElBQUksQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNqQyxhQUFRLEdBQWlCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNsQyxjQUFTLEdBQWtCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNYLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsa0JBQWEsR0FBdUIsU0FBUyxDQUFDO1FBQzlDLFdBQU0sR0FBa0IsU0FBUyxDQUFDO1FBQ2xDLFdBQU0sR0FBa0IsSUFBSSxDQUFDO0lBRStDLENBQUM7SUFFdEYsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDdkMsSUFBSSxVQUFVLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEQ7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBZ0I7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBZ0I7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWlCO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQWpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFO29CQUNULGNBQWM7b0JBQ2Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDcEQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLHlCQUF5QixFQUFFLE1BQU07b0JBQ2pDLCtCQUErQixFQUFFLG9CQUFvQjtvQkFDckQsK0JBQStCLEVBQUUsb0JBQW9CO29CQUNyRCwrQkFBK0IsRUFBRSwyQkFBMkI7aUJBQzdEO2FBQ0Y7OztZQXZDQyxpQkFBaUI7WUFjVixjQUFjOzs7eUJBaUNwQixLQUFLOzRCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLOztBQUhtQjtJQUFmLFlBQVksRUFBRTs7eURBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55LCBOelNpemVMRFNUeXBlLCBPbkNoYW5nZVR5cGUsIE9uVG91Y2hlZFR5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTnpSYWRpb1NlcnZpY2UgfSBmcm9tICcuL3JhZGlvLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBOelJhZGlvQnV0dG9uU3R5bGUgPSAnb3V0bGluZScgfCAnc29saWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1yYWRpby1ncm91cCcsXG4gIGV4cG9ydEFzOiAnbnpSYWRpb0dyb3VwJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIE56UmFkaW9TZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpSYWRpb0dyb3VwQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8tZ3JvdXBdJzogYHRydWVgLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLWdyb3VwLWxhcmdlXSc6IGBuelNpemUgPT09ICdsYXJnZSdgLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLWdyb3VwLXNtYWxsXSc6IGBuelNpemUgPT09ICdzbWFsbCdgLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLWdyb3VwLXNvbGlkXSc6IGBuekJ1dHRvblN0eWxlID09PSAnc29saWQnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UmFkaW9Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIHZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIG9uQ2hhbmdlOiBPbkNoYW5nZVR5cGUgPSAoKSA9PiB7fTtcbiAgb25Ub3VjaGVkOiBPblRvdWNoZWRUeXBlID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56QnV0dG9uU3R5bGU6IE56UmFkaW9CdXR0b25TdHlsZSA9ICdvdXRsaW5lJztcbiAgQElucHV0KCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuek5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBuelJhZGlvU2VydmljZTogTnpSYWRpb1NlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uelJhZGlvU2VydmljZS5zZWxlY3RlZCQuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5uelJhZGlvU2VydmljZS50b3VjaGVkJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLm9uVG91Y2hlZCgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56RGlzYWJsZWQsIG56TmFtZSB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5uelJhZGlvU2VydmljZS5zZXREaXNhYmxlZCh0aGlzLm56RGlzYWJsZWQpO1xuICAgIH1cbiAgICBpZiAobnpOYW1lKSB7XG4gICAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLnNldE5hbWUodGhpcy5uek5hbWUhKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBOelNhZmVBbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5uelJhZGlvU2VydmljZS5zZWxlY3QodmFsdWUpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogT25DaGFuZ2VUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IE9uVG91Y2hlZFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLnNldERpc2FibGVkKGlzRGlzYWJsZWQpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=