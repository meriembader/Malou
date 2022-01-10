/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, ContentChildren, Directive, EventEmitter, Inject, Input, Optional, Output, QueryList, SkipSelf } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMenuItemDirective } from './menu-item.directive';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken, NzMenuServiceLocalToken } from './menu.token';
import { NzSubMenuComponent } from './submenu.component';
export function MenuServiceFactory(serviceInsideDropDown, serviceOutsideDropDown) {
    return serviceInsideDropDown ? serviceInsideDropDown : serviceOutsideDropDown;
}
export function MenuDropDownTokenFactory(isMenuInsideDropDownToken) {
    return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
export class NzMenuDirective {
    constructor(nzMenuService, isMenuInsideDropDown, cdr) {
        this.nzMenuService = nzMenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.cdr = cdr;
        this.nzInlineIndent = 24;
        this.nzTheme = 'light';
        this.nzMode = 'vertical';
        this.nzInlineCollapsed = false;
        this.nzSelectable = !this.isMenuInsideDropDown;
        this.nzClick = new EventEmitter();
        this.actualMode = 'vertical';
        this.inlineCollapsed$ = new BehaviorSubject(this.nzInlineCollapsed);
        this.mode$ = new BehaviorSubject(this.nzMode);
        this.destroy$ = new Subject();
        this.listOfOpenedNzSubMenuComponent = [];
    }
    setInlineCollapsed(inlineCollapsed) {
        this.nzInlineCollapsed = inlineCollapsed;
        this.inlineCollapsed$.next(inlineCollapsed);
    }
    updateInlineCollapse() {
        if (this.listOfNzMenuItemDirective) {
            if (this.nzInlineCollapsed) {
                this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter(submenu => submenu.nzOpen);
                this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
            }
            else {
                this.listOfOpenedNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
                this.listOfOpenedNzSubMenuComponent = [];
            }
        }
    }
    ngOnInit() {
        combineLatest([this.inlineCollapsed$, this.mode$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([inlineCollapsed, mode]) => {
            this.actualMode = inlineCollapsed ? 'vertical' : mode;
            this.nzMenuService.setMode(this.actualMode);
            this.cdr.markForCheck();
        });
        this.nzMenuService.descendantMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
            this.nzClick.emit(menu);
            if (this.nzSelectable && !menu.nzMatchRouter) {
                this.listOfNzMenuItemDirective.forEach(item => item.setSelectedState(item === menu));
            }
        });
    }
    ngAfterContentInit() {
        this.inlineCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateInlineCollapse();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzInlineCollapsed, nzInlineIndent, nzTheme, nzMode } = changes;
        if (nzInlineCollapsed) {
            this.inlineCollapsed$.next(this.nzInlineCollapsed);
        }
        if (nzInlineIndent) {
            this.nzMenuService.setInlineIndent(this.nzInlineIndent);
        }
        if (nzTheme) {
            this.nzMenuService.setTheme(this.nzTheme);
        }
        if (nzMode) {
            this.mode$.next(this.nzMode);
            if (!changes.nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
                this.listOfNzSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-menu]',
                exportAs: 'nzMenu',
                providers: [
                    {
                        provide: NzMenuServiceLocalToken,
                        useClass: MenuService
                    },
                    /** use the top level service **/
                    {
                        provide: MenuService,
                        useFactory: MenuServiceFactory,
                        deps: [[new SkipSelf(), new Optional(), MenuService], NzMenuServiceLocalToken]
                    },
                    /** check if menu inside dropdown-menu component **/
                    {
                        provide: NzIsMenuInsideDropDownToken,
                        useFactory: MenuDropDownTokenFactory,
                        deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
                    }
                ],
                host: {
                    '[class.ant-dropdown-menu]': `isMenuInsideDropDown`,
                    '[class.ant-dropdown-menu-root]': `isMenuInsideDropDown`,
                    '[class.ant-dropdown-menu-light]': `isMenuInsideDropDown && nzTheme === 'light'`,
                    '[class.ant-dropdown-menu-dark]': `isMenuInsideDropDown && nzTheme === 'dark'`,
                    '[class.ant-dropdown-menu-vertical]': `isMenuInsideDropDown && actualMode === 'vertical'`,
                    '[class.ant-dropdown-menu-horizontal]': `isMenuInsideDropDown && actualMode === 'horizontal'`,
                    '[class.ant-dropdown-menu-inline]': `isMenuInsideDropDown && actualMode === 'inline'`,
                    '[class.ant-dropdown-menu-inline-collapsed]': `isMenuInsideDropDown && nzInlineCollapsed`,
                    '[class.ant-menu]': `!isMenuInsideDropDown`,
                    '[class.ant-menu-root]': `!isMenuInsideDropDown`,
                    '[class.ant-menu-light]': `!isMenuInsideDropDown && nzTheme === 'light'`,
                    '[class.ant-menu-dark]': `!isMenuInsideDropDown && nzTheme === 'dark'`,
                    '[class.ant-menu-vertical]': `!isMenuInsideDropDown && actualMode === 'vertical'`,
                    '[class.ant-menu-horizontal]': `!isMenuInsideDropDown && actualMode === 'horizontal'`,
                    '[class.ant-menu-inline]': `!isMenuInsideDropDown && actualMode === 'inline'`,
                    '[class.ant-menu-inline-collapsed]': `!isMenuInsideDropDown && nzInlineCollapsed`
                }
            },] }
];
NzMenuDirective.ctorParameters = () => [
    { type: MenuService },
    { type: Boolean, decorators: [{ type: Inject, args: [NzIsMenuInsideDropDownToken,] }] },
    { type: ChangeDetectorRef }
];
NzMenuDirective.propDecorators = {
    listOfNzMenuItemDirective: [{ type: ContentChildren, args: [NzMenuItemDirective, { descendants: true },] }],
    listOfNzSubMenuComponent: [{ type: ContentChildren, args: [NzSubMenuComponent, { descendants: true },] }],
    nzInlineIndent: [{ type: Input }],
    nzTheme: [{ type: Input }],
    nzMode: [{ type: Input }],
    nzInlineCollapsed: [{ type: Input }],
    nzSelectable: [{ type: Input }],
    nzClick: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuDirective.prototype, "nzInlineCollapsed", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMenuDirective.prototype, "nzSelectable", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21lbnUvIiwic291cmNlcyI6WyJtZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUlMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUVULFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXBGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXpELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxxQkFBa0MsRUFBRSxzQkFBbUM7SUFDeEcsT0FBTyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO0FBQ2hGLENBQUM7QUFDRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMseUJBQWtDO0lBQ3pFLE9BQU8seUJBQXlCLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDdkUsQ0FBQztBQTBDRCxNQUFNLE9BQU8sZUFBZTtJQW1DMUIsWUFDVSxhQUEwQixFQUNVLG9CQUE2QixFQUNqRSxHQUFzQjtRQUZ0QixrQkFBYSxHQUFiLGFBQWEsQ0FBYTtRQUNVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUztRQUNqRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWhDdkIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFvQixPQUFPLENBQUM7UUFDbkMsV0FBTSxHQUFtQixVQUFVLENBQUM7UUFDcEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDaEQsWUFBTyxHQUFHLElBQUksWUFBWSxFQUF1QixDQUFDO1FBQ3JFLGVBQVUsR0FBbUIsVUFBVSxDQUFDO1FBQ2hDLHFCQUFnQixHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hFLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLG1DQUE4QixHQUF5QixFQUFFLENBQUM7SUF1Qi9ELENBQUM7SUFyQkosa0JBQWtCLENBQUMsZUFBd0I7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDbEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDOUY7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxJQUFJLENBQUMsOEJBQThCLEdBQUcsRUFBRSxDQUFDO2FBQzFDO1NBQ0Y7SUFDSCxDQUFDO0lBUUQsUUFBUTtRQUNOLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDdkUsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM5RjtTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBOUhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxRQUFRLEVBQUUsV0FBVztxQkFDdEI7b0JBQ0QsaUNBQWlDO29CQUNqQzt3QkFDRSxPQUFPLEVBQUUsV0FBVzt3QkFDcEIsVUFBVSxFQUFFLGtCQUFrQjt3QkFDOUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLEVBQUUsdUJBQXVCLENBQUM7cUJBQy9FO29CQUNELG9EQUFvRDtvQkFDcEQ7d0JBQ0UsT0FBTyxFQUFFLDJCQUEyQjt3QkFDcEMsVUFBVSxFQUFFLHdCQUF3Qjt3QkFDcEMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztxQkFDdEU7aUJBQ0Y7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDJCQUEyQixFQUFFLHNCQUFzQjtvQkFDbkQsZ0NBQWdDLEVBQUUsc0JBQXNCO29CQUN4RCxpQ0FBaUMsRUFBRSw2Q0FBNkM7b0JBQ2hGLGdDQUFnQyxFQUFFLDRDQUE0QztvQkFDOUUsb0NBQW9DLEVBQUUsbURBQW1EO29CQUN6RixzQ0FBc0MsRUFBRSxxREFBcUQ7b0JBQzdGLGtDQUFrQyxFQUFFLGlEQUFpRDtvQkFDckYsNENBQTRDLEVBQUUsMkNBQTJDO29CQUN6RixrQkFBa0IsRUFBRSx1QkFBdUI7b0JBQzNDLHVCQUF1QixFQUFFLHVCQUF1QjtvQkFDaEQsd0JBQXdCLEVBQUUsOENBQThDO29CQUN4RSx1QkFBdUIsRUFBRSw2Q0FBNkM7b0JBQ3RFLDJCQUEyQixFQUFFLG9EQUFvRDtvQkFDakYsNkJBQTZCLEVBQUUsc0RBQXNEO29CQUNyRix5QkFBeUIsRUFBRSxrREFBa0Q7b0JBQzdFLG1DQUFtQyxFQUFFLDRDQUE0QztpQkFDbEY7YUFDRjs7O1lBbkRRLFdBQVc7MENBeUZmLE1BQU0sU0FBQywyQkFBMkI7WUE3R3JDLGlCQUFpQjs7O3dDQTRFaEIsZUFBZSxTQUFDLG1CQUFtQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTt1Q0FDMUQsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTs2QkFDekQsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7Z0NBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLE1BQU07O0FBRmtCO0lBQWYsWUFBWSxFQUFFOzswREFBMkI7QUFDMUI7SUFBZixZQUFZLEVBQUU7O3FEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFNraXBTZWxmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51U2VydmljZSB9IGZyb20gJy4vbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiwgTnpNZW51U2VydmljZUxvY2FsVG9rZW4gfSBmcm9tICcuL21lbnUudG9rZW4nO1xuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUsIE56TWVudVRoZW1lVHlwZSB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5pbXBvcnQgeyBOelN1Yk1lbnVDb21wb25lbnQgfSBmcm9tICcuL3N1Ym1lbnUuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIE1lbnVTZXJ2aWNlRmFjdG9yeShzZXJ2aWNlSW5zaWRlRHJvcERvd246IE1lbnVTZXJ2aWNlLCBzZXJ2aWNlT3V0c2lkZURyb3BEb3duOiBNZW51U2VydmljZSk6IE1lbnVTZXJ2aWNlIHtcbiAgcmV0dXJuIHNlcnZpY2VJbnNpZGVEcm9wRG93biA/IHNlcnZpY2VJbnNpZGVEcm9wRG93biA6IHNlcnZpY2VPdXRzaWRlRHJvcERvd247XG59XG5leHBvcnQgZnVuY3Rpb24gTWVudURyb3BEb3duVG9rZW5GYWN0b3J5KGlzTWVudUluc2lkZURyb3BEb3duVG9rZW46IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzTWVudUluc2lkZURyb3BEb3duVG9rZW4gPyBpc01lbnVJbnNpZGVEcm9wRG93blRva2VuIDogZmFsc2U7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1tZW51XScsXG4gIGV4cG9ydEFzOiAnbnpNZW51JyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTnpNZW51U2VydmljZUxvY2FsVG9rZW4sXG4gICAgICB1c2VDbGFzczogTWVudVNlcnZpY2VcbiAgICB9LFxuICAgIC8qKiB1c2UgdGhlIHRvcCBsZXZlbCBzZXJ2aWNlICoqL1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1lbnVTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogTWVudVNlcnZpY2VGYWN0b3J5LFxuICAgICAgZGVwczogW1tuZXcgU2tpcFNlbGYoKSwgbmV3IE9wdGlvbmFsKCksIE1lbnVTZXJ2aWNlXSwgTnpNZW51U2VydmljZUxvY2FsVG9rZW5dXG4gICAgfSxcbiAgICAvKiogY2hlY2sgaWYgbWVudSBpbnNpZGUgZHJvcGRvd24tbWVudSBjb21wb25lbnQgKiovXG4gICAge1xuICAgICAgcHJvdmlkZTogTnpJc01lbnVJbnNpZGVEcm9wRG93blRva2VuLFxuICAgICAgdXNlRmFjdG9yeTogTWVudURyb3BEb3duVG9rZW5GYWN0b3J5LFxuICAgICAgZGVwczogW1tuZXcgU2tpcFNlbGYoKSwgbmV3IE9wdGlvbmFsKCksIE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbl1dXG4gICAgfVxuICBdLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudV0nOiBgaXNNZW51SW5zaWRlRHJvcERvd25gLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtcm9vdF0nOiBgaXNNZW51SW5zaWRlRHJvcERvd25gLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtbGlnaHRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56VGhlbWUgPT09ICdsaWdodCdgLFxuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtZGFya10nOiBgaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpUaGVtZSA9PT0gJ2RhcmsnYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXZlcnRpY2FsXSc6IGBpc01lbnVJbnNpZGVEcm9wRG93biAmJiBhY3R1YWxNb2RlID09PSAndmVydGljYWwnYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWhvcml6b250YWxdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIGFjdHVhbE1vZGUgPT09ICdob3Jpem9udGFsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtZHJvcGRvd24tbWVudS1pbmxpbmVdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIGFjdHVhbE1vZGUgPT09ICdpbmxpbmUnYCxcbiAgICAnW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWlubGluZS1jb2xsYXBzZWRdJzogYGlzTWVudUluc2lkZURyb3BEb3duICYmIG56SW5saW5lQ29sbGFwc2VkYCxcbiAgICAnW2NsYXNzLmFudC1tZW51XSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd25gLFxuICAgICdbY2xhc3MuYW50LW1lbnUtcm9vdF0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWxpZ2h0XSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpUaGVtZSA9PT0gJ2xpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1kYXJrXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgbnpUaGVtZSA9PT0gJ2RhcmsnYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LXZlcnRpY2FsXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgYWN0dWFsTW9kZSA9PT0gJ3ZlcnRpY2FsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1ob3Jpem9udGFsXSc6IGAhaXNNZW51SW5zaWRlRHJvcERvd24gJiYgYWN0dWFsTW9kZSA9PT0gJ2hvcml6b250YWwnYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWlubGluZV0nOiBgIWlzTWVudUluc2lkZURyb3BEb3duICYmIGFjdHVhbE1vZGUgPT09ICdpbmxpbmUnYCxcbiAgICAnW2NsYXNzLmFudC1tZW51LWlubGluZS1jb2xsYXBzZWRdJzogYCFpc01lbnVJbnNpZGVEcm9wRG93biAmJiBueklubGluZUNvbGxhcHNlZGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOek1lbnVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256SW5saW5lQ29sbGFwc2VkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNlbGVjdGFibGU6IEJvb2xlYW5JbnB1dDtcblxuICBAQ29udGVudENoaWxkcmVuKE56TWVudUl0ZW1EaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mTnpNZW51SXRlbURpcmVjdGl2ZSE6IFF1ZXJ5TGlzdDxOek1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihOelN1Yk1lbnVDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgbGlzdE9mTnpTdWJNZW51Q29tcG9uZW50ITogUXVlcnlMaXN0PE56U3ViTWVudUNvbXBvbmVudD47XG4gIEBJbnB1dCgpIG56SW5saW5lSW5kZW50ID0gMjQ7XG4gIEBJbnB1dCgpIG56VGhlbWU6IE56TWVudVRoZW1lVHlwZSA9ICdsaWdodCc7XG4gIEBJbnB1dCgpIG56TW9kZTogTnpNZW51TW9kZVR5cGUgPSAndmVydGljYWwnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpJbmxpbmVDb2xsYXBzZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2VsZWN0YWJsZSA9ICF0aGlzLmlzTWVudUluc2lkZURyb3BEb3duO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8TnpNZW51SXRlbURpcmVjdGl2ZT4oKTtcbiAgYWN0dWFsTW9kZTogTnpNZW51TW9kZVR5cGUgPSAndmVydGljYWwnO1xuICBwcml2YXRlIGlubGluZUNvbGxhcHNlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRoaXMubnpJbmxpbmVDb2xsYXBzZWQpO1xuICBwcml2YXRlIG1vZGUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOek1lbnVNb2RlVHlwZT4odGhpcy5uek1vZGUpO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBsaXN0T2ZPcGVuZWROelN1Yk1lbnVDb21wb25lbnQ6IE56U3ViTWVudUNvbXBvbmVudFtdID0gW107XG5cbiAgc2V0SW5saW5lQ29sbGFwc2VkKGlubGluZUNvbGxhcHNlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpJbmxpbmVDb2xsYXBzZWQgPSBpbmxpbmVDb2xsYXBzZWQ7XG4gICAgdGhpcy5pbmxpbmVDb2xsYXBzZWQkLm5leHQoaW5saW5lQ29sbGFwc2VkKTtcbiAgfVxuXG4gIHVwZGF0ZUlubGluZUNvbGxhcHNlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RPZk56TWVudUl0ZW1EaXJlY3RpdmUpIHtcbiAgICAgIGlmICh0aGlzLm56SW5saW5lQ29sbGFwc2VkKSB7XG4gICAgICAgIHRoaXMubGlzdE9mT3BlbmVkTnpTdWJNZW51Q29tcG9uZW50ID0gdGhpcy5saXN0T2ZOelN1Yk1lbnVDb21wb25lbnQuZmlsdGVyKHN1Ym1lbnUgPT4gc3VibWVudS5uek9wZW4pO1xuICAgICAgICB0aGlzLmxpc3RPZk56U3ViTWVudUNvbXBvbmVudC5mb3JFYWNoKHN1Ym1lbnUgPT4gc3VibWVudS5zZXRPcGVuU3RhdGVXaXRob3V0RGVib3VuY2UoZmFsc2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGlzdE9mT3BlbmVkTnpTdWJNZW51Q29tcG9uZW50LmZvckVhY2goc3VibWVudSA9PiBzdWJtZW51LnNldE9wZW5TdGF0ZVdpdGhvdXREZWJvdW5jZSh0cnVlKSk7XG4gICAgICAgIHRoaXMubGlzdE9mT3BlbmVkTnpTdWJNZW51Q29tcG9uZW50ID0gW107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuek1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICBASW5qZWN0KE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbikgcHVibGljIGlzTWVudUluc2lkZURyb3BEb3duOiBib29sZWFuLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29tYmluZUxhdGVzdChbdGhpcy5pbmxpbmVDb2xsYXBzZWQkLCB0aGlzLm1vZGUkXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtpbmxpbmVDb2xsYXBzZWQsIG1vZGVdKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0dWFsTW9kZSA9IGlubGluZUNvbGxhcHNlZCA/ICd2ZXJ0aWNhbCcgOiBtb2RlO1xuICAgICAgICB0aGlzLm56TWVudVNlcnZpY2Uuc2V0TW9kZSh0aGlzLmFjdHVhbE1vZGUpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIHRoaXMubnpNZW51U2VydmljZS5kZXNjZW5kYW50TWVudUl0ZW1DbGljayQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShtZW51ID0+IHtcbiAgICAgIHRoaXMubnpDbGljay5lbWl0KG1lbnUpO1xuICAgICAgaWYgKHRoaXMubnpTZWxlY3RhYmxlICYmICFtZW51Lm56TWF0Y2hSb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5saXN0T2ZOek1lbnVJdGVtRGlyZWN0aXZlLmZvckVhY2goaXRlbSA9PiBpdGVtLnNldFNlbGVjdGVkU3RhdGUoaXRlbSA9PT0gbWVudSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5saW5lQ29sbGFwc2VkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlSW5saW5lQ29sbGFwc2UoKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpJbmxpbmVDb2xsYXBzZWQsIG56SW5saW5lSW5kZW50LCBuelRoZW1lLCBuek1vZGUgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56SW5saW5lQ29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmlubGluZUNvbGxhcHNlZCQubmV4dCh0aGlzLm56SW5saW5lQ29sbGFwc2VkKTtcbiAgICB9XG4gICAgaWYgKG56SW5saW5lSW5kZW50KSB7XG4gICAgICB0aGlzLm56TWVudVNlcnZpY2Uuc2V0SW5saW5lSW5kZW50KHRoaXMubnpJbmxpbmVJbmRlbnQpO1xuICAgIH1cbiAgICBpZiAobnpUaGVtZSkge1xuICAgICAgdGhpcy5uek1lbnVTZXJ2aWNlLnNldFRoZW1lKHRoaXMubnpUaGVtZSk7XG4gICAgfVxuICAgIGlmIChuek1vZGUpIHtcbiAgICAgIHRoaXMubW9kZSQubmV4dCh0aGlzLm56TW9kZSk7XG4gICAgICBpZiAoIWNoYW5nZXMubnpNb2RlLmlzRmlyc3RDaGFuZ2UoKSAmJiB0aGlzLmxpc3RPZk56U3ViTWVudUNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmxpc3RPZk56U3ViTWVudUNvbXBvbmVudC5mb3JFYWNoKHN1Ym1lbnUgPT4gc3VibWVudS5zZXRPcGVuU3RhdGVXaXRob3V0RGVib3VuY2UoZmFsc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==