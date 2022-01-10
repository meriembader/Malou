/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzTableInnerDefaultComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.contentTemplate = null;
    }
}
NzTableInnerDefaultComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-inner-default',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `,
                host: {
                    '[class.ant-table-container]': 'true'
                }
            },] }
];
NzTableInnerDefaultComponent.propDecorators = {
    tableLayout: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    contentTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaW5uZXItZGVmYXVsdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYmxlLyIsInNvdXJjZXMiOlsic3JjL3RhYmxlL3RhYmxlLWlubmVyLWRlZmF1bHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUIxRyxNQUFNLE9BQU8sNEJBQTRCO0lBbkJ6QztRQW9CVyxnQkFBVyxHQUFrQixNQUFNLENBQUM7UUFDcEMsbUJBQWMsR0FBeUIsRUFBRSxDQUFDO1FBQzFDLGtCQUFhLEdBQWtDLElBQUksQ0FBQztRQUNwRCxvQkFBZSxHQUFrQyxJQUFJLENBQUM7SUFDakUsQ0FBQzs7O1lBeEJBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2dCQUNELElBQUksRUFBRTtvQkFDSiw2QkFBNkIsRUFBRSxNQUFNO2lCQUN0QzthQUNGOzs7MEJBRUUsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelRhYmxlTGF5b3V0IH0gZnJvbSAnLi4vdGFibGUudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWJsZS1pbm5lci1kZWZhdWx0JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC10YWJsZS1jb250ZW50XCI+XG4gICAgICA8dGFibGVcbiAgICAgICAgbnotdGFibGUtY29udGVudFxuICAgICAgICBbY29udGVudFRlbXBsYXRlXT1cImNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgIFt0YWJsZUxheW91dF09XCJ0YWJsZUxheW91dFwiXG4gICAgICAgIFtsaXN0T2ZDb2xXaWR0aF09XCJsaXN0T2ZDb2xXaWR0aFwiXG4gICAgICAgIFt0aGVhZFRlbXBsYXRlXT1cInRoZWFkVGVtcGxhdGVcIlxuICAgICAgPjwvdGFibGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10YWJsZS1jb250YWluZXJdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJsZUlubmVyRGVmYXVsdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRhYmxlTGF5b3V0OiBOelRhYmxlTGF5b3V0ID0gJ2F1dG8nO1xuICBASW5wdXQoKSBsaXN0T2ZDb2xXaWR0aDogQXJyYXk8c3RyaW5nIHwgbnVsbD4gPSBbXTtcbiAgQElucHV0KCkgdGhlYWRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbn1cbiJdfQ==