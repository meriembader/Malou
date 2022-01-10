/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzContextMenuServiceModule } from './context-menu.service.module';
import { NzDropDownADirective } from './dropdown-a.directive';
import { NzDropdownButtonDirective } from './dropdown-button.directive';
import { NzDropdownMenuComponent } from './dropdown-menu.component';
import { NzDropDownDirective } from './dropdown.directive';
export class NzDropDownModule {
}
NzDropDownModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    FormsModule,
                    NzButtonModule,
                    NzMenuModule,
                    NzIconModule,
                    NzNoAnimationModule,
                    PlatformModule,
                    NzOverlayModule,
                    NzContextMenuServiceModule,
                    NzOutletModule
                ],
                entryComponents: [NzDropdownMenuComponent],
                declarations: [NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective],
                exports: [NzMenuModule, NzDropDownDirective, NzDropDownADirective, NzDropdownMenuComponent, NzDropdownButtonDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBb0IzRCxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFsQjVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixhQUFhO29CQUNiLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixjQUFjO29CQUNkLGVBQWU7b0JBQ2YsMEJBQTBCO29CQUMxQixjQUFjO2lCQUNmO2dCQUNELGVBQWUsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUMxQyxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUIsQ0FBQztnQkFDN0csT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDO2FBQ3ZIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpPdmVybGF5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL292ZXJsYXknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56TWVudU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvbWVudSc7XG5pbXBvcnQgeyBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UubW9kdWxlJztcbmltcG9ydCB7IE56RHJvcERvd25BRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi1hLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekRyb3Bkb3duQnV0dG9uRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi1idXR0b24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56RHJvcGRvd25NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekRyb3BEb3duRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgTnpNZW51TW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek5vQW5pbWF0aW9uTW9kdWxlLFxuICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgIE56T3ZlcmxheU1vZHVsZSxcbiAgICBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtOekRyb3Bkb3duTWVudUNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW056RHJvcERvd25EaXJlY3RpdmUsIE56RHJvcERvd25BRGlyZWN0aXZlLCBOekRyb3Bkb3duTWVudUNvbXBvbmVudCwgTnpEcm9wZG93bkJ1dHRvbkRpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOek1lbnVNb2R1bGUsIE56RHJvcERvd25EaXJlY3RpdmUsIE56RHJvcERvd25BRGlyZWN0aXZlLCBOekRyb3Bkb3duTWVudUNvbXBvbmVudCwgTnpEcm9wZG93bkJ1dHRvbkRpcmVjdGl2ZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpEcm9wRG93bk1vZHVsZSB7fVxuIl19