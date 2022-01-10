/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzDividerComponent {
    constructor() {
        this.nzType = 'horizontal';
        this.nzOrientation = 'center';
        this.nzDashed = false;
        this.nzPlain = false;
    }
}
NzDividerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-divider',
                exportAs: 'nzDivider',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <span *ngIf="nzText" class="ant-divider-inner-text">
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
    </span>
  `,
                host: {
                    '[class.ant-divider]': 'true',
                    '[class.ant-divider-horizontal]': `nzType === 'horizontal'`,
                    '[class.ant-divider-vertical]': `nzType === 'vertical'`,
                    '[class.ant-divider-with-text]': `nzText`,
                    '[class.ant-divider-plain]': `nzPlain`,
                    '[class.ant-divider-with-text-left]': `nzText && nzOrientation === 'left'`,
                    '[class.ant-divider-with-text-right]': `nzText && nzOrientation === 'right'`,
                    '[class.ant-divider-with-text-center]': `nzText && nzOrientation === 'center'`,
                    '[class.ant-divider-dashed]': `nzDashed`
                }
            },] }
];
NzDividerComponent.propDecorators = {
    nzText: [{ type: Input }],
    nzType: [{ type: Input }],
    nzOrientation: [{ type: Input }],
    nzDashed: [{ type: Input }],
    nzPlain: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDividerComponent.prototype, "nzDashed", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDividerComponent.prototype, "nzPlain", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RpdmlkZXIvIiwic291cmNlcyI6WyJkaXZpZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHMUcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBeUJ2RCxNQUFNLE9BQU8sa0JBQWtCO0lBdkIvQjtRQTRCVyxXQUFNLEdBQThCLFlBQVksQ0FBQztRQUNqRCxrQkFBYSxHQUFnQyxRQUFRLENBQUM7UUFDdEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBQzNDLENBQUM7OztZQWhDQSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSixxQkFBcUIsRUFBRSxNQUFNO29CQUM3QixnQ0FBZ0MsRUFBRSx5QkFBeUI7b0JBQzNELDhCQUE4QixFQUFFLHVCQUF1QjtvQkFDdkQsK0JBQStCLEVBQUUsUUFBUTtvQkFDekMsMkJBQTJCLEVBQUUsU0FBUztvQkFDdEMsb0NBQW9DLEVBQUUsb0NBQW9DO29CQUMxRSxxQ0FBcUMsRUFBRSxxQ0FBcUM7b0JBQzVFLHNDQUFzQyxFQUFFLHNDQUFzQztvQkFDOUUsNEJBQTRCLEVBQUUsVUFBVTtpQkFDekM7YUFDRjs7O3FCQUtFLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSzs7QUFEbUI7SUFBZixZQUFZLEVBQUU7O29EQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTs7bURBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1kaXZpZGVyJyxcbiAgZXhwb3J0QXM6ICduekRpdmlkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gKm5nSWY9XCJuelRleHRcIiBjbGFzcz1cImFudC1kaXZpZGVyLWlubmVyLXRleHRcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRleHRcIj57eyBuelRleHQgfX08L25nLWNvbnRhaW5lcj5cbiAgICA8L3NwYW4+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLWhvcml6b250YWxdJzogYG56VHlwZSA9PT0gJ2hvcml6b250YWwnYCxcbiAgICAnW2NsYXNzLmFudC1kaXZpZGVyLXZlcnRpY2FsXSc6IGBuelR5cGUgPT09ICd2ZXJ0aWNhbCdgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0XSc6IGBuelRleHRgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItcGxhaW5dJzogYG56UGxhaW5gLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0LWxlZnRdJzogYG56VGV4dCAmJiBuek9yaWVudGF0aW9uID09PSAnbGVmdCdgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItd2l0aC10ZXh0LXJpZ2h0XSc6IGBuelRleHQgJiYgbnpPcmllbnRhdGlvbiA9PT0gJ3JpZ2h0J2AsXG4gICAgJ1tjbGFzcy5hbnQtZGl2aWRlci13aXRoLXRleHQtY2VudGVyXSc6IGBuelRleHQgJiYgbnpPcmllbnRhdGlvbiA9PT0gJ2NlbnRlcidgLFxuICAgICdbY2xhc3MuYW50LWRpdmlkZXItZGFzaGVkXSc6IGBuekRhc2hlZGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekRpdmlkZXJDb21wb25lbnQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEYXNoZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UGxhaW46IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuelRleHQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpUeXBlOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBuek9yaWVudGF0aW9uOiAnbGVmdCcgfCAncmlnaHQnIHwgJ2NlbnRlcicgPSAnY2VudGVyJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGFzaGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelBsYWluID0gZmFsc2U7XG59XG4iXX0=