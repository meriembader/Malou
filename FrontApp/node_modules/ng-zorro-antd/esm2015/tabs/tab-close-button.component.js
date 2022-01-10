/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Component, Input } from '@angular/core';
export class NzTabCloseButtonComponent {
    constructor() {
        this.closeIcon = 'close';
    }
}
NzTabCloseButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tab-close-button, button[nz-tab-close-button]',
                template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <i nz-icon [nzType]="icon" nzTheme="outline"></i>
    </ng-container>
  `,
                host: {
                    class: 'ant-tabs-tab-remove',
                    'aria-label': 'Close tab',
                    type: 'button'
                }
            },] }
];
NzTabCloseButtonComponent.ctorParameters = () => [];
NzTabCloseButtonComponent.propDecorators = {
    closeIcon: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNsb3NlLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RhYnMvIiwic291cmNlcyI6WyJ0YWItY2xvc2UtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQWlCOUQsTUFBTSxPQUFPLHlCQUF5QjtJQUdwQztRQUZTLGNBQVMsR0FBb0MsT0FBTyxDQUFDO0lBRS9DLENBQUM7OztZQWhCakIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrREFBa0Q7Z0JBQzVELFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUscUJBQXFCO29CQUM1QixZQUFZLEVBQUUsV0FBVztvQkFDekIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjs7Ozt3QkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGFiLWNsb3NlLWJ1dHRvbiwgYnV0dG9uW256LXRhYi1jbG9zZS1idXR0b25dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiY2xvc2VJY29uOyBsZXQgaWNvblwiPlxuICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImljb25cIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRhYnMtdGFiLXJlbW92ZScsXG4gICAgJ2FyaWEtbGFiZWwnOiAnQ2xvc2UgdGFiJyxcbiAgICB0eXBlOiAnYnV0dG9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VGFiQ2xvc2VCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBjbG9zZUljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAnY2xvc2UnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiJdfQ==