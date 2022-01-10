/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'form';
export const DefaultTooltipIcon = {
    type: 'question-circle',
    theme: 'outline'
};
export class NzFormDirective {
    constructor(nzConfigService, elementRef, renderer) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzLayout = 'horizontal';
        this.nzNoColon = false;
        this.nzAutoTips = {};
        this.nzDisableAutoTips = false;
        this.nzTooltipIcon = DefaultTooltipIcon;
        this.destroy$ = new Subject();
        this.inputChanges$ = new Subject();
        this.renderer.addClass(elementRef.nativeElement, 'ant-form');
    }
    getInputObservable(changeType) {
        return this.inputChanges$.pipe(filter(changes => changeType in changes), map(value => value[changeType]));
    }
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    ngOnDestroy() {
        this.inputChanges$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-form]',
                exportAs: 'nzForm',
                host: {
                    '[class.ant-form-horizontal]': `nzLayout === 'horizontal'`,
                    '[class.ant-form-vertical]': `nzLayout === 'vertical'`,
                    '[class.ant-form-inline]': `nzLayout === 'inline'`
                }
            },] }
];
NzFormDirective.ctorParameters = () => [
    { type: NzConfigService },
    { type: ElementRef },
    { type: Renderer2 }
];
NzFormDirective.propDecorators = {
    nzLayout: [{ type: Input }],
    nzNoColon: [{ type: Input }],
    nzAutoTips: [{ type: Input }],
    nzDisableAutoTips: [{ type: Input }],
    nzTooltipIcon: [{ type: Input }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzFormDirective.prototype, "nzNoColon", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzFormDirective.prototype, "nzAutoTips", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzFormDirective.prototype, "nzDisableAutoTips", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzFormDirective.prototype, "nzTooltipIcon", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2Zvcm0vIiwic291cmNlcyI6WyJmb3JtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUF3QixTQUFTLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBRzNILE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxNQUFNLHFCQUFxQixHQUFnQixNQUFNLENBQUM7QUFJbEQsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUc7SUFDaEMsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixLQUFLLEVBQUUsU0FBUztDQUNSLENBQUM7QUFXWCxNQUFNLE9BQU8sZUFBZTtJQXFCMUIsWUFBbUIsZUFBZ0MsRUFBRSxVQUFzQixFQUFVLFFBQW1CO1FBQXJGLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUFrQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBcEIvRixrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQUluRCxhQUFRLEdBQXFCLFlBQVksQ0FBQztRQUNaLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0MsZUFBVSxHQUEyQyxFQUFFLENBQUM7UUFDdEQsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzVCLGtCQUFhLEdBQWdELGtCQUFrQixDQUFDO1FBRXZHLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFVbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBVEQsa0JBQWtCLENBQXVCLFVBQWE7UUFDcEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxFQUN4QyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBb0IsQ0FBQyxDQUFDLENBQzFDLENBQUM7SUFDSixDQUFDO0lBTUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLElBQUksRUFBRTtvQkFDSiw2QkFBNkIsRUFBRSwyQkFBMkI7b0JBQzFELDJCQUEyQixFQUFFLHlCQUF5QjtvQkFDdEQseUJBQXlCLEVBQUUsdUJBQXVCO2lCQUNuRDthQUNGOzs7WUF2QnFCLGVBQWU7WUFIakIsVUFBVTtZQUErQixTQUFTOzs7dUJBZ0NuRSxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSztnQ0FDTCxLQUFLOzRCQUNMLEtBQUs7O0FBSGlDO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7a0RBQTRCO0FBQzNDO0lBQWIsVUFBVSxFQUFFOzttREFBeUQ7QUFDdEQ7SUFBZixZQUFZLEVBQUU7OzBEQUEyQjtBQUM1QjtJQUFiLFVBQVUsRUFBRTs7c0RBQWlGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbnB1dE9ic2VydmFibGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnZm9ybSc7XG5cbmV4cG9ydCB0eXBlIE56Rm9ybUxheW91dFR5cGUgPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHwgJ2lubGluZSc7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0VG9vbHRpcEljb24gPSB7XG4gIHR5cGU6ICdxdWVzdGlvbi1jaXJjbGUnLFxuICB0aGVtZTogJ291dGxpbmUnXG59IGFzIGNvbnN0O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotZm9ybV0nLFxuICBleHBvcnRBczogJ256Rm9ybScsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1mb3JtLWhvcml6b250YWxdJzogYG56TGF5b3V0ID09PSAnaG9yaXpvbnRhbCdgLFxuICAgICdbY2xhc3MuYW50LWZvcm0tdmVydGljYWxdJzogYG56TGF5b3V0ID09PSAndmVydGljYWwnYCxcbiAgICAnW2NsYXNzLmFudC1mb3JtLWlubGluZV0nOiBgbnpMYXlvdXQgPT09ICdpbmxpbmUnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Rm9ybURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBJbnB1dE9ic2VydmFibGUge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9Db2xvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlQXV0b1RpcHM6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekxheW91dDogTnpGb3JtTGF5b3V0VHlwZSA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpOb0NvbG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpBdXRvVGlwczogUmVjb3JkPHN0cmluZywgUmVjb3JkPHN0cmluZywgc3RyaW5nPj4gPSB7fTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZUF1dG9UaXBzID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpUb29sdGlwSWNvbjogc3RyaW5nIHwgeyB0eXBlOiBzdHJpbmc7IHRoZW1lOiBUaGVtZVR5cGUgfSA9IERlZmF1bHRUb29sdGlwSWNvbjtcblxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgaW5wdXRDaGFuZ2VzJCA9IG5ldyBTdWJqZWN0PFNpbXBsZUNoYW5nZXM+KCk7XG5cbiAgZ2V0SW5wdXRPYnNlcnZhYmxlPEsgZXh0ZW5kcyBrZXlvZiB0aGlzPihjaGFuZ2VUeXBlOiBLKTogT2JzZXJ2YWJsZTxTaW1wbGVDaGFuZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dENoYW5nZXMkLnBpcGUoXG4gICAgICBmaWx0ZXIoY2hhbmdlcyA9PiBjaGFuZ2VUeXBlIGluIGNoYW5nZXMpLFxuICAgICAgbWFwKHZhbHVlID0+IHZhbHVlW2NoYW5nZVR5cGUgYXMgc3RyaW5nXSlcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1mb3JtJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dENoYW5nZXMkLm5leHQoY2hhbmdlcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Q2hhbmdlcyQuY29tcGxldGUoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==