/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStepComponent } from './step.component';
import { NzStepsComponent } from './steps.component';
export class NzStepsModule {
}
NzStepsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzIconModule, NzOutletModule],
                exports: [NzStepsComponent, NzStepComponent],
                declarations: [NzStepsComponent, NzStepComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zdGVwcy8iLCJzb3VyY2VzIjpbInN0ZXBzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9yRCxNQUFNLE9BQU8sYUFBYTs7O1lBTHpCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztnQkFDckQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO2dCQUM1QyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IE56U3RlcENvbXBvbmVudCB9IGZyb20gJy4vc3RlcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTdGVwc0NvbXBvbmVudCB9IGZyb20gJy4vc3RlcHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTnpJY29uTW9kdWxlLCBOek91dGxldE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtOelN0ZXBzQ29tcG9uZW50LCBOelN0ZXBDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOelN0ZXBzQ29tcG9uZW50LCBOelN0ZXBDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56U3RlcHNNb2R1bGUge31cbiJdfQ==