/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from './pagination.types';
export declare class NzPaginationSimpleComponent implements OnChanges {
    template: TemplateRef<NzSafeAny>;
    itemRender: TemplateRef<PaginationItemRenderContext> | null;
    disabled: boolean;
    locale: NzPaginationI18nInterface;
    total: number;
    pageIndex: number;
    pageSize: number;
    readonly pageIndexChange: EventEmitter<number>;
    lastIndex: number;
    isFirstIndex: boolean;
    isLastIndex: boolean;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    jumpToPageViaInput($event: Event): void;
    prePage(): void;
    nextPage(): void;
    onPageIndexChange(index: number): void;
    updateBindingValue(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
