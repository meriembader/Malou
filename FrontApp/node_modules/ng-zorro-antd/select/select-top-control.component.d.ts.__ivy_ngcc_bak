/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectItemInterface, NzSelectModeType, NzSelectTopControlItemType } from './select.types';
export declare class NzSelectTopControlComponent implements OnChanges {
    noAnimation?: NzNoAnimationDirective | undefined;
    showSearch: boolean;
    placeHolder: string | TemplateRef<NzSafeAny> | null;
    open: boolean;
    maxTagCount: number;
    autofocus: boolean;
    disabled: boolean;
    mode: NzSelectModeType;
    customTemplate: TemplateRef<{
        $implicit: NzSelectItemInterface;
    }> | null;
    maxTagPlaceholder: TemplateRef<{
        $implicit: NzSafeAny[];
    }> | null;
    removeIcon: TemplateRef<NzSafeAny> | null;
    listOfTopItem: NzSelectItemInterface[];
    tokenSeparators: string[];
    readonly tokenize: EventEmitter<string[]>;
    readonly inputValueChange: EventEmitter<string>;
    readonly animationEnd: EventEmitter<void>;
    readonly deleteItem: EventEmitter<NzSelectItemInterface>;
    readonly openChange: EventEmitter<boolean>;
    nzSelectSearchComponent: NzSelectSearchComponent;
    listOfSlicedItem: NzSelectTopControlItemType[];
    isShowPlaceholder: boolean;
    isShowSingleLabel: boolean;
    isComposing: boolean;
    inputValue: string | null;
    onHostClick(): void;
    onHostKeydown(e: KeyboardEvent): void;
    updateTemplateVariable(): void;
    isComposingChange(isComposing: boolean): void;
    onInputValueChange(value: string): void;
    tokenSeparate(inputValue: string, tokenSeparators: string[]): void;
    clearInputValue(): void;
    focus(): void;
    blur(): void;
    trackValue(_index: number, option: NzSelectTopControlItemType): NzSafeAny;
    onDeleteItem(item: NzSelectItemInterface): void;
    onAnimationEnd(): void;
    constructor(noAnimation?: NzNoAnimationDirective | undefined);
    ngOnChanges(changes: SimpleChanges): void;
}
