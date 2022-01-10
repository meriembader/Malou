/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzTableSortOrder } from '../table.types';
export declare class NzTableSortersComponent implements OnChanges {
    sortDirections: NzTableSortOrder[];
    sortOrder: NzTableSortOrder;
    contentTemplate: TemplateRef<NzSafeAny> | null;
    isUp: boolean;
    isDown: boolean;
    ngOnChanges(changes: SimpleChanges): void;
}
