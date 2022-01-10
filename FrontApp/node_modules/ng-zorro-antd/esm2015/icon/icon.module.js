/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { NzIconDirective } from './icon.directive';
import { NzIconPatchService, NZ_ICONS, NZ_ICONS_PATCH } from './icon.service';
export class NzIconModule {
    static forRoot(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                {
                    provide: NZ_ICONS,
                    useValue: icons
                }
            ]
        };
    }
    static forChild(icons) {
        return {
            ngModule: NzIconModule,
            providers: [
                NzIconPatchService,
                {
                    provide: NZ_ICONS_PATCH,
                    useValue: icons
                }
            ]
        };
    }
}
NzIconModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzIconDirective],
                declarations: [NzIconDirective],
                imports: [PlatformModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2ljb24vIiwic291cmNlcyI6WyJpY29uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPOUUsTUFBTSxPQUFPLFlBQVk7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUF1QjtRQUNwQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxRQUFRO29CQUNqQixRQUFRLEVBQUUsS0FBSztpQkFDaEI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUF1QjtRQUNyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULGtCQUFrQjtnQkFDbEI7b0JBQ0UsT0FBTyxFQUFFLGNBQWM7b0JBQ3ZCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQTdCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQy9CLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcblxuaW1wb3J0IHsgTnpJY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9pY29uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekljb25QYXRjaFNlcnZpY2UsIE5aX0lDT05TLCBOWl9JQ09OU19QQVRDSCB9IGZyb20gJy4vaWNvbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW056SWNvbkRpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW056SWNvbkRpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpJY29uTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoaWNvbnM6IEljb25EZWZpbml0aW9uW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE56SWNvbk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTnpJY29uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOWl9JQ09OUyxcbiAgICAgICAgICB1c2VWYWx1ZTogaWNvbnNcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoaWNvbnM6IEljb25EZWZpbml0aW9uW10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE56SWNvbk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTnpJY29uTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE56SWNvblBhdGNoU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5aX0lDT05TX1BBVENILFxuICAgICAgICAgIHVzZVZhbHVlOiBpY29uc1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19