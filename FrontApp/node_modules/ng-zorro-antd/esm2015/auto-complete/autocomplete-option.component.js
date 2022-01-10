/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { InputBoolean, scrollIntoView } from 'ng-zorro-antd/core/util';
import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';
export class NzOptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
export class NzAutocompleteOptionComponent {
    constructor(changeDetectorRef, element, nzAutocompleteOptgroupComponent) {
        this.changeDetectorRef = changeDetectorRef;
        this.element = element;
        this.nzAutocompleteOptgroupComponent = nzAutocompleteOptgroupComponent;
        this.nzDisabled = false;
        this.selectionChange = new EventEmitter();
        this.mouseEntered = new EventEmitter();
        this.active = false;
        this.selected = false;
    }
    select(emit = true) {
        this.selected = true;
        this.changeDetectorRef.markForCheck();
        if (emit) {
            this.emitSelectionChangeEvent();
        }
    }
    onMouseEnter() {
        this.mouseEntered.emit(this);
    }
    deselect() {
        this.selected = false;
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent();
    }
    /** Git display label */
    getLabel() {
        return this.nzLabel || this.nzValue.toString();
    }
    /** Set active (only styles) */
    setActiveStyles() {
        if (!this.active) {
            this.active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Unset active (only styles) */
    setInactiveStyles() {
        if (this.active) {
            this.active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    scrollIntoViewIfNeeded() {
        scrollIntoView(this.element.nativeElement);
    }
    selectViaInteraction() {
        if (!this.nzDisabled) {
            this.selected = !this.selected;
            if (this.selected) {
                this.setActiveStyles();
            }
            else {
                this.setInactiveStyles();
            }
            this.emitSelectionChangeEvent(true);
            this.changeDetectorRef.markForCheck();
        }
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
    }
}
NzAutocompleteOptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-auto-option',
                exportAs: 'nzAutoOption',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `,
                host: {
                    role: 'menuitem',
                    class: 'ant-select-item ant-select-item-option',
                    '[class.ant-select-item-option-grouped]': 'nzAutocompleteOptgroupComponent',
                    '[class.ant-select-item-option-selected]': 'selected',
                    '[class.ant-select-item-option-active]': 'active',
                    '[class.ant-select-item-option-disabled]': 'nzDisabled',
                    '[attr.aria-selected]': 'selected.toString()',
                    '[attr.aria-disabled]': 'nzDisabled.toString()',
                    '(click)': 'selectViaInteraction()',
                    '(mouseenter)': 'onMouseEnter()',
                    '(mousedown)': '$event.preventDefault()'
                }
            },] }
];
NzAutocompleteOptionComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NzAutocompleteOptgroupComponent, decorators: [{ type: Optional }] }
];
NzAutocompleteOptionComponent.propDecorators = {
    nzValue: [{ type: Input }],
    nzLabel: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    selectionChange: [{ type: Output }],
    mouseEntered: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAutocompleteOptionComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2F1dG8tY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUtb3B0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEYsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUFtQixNQUFxQyxFQUFTLGNBQXVCLEtBQUs7UUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFBRyxDQUFDO0NBQ2xHO0FBMkJELE1BQU0sT0FBTyw2QkFBNkI7SUFZeEMsWUFDVSxpQkFBb0MsRUFDcEMsT0FBbUIsRUFFcEIsK0JBQWdFO1FBSC9ELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUVwQixvQ0FBK0IsR0FBL0IsK0JBQStCLENBQWlDO1FBWGhELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQUM5RCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFpQyxDQUFDO1FBRXBGLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBT2QsQ0FBQztJQUVKLE1BQU0sQ0FBQyxPQUFnQixJQUFJO1FB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QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsTUFBTTsyQkFDTixNQUFNOztBQUZrQjtJQUFmLFlBQVksRUFBRTs7aUVBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBzY3JvbGxJbnRvVmlldyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpBdXRvY29tcGxldGVPcHRncm91cENvbXBvbmVudCB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9wdGdyb3VwLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBOek9wdGlvblNlbGVjdGlvbkNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2U6IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50LCBwdWJsaWMgaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSkge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYXV0by1vcHRpb24nLFxuICBleHBvcnRBczogJ256QXV0b09wdGlvbicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXNlbGVjdC1pdGVtLW9wdGlvbi1jb250ZW50XCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICByb2xlOiAnbWVudWl0ZW0nLFxuICAgIGNsYXNzOiAnYW50LXNlbGVjdC1pdGVtIGFudC1zZWxlY3QtaXRlbS1vcHRpb24nLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1pdGVtLW9wdGlvbi1ncm91cGVkXSc6ICduekF1dG9jb21wbGV0ZU9wdGdyb3VwQ29tcG9uZW50JyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tYWN0aXZlXSc6ICdhY3RpdmUnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1pdGVtLW9wdGlvbi1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCcsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICduekRpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICcoY2xpY2spJzogJ3NlbGVjdFZpYUludGVyYWN0aW9uKCknLFxuICAgICcobW91c2VlbnRlciknOiAnb25Nb3VzZUVudGVyKCknLFxuICAgICcobW91c2Vkb3duKSc6ICckZXZlbnQucHJldmVudERlZmF1bHQoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpWYWx1ZTogTnpTYWZlQW55O1xuICBASW5wdXQoKSBuekxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOek9wdGlvblNlbGVjdGlvbkNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG1vdXNlRW50ZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQ+KCk7XG5cbiAgYWN0aXZlID0gZmFsc2U7XG4gIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIEBPcHRpb25hbCgpXG4gICAgcHVibGljIG56QXV0b2NvbXBsZXRlT3B0Z3JvdXBDb21wb25lbnQ6IE56QXV0b2NvbXBsZXRlT3B0Z3JvdXBDb21wb25lbnRcbiAgKSB7fVxuXG4gIHNlbGVjdChlbWl0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZUVudGVyKCk6IHZvaWQge1xuICAgIHRoaXMubW91c2VFbnRlcmVkLmVtaXQodGhpcyk7XG4gIH1cblxuICBkZXNlbGVjdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqIEdpdCBkaXNwbGF5IGxhYmVsICovXG4gIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubnpMYWJlbCB8fCB0aGlzLm56VmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKiBTZXQgYWN0aXZlIChvbmx5IHN0eWxlcykgKi9cbiAgc2V0QWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFVuc2V0IGFjdGl2ZSAob25seSBzdHlsZXMpICovXG4gIHNldEluYWN0aXZlU3R5bGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCgpOiB2b2lkIHtcbiAgICBzY3JvbGxJbnRvVmlldyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVTdHlsZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0SW5hY3RpdmVTdHlsZXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KHRydWUpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudChpc1VzZXJJbnB1dDogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChuZXcgTnpPcHRpb25TZWxlY3Rpb25DaGFuZ2UodGhpcywgaXNVc2VySW5wdXQpKTtcbiAgfVxufVxuIl19