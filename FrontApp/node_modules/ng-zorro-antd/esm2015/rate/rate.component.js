/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
const NZ_CONFIG_MODULE_NAME = 'rate';
export class NzRateComponent {
    constructor(nzConfigService, renderer, cdr) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAllowClear = true;
        this.nzAllowHalf = false;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
        this.nzCount = 5;
        this.nzTooltips = [];
        this.nzOnBlur = new EventEmitter();
        this.nzOnFocus = new EventEmitter();
        this.nzOnHoverChange = new EventEmitter();
        this.nzOnKeyDown = new EventEmitter();
        this.classMap = {};
        this.starArray = [];
        this.starStyleArray = [];
        this.destroy$ = new Subject();
        this.hasHalf = false;
        this.hoverValue = 0;
        this.isFocused = false;
        this._value = 0;
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    get nzValue() {
        return this._value;
    }
    set nzValue(input) {
        if (this._value === input) {
            return;
        }
        this._value = input;
        this.hasHalf = !Number.isInteger(input);
        this.hoverValue = Math.ceil(input);
    }
    ngOnChanges(changes) {
        const { nzAutoFocus, nzCount, nzValue } = changes;
        if (nzAutoFocus && !nzAutoFocus.isFirstChange()) {
            const el = this.ulElement.nativeElement;
            if (this.nzAutoFocus && !this.nzDisabled) {
                this.renderer.setAttribute(el, 'autofocus', 'autofocus');
            }
            else {
                this.renderer.removeAttribute(el, 'autofocus');
            }
        }
        if (nzCount) {
            this.updateStarArray();
        }
        if (nzValue) {
            this.updateStarStyle();
        }
    }
    ngOnInit() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onItemClick(index, isHalf) {
        if (this.nzDisabled) {
            return;
        }
        this.hoverValue = index + 1;
        const actualValue = isHalf ? index + 0.5 : index + 1;
        if (this.nzValue === actualValue) {
            if (this.nzAllowClear) {
                this.nzValue = 0;
                this.onChange(this.nzValue);
            }
        }
        else {
            this.nzValue = actualValue;
            this.onChange(this.nzValue);
        }
        this.updateStarStyle();
    }
    onItemHover(index, isHalf) {
        if (this.nzDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
            return;
        }
        this.hoverValue = index + 1;
        this.hasHalf = isHalf;
        this.nzOnHoverChange.emit(this.hoverValue);
        this.updateStarStyle();
    }
    onRateLeave() {
        this.hasHalf = !Number.isInteger(this.nzValue);
        this.hoverValue = Math.ceil(this.nzValue);
        this.updateStarStyle();
    }
    onFocus(e) {
        this.isFocused = true;
        this.nzOnFocus.emit(e);
    }
    onBlur(e) {
        this.isFocused = false;
        this.nzOnBlur.emit(e);
    }
    focus() {
        this.ulElement.nativeElement.focus();
    }
    blur() {
        this.ulElement.nativeElement.blur();
    }
    onKeyDown(e) {
        const oldVal = this.nzValue;
        if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
            this.nzValue += this.nzAllowHalf ? 0.5 : 1;
        }
        else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
            this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
        }
        if (oldVal !== this.nzValue) {
            this.onChange(this.nzValue);
            this.nzOnKeyDown.emit(e);
            this.updateStarStyle();
            this.cdr.markForCheck();
        }
    }
    updateStarArray() {
        this.starArray = Array(this.nzCount)
            .fill(0)
            .map((_, i) => i);
        this.updateStarStyle();
    }
    updateStarStyle() {
        this.starStyleArray = this.starArray.map(i => {
            const prefix = 'ant-rate-star';
            const value = i + 1;
            return {
                [`${prefix}-full`]: value < this.hoverValue || (!this.hasHalf && value === this.hoverValue),
                [`${prefix}-half`]: this.hasHalf && value === this.hoverValue,
                [`${prefix}-active`]: this.hasHalf && value === this.hoverValue,
                [`${prefix}-zero`]: value > this.hoverValue,
                [`${prefix}-focused`]: this.hasHalf && value === this.hoverValue && this.isFocused
            };
        });
    }
    writeValue(value) {
        this.nzValue = value || 0;
        this.updateStarArray();
        this.cdr.markForCheck();
    }
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
NzRateComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-rate',
                exportAs: 'nzRate',
                preserveWhitespaces: false,
                template: `
    <ul
      #ulElement
      class="ant-rate"
      [class.ant-rate-disabled]="nzDisabled"
      [ngClass]="classMap"
      (blur)="onBlur($event)"
      (focus)="onFocus($event)"
      (keydown)="onKeyDown($event); $event.preventDefault()"
      (mouseleave)="onRateLeave(); $event.stopPropagation()"
      [tabindex]="nzDisabled ? -1 : 1"
    >
      <li
        *ngFor="let star of starArray; let i = index"
        class="ant-rate-star"
        [ngClass]="starStyleArray[i] || ''"
        nz-tooltip
        [nzTooltipTitle]="nzTooltips[i]"
      >
        <div
          nz-rate-item
          [allowHalf]="nzAllowHalf"
          [character]="nzCharacter"
          (itemHover)="onItemHover(i, $event)"
          (itemClick)="onItemClick(i, $event)"
        ></div>
      </li>
    </ul>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzRateComponent),
                        multi: true
                    }
                ]
            },] }
];
NzRateComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
NzRateComponent.propDecorators = {
    ulElement: [{ type: ViewChild, args: ['ulElement', { static: false },] }],
    nzAllowClear: [{ type: Input }],
    nzAllowHalf: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzAutoFocus: [{ type: Input }],
    nzCharacter: [{ type: Input }],
    nzCount: [{ type: Input }],
    nzTooltips: [{ type: Input }],
    nzOnBlur: [{ type: Output }],
    nzOnFocus: [{ type: Output }],
    nzOnHoverChange: [{ type: Output }],
    nzOnKeyDown: [{ type: Output }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAllowClear", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAllowHalf", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzRateComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzRateComponent.prototype, "nzCount", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3JhdGUvIiwic291cmNlcyI6WyJyYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUlMLE1BQU0sRUFDTixTQUFTLEVBRVQsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRSxNQUFNLHFCQUFxQixHQUFnQixNQUFNLENBQUM7QUE2Q2xELE1BQU0sT0FBTyxlQUFlO0lBK0MxQixZQUFtQixlQUFnQyxFQUFVLFFBQW1CLEVBQVUsR0FBc0I7UUFBN0Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBOUN2RyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQVVyQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUMzQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVC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eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLE1BQU07d0JBQ04sTUFBTTs4QkFDTixNQUFNOzBCQUNOLE1BQU07O0FBVmdDO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7cURBQThCO0FBQzdCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7b0RBQThCO0FBQzNDO0lBQWYsWUFBWSxFQUFFOzttREFBNkI7QUFDNUI7SUFBZixZQUFZLEVBQUU7O29EQUE4QjtBQUU5QjtJQUFkLFdBQVcsRUFBRTs7Z0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTmdDbGFzc1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3JhdGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotcmF0ZScsXG4gIGV4cG9ydEFzOiAnbnpSYXRlJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsXG4gICAgICAjdWxFbGVtZW50XG4gICAgICBjbGFzcz1cImFudC1yYXRlXCJcbiAgICAgIFtjbGFzcy5hbnQtcmF0ZS1kaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgIFtuZ0NsYXNzXT1cImNsYXNzTWFwXCJcbiAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcbiAgICAgIChmb2N1cyk9XCJvbkZvY3VzKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudCk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cIm9uUmF0ZUxlYXZlKCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICBbdGFiaW5kZXhdPVwibnpEaXNhYmxlZCA/IC0xIDogMVwiXG4gICAgPlxuICAgICAgPGxpXG4gICAgICAgICpuZ0Zvcj1cImxldCBzdGFyIG9mIHN0YXJBcnJheTsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwiYW50LXJhdGUtc3RhclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInN0YXJTdHlsZUFycmF5W2ldIHx8ICcnXCJcbiAgICAgICAgbnotdG9vbHRpcFxuICAgICAgICBbbnpUb29sdGlwVGl0bGVdPVwibnpUb29sdGlwc1tpXVwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBuei1yYXRlLWl0ZW1cbiAgICAgICAgICBbYWxsb3dIYWxmXT1cIm56QWxsb3dIYWxmXCJcbiAgICAgICAgICBbY2hhcmFjdGVyXT1cIm56Q2hhcmFjdGVyXCJcbiAgICAgICAgICAoaXRlbUhvdmVyKT1cIm9uSXRlbUhvdmVyKGksICRldmVudClcIlxuICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soaSwgJGV2ZW50KVwiXG4gICAgICAgID48L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelJhdGVDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpSYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBbGxvd0NsZWFyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekFsbG93SGFsZjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q291bnQ6IEJvb2xlYW5JbnB1dDtcblxuICBAVmlld0NoaWxkKCd1bEVsZW1lbnQnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSB1bEVsZW1lbnQ/OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56QWxsb3dDbGVhcjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56QWxsb3dIYWxmOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekNoYXJhY3RlciE6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBASW5wdXROdW1iZXIoKSBuekNvdW50OiBudW1iZXIgPSA1O1xuICBASW5wdXQoKSBuelRvb2x0aXBzOiBzdHJpbmdbXSA9IFtdO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uSG92ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25LZXlEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpO1xuXG4gIGNsYXNzTWFwOiBOZ0NsYXNzVHlwZSA9IHt9O1xuICBzdGFyQXJyYXk6IG51bWJlcltdID0gW107XG4gIHN0YXJTdHlsZUFycmF5OiBOZ0NsYXNzVHlwZVtdID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgaGFzSGFsZiA9IGZhbHNlO1xuICBwcml2YXRlIGhvdmVyVmFsdWUgPSAwO1xuICBwcml2YXRlIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIF92YWx1ZSA9IDA7XG5cbiAgZ2V0IG56VmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgbnpWYWx1ZShpbnB1dDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSBpbnB1dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID0gaW5wdXQ7XG4gICAgdGhpcy5oYXNIYWxmID0gIU51bWJlci5pc0ludGVnZXIoaW5wdXQpO1xuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IE1hdGguY2VpbChpbnB1dCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56QXV0b0ZvY3VzLCBuekNvdW50LCBuelZhbHVlIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKG56QXV0b0ZvY3VzICYmICFuekF1dG9Gb2N1cy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy51bEVsZW1lbnQhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAodGhpcy5uekF1dG9Gb2N1cyAmJiAhdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLCAnYXV0b2ZvY3VzJywgJ2F1dG9mb2N1cycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoZWwsICdhdXRvZm9jdXMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobnpDb3VudCkge1xuICAgICAgdGhpcy51cGRhdGVTdGFyQXJyYXkoKTtcbiAgICB9XG5cbiAgICBpZiAobnpWYWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVTdGFyU3R5bGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZHIubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25JdGVtQ2xpY2soaW5kZXg6IG51bWJlciwgaXNIYWxmOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IGluZGV4ICsgMTtcblxuICAgIGNvbnN0IGFjdHVhbFZhbHVlID0gaXNIYWxmID8gaW5kZXggKyAwLjUgOiBpbmRleCArIDE7XG5cbiAgICBpZiAodGhpcy5uelZhbHVlID09PSBhY3R1YWxWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMubnpBbGxvd0NsZWFyKSB7XG4gICAgICAgIHRoaXMubnpWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5uelZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uelZhbHVlID0gYWN0dWFsVmFsdWU7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVTdGFyU3R5bGUoKTtcbiAgfVxuXG4gIG9uSXRlbUhvdmVyKGluZGV4OiBudW1iZXIsIGlzSGFsZjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLm56RGlzYWJsZWQgfHwgKHRoaXMuaG92ZXJWYWx1ZSA9PT0gaW5kZXggKyAxICYmIGlzSGFsZiA9PT0gdGhpcy5oYXNIYWxmKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IGluZGV4ICsgMTtcbiAgICB0aGlzLmhhc0hhbGYgPSBpc0hhbGY7XG4gICAgdGhpcy5uek9uSG92ZXJDaGFuZ2UuZW1pdCh0aGlzLmhvdmVyVmFsdWUpO1xuXG4gICAgdGhpcy51cGRhdGVTdGFyU3R5bGUoKTtcbiAgfVxuXG4gIG9uUmF0ZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzSGFsZiA9ICFOdW1iZXIuaXNJbnRlZ2VyKHRoaXMubnpWYWx1ZSk7XG4gICAgdGhpcy5ob3ZlclZhbHVlID0gTWF0aC5jZWlsKHRoaXMubnpWYWx1ZSk7XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXJTdHlsZSgpO1xuICB9XG5cbiAgb25Gb2N1cyhlOiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMubnpPbkZvY3VzLmVtaXQoZSk7XG4gIH1cblxuICBvbkJsdXIoZTogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5uek9uQmx1ci5lbWl0KGUpO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy51bEVsZW1lbnQhLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy51bEVsZW1lbnQhLm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRWYWwgPSB0aGlzLm56VmFsdWU7XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSBSSUdIVF9BUlJPVyAmJiB0aGlzLm56VmFsdWUgPCB0aGlzLm56Q291bnQpIHtcbiAgICAgIHRoaXMubnpWYWx1ZSArPSB0aGlzLm56QWxsb3dIYWxmID8gMC41IDogMTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gTEVGVF9BUlJPVyAmJiB0aGlzLm56VmFsdWUgPiAwKSB7XG4gICAgICB0aGlzLm56VmFsdWUgLT0gdGhpcy5uekFsbG93SGFsZiA/IDAuNSA6IDE7XG4gICAgfVxuXG4gICAgaWYgKG9sZFZhbCAhPT0gdGhpcy5uelZhbHVlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgICB0aGlzLm56T25LZXlEb3duLmVtaXQoZSk7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXJTdHlsZSgpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGFyQXJyYXkoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFyQXJyYXkgPSBBcnJheSh0aGlzLm56Q291bnQpXG4gICAgICAuZmlsbCgwKVxuICAgICAgLm1hcCgoXywgaSkgPT4gaSk7XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXJTdHlsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGFyU3R5bGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFyU3R5bGVBcnJheSA9IHRoaXMuc3RhckFycmF5Lm1hcChpID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9ICdhbnQtcmF0ZS1zdGFyJztcbiAgICAgIGNvbnN0IHZhbHVlID0gaSArIDE7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbYCR7cHJlZml4fS1mdWxsYF06IHZhbHVlIDwgdGhpcy5ob3ZlclZhbHVlIHx8ICghdGhpcy5oYXNIYWxmICYmIHZhbHVlID09PSB0aGlzLmhvdmVyVmFsdWUpLFxuICAgICAgICBbYCR7cHJlZml4fS1oYWxmYF06IHRoaXMuaGFzSGFsZiAmJiB2YWx1ZSA9PT0gdGhpcy5ob3ZlclZhbHVlLFxuICAgICAgICBbYCR7cHJlZml4fS1hY3RpdmVgXTogdGhpcy5oYXNIYWxmICYmIHZhbHVlID09PSB0aGlzLmhvdmVyVmFsdWUsXG4gICAgICAgIFtgJHtwcmVmaXh9LXplcm9gXTogdmFsdWUgPiB0aGlzLmhvdmVyVmFsdWUsXG4gICAgICAgIFtgJHtwcmVmaXh9LWZvY3VzZWRgXTogdGhpcy5oYXNIYWxmICYmIHZhbHVlID09PSB0aGlzLmhvdmVyVmFsdWUgJiYgdGhpcy5pc0ZvY3VzZWRcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBudW1iZXIgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5uelZhbHVlID0gdmFsdWUgfHwgMDtcbiAgICB0aGlzLnVwZGF0ZVN0YXJBcnJheSgpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBudW1iZXIpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBvbkNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xuICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xufVxuIl19