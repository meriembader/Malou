/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber, isNotNil } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { handleCircleGradient, handleLinearGradient } from './utils';
let gradientIdSeed = 0;
const NZ_CONFIG_MODULE_NAME = 'progress';
const statusIconNameMap = new Map([
    ['success', 'check'],
    ['exception', 'close']
]);
const statusColorMap = new Map([
    ['normal', '#108ee9'],
    ['exception', '#ff5500'],
    ['success', '#87d068']
]);
const defaultFormatter = (p) => `${p}%`;
const ɵ0 = defaultFormatter;
export class NzProgressComponent {
    constructor(nzConfigService) {
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShowInfo = true;
        this.nzWidth = 132;
        this.nzStrokeColor = undefined;
        this.nzSize = 'default';
        this.nzPercent = 0;
        this.nzStrokeWidth = undefined;
        this.nzGapDegree = undefined;
        this.nzType = 'line';
        this.nzGapPosition = 'top';
        this.nzStrokeLinecap = 'round';
        this.nzSteps = 0;
        this.steps = [];
        /** Gradient style when `nzType` is `line`. */
        this.lineGradient = null;
        /** If user uses gradient color. */
        this.isGradient = false;
        /** If the linear progress is a step progress. */
        this.isSteps = false;
        /**
         * Each progress whose `nzType` is circle or dashboard should have unique id to
         * define `<linearGradient>`.
         */
        this.gradientId = gradientIdSeed++;
        /** Paths to rendered in the template. */
        this.progressCirclePath = [];
        this.trailPathStyle = null;
        this.trackByFn = (index) => `${index}`;
        this.cachedStatus = 'normal';
        this.inferredStatus = 'normal';
        this.destroy$ = new Subject();
    }
    get formatter() {
        return this.nzFormat || defaultFormatter;
    }
    get status() {
        return this.nzStatus || this.inferredStatus;
    }
    get strokeWidth() {
        return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
    }
    get isCircleStyle() {
        return this.nzType === 'circle' || this.nzType === 'dashboard';
    }
    ngOnChanges(changes) {
        const { nzSteps, nzGapPosition, nzStrokeLinecap, nzStrokeColor, nzGapDegree, nzType, nzStatus, nzPercent, nzSuccessPercent, nzStrokeWidth } = changes;
        if (nzStatus) {
            this.cachedStatus = this.nzStatus || this.cachedStatus;
        }
        if (nzPercent || nzSuccessPercent) {
            const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
            if (fillAll) {
                if ((isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent >= 100) || this.nzSuccessPercent === undefined) {
                    this.inferredStatus = 'success';
                }
            }
            else {
                this.inferredStatus = this.cachedStatus;
            }
        }
        if (nzStatus || nzPercent || nzSuccessPercent || nzStrokeColor) {
            this.updateIcon();
        }
        if (nzStrokeColor) {
            this.setStrokeColor();
        }
        if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor || nzStrokeColor) {
            this.getCirclePaths();
        }
        if (nzPercent || nzSteps || nzStrokeWidth) {
            this.isSteps = this.nzSteps > 0;
            if (this.isSteps) {
                this.getSteps();
            }
        }
    }
    ngOnInit() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.updateIcon();
            this.setStrokeColor();
            this.getCirclePaths();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateIcon() {
        const ret = statusIconNameMap.get(this.status);
        this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
    }
    /**
     * Calculate step render configs.
     */
    getSteps() {
        const current = Math.floor(this.nzSteps * (this.nzPercent / 100));
        const stepWidth = this.nzSize === 'small' ? 2 : 14;
        const steps = [];
        for (let i = 0; i < this.nzSteps; i++) {
            let color;
            if (i <= current - 1) {
                color = this.nzStrokeColor;
            }
            const stepStyle = {
                backgroundColor: `${color}`,
                width: `${stepWidth}px`,
                height: `${this.strokeWidth}px`
            };
            steps.push(stepStyle);
        }
        this.steps = steps;
    }
    /**
     * Calculate paths when the type is circle or dashboard.
     */
    getCirclePaths() {
        if (!this.isCircleStyle) {
            return;
        }
        const values = isNotNil(this.nzSuccessPercent) ? [this.nzSuccessPercent, this.nzPercent] : [this.nzPercent];
        // Calculate shared styles.
        const radius = 50 - this.strokeWidth / 2;
        const gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
        const len = Math.PI * 2 * radius;
        const gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);
        let beginPositionX = 0;
        let beginPositionY = -radius;
        let endPositionX = 0;
        let endPositionY = radius * -2;
        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }
        this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
        this.trailPathStyle = {
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };
        // Calculate styles for each path.
        this.progressCirclePath = values
            .map((value, index) => {
            const isSuccessPercent = values.length === 2 && index === 0;
            return {
                stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
                strokePathStyle: {
                    stroke: !this.isGradient ? (isSuccessPercent ? statusColorMap.get('success') : this.nzStrokeColor) : null,
                    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                    strokeDasharray: `${((value || 0) / 100) * (len - gapDegree)}px ${len}px`,
                    strokeDashoffset: `-${gapDegree / 2}px`
                }
            };
        })
            .reverse();
    }
    setStrokeColor() {
        const color = this.nzStrokeColor;
        const isGradient = (this.isGradient = !!color && typeof color !== 'string');
        if (isGradient && !this.isCircleStyle) {
            this.lineGradient = handleLinearGradient(color);
        }
        else if (isGradient && this.isCircleStyle) {
            this.circleGradient = handleCircleGradient(this.nzStrokeColor);
        }
        else {
            this.lineGradient = null;
            this.circleGradient = [];
        }
    }
}
NzProgressComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-progress',
                exportAs: 'nzProgress',
                preserveWhitespaces: false,
                template: `
    <ng-template #progressInfoTemplate>
      <span class="ant-progress-text" *ngIf="nzShowInfo">
        <ng-container *ngIf="(status === 'exception' || status === 'success') && !nzFormat; else formatTemplate">
          <i nz-icon [nzType]="icon"></i>
        </ng-container>
        <ng-template #formatTemplate>
          <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
            {{ formatter(nzPercent) }}
          </ng-container>
        </ng-template>
      </span>
    </ng-template>

    <div
      [ngClass]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType == 'line'"
      [class.ant-progress-small]="nzSize == 'small'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
    >
      <!-- line progress -->
      <div *ngIf="nzType === 'line'">
        <!-- normal line style -->
        <ng-container *ngIf="!isSteps">
          <div class="ant-progress-outer" *ngIf="!isSteps">
            <div class="ant-progress-inner">
              <div
                class="ant-progress-bg"
                [style.width.%]="nzPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.background]="!isGradient ? nzStrokeColor : null"
                [style.background-image]="isGradient ? lineGradient : null"
                [style.height.px]="strokeWidth"
              ></div>
              <div
                *ngIf="nzSuccessPercent || nzSuccessPercent === 0"
                class="ant-progress-success-bg"
                [style.width.%]="nzSuccessPercent"
                [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                [style.height.px]="strokeWidth"
              ></div>
            </div>
          </div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </ng-container>
        <!-- step style -->
        <div class="ant-progress-steps-outer" *ngIf="isSteps">
          <div *ngFor="let step of steps; let i = index" class="ant-progress-steps-item" [ngStyle]="step"></div>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
        </div>
      </div>

      <!-- circle / dashboard progress -->
      <div
        [style.width.px]="this.nzWidth"
        [style.height.px]="this.nzWidth"
        [style.fontSize.px]="this.nzWidth * 0.15 + 6"
        class="ant-progress-inner"
        [class.ant-progress-circle-gradient]="isGradient"
        *ngIf="isCircleStyle"
      >
        <svg class="ant-progress-circle " viewBox="0 0 100 100">
          <defs *ngIf="isGradient">
            <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop *ngFor="let i of circleGradient" [attr.offset]="i.offset" [attr.stop-color]="i.color"></stop>
            </linearGradient>
          </defs>
          <path
            class="ant-progress-circle-trail"
            stroke="#f3f3f3"
            fill-opacity="0"
            [attr.stroke-width]="strokeWidth"
            [attr.d]="pathString"
            [ngStyle]="trailPathStyle"
          ></path>
          <path
            *ngFor="let p of progressCirclePath; trackBy: trackByFn"
            class="ant-progress-circle-path"
            fill-opacity="0"
            [attr.d]="pathString"
            [attr.stroke-linecap]="nzStrokeLinecap"
            [attr.stroke]="p.stroke"
            [attr.stroke-width]="nzPercent ? strokeWidth : 0"
            [ngStyle]="p.strokePathStyle"
          ></path>
        </svg>
        <ng-template [ngTemplateOutlet]="progressInfoTemplate"></ng-template>
      </div>
    </div>
  `
            },] }
];
NzProgressComponent.ctorParameters = () => [
    { type: NzConfigService }
];
NzProgressComponent.propDecorators = {
    nzShowInfo: [{ type: Input }],
    nzWidth: [{ type: Input }],
    nzStrokeColor: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzFormat: [{ type: Input }],
    nzSuccessPercent: [{ type: Input }],
    nzPercent: [{ type: Input }],
    nzStrokeWidth: [{ type: Input }],
    nzGapDegree: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzType: [{ type: Input }],
    nzGapPosition: [{ type: Input }],
    nzStrokeLinecap: [{ type: Input }],
    nzSteps: [{ type: Input }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", Boolean)
], NzProgressComponent.prototype, "nzShowInfo", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzProgressComponent.prototype, "nzStrokeColor", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzProgressComponent.prototype, "nzSize", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzProgressComponent.prototype, "nzSuccessPercent", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzProgressComponent.prototype, "nzPercent", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzProgressComponent.prototype, "nzStrokeWidth", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzProgressComponent.prototype, "nzGapDegree", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzProgressComponent.prototype, "nzGapPosition", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzProgressComponent.prototype, "nzStrokeLinecap", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzProgressComponent.prototype, "nzSteps", void 0);
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9wcm9ncmVzcy8iLCJzb3VyY2VzIjpbInByb2dyZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQStDLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFckUsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLE1BQU0scUJBQXFCLEdBQWdCLFVBQVUsQ0FBQztBQUN0RCxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDO0lBQ2hDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUNwQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDN0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO0lBQ3JCLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztJQUN4QixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7Q0FDdkIsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0IsQ0FBQyxDQUFTLEVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0FBcUc3RSxNQUFNLE9B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RUFBRSxZQUFZO2dCQUN0QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyRlQ7YUFDRjs7O1lBcElxQixlQUFlOzs7eUJBOElsQyxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzs4QkFDTCxLQUFLO3NCQUVMLEtBQUs7O0FBZGlCO0lBQWIsVUFBVSxFQUFFOzt1REFBNEI7QUFFM0I7SUFBYixVQUFVLEVBQUU7OzBEQUF1RDtBQUN0RDtJQUFiLFVBQVUsRUFBRTs7bURBQXlDO0FBRXZDO0lBQWQsV0FBVyxFQUFFOzs2REFBMkI7QUFDMUI7SUFBZCxXQUFXLEVBQUU7O3NEQUF1QjtBQUNSO0lBQTVCLFVBQVUsRUFBRTtJQUFFLFdBQVcsRUFBRTs7MERBQW9DO0FBQ25DO0lBQTVCLFVBQVUsRUFBRTtJQUFFLFdBQVcsRUFBRTs7d0RBQWtDO0FBR2hEO0lBQWIsVUFBVSxFQUFFOzswREFBa0Q7QUFDakQ7SUFBYixVQUFVLEVBQUU7OzREQUF3RDtBQUV0RDtJQUFkLFdBQVcsRUFBRTs7b0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBOZ1N0eWxlSW50ZXJmYWNlLCBOdW1iZXJJbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dE51bWJlciwgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE56UHJvZ3Jlc3NDaXJjbGVQYXRoLFxuICBOelByb2dyZXNzQ29sb3JHcmFkaWVudCxcbiAgTnpQcm9ncmVzc0Zvcm1hdHRlcixcbiAgTnpQcm9ncmVzc0dhcFBvc2l0aW9uVHlwZSxcbiAgTnpQcm9ncmVzc0dyYWRpZW50UHJvZ3Jlc3MsXG4gIE56UHJvZ3Jlc3NTdGF0dXNUeXBlLFxuICBOelByb2dyZXNzU3RlcEl0ZW0sXG4gIE56UHJvZ3Jlc3NTdHJva2VDb2xvclR5cGUsXG4gIE56UHJvZ3Jlc3NTdHJva2VMaW5lY2FwVHlwZSxcbiAgTnpQcm9ncmVzc1R5cGVUeXBlXG59IGZyb20gJy4vdHlwaW5ncyc7XG5pbXBvcnQgeyBoYW5kbGVDaXJjbGVHcmFkaWVudCwgaGFuZGxlTGluZWFyR3JhZGllbnQgfSBmcm9tICcuL3V0aWxzJztcblxubGV0IGdyYWRpZW50SWRTZWVkID0gMDtcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwcm9ncmVzcyc7XG5jb25zdCBzdGF0dXNJY29uTmFtZU1hcCA9IG5ldyBNYXAoW1xuICBbJ3N1Y2Nlc3MnLCAnY2hlY2snXSxcbiAgWydleGNlcHRpb24nLCAnY2xvc2UnXVxuXSk7XG5jb25zdCBzdGF0dXNDb2xvck1hcCA9IG5ldyBNYXAoW1xuICBbJ25vcm1hbCcsICcjMTA4ZWU5J10sXG4gIFsnZXhjZXB0aW9uJywgJyNmZjU1MDAnXSxcbiAgWydzdWNjZXNzJywgJyM4N2QwNjgnXVxuXSk7XG5jb25zdCBkZWZhdWx0Rm9ybWF0dGVyOiBOelByb2dyZXNzRm9ybWF0dGVyID0gKHA6IG51bWJlcik6IHN0cmluZyA9PiBgJHtwfSVgO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotcHJvZ3Jlc3MnLFxuICBleHBvcnRBczogJ256UHJvZ3Jlc3MnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3Byb2dyZXNzSW5mb1RlbXBsYXRlPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtcHJvZ3Jlc3MtdGV4dFwiICpuZ0lmPVwibnpTaG93SW5mb1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKHN0YXR1cyA9PT0gJ2V4Y2VwdGlvbicgfHwgc3RhdHVzID09PSAnc3VjY2VzcycpICYmICFuekZvcm1hdDsgZWxzZSBmb3JtYXRUZW1wbGF0ZVwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNmb3JtYXRUZW1wbGF0ZT5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZm9ybWF0dGVyOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogbnpQZXJjZW50IH07IGxldCBmb3JtYXR0ZXJcIj5cbiAgICAgICAgICAgIHt7IGZvcm1hdHRlcihuelBlcmNlbnQpIH19XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXZcbiAgICAgIFtuZ0NsYXNzXT1cIidhbnQtcHJvZ3Jlc3MgYW50LXByb2dyZXNzLXN0YXR1cy0nICsgc3RhdHVzXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3MtbGluZV09XCJuelR5cGUgPT0gJ2xpbmUnXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3Mtc21hbGxdPVwibnpTaXplID09ICdzbWFsbCdcIlxuICAgICAgW2NsYXNzLmFudC1wcm9ncmVzcy1zaG93LWluZm9dPVwibnpTaG93SW5mb1wiXG4gICAgICBbY2xhc3MuYW50LXByb2dyZXNzLWNpcmNsZV09XCJpc0NpcmNsZVN0eWxlXCJcbiAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3Mtc3RlcHNdPVwiaXNTdGVwc1wiXG4gICAgPlxuICAgICAgPCEtLSBsaW5lIHByb2dyZXNzIC0tPlxuICAgICAgPGRpdiAqbmdJZj1cIm56VHlwZSA9PT0gJ2xpbmUnXCI+XG4gICAgICAgIDwhLS0gbm9ybWFsIGxpbmUgc3R5bGUgLS0+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNTdGVwc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcHJvZ3Jlc3Mtb3V0ZXJcIiAqbmdJZj1cIiFpc1N0ZXBzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXByb2dyZXNzLWlubmVyXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFudC1wcm9ncmVzcy1iZ1wiXG4gICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwibnpQZXJjZW50XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYm9yZGVyLXJhZGl1c109XCJuelN0cm9rZUxpbmVjYXAgPT09ICdyb3VuZCcgPyAnMTAwcHgnIDogJzAnXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCIhaXNHcmFkaWVudCA/IG56U3Ryb2tlQ29sb3IgOiBudWxsXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZC1pbWFnZV09XCJpc0dyYWRpZW50ID8gbGluZUdyYWRpZW50IDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJzdHJva2VXaWR0aFwiXG4gICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICpuZ0lmPVwibnpTdWNjZXNzUGVyY2VudCB8fCBuelN1Y2Nlc3NQZXJjZW50ID09PSAwXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImFudC1wcm9ncmVzcy1zdWNjZXNzLWJnXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGguJV09XCJuelN1Y2Nlc3NQZXJjZW50XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYm9yZGVyLXJhZGl1c109XCJuelN0cm9rZUxpbmVjYXAgPT09ICdyb3VuZCcgPyAnMTAwcHgnIDogJzAnXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInN0cm9rZVdpZHRoXCJcbiAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInByb2dyZXNzSW5mb1RlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwhLS0gc3RlcCBzdHlsZSAtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wcm9ncmVzcy1zdGVwcy1vdXRlclwiICpuZ0lmPVwiaXNTdGVwc1wiPlxuICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cImFudC1wcm9ncmVzcy1zdGVwcy1pdGVtXCIgW25nU3R5bGVdPVwic3RlcFwiPjwvZGl2PlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJwcm9ncmVzc0luZm9UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gY2lyY2xlIC8gZGFzaGJvYXJkIHByb2dyZXNzIC0tPlxuICAgICAgPGRpdlxuICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwidGhpcy5ueldpZHRoXCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJ0aGlzLm56V2lkdGhcIlxuICAgICAgICBbc3R5bGUuZm9udFNpemUucHhdPVwidGhpcy5ueldpZHRoICogMC4xNSArIDZcIlxuICAgICAgICBjbGFzcz1cImFudC1wcm9ncmVzcy1pbm5lclwiXG4gICAgICAgIFtjbGFzcy5hbnQtcHJvZ3Jlc3MtY2lyY2xlLWdyYWRpZW50XT1cImlzR3JhZGllbnRcIlxuICAgICAgICAqbmdJZj1cImlzQ2lyY2xlU3R5bGVcIlxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzPVwiYW50LXByb2dyZXNzLWNpcmNsZSBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj5cbiAgICAgICAgICA8ZGVmcyAqbmdJZj1cImlzR3JhZGllbnRcIj5cbiAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBbaWRdPVwiJ2dyYWRpZW50LScgKyBncmFkaWVudElkXCIgeDE9XCIxMDAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+XG4gICAgICAgICAgICAgIDxzdG9wICpuZ0Zvcj1cImxldCBpIG9mIGNpcmNsZUdyYWRpZW50XCIgW2F0dHIub2Zmc2V0XT1cImkub2Zmc2V0XCIgW2F0dHIuc3RvcC1jb2xvcl09XCJpLmNvbG9yXCI+PC9zdG9wPlxuICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICA8L2RlZnM+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGNsYXNzPVwiYW50LXByb2dyZXNzLWNpcmNsZS10cmFpbFwiXG4gICAgICAgICAgICBzdHJva2U9XCIjZjNmM2YzXCJcbiAgICAgICAgICAgIGZpbGwtb3BhY2l0eT1cIjBcIlxuICAgICAgICAgICAgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCJcbiAgICAgICAgICAgIFthdHRyLmRdPVwicGF0aFN0cmluZ1wiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCJ0cmFpbFBhdGhTdHlsZVwiXG4gICAgICAgICAgPjwvcGF0aD5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHAgb2YgcHJvZ3Jlc3NDaXJjbGVQYXRoOyB0cmFja0J5OiB0cmFja0J5Rm5cIlxuICAgICAgICAgICAgY2xhc3M9XCJhbnQtcHJvZ3Jlc3MtY2lyY2xlLXBhdGhcIlxuICAgICAgICAgICAgZmlsbC1vcGFjaXR5PVwiMFwiXG4gICAgICAgICAgICBbYXR0ci5kXT1cInBhdGhTdHJpbmdcIlxuICAgICAgICAgICAgW2F0dHIuc3Ryb2tlLWxpbmVjYXBdPVwibnpTdHJva2VMaW5lY2FwXCJcbiAgICAgICAgICAgIFthdHRyLnN0cm9rZV09XCJwLnN0cm9rZVwiXG4gICAgICAgICAgICBbYXR0ci5zdHJva2Utd2lkdGhdPVwibnpQZXJjZW50ID8gc3Ryb2tlV2lkdGggOiAwXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInAuc3Ryb2tlUGF0aFN0eWxlXCJcbiAgICAgICAgICA+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInByb2dyZXNzSW5mb1RlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56UHJvZ3Jlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3VjY2Vzc1BlcmNlbnQ6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpQZXJjZW50OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3Ryb2tlV2lkdGg6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpHYXBEZWdyZWU6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTdGVwczogTnVtYmVySW5wdXQ7XG5cbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNob3dJbmZvOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpXaWR0aCA9IDEzMjtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelN0cm9rZUNvbG9yPzogTnpQcm9ncmVzc1N0cm9rZUNvbG9yVHlwZSA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNpemU6ICdkZWZhdWx0JyB8ICdzbWFsbCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56Rm9ybWF0PzogTnpQcm9ncmVzc0Zvcm1hdHRlcjtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpTdWNjZXNzUGVyY2VudD86IG51bWJlcjtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpQZXJjZW50OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dE51bWJlcigpIG56U3Ryb2tlV2lkdGg/OiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0TnVtYmVyKCkgbnpHYXBEZWdyZWU/OiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3RhdHVzPzogTnpQcm9ncmVzc1N0YXR1c1R5cGU7XG4gIEBJbnB1dCgpIG56VHlwZTogTnpQcm9ncmVzc1R5cGVUeXBlID0gJ2xpbmUnO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56R2FwUG9zaXRpb246IE56UHJvZ3Jlc3NHYXBQb3NpdGlvblR5cGUgPSAndG9wJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelN0cm9rZUxpbmVjYXA6IE56UHJvZ3Jlc3NTdHJva2VMaW5lY2FwVHlwZSA9ICdyb3VuZCc7XG5cbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpTdGVwczogbnVtYmVyID0gMDtcblxuICBzdGVwczogTnpQcm9ncmVzc1N0ZXBJdGVtW10gPSBbXTtcblxuICAvKiogR3JhZGllbnQgc3R5bGUgd2hlbiBgbnpUeXBlYCBpcyBgbGluZWAuICovXG4gIGxpbmVHcmFkaWVudDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIElmIHVzZXIgdXNlcyBncmFkaWVudCBjb2xvci4gKi9cbiAgaXNHcmFkaWVudCA9IGZhbHNlO1xuXG4gIC8qKiBJZiB0aGUgbGluZWFyIHByb2dyZXNzIGlzIGEgc3RlcCBwcm9ncmVzcy4gKi9cbiAgaXNTdGVwcyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFYWNoIHByb2dyZXNzIHdob3NlIGBuelR5cGVgIGlzIGNpcmNsZSBvciBkYXNoYm9hcmQgc2hvdWxkIGhhdmUgdW5pcXVlIGlkIHRvXG4gICAqIGRlZmluZSBgPGxpbmVhckdyYWRpZW50PmAuXG4gICAqL1xuICBncmFkaWVudElkID0gZ3JhZGllbnRJZFNlZWQrKztcblxuICAvKiogUGF0aHMgdG8gcmVuZGVyZWQgaW4gdGhlIHRlbXBsYXRlLiAqL1xuICBwcm9ncmVzc0NpcmNsZVBhdGg6IE56UHJvZ3Jlc3NDaXJjbGVQYXRoW10gPSBbXTtcbiAgY2lyY2xlR3JhZGllbnQ/OiBBcnJheTx7IG9mZnNldDogc3RyaW5nOyBjb2xvcjogc3RyaW5nIH0+O1xuICB0cmFpbFBhdGhTdHlsZTogTmdTdHlsZUludGVyZmFjZSB8IG51bGwgPSBudWxsO1xuICBwYXRoU3RyaW5nPzogc3RyaW5nO1xuICBpY29uITogc3RyaW5nO1xuXG4gIHRyYWNrQnlGbiA9IChpbmRleDogbnVtYmVyKSA9PiBgJHtpbmRleH1gO1xuXG4gIGdldCBmb3JtYXR0ZXIoKTogTnpQcm9ncmVzc0Zvcm1hdHRlciB7XG4gICAgcmV0dXJuIHRoaXMubnpGb3JtYXQgfHwgZGVmYXVsdEZvcm1hdHRlcjtcbiAgfVxuXG4gIGdldCBzdGF0dXMoKTogTnpQcm9ncmVzc1N0YXR1c1R5cGUge1xuICAgIHJldHVybiB0aGlzLm56U3RhdHVzIHx8IHRoaXMuaW5mZXJyZWRTdGF0dXM7XG4gIH1cblxuICBnZXQgc3Ryb2tlV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5uelN0cm9rZVdpZHRoIHx8ICh0aGlzLm56VHlwZSA9PT0gJ2xpbmUnICYmIHRoaXMubnpTaXplICE9PSAnc21hbGwnID8gOCA6IDYpO1xuICB9XG5cbiAgZ2V0IGlzQ2lyY2xlU3R5bGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpUeXBlID09PSAnY2lyY2xlJyB8fCB0aGlzLm56VHlwZSA9PT0gJ2Rhc2hib2FyZCc7XG4gIH1cblxuICBwcml2YXRlIGNhY2hlZFN0YXR1czogTnpQcm9ncmVzc1N0YXR1c1R5cGUgPSAnbm9ybWFsJztcbiAgcHJpdmF0ZSBpbmZlcnJlZFN0YXR1czogTnpQcm9ncmVzc1N0YXR1c1R5cGUgPSAnbm9ybWFsJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICBuelN0ZXBzLFxuICAgICAgbnpHYXBQb3NpdGlvbixcbiAgICAgIG56U3Ryb2tlTGluZWNhcCxcbiAgICAgIG56U3Ryb2tlQ29sb3IsXG4gICAgICBuekdhcERlZ3JlZSxcbiAgICAgIG56VHlwZSxcbiAgICAgIG56U3RhdHVzLFxuICAgICAgbnpQZXJjZW50LFxuICAgICAgbnpTdWNjZXNzUGVyY2VudCxcbiAgICAgIG56U3Ryb2tlV2lkdGhcbiAgICB9ID0gY2hhbmdlcztcblxuICAgIGlmIChuelN0YXR1cykge1xuICAgICAgdGhpcy5jYWNoZWRTdGF0dXMgPSB0aGlzLm56U3RhdHVzIHx8IHRoaXMuY2FjaGVkU3RhdHVzO1xuICAgIH1cblxuICAgIGlmIChuelBlcmNlbnQgfHwgbnpTdWNjZXNzUGVyY2VudCkge1xuICAgICAgY29uc3QgZmlsbEFsbCA9IHBhcnNlSW50KHRoaXMubnpQZXJjZW50LnRvU3RyaW5nKCksIDEwKSA+PSAxMDA7XG4gICAgICBpZiAoZmlsbEFsbCkge1xuICAgICAgICBpZiAoKGlzTm90TmlsKHRoaXMubnpTdWNjZXNzUGVyY2VudCkgJiYgdGhpcy5uelN1Y2Nlc3NQZXJjZW50ISA+PSAxMDApIHx8IHRoaXMubnpTdWNjZXNzUGVyY2VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5pbmZlcnJlZFN0YXR1cyA9ICdzdWNjZXNzJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmZlcnJlZFN0YXR1cyA9IHRoaXMuY2FjaGVkU3RhdHVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuelN0YXR1cyB8fCBuelBlcmNlbnQgfHwgbnpTdWNjZXNzUGVyY2VudCB8fCBuelN0cm9rZUNvbG9yKSB7XG4gICAgICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgICB9XG5cbiAgICBpZiAobnpTdHJva2VDb2xvcikge1xuICAgICAgdGhpcy5zZXRTdHJva2VDb2xvcigpO1xuICAgIH1cblxuICAgIGlmIChuekdhcFBvc2l0aW9uIHx8IG56U3Ryb2tlTGluZWNhcCB8fCBuekdhcERlZ3JlZSB8fCBuelR5cGUgfHwgbnpQZXJjZW50IHx8IG56U3Ryb2tlQ29sb3IgfHwgbnpTdHJva2VDb2xvcikge1xuICAgICAgdGhpcy5nZXRDaXJjbGVQYXRocygpO1xuICAgIH1cblxuICAgIGlmIChuelBlcmNlbnQgfHwgbnpTdGVwcyB8fCBuelN0cm9rZVdpZHRoKSB7XG4gICAgICB0aGlzLmlzU3RlcHMgPSB0aGlzLm56U3RlcHMgPiAwO1xuICAgICAgaWYgKHRoaXMuaXNTdGVwcykge1xuICAgICAgICB0aGlzLmdldFN0ZXBzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uekNvbmZpZ1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlQ29sb3IoKTtcbiAgICAgICAgdGhpcy5nZXRDaXJjbGVQYXRocygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUljb24oKTogdm9pZCB7XG4gICAgY29uc3QgcmV0ID0gc3RhdHVzSWNvbk5hbWVNYXAuZ2V0KHRoaXMuc3RhdHVzKTtcbiAgICB0aGlzLmljb24gPSByZXQgPyByZXQgKyAodGhpcy5pc0NpcmNsZVN0eWxlID8gJy1vJyA6ICctY2lyY2xlLWZpbGwnKSA6ICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBzdGVwIHJlbmRlciBjb25maWdzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTdGVwcygpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50ID0gTWF0aC5mbG9vcih0aGlzLm56U3RlcHMgKiAodGhpcy5uelBlcmNlbnQgLyAxMDApKTtcbiAgICBjb25zdCBzdGVwV2lkdGggPSB0aGlzLm56U2l6ZSA9PT0gJ3NtYWxsJyA/IDIgOiAxNDtcblxuICAgIGNvbnN0IHN0ZXBzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnpTdGVwczsgaSsrKSB7XG4gICAgICBsZXQgY29sb3I7XG4gICAgICBpZiAoaSA8PSBjdXJyZW50IC0gMSkge1xuICAgICAgICBjb2xvciA9IHRoaXMubnpTdHJva2VDb2xvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0ZXBTdHlsZSA9IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBgJHtjb2xvcn1gLFxuICAgICAgICB3aWR0aDogYCR7c3RlcFdpZHRofXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHt0aGlzLnN0cm9rZVdpZHRofXB4YFxuICAgICAgfTtcbiAgICAgIHN0ZXBzLnB1c2goc3RlcFN0eWxlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0ZXBzID0gc3RlcHM7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHBhdGhzIHdoZW4gdGhlIHR5cGUgaXMgY2lyY2xlIG9yIGRhc2hib2FyZC5cbiAgICovXG4gIHByaXZhdGUgZ2V0Q2lyY2xlUGF0aHMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQ2lyY2xlU3R5bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZXMgPSBpc05vdE5pbCh0aGlzLm56U3VjY2Vzc1BlcmNlbnQpID8gW3RoaXMubnpTdWNjZXNzUGVyY2VudCEsIHRoaXMubnpQZXJjZW50XSA6IFt0aGlzLm56UGVyY2VudF07XG5cbiAgICAvLyBDYWxjdWxhdGUgc2hhcmVkIHN0eWxlcy5cbiAgICBjb25zdCByYWRpdXMgPSA1MCAtIHRoaXMuc3Ryb2tlV2lkdGggLyAyO1xuICAgIGNvbnN0IGdhcFBvc2l0aW9uID0gdGhpcy5uekdhcFBvc2l0aW9uIHx8ICh0aGlzLm56VHlwZSA9PT0gJ2NpcmNsZScgPyAndG9wJyA6ICdib3R0b20nKTtcbiAgICBjb25zdCBsZW4gPSBNYXRoLlBJICogMiAqIHJhZGl1cztcbiAgICBjb25zdCBnYXBEZWdyZWUgPSB0aGlzLm56R2FwRGVncmVlIHx8ICh0aGlzLm56VHlwZSA9PT0gJ2NpcmNsZScgPyAwIDogNzUpO1xuXG4gICAgbGV0IGJlZ2luUG9zaXRpb25YID0gMDtcbiAgICBsZXQgYmVnaW5Qb3NpdGlvblkgPSAtcmFkaXVzO1xuICAgIGxldCBlbmRQb3NpdGlvblggPSAwO1xuICAgIGxldCBlbmRQb3NpdGlvblkgPSByYWRpdXMgKiAtMjtcblxuICAgIHN3aXRjaCAoZ2FwUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBiZWdpblBvc2l0aW9uWCA9IC1yYWRpdXM7XG4gICAgICAgIGJlZ2luUG9zaXRpb25ZID0gMDtcbiAgICAgICAgZW5kUG9zaXRpb25YID0gcmFkaXVzICogMjtcbiAgICAgICAgZW5kUG9zaXRpb25ZID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIGJlZ2luUG9zaXRpb25YID0gcmFkaXVzO1xuICAgICAgICBiZWdpblBvc2l0aW9uWSA9IDA7XG4gICAgICAgIGVuZFBvc2l0aW9uWCA9IHJhZGl1cyAqIC0yO1xuICAgICAgICBlbmRQb3NpdGlvblkgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIGJlZ2luUG9zaXRpb25ZID0gcmFkaXVzO1xuICAgICAgICBlbmRQb3NpdGlvblkgPSByYWRpdXMgKiAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgdGhpcy5wYXRoU3RyaW5nID0gYE0gNTAsNTAgbSAke2JlZ2luUG9zaXRpb25YfSwke2JlZ2luUG9zaXRpb25ZfVxuICAgICAgIGEgJHtyYWRpdXN9LCR7cmFkaXVzfSAwIDEgMSAke2VuZFBvc2l0aW9uWH0sJHstZW5kUG9zaXRpb25ZfVxuICAgICAgIGEgJHtyYWRpdXN9LCR7cmFkaXVzfSAwIDEgMSAkey1lbmRQb3NpdGlvblh9LCR7ZW5kUG9zaXRpb25ZfWA7XG5cbiAgICB0aGlzLnRyYWlsUGF0aFN0eWxlID0ge1xuICAgICAgc3Ryb2tlRGFzaGFycmF5OiBgJHtsZW4gLSBnYXBEZWdyZWV9cHggJHtsZW59cHhgLFxuICAgICAgc3Ryb2tlRGFzaG9mZnNldDogYC0ke2dhcERlZ3JlZSAvIDJ9cHhgLFxuICAgICAgdHJhbnNpdGlvbjogJ3N0cm9rZS1kYXNob2Zmc2V0IC4zcyBlYXNlIDBzLCBzdHJva2UtZGFzaGFycmF5IC4zcyBlYXNlIDBzLCBzdHJva2UgLjNzJ1xuICAgIH07XG5cbiAgICAvLyBDYWxjdWxhdGUgc3R5bGVzIGZvciBlYWNoIHBhdGguXG4gICAgdGhpcy5wcm9ncmVzc0NpcmNsZVBhdGggPSB2YWx1ZXNcbiAgICAgIC5tYXAoKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpc1N1Y2Nlc3NQZXJjZW50ID0gdmFsdWVzLmxlbmd0aCA9PT0gMiAmJiBpbmRleCA9PT0gMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdHJva2U6IHRoaXMuaXNHcmFkaWVudCAmJiAhaXNTdWNjZXNzUGVyY2VudCA/IGB1cmwoI2dyYWRpZW50LSR7dGhpcy5ncmFkaWVudElkfSlgIDogbnVsbCxcbiAgICAgICAgICBzdHJva2VQYXRoU3R5bGU6IHtcbiAgICAgICAgICAgIHN0cm9rZTogIXRoaXMuaXNHcmFkaWVudCA/IChpc1N1Y2Nlc3NQZXJjZW50ID8gc3RhdHVzQ29sb3JNYXAuZ2V0KCdzdWNjZXNzJykgOiAodGhpcy5uelN0cm9rZUNvbG9yIGFzIHN0cmluZykpIDogbnVsbCxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdzdHJva2UtZGFzaG9mZnNldCAuM3MgZWFzZSAwcywgc3Ryb2tlLWRhc2hhcnJheSAuM3MgZWFzZSAwcywgc3Ryb2tlIC4zcywgc3Ryb2tlLXdpZHRoIC4wNnMgZWFzZSAuM3MnLFxuICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5OiBgJHsoKHZhbHVlIHx8IDApIC8gMTAwKSAqIChsZW4gLSBnYXBEZWdyZWUpfXB4ICR7bGVufXB4YCxcbiAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ6IGAtJHtnYXBEZWdyZWUgLyAyfXB4YFxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAucmV2ZXJzZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdHJva2VDb2xvcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMubnpTdHJva2VDb2xvcjtcbiAgICBjb25zdCBpc0dyYWRpZW50ID0gKHRoaXMuaXNHcmFkaWVudCA9ICEhY29sb3IgJiYgdHlwZW9mIGNvbG9yICE9PSAnc3RyaW5nJyk7XG4gICAgaWYgKGlzR3JhZGllbnQgJiYgIXRoaXMuaXNDaXJjbGVTdHlsZSkge1xuICAgICAgdGhpcy5saW5lR3JhZGllbnQgPSBoYW5kbGVMaW5lYXJHcmFkaWVudChjb2xvciBhcyBOelByb2dyZXNzQ29sb3JHcmFkaWVudCk7XG4gICAgfSBlbHNlIGlmIChpc0dyYWRpZW50ICYmIHRoaXMuaXNDaXJjbGVTdHlsZSkge1xuICAgICAgdGhpcy5jaXJjbGVHcmFkaWVudCA9IGhhbmRsZUNpcmNsZUdyYWRpZW50KHRoaXMubnpTdHJva2VDb2xvciBhcyBOelByb2dyZXNzR3JhZGllbnRQcm9ncmVzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGluZUdyYWRpZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuY2lyY2xlR3JhZGllbnQgPSBbXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==