/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CalendarFooterComponent } from './calendar-footer.component';
import { NzDatePickerComponent } from './date-picker.component';
import { DateRangePopupComponent } from './date-range-popup.component';
import { InnerPopupComponent } from './inner-popup.component';
import { LibPackerModule } from './lib/lib-packer.module';
import { NzMonthPickerComponent } from './month-picker.component';
import { NzPickerComponent } from './picker.component';
import { NzRangePickerComponent } from './range-picker.component';
import { NzWeekPickerComponent } from './week-picker.component';
import { NzYearPickerComponent } from './year-picker.component';
export class NzDatePickerModule {
}
NzDatePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    OverlayModule,
                    LibPackerModule,
                    NzIconModule,
                    NzOverlayModule,
                    NzNoAnimationModule,
                    NzOutletModule,
                    NzTimePickerModule,
                    NzButtonModule,
                    LibPackerModule
                ],
                exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent],
                declarations: [
                    NzPickerComponent,
                    NzDatePickerComponent,
                    NzMonthPickerComponent,
                    NzYearPickerComponent,
                    NzWeekPickerComponent,
                    NzRangePickerComponent,
                    CalendarFooterComponent,
                    InnerPopupComponent,
                    DateRangePopupComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kYXRlLXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUE4QmhFLE1BQU0sT0FBTyxrQkFBa0I7OztZQTVCOUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixlQUFlO29CQUNmLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGNBQWM7b0JBQ2Qsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGVBQWU7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDO2dCQUM5SCxZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO29CQUNqQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFFdEIsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLHVCQUF1QjtpQkFDeEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOek92ZXJsYXlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpUaW1lUGlja2VyTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBDYWxlbmRhckZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItZm9vdGVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE56RGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVSYW5nZVBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXJhbmdlLXBvcHVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbm5lclBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9pbm5lci1wb3B1cC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBMaWJQYWNrZXJNb2R1bGUgfSBmcm9tICcuL2xpYi9saWItcGFja2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBOek1vbnRoUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9tb250aC1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56UGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56UmFuZ2VQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL3JhbmdlLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpXZWVrUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi93ZWVrLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpZZWFyUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi95ZWFyLXBpY2tlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgTGliUGFja2VyTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOek92ZXJsYXlNb2R1bGUsXG4gICAgTnpOb0FuaW1hdGlvbk1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZSxcbiAgICBOelRpbWVQaWNrZXJNb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgTGliUGFja2VyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtOekRhdGVQaWNrZXJDb21wb25lbnQsIE56UmFuZ2VQaWNrZXJDb21wb25lbnQsIE56TW9udGhQaWNrZXJDb21wb25lbnQsIE56WWVhclBpY2tlckNvbXBvbmVudCwgTnpXZWVrUGlja2VyQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpQaWNrZXJDb21wb25lbnQsXG4gICAgTnpEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIE56TW9udGhQaWNrZXJDb21wb25lbnQsXG4gICAgTnpZZWFyUGlja2VyQ29tcG9uZW50LFxuICAgIE56V2Vla1BpY2tlckNvbXBvbmVudCxcbiAgICBOelJhbmdlUGlja2VyQ29tcG9uZW50LFxuXG4gICAgQ2FsZW5kYXJGb290ZXJDb21wb25lbnQsXG4gICAgSW5uZXJQb3B1cENvbXBvbmVudCxcbiAgICBEYXRlUmFuZ2VQb3B1cENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56RGF0ZVBpY2tlck1vZHVsZSB7fVxuIl19