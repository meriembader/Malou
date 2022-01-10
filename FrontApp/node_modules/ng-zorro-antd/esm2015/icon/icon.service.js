/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional, RendererFactory2, Self } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from '@ant-design/icons-angular';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { Subject } from 'rxjs';
import { NZ_ICONS_USED_BY_ZORRO } from './icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/common/http";
import * as i4 from "@angular/common";
export const NZ_ICONS = new InjectionToken('nz_icons');
export const NZ_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('nz_icon_default_twotone_color');
export const DEFAULT_TWOTONE_COLOR = '#1890ff';
/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
export class NzIconService extends IconService {
    constructor(rendererFactory, sanitizer, nzConfigService, handler, _document, icons) {
        super(rendererFactory, handler, _document, sanitizer);
        this.nzConfigService = nzConfigService;
        this.configUpdated$ = new Subject();
        this.iconfontCache = new Set();
        this.onConfigChange();
        this.addIcon(...NZ_ICONS_USED_BY_ZORRO, ...(icons || []));
        this.configDefaultTwotoneColor();
        this.configDefaultTheme();
    }
    normalizeSvgElement(svg) {
        if (!svg.getAttribute('viewBox')) {
            this._renderer.setAttribute(svg, 'viewBox', '0 0 1024 1024');
        }
        if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
            this._renderer.setAttribute(svg, 'width', '1em');
            this._renderer.setAttribute(svg, 'height', '1em');
        }
        if (!svg.getAttribute('fill')) {
            this._renderer.setAttribute(svg, 'fill', 'currentColor');
        }
    }
    fetchFromIconfont(opt) {
        const { scriptUrl } = opt;
        if (this._document && !this.iconfontCache.has(scriptUrl)) {
            const script = this._renderer.createElement('script');
            this._renderer.setAttribute(script, 'src', scriptUrl);
            this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
            this._renderer.appendChild(this._document.body, script);
            this.iconfontCache.add(scriptUrl);
        }
    }
    createIconfontIcon(type) {
        return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
    }
    onConfigChange() {
        this.nzConfigService.getConfigChangeEventForComponent('icon').subscribe(() => {
            this.configDefaultTwotoneColor();
            this.configDefaultTheme();
            this.configUpdated$.next();
        });
    }
    configDefaultTheme() {
        const iconConfig = this.getConfig();
        this.defaultTheme = iconConfig.nzTheme || 'outline';
    }
    configDefaultTwotoneColor() {
        const iconConfig = this.getConfig();
        const defaultTwotoneColor = iconConfig.nzTwotoneColor || DEFAULT_TWOTONE_COLOR;
        let primaryColor = DEFAULT_TWOTONE_COLOR;
        if (defaultTwotoneColor) {
            if (defaultTwotoneColor.startsWith('#')) {
                primaryColor = defaultTwotoneColor;
            }
            else {
                warn('Twotone color must be a hex color!');
            }
        }
        this.twoToneColor = { primaryColor };
    }
    getConfig() {
        return this.nzConfigService.getConfigForComponent('icon') || {};
    }
}
NzIconService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzIconService_Factory() { return new NzIconService(i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i1.DomSanitizer), i0.ɵɵinject(i2.NzConfigService), i0.ɵɵinject(i3.HttpBackend, 8), i0.ɵɵinject(i4.DOCUMENT, 8), i0.ɵɵinject(NZ_ICONS, 8)); }, token: NzIconService, providedIn: "root" });
NzIconService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzIconService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: DomSanitizer },
    { type: NzConfigService },
    { type: HttpBackend, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NZ_ICONS,] }] }
];
export const NZ_ICONS_PATCH = new InjectionToken('nz_icons_patch');
export class NzIconPatchService {
    constructor(extraIcons, rootIconService) {
        this.extraIcons = extraIcons;
        this.rootIconService = rootIconService;
        this.patched = false;
    }
    doPatch() {
        if (this.patched) {
            return;
        }
        this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
        this.patched = true;
    }
}
NzIconPatchService.decorators = [
    { type: Injectable }
];
NzIconPatchService.ctorParameters = () => [
    { type: Array, decorators: [{ type: Self }, { type: Inject, args: [NZ_ICONS_PATCH,] }] },
    { type: NzIconService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9pY29uLyIsInNvdXJjZXMiOlsiaWNvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBa0IsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBTWpELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2RCxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBRyxJQUFJLGNBQWMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztBQUUvQzs7R0FFRztBQUlILE1BQU0sT0FBTyxhQUFjLFNBQVEsV0FBVztJQWlDNUMsWUFDRSxlQUFpQyxFQUNqQyxTQUF1QixFQUNiLGVBQWdDLEVBQzlCLE9BQW9CLEVBQ0YsU0FBb0IsRUFDcEIsS0FBd0I7UUFFdEQsS0FBSyxDQUFDLGVB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TyxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7WUFiRixVQUFVOzs7d0NBSUksSUFBSSxZQUFJLE1BQU0sU0FBQyxjQUFjO1lBQWlFLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQmFja2VuZCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsLCBSZW5kZXJlckZhY3RvcnkyLCBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uLCBJY29uU2VydmljZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0IHsgSWNvbkNvbmZpZywgTnpDb25maWdTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2xvZ2dlcic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTlpfSUNPTlNfVVNFRF9CWV9aT1JSTyB9IGZyb20gJy4vaWNvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56SWNvbmZvbnRPcHRpb24ge1xuICBzY3JpcHRVcmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IE5aX0lDT05TID0gbmV3IEluamVjdGlvblRva2VuKCduel9pY29ucycpO1xuZXhwb3J0IGNvbnN0IE5aX0lDT05fREVGQVVMVF9UV09UT05FX0NPTE9SID0gbmV3IEluamVjdGlvblRva2VuKCduel9pY29uX2RlZmF1bHRfdHdvdG9uZV9jb2xvcicpO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVFdPVE9ORV9DT0xPUiA9ICcjMTg5MGZmJztcblxuLyoqXG4gKiBJdCBzaG91bGQgYmUgYSBnbG9iYWwgc2luZ2xldG9uLCBvdGhlcndpc2UgcmVnaXN0ZXJlZCBpY29ucyBjb3VsZCBub3QgYmUgZm91bmQuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56SWNvblNlcnZpY2UgZXh0ZW5kcyBJY29uU2VydmljZSB7XG4gIGNvbmZpZ1VwZGF0ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIGljb25mb250Q2FjaGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBub3JtYWxpemVTdmdFbGVtZW50KHN2ZzogU1ZHRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgndmlld0JveCcpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAndmlld0JveCcsICcwIDAgMTAyNCAxMDI0Jyk7XG4gICAgfVxuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCAhc3ZnLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICd3aWR0aCcsICcxZW0nKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzdmcsICdoZWlnaHQnLCAnMWVtJyk7XG4gICAgfVxuICAgIGlmICghc3ZnLmdldEF0dHJpYnV0ZSgnZmlsbCcpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoc3ZnLCAnZmlsbCcsICdjdXJyZW50Q29sb3InKTtcbiAgICB9XG4gIH1cblxuICBmZXRjaEZyb21JY29uZm9udChvcHQ6IE56SWNvbmZvbnRPcHRpb24pOiB2b2lkIHtcbiAgICBjb25zdCB7IHNjcmlwdFVybCB9ID0gb3B0O1xuICAgIGlmICh0aGlzLl9kb2N1bWVudCAmJiAhdGhpcy5pY29uZm9udENhY2hlLmhhcyhzY3JpcHRVcmwpKSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShzY3JpcHQsICdzcmMnLCBzY3JpcHRVcmwpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHNjcmlwdCwgJ2RhdGEtbmFtZXNwYWNlJywgc2NyaXB0VXJsLnJlcGxhY2UoL14oaHR0cHM/fGh0dHApOi9nLCAnJykpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZG9jdW1lbnQuYm9keSwgc2NyaXB0KTtcbiAgICAgIHRoaXMuaWNvbmZvbnRDYWNoZS5hZGQoc2NyaXB0VXJsKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVJY29uZm9udEljb24odHlwZTogc3RyaW5nKTogU1ZHRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVNWR0VsZW1lbnRGcm9tU3RyaW5nKGA8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiR7dHlwZX1cIj48L3N2Zz5gKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcm90ZWN0ZWQgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgaGFuZGxlcjogSHR0cEJhY2tlbmQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBOelNhZmVBbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOWl9JQ09OUykgaWNvbnM/OiBJY29uRGVmaW5pdGlvbltdXG4gICkge1xuICAgIHN1cGVyKHJlbmRlcmVyRmFjdG9yeSwgaGFuZGxlciwgX2RvY3VtZW50LCBzYW5pdGl6ZXIpO1xuXG4gICAgdGhpcy5vbkNvbmZpZ0NoYW5nZSgpO1xuICAgIHRoaXMuYWRkSWNvbiguLi5OWl9JQ09OU19VU0VEX0JZX1pPUlJPLCAuLi4oaWNvbnMgfHwgW10pKTtcbiAgICB0aGlzLmNvbmZpZ0RlZmF1bHRUd290b25lQ29sb3IoKTtcbiAgICB0aGlzLmNvbmZpZ0RlZmF1bHRUaGVtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNvbmZpZ0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudCgnaWNvbicpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZ0RlZmF1bHRUd290b25lQ29sb3IoKTtcbiAgICAgIHRoaXMuY29uZmlnRGVmYXVsdFRoZW1lKCk7XG4gICAgICB0aGlzLmNvbmZpZ1VwZGF0ZWQkLm5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29uZmlnRGVmYXVsdFRoZW1lKCk6IHZvaWQge1xuICAgIGNvbnN0IGljb25Db25maWcgPSB0aGlzLmdldENvbmZpZygpO1xuICAgIHRoaXMuZGVmYXVsdFRoZW1lID0gaWNvbkNvbmZpZy5uelRoZW1lIHx8ICdvdXRsaW5lJztcbiAgfVxuXG4gIHByaXZhdGUgY29uZmlnRGVmYXVsdFR3b3RvbmVDb2xvcigpOiB2b2lkIHtcbiAgICBjb25zdCBpY29uQ29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICBjb25zdCBkZWZhdWx0VHdvdG9uZUNvbG9yID0gaWNvbkNvbmZpZy5uelR3b3RvbmVDb2xvciB8fCBERUZBVUxUX1RXT1RPTkVfQ09MT1I7XG5cbiAgICBsZXQgcHJpbWFyeUNvbG9yID0gREVGQVVMVF9UV09UT05FX0NPTE9SO1xuXG4gICAgaWYgKGRlZmF1bHRUd290b25lQ29sb3IpIHtcbiAgICAgIGlmIChkZWZhdWx0VHdvdG9uZUNvbG9yLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgICBwcmltYXJ5Q29sb3IgPSBkZWZhdWx0VHdvdG9uZUNvbG9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignVHdvdG9uZSBjb2xvciBtdXN0IGJlIGEgaGV4IGNvbG9yIScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudHdvVG9uZUNvbG9yID0geyBwcmltYXJ5Q29sb3IgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29uZmlnKCk6IEljb25Db25maWcge1xuICAgIHJldHVybiB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoJ2ljb24nKSB8fCB7fTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTlpfSUNPTlNfUEFUQ0ggPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ256X2ljb25zX3BhdGNoJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOekljb25QYXRjaFNlcnZpY2Uge1xuICBwYXRjaGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQFNlbGYoKSBASW5qZWN0KE5aX0lDT05TX1BBVENIKSBwcml2YXRlIGV4dHJhSWNvbnM6IEljb25EZWZpbml0aW9uW10sIHByaXZhdGUgcm9vdEljb25TZXJ2aWNlOiBOekljb25TZXJ2aWNlKSB7fVxuXG4gIGRvUGF0Y2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGF0Y2hlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZXh0cmFJY29ucy5mb3JFYWNoKGljb25EZWZpbml0aW9uID0+IHRoaXMucm9vdEljb25TZXJ2aWNlLmFkZEljb24oaWNvbkRlZmluaXRpb24pKTtcbiAgICB0aGlzLnBhdGNoZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=