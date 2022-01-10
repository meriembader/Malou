import { __decorate, __metadata } from 'tslib';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgModule } from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const badgePresetColors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'badge';
class NzBadgeComponent {
    constructor(nzConfigService) {
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.showSup = false;
        this.presetColor = null;
        this.nzShowZero = false;
        this.nzShowDot = true;
        this.nzStandalone = false;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.nzColor = undefined;
        this.nzStyle = null;
        this.nzText = null;
    }
    ngOnChanges(changes) {
        const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
        if (nzShowDot || nzDot || nzCount || nzShowZero) {
            this.showSup = (this.nzShowDot && this.nzDot) || this.nzCount > 0 || (this.nzCount <= 0 && this.nzShowZero);
        }
    }
}
NzBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-badge',
                exportAs: 'nzBadge',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [zoomBadgeMotion],
                template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor)"
        [nzCount]="nzCount"
      ></nz-badge-sup>
    </ng-container>
  `,
                host: {
                    '[class.ant-badge]': 'true',
                    '[class.ant-badge-status]': 'nzStatus',
                    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
                }
            },] }
];
NzBadgeComponent.ctorParameters = () => [
    { type: NzConfigService }
];
NzBadgeComponent.propDecorators = {
    nzShowZero: [{ type: Input }],
    nzShowDot: [{ type: Input }],
    nzStandalone: [{ type: Input }],
    nzDot: [{ type: Input }],
    nzOverflowCount: [{ type: Input }],
    nzColor: [{ type: Input }],
    nzStyle: [{ type: Input }],
    nzText: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzCount: [{ type: Input }],
    nzOffset: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzBadgeComponent.prototype, "nzShowZero", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzShowDot", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzStandalone", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzDot", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Number)
], NzBadgeComponent.prototype, "nzOverflowCount", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzBadgeComponent.prototype, "nzColor", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBadgeSupComponent {
    constructor() {
        this.nzStyle = null;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.disableAnimation = false;
        this.maxNumberArray = [];
        this.countArray = [];
        this.count = 0;
        this.countSingleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    generateMaxNumberArray() {
        this.maxNumberArray = this.nzOverflowCount.toString().split('');
    }
    ngOnInit() {
        this.generateMaxNumberArray();
    }
    ngOnChanges(changes) {
        const { nzOverflowCount, nzCount } = changes;
        if (nzCount && typeof nzCount.currentValue === 'number') {
            this.count = Math.max(0, nzCount.currentValue);
            this.countArray = this.count
                .toString()
                .split('')
                .map(item => +item);
        }
        if (nzOverflowCount) {
            this.generateMaxNumberArray();
        }
    }
}
NzBadgeSupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-badge-sup',
                exportAs: 'nzBadgeSup',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [zoomBadgeMotion],
                template: `
    <ng-container *ngIf="count <= nzOverflowCount; else overflowTemplate">
      <span
        *ngFor="let n of maxNumberArray; let i = index"
        class="ant-scroll-number-only"
        [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
      >
        <ng-container *ngIf="!nzDot && countArray[i] !== undefined">
          <p *ngFor="let p of countSingleArray" class="ant-scroll-number-only-unit" [class.current]="p === countArray[i]">
            {{ p }}
          </p>
        </ng-container>
      </span>
    </ng-container>
    <ng-template #overflowTemplate>{{ nzOverflowCount }}+</ng-template>
  `,
                host: {
                    '[@.disabled]': `disableAnimation`,
                    '[@zoomBadgeMotion]': '',
                    '[attr.title]': `nzTitle === null ? '' : nzTitle || nzCount`,
                    '[style]': `nzStyle`,
                    '[style.right.px]': `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
                    '[style.margin-top.px]': `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
                    '[class.ant-scroll-number]': 'true',
                    '[class.ant-badge-count]': `!nzDot`,
                    '[class.ant-badge-dot]': `nzDot`,
                    '[class.ant-badge-multiple-words]': `countArray.length >= 2`
                }
            },] }
];
NzBadgeSupComponent.propDecorators = {
    nzOffset: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStyle: [{ type: Input }],
    nzDot: [{ type: Input }],
    nzOverflowCount: [{ type: Input }],
    disableAnimation: [{ type: Input }],
    nzCount: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRibbonComponent {
    constructor() {
        this.nzPlacement = 'end';
        this.nzText = null;
        this.presetColor = null;
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
    }
}
NzRibbonComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-ribbon',
                exportAs: 'nzRibbon',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `,
                host: {
                    '[class.ant-ribbon-wrapper]': 'true'
                }
            },] }
];
NzRibbonComponent.propDecorators = {
    nzColor: [{ type: Input }],
    nzPlacement: [{ type: Input }],
    nzText: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBadgeModule {
}
NzBadgeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzBadgeComponent, NzBadgeSupComponent, NzRibbonComponent],
                exports: [NzBadgeComponent, NzRibbonComponent],
                imports: [CommonModule, ObserversModule, NzOutletModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBadgeComponent, NzBadgeModule, NzBadgeSupComponent as ɵa, NzRibbonComponent as ɵb };
//# sourceMappingURL=ng-zorro-antd-badge.js.map
