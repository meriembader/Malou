/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { NzPresetColor } from 'ng-zorro-antd/core/color';
import { BooleanInput } from 'ng-zorro-antd/core/types';
export declare class NzTagComponent implements OnChanges {
    private renderer;
    private elementRef;
    static ngAcceptInputType_nzChecked: BooleanInput;
    isPresetColor: boolean;
    nzMode: 'default' | 'closeable' | 'checkable';
    nzColor?: string | NzPresetColor;
    nzChecked: boolean;
    readonly nzOnClose: EventEmitter<MouseEvent>;
    readonly nzCheckedChange: EventEmitter<boolean>;
    updateCheckedStatus(): void;
    closeTag(e: MouseEvent): void;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
}
