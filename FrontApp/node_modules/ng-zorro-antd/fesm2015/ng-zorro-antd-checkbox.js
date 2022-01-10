import { __decorate, __metadata } from 'tslib';
import { FocusMonitor, A11yModule } from '@angular/cdk/a11y';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Renderer2, ElementRef, Output, forwardRef, Optional, ChangeDetectorRef, ViewChild, Input, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { CommonModule } from '@angular/common';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxWrapperComponent {
    constructor(renderer, elementRef) {
        this.nzOnChange = new EventEmitter();
        this.checkboxList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
    }
    addCheckbox(value) {
        this.checkboxList.push(value);
    }
    removeCheckbox(value) {
        this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
    }
    onChange() {
        const listOfCheckedValue = this.checkboxList.filter(item => item.nzChecked).map(item => item.nzValue);
        this.nzOnChange.emit(listOfCheckedValue);
    }
}
NzCheckboxWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-checkbox-wrapper',
                exportAs: 'nzCheckboxWrapper',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: ` <ng-content></ng-content> `
            },] }
];
NzCheckboxWrapperComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzCheckboxWrapperComponent.propDecorators = {
    nzOnChange: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxComponent {
    constructor(elementRef, nzCheckboxWrapperComponent, cdr, focusMonitor) {
        this.elementRef = elementRef;
        this.nzCheckboxWrapperComponent = nzCheckboxWrapperComponent;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzCheckedChange = new EventEmitter();
        this.nzValue = null;
        this.nzAutoFocus = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzChecked = false;
    }
    hostClick(e) {
        e.preventDefault();
        this.focus();
        this.innerCheckedChange(!this.nzChecked);
    }
    innerCheckedChange(checked) {
        if (!this.nzDisabled) {
            this.nzChecked = checked;
            this.onChange(this.nzChecked);
            this.nzCheckedChange.emit(this.nzChecked);
            if (this.nzCheckboxWrapperComponent) {
                this.nzCheckboxWrapperComponent.onChange();
            }
        }
    }
    writeValue(value) {
        this.nzChecked = value;
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
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    ngOnInit() {
        this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
            }
        });
        if (this.nzCheckboxWrapperComponent) {
            this.nzCheckboxWrapperComponent.addCheckbox(this);
        }
    }
    ngAfterViewInit() {
        if (this.nzAutoFocus) {
            this.focus();
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
        if (this.nzCheckboxWrapperComponent) {
            this.nzCheckboxWrapperComponent.removeCheckbox(this);
        }
    }
}
NzCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-checkbox]',
                exportAs: 'nzCheckbox',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span
      class="ant-checkbox"
      [class.ant-checkbox-checked]="nzChecked && !nzIndeterminate"
      [class.ant-checkbox-disabled]="nzDisabled"
      [class.ant-checkbox-indeterminate]="nzIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [checked]="nzChecked"
        [ngModel]="nzChecked"
        [disabled]="nzDisabled"
        (ngModelChange)="innerCheckedChange($event)"
        (click)="$event.stopPropagation()"
      />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzCheckboxComponent),
                        multi: true
                    }
                ],
                host: {
                    '[class.ant-checkbox-wrapper]': 'true',
                    '[class.ant-checkbox-wrapper-checked]': 'nzChecked',
                    '(click)': 'hostClick($event)'
                }
            },] }
];
NzCheckboxComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzCheckboxWrapperComponent, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef },
    { type: FocusMonitor }
];
NzCheckboxComponent.propDecorators = {
    inputElement: [{ type: ViewChild, args: ['inputElement', { static: true },] }],
    nzCheckedChange: [{ type: Output }],
    nzValue: [{ type: Input }],
    nzAutoFocus: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzChecked: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCheckboxComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCheckboxComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCheckboxComponent.prototype, "nzIndeterminate", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCheckboxComponent.prototype, "nzChecked", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxGroupComponent {
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

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCheckboxModule {
}
NzCheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, A11yModule],
                declarations: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent],
                exports: [NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxWrapperComponent]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCheckboxComponent, NzCheckboxGroupComponent, NzCheckboxModule, NzCheckboxWrapperComponent };
//# sourceMappingURL=ng-zorro-antd-checkbox.js.map
