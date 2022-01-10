/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzAutocompleteOptgroupComponent {
    constructor() { }
}
NzAutocompleteOptgroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-auto-optgroup',
                exportAs: 'nzAutoOptgroup',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ant-select-item ant-select-item-group">
      <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
    </div>
    <ng-content select="nz-auto-option"></ng-content>
  `
            },] }
];
NzAutocompleteOptgroupComponent.ctorParameters = () => [];
NzAutocompleteOptgroupComponent.propDecorators = {
    nzLabel: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9wdGdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS1vcHRncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFlMUcsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxnQkFBZSxDQUFDOzs7WUFoQmpCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7R0FLVDthQUNGOzs7O3NCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWF1dG8tb3B0Z3JvdXAnLFxuICBleHBvcnRBczogJ256QXV0b09wdGdyb3VwJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtc2VsZWN0LWl0ZW0gYW50LXNlbGVjdC1pdGVtLWdyb3VwXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpMYWJlbFwiPnt7IG56TGFiZWwgfX08L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1hdXRvLW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOekF1dG9jb21wbGV0ZU9wdGdyb3VwQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpMYWJlbD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==