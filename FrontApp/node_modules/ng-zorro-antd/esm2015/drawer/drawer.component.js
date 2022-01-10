/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, Optional, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerRef } from './drawer-ref';
export const DRAWER_ANIMATE_DURATION = 300;
const NZ_CONFIG_MODULE_NAME = 'drawer';
export class NzDrawerComponent extends NzDrawerRef {
    constructor(document, nzConfigService, renderer, overlay, injector, changeDetectorRef, focusTrapFactory, viewContainerRef, overlayKeyboardDispatcher) {
        super();
        this.document = document;
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.overlay = overlay;
        this.injector = injector;
        this.changeDetectorRef = changeDetectorRef;
        this.focusTrapFactory = focusTrapFactory;
        this.viewContainerRef = viewContainerRef;
        this.overlayKeyboardDispatcher = overlayKeyboardDispatcher;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCloseIcon = 'close';
        this.nzClosable = true;
        this.nzMaskClosable = true;
        this.nzMask = true;
        this.nzCloseOnNavigation = true;
        this.nzNoAnimation = false;
        this.nzKeyboard = true;
        this.nzPlacement = 'right';
        this.nzMaskStyle = {};
        this.nzBodyStyle = {};
        this.nzWidth = 256;
        this.nzHeight = 256;
        this.nzZIndex = 1000;
        this.nzOffsetX = 0;
        this.nzOffsetY = 0;
        this.componentInstance = null;
        this.nzOnViewInit = new EventEmitter();
        this.nzOnClose = new EventEmitter();
        this.destroy$ = new Subject();
        this.placementChanging = false;
        this.placementChangeTimeoutId = -1;
        this.isOpen = false;
        this.templateContext = {
            $implicit: undefined,
            drawerRef: this
        };
        this.nzAfterOpen = new Subject();
        this.nzAfterClose = new Subject();
    }
    set nzVisible(value) {
        this.isOpen = value;
    }
    get nzVisible() {
        return this.isOpen;
    }
    get offsetTransform() {
        if (!this.isOpen || this.nzOffsetX + this.nzOffsetY === 0) {
            return null;
        }
        switch (this.nzPlacement) {
            case 'left':
                return `translateX(${this.nzOffsetX}px)`;
            case 'right':
                return `translateX(-${this.nzOffsetX}px)`;
            case 'top':
                return `translateY(${this.nzOffsetY}px)`;
            case 'bottom':
                return `translateY(-${this.nzOffsetY}px)`;
        }
    }
    get transform() {
        if (this.isOpen) {
            return null;
        }
        switch (this.nzPlacement) {
            case 'left':
                return `translateX(-100%)`;
            case 'right':
                return `translateX(100%)`;
            case 'top':
                return `translateY(-100%)`;
            case 'bottom':
                return `translateY(100%)`;
        }
    }
    get width() {
        return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
    }
    get height() {
        return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
    }
    get isLeftOrRight() {
        return this.nzPlacement === 'left' || this.nzPlacement === 'right';
    }
    get afterOpen() {
        return this.nzAfterOpen.asObservable();
    }
    get afterClose() {
        return this.nzAfterClose.asObservable();
    }
    isTemplateRef(value) {
        return value instanceof TemplateRef;
    }
    ngOnInit() {
        this.attachOverlay();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.templateContext = { $implicit: this.nzContentParams, drawerRef: this };
        this.changeDetectorRef.detectChanges();
    }
    ngAfterViewInit() {
        this.attachBodyContent();
        setTimeout(() => {
            this.nzOnViewInit.emit();
        });
    }
    ngOnChanges(changes) {
        const { nzPlacement, nzVisible } = changes;
        if (nzVisible) {
            const value = changes.nzVisible.currentValue;
            if (value) {
                this.open();
            }
            else {
                this.close();
            }
        }
        if (nzPlacement && !nzPlacement.isFirstChange()) {
            this.triggerPlacementChangeCycleOnce();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        clearTimeout(this.placementChangeTimeoutId);
        this.disposeOverlay();
    }
    getAnimationDuration() {
        return this.nzNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
    }
    // Disable the transition animation temporarily when the placement changing
    triggerPlacementChangeCycleOnce() {
        if (!this.nzNoAnimation) {
            this.placementChanging = true;
            this.changeDetectorRef.markForCheck();
            clearTimeout(this.placementChangeTimeoutId);
            this.placementChangeTimeoutId = setTimeout(() => {
                this.placementChanging = false;
                this.changeDetectorRef.markForCheck();
            }, this.getAnimationDuration());
        }
    }
    close(result) {
        this.isOpen = false;
        this.updateOverlayStyle();
        this.overlayKeyboardDispatcher.remove(this.overlayRef);
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.updateBodyOverflow();
            this.restoreFocus();
            this.nzAfterClose.next(result);
            this.nzAfterClose.complete();
            this.componentInstance = null;
        }, this.getAnimationDuration());
    }
    open() {
        this.attachOverlay();
        this.isOpen = true;
        this.overlayKeyboardDispatcher.add(this.overlayRef);
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.nzAfterOpen.next();
        }, this.getAnimationDuration());
    }
    getContentComponent() {
        return this.componentInstance;
    }
    closeClick() {
        this.nzOnClose.emit();
    }
    maskClick() {
        if (this.nzMaskClosable && this.nzMask) {
            this.nzOnClose.emit();
        }
    }
    attachBodyContent() {
        this.bodyPortalOutlet.dispose();
        if (this.nzContent instanceof Type) {
            const childInjector = Injector.create({
                parent: this.injector,
                providers: [{ provide: NzDrawerRef, useValue: this }]
            });
            const componentPortal = new ComponentPortal(this.nzContent, null, childInjector);
            const componentRef = this.bodyPortalOutlet.attachComponentPortal(componentPortal);
            this.componentInstance = componentRef.instance;
            Object.assign(componentRef.instance, this.nzContentParams);
            componentRef.changeDetectorRef.detectChanges();
        }
    }
    attachOverlay() {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayRef.keydownEvents()
                .pipe(takeUntil(this.destroy$))
                .subscribe((event) => {
                if (event.keyCode === ESCAPE && this.isOpen && this.nzKeyboard) {
                    this.nzOnClose.emit();
                }
            });
            this.overlayRef
                .detachments()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.disposeOverlay();
            });
        }
    }
    disposeOverlay() {
        var _a;
        (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
        this.overlayRef = null;
    }
    getOverlayConfig() {
        return new OverlayConfig({
            disposeOnNavigation: this.nzCloseOnNavigation,
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
    }
    updateOverlayStyle() {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
        }
    }
    updateBodyOverflow() {
        if (this.overlayRef) {
            if (this.isOpen) {
                this.overlayRef.getConfig().scrollStrategy.enable();
            }
            else {
                this.overlayRef.getConfig().scrollStrategy.disable();
            }
        }
    }
    savePreviouslyFocusedElement() {
        if (this.document && !this.previouslyFocusedElement) {
            this.previouslyFocusedElement = this.document.activeElement;
            // We need the extra check, because IE's svg element has no blur method.
            if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.blur === 'function') {
                this.previouslyFocusedElement.blur();
            }
        }
    }
    trapFocus() {
        if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
            this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
            this.focusTrap.focusInitialElement();
        }
    }
    restoreFocus() {
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}
NzDrawerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-drawer',
                exportAs: 'nzDrawer',
                template: `
    <ng-template #drawerTemplate>
      <div
        class="ant-drawer"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-drawer-open]="isOpen"
        [class.no-mask]="!nzMask"
        [class.ant-drawer-top]="nzPlacement === 'top'"
        [class.ant-drawer-bottom]="nzPlacement === 'bottom'"
        [class.ant-drawer-right]="nzPlacement === 'right'"
        [class.ant-drawer-left]="nzPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="nzZIndex"
      >
        <div class="ant-drawer-mask" (click)="maskClick()" *ngIf="nzMask" [ngStyle]="nzMaskStyle"></div>
        <div
          class="ant-drawer-content-wrapper {{ nzWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="ant-drawer-content">
            <div class="ant-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div *ngIf="nzTitle || nzClosable" [class.ant-drawer-header]="!!nzTitle" [class.ant-drawer-header-no-title]="!nzTitle">
                <div *ngIf="nzTitle" class="ant-drawer-title">
                  <ng-container *nzStringTemplateOutlet="nzTitle"><div [innerHTML]="nzTitle"></div></ng-container>
                </div>
                <button *ngIf="nzClosable" (click)="closeClick()" aria-label="Close" class="ant-drawer-close" style="--scroll-bar: 0px;">
                  <ng-container *nzStringTemplateOutlet="nzCloseIcon; let closeIcon">
                    <i nz-icon [nzType]="closeIcon"></i>
                  </ng-container>
                </button>
              </div>
              <div class="ant-drawer-body" [ngStyle]="nzBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="isTemplateRef(nzContent)">
                  <ng-container *ngTemplateOutlet="$any(nzContent); context: templateContext"></ng-container>
                </ng-container>
                <ng-content *ngIf="!nzContent"></ng-content>
              </div>
              <div *ngIf="nzFooter" class="ant-drawer-footer">
                <ng-container *nzStringTemplateOutlet="nzFooter"><div [innerHTML]="nzFooter"></div></ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzDrawerComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: NzConfigService },
    { type: Renderer2 },
    { type: Overlay },
    { type: Injector },
    { type: ChangeDetectorRef },
    { type: FocusTrapFactory },
    { type: ViewContainerRef },
    { type: OverlayKeyboardDispatcher }
];
NzDrawerComponent.propDecorators = {
    nzContent: [{ type: Input }],
    nzCloseIcon: [{ type: Input }],
    nzClosable: [{ type: Input }],
    nzMaskClosable: [{ type: Input }],
    nzMask: [{ type: Input }],
    nzCloseOnNavigation: [{ type: Input }],
    nzNoAnimation: [{ type: Input }],
    nzKeyboard: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzPlacement: [{ type: Input }],
    nzMaskStyle: [{ type: Input }],
    nzBodyStyle: [{ type: Input }],
    nzWrapClassName: [{ type: Input }],
    nzWidth: [{ type: Input }],
    nzHeight: [{ type: Input }],
    nzZIndex: [{ type: Input }],
    nzOffsetX: [{ type: Input }],
    nzOffsetY: [{ type: Input }],
    nzVisible: [{ type: Input }],
    nzOnViewInit: [{ type: Output }],
    nzOnClose: [{ type: Output }],
    drawerTemplate: [{ type: ViewChild, args: ['drawerTemplate', { static: true },] }],
    bodyPortalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: false },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDrawerComponent.prototype, "nzClosable", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDrawerComponent.prototype, "nzMaskClosable", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDrawerComponent.prototype, "nzMask", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDrawerComponent.prototype, "nzCloseOnNavigation", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDrawerComponent.prototype, "nzNoAnimation", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzDrawerComponent.prototype, "nzKeyboard", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZHJhd2VyLyIsInNvdXJjZXMiOlsiZHJhd2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFhLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLHlCQUF5QixFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDckcsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFFBQVEsRUFDUixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBRVQsV0FBVyxFQUNYLElBQUksRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUUzQyxNQUFNLHFCQUFxQixHQUFn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Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRm9jdXNUcmFwLCBGb2N1c1RyYXBGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlLZXlib2FyZERpc3BhdGNoZXIsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDZGtQb3J0YWxPdXRsZXQsIENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBUeXBlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIHRvQ3NzUGl4ZWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56RHJhd2VyT3B0aW9uc09mQ29tcG9uZW50LCBOekRyYXdlclBsYWNlbWVudCB9IGZyb20gJy4vZHJhd2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgTnpEcmF3ZXJSZWYgfSBmcm9tICcuL2RyYXdlci1yZWYnO1xuXG5leHBvcnQgY29uc3QgRFJBV0VSX0FOSU1BVEVfRFVSQVRJT04gPSAzMDA7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnZHJhd2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotZHJhd2VyJyxcbiAgZXhwb3J0QXM6ICduekRyYXdlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkcmF3ZXJUZW1wbGF0ZT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtZHJhd2VyXCJcbiAgICAgICAgW256Tm9BbmltYXRpb25dPVwibnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLW9wZW5dPVwiaXNPcGVuXCJcbiAgICAgICAgW2NsYXNzLm5vLW1hc2tdPVwiIW56TWFza1wiXG4gICAgICAgIFtjbGFzcy5hbnQtZHJhd2VyLXRvcF09XCJuelBsYWNlbWVudCA9PT0gJ3RvcCdcIlxuICAgICAgICBbY2xhc3MuYW50LWRyYXdlci1ib3R0b21dPVwibnpQbGFjZW1lbnQgPT09ICdib3R0b20nXCJcbiAgICAgICAgW2NsYXNzLmFudC1kcmF3ZXItcmlnaHRdPVwibnpQbGFjZW1lbnQgPT09ICdyaWdodCdcIlxuICAgICAgICBbY2xhc3MuYW50LWRyYXdlci1sZWZ0XT1cIm56UGxhY2VtZW50ID09PSAnbGVmdCdcIlxuICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cIm9mZnNldFRyYW5zZm9ybVwiXG4gICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cInBsYWNlbWVudENoYW5naW5nID8gJ25vbmUnIDogbnVsbFwiXG4gICAgICAgIFtzdHlsZS56SW5kZXhdPVwibnpaSW5kZXhcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci1tYXNrXCIgKGNsaWNrKT1cIm1hc2tDbGljaygpXCIgKm5nSWY9XCJuek1hc2tcIiBbbmdTdHlsZV09XCJuek1hc2tTdHlsZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJhbnQtZHJhd2VyLWNvbnRlbnQtd3JhcHBlciB7eyBueldyYXBDbGFzc05hbWUgfX1cIlxuICAgICAgICAgIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgICAgW3N0eWxlLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCJcbiAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJwbGFjZW1lbnRDaGFuZ2luZyA/ICdub25lJyA6IG51bGxcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1kcmF3ZXItY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1kcmF3ZXItd3JhcHBlci1ib2R5XCIgW3N0eWxlLmhlaWdodF09XCJpc0xlZnRPclJpZ2h0ID8gJzEwMCUnIDogbnVsbFwiPlxuICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibnpUaXRsZSB8fCBuekNsb3NhYmxlXCIgW2NsYXNzLmFudC1kcmF3ZXItaGVhZGVyXT1cIiEhbnpUaXRsZVwiIFtjbGFzcy5hbnQtZHJhd2VyLWhlYWRlci1uby10aXRsZV09XCIhbnpUaXRsZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJuelRpdGxlXCIgY2xhc3M9XCJhbnQtZHJhd2VyLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPjxkaXYgW2lubmVySFRNTF09XCJuelRpdGxlXCI+PC9kaXY+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm56Q2xvc2FibGVcIiAoY2xpY2spPVwiY2xvc2VDbGljaygpXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgY2xhc3M9XCJhbnQtZHJhd2VyLWNsb3NlXCIgc3R5bGU9XCItLXNjcm9sbC1iYXI6IDBweDtcIj5cbiAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekNsb3NlSWNvbjsgbGV0IGNsb3NlSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBuei1pY29uIFtuelR5cGVdPVwiY2xvc2VJY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LWRyYXdlci1ib2R5XCIgW25nU3R5bGVdPVwibnpCb2R5U3R5bGVcIj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzVGVtcGxhdGVSZWYobnpDb250ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIiRhbnkobnpDb250ZW50KTsgY29udGV4dDogdGVtcGxhdGVDb250ZXh0XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhbnpDb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm56Rm9vdGVyXCIgY2xhc3M9XCJhbnQtZHJhd2VyLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekZvb3RlclwiPjxkaXYgW2lubmVySFRNTF09XCJuekZvb3RlclwiPjwvZGl2PjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekRyYXdlckNvbXBvbmVudDxUID0gTnpTYWZlQW55LCBSID0gTnpTYWZlQW55LCBEID0gTnpTYWZlQW55PlxuICBleHRlbmRzIE56RHJhd2VyUmVmPFQsIFI+XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgTnpEcmF3ZXJPcHRpb25zT2ZDb21wb25lbnQge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2xvc2FibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TWFza0Nsb3NhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hc2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Tm9BbmltYXRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256S2V5Ym9hcmQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2xvc2VPbk5hdmlnYXRpb246IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekNvbnRlbnQhOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogRDsgZHJhd2VyUmVmOiBOekRyYXdlclJlZjxSPiB9PiB8IFR5cGU8VD47XG4gIEBJbnB1dCgpIG56Q2xvc2VJY29uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiA9ICdjbG9zZSc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpNYXNrQ2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuek1hc2s6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekNsb3NlT25OYXZpZ2F0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Tm9BbmltYXRpb24gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56S2V5Ym9hcmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+O1xuICBASW5wdXQoKSBuekZvb3Rlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgQElucHV0KCkgbnpQbGFjZW1lbnQ6IE56RHJhd2VyUGxhY2VtZW50ID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgbnpNYXNrU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgQElucHV0KCkgbnpCb2R5U3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcbiAgQElucHV0KCkgbnpXcmFwQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBueldpZHRoOiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56SGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56WkluZGV4ID0gMTAwMDtcbiAgQElucHV0KCkgbnpPZmZzZXRYID0gMDtcbiAgQElucHV0KCkgbnpPZmZzZXRZID0gMDtcbiAgcHJpdmF0ZSBjb21wb25lbnRJbnN0YW5jZTogVCB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuelZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW47XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPblZpZXdJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2RyYXdlclRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgZHJhd2VyVGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiBmYWxzZSB9KSBib2R5UG9ydGFsT3V0bGV0PzogQ2RrUG9ydGFsT3V0bGV0O1xuXG4gIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG4gIHBsYWNlbWVudENoYW5naW5nID0gZmFsc2U7XG4gIHBsYWNlbWVudENoYW5nZVRpbWVvdXRJZCA9IC0xO1xuICBuekNvbnRlbnRQYXJhbXM/OiBEOyAvLyBvbmx5IHNlcnZpY2VcbiAgb3ZlcmxheVJlZj86IE92ZXJsYXlSZWYgfCBudWxsO1xuICBwb3J0YWw/OiBUZW1wbGF0ZVBvcnRhbDtcbiAgZm9jdXNUcmFwPzogRm9jdXNUcmFwO1xuICBpc09wZW4gPSBmYWxzZTtcbiAgdGVtcGxhdGVDb250ZXh0OiB7ICRpbXBsaWNpdDogRCB8IHVuZGVmaW5lZDsgZHJhd2VyUmVmOiBOekRyYXdlclJlZjxSPiB9ID0ge1xuICAgICRpbXBsaWNpdDogdW5kZWZpbmVkLFxuICAgIGRyYXdlclJlZjogdGhpcyBhcyBOekRyYXdlclJlZjxSPlxuICB9O1xuXG4gIGdldCBvZmZzZXRUcmFuc2Zvcm0oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbiB8fCB0aGlzLm56T2Zmc2V0WCArIHRoaXMubnpPZmZzZXRZID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLm56UGxhY2VtZW50KSB7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVYKCR7dGhpcy5uek9mZnNldFh9cHgpYDtcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVYKC0ke3RoaXMubnpPZmZzZXRYfXB4KWA7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZVkoJHt0aGlzLm56T2Zmc2V0WX1weClgO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKC0ke3RoaXMubnpPZmZzZXRZfXB4KWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYW5zZm9ybSgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5uelBsYWNlbWVudCkge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHJldHVybiBgdHJhbnNsYXRlWCgtMTAwJSlgO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZVgoMTAwJSlgO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGVZKC0xMDAlKWA7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZVkoMTAwJSlgO1xuICAgIH1cbiAgfVxuXG4gIGdldCB3aWR0aCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5pc0xlZnRPclJpZ2h0ID8gdG9Dc3NQaXhlbCh0aGlzLm56V2lkdGgpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuICF0aGlzLmlzTGVmdE9yUmlnaHQgPyB0b0Nzc1BpeGVsKHRoaXMubnpIZWlnaHQpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBpc0xlZnRPclJpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56UGxhY2VtZW50ID09PSAnbGVmdCcgfHwgdGhpcy5uelBsYWNlbWVudCA9PT0gJ3JpZ2h0JztcbiAgfVxuXG4gIG56QWZ0ZXJPcGVuID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgbnpBZnRlckNsb3NlID0gbmV3IFN1YmplY3Q8Uj4oKTtcblxuICBnZXQgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLm56QWZ0ZXJPcGVuLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGFmdGVyQ2xvc2UoKTogT2JzZXJ2YWJsZTxSPiB7XG4gICAgcmV0dXJuIHRoaXMubnpBZnRlckNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgaXNUZW1wbGF0ZVJlZih2YWx1ZToge30pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IE56U2FmZUFueSxcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGZvY3VzVHJhcEZhY3Rvcnk6IEZvY3VzVHJhcEZhY3RvcnksXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgb3ZlcmxheUtleWJvYXJkRGlzcGF0Y2hlcjogT3ZlcmxheUtleWJvYXJkRGlzcGF0Y2hlclxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgdGhpcy51cGRhdGVPdmVybGF5U3R5bGUoKTtcbiAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0ID0geyAkaW1wbGljaXQ6IHRoaXMubnpDb250ZW50UGFyYW1zLCBkcmF3ZXJSZWY6IHRoaXMgYXMgTnpEcmF3ZXJSZWY8Uj4gfTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaEJvZHlDb250ZW50KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm56T25WaWV3SW5pdC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelBsYWNlbWVudCwgbnpWaXNpYmxlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelZpc2libGUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY2hhbmdlcy5uelZpc2libGUuY3VycmVudFZhbHVlO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpQbGFjZW1lbnQgJiYgIW56UGxhY2VtZW50LmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy50cmlnZ2VyUGxhY2VtZW50Q2hhbmdlQ3ljbGVPbmNlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBsYWNlbWVudENoYW5nZVRpbWVvdXRJZCk7XG4gICAgdGhpcy5kaXNwb3NlT3ZlcmxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbmltYXRpb25EdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm56Tm9BbmltYXRpb24gPyAwIDogRFJBV0VSX0FOSU1BVEVfRFVSQVRJT047XG4gIH1cblxuICAvLyBEaXNhYmxlIHRoZSB0cmFuc2l0aW9uIGFuaW1hdGlvbiB0ZW1wb3JhcmlseSB3aGVuIHRoZSBwbGFjZW1lbnQgY2hhbmdpbmdcbiAgcHJpdmF0ZSB0cmlnZ2VyUGxhY2VtZW50Q2hhbmdlQ3ljbGVPbmNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uek5vQW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudENoYW5naW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5wbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQpO1xuICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2VUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnRDaGFuZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgdGhpcy5nZXRBbmltYXRpb25EdXJhdGlvbigpKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xuICAgIHRoaXMub3ZlcmxheUtleWJvYXJkRGlzcGF0Y2hlci5yZW1vdmUodGhpcy5vdmVybGF5UmVmISk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xuICAgICAgdGhpcy5yZXN0b3JlRm9jdXMoKTtcbiAgICAgIHRoaXMubnpBZnRlckNsb3NlLm5leHQocmVzdWx0KTtcbiAgICAgIHRoaXMubnpBZnRlckNsb3NlLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbDtcbiAgICB9LCB0aGlzLmdldEFuaW1hdGlvbkR1cmF0aW9uKCkpO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaE92ZXJsYXkoKTtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5vdmVybGF5S2V5Ym9hcmREaXNwYXRjaGVyLmFkZCh0aGlzLm92ZXJsYXlSZWYhKTtcbiAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xuICAgIHRoaXMudXBkYXRlQm9keU92ZXJmbG93KCk7XG4gICAgdGhpcy5zYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk7XG4gICAgdGhpcy50cmFwRm9jdXMoKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMubnpBZnRlck9wZW4ubmV4dCgpO1xuICAgIH0sIHRoaXMuZ2V0QW5pbWF0aW9uRHVyYXRpb24oKSk7XG4gIH1cblxuICBnZXRDb250ZW50Q29tcG9uZW50KCk6IFQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRJbnN0YW5jZTtcbiAgfVxuXG4gIGNsb3NlQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5uek9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgbWFza0NsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56TWFza0Nsb3NhYmxlICYmIHRoaXMubnpNYXNrKSB7XG4gICAgICB0aGlzLm56T25DbG9zZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hCb2R5Q29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmJvZHlQb3J0YWxPdXRsZXQhLmRpc3Bvc2UoKTtcblxuICAgIGlmICh0aGlzLm56Q29udGVudCBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgIGNvbnN0IGNoaWxkSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwYXJlbnQ6IHRoaXMuaW5qZWN0b3IsXG4gICAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTnpEcmF3ZXJSZWYsIHVzZVZhbHVlOiB0aGlzIH1dXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8VD4odGhpcy5uekNvbnRlbnQsIG51bGwsIGNoaWxkSW5qZWN0b3IpO1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ib2R5UG9ydGFsT3V0bGV0IS5hdHRhY2hDb21wb25lbnRQb3J0YWwoY29tcG9uZW50UG9ydGFsKTtcbiAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgdGhpcy5uekNvbnRlbnRQYXJhbXMpO1xuICAgICAgY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaE92ZXJsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuZHJhd2VyVGVtcGxhdGUsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKHRoaXMuZ2V0T3ZlcmxheUNvbmZpZygpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYhLmtleWRvd25FdmVudHMoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmlzT3BlbiAmJiB0aGlzLm56S2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMubnpPbkNsb3NlLmVtaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5vdmVybGF5UmVmXG4gICAgICAgIC5kZXRhY2htZW50cygpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwb3NlT3ZlcmxheSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2VPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheVJlZj8uZGlzcG9zZSgpO1xuICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRoaXMubnpDbG9zZU9uTmF2aWdhdGlvbixcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKClcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlT3ZlcmxheVN0eWxlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCwgJ3BvaW50ZXItZXZlbnRzJywgdGhpcy5pc09wZW4gPyAnYXV0bycgOiAnbm9uZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQm9keU92ZXJmbG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuc2Nyb2xsU3RyYXRlZ3khLmVuYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpLnNjcm9sbFN0cmF0ZWd5IS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudCAmJiAhdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgLy8gV2UgbmVlZCB0aGUgZXh0cmEgY2hlY2ssIGJlY2F1c2UgSUUncyBzdmcgZWxlbWVudCBoYXMgbm8gYmx1ciBtZXRob2QuXG4gICAgICBpZiAodGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgJiYgdHlwZW9mIHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50LmJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhcEZvY3VzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5mb2N1c1RyYXAgJiYgdGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCkge1xuICAgICAgdGhpcy5mb2N1c1RyYXAgPSB0aGlzLmZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKHRoaXMub3ZlcmxheVJlZiEub3ZlcmxheUVsZW1lbnQpO1xuICAgICAgdGhpcy5mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZUZvY3VzKCk6IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdGhlIGV4dHJhIGNoZWNrLCBiZWNhdXNlIElFIGNhbiBzZXQgdGhlIGBhY3RpdmVFbGVtZW50YCB0byBudWxsIGluIHNvbWUgY2FzZXMuXG4gICAgaWYgKHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50ICYmIHR5cGVvZiB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=