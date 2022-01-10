/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
const IconMap = {
    success: 'check-circle',
    error: 'close-circle',
    info: 'exclamation-circle',
    warning: 'warning'
};
const ExceptionStatus = ['404', '500', '403'];
export class NzResultComponent {
    constructor() {
        this.nzStatus = 'info';
        this.isException = false;
    }
    ngOnChanges() {
        this.setStatusIcon();
    }
    setStatusIcon() {
        const icon = this.nzIcon;
        this.isException = ExceptionStatus.indexOf(this.nzStatus) !== -1;
        this.icon = icon
            ? typeof icon === 'string'
                ? IconMap[icon] || icon
                : icon
            : this.isException
                ? undefined
                : IconMap[this.nzStatus];
    }
}
NzResultComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-result',
                exportAs: 'nzResult',
                template: `
    <div class="ant-result-icon">
      <ng-container *ngIf="!isException; else exceptionTpl">
        <ng-container *ngIf="icon">
          <ng-container *nzStringTemplateOutlet="icon; let icon">
            <i nz-icon [nzType]="icon" nzTheme="fill"></i>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="!icon" select="[nz-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-container *ngIf="nzTitle">
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle">
        {{ nzTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzTitle" select="div[nz-result-title]"></ng-content>
    <ng-container *ngIf="nzSubTitle">
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle">
        {{ nzSubTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzSubTitle" select="div[nz-result-subtitle]"></ng-content>
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    <div class="ant-result-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">
        {{ nzExtra }}
      </ng-container>
    </div>
    <ng-content *ngIf="!nzExtra" select="div[nz-result-extra]"></ng-content>

    <ng-template #exceptionTpl>
      <ng-container [ngSwitch]="nzStatus">
        <nz-result-not-found *ngSwitchCase="'404'"></nz-result-not-found>
        <nz-result-server-error *ngSwitchCase="'500'"></nz-result-server-error>
        <nz-result-unauthorized *ngSwitchCase="'403'"></nz-result-unauthorized>
      </ng-container>
    </ng-template>
  `,
                host: {
                    '[class.ant-result]': 'true',
                    '[class.ant-result-success]': `nzStatus === 'success'`,
                    '[class.ant-result-error]': `nzStatus === 'error'`,
                    '[class.ant-result-info]': `nzStatus === 'info'`,
                    '[class.ant-result-warning]': `nzStatus === 'warning'`
                }
            },] }
];
NzResultComponent.ctorParameters = () => [];
NzResultComponent.propDecorators = {
    nzIcon: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzSubTitle: [{ type: Input }],
    nzExtra: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcmVzdWx0LyIsInNvdXJjZXMiOlsicmVzdWx0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBMEIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNckgsTUFBTSxPQUFPLEdBQUc7SUFDZCxPQUFPLEVBQUUsY0FBYztJQUN2QixLQUFLLEVBQUUsY0FBYztJQUNyQixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUM7QUFDRixNQUFNLGVBQWUsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFzRDlDLE1BQU0sT0FBTyxpQkFBaUI7SUFVNUI7UUFQUyxhQUFRLEdBQXVCLE1BQU0sQ0FBQztRQUsvQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUVMLENBQUM7SUFFaEIsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpCLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO1lBQ2QsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVE7Z0JBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBd0IsQ0FBQyxJQUFJLElBQUk7Z0JBQzNDLENBQUMsQ0FBQyxJQUFJO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNsQixDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUE0QixDQUFDLENBQUM7SUFDakQsQ0FBQzs7O1lBL0VGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsNEJBQTRCLEVBQUUsd0JBQXdCO29CQUN0RCwwQkFBMEIsRUFBRSxzQkFBc0I7b0JBQ2xELHlCQUF5QixFQUFFLHFCQUFxQjtvQkFDaEQsNEJBQTRCLEVBQUUsd0JBQXdCO2lCQUN2RDthQUNGOzs7O3FCQUVFLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBOelJlc3VsdEljb25UeXBlID0gJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICdpbmZvJyB8ICd3YXJuaW5nJztcbmV4cG9ydCB0eXBlIE56RXhjZXB0aW9uU3RhdHVzVHlwZSA9ICc0MDQnIHwgJzUwMCcgfCAnNDAzJztcbmV4cG9ydCB0eXBlIE56UmVzdWx0U3RhdHVzVHlwZSA9IE56RXhjZXB0aW9uU3RhdHVzVHlwZSB8IE56UmVzdWx0SWNvblR5cGU7XG5cbmNvbnN0IEljb25NYXAgPSB7XG4gIHN1Y2Nlc3M6ICdjaGVjay1jaXJjbGUnLFxuICBlcnJvcjogJ2Nsb3NlLWNpcmNsZScsXG4gIGluZm86ICdleGNsYW1hdGlvbi1jaXJjbGUnLFxuICB3YXJuaW5nOiAnd2FybmluZydcbn07XG5jb25zdCBFeGNlcHRpb25TdGF0dXMgPSBbJzQwNCcsICc1MDAnLCAnNDAzJ107XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1yZXN1bHQnLFxuICBleHBvcnRBczogJ256UmVzdWx0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXJlc3VsdC1pY29uXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzRXhjZXB0aW9uOyBlbHNlIGV4Y2VwdGlvblRwbFwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaWNvblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uOyBsZXQgaWNvblwiPlxuICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImljb25cIiBuelRoZW1lPVwiZmlsbFwiPjwvaT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIWljb25cIiBzZWxlY3Q9XCJbbnotcmVzdWx0LWljb25dXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56VGl0bGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcmVzdWx0LXRpdGxlXCIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+XG4gICAgICAgIHt7IG56VGl0bGUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIW56VGl0bGVcIiBzZWxlY3Q9XCJkaXZbbnotcmVzdWx0LXRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpTdWJUaXRsZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1yZXN1bHQtc3VidGl0bGVcIiAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56U3ViVGl0bGVcIj5cbiAgICAgICAge3sgbnpTdWJUaXRsZSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhbnpTdWJUaXRsZVwiIHNlbGVjdD1cImRpdltuei1yZXN1bHQtc3VidGl0bGVdXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LXJlc3VsdC1jb250ZW50LCBbbnotcmVzdWx0LWNvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtcmVzdWx0LWV4dHJhXCIgKm5nSWY9XCJuekV4dHJhXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHRyYVwiPlxuICAgICAgICB7eyBuekV4dHJhIH19XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8bmctY29udGVudCAqbmdJZj1cIiFuekV4dHJhXCIgc2VsZWN0PVwiZGl2W256LXJlc3VsdC1leHRyYV1cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8bmctdGVtcGxhdGUgI2V4Y2VwdGlvblRwbD5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm56U3RhdHVzXCI+XG4gICAgICAgIDxuei1yZXN1bHQtbm90LWZvdW5kICpuZ1N3aXRjaENhc2U9XCInNDA0J1wiPjwvbnotcmVzdWx0LW5vdC1mb3VuZD5cbiAgICAgICAgPG56LXJlc3VsdC1zZXJ2ZXItZXJyb3IgKm5nU3dpdGNoQ2FzZT1cIic1MDAnXCI+PC9uei1yZXN1bHQtc2VydmVyLWVycm9yPlxuICAgICAgICA8bnotcmVzdWx0LXVuYXV0aG9yaXplZCAqbmdTd2l0Y2hDYXNlPVwiJzQwMydcIj48L256LXJlc3VsdC11bmF1dGhvcml6ZWQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcmVzdWx0XSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1yZXN1bHQtc3VjY2Vzc10nOiBgbnpTdGF0dXMgPT09ICdzdWNjZXNzJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcmVzdWx0LWVycm9yXSc6IGBuelN0YXR1cyA9PT0gJ2Vycm9yJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcmVzdWx0LWluZm9dJzogYG56U3RhdHVzID09PSAnaW5mbydgLFxuICAgICdbY2xhc3MuYW50LXJlc3VsdC13YXJuaW5nXSc6IGBuelN0YXR1cyA9PT0gJ3dhcm5pbmcnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UmVzdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpJY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpTdGF0dXM6IE56UmVzdWx0U3RhdHVzVHlwZSA9ICdpbmZvJztcbiAgQElucHV0KCkgbnpTdWJUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekV4dHJhPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgaWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBpc0V4Y2VwdGlvbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0YXR1c0ljb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U3RhdHVzSWNvbigpOiB2b2lkIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5uekljb247XG5cbiAgICB0aGlzLmlzRXhjZXB0aW9uID0gRXhjZXB0aW9uU3RhdHVzLmluZGV4T2YodGhpcy5uelN0YXR1cykgIT09IC0xO1xuICAgIHRoaXMuaWNvbiA9IGljb25cbiAgICAgID8gdHlwZW9mIGljb24gPT09ICdzdHJpbmcnXG4gICAgICAgID8gSWNvbk1hcFtpY29uIGFzIE56UmVzdWx0SWNvblR5cGVdIHx8IGljb25cbiAgICAgICAgOiBpY29uXG4gICAgICA6IHRoaXMuaXNFeGNlcHRpb25cbiAgICAgID8gdW5kZWZpbmVkXG4gICAgICA6IEljb25NYXBbdGhpcy5uelN0YXR1cyBhcyBOelJlc3VsdEljb25UeXBlXTtcbiAgfVxufVxuIl19