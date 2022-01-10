/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * A collection module of standard output for all lib components
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { DateHeaderComponent } from './date-header.component';
import { DateTableComponent } from './date-table.component';
import { DecadeHeaderComponent } from './decade-header.component';
import { DecadeTableComponent } from './decade-table.component';
import { MonthHeaderComponent } from './month-header.component';
import { MonthTableComponent } from './month-table.component';
import { YearHeaderComponent } from './year-header.component';
import { YearTableComponent } from './year-table.component';
export class LibPackerModule {
}
LibPackerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, NzI18nModule, NzTimePickerModule, NzOutletModule],
                exports: [
                    DateHeaderComponent,
                    DateTableComponent,
                    DecadeHeaderComponent,
                    DecadeTableComponent,
                    MonthHeaderComponent,
                    MonthTableComponent,
                    YearHeaderComponent,
                    YearTableComponent
                ],
                declarations: [
                    DateHeaderComponent,
                    DateTableComponent,
                    DecadeHeaderComponent,
                    DecadeTableComponent,
                    MonthHeaderComponent,
                    MonthTableComponent,
                    YearHeaderComponent,
                    YearTableComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLXBhY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RhdGUtcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2xpYi1wYWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVIOztHQUVHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUF5QjVELE1BQU0sT0FBTyxlQUFlOzs7WUF2QjNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUM7Z0JBQ3RGLE9BQU8sRUFBRTtvQkFDUCxtQkFBbUI7b0JBQ25CLGtCQUFrQjtvQkFDbEIscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gbW9kdWxlIG9mIHN0YW5kYXJkIG91dHB1dCBmb3IgYWxsIGxpYiBjb21wb25lbnRzXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5cbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOelRpbWVQaWNrZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3RpbWUtcGlja2VyJztcbmltcG9ydCB7IERhdGVIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGFibGVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY2FkZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZGVjYWRlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGVjYWRlVGFibGVDb21wb25lbnQgfSBmcm9tICcuL2RlY2FkZS10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9udGhIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL21vbnRoLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9udGhUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbW9udGgtdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFllYXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3llYXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZZWFyVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3llYXItdGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE56STE4bk1vZHVsZSwgTnpUaW1lUGlja2VyTW9kdWxlLCBOek91dGxldE1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBEYXRlSGVhZGVyQ29tcG9uZW50LFxuICAgIERhdGVUYWJsZUNvbXBvbmVudCxcbiAgICBEZWNhZGVIZWFkZXJDb21wb25lbnQsXG4gICAgRGVjYWRlVGFibGVDb21wb25lbnQsXG4gICAgTW9udGhIZWFkZXJDb21wb25lbnQsXG4gICAgTW9udGhUYWJsZUNvbXBvbmVudCxcbiAgICBZZWFySGVhZGVyQ29tcG9uZW50LFxuICAgIFllYXJUYWJsZUNvbXBvbmVudFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEYXRlSGVhZGVyQ29tcG9uZW50LFxuICAgIERhdGVUYWJsZUNvbXBvbmVudCxcbiAgICBEZWNhZGVIZWFkZXJDb21wb25lbnQsXG4gICAgRGVjYWRlVGFibGVDb21wb25lbnQsXG4gICAgTW9udGhIZWFkZXJDb21wb25lbnQsXG4gICAgTW9udGhUYWJsZUNvbXBvbmVudCxcbiAgICBZZWFySGVhZGVyQ29tcG9uZW50LFxuICAgIFllYXJUYWJsZUNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpYlBhY2tlck1vZHVsZSB7fVxuIl19