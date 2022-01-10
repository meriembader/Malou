/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { slideAlertMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'alert';
export class NzAlertComponent {
    constructor(nzConfigService, cdr) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCloseText = null;
        this.nzIconType = null;
        this.nzMessage = null;
        this.nzDescription = null;
        this.nzType = 'info';
        this.nzCloseable = false;
        this.nzShowIcon = false;
        this.nzBanner = false;
        this.nzNoAnimation = false;
        this.nzOnClose = new EventEmitter();
        this.closed = false;
        this.iconTheme = 'fill';
        this.inferredIconType = 'info-circle';
        this.isTypeSet = false;
        this.isShowIconSet = false;
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    closeAlert() {
        this.closed = true;
    }
    onFadeAnimationDone() {
        if (this.closed) {
            this.nzOnClose.emit(true);
        }
    }
    ngOnChanges(changes) {
        const { nzShowIcon, nzDescription, nzType, nzBanner } = changes;
        if (nzShowIcon) {
            this.isShowIconSet = true;
        }
        if (nzType) {
            this.isTypeSet = true;
            switch (this.nzType) {
                case 'error':
                    this.inferredIconType = 'close-circle';
                    break;
                case 'success':
                    this.inferredIconType = 'check-circle';
                    break;
                case 'info':
                    this.inferredIconType = 'info-circle';
                    break;
                case 'warning':
                    this.inferredIconType = 'exclamation-circle';
                    break;
            }
        }
        if (nzDescription) {
            this.iconTheme = this.nzDescription ? 'outline' : 'fill';
        }
        if (nzBanner) {
            if (!this.isTypeSet) {
                this.nzType = 'warning';
            }
            if (!this.isShowIconSet) {
                this.nzShowIcon = true;
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzAlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-alert',
                exportAs: 'nzAlert',
                animations: [slideAlertMotion],
                template: `
    <div
      *ngIf="!closed"
      class="ant-alert"
      [class.ant-alert-success]="nzType === 'success'"
      [class.ant-alert-info]="nzType === 'info'"
      [class.ant-alert-warning]="nzType === 'warning'"
      [class.ant-alert-error]="nzType === 'error'"
      [class.ant-alert-no-icon]="!nzShowIcon"
      [class.ant-alert-banner]="nzBanner"
      [class.ant-alert-closable]="nzCloseable"
      [class.ant-alert-with-description]="!!nzDescription"
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <ng-container *ngIf="nzShowIcon">
        <i nz-icon class="ant-alert-icon" [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></i>
      </ng-container>
      <span class="ant-alert-message" *ngIf="nzMessage">
        <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
      </span>
      <span class="ant-alert-description" *ngIf="nzDescription">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </span>
      <button type="button" tabindex="0" *ngIf="nzCloseable || nzCloseText" class="ant-alert-close-icon" (click)="closeAlert()">
        <ng-template #closeDefaultTemplate>
          <i nz-icon nzType="close"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzCloseText">
            <span class="ant-alert-close-text">{{ nzCloseText }}</span>
          </ng-container>
        </ng-container>
      </button>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] }
];
NzAlertComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef }
];
NzAlertComponent.propDecorators = {
    nzCloseText: [{ type: Input }],
    nzIconType: [{ type: Input }],
    nzMessage: [{ type: Input }],
    nzDescription: [{ type: Input }],
    nzType: [{ type: Input }],
    nzCloseable: [{ type: Input }],
    nzShowIcon: [{ type: Input }],
    nzBanner: [{ type: Input }],
    nzNoAnimation: [{ type: Input }],
    nzOnClose: [{ type: Output }]
};
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzAlertComponent.prototype, "nzCloseable", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzAlertComponent.prototype, "nzShowIcon", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAlertComponent.prototype, "nzBanner", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAlertComponent.prototype, "nzNoAnimation", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9hbGVydC8iLCJzb3VyY2VzIjpbImFsZXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUdOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQWUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxNQUFNLHFCQUFxQixHQUFnQixPQUFPLENBQUM7QUErQ25ELE1BQU0sT0FBTyxnQkFBZ0I7SUF3QjNCLFlBQW1CLGVBQWdDLEVBQVUsR0FBc0I7UUFBaEUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF2QjFFLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBTW5ELGdCQUFXLEdBQXNDLElBQUksQ0FBQztRQUN0RCxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxjQUFTLEdBQXNDLElBQUksQ0FBQztRQUNwRCxrQkFBYSxHQUFzQyxJQUFJLENBQUM7UUFDeEQsV0FBTSxHQUE2QyxNQUFNLENBQUM7UUFDNUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUMxQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGtCQUFhLEdB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TCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7d0JBQ0wsTUFBTTs7QUFKZ0M7SUFBN0IsVUFBVSxFQUFFO0lBQUUsWUFBWSxFQUFFOztxREFBOEI7QUFDN0I7SUFBN0IsVUFBVSxFQUFFO0lBQUUsWUFBWSxFQUFFOztvREFBNkI7QUFDMUM7SUFBZixZQUFZLEVBQUU7O2tEQUFrQjtBQUNqQjtJQUFmLFlBQVksRUFBRTs7dURBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNsaWRlQWxlcnRNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYWxlcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1hbGVydCcsXG4gIGV4cG9ydEFzOiAnbnpBbGVydCcsXG4gIGFuaW1hdGlvbnM6IFtzbGlkZUFsZXJ0TW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFjbG9zZWRcIlxuICAgICAgY2xhc3M9XCJhbnQtYWxlcnRcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1zdWNjZXNzXT1cIm56VHlwZSA9PT0gJ3N1Y2Nlc3MnXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtaW5mb109XCJuelR5cGUgPT09ICdpbmZvJ1wiXG4gICAgICBbY2xhc3MuYW50LWFsZXJ0LXdhcm5pbmddPVwibnpUeXBlID09PSAnd2FybmluZydcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1lcnJvcl09XCJuelR5cGUgPT09ICdlcnJvcidcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC1uby1pY29uXT1cIiFuelNob3dJY29uXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtYmFubmVyXT1cIm56QmFubmVyXCJcbiAgICAgIFtjbGFzcy5hbnQtYWxlcnQtY2xvc2FibGVdPVwibnpDbG9zZWFibGVcIlxuICAgICAgW2NsYXNzLmFudC1hbGVydC13aXRoLWRlc2NyaXB0aW9uXT1cIiEhbnpEZXNjcmlwdGlvblwiXG4gICAgICBbQC5kaXNhYmxlZF09XCJuek5vQW5pbWF0aW9uXCJcbiAgICAgIFtAc2xpZGVBbGVydE1vdGlvbl1cbiAgICAgIChAc2xpZGVBbGVydE1vdGlvbi5kb25lKT1cIm9uRmFkZUFuaW1hdGlvbkRvbmUoKVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U2hvd0ljb25cIj5cbiAgICAgICAgPGkgbnotaWNvbiBjbGFzcz1cImFudC1hbGVydC1pY29uXCIgW256VHlwZV09XCJuekljb25UeXBlIHx8IGluZmVycmVkSWNvblR5cGVcIiBbbnpUaGVtZV09XCJpY29uVGhlbWVcIj48L2k+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWFsZXJ0LW1lc3NhZ2VcIiAqbmdJZj1cIm56TWVzc2FnZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpNZXNzYWdlXCI+e3sgbnpNZXNzYWdlIH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC1hbGVydC1kZXNjcmlwdGlvblwiICpuZ0lmPVwibnpEZXNjcmlwdGlvblwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpEZXNjcmlwdGlvblwiPnt7IG56RGVzY3JpcHRpb24gfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwibnpDbG9zZWFibGUgfHwgbnpDbG9zZVRleHRcIiBjbGFzcz1cImFudC1hbGVydC1jbG9zZS1pY29uXCIgKGNsaWNrKT1cImNsb3NlQWxlcnQoKVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2Nsb3NlRGVmYXVsdFRlbXBsYXRlPlxuICAgICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2xvc2VcIj48L2k+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuekNsb3NlVGV4dDsgZWxzZSBjbG9zZURlZmF1bHRUZW1wbGF0ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekNsb3NlVGV4dFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtYWxlcnQtY2xvc2UtdGV4dFwiPnt7IG56Q2xvc2VUZXh0IH19PC9zcGFuPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTnpBbGVydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NlYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93SWNvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCYW5uZXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9BbmltYXRpb246IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekNsb3NlVGV4dDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpJY29uVHlwZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56TWVzc2FnZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpEZXNjcmlwdGlvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUeXBlOiAnc3VjY2VzcycgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InID0gJ2luZm8nO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekNsb3NlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dJY29uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJhbm5lciA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpOb0FuaW1hdGlvbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBjbG9zZWQgPSBmYWxzZTtcbiAgaWNvblRoZW1lOiAnb3V0bGluZScgfCAnZmlsbCcgPSAnZmlsbCc7XG4gIGluZmVycmVkSWNvblR5cGU6IHN0cmluZyA9ICdpbmZvLWNpcmNsZSc7XG4gIHByaXZhdGUgaXNUeXBlU2V0ID0gZmFsc2U7XG4gIHByaXZhdGUgaXNTaG93SWNvblNldCA9IGZhbHNlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBjbG9zZUFsZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIG9uRmFkZUFuaW1hdGlvbkRvbmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICB0aGlzLm56T25DbG9zZS5lbWl0KHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56U2hvd0ljb24sIG56RGVzY3JpcHRpb24sIG56VHlwZSwgbnpCYW5uZXIgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56U2hvd0ljb24pIHtcbiAgICAgIHRoaXMuaXNTaG93SWNvblNldCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChuelR5cGUpIHtcbiAgICAgIHRoaXMuaXNUeXBlU2V0ID0gdHJ1ZTtcbiAgICAgIHN3aXRjaCAodGhpcy5uelR5cGUpIHtcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIHRoaXMuaW5mZXJyZWRJY29uVHlwZSA9ICdjbG9zZS1jaXJjbGUnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICB0aGlzLmluZmVycmVkSWNvblR5cGUgPSAnY2hlY2stY2lyY2xlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgdGhpcy5pbmZlcnJlZEljb25UeXBlID0gJ2luZm8tY2lyY2xlJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgdGhpcy5pbmZlcnJlZEljb25UeXBlID0gJ2V4Y2xhbWF0aW9uLWNpcmNsZSc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuekRlc2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmljb25UaGVtZSA9IHRoaXMubnpEZXNjcmlwdGlvbiA/ICdvdXRsaW5lJyA6ICdmaWxsJztcbiAgICB9XG4gICAgaWYgKG56QmFubmVyKSB7XG4gICAgICBpZiAoIXRoaXMuaXNUeXBlU2V0KSB7XG4gICAgICAgIHRoaXMubnpUeXBlID0gJ3dhcm5pbmcnO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzU2hvd0ljb25TZXQpIHtcbiAgICAgICAgdGhpcy5uelNob3dJY29uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=