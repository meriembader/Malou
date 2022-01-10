/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzColDirective } from './col.directive';
import { NzRowDirective } from './row.directive';
export class NzGridModule {
}
NzGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzColDirective, NzRowDirective],
                exports: [NzColDirective, NzRowDirective],
                imports: [CommonModule, LayoutModule, PlatformModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2dyaWQvIiwic291cmNlcyI6WyJncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPakQsTUFBTSxPQUFPLFlBQVk7OztZQUx4QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQztnQkFDOUMsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQztnQkFDekMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7YUFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekNvbERpcmVjdGl2ZSB9IGZyb20gJy4vY29sLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vcm93LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW056Q29sRGlyZWN0aXZlLCBOelJvd0RpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtOekNvbERpcmVjdGl2ZSwgTnpSb3dEaXJlY3RpdmVdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMYXlvdXRNb2R1bGUsIFBsYXRmb3JtTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOekdyaWRNb2R1bGUge31cbiJdfQ==