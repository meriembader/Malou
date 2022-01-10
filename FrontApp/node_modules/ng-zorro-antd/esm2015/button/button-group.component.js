/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
export class NzButtonGroupComponent {
    constructor() {
        this.nzSize = 'default';
    }
}
NzButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-button-group',
                exportAs: 'nzButtonGroup',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-btn-group]': `true`,
                    '[class.ant-btn-group-lg]': `nzSize === 'large'`,
                    '[class.ant-btn-group-sm]': `nzSize === 'small'`
                },
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `
            },] }
];
NzButtonGroupComponent.propDecorators = {
    nzSize: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYnV0dG9uLyIsInNvdXJjZXMiOlsiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWlCN0YsTUFBTSxPQUFPLHNCQUFzQjtJQWJuQztRQWNXLFdBQU0sR0FBc0IsU0FBUyxDQUFDO0lBQ2pELENBQUM7OztZQWZBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZUFBZTtnQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osdUJBQXVCLEVBQUUsTUFBTTtvQkFDL0IsMEJBQTBCLEVBQUUsb0JBQW9CO29CQUNoRCwwQkFBMEIsRUFBRSxvQkFBb0I7aUJBQ2pEO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7OztxQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIE56QnV0dG9uR3JvdXBTaXplID0gJ2xhcmdlJyB8ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWJ1dHRvbi1ncm91cCcsXG4gIGV4cG9ydEFzOiAnbnpCdXR0b25Hcm91cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtYnRuLWdyb3VwXSc6IGB0cnVlYCxcbiAgICAnW2NsYXNzLmFudC1idG4tZ3JvdXAtbGddJzogYG56U2l6ZSA9PT0gJ2xhcmdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYnRuLWdyb3VwLXNtXSc6IGBuelNpemUgPT09ICdzbWFsbCdgXG4gIH0sXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGBcbn0pXG5leHBvcnQgY2xhc3MgTnpCdXR0b25Hcm91cENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG56U2l6ZTogTnpCdXR0b25Hcm91cFNpemUgPSAnZGVmYXVsdCc7XG59XG4iXX0=