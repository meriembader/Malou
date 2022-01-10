/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { NzCascaderOption } from './typings';
export declare class NzCascaderOptionComponent {
    private cdr;
    optionTemplate: TemplateRef<NzCascaderOption> | null;
    option: NzCascaderOption;
    activated: boolean;
    highlightText: string;
    nzLabelProperty: string;
    columnIndex: number;
    expandIcon: string | TemplateRef<void>;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2);
    get optionLabel(): string;
    markForCheck(): void;
}
