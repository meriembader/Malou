/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
export declare class NzTreeNodeTitleComponent {
    searchValue: string;
    treeTemplate: TemplateRef<{
        $implicit: NzTreeNode;
        origin: NzTreeNodeOptions;
    }> | null;
    draggable: boolean;
    showIcon: boolean;
    selectMode: boolean;
    context: NzTreeNode;
    icon: string;
    title: string;
    isLoading: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isMatched: boolean;
    isExpanded: boolean;
    isLeaf: boolean;
    get canDraggable(): boolean | null;
    get matchedValue(): string;
    get isSwitcherOpen(): boolean;
    get isSwitcherClose(): boolean;
}
