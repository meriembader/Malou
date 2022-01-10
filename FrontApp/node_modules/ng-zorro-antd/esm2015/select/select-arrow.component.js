/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzSelectArrowComponent {
    constructor() {
        this.loading = false;
        this.search = false;
        this.suffixIcon = null;
    }
}
NzSelectArrowComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-arrow',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i nz-icon nzType="loading" *ngIf="loading; else defaultArrow"></i>
    <ng-template #defaultArrow>
      <ng-container *ngIf="!suffixIcon; else suffixTemplate">
        <i nz-icon nzType="down" *ngIf="!search"></i>
        <i nz-icon nzType="search" *ngIf="search"></i>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </ng-template>
    </ng-template>
  `,
                host: {
                    '[class.ant-select-arrow]': 'true',
                    '[class.ant-select-arrow-loading]': 'loading'
                }
            },] }
];
NzSelectArrowComponent.propDecorators = {
    loading: [{ type: Input }],
    search: [{ type: Input }],
    suffixIcon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFycm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvc2VsZWN0LyIsInNvdXJjZXMiOlsic2VsZWN0LWFycm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQTBCMUcsTUFBTSxPQUFPLHNCQUFzQjtJQXZCbkM7UUF3QlcsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZUFBVSxHQUEyQyxJQUFJLENBQUM7SUFDckUsQ0FBQzs7O1lBM0JBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO2dCQUNELElBQUksRUFBRTtvQkFDSiwwQkFBMEIsRUFBRSxNQUFNO29CQUNsQyxrQ0FBa0MsRUFBRSxTQUFTO2lCQUM5QzthQUNGOzs7c0JBRUUsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1zZWxlY3QtYXJyb3cnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aSBuei1pY29uIG56VHlwZT1cImxvYWRpbmdcIiAqbmdJZj1cImxvYWRpbmc7IGVsc2UgZGVmYXVsdEFycm93XCI+PC9pPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEFycm93PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzdWZmaXhJY29uOyBlbHNlIHN1ZmZpeFRlbXBsYXRlXCI+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZG93blwiICpuZ0lmPVwiIXNlYXJjaFwiPjwvaT5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJzZWFyY2hcIiAqbmdJZj1cInNlYXJjaFwiPjwvaT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICNzdWZmaXhUZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cInN1ZmZpeEljb247IGxldCBzdWZmaXhJY29uXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInN1ZmZpeEljb25cIj48L2k+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWFycm93XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtYXJyb3ctbG9hZGluZ10nOiAnbG9hZGluZydcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNlbGVjdEFycm93Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWFyY2ggPSBmYWxzZTtcbiAgQElucHV0KCkgc3VmZml4SWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IG51bGwgPSBudWxsO1xufVxuIl19