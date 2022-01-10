/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzBreakpointService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NumberInput } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzPaginationI18nInterface } from 'ng-zorro-antd/i18n';
import { PaginationItemRenderContext } from './pagination.types';
export declare class NzPaginationComponent implements OnInit, OnDestroy, OnChanges {
    private i18n;
    private cdr;
    private breakpointService;
    static ngAcceptInputType_nzDisabled: BooleanInput;
    static ngAcceptInputType_nzShowSizeChanger: BooleanInput;
    static ngAcceptInputType_nzHideOnSinglePage: BooleanInput;
    static ngAcceptInputType_nzShowQuickJumper: BooleanInput;
    static ngAcceptInputType_nzSimple: BooleanInput;
    static ngAcceptInputType_nzResponsive: BooleanInput;
    static ngAcceptInputType_nzTotal: NumberInput;
    static ngAcceptInputType_nzPageIndex: NumberInput;
    static ngAcceptInputType_nzPageSize: NumberInput;
    readonly nzPageSizeChange: EventEmitter<number>;
    readonly nzPageIndexChange: EventEmitter<number>;
    nzShowTotal: TemplateRef<{
        $implicit: number;
        range: [number, number];
    }> | null;
    nzSize: 'default' | 'small';
    nzPageSizeOptions: number[];
    nzItemRender: TemplateRef<PaginationItemRenderContext> | null;
    nzDisabled: boolean;
    nzShowSizeChanger: boolean;
    nzHideOnSinglePage: boolean;
    nzShowQuickJumper: boolean;
    nzSimple: boolean;
    nzResponsive: boolean;
    nzTotal: number;
    nzPageIndex: number;
    nzPageSize: number;
    showPagination: boolean;
    locale: NzPaginationI18nInterface;
    size: 'default' | 'small';
    private destroy$;
    private total$;
    validatePageIndex(value: number, lastIndex: number): number;
    onPageIndexChange(index: number): void;
    onPageSizeChange(size: number): void;
    onTotalChange(total: number): void;
    getLastIndex(total: number, pageSize: number): number;
    constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, breakpointService: NzBreakpointService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
