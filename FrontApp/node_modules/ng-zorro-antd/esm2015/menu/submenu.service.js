/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, mapTo, mergeMap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { NzIsMenuInsideDropDownToken } from './menu.token';
export class NzSubmenuService {
    constructor(nzHostSubmenuService, nzMenuService, isMenuInsideDropDown) {
        this.nzHostSubmenuService = nzHostSubmenuService;
        this.nzMenuService = nzMenuService;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        this.mode$ = this.nzMenuService.mode$.pipe(map(mode => {
            if (mode === 'inline') {
                return 'inline';
                /** if inside another submenu, set the mode to vertical **/
            }
            else if (mode === 'vertical' || this.nzHostSubmenuService) {
                return 'vertical';
            }
            else {
                return 'horizontal';
            }
        }));
        this.level = 1;
        this.isCurrentSubMenuOpen$ = new BehaviorSubject(false);
        this.isChildSubMenuOpen$ = new BehaviorSubject(false);
        /** submenu title & overlay mouse enter status **/
        this.isMouseEnterTitleOrOverlay$ = new Subject();
        this.childMenuItemClick$ = new Subject();
        if (this.nzHostSubmenuService) {
            this.level = this.nzHostSubmenuService.level + 1;
        }
        /** close if menu item clicked **/
        const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(mergeMap(() => this.mode$), filter(mode => mode !== 'inline' || this.isMenuInsideDropDown), mapTo(false));
        const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
        /** combine the child submenu status with current submenu status to calculate host submenu open **/
        const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(map(([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen), auditTime(150), distinctUntilChanged());
        isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged()).subscribe(data => {
            this.setOpenStateWithoutDebounce(data);
            if (this.nzHostSubmenuService) {
                /** set parent submenu's child submenu open status **/
                this.nzHostSubmenuService.isChildSubMenuOpen$.next(data);
            }
            else {
                this.nzMenuService.isChildSubMenuOpen$.next(data);
            }
        });
    }
    /**
     * menu item inside submenu clicked
     * @param menu
     */
    onChildMenuItemClick(menu) {
        this.childMenuItemClick$.next(menu);
    }
    setOpenStateWithoutDebounce(value) {
        this.isCurrentSubMenuOpen$.next(value);
    }
    setMouseEnterTitleOrOverlayState(value) {
        this.isMouseEnterTitleOrOverlay$.next(value);
    }
}
NzSubmenuService.decorators = [
    { type: Injectable }
];
NzSubmenuService.ctorParameters = () => [
    { type: NzSubmenuService, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: MenuService },
    { type: Boolean, decorators: [{ type: Inject, args: [NzIsMenuInsideDropDownToken,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tZW51LyIsInNvdXJjZXMiOlsic3VibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJM0QsTUFBTSxPQUFPLGdCQUFnQjtJQWlDM0IsWUFDa0Msb0JBQXNDLEVBQy9ELGFBQTBCLEVBQ1csb0JBQTZCO1FBRnpDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBa0I7UUFDL0Qsa0JBQWEsR0FBYixhQUFhLENBQWE7UUFDVyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVM7UUFuQzNFLFVBQUssR0FBK0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUMvRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sUUFBUSxDQUFDO2dCQUNoQiwyREFBMkQ7YUFDNUQ7aUJBQU0sSUFBSSxJQUFJLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDM0QsT0FBTyxVQUFVLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0wsT0FBTyxZQUFZLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLDBCQUFxQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3BELHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLGtEQUFrRDtRQUMxQyxnQ0FBMkIsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ3JELHdCQUFtQixHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7UUFvQnJELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxrQ0FBa0M7UUFDbEMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUMzRCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUM5RCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQ2IsQ0FBQztRQUNGLE1BQU0scUJBQXFCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQy9GLG1HQUFtRztRQUNuRyxNQUFNLDBCQUEwQixHQUFHLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN0RyxHQUFHLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixJQUFJLG9CQUFvQixDQUFDLEVBQy9GLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDZCxvQkFBb0IsRUFBRSxDQUN2QixDQUFDO1FBQ0YsMEJBQTBCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkUsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixzREFBc0Q7Z0JBQ3RELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE1Q0Q7OztPQUdHO0lBQ0gsb0JBQW9CLENBQUMsSUFBZTtRQUNsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCwyQkFBMkIsQ0FBQyxLQUFjO1FBQ3hDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELGdDQUFnQyxDQUFDLEtBQWM7UUFDN0MsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUFoQ0YsVUFBVTs7O1lBbUMrQyxnQkFBZ0IsdUJBQXJFLFFBQVEsWUFBSSxRQUFRO1lBdkNoQixXQUFXOzBDQXlDZixNQUFNLFNBQUMsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgbWFwVG8sIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWVudVNlcnZpY2UgfSBmcm9tICcuL21lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW4gfSBmcm9tICcuL21lbnUudG9rZW4nO1xuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUgfSBmcm9tICcuL21lbnUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnpTdWJtZW51U2VydmljZSB7XG4gIG1vZGUkOiBPYnNlcnZhYmxlPE56TWVudU1vZGVUeXBlPiA9IHRoaXMubnpNZW51U2VydmljZS5tb2RlJC5waXBlKFxuICAgIG1hcChtb2RlID0+IHtcbiAgICAgIGlmIChtb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICByZXR1cm4gJ2lubGluZSc7XG4gICAgICAgIC8qKiBpZiBpbnNpZGUgYW5vdGhlciBzdWJtZW51LCBzZXQgdGhlIG1vZGUgdG8gdmVydGljYWwgKiovXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICd2ZXJ0aWNhbCcgfHwgdGhpcy5uekhvc3RTdWJtZW51U2VydmljZSkge1xuICAgICAgICByZXR1cm4gJ3ZlcnRpY2FsJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnaG9yaXpvbnRhbCc7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcbiAgbGV2ZWwgPSAxO1xuICBpc0N1cnJlbnRTdWJNZW51T3BlbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSBpc0NoaWxkU3ViTWVudU9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIC8qKiBzdWJtZW51IHRpdGxlICYgb3ZlcmxheSBtb3VzZSBlbnRlciBzdGF0dXMgKiovXG4gIHByaXZhdGUgaXNNb3VzZUVudGVyVGl0bGVPck92ZXJsYXkkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSBjaGlsZE1lbnVJdGVtQ2xpY2skID0gbmV3IFN1YmplY3Q8TnpTYWZlQW55PigpO1xuICAvKipcbiAgICogbWVudSBpdGVtIGluc2lkZSBzdWJtZW51IGNsaWNrZWRcbiAgICogQHBhcmFtIG1lbnVcbiAgICovXG4gIG9uQ2hpbGRNZW51SXRlbUNsaWNrKG1lbnU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hpbGRNZW51SXRlbUNsaWNrJC5uZXh0KG1lbnUpO1xuICB9XG4gIHNldE9wZW5TdGF0ZVdpdGhvdXREZWJvdW5jZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaXNDdXJyZW50U3ViTWVudU9wZW4kLm5leHQodmFsdWUpO1xuICB9XG4gIHNldE1vdXNlRW50ZXJUaXRsZU9yT3ZlcmxheVN0YXRlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc01vdXNlRW50ZXJUaXRsZU9yT3ZlcmxheSQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBwcml2YXRlIG56SG9zdFN1Ym1lbnVTZXJ2aWNlOiBOelN1Ym1lbnVTZXJ2aWNlLFxuICAgIHB1YmxpYyBuek1lbnVTZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICBASW5qZWN0KE56SXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbikgcHVibGljIGlzTWVudUluc2lkZURyb3BEb3duOiBib29sZWFuXG4gICkge1xuICAgIGlmICh0aGlzLm56SG9zdFN1Ym1lbnVTZXJ2aWNlKSB7XG4gICAgICB0aGlzLmxldmVsID0gdGhpcy5uekhvc3RTdWJtZW51U2VydmljZS5sZXZlbCArIDE7XG4gICAgfVxuICAgIC8qKiBjbG9zZSBpZiBtZW51IGl0ZW0gY2xpY2tlZCAqKi9cbiAgICBjb25zdCBpc0Nsb3NlZEJ5TWVudUl0ZW1DbGljayA9IHRoaXMuY2hpbGRNZW51SXRlbUNsaWNrJC5waXBlKFxuICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy5tb2RlJCksXG4gICAgICBmaWx0ZXIobW9kZSA9PiBtb2RlICE9PSAnaW5saW5lJyB8fCB0aGlzLmlzTWVudUluc2lkZURyb3BEb3duKSxcbiAgICAgIG1hcFRvKGZhbHNlKVxuICAgICk7XG4gICAgY29uc3QgaXNDdXJyZW50U3VibWVudU9wZW4kID0gbWVyZ2UodGhpcy5pc01vdXNlRW50ZXJUaXRsZU9yT3ZlcmxheSQsIGlzQ2xvc2VkQnlNZW51SXRlbUNsaWNrKTtcbiAgICAvKiogY29tYmluZSB0aGUgY2hpbGQgc3VibWVudSBzdGF0dXMgd2l0aCBjdXJyZW50IHN1Ym1lbnUgc3RhdHVzIHRvIGNhbGN1bGF0ZSBob3N0IHN1Ym1lbnUgb3BlbiAqKi9cbiAgICBjb25zdCBpc1N1Yk1lbnVPcGVuV2l0aERlYm91bmNlJCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMuaXNDaGlsZFN1Yk1lbnVPcGVuJCwgaXNDdXJyZW50U3VibWVudU9wZW4kXSkucGlwZShcbiAgICAgIG1hcCgoW2lzQ2hpbGRTdWJNZW51T3BlbiwgaXNDdXJyZW50U3VibWVudU9wZW5dKSA9PiBpc0NoaWxkU3ViTWVudU9wZW4gfHwgaXNDdXJyZW50U3VibWVudU9wZW4pLFxuICAgICAgYXVkaXRUaW1lKDE1MCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgICBpc1N1Yk1lbnVPcGVuV2l0aERlYm91bmNlJC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMuc2V0T3BlblN0YXRlV2l0aG91dERlYm91bmNlKGRhdGEpO1xuICAgICAgaWYgKHRoaXMubnpIb3N0U3VibWVudVNlcnZpY2UpIHtcbiAgICAgICAgLyoqIHNldCBwYXJlbnQgc3VibWVudSdzIGNoaWxkIHN1Ym1lbnUgb3BlbiBzdGF0dXMgKiovXG4gICAgICAgIHRoaXMubnpIb3N0U3VibWVudVNlcnZpY2UuaXNDaGlsZFN1Yk1lbnVPcGVuJC5uZXh0KGRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uek1lbnVTZXJ2aWNlLmlzQ2hpbGRTdWJNZW51T3BlbiQubmV4dChkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19