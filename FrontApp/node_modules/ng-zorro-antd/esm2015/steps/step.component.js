/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
export class NzStepComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.nzDisabled = false;
        this.isCustomStatus = false;
        this._status = 'wait';
        this.oldAPIIcon = true;
        this.direction = 'horizontal';
        this.index = 0;
        this.last = false;
        this.outStatus = 'process';
        this.showProcessDot = false;
        this.clickable = false;
        this.click$ = new Subject();
        this._currentIndex = 0;
    }
    get nzStatus() {
        return this._status;
    }
    set nzStatus(status) {
        this._status = status;
        this.isCustomStatus = true;
    }
    get nzIcon() {
        return this._icon;
    }
    set nzIcon(value) {
        if (!(value instanceof TemplateRef)) {
            this.oldAPIIcon = typeof value === 'string' && value.indexOf('anticon') > -1;
        }
        else {
        }
        this._icon = value;
    }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(current) {
        this._currentIndex = current;
        if (!this.isCustomStatus) {
            this._status = current > this.index ? 'finish' : current === this.index ? this.outStatus || '' : 'wait';
        }
    }
    onClick() {
        if (this.clickable && this.currentIndex !== this.index && !this.nzDisabled) {
            this.click$.next(this.index);
        }
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
    ngOnDestroy() {
        this.click$.complete();
    }
}
NzStepComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-step',
                exportAs: 'nzStep',
                preserveWhitespaces: false,
                template: `
    <div
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
      (click)="onClick()"
    >
      <div class="ant-steps-item-tail" *ngIf="last !== true"></div>
      <div class="ant-steps-item-icon">
        <ng-template [ngIf]="!showProcessDot">
          <span class="ant-steps-icon" *ngIf="nzStatus === 'finish' && !nzIcon"><i nz-icon nzType="check"></i></span>
          <span class="ant-steps-icon" *ngIf="nzStatus === 'error'"><i nz-icon nzType="close"></i></span>
          <span class="ant-steps-icon" *ngIf="(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon">{{ index + 1 }}</span>
          <span class="ant-steps-icon" *ngIf="nzIcon">
            <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
              <i nz-icon [nzType]="!oldAPIIcon && icon" [ngClass]="oldAPIIcon && icon"></i>
            </ng-container>
          </span>
        </ng-template>
        <ng-template [ngIf]="showProcessDot">
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            >
            </ng-template>
          </span>
        </ng-template>
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          <div *ngIf="nzSubtitle" class="ant-steps-item-subtitle">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </div>
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
                host: {
                    class: 'ant-steps-item',
                    '[class.ant-steps-item-wait]': 'nzStatus === "wait"',
                    '[class.ant-steps-item-process]': 'nzStatus === "process"',
                    '[class.ant-steps-item-finish]': 'nzStatus === "finish"',
                    '[class.ant-steps-item-error]': 'nzStatus === "error"',
                    '[class.ant-steps-item-active]': 'currentIndex === index',
                    '[class.ant-steps-item-disabled]': 'nzDisabled',
                    '[class.ant-steps-item-custom]': '!!nzIcon',
                    '[class.ant-steps-next-error]': '(outStatus === "error") && (currentIndex === index + 1)'
                }
            },] }
];
NzStepComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzStepComponent.propDecorators = {
    processDotTemplate: [{ type: ViewChild, args: ['processDotTemplate', { static: false },] }],
    nzTitle: [{ type: Input }],
    nzSubtitle: [{ type: Input }],
    nzDescription: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzIcon: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzStepComponent.prototype, "nzDisabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3N0ZXBzLyIsInNvdXJjZXMiOlsic3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFxRS9CLE1BQU0sT0FBTyxlQUFlO0lBNkQxQixZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQXJEakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVk1QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFlekIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUlsQixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBYXZCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO0lBRW1CLENBQUM7SUFuRDlDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsTUFBYztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBS0QsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFrRDtRQUMzRCxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksV0FBVyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM5RTthQUFNO1NBQ047UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBY0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDekc7SUFDSCxDQUFDO0lBTUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7O1lBOUlGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRFQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLDZCQUE2QixFQUFFLHFCQUFxQjtvQkFDcEQsZ0NBQWdDLEVBQUUsd0JBQXdCO29CQUMxRCwrQkFBK0IsRUFBRSx1QkFBdUI7b0JBQ3hELDhCQUE4QixFQUFFLHNCQUFzQjtvQkFDdEQsK0JBQStCLEVBQUUsd0JBQXdCO29CQUN6RCxpQ0FBaUMsRUFBRSxZQUFZO29CQUMvQywrQkFBK0IsRUFBRSxVQUFVO29CQUMzQyw4QkFBOEIsRUFBRSx5REFBeUQ7aUJBQzFGO2FBQ0Y7OztZQS9FQyxpQkFBaUI7OztpQ0FtRmhCLFNBQVMsU0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7c0JBRWpELEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBRUwsS0FBSztxQkFhTCxLQUFLOztBQWZtQjtJQUFmLFlBQVksRUFBRTs7bURBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ0NsYXNzVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXN0ZXAnLFxuICBleHBvcnRBczogJ256U3RlcCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiYW50LXN0ZXBzLWl0ZW0tY29udGFpbmVyXCJcbiAgICAgIFthdHRyLnJvbGVdPVwiY2xpY2thYmxlICYmICFuekRpc2FibGVkID8gJ2J1dHRvbicgOiBudWxsXCJcbiAgICAgIFt0YWJpbmRleF09XCJjbGlja2FibGUgJiYgIW56RGlzYWJsZWQgPyAwIDogbnVsbFwiXG4gICAgICAoY2xpY2spPVwib25DbGljaygpXCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXN0ZXBzLWl0ZW0tdGFpbFwiICpuZ0lmPVwibGFzdCAhPT0gdHJ1ZVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1zdGVwcy1pdGVtLWljb25cIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFzaG93UHJvY2Vzc0RvdFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIiAqbmdJZj1cIm56U3RhdHVzID09PSAnZmluaXNoJyAmJiAhbnpJY29uXCI+PGkgbnotaWNvbiBuelR5cGU9XCJjaGVja1wiPjwvaT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtc3RlcHMtaWNvblwiICpuZ0lmPVwibnpTdGF0dXMgPT09ICdlcnJvcidcIj48aSBuei1pY29uIG56VHlwZT1cImNsb3NlXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1zdGVwcy1pY29uXCIgKm5nSWY9XCIobnpTdGF0dXMgPT09ICdwcm9jZXNzJyB8fCBuelN0YXR1cyA9PT0gJ3dhaXQnKSAmJiAhbnpJY29uXCI+e3sgaW5kZXggKyAxIH19PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIiAqbmdJZj1cIm56SWNvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56SWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cIiFvbGRBUElJY29uICYmIGljb25cIiBbbmdDbGFzc109XCJvbGRBUElJY29uICYmIGljb25cIj48L2k+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJzaG93UHJvY2Vzc0RvdFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXN0ZXBzLWljb25cIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjcHJvY2Vzc0RvdFRlbXBsYXRlPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1zdGVwcy1pY29uLWRvdFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tUHJvY2Vzc1RlbXBsYXRlIHx8IHByb2Nlc3NEb3RUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgICAgICAgICAgJGltcGxpY2l0OiBwcm9jZXNzRG90VGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiBuelN0YXR1cyxcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXhcbiAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1zdGVwcy1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1zdGVwcy1pdGVtLXRpdGxlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj57eyBuelRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm56U3VidGl0bGVcIiBjbGFzcz1cImFudC1zdGVwcy1pdGVtLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpTdWJ0aXRsZVwiPnt7IG56U3VidGl0bGUgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc3RlcHMtaXRlbS1kZXNjcmlwdGlvblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekRlc2NyaXB0aW9uXCI+e3sgbnpEZXNjcmlwdGlvbiB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtc3RlcHMtaXRlbScsXG4gICAgJ1tjbGFzcy5hbnQtc3RlcHMtaXRlbS13YWl0XSc6ICduelN0YXR1cyA9PT0gXCJ3YWl0XCInLFxuICAgICdbY2xhc3MuYW50LXN0ZXBzLWl0ZW0tcHJvY2Vzc10nOiAnbnpTdGF0dXMgPT09IFwicHJvY2Vzc1wiJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLWZpbmlzaF0nOiAnbnpTdGF0dXMgPT09IFwiZmluaXNoXCInLFxuICAgICdbY2xhc3MuYW50LXN0ZXBzLWl0ZW0tZXJyb3JdJzogJ256U3RhdHVzID09PSBcImVycm9yXCInLFxuICAgICdbY2xhc3MuYW50LXN0ZXBzLWl0ZW0tYWN0aXZlXSc6ICdjdXJyZW50SW5kZXggPT09IGluZGV4JyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLWRpc2FibGVkXSc6ICduekRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1zdGVwcy1pdGVtLWN1c3RvbV0nOiAnISFuekljb24nLFxuICAgICdbY2xhc3MuYW50LXN0ZXBzLW5leHQtZXJyb3JdJzogJyhvdXRTdGF0dXMgPT09IFwiZXJyb3JcIikgJiYgKGN1cnJlbnRJbmRleCA9PT0gaW5kZXggKyAxKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBWaWV3Q2hpbGQoJ3Byb2Nlc3NEb3RUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSBwcm9jZXNzRG90VGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56U3VidGl0bGU/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpEZXNjcmlwdGlvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBuelN0YXR1cygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gIH1cblxuICBzZXQgbnpTdGF0dXMoc3RhdHVzOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGF0dXMgPSBzdGF0dXM7XG4gICAgdGhpcy5pc0N1c3RvbVN0YXR1cyA9IHRydWU7XG4gIH1cblxuICBpc0N1c3RvbVN0YXR1cyA9IGZhbHNlO1xuICBwcml2YXRlIF9zdGF0dXMgPSAnd2FpdCc7XG5cbiAgQElucHV0KClcbiAgZ2V0IG56SWNvbigpOiBOZ0NsYXNzVHlwZSB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuXG4gIHNldCBuekljb24odmFsdWU6IE5nQ2xhc3NUeXBlIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSkge1xuICAgICAgdGhpcy5vbGRBUElJY29uID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmRleE9mKCdhbnRpY29uJykgPiAtMTtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgICB0aGlzLl9pY29uID0gdmFsdWU7XG4gIH1cblxuICBvbGRBUElJY29uID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfaWNvbj86IE5nQ2xhc3NUeXBlIHwgVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgY3VzdG9tUHJvY2Vzc1RlbXBsYXRlPzogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFRlbXBsYXRlUmVmPHZvaWQ+OyBzdGF0dXM6IHN0cmluZzsgaW5kZXg6IG51bWJlciB9PjsgLy8gU2V0IGJ5IHBhcmVudC5cbiAgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICBpbmRleCA9IDA7XG4gIGxhc3QgPSBmYWxzZTtcbiAgb3V0U3RhdHVzID0gJ3Byb2Nlc3MnO1xuICBzaG93UHJvY2Vzc0RvdCA9IGZhbHNlO1xuICBjbGlja2FibGUgPSBmYWxzZTtcbiAgY2xpY2skID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGdldCBjdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xuICB9XG5cbiAgc2V0IGN1cnJlbnRJbmRleChjdXJyZW50OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50O1xuICAgIGlmICghdGhpcy5pc0N1c3RvbVN0YXR1cykge1xuICAgICAgdGhpcy5fc3RhdHVzID0gY3VycmVudCA+IHRoaXMuaW5kZXggPyAnZmluaXNoJyA6IGN1cnJlbnQgPT09IHRoaXMuaW5kZXggPyB0aGlzLm91dFN0YXR1cyB8fCAnJyA6ICd3YWl0JztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsaWNrYWJsZSAmJiB0aGlzLmN1cnJlbnRJbmRleCAhPT0gdGhpcy5pbmRleCAmJiAhdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLmNsaWNrJC5uZXh0KHRoaXMuaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2skLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==