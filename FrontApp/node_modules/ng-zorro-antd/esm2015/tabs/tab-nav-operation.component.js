/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzTabNavOperationComponent {
    constructor(cdr, elementRef) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.items = [];
        this.addable = false;
        this.addIcon = 'plus';
        this.addClicked = new EventEmitter();
        this.selected = new EventEmitter();
        this.closeAnimationWaitTimeoutId = -1;
        this.menuOpened = false;
        this.element = this.elementRef.nativeElement;
    }
    onSelect(item) {
        if (!item.disabled) {
            // ignore nzCanDeactivate
            item.tab.nzClick.emit();
            this.selected.emit(item);
        }
    }
    onContextmenu(item, e) {
        if (!item.disabled) {
            item.tab.nzContextmenu.emit(e);
        }
    }
    showItems() {
        clearTimeout(this.closeAnimationWaitTimeoutId);
        this.menuOpened = true;
        this.cdr.markForCheck();
    }
    menuVisChange(visible) {
        if (!visible) {
            this.closeAnimationWaitTimeoutId = setTimeout(() => {
                this.menuOpened = false;
                this.cdr.markForCheck();
            }, 150);
        }
    }
    getElementWidth() {
        var _a;
        return ((_a = this.element) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
    }
    getElementHeight() {
        var _a;
        return ((_a = this.element) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
    }
    ngOnDestroy() {
        clearTimeout(this.closeAnimationWaitTimeoutId);
    }
}
NzTabNavOperationComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tab-nav-operation',
                exportAs: 'nzTabNavOperation',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <i nz-icon nzType="ellipsis"></i>
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu *ngIf="menuOpened">
        <li
          nz-menu-item
          *ngFor="let item of items"
          class="ant-tabs-dropdown-menu-item"
          [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
          [nzSelected]="item.active"
          [nzDisabled]="item.disabled"
          (click)="onSelect(item)"
          (contextmenu)="onContextmenu(item, $event)"
        >
          <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">{{ item.tab.label }}</ng-container>
        </li>
      </ul>
    </nz-dropdown-menu>
    <button *ngIf="addable" nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
  `,
                host: {
                    class: 'ant-tabs-nav-operations',
                    '[class.ant-tabs-nav-operations-hidden]': 'items.length === 0'
                }
            },] }
];
NzTabNavOperationComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
NzTabNavOperationComponent.propDecorators = {
    items: [{ type: Input }],
    addable: [{ type: Input }],
    addIcon: [{ type: Input }],
    addClicked: [{ type: Output }],
    selected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1vcGVyYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJzLyIsInNvdXJjZXMiOlsidGFiLW5hdi1vcGVyYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBb0R2QixNQUFNLE9BQU8sMEJBQTBCO0lBV3JDLFlBQW1CLEdBQXNCLEVBQVUsVUFBbUM7UUFBbkUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQVY3RSxVQUFLLEdBQTRCLEVBQUUsQ0FBQztRQUNwQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBb0MsTUFBTSxDQUFDO1FBRXhDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUN4RSxnQ0FBMkIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSWpCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUEyQjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQix5QkFBeUI7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQTJCLEVBQUUsQ0FBYTtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBQ0QsU0FBUztRQUNQLFlBQVksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksQ0FBQywyQkFBMkIsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDVDtJQUNILENBQUM7SUFFRCxlQUFlOztRQUNiLE9BQU8sT0FBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxXQUFXLEtBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxnQkFBZ0I7O1FBQ2QsT0FBTyxPQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksS0FBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELFdBQVc7UUFDVCxZQUFZLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDakQsQ0FBQzs7O1lBbkdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHlCQUF5QjtvQkFDaEMsd0NBQXdDLEVBQUUsb0JBQW9CO2lCQUMvRDthQUNGOzs7WUE1REMsaUJBQWlCO1lBRWpCLFVBQVU7OztvQkE0RFQsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7eUJBRUwsTUFBTTt1QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmltcG9ydCB7IE56VGFiTmF2SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLW5hdi1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRhYi1uYXYtb3BlcmF0aW9uJyxcbiAgZXhwb3J0QXM6ICduelRhYk5hdk9wZXJhdGlvbicsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICBuei1kcm9wZG93blxuICAgICAgY2xhc3M9XCJhbnQtdGFicy1uYXYtbW9yZVwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgIG56T3ZlcmxheUNsYXNzTmFtZT1cIm56LXRhYnMtZHJvcGRvd25cIlxuICAgICAgI2Ryb3Bkb3duVHJpZ2dlcj1cIm56RHJvcGRvd25cIlxuICAgICAgW256RHJvcGRvd25NZW51XT1cIm1lbnVcIlxuICAgICAgW256T3ZlcmxheVN0eWxlXT1cInsgbWluV2lkdGg6ICc0NnB4JyB9XCJcbiAgICAgIFtuek1hdGNoV2lkdGhFbGVtZW50XT1cIm51bGxcIlxuICAgICAgKG56VmlzaWJsZUNoYW5nZSk9XCJtZW51VmlzQ2hhbmdlKCRldmVudClcIlxuICAgICAgKG1vdXNlZW50ZXIpPVwic2hvd0l0ZW1zKClcIlxuICAgID5cbiAgICAgIDxpIG56LWljb24gbnpUeXBlPVwiZWxsaXBzaXNcIj48L2k+XG4gICAgPC9idXR0b24+XG4gICAgPG56LWRyb3Bkb3duLW1lbnUgI21lbnU9XCJuekRyb3Bkb3duTWVudVwiPlxuICAgICAgPHVsIG56LW1lbnUgKm5nSWY9XCJtZW51T3BlbmVkXCI+XG4gICAgICAgIDxsaVxuICAgICAgICAgIG56LW1lbnUtaXRlbVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCJcbiAgICAgICAgICBjbGFzcz1cImFudC10YWJzLWRyb3Bkb3duLW1lbnUtaXRlbVwiXG4gICAgICAgICAgW2NsYXNzLmFudC10YWJzLWRyb3Bkb3duLW1lbnUtaXRlbS1kaXNhYmxlZF09XCJpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICBbbnpTZWxlY3RlZF09XCJpdGVtLmFjdGl2ZVwiXG4gICAgICAgICAgW256RGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2VsZWN0KGl0ZW0pXCJcbiAgICAgICAgICAoY29udGV4dG1lbnUpPVwib25Db250ZXh0bWVudShpdGVtLCAkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtLnRhYi5sYWJlbDsgY29udGV4dDogeyB2aXNpYmxlOiBmYWxzZSB9XCI+e3sgaXRlbS50YWIubGFiZWwgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9uei1kcm9wZG93bi1tZW51PlxuICAgIDxidXR0b24gKm5nSWY9XCJhZGRhYmxlXCIgbnotdGFiLWFkZC1idXR0b24gW2FkZEljb25dPVwiYWRkSWNvblwiIChjbGljayk9XCJhZGRDbGlja2VkLmVtaXQoKVwiPjwvYnV0dG9uPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdGFicy1uYXYtb3BlcmF0aW9ucycsXG4gICAgJ1tjbGFzcy5hbnQtdGFicy1uYXYtb3BlcmF0aW9ucy1oaWRkZW5dJzogJ2l0ZW1zLmxlbmd0aCA9PT0gMCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYk5hdk9wZXJhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBOelRhYk5hdkl0ZW1EaXJlY3RpdmVbXSA9IFtdO1xuICBASW5wdXQoKSBhZGRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFkZEljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAncGx1cyc7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFkZENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TnpUYWJOYXZJdGVtRGlyZWN0aXZlPigpO1xuICBjbG9zZUFuaW1hdGlvbldhaXRUaW1lb3V0SWQgPSAtMTtcbiAgbWVudU9wZW5lZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBvblNlbGVjdChpdGVtOiBOelRhYk5hdkl0ZW1EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgIC8vIGlnbm9yZSBuekNhbkRlYWN0aXZhdGVcbiAgICAgIGl0ZW0udGFiLm56Q2xpY2suZW1pdCgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIG9uQ29udGV4dG1lbnUoaXRlbTogTnpUYWJOYXZJdGVtRGlyZWN0aXZlLCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCFpdGVtLmRpc2FibGVkKSB7XG4gICAgICBpdGVtLnRhYi5uekNvbnRleHRtZW51LmVtaXQoZSk7XG4gICAgfVxuICB9XG4gIHNob3dJdGVtcygpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZUFuaW1hdGlvbldhaXRUaW1lb3V0SWQpO1xuICAgIHRoaXMubWVudU9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBtZW51VmlzQ2hhbmdlKHZpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgIHRoaXMuY2xvc2VBbmltYXRpb25XYWl0VGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubWVudU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sIDE1MCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RWxlbWVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudD8ub2Zmc2V0V2lkdGggfHwgMDtcbiAgfVxuXG4gIGdldEVsZW1lbnRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Py5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlQW5pbWF0aW9uV2FpdFRpbWVvdXRJZCk7XG4gIH1cbn1cbiJdfQ==