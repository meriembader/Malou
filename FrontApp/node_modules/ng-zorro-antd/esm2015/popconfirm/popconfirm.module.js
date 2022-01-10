/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmComponent, NzPopconfirmDirective } from './popconfirm';
export class NzPopconfirmModule {
}
NzPopconfirmModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
                exports: [NzPopconfirmComponent, NzPopconfirmDirective],
                entryComponents: [NzPopconfirmComponent],
                imports: [
                    CommonModule,
                    NzButtonModule,
                    OverlayModule,
                    NzI18nModule,
                    NzIconModule,
                    NzOutletModule,
                    NzOverlayModule,
                    NzNoAnimationModule,
                    NzToolTipModule
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3BvcGNvbmZpcm0vIiwic291cmNlcyI6WyJwb3Bjb25maXJtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBa0I1RSxNQUFNLE9BQU8sa0JBQWtCOzs7WUFoQjlCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQztnQkFDNUQsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUM7Z0JBQ3ZELGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUN4QyxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixZQUFZO29CQUNaLGNBQWM7b0JBQ2QsZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56T3ZlcmxheU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdmVybGF5JztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuaW1wb3J0IHsgTnpQb3Bjb25maXJtQ29tcG9uZW50LCBOelBvcGNvbmZpcm1EaXJlY3RpdmUgfSBmcm9tICcuL3BvcGNvbmZpcm0nO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOelBvcGNvbmZpcm1Db21wb25lbnQsIE56UG9wY29uZmlybURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOelBvcGNvbmZpcm1Db21wb25lbnQsIE56UG9wY29uZmlybURpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW056UG9wY29uZmlybUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlLFxuICAgIE56T3ZlcmxheU1vZHVsZSxcbiAgICBOek5vQW5pbWF0aW9uTW9kdWxlLFxuICAgIE56VG9vbFRpcE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56UG9wY29uZmlybU1vZHVsZSB7fVxuIl19