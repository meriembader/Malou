import { __decorate, __metadata } from 'tslib';
import { Component, ViewEncapsulation, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber, InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject, BehaviorSubject, ReplaySubject, timer } from 'rxjs';
import { startWith, distinctUntilChanged, switchMap, debounce, takeUntil } from 'rxjs/operators';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'spin';
class NzSpinComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzIndicator = null;
        this.nzSize = 'default';
        this.nzTip = null;
        this.nzDelay = 0;
        this.nzSimple = false;
        this.nzSpinning = true;
        this.destroy$ = new Subject();
        this.spinning$ = new BehaviorSubject(this.nzSpinning);
        this.delay$ = new ReplaySubject(1);
        this.isLoading = false;
    }
    ngOnInit() {
        const loading$ = this.delay$.pipe(startWith(this.nzDelay), distinctUntilChanged(), switchMap(delay => {
            if (delay === 0) {
                return this.spinning$;
            }
            return this.spinning$.pipe(debounce(spinning => timer(spinning ? delay : 0)));
        }), takeUntil(this.destroy$));
        loading$.subscribe(loading => {
            this.isLoading = loading;
            this.cdr.markForCheck();
        });
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
    }
    ngOnChanges(changes) {
        const { nzSpinning, nzDelay } = changes;
        if (nzSpinning) {
            this.spinning$.next(this.nzSpinning);
        }
        if (nzDelay) {
            this.delay$.next(this.nzDelay);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSpinComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-spin',
                exportAs: 'nzSpin',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ant-spin"
        [class.ant-spin-spinning]="isLoading"
        [class.ant-spin-lg]="nzSize === 'large'"
        [class.ant-spin-sm]="nzSize === 'small'"
        [class.ant-spin-show-text]="nzTip"
      >
        <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
        <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
      </div>
    </div>
    <div *ngIf="!nzSimple" class="ant-spin-container" [class.ant-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `,
                host: {
                    '[class.ant-spin-nested-loading]': '!nzSimple'
                }
            },] }
];
NzSpinComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzSpinComponent.propDecorators = {
    nzIndicator: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzTip: [{ type: Input }],
    nzDelay: [{ type: Input }],
    nzSimple: [{ type: Input }],
    nzSpinning: [{ type: Input }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzIndicator", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzDelay", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzSimple", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzSpinning", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzSpinModule {
}
NzSpinModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzSpinComponent],
                declarations: [NzSpinComponent],
                imports: [CommonModule, ObserversModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzSpinComponent, NzSpinModule };
//# sourceMappingURL=ng-zorro-antd-spin.js.map
