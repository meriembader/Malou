import { __decorate, __metadata } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, EventEmitter, Host, Output, NgModule } from '@angular/core';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'collapse';
class NzCollapseComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAccordion = false;
        this.nzBordered = true;
        this.nzGhost = false;
        this.nzExpandIconPosition = 'left';
        this.listOfNzCollapsePanelComponent = [];
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    addPanel(value) {
        this.listOfNzCollapsePanelComponent.push(value);
    }
    removePanel(value) {
        this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
    }
    click(collapse) {
        if (this.nzAccordion && !collapse.nzActive) {
            this.listOfNzCollapsePanelComponent
                .filter(item => item !== collapse)
                .forEach(item => {
                if (item.nzActive) {
                    item.nzActive = false;
                    item.nzActiveChange.emit(item.nzActive);
                    item.markForCheck();
                }
            });
        }
        collapse.nzActive = !collapse.nzActive;
        collapse.nzActiveChange.emit(collapse.nzActive);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCollapseComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-collapse',
                exportAs: 'nzCollapse',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-collapse]': 'true',
                    '[class.ant-collapse-icon-position-left]': `nzExpandIconPosition === 'left'`,
                    '[class.ant-collapse-icon-position-right]': `nzExpandIconPosition === 'right'`,
                    '[class.ant-collapse-ghost]': `nzGhost`,
                    '[class.ant-collapse-borderless]': '!nzBordered'
                }
            },] }
];
NzCollapseComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzCollapseComponent.propDecorators = {
    nzAccordion: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzExpandIconPosition: [{ type: Input }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzAccordion", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzGhost", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME$1 = 'collapsePanel';
class NzCollapsePanelComponent {
    constructor(nzConfigService, cdr, nzCollapseComponent) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzCollapseComponent = nzCollapseComponent;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME$1;
        this.nzActive = false;
        this.nzDisabled = false;
        this.nzShowArrow = true;
        this.nzActiveChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME$1)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    clickHeader() {
        if (!this.nzDisabled) {
            this.nzCollapseComponent.click(this);
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.nzCollapseComponent.addPanel(this);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.nzCollapseComponent.removePanel(this);
    }
}
NzCollapsePanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-collapse-panel',
                exportAs: 'nzCollapsePanel',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [collapseMotion],
                template: `
    <div role="tab" [attr.aria-expanded]="nzActive" class="ant-collapse-header" (click)="clickHeader()">
      <ng-container *ngIf="nzShowArrow">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
          <i nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0"></i>
        </ng-container>
      </ng-container>
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      <div class="ant-collapse-extra" *ngIf="nzExtra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div class="ant-collapse-content" [class.ant-collapse-content-active]="nzActive" [@collapseMotion]="nzActive ? 'expanded' : 'hidden'">
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
                host: {
                    '[class.ant-collapse-item]': 'true',
                    '[class.ant-collapse-no-arrow]': '!nzShowArrow',
                    '[class.ant-collapse-item-active]': 'nzActive',
                    '[class.ant-collapse-item-disabled]': 'nzDisabled'
                }
            },] }
];
NzCollapsePanelComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzCollapseComponent, decorators: [{ type: Host }] }
];
NzCollapsePanelComponent.propDecorators = {
    nzActive: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzShowArrow: [{ type: Input }],
    nzExtra: [{ type: Input }],
    nzHeader: [{ type: Input }],
    nzExpandedIcon: [{ type: Input }],
    nzActiveChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCollapsePanelComponent.prototype, "nzActive", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCollapsePanelComponent.prototype, "nzDisabled", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapsePanelComponent.prototype, "nzShowArrow", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCollapseModule {
}
NzCollapseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzCollapsePanelComponent, NzCollapseComponent],
                exports: [NzCollapsePanelComponent, NzCollapseComponent],
                imports: [CommonModule, NzIconModule, NzOutletModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCollapseComponent, NzCollapseModule, NzCollapsePanelComponent };
//# sourceMappingURL=ng-zorro-antd-collapse.js.map
