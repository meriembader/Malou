/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzInputDirective } from './input.directive';
export declare class NzInputGroupWhitSuffixOrPrefixDirective {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare class NzInputGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
    private focusMonitor;
    private elementRef;
    private cdr;
    static ngAcceptInputType_nzSearch: BooleanInput;
    static ngAcceptInputType_nzCompact: BooleanInput;
    listOfNzInputDirective: QueryList<NzInputDirective>;
    nzAddOnBeforeIcon?: string | null;
    nzAddOnAfterIcon?: string | null;
    nzPrefixIcon?: string | null;
    nzSuffixIcon?: string | null;
    nzAddOnBefore?: string | TemplateRef<void>;
    nzAddOnAfter?: string | TemplateRef<void>;
    nzPrefix?: string | TemplateRef<void>;
    nzSuffix?: string | TemplateRef<void>;
    nzSize: NzSizeLDSType;
    nzSearch: boolean;
    nzCompact: boolean;
    isLarge: boolean;
    isSmall: boolean;
    isAffix: boolean;
    isAddOn: boolean;
    focused: boolean;
    disabled: boolean;
    private destroy$;
    constructor(focusMonitor: FocusMonitor, elementRef: ElementRef, cdr: ChangeDetectorRef);
    updateChildrenInputSize(): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
