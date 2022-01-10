/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
const NZ_CONFIG_MODULE_NAME = 'avatar';
export class NzAvatarComponent {
    constructor(nzConfigService, elementRef, cdr, platform) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.nzGap = 4;
        this.nzError = new EventEmitter();
        this.hasText = false;
        this.hasSrc = true;
        this.hasIcon = false;
        this.textStyles = {};
        this.classMap = {};
        this.customSize = null;
        this.el = this.elementRef.nativeElement;
    }
    imgError($event) {
        this.nzError.emit($event);
        if (!$event.defaultPrevented) {
            this.hasSrc = false;
            this.hasIcon = false;
            this.hasText = false;
            if (this.nzIcon) {
                this.hasIcon = true;
            }
            else if (this.nzText) {
                this.hasText = true;
            }
            this.cdr.detectChanges();
            this.setSizeStyle();
            this.notifyCalc();
        }
    }
    ngOnChanges() {
        this.hasText = !this.nzSrc && !!this.nzText;
        this.hasIcon = !this.nzSrc && !!this.nzIcon;
        this.hasSrc = !!this.nzSrc;
        this.setSizeStyle();
        this.notifyCalc();
    }
    calcStringSize() {
        if (!this.hasText) {
            return;
        }
        const childrenWidth = this.textEl.nativeElement.offsetWidth;
        const avatarWidth = this.el.getBoundingClientRect().width;
        const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
        const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
        this.textStyles = {
            transform: `scale(${scale}) translateX(-50%)`
        };
        if (this.customSize) {
            Object.assign(this.textStyles, {
                lineHeight: this.customSize
            });
        }
        this.cdr.detectChanges();
    }
    notifyCalc() {
        // If use ngAfterViewChecked, always demands more computations, so......
        if (this.platform.isBrowser) {
            setTimeout(() => {
                this.calcStringSize();
            });
        }
    }
    setSizeStyle() {
        if (typeof this.nzSize === 'number') {
            this.customSize = `${this.nzSize}px`;
        }
        else {
            this.customSize = null;
        }
        this.cdr.markForCheck();
    }
}
NzAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-avatar',
                exportAs: 'nzAvatar',
                template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
                host: {
                    '[class.ant-avatar]': 'true',
                    '[class.ant-avatar-lg]': `nzSize === 'large'`,
                    '[class.ant-avatar-sm]': `nzSize === 'small'`,
                    '[class.ant-avatar-square]': `nzShape === 'square'`,
                    '[class.ant-avatar-circle]': `nzShape === 'circle'`,
                    '[class.ant-avatar-icon]': `nzIcon`,
                    '[class.ant-avatar-image]': `hasSrc `,
                    '[style.width]': 'customSize',
                    '[style.height]': 'customSize',
                    '[style.line-height]': 'customSize',
                    // nzSize type is number when customSize is true
                    '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] }
];
NzAvatarComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Platform }
];
NzAvatarComponent.propDecorators = {
    nzShape: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzGap: [{ type: Input }],
    nzText: [{ type: Input }],
    nzSrc: [{ type: Input }],
    nzSrcSet: [{ type: Input }],
    nzAlt: [{ type: Input }],
    nzIcon: [{ type: Input }],
    nzError: [{ type: Output }],
    textEl: [{ type: ViewChild, args: ['textEl', { static: false },] }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzAvatarComponent.prototype, "nzShape", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzAvatarComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Object)
], NzAvatarComponent.prototype, "nzGap", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYXZhdGFyLyIsInNvdXJjZXMiOlsiYXZhdGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV0RCxNQUFNLHFCQUFxQixHQUFnQixRQUFRLENBQUM7QUE0QnBELE1BQU0sT0FBTyxpQkFBaUI7SUF5QjVCLFlBQ1MsZUFBZ0MsRUFDL0IsVUFBc0IsRUFDdEIsR0FBc0IsRUFDdEIsUUFBa0I7UUFIbkIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTFCbkIsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFDckMsWUFBTyxHQUFrQixRQUFRLENBQUM7UUFDbEMsV0FBTSxHQUEyQixTQUFTLENBQUM7UUFDNUIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQU03QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUV2RCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQXFCLEVBQUUs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NEM7QUFDNUI7SUFBNUIsVUFBVSxFQUFFO0lBQUUsV0FBVyxFQUFFOztnREFBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTmdDbGFzc0ludGVyZmFjZSwgTmdTdHlsZUludGVyZmFjZSwgTnVtYmVySW5wdXQsIE56U2hhcGVTQ1R5cGUsIE56U2l6ZUxEU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYXZhdGFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYXZhdGFyJyxcbiAgZXhwb3J0QXM6ICduekF2YXRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiAqbmdJZj1cIm56SWNvbiAmJiBoYXNJY29uXCIgW256VHlwZV09XCJuekljb25cIj48L2k+XG4gICAgPGltZyAqbmdJZj1cIm56U3JjICYmIGhhc1NyY1wiIFtzcmNdPVwibnpTcmNcIiBbYXR0ci5zcmNzZXRdPVwibnpTcmNTZXRcIiBbYXR0ci5hbHRdPVwibnpBbHRcIiAoZXJyb3IpPVwiaW1nRXJyb3IoJGV2ZW50KVwiIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtYXZhdGFyLXN0cmluZ1wiICN0ZXh0RWwgW25nU3R5bGVdPVwidGV4dFN0eWxlc1wiICpuZ0lmPVwibnpUZXh0ICYmIGhhc1RleHRcIj57eyBuelRleHQgfX08L3NwYW4+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1hdmF0YXJdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1sZ10nOiBgbnpTaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItc21dJzogYG56U2l6ZSA9PT0gJ3NtYWxsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYXZhdGFyLXNxdWFyZV0nOiBgbnpTaGFwZSA9PT0gJ3NxdWFyZSdgLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1jaXJjbGVdJzogYG56U2hhcGUgPT09ICdjaXJjbGUnYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItaWNvbl0nOiBgbnpJY29uYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItaW1hZ2VdJzogYGhhc1NyYyBgLFxuICAgICdbc3R5bGUud2lkdGhdJzogJ2N1c3RvbVNpemUnLFxuICAgICdbc3R5bGUuaGVpZ2h0XSc6ICdjdXN0b21TaXplJyxcbiAgICAnW3N0eWxlLmxpbmUtaGVpZ2h0XSc6ICdjdXN0b21TaXplJyxcbiAgICAvLyBuelNpemUgdHlwZSBpcyBudW1iZXIgd2hlbiBjdXN0b21TaXplIGlzIHRydWVcbiAgICAnW3N0eWxlLmZvbnQtc2l6ZS5weF0nOiAnKGhhc0ljb24gJiYgY3VzdG9tU2l6ZSkgPyAkYW55KG56U2l6ZSkgLyAyIDogbnVsbCdcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE56QXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2FwOiBOdW1iZXJJbnB1dDtcblxuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNoYXBlOiBOelNoYXBlU0NUeXBlID0gJ2NpcmNsZSc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOelNpemVMRFNUeXBlIHwgbnVtYmVyID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dE51bWJlcigpIG56R2FwID0gNDtcbiAgQElucHV0KCkgbnpUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuelNyYz86IHN0cmluZztcbiAgQElucHV0KCkgbnpTcmNTZXQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56QWx0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmc7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICBoYXNUZXh0OiBib29sZWFuID0gZmFsc2U7XG4gIGhhc1NyYzogYm9vbGVhbiA9IHRydWU7XG4gIGhhc0ljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGV4dFN0eWxlczogTmdTdHlsZUludGVyZmFjZSA9IHt9O1xuICBjbGFzc01hcDogTmdDbGFzc0ludGVyZmFjZSA9IHt9O1xuICBjdXN0b21TaXplOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBAVmlld0NoaWxkKCd0ZXh0RWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dEVsPzogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtXG4gICkge31cblxuICBpbWdFcnJvcigkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5uekVycm9yLmVtaXQoJGV2ZW50KTtcbiAgICBpZiAoISRldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLmhhc1NyYyA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNJY29uID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc1RleHQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLm56SWNvbikge1xuICAgICAgICB0aGlzLmhhc0ljb24gPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm56VGV4dCkge1xuICAgICAgICB0aGlzLmhhc1RleHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5zZXRTaXplU3R5bGUoKTtcbiAgICAgIHRoaXMubm90aWZ5Q2FsYygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzVGV4dCA9ICF0aGlzLm56U3JjICYmICEhdGhpcy5uelRleHQ7XG4gICAgdGhpcy5oYXNJY29uID0gIXRoaXMubnpTcmMgJiYgISF0aGlzLm56SWNvbjtcbiAgICB0aGlzLmhhc1NyYyA9ICEhdGhpcy5uelNyYztcblxuICAgIHRoaXMuc2V0U2l6ZVN0eWxlKCk7XG4gICAgdGhpcy5ub3RpZnlDYWxjKCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGNTdHJpbmdTaXplKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNUZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW5XaWR0aCA9IHRoaXMudGV4dEVsIS5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGF2YXRhcldpZHRoID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm56R2FwICogMiA8IGF2YXRhcldpZHRoID8gdGhpcy5uekdhcCAqIDIgOiA4O1xuICAgIGNvbnN0IHNjYWxlID0gYXZhdGFyV2lkdGggLSBvZmZzZXQgPCBjaGlsZHJlbldpZHRoID8gKGF2YXRhcldpZHRoIC0gb2Zmc2V0KSAvIGNoaWxkcmVuV2lkdGggOiAxO1xuXG4gICAgdGhpcy50ZXh0U3R5bGVzID0ge1xuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZX0pIHRyYW5zbGF0ZVgoLTUwJSlgXG4gICAgfTtcbiAgICBpZiAodGhpcy5jdXN0b21TaXplKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMudGV4dFN0eWxlcywge1xuICAgICAgICBsaW5lSGVpZ2h0OiB0aGlzLmN1c3RvbVNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNhbGMoKTogdm9pZCB7XG4gICAgLy8gSWYgdXNlIG5nQWZ0ZXJWaWV3Q2hlY2tlZCwgYWx3YXlzIGRlbWFuZHMgbW9yZSBjb21wdXRhdGlvbnMsIHNvLi4uLi4uXG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jYWxjU3RyaW5nU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaXplU3R5bGUoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm56U2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuY3VzdG9tU2l6ZSA9IGAke3RoaXMubnpTaXplfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXN0b21TaXplID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==