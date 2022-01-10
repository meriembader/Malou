/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, TemplateRef, ViewEncapsulation } from '@angular/core';
export class NzStatisticNumberComponent {
    constructor(locale_id) {
        this.locale_id = locale_id;
        this.displayInt = '';
        this.displayDecimal = '';
    }
    ngOnChanges() {
        this.formatNumber();
    }
    formatNumber() {
        const decimalSeparator = typeof this.nzValue === 'number' ? '.' : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
        const value = String(this.nzValue);
        const [int, decimal] = value.split(decimalSeparator);
        this.displayInt = int;
        this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
    }
}
NzStatisticNumberComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                selector: 'nz-statistic-number',
                exportAs: 'nzStatisticNumber',
                template: `
    <span class="ant-statistic-content-value">
      <ng-container *ngIf="nzValueTemplate" [ngTemplateOutlet]="nzValueTemplate" [ngTemplateOutletContext]="{ $implicit: nzValue }">
      </ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `
            },] }
];
NzStatisticNumberComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
NzStatisticNumberComponent.propDecorators = {
    nzValue: [{ type: Input }],
    nzValueTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljLW51bWJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3N0YXRpc3RpYy8iLCJzb3VyY2VzIjpbInN0YXRpc3RpYy1udW1iZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFhLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW9CeEksTUFBTSxPQUFPLDBCQUEwQjtJQU9yQyxZQUF1QyxTQUFpQjtRQUFqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBSHhELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7SUFFdUMsQ0FBQztJQUU1RCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sZ0JBQWdCLEdBQVcsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0SSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkUsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFDRjs7O3lDQVFjLE1BQU0sU0FBQyxTQUFTOzs7c0JBTjVCLEtBQUs7OEJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGdldExvY2FsZU51bWJlclN5bWJvbCwgTnVtYmVyU3ltYm9sIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIExPQ0FMRV9JRCwgT25DaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U3RhdGlzdGljVmFsdWVUeXBlIH0gZnJvbSAnLi90eXBpbmdzJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgc2VsZWN0b3I6ICduei1zdGF0aXN0aWMtbnVtYmVyJyxcbiAgZXhwb3J0QXM6ICduelN0YXRpc3RpY051bWJlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuelZhbHVlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJuelZhbHVlVGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IG56VmFsdWUgfVwiPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56VmFsdWVUZW1wbGF0ZVwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImRpc3BsYXlJbnRcIiBjbGFzcz1cImFudC1zdGF0aXN0aWMtY29udGVudC12YWx1ZS1pbnRcIj57eyBkaXNwbGF5SW50IH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImRpc3BsYXlEZWNpbWFsXCIgY2xhc3M9XCJhbnQtc3RhdGlzdGljLWNvbnRlbnQtdmFsdWUtZGVjaW1hbFwiPnt7IGRpc3BsYXlEZWNpbWFsIH19PC9zcGFuPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U3RhdGlzdGljTnVtYmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpWYWx1ZT86IE56U3RhdGlzdGljVmFsdWVUeXBlO1xuICBASW5wdXQoKSBuelZhbHVlVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpTdGF0aXN0aWNWYWx1ZVR5cGUgfT47XG5cbiAgZGlzcGxheUludCA9ICcnO1xuICBkaXNwbGF5RGVjaW1hbCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTE9DQUxFX0lEKSBwcml2YXRlIGxvY2FsZV9pZDogc3RyaW5nKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybWF0TnVtYmVyKCk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdE51bWJlcigpOiB2b2lkIHtcbiAgICBjb25zdCBkZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmcgPSB0eXBlb2YgdGhpcy5uelZhbHVlID09PSAnbnVtYmVyJyA/ICcuJyA6IGdldExvY2FsZU51bWJlclN5bWJvbCh0aGlzLmxvY2FsZV9pZCwgTnVtYmVyU3ltYm9sLkRlY2ltYWwpO1xuICAgIGNvbnN0IHZhbHVlID0gU3RyaW5nKHRoaXMubnpWYWx1ZSk7XG4gICAgY29uc3QgW2ludCwgZGVjaW1hbF0gPSB2YWx1ZS5zcGxpdChkZWNpbWFsU2VwYXJhdG9yKTtcblxuICAgIHRoaXMuZGlzcGxheUludCA9IGludDtcbiAgICB0aGlzLmRpc3BsYXlEZWNpbWFsID0gZGVjaW1hbCA/IGAke2RlY2ltYWxTZXBhcmF0b3J9JHtkZWNpbWFsfWAgOiAnJztcbiAgfVxufVxuIl19