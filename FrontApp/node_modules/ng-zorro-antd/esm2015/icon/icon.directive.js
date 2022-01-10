/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { IconDirective } from '@ant-design/icons-angular';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconPatchService, NzIconService } from './icon.service';
export class NzIconDirective extends IconDirective {
    constructor(elementRef, iconService, renderer, iconPatch) {
        super(iconService, elementRef, renderer);
        this.iconService = iconService;
        this.renderer = renderer;
        this.cacheClassName = null;
        this.nzRotate = 0;
        this.spin = false;
        if (iconPatch) {
            iconPatch.doPatch();
        }
        this.el = elementRef.nativeElement;
    }
    set nzSpin(value) {
        this.spin = value;
    }
    set nzType(value) {
        this.type = value;
    }
    set nzTheme(value) {
        this.theme = value;
    }
    set nzTwotoneColor(value) {
        this.twoToneColor = value;
    }
    set nzIconfont(value) {
        this.iconfont = value;
    }
    ngOnChanges(changes) {
        const { nzType, nzTwotoneColor, nzSpin, nzTheme, nzRotate } = changes;
        if (nzType || nzTwotoneColor || nzSpin || nzTheme) {
            this.changeIcon2();
        }
        else if (nzRotate) {
            this.handleRotate(this.el.firstChild);
        }
        else {
            this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
        }
    }
    ngOnInit() {
        this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
    }
    /**
     * If custom content is provided, try to normalize SVG elements.
     */
    ngAfterContentChecked() {
        if (!this.type) {
            const children = this.el.children;
            let length = children.length;
            if (!this.type && children.length) {
                while (length--) {
                    const child = children[length];
                    if (child.tagName.toLowerCase() === 'svg') {
                        this.iconService.normalizeSvgElement(child);
                    }
                }
            }
        }
    }
    /**
     * Replacement of `changeIcon` for more modifications.
     */
    changeIcon2() {
        this.setClassName();
        this._changeIcon().then(svgOrRemove => {
            if (svgOrRemove) {
                this.setSVGData(svgOrRemove);
                this.handleSpin(svgOrRemove);
                this.handleRotate(svgOrRemove);
            }
        });
    }
    handleSpin(svg) {
        if (this.spin || this.type === 'loading') {
            this.renderer.addClass(svg, 'anticon-spin');
        }
        else {
            this.renderer.removeClass(svg, 'anticon-spin');
        }
    }
    handleRotate(svg) {
        if (this.nzRotate) {
            this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.nzRotate}deg)`);
        }
        else {
            this.renderer.removeAttribute(svg, 'style');
        }
    }
    setClassName() {
        if (this.cacheClassName) {
            this.renderer.removeClass(this.el, this.cacheClassName);
        }
        this.cacheClassName = `anticon-${this.type}`;
        this.renderer.addClass(this.el, this.cacheClassName);
    }
    setSVGData(svg) {
        this.renderer.setAttribute(svg, 'data-icon', this.type);
        this.renderer.setAttribute(svg, 'aria-hidden', 'true');
    }
}
NzIconDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-icon]',
                exportAs: 'nzIcon',
                host: {
                    '[class.anticon]': 'true'
                }
            },] }
];
NzIconDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NzIconService },
    { type: Renderer2 },
    { type: NzIconPatchService, decorators: [{ type: Optional }] }
];
NzIconDirective.propDecorators = {
    nzSpin: [{ type: Input }],
    nzRotate: [{ type: Input }],
    nzType: [{ type: Input }],
    nzTheme: [{ type: Input }],
    nzTwotoneColor: [{ type: Input }],
    nzIconfont: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NzIconDirective.prototype, "nzSpin", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2ljb24vIiwic291cmNlcyI6WyJpY29uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUF1QixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsUUFBUSxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekksT0FBTyxFQUFFLGFBQWEsRUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBRXJFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTbkUsTUFBTSxPQUFPLGVBQWdCLFNBQVEsYUFBYTtJQXNDaEQsWUFDRSxVQUFzQixFQUNmLFdBQTBCLEVBQzFCLFFBQW1CLEVBQ2QsU0FBNkI7UUFFekMsS0FBSyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFKbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXRDNUIsbUJBQWMsR0FBa0IsSUFBSSxDQUFDO1FBTzVCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUEwQnRCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFVNUIsSUFBSSxTQUFTLEVBQUU7WUFDYixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQTdDRCxJQUFJLE1BQU0sQ0FBQyxLQUFjO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFJRCxJQUNJLE1BQU0sQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFD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XG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EaXJlY3RpdmUsIFRoZW1lVHlwZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpJY29uUGF0Y2hTZXJ2aWNlLCBOekljb25TZXJ2aWNlIH0gZnJvbSAnLi9pY29uLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotaWNvbl0nLFxuICBleHBvcnRBczogJ256SWNvbicsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudGljb25dJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpJY29uRGlyZWN0aXZlIGV4dGVuZHMgSWNvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3BpbjogQm9vbGVhbklucHV0O1xuXG4gIGNhY2hlQ2xhc3NOYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KClcbiAgQElucHV0Qm9vbGVhbigpXG4gIHNldCBuelNwaW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNwaW4gPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIG56Um90YXRlOiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuelR5cGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudHlwZSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VGhlbWUodmFsdWU6IFRoZW1lVHlwZSkge1xuICAgIHRoaXMudGhlbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelR3b3RvbmVDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50d29Ub25lQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekljb25mb250KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmljb25mb250ID0gdmFsdWU7XG4gIH1cblxuICBob3N0Q2xhc3M/OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgaWNvbmZvbnQ/OiBzdHJpbmc7XG4gIHByaXZhdGUgc3BpbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGljb25TZXJ2aWNlOiBOekljb25TZXJ2aWNlLFxuICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpIGljb25QYXRjaDogTnpJY29uUGF0Y2hTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGljb25TZXJ2aWNlLCBlbGVtZW50UmVmLCByZW5kZXJlcik7XG5cbiAgICBpZiAoaWNvblBhdGNoKSB7XG4gICAgICBpY29uUGF0Y2guZG9QYXRjaCgpO1xuICAgIH1cblxuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelR5cGUsIG56VHdvdG9uZUNvbG9yLCBuelNwaW4sIG56VGhlbWUsIG56Um90YXRlIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKG56VHlwZSB8fCBuelR3b3RvbmVDb2xvciB8fCBuelNwaW4gfHwgbnpUaGVtZSkge1xuICAgICAgdGhpcy5jaGFuZ2VJY29uMigpO1xuICAgIH0gZWxzZSBpZiAobnpSb3RhdGUpIHtcbiAgICAgIHRoaXMuaGFuZGxlUm90YXRlKHRoaXMuZWwuZmlyc3RDaGlsZCBhcyBTVkdFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0U1ZHRWxlbWVudCh0aGlzLmljb25TZXJ2aWNlLmNyZWF0ZUljb25mb250SWNvbihgIyR7dGhpcy5pY29uZm9udH1gKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbCwgJ2NsYXNzJywgYGFudGljb24gJHt0aGlzLmVsLmNsYXNzTmFtZX1gLnRyaW0oKSk7XG4gIH1cblxuICAvKipcbiAgICogSWYgY3VzdG9tIGNvbnRlbnQgaXMgcHJvdmlkZWQsIHRyeSB0byBub3JtYWxpemUgU1ZHIGVsZW1lbnRzLlxuICAgKi9cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50eXBlKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZWwuY2hpbGRyZW47XG4gICAgICBsZXQgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgaWYgKCF0aGlzLnR5cGUgJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5bbGVuZ3RoXTtcbiAgICAgICAgICBpZiAoY2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3ZnJykge1xuICAgICAgICAgICAgdGhpcy5pY29uU2VydmljZS5ub3JtYWxpemVTdmdFbGVtZW50KGNoaWxkIGFzIFNWR0VsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlbWVudCBvZiBgY2hhbmdlSWNvbmAgZm9yIG1vcmUgbW9kaWZpY2F0aW9ucy5cbiAgICovXG4gIHByaXZhdGUgY2hhbmdlSWNvbjIoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc05hbWUoKTtcbiAgICB0aGlzLl9jaGFuZ2VJY29uKCkudGhlbihzdmdPclJlbW92ZSA9PiB7XG4gICAgICBpZiAoc3ZnT3JSZW1vdmUpIHtcbiAgICAgICAgdGhpcy5zZXRTVkdEYXRhKHN2Z09yUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5oYW5kbGVTcGluKHN2Z09yUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5oYW5kbGVSb3RhdGUoc3ZnT3JSZW1vdmUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTcGluKHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNwaW4gfHwgdGhpcy50eXBlID09PSAnbG9hZGluZycpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3ZnLCAnYW50aWNvbi1zcGluJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3Moc3ZnLCAnYW50aWNvbi1zcGluJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSb3RhdGUoc3ZnOiBTVkdFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpSb3RhdGUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHN2ZywgJ3N0eWxlJywgYHRyYW5zZm9ybTogcm90YXRlKCR7dGhpcy5uelJvdGF0ZX1kZWcpYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHN2ZywgJ3N0eWxlJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbGFzc05hbWUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FjaGVDbGFzc05hbWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbCwgdGhpcy5jYWNoZUNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHRoaXMuY2FjaGVDbGFzc05hbWUgPSBgYW50aWNvbi0ke3RoaXMudHlwZX1gO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbCwgdGhpcy5jYWNoZUNsYXNzTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHNldFNWR0RhdGEoc3ZnOiBTVkdFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnZGF0YS1pY29uJywgdGhpcy50eXBlIGFzIHN0cmluZyk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG59XG4iXX0=