/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzTableContentComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.theadTemplate = null;
        this.contentTemplate = null;
        this.listOfColWidth = [];
        this.scrollX = null;
    }
}
NzTableContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'table[nz-table-content]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `,
                host: {
                    '[style.table-layout]': 'tableLayout',
                    '[class.ant-table-fixed]': 'scrollX',
                    '[style.width]': 'scrollX',
                    '[style.min-width]': `scrollX ? '100%': null`
                }
            },] }
];
NzTableContentComponent.propDecorators = {
    tableLayout: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    contentTemplate: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    scrollX: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL3RhYmxlL3RhYmxlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUIxRyxNQUFNLE9BQU8sdUJBQXVCO0lBbkJwQztRQW9CVyxnQkFBVyxHQUFrQixNQUFNLENBQUM7UUFDcEMsa0JBQWEsR0FBa0MsSUFBSSxDQUFDO1FBQ3BELG9CQUFlLEdBQWtDLElBQUksQ0FBQztRQUN0RCxtQkFBYyxHQUF5QixFQUFFLENBQUM7UUFDMUMsWUFBTyxHQUFrQixJQUFJLENBQUM7SUFDekMsQ0FBQzs7O1lBekJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7OztHQU9UO2dCQUNELElBQUksRUFBRTtvQkFDSixzQkFBc0IsRUFBRSxhQUFhO29CQUNyQyx5QkFBeUIsRUFBRSxTQUFTO29CQUNwQyxlQUFlLEVBQUUsU0FBUztvQkFDMUIsbUJBQW1CLEVBQUUsd0JBQXdCO2lCQUM5QzthQUNGOzs7MEJBRUUsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56VGFibGVMYXlvdXQgfSBmcm9tICcuLi90YWJsZS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RhYmxlW256LXRhYmxlLWNvbnRlbnRdJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGNvbCBbc3R5bGUud2lkdGhdPVwid2lkdGhcIiBbc3R5bGUubWluV2lkdGhdPVwid2lkdGhcIiAqbmdGb3I9XCJsZXQgd2lkdGggb2YgbGlzdE9mQ29sV2lkdGhcIiAvPlxuICAgIDx0aGVhZCBjbGFzcz1cImFudC10YWJsZS10aGVhZFwiICpuZ0lmPVwidGhlYWRUZW1wbGF0ZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRoZWFkVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvdGhlYWQ+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tzdHlsZS50YWJsZS1sYXlvdXRdJzogJ3RhYmxlTGF5b3V0JyxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1maXhlZF0nOiAnc2Nyb2xsWCcsXG4gICAgJ1tzdHlsZS53aWR0aF0nOiAnc2Nyb2xsWCcsXG4gICAgJ1tzdHlsZS5taW4td2lkdGhdJzogYHNjcm9sbFggPyAnMTAwJSc6IG51bGxgXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUNvbnRlbnRDb21wb25lbnQge1xuICBASW5wdXQoKSB0YWJsZUxheW91dDogTnpUYWJsZUxheW91dCA9ICdhdXRvJztcbiAgQElucHV0KCkgdGhlYWRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbGlzdE9mQ29sV2lkdGg6IEFycmF5PHN0cmluZyB8IG51bGw+ID0gW107XG4gIEBJbnB1dCgpIHNjcm9sbFg6IHN0cmluZyB8IG51bGwgPSBudWxsO1xufVxuIl19