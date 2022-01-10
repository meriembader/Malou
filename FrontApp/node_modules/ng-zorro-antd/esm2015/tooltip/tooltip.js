/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Host, Input, Optional, Output, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { isPresetColor } from 'ng-zorro-antd/core/color';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { isTooltipEmpty, NzTooltipBaseComponent, NzTooltipBaseDirective } from './base';
export class NzTooltipDirective extends NzTooltipBaseDirective {
    constructor(elementRef, hostView, resolver, renderer, noAnimation) {
        super(elementRef, hostView, resolver, renderer, noAnimation);
        this.trigger = 'hover';
        this.placement = 'top';
        // tslint:disable-next-line:no-output-rename
        this.visibleChange = new EventEmitter();
        this.componentFactory = this.resolver.resolveComponentFactory(NzToolTipComponent);
    }
    getProxyPropertyMap() {
        return {
            nzTooltipColor: ['nzColor', () => this.nzTooltipColor]
        };
    }
}
NzTooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-tooltip]',
                exportAs: 'nzTooltip',
                host: {
                    '[class.ant-tooltip-open]': 'visible'
                }
            },] }
];
NzTooltipDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzTooltipDirective.propDecorators = {
    title: [{ type: Input, args: ['nzTooltipTitle',] }],
    directiveTitle: [{ type: Input, args: ['nz-tooltip',] }],
    trigger: [{ type: Input, args: ['nzTooltipTrigger',] }],
    placement: [{ type: Input, args: ['nzTooltipPlacement',] }],
    origin: [{ type: Input, args: ['nzTooltipOrigin',] }],
    visible: [{ type: Input, args: ['nzTooltipVisible',] }],
    mouseEnterDelay: [{ type: Input, args: ['nzTooltipMouseEnterDelay',] }],
    mouseLeaveDelay: [{ type: Input, args: ['nzTooltipMouseLeaveDelay',] }],
    overlayClassName: [{ type: Input, args: ['nzTooltipOverlayClassName',] }],
    overlayStyle: [{ type: Input, args: ['nzTooltipOverlayStyle',] }],
    nzTooltipColor: [{ type: Input }],
    visibleChange: [{ type: Output, args: ['nzTooltipVisibleChange',] }]
};
export class NzToolTipComponent extends NzTooltipBaseComponent {
    constructor(cdr, noAnimation) {
        super(cdr, noAnimation);
        this.noAnimation = noAnimation;
        this.nzTitle = null;
        this._contentStyleMap = {};
    }
    isEmpty() {
        return isTooltipEmpty(this.nzTitle);
    }
    updateStyles() {
        const isColorPreset = this.nzColor && isPresetColor(this.nzColor);
        this._classMap = {
            [this.nzOverlayClassName]: true,
            [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
            [`${this._prefix}-${this.nzColor}`]: isColorPreset
        };
        this._contentStyleMap = {
            backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
        };
    }
}
NzToolTipComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tooltip',
                exportAs: 'nzTooltipComponent',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                animations: [zoomBigMotion],
                template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow">
            <span class="ant-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="ant-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                preserveWhitespaces: false
            },] }
];
NzToolTipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdG9vbHRpcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFHekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBcUMsTUFBTSxRQUFRLENBQUM7QUFTM0gsTUFBTSxPQUFPLGtCQUFtQixTQUFRLHNCQUFzQjtJQWtCNUQsWUFDRSxVQUFzQixFQUN0QixRQUEwQixFQUMxQixRQUFrQyxFQUNsQyxRQUFtQixFQUNDLFdBQW9DO1FBRXhELEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUF0QnBDLFlBQU8sR0FBc0IsT0FBTyxDQUFDO1FBQ25DLGNBQVMsR0FBdUIsS0FBSyxDQUFDO1FBU25FLDRDQUE0QztRQUNELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUV2RixxQkFBZ0IsR0FBeUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBVW5ILENBQUM7SUFFUyxtQkFBbUI7UUFDM0IsT0FBTztZQUNMLGNBQWMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3ZELENBQUM7SUFDSixDQUFDOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsV0FBVztnQkFDckIsSUFBSSxFQUFFO29CQUNKLDBCQUEwQixFQUFFLFNBQVM7aUJBQ3RDO2FBQ0Y7OztZQXZCQyxVQUFVO1lBT1YsZ0JBQWdCO1lBVGhCLHdCQUF3QjtZQVF4QixTQUFTO1lBTUYsc0JBQXNCLHVCQW1DMUIsSUFBSSxZQUFJLFFBQVE7OztvQkF0QmxCLEtBQUssU0FBQyxnQkFBZ0I7NkJBQ3RCLEtBQUssU0FBQyxZQUFZO3NCQUNsQixLQUFLLFNBQUMsa0JBQWtCO3dCQUN4QixLQUFLLFNBQUMsb0JBQW9CO3FCQUMxQixLQUFLLFNBQUMsaUJBQWlCO3NCQUN2QixLQUFLLFNBQUMsa0JBQWtCOzhCQUN4QixLQUFLLFNBQUMsMEJBQTBCOzhCQUNoQyxLQUFLLFNBQUMsMEJBQTBCOytCQUNoQyxLQUFLLFNBQUMsMkJBQTJCOzJCQUNqQyxLQUFLLFNBQUMsdUJBQXVCOzZCQUM3QixLQUFLOzRCQUdMLE1BQU0sU0FBQyx3QkFBd0I7O0FBNkRsQyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsc0JBQXNCO0lBTzVELFlBQVksR0FBc0IsRUFBNkIsV0FBb0M7UUFDakcsS0FBSyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQURxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFObkcsWUFBTyxHQUFvQixJQUFJLENBQUM7UUFJaEMscUJBQWdCLEdBQXFCLEVBQUUsQ0FBQztJQUl4QyxDQUFDO0lBRVMsT0FBTztRQUNmLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxJQUFJO1lBQy9CLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxjQUFjLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsSUFBSTtZQUM5RCxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxhQUFhO1NBQ25ELENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUc7WUFDdEIsZUFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQ3hFLENBQUM7SUFDSixDQUFDOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7OztZQXZHQyxpQkFBaUI7WUFpQlYsc0JBQXNCLHVCQThGUSxJQUFJLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHpvb21CaWdNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IGlzUHJlc2V0Q29sb3IsIE56UHJlc2V0Q29sb3IgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29sb3InO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTmdTdHlsZUludGVyZmFjZSwgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBpc1Rvb2x0aXBFbXB0eSwgTnpUb29sdGlwQmFzZUNvbXBvbmVudCwgTnpUb29sdGlwQmFzZURpcmVjdGl2ZSwgTnpUb29sdGlwVHJpZ2dlciwgUHJvcGVydHlNYXBwaW5nIH0gZnJvbSAnLi9iYXNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW256LXRvb2x0aXBdJyxcbiAgZXhwb3J0QXM6ICduelRvb2x0aXAnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdG9vbHRpcC1vcGVuXSc6ICd2aXNpYmxlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VG9vbHRpcERpcmVjdGl2ZSBleHRlbmRzIE56VG9vbHRpcEJhc2VEaXJlY3RpdmUge1xuICBASW5wdXQoJ256VG9vbHRpcFRpdGxlJykgdGl0bGU/OiBOelRTVHlwZSB8IG51bGw7XG4gIEBJbnB1dCgnbnotdG9vbHRpcCcpIGRpcmVjdGl2ZVRpdGxlPzogTnpUU1R5cGUgfCBudWxsO1xuICBASW5wdXQoJ256VG9vbHRpcFRyaWdnZXInKSB0cmlnZ2VyPzogTnpUb29sdGlwVHJpZ2dlciA9ICdob3Zlcic7XG4gIEBJbnB1dCgnbnpUb29sdGlwUGxhY2VtZW50JykgcGxhY2VtZW50Pzogc3RyaW5nIHwgc3RyaW5nW10gPSAndG9wJztcbiAgQElucHV0KCduelRvb2x0aXBPcmlnaW4nKSBvcmlnaW4/OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQElucHV0KCduelRvb2x0aXBWaXNpYmxlJykgdmlzaWJsZT86IGJvb2xlYW47XG4gIEBJbnB1dCgnbnpUb29sdGlwTW91c2VFbnRlckRlbGF5JykgbW91c2VFbnRlckRlbGF5PzogbnVtYmVyO1xuICBASW5wdXQoJ256VG9vbHRpcE1vdXNlTGVhdmVEZWxheScpIG1vdXNlTGVhdmVEZWxheT86IG51bWJlcjtcbiAgQElucHV0KCduelRvb2x0aXBPdmVybGF5Q2xhc3NOYW1lJykgb3ZlcmxheUNsYXNzTmFtZT86IHN0cmluZztcbiAgQElucHV0KCduelRvb2x0aXBPdmVybGF5U3R5bGUnKSBvdmVybGF5U3R5bGU/OiBOZ1N0eWxlSW50ZXJmYWNlO1xuICBASW5wdXQoKSBuelRvb2x0aXBDb2xvcj86IHN0cmluZztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LXJlbmFtZVxuICBAT3V0cHV0KCduelRvb2x0aXBWaXNpYmxlQ2hhbmdlJykgcmVhZG9ubHkgdmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBjb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PE56VG9vbFRpcENvbXBvbmVudD4gPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE56VG9vbFRpcENvbXBvbmVudCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBob3N0VmlldzogVmlld0NvbnRhaW5lclJlZixcbiAgICByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEhvc3QoKSBAT3B0aW9uYWwoKSBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmVcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgaG9zdFZpZXcsIHJlc29sdmVyLCByZW5kZXJlciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFByb3h5UHJvcGVydHlNYXAoKTogUHJvcGVydHlNYXBwaW5nIHtcbiAgICByZXR1cm4ge1xuICAgICAgbnpUb29sdGlwQ29sb3I6IFsnbnpDb2xvcicsICgpID0+IHRoaXMubnpUb29sdGlwQ29sb3JdXG4gICAgfTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10b29sdGlwJyxcbiAgZXhwb3J0QXM6ICduelRvb2x0aXBDb21wb25lbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW3pvb21CaWdNb3Rpb25dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI292ZXJsYXk9XCJjZGtDb25uZWN0ZWRPdmVybGF5XCJcbiAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcbiAgICAgIG56Q29ubmVjdGVkT3ZlcmxheVxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3JpZ2luXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJfdmlzaWJsZVwiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uc109XCJfcG9zaXRpb25zXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UHVzaF09XCJ0cnVlXCJcbiAgICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cIm9uQ2xpY2tPdXRzaWRlKCRldmVudClcIlxuICAgICAgKGRldGFjaCk9XCJoaWRlKClcIlxuICAgICAgKHBvc2l0aW9uQ2hhbmdlKT1cIm9uUG9zaXRpb25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImFudC10b29sdGlwXCJcbiAgICAgICAgW25nQ2xhc3NdPVwiX2NsYXNzTWFwXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpPdmVybGF5U3R5bGVcIlxuICAgICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtuek5vQW5pbWF0aW9uXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW0B6b29tQmlnTW90aW9uXT1cIidhY3RpdmUnXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10b29sdGlwLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXRvb2x0aXAtYXJyb3dcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXRvb2x0aXAtYXJyb3ctY29udGVudFwiIFtuZ1N0eWxlXT1cIl9jb250ZW50U3R5bGVNYXBcIj48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC10b29sdGlwLWlubmVyXCIgW25nU3R5bGVdPVwiX2NvbnRlbnRTdHlsZU1hcFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGl0bGVcIj57eyBuelRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgTnpUb29sVGlwQ29tcG9uZW50IGV4dGVuZHMgTnpUb29sdGlwQmFzZUNvbXBvbmVudCB7XG4gIG56VGl0bGU6IE56VFNUeXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgbnpDb2xvcj86IHN0cmluZyB8IE56UHJlc2V0Q29sb3I7XG5cbiAgX2NvbnRlbnRTdHlsZU1hcDogTmdTdHlsZUludGVyZmFjZSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZSkge1xuICAgIHN1cGVyKGNkciwgbm9BbmltYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzVG9vbHRpcEVtcHR5KHRoaXMubnpUaXRsZSk7XG4gIH1cblxuICB1cGRhdGVTdHlsZXMoKTogdm9pZCB7XG4gICAgY29uc3QgaXNDb2xvclByZXNldCA9IHRoaXMubnpDb2xvciAmJiBpc1ByZXNldENvbG9yKHRoaXMubnpDb2xvcik7XG5cbiAgICB0aGlzLl9jbGFzc01hcCA9IHtcbiAgICAgIFt0aGlzLm56T3ZlcmxheUNsYXNzTmFtZV06IHRydWUsXG4gICAgICBbYCR7dGhpcy5fcHJlZml4fS1wbGFjZW1lbnQtJHt0aGlzLnByZWZlcnJlZFBsYWNlbWVudH1gXTogdHJ1ZSxcbiAgICAgIFtgJHt0aGlzLl9wcmVmaXh9LSR7dGhpcy5uekNvbG9yfWBdOiBpc0NvbG9yUHJlc2V0XG4gICAgfTtcblxuICAgIHRoaXMuX2NvbnRlbnRTdHlsZU1hcCA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogISF0aGlzLm56Q29sb3IgJiYgIWlzQ29sb3JQcmVzZXQgPyB0aGlzLm56Q29sb3IgOiBudWxsXG4gICAgfTtcbiAgfVxufVxuIl19