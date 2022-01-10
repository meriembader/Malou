/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzBreakpointEnum, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzDescriptionsItemComponent } from './descriptions-item.component';
import { NzDescriptionsItemRenderProps, NzDescriptionsLayout, NzDescriptionsSize } from './typings';
export declare class NzDescriptionsComponent implements OnChanges, OnDestroy, AfterContentInit {
    nzConfigService: NzConfigService;
    private cdr;
    private breakpointService;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzColon: BooleanInput;
    items: QueryList<NzDescriptionsItemComponent>;
    nzBordered: boolean;
    nzLayout: NzDescriptionsLayout;
    nzColumn: number | {
        [key in NzBreakpointEnum]: number;
    };
    nzSize: NzDescriptionsSize;
    nzTitle: string | TemplateRef<void>;
    nzExtra?: string | TemplateRef<void>;
    nzColon: boolean;
    itemMatrix: NzDescriptionsItemRenderProps[][];
    realColumn: number;
    private breakpoint;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef, breakpointService: NzBreakpointService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /**
     * Prepare the render matrix according to description items' spans.
     */
    private prepareMatrix;
    private getColumn;
}
