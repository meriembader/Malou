import { __decorate, __metadata } from 'tslib';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { DOCUMENT, CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, ChangeDetectorRef, NgZone, Input, Output, NgModule } from '@angular/core';
import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { InputNumber } from 'ng-zorro-antd/core/util';
import { Subject, fromEvent } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'backTop';
class NzBackTopComponent {
    constructor(doc, nzConfigService, scrollSrv, platform, cd, zone) {
        this.doc = doc;
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.platform = platform;
        this.cd = cd;
        this.zone = zone;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.scrollListenerDestroy$ = new Subject();
        this.target = null;
        this.visible = false;
        this.nzVisibilityHeight = 400;
        this.nzDuration = 450;
        this.nzClick = new EventEmitter();
    }
    ngOnInit() {
        this.registerScrollEvent();
    }
    clickBackTop() {
        this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration });
        this.nzClick.emit(true);
    }
    getTarget() {
        return this.target || window;
    }
    handleScroll() {
        if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
            return;
        }
        this.visible = !this.visible;
        this.cd.detectChanges();
    }
    registerScrollEvent() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.scrollListenerDestroy$.next();
        this.handleScroll();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getTarget(), 'scroll')
                .pipe(throttleTime(50), takeUntil(this.scrollListenerDestroy$))
                .subscribe(() => this.handleScroll());
        });
    }
    ngOnDestroy() {
        this.scrollListenerDestroy$.next();
        this.scrollListenerDestroy$.complete();
    }
    ngOnChanges(changes) {
        const { nzTarget } = changes;
        if (nzTarget) {
            this.target = typeof this.nzTarget === 'string' ? this.doc.querySelector(this.nzTarget) : this.nzTarget;
            this.registerScrollEvent();
        }
    }
}
NzBackTopComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-back-top',
                exportAs: 'nzBackTop',
                animations: [fadeMotion],
                template: `
    <div class="ant-back-top" (click)="clickBackTop()" @fadeMotion *ngIf="visible">
      <ng-template #defaultContent>
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon">
            <i nz-icon nzType="vertical-align-top"></i>
          </div>
        </div>
      </ng-template>
      <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] }
];
NzBackTopComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NzConfigService },
    { type: NzScrollService },
    { type: Platform },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
NzBackTopComponent.propDecorators = {
    nzTemplate: [{ type: Input }],
    nzVisibilityHeight: [{ type: Input }],
    nzTarget: [{ type: Input }],
    nzDuration: [{ type: Input }],
    nzClick: [{ type: Output }]
};
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzBackTopComponent.prototype, "nzVisibilityHeight", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzBackTopComponent.prototype, "nzDuration", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBackTopModule {
}
NzBackTopModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzBackTopComponent],
                exports: [NzBackTopComponent],
                imports: [CommonModule, PlatformModule, NzIconModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBackTopComponent, NzBackTopModule };
//# sourceMappingURL=ng-zorro-antd-back-top.js.map
