/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, mapTo, switchMap, takeUntil } from 'rxjs/operators';
const listOfPositions = [POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight, POSITION_MAP.topRight, POSITION_MAP.topLeft];
export class NzDropDownDirective {
    constructor(elementRef, overlay, renderer, viewContainerRef, platform) {
        this.elementRef = elementRef;
        this.overlay = overlay;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.platform = platform;
        this.overlayRef = null;
        this.destroy$ = new Subject();
        this.positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef.nativeElement)
            .withLockedPosition()
            .withTransformOriginOn('.ant-dropdown');
        this.inputVisible$ = new BehaviorSubject(false);
        this.nzTrigger$ = new BehaviorSubject('hover');
        this.overlayClose$ = new Subject();
        this.nzDropdownMenu = null;
        this.nzTrigger = 'hover';
        this.nzMatchWidthElement = null;
        /**
         * @deprecated Not supported.
         * @breaking-change 11.0.0
         */
        this.nzBackdrop = true;
        this.nzClickHide = true;
        this.nzDisabled = false;
        this.nzVisible = false;
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.nzPlacement = 'bottomLeft';
        this.nzVisibleChange = new EventEmitter();
    }
    setDropdownMenuValue(key, value) {
        if (this.nzDropdownMenu) {
            this.nzDropdownMenu.setValue(key, value);
        }
    }
    ngOnInit() { }
    ngAfterViewInit() {
        if (this.nzDropdownMenu) {
            const nativeElement = this.elementRef.nativeElement;
            /** host mouse state **/
            const hostMouseState$ = merge(fromEvent(nativeElement, 'mouseenter').pipe(mapTo(true)), fromEvent(nativeElement, 'mouseleave').pipe(mapTo(false)));
            /** menu mouse state **/
            const menuMouseState$ = this.nzDropdownMenu.mouseState$;
            /** merged mouse state **/
            const mergedMouseState$ = merge(menuMouseState$, hostMouseState$);
            /** host click state **/
            const hostClickState$ = fromEvent(nativeElement, 'click').pipe(mapTo(true));
            /** visible state switch by nzTrigger **/
            const visibleStateByTrigger$ = this.nzTrigger$.pipe(switchMap(trigger => {
                if (trigger === 'hover') {
                    return mergedMouseState$;
                }
                else if (trigger === 'click') {
                    return hostClickState$;
                }
                else {
                    return EMPTY;
                }
            }));
            const descendantMenuItemClick$ = this.nzDropdownMenu.descendantMenuItemClick$.pipe(filter(() => this.nzClickHide), mapTo(false));
            const domTriggerVisible$ = merge(visibleStateByTrigger$, descendantMenuItemClick$, this.overlayClose$).pipe(filter(() => !this.nzDisabled));
            const visible$ = merge(this.inputVisible$, domTriggerVisible$);
            combineLatest([visible$, this.nzDropdownMenu.isChildSubMenuOpen$])
                .pipe(map(([visible, sub]) => visible || sub), auditTime(150), distinctUntilChanged(), filter(() => this.platform.isBrowser), takeUntil(this.destroy$))
                .subscribe((visible) => {
                const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : nativeElement;
                const triggerWidth = element.getBoundingClientRect().width;
                if (this.nzVisible !== visible) {
                    this.nzVisibleChange.emit(visible);
                }
                this.nzVisible = visible;
                if (visible) {
                    /** set up overlayRef **/
                    if (!this.overlayRef) {
                        /** new overlay **/
                        this.overlayRef = this.overlay.create({
                            positionStrategy: this.positionStrategy,
                            minWidth: triggerWidth,
                            disposeOnNavigation: true,
                            hasBackdrop: this.nzTrigger === 'click',
                            backdropClass: this.nzBackdrop ? undefined : 'nz-overlay-transparent-backdrop',
                            scrollStrategy: this.overlay.scrollStrategies.reposition()
                        });
                        merge(this.overlayRef.backdropClick(), this.overlayRef.detachments(), this.overlayRef.keydownEvents().pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e))))
                            .pipe(mapTo(false), takeUntil(this.destroy$))
                            .subscribe(this.overlayClose$);
                    }
                    else {
                        /** update overlay config **/
                        const overlayConfig = this.overlayRef.getConfig();
                        overlayConfig.minWidth = triggerWidth;
                    }
                    /** open dropdown with animation **/
                    this.positionStrategy.withPositions([POSITION_MAP[this.nzPlacement], ...listOfPositions]);
                    /** reset portal if needed **/
                    if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu.templateRef) {
                        this.portal = new TemplatePortal(this.nzDropdownMenu.templateRef, this.viewContainerRef);
                    }
                    this.overlayRef.attach(this.portal);
                }
                else {
                    /** detach overlayRef if needed **/
                    if (this.overlayRef) {
                        this.overlayRef.detach();
                    }
                }
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }
    ngOnChanges(changes) {
        const { nzVisible, nzDisabled, nzOverlayClassName, nzOverlayStyle, nzTrigger, nzBackdrop } = changes;
        if (nzTrigger) {
            this.nzTrigger$.next(this.nzTrigger);
        }
        if (nzVisible) {
            this.inputVisible$.next(this.nzVisible);
        }
        if (nzDisabled) {
            const nativeElement = this.elementRef.nativeElement;
            if (this.nzDisabled) {
                this.renderer.setAttribute(nativeElement, 'disabled', '');
                this.inputVisible$.next(false);
            }
            else {
                this.renderer.removeAttribute(nativeElement, 'disabled');
            }
        }
        if (nzOverlayClassName) {
            this.setDropdownMenuValue('nzOverlayClassName', this.nzOverlayClassName);
        }
        if (nzOverlayStyle) {
            this.setDropdownMenuValue('nzOverlayStyle', this.nzOverlayStyle);
        }
        if (nzBackdrop) {
            warnDeprecation('`nzBackdrop` in dropdown component will be removed in 11.0.0.');
        }
    }
}
NzDropDownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-dropdown]',
                exportAs: 'nzDropdown',
                host: {
                    '[class.ant-dropdown-trigger]': 'true'
                }
            },] }
];
NzDropDownDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Overlay },
    { type: Renderer2 },
    { type: ViewContainerRef },
    { type: Platform }
];
NzDropDownDirective.propDecorators = {
    nzDropdownMenu: [{ type: Input }],
    nzTrigger: [{ type: Input }],
    nzMatchWidthElement: [{ type: Input }],
    nzBackdrop: [{ type: Input }],
    nzClickHide: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzVisible: [{ type: Input }],
    nzOverlayClassName: [{ type: Input }],
    nzOverlayStyle: [{ type: Input }],
    nzPlacement: [{ type: Input }],
    nzVisibleChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDropDownDirective.prototype, "nzBackdrop", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDropDownDirective.prototype, "nzClickHide", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDropDownDirective.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzDropDownDirective.prototype, "nzVisible", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9kcm9wZG93bi8iLCJzb3VyY2VzIjpbImRyb3Bkb3duLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFDTixTQUFTLEVBRVQsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN4RixPQUFPLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRyxNQUFNLGVBQWUsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVN6SCxN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QztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRTtvQkFDSiw4QkFBOEIsRUFBRSxNQUFNO2lCQUN2QzthQUNGOzs7WUEzQkMsVUFBVTtZQU5ILE9BQU87WUFhZCxTQUFTO1lBRVQsZ0JBQWdCO1lBZFQsUUFBUTs7OzZCQWtEZCxLQUFLO3dCQUNMLEtBQUs7a0NBQ0wsS0FBSzt5QkFLTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO2lDQUNMLEtBQUs7NkJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLE1BQU07O0FBUGtCO0lBQWYsWUFBWSxFQUFFOzt1REFBbUI7QUFDbEI7SUFBZixZQUFZLEVBQUU7O3dEQUFvQjtBQUNuQjtJQUFmLFlBQVksRUFBRTs7dURBQW9CO0FBQ25CO0lBQWYsWUFBWSxFQUFFOztzREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBFU0NBUEUsIGhhc01vZGlmaWVyS2V5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdhcm5EZXByZWNhdGlvbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgUE9TSVRJT05fTUFQIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL292ZXJsYXknO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbmRleGFibGVPYmplY3QgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBFTVBUWSwgZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIG1hcFRvLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE56RHJvcGRvd25NZW51Q29tcG9uZW50LCBOelBsYWNlbWVudFR5cGUgfSBmcm9tICcuL2Ryb3Bkb3duLW1lbnUuY29tcG9uZW50JztcblxuY29uc3QgbGlzdE9mUG9zaXRpb25zID0gW1BPU0lUSU9OX01BUC5ib3R0b21MZWZ0LCBQT1NJVElPTl9NQVAuYm90dG9tUmlnaHQsIFBPU0lUSU9OX01BUC50b3BSaWdodCwgUE9TSVRJT05fTUFQLnRvcExlZnRdO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotZHJvcGRvd25dJyxcbiAgZXhwb3J0QXM6ICduekRyb3Bkb3duJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LWRyb3Bkb3duLXRyaWdnZXJdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpEcm9wRG93bkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCYWNrZHJvcDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDbGlja0hpZGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256VmlzaWJsZTogQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgcG9ydGFsPzogVGVtcGxhdGVQb3J0YWw7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5vdmVybGF5XG4gICAgLnBvc2l0aW9uKClcbiAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudClcbiAgICAud2l0aExvY2tlZFBvc2l0aW9uKClcbiAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcuYW50LWRyb3Bkb3duJyk7XG4gIHByaXZhdGUgaW5wdXRWaXNpYmxlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBwcml2YXRlIG56VHJpZ2dlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdjbGljaycgfCAnaG92ZXInPignaG92ZXInKTtcbiAgcHJpdmF0ZSBvdmVybGF5Q2xvc2UkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgQElucHV0KCkgbnpEcm9wZG93bk1lbnU6IE56RHJvcGRvd25NZW51Q29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VHJpZ2dlcjogJ2NsaWNrJyB8ICdob3ZlcicgPSAnaG92ZXInO1xuICBASW5wdXQoKSBuek1hdGNoV2lkdGhFbGVtZW50OiBFbGVtZW50UmVmIHwgbnVsbCA9IG51bGw7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBOb3Qgc3VwcG9ydGVkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDExLjAuMFxuICAgKi9cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QmFja2Ryb3AgPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDbGlja0hpZGUgPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56T3ZlcmxheUNsYXNzTmFtZTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG56T3ZlcmxheVN0eWxlOiBJbmRleGFibGVPYmplY3QgPSB7fTtcbiAgQElucHV0KCkgbnpQbGFjZW1lbnQ6IE56UGxhY2VtZW50VHlwZSA9ICdib3R0b21MZWZ0JztcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHNldERyb3Bkb3duTWVudVZhbHVlPFQgZXh0ZW5kcyBrZXlvZiBOekRyb3Bkb3duTWVudUNvbXBvbmVudD4oa2V5OiBULCB2YWx1ZTogTnpEcm9wZG93bk1lbnVDb21wb25lbnRbVF0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRyb3Bkb3duTWVudSkge1xuICAgICAgdGhpcy5uekRyb3Bkb3duTWVudS5zZXRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRyb3Bkb3duTWVudSkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIC8qKiBob3N0IG1vdXNlIHN0YXRlICoqL1xuICAgICAgY29uc3QgaG9zdE1vdXNlU3RhdGUkID0gbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudChuYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpLnBpcGUobWFwVG8odHJ1ZSkpLFxuICAgICAgICBmcm9tRXZlbnQobmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnKS5waXBlKG1hcFRvKGZhbHNlKSlcbiAgICAgICk7XG4gICAgICAvKiogbWVudSBtb3VzZSBzdGF0ZSAqKi9cbiAgICAgIGNvbnN0IG1lbnVNb3VzZVN0YXRlJCA9IHRoaXMubnpEcm9wZG93bk1lbnUubW91c2VTdGF0ZSQ7XG4gICAgICAvKiogbWVyZ2VkIG1vdXNlIHN0YXRlICoqL1xuICAgICAgY29uc3QgbWVyZ2VkTW91c2VTdGF0ZSQgPSBtZXJnZShtZW51TW91c2VTdGF0ZSQsIGhvc3RNb3VzZVN0YXRlJCk7XG4gICAgICAvKiogaG9zdCBjbGljayBzdGF0ZSAqKi9cbiAgICAgIGNvbnN0IGhvc3RDbGlja1N0YXRlJCA9IGZyb21FdmVudChuYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKG1hcFRvKHRydWUpKTtcbiAgICAgIC8qKiB2aXNpYmxlIHN0YXRlIHN3aXRjaCBieSBuelRyaWdnZXIgKiovXG4gICAgICBjb25zdCB2aXNpYmxlU3RhdGVCeVRyaWdnZXIkID0gdGhpcy5uelRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICBpZiAodHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG1lcmdlZE1vdXNlU3RhdGUkO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgcmV0dXJuIGhvc3RDbGlja1N0YXRlJDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBjb25zdCBkZXNjZW5kYW50TWVudUl0ZW1DbGljayQgPSB0aGlzLm56RHJvcGRvd25NZW51LmRlc2NlbmRhbnRNZW51SXRlbUNsaWNrJC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5uekNsaWNrSGlkZSksXG4gICAgICAgIG1hcFRvKGZhbHNlKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGRvbVRyaWdnZXJWaXNpYmxlJCA9IG1lcmdlKHZpc2libGVTdGF0ZUJ5VHJpZ2dlciQsIGRlc2NlbmRhbnRNZW51SXRlbUNsaWNrJCwgdGhpcy5vdmVybGF5Q2xvc2UkKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMubnpEaXNhYmxlZClcbiAgICAgICk7XG4gICAgICBjb25zdCB2aXNpYmxlJCA9IG1lcmdlKHRoaXMuaW5wdXRWaXNpYmxlJCwgZG9tVHJpZ2dlclZpc2libGUkKTtcbiAgICAgIGNvbWJpbmVMYXRlc3QoW3Zpc2libGUkLCB0aGlzLm56RHJvcGRvd25NZW51LmlzQ2hpbGRTdWJNZW51T3BlbiRdKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoKFt2aXNpYmxlLCBzdWJdKSA9PiB2aXNpYmxlIHx8IHN1YiksXG4gICAgICAgICAgYXVkaXRUaW1lKDE1MCksXG4gICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKHZpc2libGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5uek1hdGNoV2lkdGhFbGVtZW50ID8gdGhpcy5uek1hdGNoV2lkdGhFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgOiBuYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHRyaWdnZXJXaWR0aCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgaWYgKHRoaXMubnpWaXNpYmxlICE9PSB2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5lbWl0KHZpc2libGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm56VmlzaWJsZSA9IHZpc2libGU7XG4gICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIC8qKiBzZXQgdXAgb3ZlcmxheVJlZiAqKi9cbiAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICAgICAgICAgIC8qKiBuZXcgb3ZlcmxheSAqKi9cbiAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5wb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiB0cmlnZ2VyV2lkdGgsXG4gICAgICAgICAgICAgICAgZGlzcG9zZU9uTmF2aWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcDogdGhpcy5uelRyaWdnZXIgPT09ICdjbGljaycsXG4gICAgICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5uekJhY2tkcm9wID8gdW5kZWZpbmVkIDogJ256LW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxuICAgICAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKClcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5waXBlKGZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gRVNDQVBFICYmICFoYXNNb2RpZmllcktleShlKSkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAucGlwZShtYXBUbyhmYWxzZSksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMub3ZlcmxheUNsb3NlJCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvKiogdXBkYXRlIG92ZXJsYXkgY29uZmlnICoqL1xuICAgICAgICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5vdmVybGF5UmVmLmdldENvbmZpZygpO1xuICAgICAgICAgICAgICBvdmVybGF5Q29uZmlnLm1pbldpZHRoID0gdHJpZ2dlcldpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqIG9wZW4gZHJvcGRvd24gd2l0aCBhbmltYXRpb24gKiovXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbUE9TSVRJT05fTUFQW3RoaXMubnpQbGFjZW1lbnRdLCAuLi5saXN0T2ZQb3NpdGlvbnNdKTtcbiAgICAgICAgICAgIC8qKiByZXNldCBwb3J0YWwgaWYgbmVlZGVkICoqL1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcnRhbCB8fCB0aGlzLnBvcnRhbC50ZW1wbGF0ZVJlZiAhPT0gdGhpcy5uekRyb3Bkb3duTWVudSEudGVtcGxhdGVSZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5uekRyb3Bkb3duTWVudSEudGVtcGxhdGVSZWYsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyoqIGRldGFjaCBvdmVybGF5UmVmIGlmIG5lZWRlZCAqKi9cbiAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VmlzaWJsZSwgbnpEaXNhYmxlZCwgbnpPdmVybGF5Q2xhc3NOYW1lLCBuek92ZXJsYXlTdHlsZSwgbnpUcmlnZ2VyLCBuekJhY2tkcm9wIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelRyaWdnZXIpIHtcbiAgICAgIHRoaXMubnpUcmlnZ2VyJC5uZXh0KHRoaXMubnpUcmlnZ2VyKTtcbiAgICB9XG4gICAgaWYgKG56VmlzaWJsZSkge1xuICAgICAgdGhpcy5pbnB1dFZpc2libGUkLm5leHQodGhpcy5uelZpc2libGUpO1xuICAgIH1cbiAgICBpZiAobnpEaXNhYmxlZCkge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShuYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIHRoaXMuaW5wdXRWaXNpYmxlJC5uZXh0KGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKG5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnpPdmVybGF5Q2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLnNldERyb3Bkb3duTWVudVZhbHVlKCduek92ZXJsYXlDbGFzc05hbWUnLCB0aGlzLm56T3ZlcmxheUNsYXNzTmFtZSk7XG4gICAgfVxuICAgIGlmIChuek92ZXJsYXlTdHlsZSkge1xuICAgICAgdGhpcy5zZXREcm9wZG93bk1lbnVWYWx1ZSgnbnpPdmVybGF5U3R5bGUnLCB0aGlzLm56T3ZlcmxheVN0eWxlKTtcbiAgICB9XG4gICAgaWYgKG56QmFja2Ryb3ApIHtcbiAgICAgIHdhcm5EZXByZWNhdGlvbignYG56QmFja2Ryb3BgIGluIGRyb3Bkb3duIGNvbXBvbmVudCB3aWxsIGJlIHJlbW92ZWQgaW4gMTEuMC4wLicpO1xuICAgIH1cbiAgfVxufVxuIl19