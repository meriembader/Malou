/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzTransferSearchComponent {
    // endregion
    constructor(cdr) {
        this.cdr = cdr;
        this.disabled = false;
        this.valueChanged = new EventEmitter();
        this.valueClear = new EventEmitter();
    }
    _handle() {
        this.valueChanged.emit(this.value);
    }
    _clear() {
        if (this.disabled) {
            return;
        }
        this.value = '';
        this.valueClear.emit();
    }
    ngOnChanges() {
        this.cdr.detectChanges();
    }
}
NzTransferSearchComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-transfer-search]',
                exportAs: 'nzTransferSearch',
                preserveWhitespaces: false,
                template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="ant-input ant-transfer-list-search"
      [ngClass]="{ 'ant-input-disabled': disabled }"
    />
    <a *ngIf="value && value.length > 0; else def" class="ant-transfer-list-search-action" (click)="_clear()">
      <i nz-icon nzType="close-circle"></i>
    </a>
    <ng-template #def>
      <span class="ant-transfer-list-search-action"><i nz-icon nzType="search"></i></span>
    </ng-template>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzTransferSearchComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzTransferSearchComponent.propDecorators = {
    placeholder: [{ type: Input }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    valueChanged: [{ type: Output }],
    valueClear: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXItc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHJhbnNmZXIvIiwic291cmNlcyI6WyJ0cmFuc2Zlci1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUF5QnZCLE1BQU0sT0FBTyx5QkFBeUI7SUFVcEMsWUFBWTtJQUVaLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUGpDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFaEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzFDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBSVosQ0FBQztJQUU5QyxPQUFPO1FBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQS9CQyxpQkFBaUI7OzswQkFtQ2hCLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUVMLE1BQU07eUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei10cmFuc2Zlci1zZWFyY2hdJyxcbiAgZXhwb3J0QXM6ICduelRyYW5zZmVyU2VhcmNoJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICBbKG5nTW9kZWwpXT1cInZhbHVlXCJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIl9oYW5kbGUoKVwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgIGNsYXNzPVwiYW50LWlucHV0IGFudC10cmFuc2Zlci1saXN0LXNlYXJjaFwiXG4gICAgICBbbmdDbGFzc109XCJ7ICdhbnQtaW5wdXQtZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCJcbiAgICAvPlxuICAgIDxhICpuZ0lmPVwidmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMDsgZWxzZSBkZWZcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LXNlYXJjaC1hY3Rpb25cIiAoY2xpY2spPVwiX2NsZWFyKClcIj5cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiY2xvc2UtY2lyY2xlXCI+PC9pPlxuICAgIDwvYT5cbiAgICA8bmctdGVtcGxhdGUgI2RlZj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3Qtc2VhcmNoLWFjdGlvblwiPjxpIG56LWljb24gbnpUeXBlPVwic2VhcmNoXCI+PC9pPjwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOelRyYW5zZmVyU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLy8gcmVnaW9uOiBmaWVsZHNcblxuICBASW5wdXQoKSBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDbGVhciA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvLyBlbmRyZWdpb25cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgX2hhbmRsZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZC5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgX2NsZWFyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLnZhbHVlQ2xlYXIuZW1pdCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=