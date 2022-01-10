/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';
export class NzConnectedOverlayDirective {
    constructor(cdkConnectedOverlay) {
        this.cdkConnectedOverlay = cdkConnectedOverlay;
        this.cdkConnectedOverlay.backdropClass = 'nz-overlay-transparent-backdrop';
    }
}
NzConnectedOverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cdkConnectedOverlay][nzConnectedOverlay]',
                exportAs: 'nzConnectedOverlay'
            },] }
];
NzConnectedOverlayDirective.ctorParameters = () => [
    { type: CdkConnectedOverlay }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY29ubmVjdGVkLW92ZXJsYXkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvb3ZlcmxheS8iLCJzb3VyY2VzIjpbIm56LWNvbm5lY3RlZC1vdmVybGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNMUMsTUFBTSxPQUFPLDJCQUEyQjtJQUN0QyxZQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0lBQzdFLENBQUM7OztZQVBGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkNBQTJDO2dCQUNyRCxRQUFRLEVBQUUsb0JBQW9CO2FBQy9COzs7WUFOUSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtDb25uZWN0ZWRPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtDb25uZWN0ZWRPdmVybGF5XVtuekNvbm5lY3RlZE92ZXJsYXldJyxcbiAgZXhwb3J0QXM6ICduekNvbm5lY3RlZE92ZXJsYXknXG59KVxuZXhwb3J0IGNsYXNzIE56Q29ubmVjdGVkT3ZlcmxheURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RrQ29ubmVjdGVkT3ZlcmxheTogQ2RrQ29ubmVjdGVkT3ZlcmxheSkge1xuICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheS5iYWNrZHJvcENsYXNzID0gJ256LW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnO1xuICB9XG59XG4iXX0=