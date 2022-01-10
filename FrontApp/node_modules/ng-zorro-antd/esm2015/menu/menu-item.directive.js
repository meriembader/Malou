/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, ContentChildren, Directive, Inject, Input, Optional, QueryList } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
import { NzSubmenuService } from './submenu.service';
export class NzMenuItemDirective {
    constructor(nzMenuService, cdr, nzSubmenuService, isMenuInsideDropDown, routerLink, routerLinkWithHref, router) {
        this.nzMenuService = nzMenuService;
        this.cdr = cdr;
        this.nzSubmenuService = nzSubmenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.routerLink = routerLink;
        this.routerLinkWithHref = routerLinkWithHref;
        this.router = router;
        this.destroy$ = new Subject();
        this.level = this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1;
        this.selected$ = new Subject();
        this.inlinePaddingLeft = null;
        this.nzDisabled = false;
        this.nzSelected = false;
        this.nzDanger = false;
        this.nzMatchRouterExact = false;
        this.nzMatchRouter = false;
        if (router) {
            this.router.events.pipe(takeUntil(this.destroy$), filter(e => e instanceof NavigationEnd)).subscribe(() => {
                this.updateRouterActive();
            });
        }
    }
    /** clear all item selected status except this */
    clickMenuItem(e) {
        if (this.nzDisabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            this.nzMenuService.onDescendantMenuItemClick(this);
            if (this.nzSubmenuService) {
                /** menu item inside the submenu **/
                this.nzSubmenuService.onChildMenuItemClick(this);
            }
            else {
                /** menu item inside the root menu **/
                this.nzMenuService.onChildMenuItemClick(this);
            }
        }
    }
    setSelectedState(value) {
        this.nzSelected = value;
        this.selected$.next(value);
    }
    updateRouterActive() {
        if (!this.listOfRouterLink || !this.listOfRouterLinkWithHref || !this.router || !this.router.navigated || !this.nzMatchRouter) {
            return;
        }
        Promise.resolve().then(() => {
            const hasActiveLinks = this.hasActiveLinks();
            if (this.nzSelected !== hasActiveLinks) {
                this.nzSelected = hasActiveLinks;
                this.setSelectedState(this.nzSelected);
                this.cdr.markForCheck();
            }
        });
    }
    hasActiveLinks() {
        const isActiveCheckFn = this.isLinkActive(this.router);
        return ((this.routerLink && isActiveCheckFn(this.routerLink)) ||
            (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
            this.listOfRouterLink.some(isActiveCheckFn) ||
            this.listOfRouterLinkWithHref.some(isActiveCheckFn));
    }
    isLinkActive(router) {
        return (link) => router.isActive(link.urlTree, this.nzMatchRouterExact);
    }
    ngOnInit() {
        /** store origin padding in padding */
        combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([mode, inlineIndent]) => {
            this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        });
    }
    ngAfterContentInit() {
        this.listOfRouterLink.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
        this.listOfRouterLinkWithHref.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
        this.updateRouterActive();
    }
    ngOnChanges(changes) {
        if (changes.nzSelected) {
            this.setSelectedState(this.nzSelected);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzMenuItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-menu-item]',
                exportAs: 'nzMenuItem',
                host: {
                    '[class.ant-dropdown-menu-item]': `isMenuInsideDropDown`,
                    '[class.ant-dropdown-menu-item-selected]': `isMenuInsideDropDown && nzSelected`,
                    '[class.ant-dropdown-menu-item-danger]': `isMenuInsideDropDown && nzDanger`,
                    '[class.ant-dropdown-menu-item-disabled]': `isMenuInsideDropDown && nzDisabled`,
                    '[class.ant-menu-item]': `!isMenuInsideDropDown`,
                    '[class.ant-menu-item-selected]': `!isMenuInsideDropDown && nzSelected`,
                    '[class.ant-menu-item-danger]': `!isMenuInsideDropDown && nzDanger`,
                    '[class.ant-menu-item-disabled]': `!isMenuInsideDropDown && nzDisabled`,
                    '[style.paddingLeft.px]': 'nzPaddingLeft || inlinePaddingLeft',
                    '(click)': 'clickMenuItem($event)'
                }
            },] }
];
NzMenuItemDirective.ctorParameters = () => [
    { type: MenuService },
    { type: ChangeDetectorRef },
    { type: NzSubmenuService, decorators: [{ type: Optional }] },
    { type: Boolean, decorators: [{ type: Inject, args: [NzIsMenuInsideDropDownToken,] }] },
    { type: RouterLink, decorators: [{ type: Optional }] },
    { type: RouterLinkWithHref, decorators: [{ type: Optional }] },
    { type: Router, decorators: [{ type: Optional }] }
];
NzMenuItemDirective.propDecorators = {
    nzPaddingLeft: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzSelected: [{ type: Input }],
    nzDanger: [{ type: Input }],
    nzMatchRouterExact: [{ type: Input }],
    nzMatchRouter: [{ type: Input }],
    listOfRouterLink: [{ type: ContentChildren, args: [RouterLink, { descendants: true },] }],
    listOfRouterLinkWithHref: [{ type: ContentChildren, args: [RouterLinkWithHref, { descendants: true },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuItemDirective.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuItemDirective.prototype, "nzSelected", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuItemDirective.prototype, "nzDanger", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuItemDirective.prototype, "nzMatchRouterExact", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuItemDirective.prototype, "nzMatchRouter", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbWVudS8iLCJzb3VyY2VzIjpbIm1lbnUtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUlMLFFBQVEsRUFDUixTQUFTLEVBRVYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWtCckQsTUFBTSxPQUFPLG1CQUFtQjtJQXNFOUIsWUFDVSxhQUEwQixFQUMxQixHQUFzQixFQUNWLGdCQUFrQyxFQUNWLG9CQUE2QixFQUNyRCxVQUF1QixFQUN2QixrQkFBdUMsRUFDdkMsTUFBZTtRQU4zQixrQkFBYSxHQUFiLGFBQWEsQ0FBYTtRQUMxQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDVix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVM7UUFDckQsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2Qix1QkFBa0IsR0FBbEIs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OytCQUNMLGVBQWUsU0FBQyxVQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3VDQUNqRCxlQUFlLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOztBQU5qQztJQUFmLFlBQVksRUFBRTs7dURBQW9CO0FBQ25CO0lBQWYsWUFBWSxFQUFFOzt1REFBb0I7QUFDbkI7SUFBZixZQUFZLEVBQUU7O3FEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTs7K0RBQTRCO0FBQzNCO0lBQWYsWUFBWSxFQUFFOzswREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIsIFJvdXRlckxpbmssIFJvdXRlckxpbmtXaXRoSHJlZiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiB9IGZyb20gJy4vbWVudS50b2tlbic7XG5pbXBvcnQgeyBOelN1Ym1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9zdWJtZW51LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotbWVudS1pdGVtXScsXG4gIGV4cG9ydEFzOiAnbnpNZW51SXRlbScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW1dJzogYGlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW0tc2VsZWN0ZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56U2VsZWN0ZWRgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtaXRlbS1kYW5nZXJdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGFuZ2VyYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW0tZGlzYWJsZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGlzYWJsZWRgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtaXRlbV0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWl0ZW0tc2VsZWN0ZWRdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBuelNlbGVjdGVkYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWl0ZW0tZGFuZ2VyXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpEYW5nZXJgLFxuICAgICdbY2xhc3MuYW50LW1lbnUtaXRlbS1kaXNhYmxlZF0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIG56RGlzYWJsZWRgLFxuICAgICdbc3R5bGUucGFkZGluZ0xlZnQucHhdJzogJ256UGFkZGluZ0xlZnQgfHwgaW5saW5lUGFkZGluZ0xlZnQnLFxuICAgICcoY2xpY2spJzogJ2NsaWNrTWVudUl0ZW0oJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek1lbnVJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNlbGVjdGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRhbmdlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpNYXRjaFJvdXRlckV4YWN0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hdGNoUm91dGVyOiBCb29sZWFuSW5wdXQ7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIGxldmVsID0gdGhpcy5uelN1Ym1lbnVTZXJ2aWNlID8gdGhpcy5uelN1Ym1lbnVTZXJ2aWNlLmxldmVsICsgMSA6IDE7XG4gIHNlbGVjdGVkJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIGlubGluZVBhZGRpbmdMZWZ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpQYWRkaW5nTGVmdD86IG51bWJlcjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2VsZWN0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGFuZ2VyID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek1hdGNoUm91dGVyRXhhY3QgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TWF0Y2hSb3V0ZXIgPSBmYWxzZTtcbiAgQENvbnRlbnRDaGlsZHJlbihSb3V0ZXJMaW5rLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZlJvdXRlckxpbmshOiBRdWVyeUxpc3Q8Um91dGVyTGluaz47XG4gIEBDb250ZW50Q2hpbGRyZW4oUm91dGVyTGlua1dpdGhIcmVmLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGxpc3RPZlJvdXRlckxpbmtXaXRoSHJlZiE6IFF1ZXJ5TGlzdDxSb3V0ZXJMaW5rV2l0aEhyZWY+O1xuXG4gIC8qKiBjbGVhciBhbGwgaXRlbSBzZWxlY3RlZCBzdGF0dXMgZXhjZXB0IHRoaXMgKi9cbiAgY2xpY2tNZW51SXRlbShlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uek1lbnVTZXJ2aWNlLm9uRGVzY2VuZGFudE1lbnVJdGVtQ2xpY2sodGhpcyk7XG4gICAgICBpZiAodGhpcy5uelN1Ym1lbnVTZXJ2aWNlKSB7XG4gICAgICAgIC8qKiBtZW51IGl0ZW0gaW5zaWRlIHRoZSBzdWJtZW51ICoqL1xuICAgICAgICB0aGlzLm56U3VibWVudVNlcnZpY2Uub25DaGlsZE1lbnVJdGVtQ2xpY2sodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiogbWVudSBpdGVtIGluc2lkZSB0aGUgcm9vdCBtZW51ICoqL1xuICAgICAgICB0aGlzLm56TWVudVNlcnZpY2Uub25DaGlsZE1lbnVJdGVtQ2xpY2sodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0U2VsZWN0ZWRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpTZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVSb3V0ZXJBY3RpdmUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmxpc3RPZlJvdXRlckxpbmsgfHwgIXRoaXMubGlzdE9mUm91dGVyTGlua1dpdGhIcmVmIHx8ICF0aGlzLnJvdXRlciB8fCAhdGhpcy5yb3V0ZXIubmF2aWdhdGVkIHx8ICF0aGlzLm56TWF0Y2hSb3V0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBoYXNBY3RpdmVMaW5rcyA9IHRoaXMuaGFzQWN0aXZlTGlua3MoKTtcbiAgICAgIGlmICh0aGlzLm56U2VsZWN0ZWQgIT09IGhhc0FjdGl2ZUxpbmtzKSB7XG4gICAgICAgIHRoaXMubnpTZWxlY3RlZCA9IGhhc0FjdGl2ZUxpbmtzO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkU3RhdGUodGhpcy5uelNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhc0FjdGl2ZUxpbmtzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzQWN0aXZlQ2hlY2tGbiA9IHRoaXMuaXNMaW5rQWN0aXZlKHRoaXMucm91dGVyISk7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLnJvdXRlckxpbmsgJiYgaXNBY3RpdmVDaGVja0ZuKHRoaXMucm91dGVyTGluaykpIHx8XG4gICAgICAodGhpcy5yb3V0ZXJMaW5rV2l0aEhyZWYgJiYgaXNBY3RpdmVDaGVja0ZuKHRoaXMucm91dGVyTGlua1dpdGhIcmVmKSkgfHxcbiAgICAgIHRoaXMubGlzdE9mUm91dGVyTGluay5zb21lKGlzQWN0aXZlQ2hlY2tGbikgfHxcbiAgICAgIHRoaXMubGlzdE9mUm91dGVyTGlua1dpdGhIcmVmLnNvbWUoaXNBY3RpdmVDaGVja0ZuKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzTGlua0FjdGl2ZShyb3V0ZXI6IFJvdXRlcik6IChsaW5rOiBSb3V0ZXJMaW5rIHwgUm91dGVyTGlua1dpdGhIcmVmKSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGxpbms6IFJvdXRlckxpbmsgfCBSb3V0ZXJMaW5rV2l0aEhyZWYpID0+IHJvdXRlci5pc0FjdGl2ZShsaW5rLnVybFRyZWUsIHRoaXMubnpNYXRjaFJvdXRlckV4YWN0KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbnpNZW51U2VydmljZTogTWVudVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbnpTdWJtZW51U2VydmljZTogTnpTdWJtZW51U2VydmljZSxcbiAgICBASW5qZWN0KE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbikgcHVibGljIGlzTWVudUluc2lkZURyb3BEb3duOiBib29sZWFuLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGVyTGluaz86IFJvdXRlckxpbmssXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXJMaW5rV2l0aEhyZWY/OiBSb3V0ZXJMaW5rV2l0aEhyZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI/OiBSb3V0ZXJcbiAgKSB7XG4gICAgaWYgKHJvdXRlcikge1xuICAgICAgdGhpcy5yb3V0ZXIhLmV2ZW50cy5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZVJvdXRlckFjdGl2ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqIHN0b3JlIG9yaWdpbiBwYWRkaW5nIGluIHBhZGRpbmcgKi9cbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLm56TWVudVNlcnZpY2UubW9kZSQsIHRoaXMubnpNZW51U2VydmljZS5pbmxpbmVJbmRlbnQkXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFttb2RlLCBpbmxpbmVJbmRlbnRdKSA9PiB7XG4gICAgICAgIHRoaXMuaW5saW5lUGFkZGluZ0xlZnQgPSBtb2RlID09PSAnaW5saW5lJyA/IHRoaXMubGV2ZWwgKiBpbmxpbmVJbmRlbnQgOiBudWxsO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZSb3V0ZXJMaW5rLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVJvdXRlckFjdGl2ZSgpKTtcbiAgICB0aGlzLmxpc3RPZlJvdXRlckxpbmtXaXRoSHJlZi5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVSb3V0ZXJBY3RpdmUoKSk7XG4gICAgdGhpcy51cGRhdGVSb3V0ZXJBY3RpdmUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkU3RhdGUodGhpcy5uelNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==