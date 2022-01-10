/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzOptionContainerComponent } from './option-container.component';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionItemGroupComponent } from './option-item-group.component';
import { NzOptionItemComponent } from './option-item.component';
import { NzOptionComponent } from './option.component';
import { NzSelectArrowComponent } from './select-arrow.component';
import { NzSelectClearComponent } from './select-clear.component';
import { NzSelectItemComponent } from './select-item.component';
import { NzSelectPlaceholderComponent } from './select-placeholder.component';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent } from './select.component';
export class NzSelectModule {
}
NzSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NzI18nModule,
                    FormsModule,
                    PlatformModule,
                    OverlayModule,
                    NzIconModule,
                    NzOutletModule,
                    NzEmptyModule,
                    NzOverlayModule,
                    NzNoAnimationModule,
                    NzTransitionPatchModule,
                    ScrollingModule,
                    A11yModule
                ],
                declarations: [
                    NzOptionComponent,
                    NzSelectComponent,
                    NzOptionContainerComponent,
                    NzOptionGroupComponent,
                    NzOptionItemComponent,
                    NzSelectTopControlComponent,
                    NzSelectSearchComponent,
                    NzSelectItemComponent,
                    NzSelectClearComponent,
                    NzSelectArrowComponent,
                    NzSelectPlaceholderComponent,
                    NzOptionItemGroupComponent
                ],
                exports: [
                    NzOptionComponent,
                    NzSelectComponent,
                    NzOptionGroupComponent,
                    NzSelectArrowComponent,
                    NzSelectClearComponent,
                    NzSelectItemComponent,
                    NzSelectPlaceholderComponent,
                    NzSelectSearchComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHdCQUF3QixJQUFJLHVCQUF1QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUEyQ3ZELE1BQU0sT0FBTyxjQUFjOzs7WUF6QzFCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLGVBQWU7b0JBQ2YsVUFBVTtpQkFDWDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLDBCQUEwQjtvQkFDMUIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLDJCQUEyQjtvQkFDM0IsdUJBQXVCO29CQUN2QixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0Qiw0QkFBNEI7b0JBQzVCLDBCQUEwQjtpQkFDM0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixzQkFBc0I7b0JBQ3RCLHNCQUFzQjtvQkFDdEIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLDRCQUE0QjtvQkFDNUIsdUJBQXVCO2lCQUN4QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56T3ZlcmxheU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdmVybGF5JztcbmltcG9ydCB7IMm1TnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGUgYXMgTnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHJhbnNpdGlvbi1wYXRjaCc7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56T3B0aW9uQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek9wdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56T3B0aW9uSXRlbUdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24taXRlbS1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpPcHRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL29wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTZWxlY3RBcnJvd0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWFycm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNlbGVjdENsZWFyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtY2xlYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0UGxhY2Vob2xkZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTZWxlY3RTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTnpJMThuTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpPdmVybGF5TW9kdWxlLFxuICAgIE56Tm9BbmltYXRpb25Nb2R1bGUsXG4gICAgTnpUcmFuc2l0aW9uUGF0Y2hNb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxuICAgIEExMXlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpPcHRpb25Db21wb25lbnQsXG4gICAgTnpTZWxlY3RDb21wb25lbnQsXG4gICAgTnpPcHRpb25Db250YWluZXJDb21wb25lbnQsXG4gICAgTnpPcHRpb25Hcm91cENvbXBvbmVudCxcbiAgICBOek9wdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgTnpTZWxlY3RUb3BDb250cm9sQ29tcG9uZW50LFxuICAgIE56U2VsZWN0U2VhcmNoQ29tcG9uZW50LFxuICAgIE56U2VsZWN0SXRlbUNvbXBvbmVudCxcbiAgICBOelNlbGVjdENsZWFyQ29tcG9uZW50LFxuICAgIE56U2VsZWN0QXJyb3dDb21wb25lbnQsXG4gICAgTnpTZWxlY3RQbGFjZWhvbGRlckNvbXBvbmVudCxcbiAgICBOek9wdGlvbkl0ZW1Hcm91cENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTnpPcHRpb25Db21wb25lbnQsXG4gICAgTnpTZWxlY3RDb21wb25lbnQsXG4gICAgTnpPcHRpb25Hcm91cENvbXBvbmVudCxcbiAgICBOelNlbGVjdEFycm93Q29tcG9uZW50LFxuICAgIE56U2VsZWN0Q2xlYXJDb21wb25lbnQsXG4gICAgTnpTZWxlY3RJdGVtQ29tcG9uZW50LFxuICAgIE56U2VsZWN0UGxhY2Vob2xkZXJDb21wb25lbnQsXG4gICAgTnpTZWxlY3RTZWFyY2hDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelNlbGVjdE1vZHVsZSB7fVxuIl19