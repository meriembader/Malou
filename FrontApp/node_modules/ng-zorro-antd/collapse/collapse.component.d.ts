/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzCollapsePanelComponent } from './collapse-panel.component';
export declare class NzCollapseComponent implements OnDestroy {
    nzConfigService: NzConfigService;
    private cdr;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzAccordion: BooleanInput;
    static ngAcceptInputType_nzBordered: BooleanInput;
    static ngAcceptInputType_nzGhost: BooleanInput;
    nzAccordion: boolean;
    nzBordered: boolean;
    nzGhost: boolean;
    nzExpandIconPosition: 'left' | 'right';
    private listOfNzCollapsePanelComponent;
    private destroy$;
    constructor(nzConfigService: NzConfigService, cdr: ChangeDetectorRef);
    addPanel(value: NzCollapsePanelComponent): void;
    removePanel(value: NzCollapsePanelComponent): void;
    click(collapse: NzCollapsePanelComponent): void;
    ngOnDestroy(): void;
}
