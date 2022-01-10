/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbComponent } from './breadcrumb.component';
export class NzBreadCrumbItemComponent {
    constructor(nzBreadCrumbComponent) {
        this.nzBreadCrumbComponent = nzBreadCrumbComponent;
    }
}
NzBreadCrumbItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-breadcrumb-item',
                exportAs: 'nzBreadcrumbItem',
                preserveWhitespaces: false,
                template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!nzOverlay" nz-icon nzType="down"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="ant-breadcrumb-separator" *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `
            },] }
];
NzBreadCrumbItemComponent.ctorParameters = () => [
    { type: NzBreadCrumbComponent }
];
NzBreadCrumbItemComponent.propDecorators = {
    nzOverlay: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYnJlYWRjcnVtYi8iLCJzb3VyY2VzIjpbImJyZWFkY3J1bWItaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUE2Qi9ELE1BQU0sT0FBTyx5QkFBeUI7SUFNcEMsWUFBbUIscUJBQTRDO1FBQTVDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7SUFBRyxDQUFDOzs7WUFqQ3BFLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDthQUNGOzs7WUE1QlEscUJBQXFCOzs7d0JBaUMzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56RHJvcGRvd25NZW51Q29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9kcm9wZG93bic7XG5cbmltcG9ydCB7IE56QnJlYWRDcnVtYkNvbXBvbmVudCB9IGZyb20gJy4vYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotYnJlYWRjcnVtYi1pdGVtJyxcbiAgZXhwb3J0QXM6ICduekJyZWFkY3J1bWJJdGVtJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbnpPdmVybGF5OyBlbHNlIG5vTWVudVRwbFwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtYnJlYWRjcnVtYi1vdmVybGF5LWxpbmtcIiBuei1kcm9wZG93biBbbnpEcm9wZG93bk1lbnVdPVwibnpPdmVybGF5XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJub01lbnVUcGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8aSAqbmdJZj1cIiEhbnpPdmVybGF5XCIgbnotaWNvbiBuelR5cGU9XCJkb3duXCI+PC9pPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNub01lbnVUcGw+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC1icmVhZGNydW1iLWxpbmtcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8c3BhbiBjbGFzcz1cImFudC1icmVhZGNydW1iLXNlcGFyYXRvclwiICpuZ0lmPVwibnpCcmVhZENydW1iQ29tcG9uZW50Lm56U2VwYXJhdG9yXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpCcmVhZENydW1iQ29tcG9uZW50Lm56U2VwYXJhdG9yXCI+XG4gICAgICAgIHt7IG56QnJlYWRDcnVtYkNvbXBvbmVudC5uelNlcGFyYXRvciB9fVxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56QnJlYWRDcnVtYkl0ZW1Db21wb25lbnQge1xuICAvKipcbiAgICogRHJvcGRvd24gY29udGVudCBvZiBhIGJyZWFkY3J1bWIgaXRlbS5cbiAgICovXG4gIEBJbnB1dCgpIG56T3ZlcmxheT86IE56RHJvcGRvd25NZW51Q29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuekJyZWFkQ3J1bWJDb21wb25lbnQ6IE56QnJlYWRDcnVtYkNvbXBvbmVudCkge31cbn1cbiJdfQ==