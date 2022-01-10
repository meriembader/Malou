/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzCardGridDirective } from './card-grid.directive';
import { NzCardTabComponent } from './card-tab.component';
const NZ_CONFIG_MODULE_NAME = 'card';
export class NzCardComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBordered = true;
        this.nzBorderless = false;
        this.nzLoading = false;
        this.nzHoverable = false;
        this.nzBodyStyle = null;
        this.nzActions = [];
        this.nzType = null;
        this.nzSize = 'default';
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-card',
                exportAs: 'nzCard',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="ant-card-head" *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100 / nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
                host: {
                    '[class.ant-card]': 'true',
                    '[class.ant-card-loading]': 'nzLoading',
                    '[class.ant-card-bordered]': 'nzBorderless === false && nzBordered',
                    '[class.ant-card-hoverable]': 'nzHoverable',
                    '[class.ant-card-small]': 'nzSize === "small"',
                    '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
                    '[class.ant-card-type-inner]': 'nzType === "inner"',
                    '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent'
                }
            },] }
];
NzCardComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzCardComponent.propDecorators = {
    nzBordered: [{ type: Input }],
    nzBorderless: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzHoverable: [{ type: Input }],
    nzBodyStyle: [{ type: Input }],
    nzCover: [{ type: Input }],
    nzActions: [{ type: Input }],
    nzType: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzExtra: [{ type: Input }],
    listOfNzCardTabComponent: [{ type: ContentChild, args: [NzCardTabComponent, { static: false },] }],
    listOfNzCardGridDirective: [{ type: ContentChildren, args: [NzCardGridDirective,] }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCardComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCardComponent.prototype, "nzBorderless", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCardComponent.prototype, "nzLoading", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCardComponent.prototype, "nzHoverable", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzCardComponent.prototype, "nzSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NhcmQvIiwic291cmNlcyI6WyJjYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsS0FBSyxFQUVMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTFELE1BQU0scUJBQXFCLEdBQWdCLE1BQU0sQ0FBQztBQWtEbEQsTUFBTSxPQUFPLGVBQWU7SUFzQjFCLFlBQW1CLGVBQWdDLEVBQVUsR0FBc0I7UUFBaEUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFyQjFFLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBTXJCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDNUMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNKLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzNELGdCQUFXLEdBQTRCLElBQUksQ0FBQztRQUU1QyxjQUFTLEdBQTZCLEVBQUUsQ0FBQztRQUN6QyxXQUFNLEdBQTRCLElBQUksQ0FBQztRQUN6QixXQUFNLEdBQWlCLFNBQVMsQ0FBQztRQUtoRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUcvQixJQUFJLENBQUMsZUFBZTthQUNqQixnQ0FBZ0MsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQWpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUO2dCQUNELElBQUksRUFBRTtvQkFDSixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQiwwQkFBMEIsRUFBRSxXQUFXO29CQUN2QywyQkFBMkIsRUFBRSxzQ0FBc0M7b0JBQ25FLDRCQUE0QixFQUFFLGFBQWE7b0JBQzNDLHdCQUF3QixFQUFFLG9CQUFvQjtvQkFDOUMsK0JBQStCLEVBQUUsK0RBQStEO29CQUNoRyw2QkFBNkIsRUFBRSxvQkFBb0I7b0JBQ25ELCtCQUErQixFQUFFLDRCQUE0QjtpQkFDOUQ7YUFDRjs7O1lBekRxQixlQUFlO1lBVm5DLGlCQUFpQjs7O3lCQTJFaEIsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3VDQUNMLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0NBQ2xELGVBQWUsU0FBQyxtQkFBbUI7O0FBWkc7SUFBN0IsVUFBVSxFQUFFO0lBQUUsWUFBWSxFQUFFOzttREFBNEI7QUFDM0I7SUFBN0IsVUFBVSxFQUFFO0lBQUUsWUFBWSxFQUFFOztxREFBK0I7QUFDNUM7SUFBZixZQUFZLEVBQUU7O2tEQUFtQjtBQUNKO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7b0RBQThCO0FBSzdDO0lBQWIsVUFBVSxFQUFFOzsrQ0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlLCBOelNpemVEU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTnpDYXJkR3JpZERpcmVjdGl2ZSB9IGZyb20gJy4vY2FyZC1ncmlkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekNhcmRUYWJDb21wb25lbnQgfSBmcm9tICcuL2NhcmQtdGFiLmNvbXBvbmVudCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnY2FyZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNhcmQnLFxuICBleHBvcnRBczogJ256Q2FyZCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWNhcmQtaGVhZFwiICpuZ0lmPVwibnpUaXRsZSB8fCBuekV4dHJhIHx8IGxpc3RPZk56Q2FyZFRhYkNvbXBvbmVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWhlYWQtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWNhcmQtaGVhZC10aXRsZVwiICpuZ0lmPVwibnpUaXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWV4dHJhXCIgKm5nSWY9XCJuekV4dHJhXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RXh0cmFcIj57eyBuekV4dHJhIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGlzdE9mTnpDYXJkVGFiQ29tcG9uZW50XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0T2ZOekNhcmRUYWJDb21wb25lbnQudGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWNvdmVyXCIgKm5nSWY9XCJuekNvdmVyXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpDb3ZlclwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWJvZHlcIiBbbmdTdHlsZV09XCJuekJvZHlTdHlsZVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuekxvYWRpbmc7IGVsc2UgbG9hZGluZ1RlbXBsYXRlXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICNsb2FkaW5nVGVtcGxhdGU+XG4gICAgICAgIDxuei1jYXJkLWxvYWRpbmc+PC9uei1jYXJkLWxvYWRpbmc+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICAgIDx1bCBjbGFzcz1cImFudC1jYXJkLWFjdGlvbnNcIiAqbmdJZj1cIm56QWN0aW9ucy5sZW5ndGhcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG56QWN0aW9uc1wiIFtzdHlsZS53aWR0aC4lXT1cIjEwMCAvIG56QWN0aW9ucy5sZW5ndGhcIj5cbiAgICAgICAgPHNwYW4+PG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFjdGlvblwiPjwvbmctdGVtcGxhdGU+PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtY2FyZF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1sb2FkaW5nXSc6ICduekxvYWRpbmcnLFxuICAgICdbY2xhc3MuYW50LWNhcmQtYm9yZGVyZWRdJzogJ256Qm9yZGVybGVzcyA9PT0gZmFsc2UgJiYgbnpCb3JkZXJlZCcsXG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1ob3ZlcmFibGVdJzogJ256SG92ZXJhYmxlJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLXNtYWxsXSc6ICduelNpemUgPT09IFwic21hbGxcIicsXG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1jb250YWluLWdyaWRdJzogJ2xpc3RPZk56Q2FyZEdyaWREaXJlY3RpdmUgJiYgbGlzdE9mTnpDYXJkR3JpZERpcmVjdGl2ZS5sZW5ndGgnLFxuICAgICdbY2xhc3MuYW50LWNhcmQtdHlwZS1pbm5lcl0nOiAnbnpUeXBlID09PSBcImlubmVyXCInLFxuICAgICdbY2xhc3MuYW50LWNhcmQtY29udGFpbi10YWJzXSc6ICchIWxpc3RPZk56Q2FyZFRhYkNvbXBvbmVudCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVybGVzczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpMb2FkaW5nOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhvdmVyYWJsZTogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56Qm9yZGVyZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekJvcmRlcmxlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekhvdmVyYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekJvZHlTdHlsZTogTmdTdHlsZUludGVyZmFjZSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekNvdmVyPzogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56QWN0aW9uczogQXJyYXk8VGVtcGxhdGVSZWY8dm9pZD4+ID0gW107XG4gIEBJbnB1dCgpIG56VHlwZTogc3RyaW5nIHwgJ2lubmVyJyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogTnpTaXplRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56RXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQENvbnRlbnRDaGlsZChOekNhcmRUYWJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0T2ZOekNhcmRUYWJDb21wb25lbnQ/OiBOekNhcmRUYWJDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpDYXJkR3JpZERpcmVjdGl2ZSkgbGlzdE9mTnpDYXJkR3JpZERpcmVjdGl2ZSE6IFF1ZXJ5TGlzdDxOekNhcmRHcmlkRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19