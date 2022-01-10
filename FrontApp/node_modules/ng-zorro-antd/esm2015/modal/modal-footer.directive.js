/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Optional, TemplateRef } from '@angular/core';
import { NzModalRef } from './modal-ref';
export class NzModalFooterDirective {
    constructor(nzModalRef, templateRef) {
        this.nzModalRef = nzModalRef;
        this.templateRef = templateRef;
        if (this.nzModalRef) {
            this.nzModalRef.updateConfig({
                nzFooter: this.templateRef
            });
        }
    }
}
NzModalFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzModalFooter]',
                exportAs: 'nzModalFooter'
            },] }
];
NzModalFooterDirective.ctorParameters = () => [
    { type: NzModalRef, decorators: [{ type: Optional }] },
    { type: TemplateRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC1mb290ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTXpDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBZ0MsVUFBc0IsRUFBUyxXQUE0QjtRQUEzRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQ3pGLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzNCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBWEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7WUFMUSxVQUFVLHVCQU9KLFFBQVE7WUFSTyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBPcHRpb25hbCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56TW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuek1vZGFsRm9vdGVyXScsXG4gIGV4cG9ydEFzOiAnbnpNb2RhbEZvb3Rlcidcbn0pXG5leHBvcnQgY2xhc3MgTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgbnpNb2RhbFJlZjogTnpNb2RhbFJlZiwgcHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjx7fT4pIHtcbiAgICBpZiAodGhpcy5uek1vZGFsUmVmKSB7XG4gICAgICB0aGlzLm56TW9kYWxSZWYudXBkYXRlQ29uZmlnKHtcbiAgICAgICAgbnpGb290ZXI6IHRoaXMudGVtcGxhdGVSZWZcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19