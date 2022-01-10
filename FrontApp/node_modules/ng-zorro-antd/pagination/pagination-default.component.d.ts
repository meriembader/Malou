/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, EventEmitter, OnChanges, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { NzPaginationItemComponent } from './pagination-item.component';
import { PaginationItemRenderContext } from './pagination.types';
export declare class NzPaginationDefaultComponent implements OnChanges {
    template: TemplateRef<NzSafeAny>;
    nzSize: 'default' | 'small';
    itemRender: TemplateRef<PaginationItemRenderContext> | null;
    showTotal: TemplateRef<{
        $implicit: number;
        range: [number, number];
    }> | null;
    disabled: boolean;
    locale: NzPaginationI18nInterface;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
    total: number;
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
    readonly pageIndexChange: EventEmitter<number>;
    readonly pageSizeChange: EventEmitter<number>;
    ranges: number[];
    listOfPageItem: Array<Partial<NzPaginationItemComponent>>;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    jumpPage(index: number): void;
    jumpDiff(diff: number): void;
    trackByPageItem(_: number, value: Partial<NzPaginationItemComponent>): string;
    onPageIndexChange(index: number): void;
    onPageSizeChange(size: number): void;
    getLastIndex(total: number, pageSize: number): number;
    buildIndexes(): void;
    getListOfPageItem(pageIndex: number, lastIndex: number): Array<Partial<NzPaginationItemComponent>>;
    ngOnChanges(changes: SimpleChanges): void;
}
