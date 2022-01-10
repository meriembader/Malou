/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { slideMotion, zoomBigMotion } from 'ng-zorro-antd/core/animation';
export class NzSubmenuNoneInlineChildComponent {
    constructor() {
        this.menuClass = '';
        this.theme = 'light';
        this.templateOutlet = null;
        this.isMenuInsideDropDown = false;
        this.mode = 'vertical';
        this.position = 'right';
        this.nzDisabled = false;
        this.nzOpen = false;
        this.subMenuMouseState = new EventEmitter();
        this.expandState = 'collapsed';
    }
    setMouseState(state) {
        if (!this.nzDisabled) {
            this.subMenuMouseState.next(state);
        }
    }
    calcMotionState() {
        if (this.nzOpen) {
            if (this.mode === 'horizontal') {
                this.expandState = 'bottom';
            }
            else if (this.mode === 'vertical') {
                this.expandState = 'active';
            }
        }
        else {
            this.expandState = 'collapsed';
        }
    }
    ngOnInit() {
        this.calcMotionState();
    }
    ngOnChanges(changes) {
        const { mode, nzOpen } = changes;
        if (mode || nzOpen) {
            this.calcMotionState();
        }
    }
}
NzSubmenuNoneInlineChildComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-submenu-none-inline-child]',
                exportAs: 'nzSubmenuNoneInlineChild',
                encapsulation: ViewEncapsulation.None,
                animations: [zoomBigMotion, slideMotion],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div
      [class.ant-dropdown-menu]="isMenuInsideDropDown"
      [class.ant-menu]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-vertical]="isMenuInsideDropDown"
      [class.ant-menu-vertical]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-sub]="isMenuInsideDropDown"
      [class.ant-menu-sub]="!isMenuInsideDropDown"
      [ngClass]="menuClass"
    >
      <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>
    </div>
  `,
                host: {
                    '[class.ant-menu-submenu]': 'true',
                    '[class.ant-menu-submenu-popup]': 'true',
                    '[class.ant-menu-light]': "theme === 'light'",
                    '[class.ant-menu-dark]': "theme === 'dark'",
                    '[class.ant-menu-submenu-placement-bottom]': "mode === 'horizontal'",
                    '[class.ant-menu-submenu-placement-right]': "mode === 'vertical' && position === 'right'",
                    '[class.ant-menu-submenu-placement-left]': "mode === 'vertical' && position === 'left'",
                    '[@slideMotion]': 'expandState',
                    '[@zoomBigMotion]': 'expandState',
                    '(mouseenter)': 'setMouseState(true)',
                    '(mouseleave)': 'setMouseState(false)'
                }
            },] }
];
NzSubmenuNoneInlineChildComponent.propDecorators = {
    menuClass: [{ type: Input }],
    theme: [{ type: Input }],
    templateOutlet: [{ type: Input }],
    isMenuInsideDropDown: [{ type: Input }],
    mode: [{ type: Input }],
    position: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzOpen: [{ type: Input }],
    subMenuMouseState: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS1ub24taW5saW5lLWNoaWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbWVudS8iLCJzb3VyY2VzIjpbInN1Ym1lbnUtbm9uLWlubGluZS1jaGlsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFxQzFFLE1BQU0sT0FBTyxpQ0FBaUM7SUFqQzlDO1FBa0NXLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsVUFBSyxHQUFvQixPQUFPLENBQUM7UUFDakMsbUJBQWMsR0FBa0MsSUFBSSxDQUFDO1FBQ3JELHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixTQUFJLEdBQW1CLFVBQVUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNMLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFNbkUsZ0JBQVcsR0FBRyxXQUFXLENBQUM7SUFxQjVCLENBQUM7SUExQkMsYUFBYSxDQUFDLEtBQWM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDN0I7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2pDLElBQUksSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7WUFwRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQ0FBZ0M7Z0JBQzFDLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxVQUFVLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDO2dCQUN4QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osMEJBQTBCLEVBQUUsTUFBTTtvQkFDbEMsZ0NBQWdDLEVBQUUsTUFBTTtvQkFDeEMsd0JBQXdCLEVBQUUsbUJBQW1CO29CQUM3Qyx1QkFBdUIsRUFBRSxrQkFBa0I7b0JBQzNDLDJDQUEyQyxFQUFFLHVCQUF1QjtvQkFDcEUsMENBQTBDLEVBQUUsNkNBQTZDO29CQUN6Rix5Q0FBeUMsRUFBRSw0Q0FBNEM7b0JBQ3ZGLGdCQUFnQixFQUFFLGFBQWE7b0JBQy9CLGtCQUFrQixFQUFFLGFBQWE7b0JBQ2pDLGNBQWMsRUFBRSxxQkFBcUI7b0JBQ3JDLGNBQWMsRUFBRSxzQkFBc0I7aUJBQ3ZDO2FBQ0Y7Ozt3QkFFRSxLQUFLO29CQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUNMLEtBQUs7Z0NBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNsaWRlTW90aW9uLCB6b29tQmlnTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUsIE56TWVudVRoZW1lVHlwZSB9IGZyb20gJy4vbWVudS50eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuei1zdWJtZW51LW5vbmUtaW5saW5lLWNoaWxkXScsXG4gIGV4cG9ydEFzOiAnbnpTdWJtZW51Tm9uZUlubGluZUNoaWxkJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW3pvb21CaWdNb3Rpb24sIHNsaWRlTW90aW9uXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51XT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgIFtjbGFzcy5hbnQtbWVudV09XCIhaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXZlcnRpY2FsXT1cImlzTWVudUluc2lkZURyb3BEb3duXCJcbiAgICAgIFtjbGFzcy5hbnQtbWVudS12ZXJ0aWNhbF09XCIhaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Yl09XCJpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICBbY2xhc3MuYW50LW1lbnUtc3ViXT1cIiFpc01lbnVJbnNpZGVEcm9wRG93blwiXG4gICAgICBbbmdDbGFzc109XCJtZW51Q2xhc3NcIlxuICAgID5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZU91dGxldFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnVdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1wb3B1cF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1saWdodF0nOiBcInRoZW1lID09PSAnbGlnaHQnXCIsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1kYXJrXSc6IFwidGhlbWUgPT09ICdkYXJrJ1wiLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3VibWVudS1wbGFjZW1lbnQtYm90dG9tXSc6IFwibW9kZSA9PT0gJ2hvcml6b250YWwnXCIsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1zdWJtZW51LXBsYWNlbWVudC1yaWdodF0nOiBcIm1vZGUgPT09ICd2ZXJ0aWNhbCcgJiYgcG9zaXRpb24gPT09ICdyaWdodCdcIixcbiAgICAnW2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtcGxhY2VtZW50LWxlZnRdJzogXCJtb2RlID09PSAndmVydGljYWwnICYmIHBvc2l0aW9uID09PSAnbGVmdCdcIixcbiAgICAnW0BzbGlkZU1vdGlvbl0nOiAnZXhwYW5kU3RhdGUnLFxuICAgICdbQHpvb21CaWdNb3Rpb25dJzogJ2V4cGFuZFN0YXRlJyxcbiAgICAnKG1vdXNlZW50ZXIpJzogJ3NldE1vdXNlU3RhdGUodHJ1ZSknLFxuICAgICcobW91c2VsZWF2ZSknOiAnc2V0TW91c2VTdGF0ZShmYWxzZSknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTdWJtZW51Tm9uZUlubGluZUNoaWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBtZW51Q2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0aGVtZTogTnpNZW51VGhlbWVUeXBlID0gJ2xpZ2h0JztcbiAgQElucHV0KCkgdGVtcGxhdGVPdXRsZXQ6IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgaXNNZW51SW5zaWRlRHJvcERvd24gPSBmYWxzZTtcbiAgQElucHV0KCkgbW9kZTogTnpNZW51TW9kZVR5cGUgPSAndmVydGljYWwnO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpPcGVuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzdWJNZW51TW91c2VTdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgc2V0TW91c2VTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLnN1Yk1lbnVNb3VzZVN0YXRlLm5leHQoc3RhdGUpO1xuICAgIH1cbiAgfVxuICBleHBhbmRTdGF0ZSA9ICdjb2xsYXBzZWQnO1xuICBjYWxjTW90aW9uU3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpPcGVuKSB7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9ICdib3R0b20nO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9ICdhY3RpdmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cGFuZFN0YXRlID0gJ2NvbGxhcHNlZCc7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsY01vdGlvblN0YXRlKCk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbW9kZSwgbnpPcGVuIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChtb2RlIHx8IG56T3Blbikge1xuICAgICAgdGhpcy5jYWxjTW90aW9uU3RhdGUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==