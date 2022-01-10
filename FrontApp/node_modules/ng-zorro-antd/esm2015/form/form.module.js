/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormControlComponent } from './form-control.component';
import { NzFormItemComponent } from './form-item.component';
import { NzFormLabelComponent } from './form-label.component';
import { NzFormSplitComponent } from './form-split.component';
import { NzFormTextComponent } from './form-text.component';
import { NzFormDirective } from './form.directive';
export class NzFormModule {
}
NzFormModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzFormDirective,
                    NzFormItemComponent,
                    NzFormLabelComponent,
                    NzFormControlComponent,
                    NzFormTextComponent,
                    NzFormSplitComponent
                ],
                exports: [
                    NzGridModule,
                    NzFormDirective,
                    NzFormItemComponent,
                    NzFormLabelComponent,
                    NzFormControlComponent,
                    NzFormTextComponent,
                    NzFormSplitComponent
                ],
                imports: [CommonModule, NzGridModule, NzIconModule, NzToolTipModule, LayoutModule, PlatformModule, NzOutletModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2Zvcm0vIiwic291cmNlcyI6WyJmb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFzQm5ELE1BQU0sT0FBTyxZQUFZOzs7WUFwQnhCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0QixtQkFBbUI7b0JBQ25CLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDO2FBQ25IIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56R3JpZE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZ3JpZCc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuaW1wb3J0IHsgTnpGb3JtQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekZvcm1JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE56Rm9ybUxhYmVsQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWxhYmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekZvcm1TcGxpdENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1zcGxpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpGb3JtVGV4dENvbXBvbmVudCB9IGZyb20gJy4vZm9ybS10ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekZvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2Zvcm0uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpGb3JtRGlyZWN0aXZlLFxuICAgIE56Rm9ybUl0ZW1Db21wb25lbnQsXG4gICAgTnpGb3JtTGFiZWxDb21wb25lbnQsXG4gICAgTnpGb3JtQ29udHJvbENvbXBvbmVudCxcbiAgICBOekZvcm1UZXh0Q29tcG9uZW50LFxuICAgIE56Rm9ybVNwbGl0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOekdyaWRNb2R1bGUsXG4gICAgTnpGb3JtRGlyZWN0aXZlLFxuICAgIE56Rm9ybUl0ZW1Db21wb25lbnQsXG4gICAgTnpGb3JtTGFiZWxDb21wb25lbnQsXG4gICAgTnpGb3JtQ29udHJvbENvbXBvbmVudCxcbiAgICBOekZvcm1UZXh0Q29tcG9uZW50LFxuICAgIE56Rm9ybVNwbGl0Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56R3JpZE1vZHVsZSwgTnpJY29uTW9kdWxlLCBOelRvb2xUaXBNb2R1bGUsIExheW91dE1vZHVsZSwgUGxhdGZvcm1Nb2R1bGUsIE56T3V0bGV0TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOekZvcm1Nb2R1bGUge31cbiJdfQ==