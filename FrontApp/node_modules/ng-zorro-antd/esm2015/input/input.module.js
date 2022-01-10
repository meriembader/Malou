/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from './input-group.component';
import { NzInputDirective } from './input.directive';
export class NzInputModule {
}
NzInputModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzInputDirective,
                    NzInputGroupComponent,
                    NzAutosizeDirective,
                    NzInputGroupSlotComponent,
                    NzInputGroupWhitSuffixOrPrefixDirective
                ],
                exports: [NzInputDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupWhitSuffixOrPrefixDirective],
                imports: [CommonModule, NzIconModule, PlatformModule, NzOutletModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9pbnB1dC8iLCJzb3VyY2VzIjpbImlucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsdUNBQXVDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWFyRCxNQUFNLE9BQU8sYUFBYTs7O1lBWHpCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZ0JBQWdCO29CQUNoQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIseUJBQXlCO29CQUN6Qix1Q0FBdUM7aUJBQ3hDO2dCQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLHVDQUF1QyxDQUFDO2dCQUNoSCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7YUFDdEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5cbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOekF1dG9zaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRvc2l6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpJbnB1dEdyb3VwU2xvdENvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtZ3JvdXAtc2xvdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpJbnB1dEdyb3VwQ29tcG9uZW50LCBOeklucHV0R3JvdXBXaGl0U3VmZml4T3JQcmVmaXhEaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOeklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOeklucHV0RGlyZWN0aXZlLFxuICAgIE56SW5wdXRHcm91cENvbXBvbmVudCxcbiAgICBOekF1dG9zaXplRGlyZWN0aXZlLFxuICAgIE56SW5wdXRHcm91cFNsb3RDb21wb25lbnQsXG4gICAgTnpJbnB1dEdyb3VwV2hpdFN1ZmZpeE9yUHJlZml4RGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHM6IFtOeklucHV0RGlyZWN0aXZlLCBOeklucHV0R3JvdXBDb21wb25lbnQsIE56QXV0b3NpemVEaXJlY3RpdmUsIE56SW5wdXRHcm91cFdoaXRTdWZmaXhPclByZWZpeERpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56SWNvbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGUsIE56T3V0bGV0TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOeklucHV0TW9kdWxlIHt9XG4iXX0=