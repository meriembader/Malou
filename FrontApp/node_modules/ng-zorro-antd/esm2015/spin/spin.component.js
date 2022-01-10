/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, ReplaySubject, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, startWith, switchMap, takeUntil } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'spin';
export class NzSpinComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzIndicator = null;
        this.nzSize = 'default';
        this.nzTip = null;
        this.nzDelay = 0;
        this.nzSimple = false;
        this.nzSpinning = true;
        this.destroy$ = new Subject();
        this.spinning$ = new BehaviorSubject(this.nzSpinning);
        this.delay$ = new ReplaySubject(1);
        this.isLoading = false;
    }
    ngOnInit() {
        const loading$ = this.delay$.pipe(startWith(this.nzDelay), distinctUntilChanged(), switchMap(delay => {
            if (delay === 0) {
                return this.spinning$;
            }
            return this.spinning$.pipe(debounce(spinning => timer(spinning ? delay : 0)));
        }), takeUntil(this.destroy$));
        loading$.subscribe(loading => {
            this.isLoading = loading;
            this.cdr.markForCheck();
        });
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cdr.markForCheck());
    }
    ngOnChanges(changes) {
        const { nzSpinning, nzDelay } = changes;
        if (nzSpinning) {
            this.spinning$.next(this.nzSpinning);
        }
        if (nzDelay) {
            this.delay$.next(this.nzDelay);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzSpinComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-spin',
                exportAs: 'nzSpin',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ant-spin"
        [class.ant-spin-spinning]="isLoading"
        [class.ant-spin-lg]="nzSize === 'large'"
        [class.ant-spin-sm]="nzSize === 'small'"
        [class.ant-spin-show-text]="nzTip"
      >
        <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
        <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
      </div>
    </div>
    <div *ngIf="!nzSimple" class="ant-spin-container" [class.ant-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `,
                host: {
                    '[class.ant-spin-nested-loading]': '!nzSimple'
                }
            },] }
];
NzSpinComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzSpinComponent.propDecorators = {
    nzIndicator: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzTip: [{ type: Input }],
    nzDelay: [{ type: Input }],
    nzSimple: [{ type: Input }],
    nzSpinning: [{ type: Input }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzIndicator", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzDelay", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzSimple", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSpinComponent.prototype, "nzSpinning", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NwaW4vIiwic291cmNlcyI6WyJzcGluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQU1MLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RSxPQUFPLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakcsTUFBTSxxQkFBcUIsR0FBZ0IsTUFBTSxDQUFDO0FBb0NsRCxNQUFNLE9BQU8sZUFBZTtJQWtCMUIsWUFBbUIsZUFBZ0MsRUFBVSxHQUFzQjtRQUFoRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQWpCMUUsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFNckMsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBQ2hFLFdBQU0sR0FBa0IsU0FBUyxDQUFDO1FBQ2xDLFVBQUssR0FBa0IsSUFBSSxDQUFDO1FBQ2IsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNuQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixjQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELFdBQU0sR0FBRyxJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztRQUM5QyxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBRW9FLENBQUM7SUFFdkYsUUFBUTtRQUNOLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUMvQixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUN2QixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUN2QjtZQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDekIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlO2FBQ2pCLGdDQUFnQyxDQUFDLHFCQUFxQixDQUFDO2FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN4QyxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBMUZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osaUNBQWlDLEVBQUUsV0FBVztpQkFDL0M7YUFDRjs7O1lBMUNxQixlQUFlO1lBVm5DLGlCQUFpQjs7OzBCQTREaEIsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7O0FBTGlCO0lBQWIsVUFBVSxFQUFFOztvREFBbUQ7QUFHakQ7SUFBZCxXQUFXLEVBQUU7O2dEQUFhO0FBQ1g7SUFBZixZQUFZLEVBQUU7O2lEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTs7bURBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnVtYmVySW5wdXQsIE56U2FmZUFueSwgTnpTaXplTERTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFJlcGxheVN1YmplY3QsIFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnc3Bpbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXNwaW4nLFxuICBleHBvcnRBczogJ256U3BpbicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFRlbXBsYXRlPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtc3Bpbi1kb3QgYW50LXNwaW4tZG90LXNwaW5cIj5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgICAgPGkgY2xhc3M9XCJhbnQtc3Bpbi1kb3QtaXRlbVwiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgKm5nSWY9XCJpc0xvYWRpbmdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtc3BpblwiXG4gICAgICAgIFtjbGFzcy5hbnQtc3Bpbi1zcGlubmluZ109XCJpc0xvYWRpbmdcIlxuICAgICAgICBbY2xhc3MuYW50LXNwaW4tbGddPVwibnpTaXplID09PSAnbGFyZ2UnXCJcbiAgICAgICAgW2NsYXNzLmFudC1zcGluLXNtXT1cIm56U2l6ZSA9PT0gJ3NtYWxsJ1wiXG4gICAgICAgIFtjbGFzcy5hbnQtc3Bpbi1zaG93LXRleHRdPVwibnpUaXBcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpJbmRpY2F0b3IgfHwgZGVmYXVsdFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1zcGluLXRleHRcIiAqbmdJZj1cIm56VGlwXCI+e3sgbnpUaXAgfX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCIhbnpTaW1wbGVcIiBjbGFzcz1cImFudC1zcGluLWNvbnRhaW5lclwiIFtjbGFzcy5hbnQtc3Bpbi1ibHVyXT1cImlzTG9hZGluZ1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtc3Bpbi1uZXN0ZWQtbG9hZGluZ10nOiAnIW56U2ltcGxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U3BpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEZWxheTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbXBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTcGlubmluZzogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpTaXplOiBOelNpemVMRFNUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelRpcDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56RGVsYXkgPSAwO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaW1wbGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U3Bpbm5pbmcgPSB0cnVlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBzcGlubmluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRoaXMubnpTcGlubmluZyk7XG4gIHByaXZhdGUgZGVsYXkkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigxKTtcbiAgaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgbG9hZGluZyQgPSB0aGlzLmRlbGF5JC5waXBlKFxuICAgICAgc3RhcnRXaXRoKHRoaXMubnpEZWxheSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgc3dpdGNoTWFwKGRlbGF5ID0+IHtcbiAgICAgICAgaWYgKGRlbGF5ID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3Bpbm5pbmckO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Bpbm5pbmckLnBpcGUoZGVib3VuY2Uoc3Bpbm5pbmcgPT4gdGltZXIoc3Bpbm5pbmcgPyBkZWxheSA6IDApKSk7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICk7XG4gICAgbG9hZGluZyQuc3Vic2NyaWJlKGxvYWRpbmcgPT4ge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBsb2FkaW5nO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U3Bpbm5pbmcsIG56RGVsYXkgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56U3Bpbm5pbmcpIHtcbiAgICAgIHRoaXMuc3Bpbm5pbmckLm5leHQodGhpcy5uelNwaW5uaW5nKTtcbiAgICB9XG4gICAgaWYgKG56RGVsYXkpIHtcbiAgICAgIHRoaXMuZGVsYXkkLm5leHQodGhpcy5uekRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==