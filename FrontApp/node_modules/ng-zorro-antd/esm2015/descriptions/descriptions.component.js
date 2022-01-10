/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { gridResponsiveMap, NzBreakpointEnum, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { merge, Subject } from 'rxjs';
import { auditTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NzDescriptionsItemComponent } from './descriptions-item.component';
const NZ_CONFIG_MODULE_NAME = 'descriptions';
const defaultColumnMap = {
    xxl: 3,
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
};
export class NzDescriptionsComponent {
    constructor(nzConfigService, cdr, breakpointService) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBordered = false;
        this.nzLayout = 'horizontal';
        this.nzColumn = defaultColumnMap;
        this.nzSize = 'default';
        this.nzTitle = '';
        this.nzColon = true;
        this.itemMatrix = [];
        this.realColumn = 3;
        this.breakpoint = NzBreakpointEnum.md;
        this.destroy$ = new Subject();
    }
    ngOnChanges(changes) {
        if (changes.nzColumn) {
            this.prepareMatrix();
        }
    }
    ngAfterContentInit() {
        const contentChange$ = this.items.changes.pipe(startWith(this.items), takeUntil(this.destroy$));
        merge(contentChange$, contentChange$.pipe(switchMap(() => merge(...this.items.map(i => i.inputChange$)).pipe(auditTime(16)))), this.breakpointService.subscribe(gridResponsiveMap).pipe(tap(bp => (this.breakpoint = bp))))
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.prepareMatrix();
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Prepare the render matrix according to description items' spans.
     */
    prepareMatrix() {
        if (!this.items) {
            return;
        }
        let currentRow = [];
        let width = 0;
        const column = (this.realColumn = this.getColumn());
        const items = this.items.toArray();
        const length = items.length;
        const matrix = [];
        const flushRow = () => {
            matrix.push(currentRow);
            currentRow = [];
            width = 0;
        };
        for (let i = 0; i < length; i++) {
            const item = items[i];
            const { nzTitle: title, content, nzSpan: span } = item;
            width += span;
            // If the last item make the row's length exceeds `nzColumn`, the last
            // item should take all the space left. This logic is implemented in the template.
            // Warn user about that.
            if (width >= column) {
                if (width > column) {
                    warn(`"nzColumn" is ${column} but we have row length ${width}`);
                }
                currentRow.push({ title, content, span: column - (width - span) });
                flushRow();
            }
            else if (i === length - 1) {
                currentRow.push({ title, content, span: column - (width - span) });
                flushRow();
            }
            else {
                currentRow.push({ title, content, span });
            }
        }
        this.itemMatrix = matrix;
    }
    getColumn() {
        if (typeof this.nzColumn !== 'number') {
            return this.nzColumn[this.breakpoint];
        }
        return this.nzColumn;
    }
}
NzDescriptionsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-descriptions',
                exportAs: 'nzDescriptions',
                preserveWhitespaces: false,
                template: `
    <div *ngIf="nzTitle || nzExtra" class="ant-descriptions-header">
      <div *ngIf="nzTitle" class="ant-descriptions-title">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div *ngIf="nzExtra" class="ant-descriptions-extra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div class="ant-descriptions-view">
      <table>
        <tbody>
          <ng-container *ngIf="nzLayout === 'horizontal'">
            <tr class="ant-descriptions-row" *ngFor="let row of itemMatrix; let i = index">
              <ng-container *ngFor="let item of row; let isLast = last">
                <!-- Horizontal & NOT Bordered -->
                <ng-container *ngIf="!nzBordered">
                  <td class="ant-descriptions-item" [colSpan]="item.span">
                    <span class="ant-descriptions-item-label" [class.ant-descriptions-item-colon]="nzColon">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </span>
                    <span class="ant-descriptions-item-content">
                      <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                    </span>
                  </td>
                </ng-container>
                <!-- Horizontal & Bordered -->
                <ng-container *ngIf="nzBordered">
                  <td class="ant-descriptions-item-label" *nzStringTemplateOutlet="item.title">
                    <ng-container *nzStringTemplateOutlet="item.title">
                      {{ item.title }}
                    </ng-container>
                  </td>
                  <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                    <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                  </td>
                </ng-container>
              </ng-container>
            </tr>
          </ng-container>

          <ng-container *ngIf="nzLayout === 'vertical'">
            <!-- Vertical & NOT Bordered -->
            <ng-container *ngIf="!nzBordered">
              <ng-container *ngFor="let row of itemMatrix; let i = index">
                <tr class="ant-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <span class="ant-descriptions-item-label" [class.ant-descriptions-item-colon]="nzColon">
                        <ng-container *nzStringTemplateOutlet="item.title">
                          {{ item.title }}
                        </ng-container>
                      </span>
                    </td>
                  </ng-container>
                </tr>
                <tr class="ant-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <span class="ant-descriptions-item-content">
                        <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                      </span>
                    </td>
                  </ng-container>
                </tr>
              </ng-container>
            </ng-container>
            <!-- Vertical & Bordered -->
            <ng-container *ngIf="nzBordered">
              <ng-container *ngFor="let row of itemMatrix; let i = index">
                <tr class="ant-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  </ng-container>
                </tr>
                <tr class="ant-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                    </td>
                  </ng-container>
                </tr>
              </ng-container>
            </ng-container>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
                host: {
                    class: 'ant-descriptions',
                    '[class.ant-descriptions-bordered]': 'nzBordered',
                    '[class.ant-descriptions-middle]': 'nzSize === "middle"',
                    '[class.ant-descriptions-small]': 'nzSize === "small"'
                }
            },] }
];
NzDescriptionsComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzBreakpointService }
];
NzDescriptionsComponent.propDecorators = {
    items: [{ type: ContentChildren, args: [NzDescriptionsItemComponent,] }],
    nzBordered: [{ type: Input }],
    nzLayout: [{ type: Input }],
    nzColumn: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzExtra: [{ type: Input }],
    nzColon: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    WithConfig(),
    __metadata("design:type", Boolean)
], NzDescriptionsComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzDescriptionsComponent.prototype, "nzColumn", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzDescriptionsComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDescriptionsComponent.prototype, "nzColon", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZGVzY3JpcHRpb25zLyIsInNvdXJjZXMiOlsiZGVzY3JpcHRpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixLQUFLLEVBR0wsU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV2RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUc1RSxNQUFNLHFCQUFxQixHQUFnQixjQUFjLENBQUM7QUFDMUQsTUFBTSxnQkFBZ0IsR0FBMEM7SUFDOUQsR0FBRyxFQUFFLENBQUM7SUFDTixFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0lBQ0wsRUFBRSxFQUFFLENBQUM7SUFDTCxFQUFFLEVBQUUsQ0FBQztJQUNMLEVBQUUsRUFBRSxDQUFDO0NBQ04sQ0FBQztBQThHRixNQUFNLE9BQU8sdUJBQXVCO0lBcUJsQyxZ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RUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7OztZQWxORixTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4RlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7b0JBQ3pCLG1DQUFtQyxFQUFFLFlBQVk7b0JBQ2pELGlDQUFpQyxFQUFFLHFCQUFxQjtvQkFDeEQsZ0NBQWdDLEVBQUUsb0JBQW9CO2lCQUN2RDthQUNGOzs7WUFoSXFCLGVBQWU7WUFYbkMsaUJBQWlCO1lBYTJCLG1CQUFtQjs7O29CQW9JOUQsZUFBZSxTQUFDLDJCQUEyQjt5QkFFM0MsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSzs7QUFOaUM7SUFBN0IsWUFBWSxFQUFFO0lBQUUsVUFBVSxFQUFFOzsyREFBNkI7QUFFNUM7SUFBYixVQUFVLEVBQUU7O3lEQUE2RTtBQUM1RTtJQUFiLFVBQVUsRUFBRTs7dURBQXdDO0FBR3ZCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7d0RBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IHdhcm4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbG9nZ2VyJztcbmltcG9ydCB7IGdyaWRSZXNwb25zaXZlTWFwLCBOekJyZWFrcG9pbnRFbnVtLCBOekJyZWFrcG9pbnRTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56RGVzY3JpcHRpb25zSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZGVzY3JpcHRpb25zLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE56RGVzY3JpcHRpb25zSXRlbVJlbmRlclByb3BzLCBOekRlc2NyaXB0aW9uc0xheW91dCwgTnpEZXNjcmlwdGlvbnNTaXplIH0gZnJvbSAnLi90eXBpbmdzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdkZXNjcmlwdGlvbnMnO1xuY29uc3QgZGVmYXVsdENvbHVtbk1hcDogeyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBudW1iZXIgfSA9IHtcbiAgeHhsOiAzLFxuICB4bDogMyxcbiAgbGc6IDMsXG4gIG1kOiAzLFxuICBzbTogMixcbiAgeHM6IDFcbn07XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1kZXNjcmlwdGlvbnMnLFxuICBleHBvcnRBczogJ256RGVzY3JpcHRpb25zJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cIm56VGl0bGUgfHwgbnpFeHRyYVwiIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1oZWFkZXJcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJuelRpdGxlXCIgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLXRpdGxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwibnpFeHRyYVwiIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1leHRyYVwiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpFeHRyYVwiPnt7IG56RXh0cmEgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLXZpZXdcIj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuekxheW91dCA9PT0gJ2hvcml6b250YWwnXCI+XG4gICAgICAgICAgICA8dHIgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLXJvd1wiICpuZ0Zvcj1cImxldCByb3cgb2YgaXRlbU1hdHJpeDsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgbGV0IGlzTGFzdCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEhvcml6b250YWwgJiBOT1QgQm9yZGVyZWQgLS0+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuekJvcmRlcmVkXCI+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLWl0ZW1cIiBbY29sU3Bhbl09XCJpdGVtLnNwYW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLWl0ZW0tbGFiZWxcIiBbY2xhc3MuYW50LWRlc2NyaXB0aW9ucy1pdGVtLWNvbG9uXT1cIm56Q29sb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbS50aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS50aXRsZSB9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS5jb250ZW50XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8IS0tIEhvcml6b250YWwgJiBCb3JkZXJlZCAtLT5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpCb3JkZXJlZFwiPlxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1pdGVtLWxhYmVsXCIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtLnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtLnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS50aXRsZSB9fVxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLWl0ZW0tY29udGVudFwiIFtjb2xTcGFuXT1cIml0ZW0uc3BhbiAqIDIgLSAxXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLmNvbnRlbnRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56TGF5b3V0ID09PSAndmVydGljYWwnXCI+XG4gICAgICAgICAgICA8IS0tIFZlcnRpY2FsICYgTk9UIEJvcmRlcmVkIC0tPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFuekJvcmRlcmVkXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHJvdyBvZiBpdGVtTWF0cml4OyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1yb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygcm93OyBsZXQgaXNMYXN0ID0gbGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLWl0ZW1cIiBbY29sU3Bhbl09XCJpdGVtLnNwYW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1kZXNjcmlwdGlvbnMtaXRlbS1sYWJlbFwiIFtjbGFzcy5hbnQtZGVzY3JpcHRpb25zLWl0ZW0tY29sb25dPVwibnpDb2xvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIml0ZW0udGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3sgaXRlbS50aXRsZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiByb3c7IGxldCBpc0xhc3QgPSBsYXN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImFudC1kZXNjcmlwdGlvbnMtaXRlbVwiIFtjb2xTcGFuXT1cIml0ZW0uc3BhblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLmNvbnRlbnRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8IS0tIFZlcnRpY2FsICYgQm9yZGVyZWQgLS0+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpCb3JkZXJlZFwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByb3cgb2YgaXRlbU1hdHJpeDsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzcz1cImFudC1kZXNjcmlwdGlvbnMtcm93XCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIHJvdzsgbGV0IGlzTGFzdCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1pdGVtLWxhYmVsXCIgW2NvbFNwYW5dPVwiaXRlbS5zcGFuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIml0ZW0udGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0udGl0bGUgfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzPVwiYW50LWRlc2NyaXB0aW9ucy1yb3dcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygcm93OyBsZXQgaXNMYXN0ID0gbGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJhbnQtZGVzY3JpcHRpb25zLWl0ZW0tY29udGVudFwiIFtjb2xTcGFuXT1cIml0ZW0uc3BhblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtLmNvbnRlbnRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1kZXNjcmlwdGlvbnMnLFxuICAgICdbY2xhc3MuYW50LWRlc2NyaXB0aW9ucy1ib3JkZXJlZF0nOiAnbnpCb3JkZXJlZCcsXG4gICAgJ1tjbGFzcy5hbnQtZGVzY3JpcHRpb25zLW1pZGRsZV0nOiAnbnpTaXplID09PSBcIm1pZGRsZVwiJyxcbiAgICAnW2NsYXNzLmFudC1kZXNjcmlwdGlvbnMtc21hbGxdJzogJ256U2l6ZSA9PT0gXCJzbWFsbFwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56RGVzY3JpcHRpb25zQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q29sb246IEJvb2xlYW5JbnB1dDtcblxuICBAQ29udGVudENoaWxkcmVuKE56RGVzY3JpcHRpb25zSXRlbUNvbXBvbmVudCkgaXRlbXMhOiBRdWVyeUxpc3Q8TnpEZXNjcmlwdGlvbnNJdGVtQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgQFdpdGhDb25maWcoKSBuekJvcmRlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TGF5b3V0OiBOekRlc2NyaXB0aW9uc0xheW91dCA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekNvbHVtbjogbnVtYmVyIHwgeyBba2V5IGluIE56QnJlYWtwb2ludEVudW1dOiBudW1iZXIgfSA9IGRlZmF1bHRDb2x1bW5NYXA7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOekRlc2NyaXB0aW9uc1NpemUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+ID0gJyc7XG4gIEBJbnB1dCgpIG56RXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpDb2xvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgaXRlbU1hdHJpeDogTnpEZXNjcmlwdGlvbnNJdGVtUmVuZGVyUHJvcHNbXVtdID0gW107XG4gIHJlYWxDb2x1bW4gPSAzO1xuXG4gIHByaXZhdGUgYnJlYWtwb2ludDogTnpCcmVha3BvaW50RW51bSA9IE56QnJlYWtwb2ludEVudW0ubWQ7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGJyZWFrcG9pbnRTZXJ2aWNlOiBOekJyZWFrcG9pbnRTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uekNvbHVtbikge1xuICAgICAgdGhpcy5wcmVwYXJlTWF0cml4KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRlbnRDaGFuZ2UkID0gdGhpcy5pdGVtcy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKHRoaXMuaXRlbXMpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpO1xuXG4gICAgbWVyZ2UoXG4gICAgICBjb250ZW50Q2hhbmdlJCxcbiAgICAgIGNvbnRlbnRDaGFuZ2UkLnBpcGUoc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLnRoaXMuaXRlbXMubWFwKGkgPT4gaS5pbnB1dENoYW5nZSQpKS5waXBlKGF1ZGl0VGltZSgxNikpKSksXG4gICAgICB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLnN1YnNjcmliZShncmlkUmVzcG9uc2l2ZU1hcCkucGlwZSh0YXAoYnAgPT4gKHRoaXMuYnJlYWtwb2ludCA9IGJwKSkpXG4gICAgKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucHJlcGFyZU1hdHJpeCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIHJlbmRlciBtYXRyaXggYWNjb3JkaW5nIHRvIGRlc2NyaXB0aW9uIGl0ZW1zJyBzcGFucy5cbiAgICovXG4gIHByaXZhdGUgcHJlcGFyZU1hdHJpeCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXRlbXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY3VycmVudFJvdzogTnpEZXNjcmlwdGlvbnNJdGVtUmVuZGVyUHJvcHNbXSA9IFtdO1xuICAgIGxldCB3aWR0aCA9IDA7XG5cbiAgICBjb25zdCBjb2x1bW4gPSAodGhpcy5yZWFsQ29sdW1uID0gdGhpcy5nZXRDb2x1bW4oKSk7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zLnRvQXJyYXkoKTtcbiAgICBjb25zdCBsZW5ndGggPSBpdGVtcy5sZW5ndGg7XG4gICAgY29uc3QgbWF0cml4OiBOekRlc2NyaXB0aW9uc0l0ZW1SZW5kZXJQcm9wc1tdW10gPSBbXTtcbiAgICBjb25zdCBmbHVzaFJvdyA9ICgpID0+IHtcbiAgICAgIG1hdHJpeC5wdXNoKGN1cnJlbnRSb3cpO1xuICAgICAgY3VycmVudFJvdyA9IFtdO1xuICAgICAgd2lkdGggPSAwO1xuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV07XG4gICAgICBjb25zdCB7IG56VGl0bGU6IHRpdGxlLCBjb250ZW50LCBuelNwYW46IHNwYW4gfSA9IGl0ZW07XG5cbiAgICAgIHdpZHRoICs9IHNwYW47XG5cbiAgICAgIC8vIElmIHRoZSBsYXN0IGl0ZW0gbWFrZSB0aGUgcm93J3MgbGVuZ3RoIGV4Y2VlZHMgYG56Q29sdW1uYCwgdGhlIGxhc3RcbiAgICAgIC8vIGl0ZW0gc2hvdWxkIHRha2UgYWxsIHRoZSBzcGFjZSBsZWZ0LiBUaGlzIGxvZ2ljIGlzIGltcGxlbWVudGVkIGluIHRoZSB0ZW1wbGF0ZS5cbiAgICAgIC8vIFdhcm4gdXNlciBhYm91dCB0aGF0LlxuICAgICAgaWYgKHdpZHRoID49IGNvbHVtbikge1xuICAgICAgICBpZiAod2lkdGggPiBjb2x1bW4pIHtcbiAgICAgICAgICB3YXJuKGBcIm56Q29sdW1uXCIgaXMgJHtjb2x1bW59IGJ1dCB3ZSBoYXZlIHJvdyBsZW5ndGggJHt3aWR0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50Um93LnB1c2goeyB0aXRsZSwgY29udGVudCwgc3BhbjogY29sdW1uIC0gKHdpZHRoIC0gc3BhbikgfSk7XG4gICAgICAgIGZsdXNoUm93KCk7XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgY3VycmVudFJvdy5wdXNoKHsgdGl0bGUsIGNvbnRlbnQsIHNwYW46IGNvbHVtbiAtICh3aWR0aCAtIHNwYW4pIH0pO1xuICAgICAgICBmbHVzaFJvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudFJvdy5wdXNoKHsgdGl0bGUsIGNvbnRlbnQsIHNwYW4gfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pdGVtTWF0cml4ID0gbWF0cml4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2x1bW4oKTogbnVtYmVyIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpDb2x1bW4gIT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5uekNvbHVtblt0aGlzLmJyZWFrcG9pbnRdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm56Q29sdW1uO1xuICB9XG59XG4iXX0=