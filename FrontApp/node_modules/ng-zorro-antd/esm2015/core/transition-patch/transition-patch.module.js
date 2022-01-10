/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzTransitionPatchDirective } from './transition-patch.directive';
export class NzTransitionPatchModule {
}
NzTransitionPatchModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                exports: [NzTransitionPatchDirective],
                declarations: [NzTransitionPatchDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNpdGlvbi1wYXRjaC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvdHJhbnNpdGlvbi1wYXRjaC8iLCJzb3VyY2VzIjpbInRyYW5zaXRpb24tcGF0Y2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBTzFFLE1BQU0sT0FBTyx1QkFBdUI7OztZQUxuQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztnQkFDckMsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpUcmFuc2l0aW9uUGF0Y2hEaXJlY3RpdmUgfSBmcm9tICcuL3RyYW5zaXRpb24tcGF0Y2guZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcbiAgZXhwb3J0czogW056VHJhbnNpdGlvblBhdGNoRGlyZWN0aXZlXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpUcmFuc2l0aW9uUGF0Y2hEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE56VHJhbnNpdGlvblBhdGNoTW9kdWxlIHt9XG4iXX0=