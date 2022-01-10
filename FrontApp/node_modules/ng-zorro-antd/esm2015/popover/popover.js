/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { isTooltipEmpty, NzTooltipBaseDirective, NzToolTipComponent } from 'ng-zorro-antd/tooltip';
export class NzPopoverDirective extends NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation) {
        super(elementRef, hostView, resolver, renderer, noAnimation);
        this.noAnimation = noAnimation;
        this.trigger = 'hover';
        this.placement = 'top';
        // tslint:disable-next-line:no-output-rename
        this.visibleChange = new EventEmitter();
        this.componentFactory = this.resolver.resolveComponentFactory(NzPopoverComponent);
    }
}
NzPopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-popover]',
                exportAs: 'nzPopover',
                host: {
                    '[class.ant-popover-open]': 'visible'
                }
            },] }
];
NzPopoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzPopoverDirective.propDecorators = {
    title: [{ type: Input, args: ['nzPopoverTitle',] }],
    content: [{ type: Input, args: ['nzPopoverContent',] }],
    directiveTitle: [{ type: Input, args: ['nz-popover',] }],
    trigger: [{ type: Input, args: ['nzPopoverTrigger',] }],
    placement: [{ type: Input, args: ['nzPopoverPlacement',] }],
    origin: [{ type: Input, args: ['nzPopoverOrigin',] }],
    visible: [{ type: Input, args: ['nzPopoverVisible',] }],
    mouseEnterDelay: [{ type: Input, args: ['nzPopoverMouseEnterDelay',] }],
    mouseLeaveDelay: [{ type: Input, args: ['nzPopoverMouseLeaveDelay',] }],
    overlayClassName: [{ type: Input, args: ['nzPopoverOverlayClassName',] }],
    overlayStyle: [{ type: Input, args: ['nzPopoverOverlayStyle',] }],
    visibleChange: [{ type: Output, args: ['nzPopoverVisibleChange',] }]
};
export class NzPopoverComponent extends NzToolTipComponent {
    constructor(cdr, noAnimation) {
        super(cdr, noAnimation);
        this.noAnimation = noAnimation;
        this._prefix = 'ant-popover';
    }
    isEmpty() {
        return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
    }
}
NzPopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-popover',
                exportAs: 'nzPopoverComponent',
                animations: [zoomBigMotion],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-popover"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner" role="tooltip">
            <div>
              <div class="ant-popover-title" *ngIf="nzTitle">
                <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
              </div>
              <div class="ant-popover-inner-content">
                <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
            },] }
];
NzPopoverComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcG9wb3Zlci8iLCJzb3VyY2VzIjpbInBvcG92ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFTckgsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjtJQWtCNUQsWUFDRSxVQUFzQixFQUN0QixRQUEwQixFQUMxQixRQUFrQyxFQUNsQyxRQUFtQixFQUNRLFdBQW9DO1FBRS9ELEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFGbEMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBbkJ0QyxZQUFPLEdBQXNCLE9BQU8sQ0FBQztRQUNuQyxjQUFTLEdBQXVCLEtBQUssQ0FBQztRQVFuRSw0Q0FBNEM7UUFDRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFFdkYscUJBQWdCLEdBQXlDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQVVuSCxDQUFDOzs7WUFqQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLDBCQUEwQixFQUFFLFNBQVM7aUJBQ3RDO2FBQ0Y7OztZQXRCQyxVQUFVO1lBT1YsZ0JBQWdCO1lBVGhCLHdCQUF3QjtZQVF4QixTQUFTO1lBS0Ysc0JBQXNCLHVCQW1DMUIsSUFBSSxZQUFJLFFBQVE7OztvQkF0QmxCLEtBQUssU0FBQyxnQkFBZ0I7c0JBQ3RCLEtBQUssU0FBQyxrQkFBa0I7NkJBQ3hCLEtBQUssU0FBQyxZQUFZO3NCQUNsQixLQUFLLFNBQUMsa0JBQWtCO3dCQUN4QixLQUFLLFNBQUMsb0JBQW9CO3FCQUMxQixLQUFLLFNBQUMsaUJBQWlCO3NCQUN2QixLQUFLLFNBQUMsa0JBQWtCOzhCQUN4QixLQUFLLFNBQUMsMEJBQTBCOzhCQUNoQyxLQUFLLFNBQUMsMEJBQTBCOytCQUNoQyxLQUFLLFNBQUMsMkJBQTJCOzJCQUNqQyxLQUFLLFNBQUMsdUJBQXVCOzRCQUc3QixNQUFNLFNBQUMsd0JBQXdCOztBQTREbEMsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGtCQUFrQjtJQUd4RCxZQUFZLEdBQXNCLEVBQTZCLFdBQW9DO1FBQ2pHLEtBQUssQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFEcUMsZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBRm5HLFlBQU8sR0FBRyxhQUFhLENBQUM7SUFJeEIsQ0FBQztJQUVTLE9BQU87UUFDZixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzNCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ1Q7YUFDRjs7O1lBckdDLGlCQUFpQjtZQWdCVixzQkFBc0IsdUJBeUZRLElBQUksWUFBSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgem9vbUJpZ01vdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTmdTdHlsZUludGVyZmFjZSwgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBpc1Rvb2x0aXBFbXB0eSwgTnpUb29sdGlwQmFzZURpcmVjdGl2ZSwgTnpUb29sVGlwQ29tcG9uZW50LCBOelRvb2x0aXBUcmlnZ2VyIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXBvcG92ZXJdJyxcbiAgZXhwb3J0QXM6ICduelBvcG92ZXInLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcG9wb3Zlci1vcGVuXSc6ICd2aXNpYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UG9wb3ZlckRpcmVjdGl2ZSBleHRlbmRzIE56VG9vbHRpcEJhc2VEaXJlY3RpdmUge1xuICBASW5wdXQoJ256UG9wb3ZlclRpdGxlJykgdGl0bGU/OiBOelRTVHlwZTtcbiAgQElucHV0KCduelBvcG92ZXJDb250ZW50JykgY29udGVudD86IE56VFNUeXBlO1xuICBASW5wdXQoJ256LXBvcG92ZXInKSBkaXJlY3RpdmVUaXRsZT86IE56VFNUeXBlIHwgbnVsbDtcbiAgQElucHV0KCduelBvcG92ZXJUcmlnZ2VyJykgdHJpZ2dlcj86IE56VG9vbHRpcFRyaWdnZXIgPSAnaG92ZXInO1xuICBASW5wdXQoJ256UG9wb3ZlclBsYWNlbWVudCcpIHBsYWNlbWVudD86IHN0cmluZyB8IHN0cmluZ1tdID0gJ3RvcCc7XG4gIEBJbnB1dCgnbnpQb3BvdmVyT3JpZ2luJykgb3JpZ2luPzogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIEBJbnB1dCgnbnpQb3BvdmVyVmlzaWJsZScpIHZpc2libGU/OiBib29sZWFuO1xuICBASW5wdXQoJ256UG9wb3Zlck1vdXNlRW50ZXJEZWxheScpIG1vdXNlRW50ZXJEZWxheT86IG51bWJlcjtcbiAgQElucHV0KCduelBvcG92ZXJNb3VzZUxlYXZlRGVsYXknKSBtb3VzZUxlYXZlRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgnbnpQb3BvdmVyT3ZlcmxheUNsYXNzTmFtZScpIG92ZXJsYXlDbGFzc05hbWU/OiBzdHJpbmc7XG4gIEBJbnB1dCgnbnpQb3BvdmVyT3ZlcmxheVN0eWxlJykgb3ZlcmxheVN0eWxlPzogTmdTdHlsZUludGVyZmFjZTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LXJlbmFtZVxuICBAT3V0cHV0KCduelBvcG92ZXJWaXNpYmxlQ2hhbmdlJykgcmVhZG9ubHkgdmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PE56UG9wb3ZlckNvbXBvbmVudD4gPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE56UG9wb3ZlckNvbXBvbmVudCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBwdWJsaWMgbm9BbmltYXRpb24/OiBOek5vQW5pbWF0aW9uRGlyZWN0aXZlXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIGhvc3RWaWV3LCByZXNvbHZlciwgcmVuZGVyZXIsIG5vQW5pbWF0aW9uKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wb3BvdmVyJyxcbiAgZXhwb3J0QXM6ICduelBvcG92ZXJDb21wb25lbnQnLFxuICBhbmltYXRpb25zOiBbem9vbUJpZ01vdGlvbl0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNvdmVybGF5PVwiY2RrQ29ubmVjdGVkT3ZlcmxheVwiXG4gICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XG4gICAgICBuekNvbm5lY3RlZE92ZXJsYXlcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cIm9yaWdpblwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJfcG9zaXRpb25zXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJfdmlzaWJsZVwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVB1c2hdPVwidHJ1ZVwiXG4gICAgICAob3ZlcmxheU91dHNpZGVDbGljayk9XCJvbkNsaWNrT3V0c2lkZSgkZXZlbnQpXCJcbiAgICAgIChkZXRhY2gpPVwiaGlkZSgpXCJcbiAgICAgIChwb3NpdGlvbkNoYW5nZSk9XCJvblBvc2l0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtcG9wb3ZlclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cIl9jbGFzc01hcFwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm56T3ZlcmxheVN0eWxlXCJcbiAgICAgICAgW0AuZGlzYWJsZWRdPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtAem9vbUJpZ01vdGlvbl09XCInYWN0aXZlJ1wiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci1jb250ZW50XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWFycm93XCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWlubmVyXCIgcm9sZT1cInRvb2x0aXBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcG9wb3Zlci10aXRsZVwiICpuZ0lmPVwibnpUaXRsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1wb3BvdmVyLWlubmVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpDb250ZW50XCI+e3sgbnpDb250ZW50IH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelBvcG92ZXJDb21wb25lbnQgZXh0ZW5kcyBOelRvb2xUaXBDb21wb25lbnQge1xuICBfcHJlZml4ID0gJ2FudC1wb3BvdmVyJztcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmUpIHtcbiAgICBzdXBlcihjZHIsIG5vQW5pbWF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1Rvb2x0aXBFbXB0eSh0aGlzLm56VGl0bGUpICYmIGlzVG9vbHRpcEVtcHR5KHRoaXMubnpDb250ZW50KTtcbiAgfVxufVxuIl19