/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRateItemComponent } from './rate-item.component';
import { NzRateComponent } from './rate.component';
export class NzRateModule {
}
NzRateModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzRateComponent],
                declarations: [NzRateComponent, NzRateItemComponent],
                imports: [CommonModule, NzIconModule, NzToolTipModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3JhdGUvIiwic291cmNlcyI6WyJyYXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU9uRCxNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztnQkFDcEQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUM7YUFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56VG9vbFRpcE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5cbmltcG9ydCB7IE56UmF0ZUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL3JhdGUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpSYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9yYXRlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtOelJhdGVDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOelJhdGVDb21wb25lbnQsIE56UmF0ZUl0ZW1Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIE56VG9vbFRpcE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpSYXRlTW9kdWxlIHt9XG4iXX0=