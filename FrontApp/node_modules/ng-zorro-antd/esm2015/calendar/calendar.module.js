/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibPackerModule } from 'ng-zorro-antd/date-picker';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective } from './calendar-cells';
import { NzCalendarHeaderComponent } from './calendar-header.component';
import { NzCalendarComponent } from './calendar.component';
export class NzCalendarModule {
}
NzCalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzCalendarHeaderComponent,
                    NzCalendarComponent,
                    NzDateCellDirective,
                    NzDateFullCellDirective,
                    NzMonthCellDirective,
                    NzMonthFullCellDirective
                ],
                exports: [NzCalendarComponent, NzDateCellDirective, NzDateFullCellDirective, NzMonthCellDirective, NzMonthFullCellDirective],
                imports: [CommonModule, FormsModule, NzI18nModule, NzRadioModule, NzSelectModule, LibPackerModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jYWxlbmRhci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hJLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBYzNELE1BQU0sT0FBTyxnQkFBZ0I7OztZQVo1QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLHlCQUF5QjtvQkFDekIsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLHVCQUF1QjtvQkFDdkIsb0JBQW9CO29CQUNwQix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO2dCQUM1SCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQzthQUNuRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMaWJQYWNrZXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2RhdGUtcGlja2VyJztcblxuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56UmFkaW9Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3JhZGlvJztcbmltcG9ydCB7IE56U2VsZWN0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zZWxlY3QnO1xuXG5pbXBvcnQgeyBOekRhdGVDZWxsRGlyZWN0aXZlLCBOekRhdGVGdWxsQ2VsbERpcmVjdGl2ZSwgTnpNb250aENlbGxEaXJlY3RpdmUsIE56TW9udGhGdWxsQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4vY2FsZW5kYXItY2VsbHMnO1xuaW1wb3J0IHsgTnpDYWxlbmRhckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekNhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOekNhbGVuZGFySGVhZGVyQ29tcG9uZW50LFxuICAgIE56Q2FsZW5kYXJDb21wb25lbnQsXG4gICAgTnpEYXRlQ2VsbERpcmVjdGl2ZSxcbiAgICBOekRhdGVGdWxsQ2VsbERpcmVjdGl2ZSxcbiAgICBOek1vbnRoQ2VsbERpcmVjdGl2ZSxcbiAgICBOek1vbnRoRnVsbENlbGxEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW056Q2FsZW5kYXJDb21wb25lbnQsIE56RGF0ZUNlbGxEaXJlY3RpdmUsIE56RGF0ZUZ1bGxDZWxsRGlyZWN0aXZlLCBOek1vbnRoQ2VsbERpcmVjdGl2ZSwgTnpNb250aEZ1bGxDZWxsRGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE56STE4bk1vZHVsZSwgTnpSYWRpb01vZHVsZSwgTnpTZWxlY3RNb2R1bGUsIExpYlBhY2tlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYWxlbmRhck1vZHVsZSB7fVxuIl19