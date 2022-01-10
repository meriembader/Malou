/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { NzSpaceItemComponent } from './space-item.component';
const NZ_CONFIG_MODULE_NAME = 'space';
export class NzSpaceComponent {
    constructor(nzConfigService) {
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzDirection = 'horizontal';
        this.nzSize = 'small';
        this.destroy$ = new Subject();
    }
    updateSpaceItems() {
        if (this.nzSpaceItemComponents) {
            this.nzSpaceItemComponents.forEach(item => {
                item.setDirectionAndSize(this.nzDirection, this.nzSize);
            });
        }
    }
    ngOnChanges() {
        this.updateSpaceItems();
        this.mergedAlign = this.nzAlign === undefined && this.nzDirection === 'horizontal' ? 'center' : this.nzAlign;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterViewInit() {
        this.nzSpaceItemComponents.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
            this.updateSpaceItems();
        });
    }
}
NzSpaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-space, [nz-space]',
                exportAs: 'NzSpace',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-content></ng-content>
  `,
                host: {
                    class: 'ant-space',
                    '[class.ant-space-horizontal]': 'nzDirection === "horizontal"',
                    '[class.ant-space-vertical]': 'nzDirection === "vertical"',
                    '[class.ant-space-align-start]': 'mergedAlign === "start"',
                    '[class.ant-space-align-end]': 'mergedAlign === "end"',
                    '[class.ant-space-align-center]': 'mergedAlign === "center"',
                    '[class.ant-space-align-baseline]': 'mergedAlign === "baseline"'
                }
            },] }
];
NzSpaceComponent.ctorParameters = () => [
    { type: NzConfigService }
];
NzSpaceComponent.propDecorators = {
    nzDirection: [{ type: Input }],
    nzAlign: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzSpaceItemComponents: [{ type: ContentChildren, args: [NzSpaceItemComponent,] }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzSpaceComponent.prototype, "nzSize", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zcGFjZS8iLCJzb3VyY2VzIjpbInNwYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBd0IsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNJLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzlELE1BQU0scUJBQXFCLEdBQWdCLE9BQU8sQ0FBQztBQW1CbkQsTUFBTSxPQUFPLGdCQUFnQjtJQVkzQixZQUFtQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFYMUMsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFFbkQsZ0JBQVcsR0FBcUIsWUFBWSxDQUFDO1FBRS9CLFdBQU0sR0FBeUIsT0FBTyxDQUFDO1FBS3RELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRXFCLENBQUM7SUFFL0MsZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0csQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFyREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOztHQUVUO2dCQUNELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsV0FBVztvQkFDbEIsOEJBQThCLEVBQUUsOEJBQThCO29CQUM5RCw0QkFBNEIsRUFBRSw0QkFBNEI7b0JBQzFELCtCQUErQixFQUFFLHlCQUF5QjtvQkFDMUQsNkJBQTZCLEVBQUUsdUJBQXVCO29CQUN0RCxnQ0FBZ0MsRUFBRSwwQkFBMEI7b0JBQzVELGtDQUFrQyxFQUFFLDRCQUE0QjtpQkFDakU7YUFDRjs7O1lBMUJxQixlQUFlOzs7MEJBOEJsQyxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSztvQ0FFTCxlQUFlLFNBQUMsb0JBQW9COztBQUZkO0lBQWIsVUFBVSxFQUFFOztnREFBd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelNwYWNlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc3BhY2UtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTcGFjZUFsaWduLCBOelNwYWNlRGlyZWN0aW9uLCBOelNwYWNlU2l6ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3NwYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc3BhY2UsIFtuei1zcGFjZV0nLFxuICBleHBvcnRBczogJ056U3BhY2UnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1zcGFjZScsXG4gICAgJ1tjbGFzcy5hbnQtc3BhY2UtaG9yaXpvbnRhbF0nOiAnbnpEaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2NsYXNzLmFudC1zcGFjZS12ZXJ0aWNhbF0nOiAnbnpEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIicsXG4gICAgJ1tjbGFzcy5hbnQtc3BhY2UtYWxpZ24tc3RhcnRdJzogJ21lcmdlZEFsaWduID09PSBcInN0YXJ0XCInLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWFsaWduLWVuZF0nOiAnbWVyZ2VkQWxpZ24gPT09IFwiZW5kXCInLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWFsaWduLWNlbnRlcl0nOiAnbWVyZ2VkQWxpZ24gPT09IFwiY2VudGVyXCInLFxuICAgICdbY2xhc3MuYW50LXNwYWNlLWFsaWduLWJhc2VsaW5lXSc6ICdtZXJnZWRBbGlnbiA9PT0gXCJiYXNlbGluZVwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U3BhY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuXG4gIEBJbnB1dCgpIG56RGlyZWN0aW9uOiBOelNwYWNlRGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBuekFsaWduPzogTnpTcGFjZUFsaWduO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogbnVtYmVyIHwgTnpTcGFjZVNpemUgPSAnc21hbGwnO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTcGFjZUl0ZW1Db21wb25lbnQpIG56U3BhY2VJdGVtQ29tcG9uZW50cyE6IFF1ZXJ5TGlzdDxOelNwYWNlSXRlbUNvbXBvbmVudD47XG5cbiAgbWVyZ2VkQWxpZ24/OiBOelNwYWNlQWxpZ247XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSkge31cblxuICBwcml2YXRlIHVwZGF0ZVNwYWNlSXRlbXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpTcGFjZUl0ZW1Db21wb25lbnRzKSB7XG4gICAgICB0aGlzLm56U3BhY2VJdGVtQ29tcG9uZW50cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLnNldERpcmVjdGlvbkFuZFNpemUodGhpcy5uekRpcmVjdGlvbiwgdGhpcy5uelNpemUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTcGFjZUl0ZW1zKCk7XG4gICAgdGhpcy5tZXJnZWRBbGlnbiA9IHRoaXMubnpBbGlnbiA9PT0gdW5kZWZpbmVkICYmIHRoaXMubnpEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICdjZW50ZXInIDogdGhpcy5uekFsaWduO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpTcGFjZUl0ZW1Db21wb25lbnRzLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlU3BhY2VJdGVtcygpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=