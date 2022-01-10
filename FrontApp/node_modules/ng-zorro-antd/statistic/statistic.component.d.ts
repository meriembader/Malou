/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { NzStatisticValueType } from './typings';
export declare class NzStatisticComponent {
    nzPrefix?: string | TemplateRef<void>;
    nzSuffix?: string | TemplateRef<void>;
    nzTitle?: string | TemplateRef<void>;
    nzValue?: NzStatisticValueType;
    nzValueStyle: NgStyleInterface;
    nzValueTemplate?: TemplateRef<{
        $implicit: NzStatisticValueType;
    }>;
}
