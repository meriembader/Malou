/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { BooleanInput, NzDirectionVHType, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { NzListGrid } from './interface';
import { NzListFooterComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';
export declare class NzListComponent implements AfterContentInit, OnChanges, OnDestroy {
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzSplit: BooleanInput;
    static ngAcceptInputType_nzGrid: '' | NzListGrid | null | undefined;
    nzDataSource?: NzSafeAny[];
    nzBordered: boolean;
    nzGrid?: NzListGrid | '';
    nzHeader?: string | TemplateRef<void>;
    nzFooter?: string | TemplateRef<void>;
    nzItemLayout: NzDirectionVHType;
    nzRenderItem: TemplateRef<void> | null;
    nzLoading: boolean;
    nzLoadMore: TemplateRef<void> | null;
    nzPagination?: TemplateRef<void>;
    nzSize: NzSizeLDSType;
    nzSplit: boolean;
    nzNoResult?: string | TemplateRef<void>;
    nzListFooterComponent: NzListFooterComponent;
    nzListPaginationComponent: NzListPaginationComponent;
    nzListLoadMoreDirective: NzListLoadMoreDirective;
    hasSomethingAfterLastItem: boolean;
    private itemLayoutNotifySource;
    get itemLayoutNotify$(): Observable<NzDirectionVHType>;
    constructor();
    getSomethingAfterLastItem(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
}
