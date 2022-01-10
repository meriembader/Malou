import { __decorate, __metadata } from 'tslib';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Renderer2, ElementRef, Input, Output, NgModule } from '@angular/core';
import { isPresetColor } from 'ng-zorro-antd/core/color';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTagComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.isPresetColor = false;
        this.nzMode = 'default';
        this.nzChecked = false;
        this.nzOnClose = new EventEmitter();
        this.nzCheckedChange = new EventEmitter();
    }
    updateCheckedStatus() {
        if (this.nzMode === 'checkable') {
            this.nzChecked = !this.nzChecked;
            this.nzCheckedChange.emit(this.nzChecked);
        }
    }
    closeTag(e) {
        this.nzOnClose.emit(e);
        if (!e.defaultPrevented) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            if (!this.nzColor) {
                this.isPresetColor = false;
            }
            else {
                this.isPresetColor = isPresetColor(this.nzColor) || /^(success|processing|error|default|warning)$/.test(this.nzColor);
            }
        }
    }
}
NzTagComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tag',
                exportAs: 'nzTag',
                preserveWhitespaces: false,
                template: `
    <ng-content></ng-content>
    <i nz-icon nzType="close" class="ant-tag-close-icon" *ngIf="nzMode === 'closeable'" tabindex="-1" (click)="closeTag($event)"></i>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[style.background-color]': `isPresetColor ? '' : nzColor`,
                    '[class]': `isPresetColor ? ('ant-tag-' + nzColor) : ''`,
                    '[class.ant-tag]': `true`,
                    '[class.ant-tag-has-color]': `nzColor && !isPresetColor`,
                    '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
                    '[class.ant-tag-checkable-checked]': `nzChecked`,
                    '(click)': 'updateCheckedStatus()'
                }
            },] }
];
NzTagComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzTagComponent.propDecorators = {
    nzMode: [{ type: Input }],
    nzColor: [{ type: Input }],
    nzChecked: [{ type: Input }],
    nzOnClose: [{ type: Output }],
    nzCheckedChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTagComponent.prototype, "nzChecked", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTagModule {
}
NzTagModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NzIconModule],
                declarations: [NzTagComponent],
                exports: [NzTagComponent]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzTagComponent, NzTagModule };
//# sourceMappingURL=ng-zorro-antd-tag.js.map
