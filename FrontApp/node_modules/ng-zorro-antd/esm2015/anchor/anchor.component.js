/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { getOffsetTop } from './util';
const NZ_CONFIG_MODULE_NAME = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;
export class NzAnchorComponent {
    constructor(doc, nzConfigService, scrollSrv, cdr, platform, zone, renderer) {
        this.doc = doc;
        this.nzConfigService = nzConfigService;
        this.scrollSrv = scrollSrv;
        this.cdr = cdr;
        this.platform = platform;
        this.zone = zone;
        this.renderer = renderer;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzAffix = true;
        this.nzShowInkInFixed = false;
        this.nzBounds = 5;
        this.nzOffsetTop = undefined;
        this.nzClick = new EventEmitter();
        this.nzScroll = new EventEmitter();
        this.visible = false;
        this.wrapperStyle = { 'max-height': '100vh' };
        this.links = [];
        this.animating = false;
        this.destroy$ = new Subject();
        this.handleScrollTimeoutID = -1;
    }
    registerLink(link) {
        this.links.push(link);
    }
    unregisterLink(link) {
        this.links.splice(this.links.indexOf(link), 1);
    }
    getContainer() {
        return this.container || window;
    }
    ngAfterViewInit() {
        this.registerScrollEvent();
    }
    ngOnDestroy() {
        clearTimeout(this.handleScrollTimeoutID);
        this.destroy$.next();
        this.destroy$.complete();
    }
    registerScrollEvent() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.destroy$.next();
        this.zone.runOutsideAngular(() => {
            fromEvent(this.getContainer(), 'scroll')
                .pipe(throttleTime(50), takeUntil(this.destroy$))
                .subscribe(() => this.handleScroll());
        });
        // Browser would maintain the scrolling position when refreshing.
        // So we have to delay calculation in avoid of getting a incorrect result.
        this.handleScrollTimeoutID = setTimeout(() => this.handleScroll());
    }
    handleScroll() {
        if (typeof document === 'undefined' || this.animating) {
            return;
        }
        const sections = [];
        const scope = (this.nzOffsetTop || 0) + this.nzBounds;
        this.links.forEach(comp => {
            const sharpLinkMatch = sharpMatcherRegx.exec(comp.nzHref.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = this.doc.getElementById(sharpLinkMatch[1]);
            if (target) {
                const top = getOffsetTop(target, this.getContainer());
                if (top < scope) {
                    sections.push({
                        top,
                        comp
                    });
                }
            }
        });
        this.visible = !!sections.length;
        if (!this.visible) {
            this.clearActive();
            this.cdr.detectChanges();
        }
        else {
            const maxSection = sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            this.handleActive(maxSection.comp);
        }
        this.setVisible();
    }
    clearActive() {
        this.links.forEach(i => {
            i.unsetActive();
        });
    }
    handleActive(comp) {
        this.clearActive();
        comp.setActive();
        const linkNode = comp.getLinkTitleElement();
        this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
        this.visible = true;
        this.setVisible();
        this.nzScroll.emit(comp);
    }
    setVisible() {
        const visible = this.visible;
        const visibleClassname = 'visible';
        if (this.ink) {
            if (visible) {
                this.renderer.addClass(this.ink.nativeElement, visibleClassname);
            }
            else {
                this.renderer.removeClass(this.ink.nativeElement, visibleClassname);
            }
        }
    }
    handleScrollTo(linkComp) {
        const el = this.doc.querySelector(linkComp.nzHref);
        if (!el) {
            return;
        }
        this.animating = true;
        const containerScrollTop = this.scrollSrv.getScroll(this.getContainer());
        const elOffsetTop = getOffsetTop(el, this.getContainer());
        const targetScrollTop = containerScrollTop + elOffsetTop - (this.nzOffsetTop || 0);
        this.scrollSrv.scrollTo(this.getContainer(), targetScrollTop, {
            callback: () => {
                this.animating = false;
                this.handleActive(linkComp);
            }
        });
        this.nzClick.emit(linkComp.nzHref);
    }
    ngOnChanges(changes) {
        const { nzOffsetTop, nzContainer } = changes;
        if (nzOffsetTop) {
            this.wrapperStyle = {
                'max-height': `calc(100vh - ${this.nzOffsetTop}px)`
            };
        }
        if (nzContainer) {
            const container = this.nzContainer;
            this.container = typeof container === 'string' ? this.doc.querySelector(container) : container;
            this.registerScrollEvent();
        }
    }
}
NzAnchorComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-anchor',
                exportAs: 'nzAnchor',
                preserveWhitespaces: false,
                template: `
    <nz-affix *ngIf="nzAffix; else content" [nzOffsetTop]="nzOffsetTop" [nzTarget]="container">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </nz-affix>
    <ng-template #content>
      <div class="ant-anchor-wrapper" [ngStyle]="wrapperStyle">
        <div class="ant-anchor" [ngClass]="{ fixed: !nzAffix && !nzShowInkInFixed }">
          <div class="ant-anchor-ink">
            <div class="ant-anchor-ink-ball" #ink></div>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzAnchorComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NzConfigService },
    { type: NzScrollService },
    { type: ChangeDetectorRef },
    { type: Platform },
    { type: NgZone },
    { type: Renderer2 }
];
NzAnchorComponent.propDecorators = {
    ink: [{ type: ViewChild, args: ['ink', { static: false },] }],
    nzAffix: [{ type: Input }],
    nzShowInkInFixed: [{ type: Input }],
    nzBounds: [{ type: Input }],
    nzOffsetTop: [{ type: Input }],
    nzContainer: [{ type: Input }],
    nzClick: [{ type: Output }],
    nzScroll: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAnchorComponent.prototype, "nzAffix", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzAnchorComponent.prototype, "nzShowInkInFixed", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzAnchorComponent.prototype, "nzBounds", void 0);
__decorate([
    InputNumber(undefined),
    WithConfig(),
    __metadata("design:type", Number)
], NzAnchorComponent.prototype, "nzOffsetTop", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYW5jaG9yLyIsInNvdXJjZXMiOlsiYW5jaG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFPdEMsTUFBTSxxQkFBcUIsR0FBZ0IsUUFBUSxDQUFDO0FBQ3BELE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO0FBd0JyQyxNQUFNLE9BQU8saUJBQWlCO0lBeUM1QixZQUM0QixHQUFjLEVBQ2pDLGVBQWdDLEVBQy9CLFNBQTBCLEVBQzFCLEdBQXNCLEVBQ3RCLFFBQWtCLEVBQ2xCLElBQVksRUFDWixRQUFtQjtRQU5ELFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzFCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGFBQVEsR0FBUixRQUFRLENBQVc7UUEvQ3BCLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBUW5DLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFLeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBS2xDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFLckIsZ0JBQVcsR0FBWSxTQUFTLENBQUM7UUFJZCxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNyQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQXlCLENBQUM7UUFFeEUsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixpQkFBWSxHQUFxQixFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsQ0FBQztRQUluRCxVQUFLLEdBQTRCLEVBQUUsQ0FBQztRQUNwQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLDBCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBVWhDLENBQUM7SUFFSixZQUFZLENBQUMsSUFBMkI7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUEyQjtRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFDVCxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQzVCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxRQUFRLENBQUM7aUJBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDaEQsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsaUVBQWlFO1FBQ2pFLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNyRCxPQUFPO1NBQ1I7UUFFRCxNQUFNLFFBQVEsR0FBYyxFQUFFLENBQUM7UUFDL0IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNuQixPQUFPO2FBQ1I7WUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLEdBQUcsR0FBRyxLQUFLLEVBQUU7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDWixHQUFHO3dCQUNILElBQUk7cUJBQ0wsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNMLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxZQUFZLENBQUMsSUFBMkI7UUFDOUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUMvRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7YUFDckU7U0FDRjtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsUUFBK0I7UUFDNUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLEdBQUcsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsZUFBZSxFQUFFO1lBQzVELFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUIsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQzdDLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEIsWUFBWSxFQUFFLGdCQUFnQixJQUFJLENBQUMsV0FBVyxLQUFLO2FBQ3BELENBQUM7U0FDSDtRQUNELElBQUksV0FBVyxFQUFFO1lBQ2YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMvRixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQTVNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7NENBMkNJLE1BQU0sU0FBQyxRQUFRO1lBbEZFLGVBQWU7WUFDNUIsZUFBZTtZQWhCdEIsaUJBQWlCO1lBTFYsUUFBUTtZQVdmLE1BQU07WUFJTixTQUFTOzs7a0JBb0RSLFNBQVMsU0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3NCQUVsQyxLQUFLOytCQUVMLEtBQUs7dUJBS0wsS0FBSzswQkFLTCxLQUFLOzBCQUtMLEtBQUs7c0JBRUwsTUFBTTt1QkFDTixNQUFNOztBQXBCa0I7SUFBZixZQUFZLEVBQUU7O2tEQUFnQjtBQUt4QztJQUZDLFVBQVUsRUFBRTtJQUNaLFlBQVksRUFBRTs7MkRBQ21CO0FBS2xDO0lBRkMsVUFBVSxFQUFFO0lBQ1osV0FBVyxFQUFFOzttREFDTztBQUtyQjtJQUZDLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDdEIsVUFBVSxFQUFVOztzREFDWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgTnpTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTmdTdHlsZUludGVyZmFjZSwgTnVtYmVySW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpBbmNob3JMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi9hbmNob3ItbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgZ2V0T2Zmc2V0VG9wIH0gZnJvbSAnLi91dGlsJztcblxuaW50ZXJmYWNlIFNlY3Rpb24ge1xuICBjb21wOiBOekFuY2hvckxpbmtDb21wb25lbnQ7XG4gIHRvcDogbnVtYmVyO1xufVxuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2FuY2hvcic7XG5jb25zdCBzaGFycE1hdGNoZXJSZWd4ID0gLyMoW14jXSspJC87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWFuY2hvcicsXG4gIGV4cG9ydEFzOiAnbnpBbmNob3InLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotYWZmaXggKm5nSWY9XCJuekFmZml4OyBlbHNlIGNvbnRlbnRcIiBbbnpPZmZzZXRUb3BdPVwibnpPZmZzZXRUb3BcIiBbbnpUYXJnZXRdPVwiY29udGFpbmVyXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9uei1hZmZpeD5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWFuY2hvci13cmFwcGVyXCIgW25nU3R5bGVdPVwid3JhcHBlclN0eWxlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtYW5jaG9yXCIgW25nQ2xhc3NdPVwieyBmaXhlZDogIW56QWZmaXggJiYgIW56U2hvd0lua0luRml4ZWQgfVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtYW5jaG9yLWlua1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1hbmNob3ItaW5rLWJhbGxcIiAjaW5rPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekFuY2hvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekFmZml4OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dJbmtJbkZpeGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvdW5kczogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9mZnNldFRvcDogTnVtYmVySW5wdXQ7XG5cbiAgQFZpZXdDaGlsZCgnaW5rJywgeyBzdGF0aWM6IGZhbHNlIH0pIHByaXZhdGUgaW5rITogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBZmZpeCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgQFdpdGhDb25maWcoKVxuICBASW5wdXRCb29sZWFuKClcbiAgbnpTaG93SW5rSW5GaXhlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIEBXaXRoQ29uZmlnKClcbiAgQElucHV0TnVtYmVyKClcbiAgbnpCb3VuZHM6IG51bWJlciA9IDU7XG5cbiAgQElucHV0KClcbiAgQElucHV0TnVtYmVyKHVuZGVmaW5lZClcbiAgQFdpdGhDb25maWc8bnVtYmVyPigpXG4gIG56T2Zmc2V0VG9wPzogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIG56Q29udGFpbmVyPzogc3RyaW5nIHwgSFRNTEVsZW1lbnQ7XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56U2Nyb2xsID0gbmV3IEV2ZW50RW1pdHRlcjxOekFuY2hvckxpbmtDb21wb25lbnQ+KCk7XG5cbiAgdmlzaWJsZSA9IGZhbHNlO1xuICB3cmFwcGVyU3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7ICdtYXgtaGVpZ2h0JzogJzEwMHZoJyB9O1xuXG4gIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50IHwgV2luZG93O1xuXG4gIHByaXZhdGUgbGlua3M6IE56QW5jaG9yTGlua0NvbXBvbmVudFtdID0gW107XG4gIHByaXZhdGUgYW5pbWF0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGhhbmRsZVNjcm9sbFRpbWVvdXRJRCA9IC0xO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jOiBOelNhZmVBbnksXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2Nyb2xsU3J2OiBOelNjcm9sbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgcmVnaXN0ZXJMaW5rKGxpbms6IE56QW5jaG9yTGlua0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlua3MucHVzaChsaW5rKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJMaW5rKGxpbms6IE56QW5jaG9yTGlua0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlua3Muc3BsaWNlKHRoaXMubGlua3MuaW5kZXhPZihsaW5rKSwgMSk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB8IFdpbmRvdyB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyIHx8IHdpbmRvdztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyU2Nyb2xsRXZlbnQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhhbmRsZVNjcm9sbFRpbWVvdXRJRCk7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlclNjcm9sbEV2ZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudCh0aGlzLmdldENvbnRhaW5lcigpLCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUodGhyb3R0bGVUaW1lKDUwKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlU2Nyb2xsKCkpO1xuICAgIH0pO1xuICAgIC8vIEJyb3dzZXIgd291bGQgbWFpbnRhaW4gdGhlIHNjcm9sbGluZyBwb3NpdGlvbiB3aGVuIHJlZnJlc2hpbmcuXG4gICAgLy8gU28gd2UgaGF2ZSB0byBkZWxheSBjYWxjdWxhdGlvbiBpbiBhdm9pZCBvZiBnZXR0aW5nIGEgaW5jb3JyZWN0IHJlc3VsdC5cbiAgICB0aGlzLmhhbmRsZVNjcm9sbFRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oYW5kbGVTY3JvbGwoKSk7XG4gIH1cblxuICBoYW5kbGVTY3JvbGwoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgdGhpcy5hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZWN0aW9uczogU2VjdGlvbltdID0gW107XG4gICAgY29uc3Qgc2NvcGUgPSAodGhpcy5uek9mZnNldFRvcCB8fCAwKSArIHRoaXMubnpCb3VuZHM7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgY29uc3Qgc2hhcnBMaW5rTWF0Y2ggPSBzaGFycE1hdGNoZXJSZWd4LmV4ZWMoY29tcC5uekhyZWYudG9TdHJpbmcoKSk7XG4gICAgICBpZiAoIXNoYXJwTGlua01hdGNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKHNoYXJwTGlua01hdGNoWzFdKTtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdG9wID0gZ2V0T2Zmc2V0VG9wKHRhcmdldCwgdGhpcy5nZXRDb250YWluZXIoKSk7XG4gICAgICAgIGlmICh0b3AgPCBzY29wZSkge1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2goe1xuICAgICAgICAgICAgdG9wLFxuICAgICAgICAgICAgY29tcFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnZpc2libGUgPSAhIXNlY3Rpb25zLmxlbmd0aDtcbiAgICBpZiAoIXRoaXMudmlzaWJsZSkge1xuICAgICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXhTZWN0aW9uID0gc2VjdGlvbnMucmVkdWNlKChwcmV2LCBjdXJyKSA9PiAoY3Vyci50b3AgPiBwcmV2LnRvcCA/IGN1cnIgOiBwcmV2KSk7XG4gICAgICB0aGlzLmhhbmRsZUFjdGl2ZShtYXhTZWN0aW9uLmNvbXApO1xuICAgIH1cbiAgICB0aGlzLnNldFZpc2libGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJBY3RpdmUoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rcy5mb3JFYWNoKGkgPT4ge1xuICAgICAgaS51bnNldEFjdGl2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVBY3RpdmUoY29tcDogTnpBbmNob3JMaW5rQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckFjdGl2ZSgpO1xuICAgIGNvbXAuc2V0QWN0aXZlKCk7XG4gICAgY29uc3QgbGlua05vZGUgPSBjb21wLmdldExpbmtUaXRsZUVsZW1lbnQoKTtcbiAgICB0aGlzLmluay5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGAke2xpbmtOb2RlLm9mZnNldFRvcCArIGxpbmtOb2RlLmNsaWVudEhlaWdodCAvIDIgLSA0LjV9cHhgO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5zZXRWaXNpYmxlKCk7XG4gICAgdGhpcy5uelNjcm9sbC5lbWl0KGNvbXApO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRWaXNpYmxlKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGU7XG4gICAgY29uc3QgdmlzaWJsZUNsYXNzbmFtZSA9ICd2aXNpYmxlJztcbiAgICBpZiAodGhpcy5pbmspIHtcbiAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5pbmsubmF0aXZlRWxlbWVudCwgdmlzaWJsZUNsYXNzbmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaW5rLm5hdGl2ZUVsZW1lbnQsIHZpc2libGVDbGFzc25hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNjcm9sbFRvKGxpbmtDb21wOiBOekFuY2hvckxpbmtDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IobGlua0NvbXAubnpIcmVmKTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGNvbnRhaW5lclNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsU3J2LmdldFNjcm9sbCh0aGlzLmdldENvbnRhaW5lcigpKTtcbiAgICBjb25zdCBlbE9mZnNldFRvcCA9IGdldE9mZnNldFRvcChlbCwgdGhpcy5nZXRDb250YWluZXIoKSk7XG4gICAgY29uc3QgdGFyZ2V0U2Nyb2xsVG9wID0gY29udGFpbmVyU2Nyb2xsVG9wICsgZWxPZmZzZXRUb3AgLSAodGhpcy5uek9mZnNldFRvcCB8fCAwKTtcbiAgICB0aGlzLnNjcm9sbFNydi5zY3JvbGxUbyh0aGlzLmdldENvbnRhaW5lcigpLCB0YXJnZXRTY3JvbGxUb3AsIHtcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlQWN0aXZlKGxpbmtDb21wKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm56Q2xpY2suZW1pdChsaW5rQ29tcC5uekhyZWYpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpPZmZzZXRUb3AsIG56Q29udGFpbmVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuek9mZnNldFRvcCkge1xuICAgICAgdGhpcy53cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICdtYXgtaGVpZ2h0JzogYGNhbGMoMTAwdmggLSAke3RoaXMubnpPZmZzZXRUb3B9cHgpYFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG56Q29udGFpbmVyKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLm56Q29udGFpbmVyO1xuICAgICAgdGhpcy5jb250YWluZXIgPSB0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJyA/IHRoaXMuZG9jLnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKSA6IGNvbnRhaW5lcjtcbiAgICAgIHRoaXMucmVnaXN0ZXJTY3JvbGxFdmVudCgpO1xuICAgIH1cbiAgfVxufVxuIl19