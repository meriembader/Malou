/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzTextCopyComponent {
    constructor(host, cdr, clipboard, i18n) {
        this.host = host;
        this.cdr = cdr;
        this.clipboard = clipboard;
        this.i18n = i18n;
        this.copied = false;
        this.copyId = -1;
        this.nativeElement = this.host.nativeElement;
        this.copyTooltip = null;
        this.copedTooltip = null;
        this.copyIcon = 'copy';
        this.copedIcon = 'check';
        this.destroy$ = new Subject();
        this.icons = ['copy', 'check'];
        this.textCopy = new EventEmitter();
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.updateTooltips();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { tooltips, icons } = changes;
        if (tooltips) {
            this.updateTooltips();
        }
        if (icons) {
            this.updateIcons();
        }
    }
    ngOnDestroy() {
        clearTimeout(this.copyId);
        this.destroy$.next();
        this.destroy$.complete();
    }
    onClick() {
        if (this.copied) {
            return;
        }
        this.copied = true;
        this.cdr.detectChanges();
        const text = this.text;
        this.textCopy.emit(text);
        this.clipboard.copy(text);
        this.onCopied();
    }
    onCopied() {
        clearTimeout(this.copyId);
        this.copyId = setTimeout(() => {
            this.copied = false;
            this.cdr.detectChanges();
        }, 3000);
    }
    updateTooltips() {
        var _a, _b, _c, _d;
        if (this.tooltips === null) {
            this.copedTooltip = null;
            this.copyTooltip = null;
        }
        else if (Array.isArray(this.tooltips)) {
            const [copyTooltip, copedTooltip] = this.tooltips;
            this.copyTooltip = copyTooltip || ((_a = this.locale) === null || _a === void 0 ? void 0 : _a.copy);
            this.copedTooltip = copedTooltip || ((_b = this.locale) === null || _b === void 0 ? void 0 : _b.copied);
        }
        else {
            this.copyTooltip = (_c = this.locale) === null || _c === void 0 ? void 0 : _c.copy;
            this.copedTooltip = (_d = this.locale) === null || _d === void 0 ? void 0 : _d.copied;
        }
        this.cdr.markForCheck();
    }
    updateIcons() {
        const [copyIcon, copedIcon] = this.icons;
        this.copyIcon = copyIcon;
        this.copedIcon = copedIcon;
        this.cdr.markForCheck();
    }
}
NzTextCopyComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-text-copy',
                exportAs: 'nzTextCopy',
                template: `
    <button
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] }
];
NzTextCopyComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: Clipboard },
    { type: NzI18nService }
];
NzTextCopyComponent.propDecorators = {
    text: [{ type: Input }],
    tooltips: [{ type: Input }],
    icons: [{ type: Input }],
    textCopy: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb3B5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdHlwb2dyYXBoeS8iLCJzb3VyY2VzIjpbInRleHQtY29weS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxhQUFhLEVBQXVCLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUF1QjNDLE1BQU0sT0FBTyxtQkFBbUI7SUFpQjlCLFlBQW9CLElBQWdCLEVBQVUsR0FBc0IsRUFBVSxTQUFvQixFQUFVLElBQW1CO1FBQTNHLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFlO1FBaEIvSCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXBCLGtCQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEMsZ0JBQVcsR0FBb0IsSUFBSSxDQUFDO1FBQ3BDLGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUNyQyxhQUFRLEdBQWEsTUFBTSxDQUFDO1FBQzVCLGNBQVMsR0FBYSxPQUFPLENBQUM7UUFDdEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFJeEIsVUFBSyxHQUF5QixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUV5RSxDQUFDO0lBRW5JLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDcEMsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ04sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU8sY0FBYzs7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkMsTUFBTSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxXQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQSxDQUFDO1lBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxXQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQSxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxTQUFHLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxTQUFHLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLFdBQVc7UUFDakIsTUFBTSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBeEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztHQWFUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsbUJBQW1CLEVBQUUsS0FBSzthQUMzQjs7O1lBcENDLFVBQVU7WUFGVixpQkFBaUI7WUFIVixTQUFTO1lBaUJULGFBQWE7OzttQkFvQ25CLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDbGlwYm9hcmQgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBOelRleHRJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdGV4dC1jb3B5JyxcbiAgZXhwb3J0QXM6ICduelRleHRDb3B5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICBuei10b29sdGlwXG4gICAgICBuei10cmFucy1idXR0b25cbiAgICAgIFtuelRvb2x0aXBUaXRsZV09XCJjb3BpZWQgPyBjb3BlZFRvb2x0aXAgOiBjb3B5VG9vbHRpcFwiXG4gICAgICBjbGFzcz1cImFudC10eXBvZ3JhcGh5LWNvcHlcIlxuICAgICAgW2NsYXNzLmFudC10eXBvZ3JhcGh5LWNvcHktc3VjY2Vzc109XCJjb3BpZWRcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXG4gICAgPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImNvcGllZCA/IGNvcGVkSWNvbiA6IGNvcHlJY29uOyBsZXQgaWNvblwiPlxuICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiaWNvblwiPjwvaT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvYnV0dG9uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTnpUZXh0Q29weUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBjb3BpZWQgPSBmYWxzZTtcbiAgY29weUlkOiBudW1iZXIgPSAtMTtcbiAgbG9jYWxlITogTnpUZXh0STE4bkludGVyZmFjZTtcbiAgbmF0aXZlRWxlbWVudCA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50O1xuICBjb3B5VG9vbHRpcDogTnpUU1R5cGUgfCBudWxsID0gbnVsbDtcbiAgY29wZWRUb29sdGlwOiBOelRTVHlwZSB8IG51bGwgPSBudWxsO1xuICBjb3B5SWNvbjogTnpUU1R5cGUgPSAnY29weSc7XG4gIGNvcGVkSWNvbjogTnpUU1R5cGUgPSAnY2hlY2snO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBASW5wdXQoKSB0ZXh0ITogc3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwcz86IFtOelRTVHlwZSwgTnpUU1R5cGVdIHwgbnVsbDtcbiAgQElucHV0KCkgaWNvbnM6IFtOelRTVHlwZSwgTnpUU1R5cGVdID0gWydjb3B5JywgJ2NoZWNrJ107XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHRleHRDb3B5ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgY2xpcGJvYXJkOiBDbGlwYm9hcmQsIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGV4dCcpO1xuICAgICAgdGhpcy51cGRhdGVUb29sdGlwcygpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyB0b29sdGlwcywgaWNvbnMgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHRvb2x0aXBzKSB7XG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzKCk7XG4gICAgfVxuICAgIGlmIChpY29ucykge1xuICAgICAgdGhpcy51cGRhdGVJY29ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmNvcHlJZCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb3BpZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb3BpZWQgPSB0cnVlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy50ZXh0O1xuICAgIHRoaXMudGV4dENvcHkuZW1pdCh0ZXh0KTtcbiAgICB0aGlzLmNsaXBib2FyZC5jb3B5KHRleHQpO1xuICAgIHRoaXMub25Db3BpZWQoKTtcbiAgfVxuXG4gIG9uQ29waWVkKCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmNvcHlJZCk7XG4gICAgdGhpcy5jb3B5SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY29waWVkID0gZmFsc2U7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBzID09PSBudWxsKSB7XG4gICAgICB0aGlzLmNvcGVkVG9vbHRpcCA9IG51bGw7XG4gICAgICB0aGlzLmNvcHlUb29sdGlwID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy50b29sdGlwcykpIHtcbiAgICAgIGNvbnN0IFtjb3B5VG9vbHRpcCwgY29wZWRUb29sdGlwXSA9IHRoaXMudG9vbHRpcHM7XG4gICAgICB0aGlzLmNvcHlUb29sdGlwID0gY29weVRvb2x0aXAgfHwgdGhpcy5sb2NhbGU/LmNvcHk7XG4gICAgICB0aGlzLmNvcGVkVG9vbHRpcCA9IGNvcGVkVG9vbHRpcCB8fCB0aGlzLmxvY2FsZT8uY29waWVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvcHlUb29sdGlwID0gdGhpcy5sb2NhbGU/LmNvcHk7XG4gICAgICB0aGlzLmNvcGVkVG9vbHRpcCA9IHRoaXMubG9jYWxlPy5jb3BpZWQ7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJY29ucygpOiB2b2lkIHtcbiAgICBjb25zdCBbY29weUljb24sIGNvcGVkSWNvbl0gPSB0aGlzLmljb25zO1xuICAgIHRoaXMuY29weUljb24gPSBjb3B5SWNvbjtcbiAgICB0aGlzLmNvcGVkSWNvbiA9IGNvcGVkSWNvbjtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19