/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzTableTitleFooterComponent {
    constructor() {
        this.title = null;
        this.footer = null;
    }
}
NzTableTitleFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-title-footer',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
                host: {
                    '[class.ant-table-title]': `title !== null`,
                    '[class.ant-table-footer]': `footer !== null`
                }
            },] }
];
NzTableTitleFooterComponent.propDecorators = {
    title: [{ type: Input }],
    footer: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFibGUvIiwic291cmNlcyI6WyJzcmMvdGFibGUvdGl0bGUtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWdCMUcsTUFBTSxPQUFPLDJCQUEyQjtJQWJ4QztRQWNXLFVBQUssR0FBMkMsSUFBSSxDQUFDO1FBQ3JELFdBQU0sR0FBMkMsSUFBSSxDQUFDO0lBQ2pFLENBQUM7OztZQWhCQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7OztHQUdUO2dCQUNELElBQUksRUFBRTtvQkFDSix5QkFBeUIsRUFBRSxnQkFBZ0I7b0JBQzNDLDBCQUEwQixFQUFFLGlCQUFpQjtpQkFDOUM7YUFDRjs7O29CQUVFLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYmxlLXRpdGxlLWZvb3RlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0aXRsZVwiPnt7IHRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclwiPnt7IGZvb3RlciB9fTwvbmctY29udGFpbmVyPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtdGl0bGVdJzogYHRpdGxlICE9PSBudWxsYCxcbiAgICAnW2NsYXNzLmFudC10YWJsZS1mb290ZXJdJzogYGZvb3RlciAhPT0gbnVsbGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYmxlVGl0bGVGb290ZXJDb21wb25lbnQge1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBmb290ZXI6IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbn1cbiJdfQ==