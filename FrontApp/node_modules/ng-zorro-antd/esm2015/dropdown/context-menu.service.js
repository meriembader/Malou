/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { NzContextMenuServiceModule } from './context-menu.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./context-menu.service.module";
const listOfPositions = [
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'end', overlayY: 'top' })
];
export class NzContextMenuService {
    constructor(overlay) {
        this.overlay = overlay;
        this.overlayRef = null;
        this.closeSubscription = Subscription.EMPTY;
    }
    create($event, nzDropdownMenuComponent) {
        this.close(true);
        const { x, y } = $event;
        if ($event instanceof MouseEvent) {
            $event.preventDefault();
        }
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo({ x, y })
            .withPositions(listOfPositions)
            .withTransformOriginOn('.ant-dropdown');
        this.overlayRef = this.overlay.create({
            positionStrategy,
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.close()
        });
        this.closeSubscription = merge(nzDropdownMenuComponent.descendantMenuItemClick$, fromEvent(document, 'click').pipe(filter(event => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target)), 
        /** handle firefox contextmenu event **/
        filter(event => event.button !== 2), take(1))).subscribe(() => {
            this.close();
        });
        this.overlayRef.attach(new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef));
    }
    close(clear = false) {
        if (this.overlayRef) {
            this.overlayRef.detach();
            if (clear) {
                this.overlayRef.dispose();
            }
            this.overlayRef = null;
            this.closeSubscription.unsubscribe();
        }
    }
}
NzContextMenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzContextMenuService_Factory() { return new NzContextMenuService(i0.ɵɵinject(i1.Overlay)); }, token: NzContextMenuService, providedIn: i2.NzContextMenuServiceModule });
NzContextMenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: NzContextMenuServiceModule
            },] }
];
NzContextMenuService.ctorParameters = () => [
    { type: Overlay }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2Ryb3Bkb3duLyIsInNvdXJjZXMiOlsiY29udGV4dC1tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBYyxNQUFNLHNCQUFzQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7O0FBRzNFLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQzNHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pHLElBQUksc0JBQXNCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3ZHLENBQUM7QUFLRixNQUFNLE9BQU8sb0JBQW9CO0lBSS9CLFlBQW9CLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFINUIsZUFBVSxHQUFzQixJQUFJLENBQUM7UUFDckMsc0JBQWlCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVSLENBQUM7SUFFeEMsTUFBTSxDQUFDLE1BQTZDLEVBQUUsdUJBQWdEO1FBQ3BHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxNQUFNLFlBQVksVUFBVSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU87YUFDbEMsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDN0IsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUM5QixxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BDLGdCQUFnQjtZQUNoQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtTQUN0RCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUM1Qix1QkFBdUIsQ0FBQyx3QkFBd0IsRUFDaEQsU0FBUyxDQUFhLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzNDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFxQixDQUFDLENBQUM7UUFDM0csd0NBQXdDO1FBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUNGLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWlCLEtBQUs7UUFDMUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7WUFoREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSwwQkFBMEI7YUFDdkM7OztZQWpCZ0MsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsIE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZSB9IGZyb20gJy4vY29udGV4dC1tZW51LnNlcnZpY2UubW9kdWxlJztcbmltcG9ydCB7IE56RHJvcGRvd25NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmNvbXBvbmVudCc7XG5cbmNvbnN0IGxpc3RPZlBvc2l0aW9ucyA9IFtcbiAgbmV3IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIoeyBvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJyB9LCB7IG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCcgfSksXG4gIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pLFxuICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnIH0sIHsgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ2JvdHRvbScgfSksXG4gIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJyB9KVxuXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBOekNvbnRleHRNZW51U2VydmljZU1vZHVsZVxufSlcbmV4cG9ydCBjbGFzcyBOekNvbnRleHRNZW51U2VydmljZSB7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNsb3NlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSkge31cblxuICBjcmVhdGUoJGV2ZW50OiBNb3VzZUV2ZW50IHwgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9LCBuekRyb3Bkb3duTWVudUNvbXBvbmVudDogTnpEcm9wZG93bk1lbnVDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gJGV2ZW50O1xuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50KSB7XG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMub3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHsgeCwgeSB9KVxuICAgICAgLndpdGhQb3NpdGlvbnMobGlzdE9mUG9zaXRpb25zKVxuICAgICAgLndpdGhUcmFuc2Zvcm1PcmlnaW5PbignLmFudC1kcm9wZG93bicpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWUsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuY2xvc2UoKVxuICAgIH0pO1xuICAgIHRoaXMuY2xvc2VTdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgIG56RHJvcGRvd25NZW51Q29tcG9uZW50LmRlc2NlbmRhbnRNZW51SXRlbUNsaWNrJCxcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pihkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+ICEhdGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSksXG4gICAgICAgIC8qKiBoYW5kbGUgZmlyZWZveCBjb250ZXh0bWVudSBldmVudCAqKi9cbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmJ1dHRvbiAhPT0gMiksXG4gICAgICAgIHRha2UoMSlcbiAgICAgIClcbiAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSk7XG4gICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaChuZXcgVGVtcGxhdGVQb3J0YWwobnpEcm9wZG93bk1lbnVDb21wb25lbnQudGVtcGxhdGVSZWYsIG56RHJvcGRvd25NZW51Q29tcG9uZW50LnZpZXdDb250YWluZXJSZWYpKTtcbiAgfVxuXG4gIGNsb3NlKGNsZWFyOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICBpZiAoY2xlYXIpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gICAgICB0aGlzLmNsb3NlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=