/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzModalCloseComponent } from './modal-close.component';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalFooterComponent } from './modal-footer.component';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalTitleComponent } from './modal-title.component';
import { NzModalComponent } from './modal.component';
import { NzModalService } from './modal.service';
export class NzModalModule {
}
NzModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    NzOutletModule,
                    PortalModule,
                    NzI18nModule,
                    NzButtonModule,
                    NzIconModule,
                    NzPipesModule,
                    NzNoAnimationModule,
                    NzPipesModule
                ],
                exports: [NzModalComponent, NzModalFooterDirective],
                providers: [NzModalService],
                entryComponents: [NzModalContainerComponent, NzModalConfirmContainerComponent],
                declarations: [
                    NzModalComponent,
                    NzModalFooterDirective,
                    NzModalCloseComponent,
                    NzModalFooterComponent,
                    NzModalTitleComponent,
                    NzModalContainerComponent,
                    NzModalConfirmContainerComponent,
                    NzModalComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBNkJqRCxNQUFNLE9BQU8sYUFBYTs7O1lBM0J6QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixjQUFjO29CQUNkLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixjQUFjO29CQUNkLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixtQkFBbUI7b0JBQ25CLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ25ELFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDM0IsZUFBZSxFQUFFLENBQUMseUJBQXlCLEVBQUUsZ0NBQWdDLENBQUM7Z0JBQzlFLFlBQVksRUFBRTtvQkFDWixnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIseUJBQXlCO29CQUN6QixnQ0FBZ0M7b0JBQ2hDLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56UGlwZXNNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3BpcGVzJztcblxuaW1wb3J0IHsgTnpNb2RhbENsb3NlQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jbG9zZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbENvbmZpcm1Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbmZpcm0tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56TW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vbW9kYWwtZm9vdGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek1vZGFsVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE56STE4bk1vZHVsZSxcbiAgICBOekJ1dHRvbk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpQaXBlc01vZHVsZSxcbiAgICBOek5vQW5pbWF0aW9uTW9kdWxlLFxuICAgIE56UGlwZXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW056TW9kYWxDb21wb25lbnQsIE56TW9kYWxGb290ZXJEaXJlY3RpdmVdLFxuICBwcm92aWRlcnM6IFtOek1vZGFsU2VydmljZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW056TW9kYWxDb250YWluZXJDb21wb25lbnQsIE56TW9kYWxDb25maXJtQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpNb2RhbENvbXBvbmVudCxcbiAgICBOek1vZGFsRm9vdGVyRGlyZWN0aXZlLFxuICAgIE56TW9kYWxDbG9zZUNvbXBvbmVudCxcbiAgICBOek1vZGFsRm9vdGVyQ29tcG9uZW50LFxuICAgIE56TW9kYWxUaXRsZUNvbXBvbmVudCxcbiAgICBOek1vZGFsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE56TW9kYWxDb25maXJtQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE56TW9kYWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOek1vZGFsTW9kdWxlIHt9XG4iXX0=