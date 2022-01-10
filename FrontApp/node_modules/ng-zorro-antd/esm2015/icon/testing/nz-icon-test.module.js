/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NgModule } from '@angular/core';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
const antDesignIcons = AllIcons;
const ɵ0 = key => {
    const i = antDesignIcons[key];
    return i;
};
const icons = Object.keys(antDesignIcons).map(ɵ0);
const ɵ1 = icons;
/**
 * Include this module in every testing spec, except `icon.spec.ts`.
 */
// @dynamic
export class NzIconTestModule {
}
NzIconTestModule.decorators = [
    { type: NgModule, args: [{
                exports: [NzIconModule],
                providers: [
                    {
                        provide: NZ_ICONS,
                        useValue: ɵ1
                    }
                ]
            },] }
];
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaWNvbi10ZXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvaWNvbi90ZXN0aW5nLyIsInNvdXJjZXMiOlsibnotaWNvbi10ZXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sS0FBSyxRQUFRLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1RCxNQUFNLGNBQWMsR0FBRyxRQUV0QixDQUFDO1dBRThELEdBQUcsQ0FBQyxFQUFFO0lBQ3BFLE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFIRCxNQUFNLEtBQUssR0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBRzdELENBQUM7V0FXYSxLQUFLO0FBVHJCOztHQUVHO0FBQ0gsV0FBVztBQVVYLE1BQU0sT0FBTyxnQkFBZ0I7OztZQVQ1QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLFFBQVE7d0JBQ2pCLFFBQVEsSUFBTztxQkFDaEI7aUJBQ0Y7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0ICogYXMgQWxsSWNvbnMgZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhci9pY29ucyc7XG5cbmltcG9ydCB7IE56SWNvbk1vZHVsZSwgTlpfSUNPTlMgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5jb25zdCBhbnREZXNpZ25JY29ucyA9IEFsbEljb25zIGFzIHtcbiAgW2tleTogc3RyaW5nXTogSWNvbkRlZmluaXRpb247XG59O1xuXG5jb25zdCBpY29uczogSWNvbkRlZmluaXRpb25bXSA9IE9iamVjdC5rZXlzKGFudERlc2lnbkljb25zKS5tYXAoa2V5ID0+IHtcbiAgY29uc3QgaSA9IGFudERlc2lnbkljb25zW2tleV07XG4gIHJldHVybiBpO1xufSk7XG5cbi8qKlxuICogSW5jbHVkZSB0aGlzIG1vZHVsZSBpbiBldmVyeSB0ZXN0aW5nIHNwZWMsIGV4Y2VwdCBgaWNvbi5zcGVjLnRzYC5cbiAqL1xuLy8gQGR5bmFtaWNcbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtOekljb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOWl9JQ09OUyxcbiAgICAgIHVzZVZhbHVlOiBpY29uc1xuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekljb25UZXN0TW9kdWxlIHt9XG4iXX0=