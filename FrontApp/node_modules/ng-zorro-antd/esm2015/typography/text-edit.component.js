/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzAutosizeDirective } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzTextEditComponent {
    constructor(host, cdr, i18n) {
        this.host = host;
        this.cdr = cdr;
        this.i18n = i18n;
        this.editing = false;
        this.destroy$ = new Subject();
        this.icon = 'edit';
        this.startEditing = new EventEmitter();
        this.endEditing = new EventEmitter();
        this.nativeElement = this.host.nativeElement;
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onClick() {
        this.beforeText = this.text;
        this.currentText = this.beforeText;
        this.editing = true;
        this.startEditing.emit();
        this.focusAndSetValue();
    }
    confirm() {
        this.editing = false;
        this.endEditing.emit(this.currentText);
    }
    onInput(event) {
        const target = event.target;
        this.currentText = target.value;
    }
    onEnter(event) {
        event.stopPropagation();
        event.preventDefault();
        this.confirm();
    }
    onCancel() {
        this.currentText = this.beforeText;
        this.confirm();
    }
    focusAndSetValue() {
        setTimeout(() => {
            var _a;
            if ((_a = this.textarea) === null || _a === void 0 ? void 0 : _a.nativeElement) {
                this.textarea.nativeElement.focus();
                this.textarea.nativeElement.value = this.currentText || '';
                this.autosizeDirective.resizeToFitContent();
            }
        });
    }
}
NzTextEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-text-edit',
                exportAs: 'nzTextEdit',
                template: `
    <button
      *ngIf="!editing"
      nz-tooltip
      nz-trans-button
      class="ant-typography-edit"
      [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="icon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
    <ng-container *ngIf="editing">
      <textarea
        #textarea
        nz-input
        nzAutosize
        (input)="onInput($event)"
        (blur)="confirm()"
        (keydown.esc)="onCancel()"
        (keydown.enter)="onEnter($event)"
      ></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <i nz-icon nzType="enter"></i>
      </button>
    </ng-container>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] }
];
NzTextEditComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NzI18nService }
];
NzTextEditComponent.propDecorators = {
    text: [{ type: Input }],
    icon: [{ type: Input }],
    tooltip: [{ type: Input }],
    startEditing: [{ type: Output }],
    endEditing: [{ type: Output }],
    textarea: [{ type: ViewChild, args: ['textarea', { static: false },] }],
    autosizeDirective: [{ type: ViewChild, args: [NzAutosizeDirective, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHlwb2dyYXBoeS8iLCJzb3VyY2VzIjpbInRleHQtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxhQUFhLEVBQXVCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFMUQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFnQjlCLFlBQW9CLElBQWdCLEVBQVUsR0FBc0IsRUFBVSxJQUFtQjtRQUE3RSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBZmpHLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFUixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUd4QixTQUFJLEdBQWEsTUFBTSxDQUFDO1FBRWQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBTTNELGtCQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNEQsQ0FBQztJQUVyRyxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBWTtRQUNsQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBNkIsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFZO1FBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDZCxVQUFJLElBQUksQ0FBQyxRQUFRLDBDQUFFLGFBQWEsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDN0M7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXRHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7OztZQW5EQyxVQUFVO1lBRlYsaUJBQWlCO1lBYVYsYUFBYTs7O21CQThDbkIsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsTUFBTTt5QkFDTixNQUFNO3VCQUNOLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dDQUN2QyxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VGV4dEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpBdXRvc2l6ZURpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaW5wdXQnO1xuXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRleHQtZWRpdCcsXG4gIGV4cG9ydEFzOiAnbnpUZXh0RWRpdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCIhZWRpdGluZ1wiXG4gICAgICBuei10b29sdGlwXG4gICAgICBuei10cmFucy1idXR0b25cbiAgICAgIGNsYXNzPVwiYW50LXR5cG9ncmFwaHktZWRpdFwiXG4gICAgICBbbnpUb29sdGlwVGl0bGVdPVwidG9vbHRpcCA9PT0gbnVsbCA/IG51bGwgOiB0b29sdGlwIHx8IGxvY2FsZT8uZWRpdFwiXG4gICAgICAoY2xpY2spPVwib25DbGljaygpXCJcbiAgICA+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImljb25cIj48L2k+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2J1dHRvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdGluZ1wiPlxuICAgICAgPHRleHRhcmVhXG4gICAgICAgICN0ZXh0YXJlYVxuICAgICAgICBuei1pbnB1dFxuICAgICAgICBuekF1dG9zaXplXG4gICAgICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAgICAgICAoYmx1cik9XCJjb25maXJtKClcIlxuICAgICAgICAoa2V5ZG93bi5lc2MpPVwib25DYW5jZWwoKVwiXG4gICAgICAgIChrZXlkb3duLmVudGVyKT1cIm9uRW50ZXIoJGV2ZW50KVwiXG4gICAgICA+PC90ZXh0YXJlYT5cbiAgICAgIDxidXR0b24gbnotdHJhbnMtYnV0dG9uIGNsYXNzPVwiYW50LXR5cG9ncmFwaHktZWRpdC1jb250ZW50LWNvbmZpcm1cIiAoY2xpY2spPVwiY29uZmlybSgpXCI+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZW50ZXJcIj48L2k+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56VGV4dEVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGVkaXRpbmcgPSBmYWxzZTtcbiAgbG9jYWxlITogTnpUZXh0STE4bkludGVyZmFjZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgQElucHV0KCkgdGV4dD86IHN0cmluZztcbiAgQElucHV0KCkgaWNvbjogTnpUU1R5cGUgPSAnZWRpdCc7XG4gIEBJbnB1dCgpIHRvb2x0aXA/OiBudWxsIHwgTnpUU1R5cGU7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzdGFydEVkaXRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBlbmRFZGl0aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBWaWV3Q2hpbGQoJ3RleHRhcmVhJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRhcmVhITogRWxlbWVudFJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PjtcbiAgQFZpZXdDaGlsZChOekF1dG9zaXplRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgYXV0b3NpemVEaXJlY3RpdmUhOiBOekF1dG9zaXplRGlyZWN0aXZlO1xuXG4gIGJlZm9yZVRleHQ/OiBzdHJpbmc7XG4gIGN1cnJlbnRUZXh0Pzogc3RyaW5nO1xuICBuYXRpdmVFbGVtZW50ID0gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGkxOG46IE56STE4blNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZURhdGEoJ1RleHQnKTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmJlZm9yZVRleHQgPSB0aGlzLnRleHQ7XG4gICAgdGhpcy5jdXJyZW50VGV4dCA9IHRoaXMuYmVmb3JlVGV4dDtcbiAgICB0aGlzLmVkaXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhcnRFZGl0aW5nLmVtaXQoKTtcbiAgICB0aGlzLmZvY3VzQW5kU2V0VmFsdWUoKTtcbiAgfVxuXG4gIGNvbmZpcm0oKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbmRFZGl0aW5nLmVtaXQodGhpcy5jdXJyZW50VGV4dCk7XG4gIH1cblxuICBvbklucHV0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRoaXMuY3VycmVudFRleHQgPSB0YXJnZXQudmFsdWU7XG4gIH1cblxuICBvbkVudGVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb25maXJtKCk7XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRUZXh0ID0gdGhpcy5iZWZvcmVUZXh0O1xuICAgIHRoaXMuY29uZmlybSgpO1xuICB9XG5cbiAgZm9jdXNBbmRTZXRWYWx1ZSgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRleHRhcmVhPy5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMudGV4dGFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLnRleHRhcmVhLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmN1cnJlbnRUZXh0IHx8ICcnO1xuICAgICAgICB0aGlzLmF1dG9zaXplRGlyZWN0aXZlLnJlc2l6ZVRvRml0Q29udGVudCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=