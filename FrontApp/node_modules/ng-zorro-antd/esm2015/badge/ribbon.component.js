/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { badgePresetColors } from './preset-colors';
export class NzRibbonComponent {
    constructor() {
        this.nzPlacement = 'end';
        this.nzText = null;
        this.presetColor = null;
    }
    ngOnChanges(changes) {
        const { nzColor } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
    }
}
NzRibbonComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-ribbon',
                exportAs: 'nzRibbon',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `,
                host: {
                    '[class.ant-ribbon-wrapper]': 'true'
                }
            },] }
];
NzRibbonComponent.propDecorators = {
    nzColor: [{ type: Input }],
    nzPlacement: [{ type: Input }],
    nzText: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmliYm9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYmFkZ2UvIiwic291cmNlcyI6WyJyaWJib24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF5QyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXlCcEQsTUFBTSxPQUFPLGlCQUFpQjtJQXZCOUI7UUF5QlcsZ0JBQVcsR0FBb0IsS0FBSyxDQUFDO1FBQ3JDLFdBQU0sR0FBc0MsSUFBSSxDQUFDO1FBQzFELGdCQUFXLEdBQWtCLElBQUksQ0FBQztJQU9wQyxDQUFDO0lBTkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3pHO0lBQ0gsQ0FBQzs7O1lBakNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osNEJBQTRCLEVBQUUsTUFBTTtpQkFDckM7YUFDRjs7O3NCQUVFLEtBQUs7MEJBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBiYWRnZVByZXNldENvbG9ycyB9IGZyb20gJy4vcHJlc2V0LWNvbG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXJpYmJvbicsXG4gIGV4cG9ydEFzOiAnbnpSaWJib24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiYW50LXJpYmJvblwiXG4gICAgICBbY2xhc3NdPVwicHJlc2V0Q29sb3IgJiYgJ2FudC1yaWJib24tY29sb3ItJyArIHByZXNldENvbG9yXCJcbiAgICAgIFtjbGFzcy5hbnQtcmliYm9uLXBsYWNlbWVudC1lbmRdPVwibnpQbGFjZW1lbnQgPT09ICdlbmQnXCJcbiAgICAgIFtjbGFzcy5hbnQtcmliYm9uLXBsYWNlbWVudC1zdGFydF09XCJuelBsYWNlbWVudCA9PT0gJ3N0YXJ0J1wiXG4gICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCIhcHJlc2V0Q29sb3IgJiYgbnpDb2xvclwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGV4dFwiPnt7IG56VGV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1yaWJib24tY29ybmVyXCIgW3N0eWxlLmNvbG9yXT1cIiFwcmVzZXRDb2xvciAmJiBuekNvbG9yXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1yaWJib24td3JhcHBlcl0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJpYmJvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56Q29sb3I6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgbnpQbGFjZW1lbnQ6ICdzdGFydCcgfCAnZW5kJyA9ICdlbmQnO1xuICBASW5wdXQoKSBuelRleHQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIHByZXNldENvbG9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpDb2xvciB9ID0gY2hhbmdlcztcbiAgICBpZiAobnpDb2xvcikge1xuICAgICAgdGhpcy5wcmVzZXRDb2xvciA9IHRoaXMubnpDb2xvciAmJiBiYWRnZVByZXNldENvbG9ycy5pbmRleE9mKHRoaXMubnpDb2xvcikgIT09IC0xID8gdGhpcy5uekNvbG9yIDogbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==