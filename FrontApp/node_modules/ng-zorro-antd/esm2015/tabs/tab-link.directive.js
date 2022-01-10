/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
/**
 * Fix https://github.com/angular/angular/issues/8563
 */
export class NzTabLinkTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzTabLinkTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[nzTabLink]',
                exportAs: 'nzTabLinkTemplate'
            },] }
];
NzTabLinkTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Host }] }
];
/**
 * This component is for catching `routerLink` directive.
 */
export class NzTabLinkDirective {
    constructor(routerLink, routerLinkWithHref, nzTabLinkTemplateDirective) {
        this.routerLink = routerLink;
        this.routerLinkWithHref = routerLinkWithHref;
        if (!nzTabLinkTemplateDirective) {
            warnDeprecation(`'a[nz-tab-link]' is deprecated. Please use 'ng-template[nzTabLink] > a[nz-tab-link]' instead.`);
        }
    }
}
NzTabLinkDirective.decorators = [
    { type: Directive, args: [{
                selector: 'a[nz-tab-link]',
                exportAs: 'nzTabLink'
            },] }
];
NzTabLinkDirective.ctorParameters = () => [
    { type: RouterLink, decorators: [{ type: Optional }, { type: Self }] },
    { type: RouterLinkWithHref, decorators: [{ type: Optional }, { type: Self }] },
    { type: NzTabLinkTemplateDirective, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJzLyIsInNvdXJjZXMiOlsidGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJNUQ7O0dBRUc7QUFLSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQTJCLFdBQTRDO1FBQTVDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztJQUFHLENBQUM7OztZQUw1RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7O1lBYnlDLFdBQVcsdUJBZXRDLElBQUk7O0FBR25COztHQUVHO0FBS0gsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUM2QixVQUF1QixFQUN2QixrQkFBdUMsRUFDdEQsMEJBQXVEO1FBRnhDLGVBQVUsR0FBVixVQUFVLENBQWE7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtRQUdsRSxJQUFJLENBQUMsMEJBQTBCLEVBQUU7WUFDL0IsZUFBZSxDQUFDLCtGQUErRixDQUFDLENBQUM7U0FDbEg7SUFDSCxDQUFDOzs7WUFiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLFdBQVc7YUFDdEI7OztZQXZCUSxVQUFVLHVCQTBCZCxRQUFRLFlBQUksSUFBSTtZQTFCQSxrQkFBa0IsdUJBMkJsQyxRQUFRLFlBQUksSUFBSTtZQUN3QiwwQkFBMEIsdUJBQWxFLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3QsIE9wdGlvbmFsLCBTZWxmLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTGluaywgUm91dGVyTGlua1dpdGhIcmVmIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgd2FybkRlcHJlY2F0aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XG5cbmltcG9ydCB7IFRhYlRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogRml4IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzg1NjNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbnpUYWJMaW5rXScsXG4gIGV4cG9ydEFzOiAnbnpUYWJMaW5rVGVtcGxhdGUnXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPFRhYlRlbXBsYXRlQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgaXMgZm9yIGNhdGNoaW5nIGByb3V0ZXJMaW5rYCBkaXJlY3RpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FbbnotdGFiLWxpbmtdJyxcbiAgZXhwb3J0QXM6ICduelRhYkxpbmsnXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiTGlua0RpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIHJvdXRlckxpbms/OiBSb3V0ZXJMaW5rLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIHJvdXRlckxpbmtXaXRoSHJlZj86IFJvdXRlckxpbmtXaXRoSHJlZixcbiAgICBAT3B0aW9uYWwoKSBuelRhYkxpbmtUZW1wbGF0ZURpcmVjdGl2ZT86IE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlXG4gICkge1xuICAgIGlmICghbnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmUpIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbihgJ2FbbnotdGFiLWxpbmtdJyBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlICduZy10ZW1wbGF0ZVtuelRhYkxpbmtdID4gYVtuei10YWItbGlua10nIGluc3RlYWQuYCk7XG4gICAgfVxuICB9XG59XG4iXX0=