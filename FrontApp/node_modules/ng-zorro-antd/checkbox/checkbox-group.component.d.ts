/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BooleanInput, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
export interface NzCheckBoxOptionInterface {
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
}
export declare class NzCheckboxGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef;
    private focusMonitor;
    private cdr;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    onChange: OnChangeType;
    onTouched: OnTouchedType;
    options: NzCheckBoxOptionInterface[];
    nzDisabled: boolean;
    trackByOption(_: number, option: NzCheckBoxOptionInterface): string;
    onCheckedChange(option: NzCheckBoxOptionInterface, checked: boolean): void;
    constructor(elementRef: ElementRef, focusMonitor: FocusMonitor, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(value: NzCheckBoxOptionInterface[]): void;
    registerOnChange(fn: OnChangeType): void;
    registerOnTouched(fn: OnTouchedType): void;
    setDisabledState(disabled: boolean): void;
}
