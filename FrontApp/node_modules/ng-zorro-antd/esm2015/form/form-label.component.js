/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Optional, Renderer2, SkipSelf, ViewEncapsulation } from '@angular/core';
import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DefaultTooltipIcon, NzFormDirective } from './form.directive';
function toTooltipIcon(value) {
    const icon = typeof value === 'string' ? { type: value } : value;
    return Object.assign(Object.assign({}, DefaultTooltipIcon), icon);
}
export class NzFormLabelComponent {
    constructor(elementRef, renderer, cdr, nzFormDirective) {
        this.cdr = cdr;
        this.nzFormDirective = nzFormDirective;
        this.nzRequired = false;
        this.noColon = 'default';
        this._tooltipIcon = 'default';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
        if (this.nzFormDirective) {
            this.nzFormDirective
                .getInputObservable('nzNoColon')
                .pipe(filter(() => this.noColon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
            this.nzFormDirective
                .getInputObservable('nzTooltipIcon')
                .pipe(filter(() => this._tooltipIcon === 'default'), takeUntil(this.destroy$))
                .subscribe(() => this.cdr.markForCheck());
        }
    }
    set nzNoColon(value) {
        this.noColon = toBoolean(value);
    }
    get nzNoColon() {
        var _a;
        return this.noColon !== 'default' ? this.noColon : (_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzNoColon;
    }
    set nzTooltipIcon(value) {
        this._tooltipIcon = toTooltipIcon(value);
    }
    // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
    get tooltipIcon() {
        var _a;
        return this._tooltipIcon !== 'default' ? this._tooltipIcon : toTooltipIcon(((_a = this.nzFormDirective) === null || _a === void 0 ? void 0 : _a.nzTooltipIcon) || DefaultTooltipIcon);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzFormLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-form-label',
                exportAs: 'nzFormLabel',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
      <span *ngIf="nzTooltipTitle" class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
        <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
          <i nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme"></i>
        </ng-container>
      </span>
    </label>
  `
            },] }
];
NzFormLabelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NzFormDirective, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
NzFormLabelComponent.propDecorators = {
    nzFor: [{ type: Input }],
    nzRequired: [{ type: Input }],
    nzNoColon: [{ type: Input }],
    nzTooltipTitle: [{ type: Input }],
    nzTooltipIcon: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzFormLabelComponent.prototype, "nzRequired", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2Zvcm0vIiwic291cmNlcyI6WyJmb3JtLWxhYmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU92RSxTQUFTLGFBQWEsQ0FBQyxLQUFpQztJQUN0RCxNQUFNLElBQUksR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakUsdUNBQVksa0JBQWtCLEdBQUssSUFBSSxFQUFHO0FBQzVDLENBQUM7QUFtQkQsTUFBTSxPQUFPLG9CQUFvQjtJQTZCL0IsWUFDRSxVQUFzQixFQUN0QixRQUFtQixFQUNYLEdBQXNCLEVBQ0UsZUFBZ0M7UUFEeEQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDRSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUE1QnpDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFTcEMsWUFBTyxHQUF3QixTQUFTLENBQUM7UUFXekMsaUJBQVksR0FBa0MsU0FBUyxDQUFDO1FBRXhELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBUS9CLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5FLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZTtpQkFDakIsa0JBQWtCLENBQUMsV0FBVyxDQUFDO2lCQUMvQixJQUFJLENBQ0gsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLEVBQ3hDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pCO2lCQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLGVBQWU7aUJBQ2pCLGtCQUFrQixDQUFDLGVBQWUsQ0FBQztpQkFDbkMsSUFBSSxDQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxFQUM3QyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjtpQkFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQWhERCxJQUNJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxJQUFJLFNBQVM7O1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQUMsSUFBSSxDQUFDLGVBQWUsMENBQUUsU0FBUyxDQUFDO0lBQ3JGLENBQUM7SUFLRCxJQUNJLGFBQWEsQ0FBQyxLQUFpQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsOEZBQThGO0lBQzlGLElBQUksV0FBVzs7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBQSxJQUFJLENBQUMsZUFBZSwwQ0FBRSxhQUFhLEtBQUksa0JBQWtCLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBZ0NELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUNGOzs7WUExQ0MsVUFBVTtZQUlWLFNBQVM7WUFOVCxpQkFBaUI7WUFnQlUsZUFBZSx1QkE4RHZDLFFBQVEsWUFBSSxRQUFROzs7b0JBN0J0QixLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzs2QkFVTCxLQUFLOzRCQUNMLEtBQUs7O0FBWm1CO0lBQWYsWUFBWSxFQUFFOzt3REFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2tpcFNlbGYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56VFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCB0b0Jvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERlZmF1bHRUb29sdGlwSWNvbiwgTnpGb3JtRGlyZWN0aXZlIH0gZnJvbSAnLi9mb3JtLmRpcmVjdGl2ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpGb3JtVG9vbHRpcEljb24ge1xuICB0eXBlOiBOelRTVHlwZTtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbn1cblxuZnVuY3Rpb24gdG9Ub29sdGlwSWNvbih2YWx1ZTogc3RyaW5nIHwgTnpGb3JtVG9vbHRpcEljb24pOiBSZXF1aXJlZDxOekZvcm1Ub29sdGlwSWNvbj4ge1xuICBjb25zdCBpY29uID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHsgdHlwZTogdmFsdWUgfSA6IHZhbHVlO1xuICByZXR1cm4geyAuLi5EZWZhdWx0VG9vbHRpcEljb24sIC4uLmljb24gfTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZm9ybS1sYWJlbCcsXG4gIGV4cG9ydEFzOiAnbnpGb3JtTGFiZWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIFthdHRyLmZvcl09XCJuekZvclwiIFtjbGFzcy5hbnQtZm9ybS1pdGVtLW5vLWNvbG9uXT1cIm56Tm9Db2xvblwiIFtjbGFzcy5hbnQtZm9ybS1pdGVtLXJlcXVpcmVkXT1cIm56UmVxdWlyZWRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDxzcGFuICpuZ0lmPVwibnpUb29sdGlwVGl0bGVcIiBjbGFzcz1cImFudC1mb3JtLWl0ZW0tdG9vbHRpcFwiIG56LXRvb2x0aXAgW256VG9vbHRpcFRpdGxlXT1cIm56VG9vbHRpcFRpdGxlXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJ0b29sdGlwSWNvbi50eXBlOyBsZXQgdG9vbHRpcEljb25UeXBlXCI+XG4gICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cInRvb2x0aXBJY29uVHlwZVwiIFtuelRoZW1lXT1cInRvb2x0aXBJY29uLnRoZW1lXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2xhYmVsPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56Rm9ybUxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9Db2xvbjogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56Rm9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpSZXF1aXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgbnpOb0NvbG9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5ub0NvbG9uID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuICBnZXQgbnpOb0NvbG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vQ29sb24gIT09ICdkZWZhdWx0JyA/IHRoaXMubm9Db2xvbiA6IHRoaXMubnpGb3JtRGlyZWN0aXZlPy5uek5vQ29sb247XG4gIH1cblxuICBwcml2YXRlIG5vQ29sb246IGJvb2xlYW4gfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgQElucHV0KCkgbnpUb29sdGlwVGl0bGU/OiBOelRTVHlwZTtcbiAgQElucHV0KClcbiAgc2V0IG56VG9vbHRpcEljb24odmFsdWU6IHN0cmluZyB8IE56Rm9ybVRvb2x0aXBJY29uKSB7XG4gICAgdGhpcy5fdG9vbHRpcEljb24gPSB0b1Rvb2x0aXBJY29uKHZhbHVlKTtcbiAgfVxuICAvLyBkdWUgdG8gJ2dldCcgYW5kICdzZXQnIGFjY2Vzc29yIG11c3QgaGF2ZSB0aGUgc2FtZSB0eXBlLCBzbyBpdCB3YXMgcmVuYW1lZCB0byBgdG9vbHRpcEljb25gXG4gIGdldCB0b29sdGlwSWNvbigpOiBOekZvcm1Ub29sdGlwSWNvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBJY29uICE9PSAnZGVmYXVsdCcgPyB0aGlzLl90b29sdGlwSWNvbiA6IHRvVG9vbHRpcEljb24odGhpcy5uekZvcm1EaXJlY3RpdmU/Lm56VG9vbHRpcEljb24gfHwgRGVmYXVsdFRvb2x0aXBJY29uKTtcbiAgfVxuICBwcml2YXRlIF90b29sdGlwSWNvbjogTnpGb3JtVG9vbHRpcEljb24gfCAnZGVmYXVsdCcgPSAnZGVmYXVsdCc7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIG56Rm9ybURpcmVjdGl2ZTogTnpGb3JtRGlyZWN0aXZlXG4gICkge1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1mb3JtLWl0ZW0tbGFiZWwnKTtcblxuICAgIGlmICh0aGlzLm56Rm9ybURpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5uekZvcm1EaXJlY3RpdmVcbiAgICAgICAgLmdldElucHV0T2JzZXJ2YWJsZSgnbnpOb0NvbG9uJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMubm9Db2xvbiA9PT0gJ2RlZmF1bHQnKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcblxuICAgICAgdGhpcy5uekZvcm1EaXJlY3RpdmVcbiAgICAgICAgLmdldElucHV0T2JzZXJ2YWJsZSgnbnpUb29sdGlwSWNvbicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLl90b29sdGlwSWNvbiA9PT0gJ2RlZmF1bHQnKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==