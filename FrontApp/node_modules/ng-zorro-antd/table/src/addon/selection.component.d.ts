/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { EventEmitter } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
export declare class NzTableSelectionComponent {
    listOfSelections: Array<{
        text: string;
        onSelect(...args: NzSafeAny[]): NzSafeAny;
    }>;
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    showCheckbox: boolean;
    showRowSelection: boolean;
    readonly checkedChange: EventEmitter<boolean>;
    onCheckedChange(checked: boolean): void;
}
