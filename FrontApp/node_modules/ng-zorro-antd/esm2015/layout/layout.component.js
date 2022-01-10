/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { NzSiderComponent } from './sider.component';
export class NzLayoutComponent {
}
NzLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-layout',
                exportAs: 'nzLayout',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                template: ` <ng-content></ng-content> `,
                host: {
                    '[class.ant-layout-has-sider]': 'listOfNzSiderComponent.length > 0',
                    '[class.ant-layout]': 'true'
                }
            },] }
];
NzLayoutComponent.propDecorators = {
    listOfNzSiderComponent: [{ type: ContentChildren, args: [NzSiderComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbGF5b3V0LyIsInNvdXJjZXMiOlsibGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFjckQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBWjdCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsSUFBSSxFQUFFO29CQUNKLDhCQUE4QixFQUFFLG1DQUFtQztvQkFDbkUsb0JBQW9CLEVBQUUsTUFBTTtpQkFDN0I7YUFDRjs7O3FDQUVFLGVBQWUsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2lkZXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxheW91dCcsXG4gIGV4cG9ydEFzOiAnbnpMYXlvdXQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWxheW91dC1oYXMtc2lkZXJdJzogJ2xpc3RPZk56U2lkZXJDb21wb25lbnQubGVuZ3RoID4gMCcsXG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0XSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGF5b3V0Q29tcG9uZW50IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOelNpZGVyQ29tcG9uZW50KSBsaXN0T2ZOelNpZGVyQ29tcG9uZW50ITogUXVlcnlMaXN0PE56U2lkZXJDb21wb25lbnQ+O1xufVxuIl19