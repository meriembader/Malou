/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzBadgeStatusType } from './types';
export declare class NzBadgeComponent implements OnChanges {
    nzConfigService: NzConfigService;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzShowZero: BooleanInput;
    static ngAcceptInputType_nzShowDot: BooleanInput;
    static ngAcceptInputType_nzDot: BooleanInput;
    static ngAcceptInputType_nzStandalone: BooleanInput;
    showSup: boolean;
    presetColor: string | null;
    nzShowZero: boolean;
    nzShowDot: boolean;
    nzStandalone: boolean;
    nzDot: boolean;
    nzOverflowCount: number;
    nzColor?: string;
    nzStyle: {
        [key: string]: string;
    } | null;
    nzText?: string | TemplateRef<void> | null;
    nzTitle?: string | null | undefined;
    nzStatus?: NzBadgeStatusType | string;
    nzCount?: number | TemplateRef<NzSafeAny>;
    nzOffset?: [number, number];
    constructor(nzConfigService: NzConfigService);
    ngOnChanges(changes: SimpleChanges): void;
}
