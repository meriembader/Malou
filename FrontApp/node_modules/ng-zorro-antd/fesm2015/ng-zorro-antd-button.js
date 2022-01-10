import { __decorate, __metadata } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Renderer2, ContentChild, Input, NgModule } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { takeUntil, startWith, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ɵNzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'button';
class NzButtonComponent {
    constructor(elementRef, cdr, renderer, nzConfigService) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.renderer = renderer;
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBlock = false;
        this.nzGhost = false;
        this.nzSearch = false;
        this.nzLoading = false;
        this.nzDanger = false;
        this.disabled = false;
        this.tabIndex = null;
        this.nzType = null;
        this.nzShape = null;
        this.nzSize = 'default';
        this.destroy$ = new Subject();
        this.loading$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    insertSpan(nodes, renderer) {
        nodes.forEach(node => {
            if (node.nodeName === '#text') {
                const span = renderer.createElement('span');
                const parent = renderer.parentNode(node);
                renderer.insertBefore(parent, span, node);
                renderer.appendChild(span, node);
            }
        });
    }
    assertIconOnly(element, renderer) {
        const listOfNode = Array.from(element.childNodes);
        const iconCount = listOfNode.filter(node => node.nodeName === 'I').length;
        const noText = listOfNode.every(node => node.nodeName !== '#text');
        const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
        const isIconOnly = noSpan && noText && iconCount >= 1;
        if (isIconOnly) {
            renderer.addClass(element, 'ant-btn-icon-only');
        }
    }
    ngOnChanges(changes) {
        const { nzLoading } = changes;
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
    }
    ngAfterViewInit() {
        this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
        this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
    }
    ngAfterContentInit() {
        this.loading$
            .pipe(startWith(this.nzLoading), filter(() => !!this.nzIconDirectiveElement), takeUntil(this.destroy$))
            .subscribe(loading => {
            const nativeElement = this.nzIconDirectiveElement.nativeElement;
            if (loading) {
                this.renderer.setStyle(nativeElement, 'display', 'none');
            }
            else {
                this.renderer.removeStyle(nativeElement, 'display');
            }
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'button[nz-button], a[nz-button]',
                exportAs: 'nzButton',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-btn]': `true`,
                    '[class.ant-btn-primary]': `nzType === 'primary'`,
                    '[class.ant-btn-dashed]': `nzType === 'dashed'`,
                    '[class.ant-btn-link]': `nzType === 'link'`,
                    '[class.ant-btn-text]': `nzType === 'text'`,
                    '[class.ant-btn-danger]': `nzType === 'danger'`,
                    '[class.ant-btn-circle]': `nzShape === 'circle'`,
                    '[class.ant-btn-round]': `nzShape === 'round'`,
                    '[class.ant-btn-lg]': `nzSize === 'large'`,
                    '[class.ant-btn-sm]': `nzSize === 'small'`,
                    '[class.ant-btn-dangerous]': `nzDanger`,
                    '[class.ant-btn-loading]': `nzLoading`,
                    '[class.ant-btn-background-ghost]': `nzGhost`,
                    '[class.ant-btn-block]': `nzBlock`,
                    '[class.ant-input-search-button]': `nzSearch`,
                    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
                    '[attr.disabled]': 'disabled || null'
                }
            },] }
];
NzButtonComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: NzConfigService }
];
NzButtonComponent.propDecorators = {
    nzIconDirectiveElement: [{ type: ContentChild, args: [NzIconDirective, { read: ElementRef },] }],
    nzBlock: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzSearch: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzDanger: [{ type: Input }],
    disabled: [{ type: Input }],
    tabIndex: [{ type: Input }],
    nzType: [{ type: Input }],
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzBlock", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzGhost", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzButtonComponent.prototype, "disabled", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzButtonComponent.prototype, "nzSize", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzButtonGroupComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-button-group',
                exportAs: 'nzButtonGroup',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-btn-group]': `true`,
                    '[class.ant-btn-group-lg]': `nzSize === 'large'`,
                    '[class.ant-btn-group-sm]': `nzSize === 'small'`
                },
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `
            },] }
];
NzButtonGroupComponent.propDecorators = {
    nzSize: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzButtonModule {
}
NzButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzButtonComponent, NzButtonGroupComponent],
                exports: [NzButtonComponent, NzButtonGroupComponent, ɵNzTransitionPatchModule, NzWaveModule],
                imports: [CommonModule, NzWaveModule, NzIconModule, ɵNzTransitionPatchModule]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzButtonComponent, NzButtonGroupComponent, NzButtonModule };
//# sourceMappingURL=ng-zorro-antd-button.js.map
