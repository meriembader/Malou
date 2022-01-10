/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPaginationDefaultComponent } from './pagination-default.component';
import { NzPaginationItemComponent } from './pagination-item.component';
import { NzPaginationOptionsComponent } from './pagination-options.component';
import { NzPaginationSimpleComponent } from './pagination-simple.component';
import { NzPaginationComponent } from './pagination.component';
export class NzPaginationModule {
}
NzPaginationModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzPaginationComponent,
                    NzPaginationSimpleComponent,
                    NzPaginationOptionsComponent,
                    NzPaginationItemComponent,
                    NzPaginationDefaultComponent
                ],
                exports: [NzPaginationComponent],
                imports: [CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3BhZ2luYXRpb24vIiwic291cmNlcyI6WyJwYWdpbmF0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFhL0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBWDlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1oscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBQzNCLDRCQUE0QjtvQkFDNUIseUJBQXlCO29CQUN6Qiw0QkFBNEI7aUJBQzdCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO2FBQ2pGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelNlbGVjdE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc2VsZWN0JztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkRlZmF1bHRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2luYXRpb24tZGVmYXVsdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25PcHRpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdpbmF0aW9uLW9wdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE56UGFnaW5hdGlvblNpbXBsZUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1zaW1wbGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOelBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgTnpQYWdpbmF0aW9uU2ltcGxlQ29tcG9uZW50LFxuICAgIE56UGFnaW5hdGlvbk9wdGlvbnNDb21wb25lbnQsXG4gICAgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCxcbiAgICBOelBhZ2luYXRpb25EZWZhdWx0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtOelBhZ2luYXRpb25Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTnpTZWxlY3RNb2R1bGUsIE56STE4bk1vZHVsZSwgTnpJY29uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2luYXRpb25Nb2R1bGUge31cbiJdfQ==