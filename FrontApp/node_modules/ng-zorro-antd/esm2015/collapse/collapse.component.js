/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'collapse';
export class NzCollapseComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAccordion = false;
        this.nzBordered = true;
        this.nzGhost = false;
        this.nzExpandIconPosition = 'left';
        this.listOfNzCollapsePanelComponent = [];
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    addPanel(value) {
        this.listOfNzCollapsePanelComponent.push(value);
    }
    removePanel(value) {
        this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
    }
    click(collapse) {
        if (this.nzAccordion && !collapse.nzActive) {
            this.listOfNzCollapsePanelComponent
                .filter(item => item !== collapse)
                .forEach(item => {
                if (item.nzActive) {
                    item.nzActive = false;
                    item.nzActiveChange.emit(item.nzActive);
                    item.markForCheck();
                }
            });
        }
        collapse.nzActive = !collapse.nzActive;
        collapse.nzActiveChange.emit(collapse.nzActive);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCollapseComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-collapse',
                exportAs: 'nzCollapse',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-collapse]': 'true',
                    '[class.ant-collapse-icon-position-left]': `nzExpandIconPosition === 'left'`,
                    '[class.ant-collapse-icon-position-right]': `nzExpandIconPosition === 'right'`,
                    '[class.ant-collapse-ghost]': `nzGhost`,
                    '[class.ant-collapse-borderless]': '!nzBordered'
                }
            },] }
];
NzCollapseComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzCollapseComponent.propDecorators = {
    nzAccordion: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzGhost: [{ type: Input }],
    nzExpandIconPosition: [{ type: Input }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzAccordion", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCollapseComponent.prototype, "nzGhost", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb2xsYXBzZS8iLCJzb3VyY2VzIjpbImNvbGxhcHNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0gsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsTUFBTSxxQkFBcUIsR0FBZ0IsVUFBVSxDQUFDO0FBa0J0RCxNQUFNLE9BQU8sbUJBQW1CO0lBWTlCLFlBQW1CLGVBQWdDLEVBQVUsR0FBc0I7UUFBaEUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFYMUUsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFLckIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3ZELHlCQUFvQixHQUFxQixNQUFNLENBQUM7UUFDakQsbUNBQThCLEdBQStCLEVBQUUsQ0FBQztRQUNoRSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsZUFBZTthQUNqQixnQ0FBZ0MsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBK0I7UUFDdEMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQStCO1FBQ3pDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWtDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLDhCQUE4QjtpQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQztpQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBL0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOztHQUVUO2dCQUNELElBQUksRUFBRTtvQkFDSixzQkFBc0IsRUFBRSxNQUFNO29CQUM5Qix5Q0FBeUMsRUFBRSxpQ0FBaUM7b0JBQzVFLDBDQUEwQyxFQUFFLGtDQUFrQztvQkFDOUUsNEJBQTRCLEVBQUUsU0FBUztvQkFDdkMsaUNBQWlDLEVBQUUsYUFBYTtpQkFDakQ7YUFDRjs7O1lBekJxQixlQUFlO1lBRkgsaUJBQWlCOzs7MEJBa0NoRCxLQUFLO3lCQUNMLEtBQUs7c0JBQ0wsS0FBSzttQ0FDTCxLQUFLOztBQUhpQztJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7O3dEQUE4QjtBQUM3QjtJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7O3VEQUE0QjtBQUMzQjtJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7O29EQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbGxhcHNlLXBhbmVsLmNvbXBvbmVudCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnY29sbGFwc2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1jb2xsYXBzZScsXG4gIGV4cG9ydEFzOiAnbnpDb2xsYXBzZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC1jb2xsYXBzZS1pY29uLXBvc2l0aW9uLWxlZnRdJzogYG56RXhwYW5kSWNvblBvc2l0aW9uID09PSAnbGVmdCdgLFxuICAgICdbY2xhc3MuYW50LWNvbGxhcHNlLWljb24tcG9zaXRpb24tcmlnaHRdJzogYG56RXhwYW5kSWNvblBvc2l0aW9uID09PSAncmlnaHQnYCxcbiAgICAnW2NsYXNzLmFudC1jb2xsYXBzZS1naG9zdF0nOiBgbnpHaG9zdGAsXG4gICAgJ1tjbGFzcy5hbnQtY29sbGFwc2UtYm9yZGVybGVzc10nOiAnIW56Qm9yZGVyZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDb2xsYXBzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IF9uek1vZHVsZU5hbWU6IE56Q29uZmlnS2V5ID0gTlpfQ09ORklHX01PRFVMRV9OQU1FO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBY2NvcmRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2hvc3Q6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekFjY29yZGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekJvcmRlcmVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpHaG9zdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuekV4cGFuZEljb25Qb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdsZWZ0JztcbiAgcHJpdmF0ZSBsaXN0T2ZOekNvbGxhcHNlUGFuZWxDb21wb25lbnQ6IE56Q29sbGFwc2VQYW5lbENvbXBvbmVudFtdID0gW107XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBhZGRQYW5lbCh2YWx1ZTogTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZOekNvbGxhcHNlUGFuZWxDb21wb25lbnQucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVQYW5lbCh2YWx1ZTogTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZOekNvbGxhcHNlUGFuZWxDb21wb25lbnQuc3BsaWNlKHRoaXMubGlzdE9mTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50LmluZGV4T2YodmFsdWUpLCAxKTtcbiAgfVxuXG4gIGNsaWNrKGNvbGxhcHNlOiBOekNvbGxhcHNlUGFuZWxDb21wb25lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekFjY29yZGlvbiAmJiAhY29sbGFwc2UubnpBY3RpdmUpIHtcbiAgICAgIHRoaXMubGlzdE9mTnpDb2xsYXBzZVBhbmVsQ29tcG9uZW50XG4gICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBjb2xsYXBzZSlcbiAgICAgICAgLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ubnpBY3RpdmUpIHtcbiAgICAgICAgICAgIGl0ZW0ubnpBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGl0ZW0ubnpBY3RpdmVDaGFuZ2UuZW1pdChpdGVtLm56QWN0aXZlKTtcbiAgICAgICAgICAgIGl0ZW0ubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29sbGFwc2UubnpBY3RpdmUgPSAhY29sbGFwc2UubnpBY3RpdmU7XG4gICAgY29sbGFwc2UubnpBY3RpdmVDaGFuZ2UuZW1pdChjb2xsYXBzZS5uekFjdGl2ZSk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=