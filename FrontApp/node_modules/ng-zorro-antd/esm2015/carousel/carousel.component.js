/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, Optional, Output, QueryList, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDragService, NzResizeService } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
import { NzCarouselTransformStrategy } from './strategies/transform-strategy';
import { NZ_CAROUSEL_CUSTOM_STRATEGIES } from './typings';
const NZ_CONFIG_MODULE_NAME = 'carousel';
export class NzCarouselComponent {
    constructor(elementRef, nzConfigService, renderer, cdr, platform, resizeService, nzDragService, customStrategies) {
        this.nzConfigService = nzConfigService;
        this.renderer = renderer;
        this.cdr = cdr;
        this.platform = platform;
        this.resizeService = resizeService;
        this.nzDragService = nzDragService;
        this.customStrategies = customStrategies;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzEffect = 'scrollx';
        this.nzEnableSwipe = true;
        this.nzDots = true;
        this.nzAutoPlay = false;
        this.nzAutoPlaySpeed = 3000;
        this.nzTransitionSpeed = 500;
        this._dotPosition = 'bottom';
        this.nzBeforeChange = new EventEmitter();
        this.nzAfterChange = new EventEmitter();
        this.activeIndex = 0;
        this.vertical = false;
        this.transitionInProgress = null;
        this.destroy$ = new Subject();
        this.gestureRect = null;
        this.pointerDelta = null;
        this.isTransiting = false;
        this.isDragging = false;
        /**
         * Drag carousel.
         */
        this.pointerDown = (event) => {
            if (!this.isDragging && !this.isTransiting && this.nzEnableSwipe) {
                this.clearScheduledTransition();
                this.gestureRect = this.slickListEl.getBoundingClientRect();
                this.nzDragService.requestDraggingSequence(event).subscribe(delta => {
                    var _a;
                    this.pointerDelta = delta;
                    this.isDragging = true;
                    (_a = this.strategy) === null || _a === void 0 ? void 0 : _a.dragging(this.pointerDelta);
                }, () => { }, () => {
                    if (this.nzEnableSwipe && this.isDragging) {
                        const xDelta = this.pointerDelta ? this.pointerDelta.x : 0;
                        // Switch to another slide if delta is bigger than third of the width.
                        if (Math.abs(xDelta) > this.gestureRect.width / 3) {
                            this.goTo(xDelta > 0 ? this.activeIndex - 1 : this.activeIndex + 1);
                        }
                        else {
                            this.goTo(this.activeIndex);
                        }
                        this.gestureRect = null;
                        this.pointerDelta = null;
                    }
                    this.isDragging = false;
                });
            }
        };
        this.nzDotPosition = 'bottom';
        this.renderer.addClass(elementRef.nativeElement, 'ant-carousel');
        this.el = elementRef.nativeElement;
    }
    set nzDotPosition(value) {
        this._dotPosition = value;
        if (value === 'left' || value === 'right') {
            this.vertical = true;
        }
        else {
            this.vertical = false;
        }
    }
    get nzDotPosition() {
        return this._dotPosition;
    }
    ngAfterContentInit() {
        this.markContentActive(0);
    }
    ngAfterViewInit() {
        this.slickListEl = this.slickList.nativeElement;
        this.slickTrackEl = this.slickTrack.nativeElement;
        this.carouselContents.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.markContentActive(0);
            this.layout();
        });
        this.resizeService
            .subscribe()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.layout();
        });
        this.switchStrategy();
        this.markContentActive(0);
        this.layout();
        // If embedded in an entry component, it may do initial render at an inappropriate time.
        // ngZone.onStable won't do this trick
        // TODO: need to change this.
        Promise.resolve().then(() => {
            this.layout();
        });
    }
    ngOnChanges(changes) {
        const { nzEffect, nzDotPosition } = changes;
        if (nzEffect && !nzEffect.isFirstChange()) {
            this.switchStrategy();
            this.markContentActive(0);
            this.layout();
        }
        if (nzDotPosition && !nzDotPosition.isFirstChange()) {
            this.switchStrategy();
            this.markContentActive(0);
            this.layout();
        }
        if (!this.nzAutoPlay || !this.nzAutoPlaySpeed) {
            this.clearScheduledTransition();
        }
        else {
            this.scheduleNextTransition();
        }
    }
    ngOnDestroy() {
        this.clearScheduledTransition();
        if (this.strategy) {
            this.strategy.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    onKeyDown(e) {
        if (e.keyCode === LEFT_ARROW) {
            e.preventDefault();
            this.pre();
        }
        else if (e.keyCode === RIGHT_ARROW) {
            this.next();
            e.preventDefault();
        }
    }
    next() {
        this.goTo(this.activeIndex + 1);
    }
    pre() {
        this.goTo(this.activeIndex - 1);
    }
    goTo(index) {
        if (this.carouselContents && this.carouselContents.length && !this.isTransiting) {
            const length = this.carouselContents.length;
            const from = this.activeIndex;
            const to = (index + length) % length;
            this.isTransiting = true;
            this.nzBeforeChange.emit({ from, to });
            this.strategy.switch(this.activeIndex, index).subscribe(() => {
                this.scheduleNextTransition();
                this.nzAfterChange.emit(index);
                this.isTransiting = false;
            });
            this.markContentActive(to);
            this.cdr.markForCheck();
        }
    }
    switchStrategy() {
        if (this.strategy) {
            this.strategy.dispose();
        }
        // Load custom strategies first.
        const customStrategy = this.customStrategies ? this.customStrategies.find(s => s.name === this.nzEffect) : null;
        if (customStrategy) {
            this.strategy = new customStrategy.strategy(this, this.cdr, this.renderer, this.platform);
            return;
        }
        this.strategy =
            this.nzEffect === 'scrollx'
                ? new NzCarouselTransformStrategy(this, this.cdr, this.renderer, this.platform)
                : new NzCarouselOpacityStrategy(this, this.cdr, this.renderer, this.platform);
    }
    scheduleNextTransition() {
        this.clearScheduledTransition();
        if (this.nzAutoPlay && this.nzAutoPlaySpeed > 0 && this.platform.isBrowser) {
            this.transitionInProgress = setTimeout(() => {
                this.goTo(this.activeIndex + 1);
            }, this.nzAutoPlaySpeed);
        }
    }
    clearScheduledTransition() {
        if (this.transitionInProgress) {
            clearTimeout(this.transitionInProgress);
            this.transitionInProgress = null;
        }
    }
    markContentActive(index) {
        this.activeIndex = index;
        if (this.carouselContents) {
            this.carouselContents.forEach((slide, i) => {
                slide.isActive = index === i;
            });
        }
        this.cdr.markForCheck();
    }
    layout() {
        if (this.strategy) {
            this.strategy.withCarouselContents(this.carouselContents);
        }
    }
}
NzCarouselComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-carousel',
                exportAs: 'nzCarousel',
                preserveWhitespaces: false,
                template: `
    <div class="slick-initialized slick-slider" [class.slick-vertical]="nzDotPosition === 'left' || nzDotPosition === 'right'">
      <div
        #slickList
        class="slick-list"
        tabindex="-1"
        (keydown)="onKeyDown($event)"
        (mousedown)="pointerDown($event)"
        (touchstart)="pointerDown($event)"
      >
        <!-- Render carousel items. -->
        <div class="slick-track" #slickTrack>
          <ng-content></ng-content>
        </div>
      </div>
      <!-- Render dots. -->
      <ul
        class="slick-dots"
        *ngIf="nzDots"
        [class.slick-dots-top]="nzDotPosition === 'top'"
        [class.slick-dots-bottom]="nzDotPosition === 'bottom'"
        [class.slick-dots-left]="nzDotPosition === 'left'"
        [class.slick-dots-right]="nzDotPosition === 'right'"
      >
        <li *ngFor="let content of carouselContents; let i = index" [class.slick-active]="content.isActive" (click)="goTo(i)">
          <ng-template [ngTemplateOutlet]="nzDotRender || renderDotTemplate" [ngTemplateOutletContext]="{ $implicit: i }"></ng-template>
        </li>
      </ul>
    </div>

    <ng-template #renderDotTemplate let-index>
      <button>{{ index + 1 }}</button>
    </ng-template>
  `,
                host: {
                    '[class.ant-carousel-vertical]': 'vertical'
                }
            },] }
];
NzCarouselComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzConfigService },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: Platform },
    { type: NzResizeService },
    { type: NzDragService },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [NZ_CAROUSEL_CUSTOM_STRATEGIES,] }] }
];
NzCarouselComponent.propDecorators = {
    carouselContents: [{ type: ContentChildren, args: [NzCarouselContentDirective,] }],
    slickList: [{ type: ViewChild, args: ['slickList', { static: false },] }],
    slickTrack: [{ type: ViewChild, args: ['slickTrack', { static: false },] }],
    nzDotRender: [{ type: Input }],
    nzEffect: [{ type: Input }],
    nzEnableSwipe: [{ type: Input }],
    nzDots: [{ type: Input }],
    nzAutoPlay: [{ type: Input }],
    nzAutoPlaySpeed: [{ type: Input }],
    nzTransitionSpeed: [{ type: Input }],
    nzDotPosition: [{ type: Input }],
    nzBeforeChange: [{ type: Output }],
    nzAfterChange: [{ type: Output }]
};
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzCarouselComponent.prototype, "nzEffect", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCarouselComponent.prototype, "nzEnableSwipe", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCarouselComponent.prototype, "nzDots", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzCarouselComponent.prototype, "nzAutoPlay", void 0);
__decorate([
    WithConfig(),
    InputNumber(),
    __metadata("design:type", Number)
], NzCarouselComponent.prototype, "nzAutoPlaySpeed", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Object)
], NzCarouselComponent.prototype, "nzTransitionSpeed", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NzCarouselComponent.prototype, "nzDotPosition", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUVULFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBZSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFLTCw2QkFBNkIsRUFFOUIsTUFBTSxXQUFXLENBQUM7QUFFbkIsTUFBTSxxQkFBcUIsR0FBZ0IsVUFBVSxDQUFDO0FBOEN0RCxNQUFNLE9BQU8sbUJBQW1CO0lBd0Q5QixZQUNFLFVBQXNCLEVBQ04sZUFBZ0MsRUFDL0IsUUFBbUIsRUFDbkIsR0FBc0IsRUFDdEIsUUFBa0IsRUFDbEIsYUFBOEIsRUFDOUIsYUFBNEIsRUFDYyxnQkFBa0Q7UUFON0Ysb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDYyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtDO1FBL0R0RyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQWFyQyxhQUFRLEdBQXNCLFNBQVMsQ0FBQztRQUN4QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDN0Isb0JBQWUsR0FBVyxJQUFJLENBQUM7UUFDN0Msc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1FBa0J4QyxpQkFBWSxHQUEwQixRQUFRLENBQUM7UUFFcEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUNyRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFOUQsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFLaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQix5QkFBb0IsR0FBa0IsSUFBSSxDQUFDO1FBRW5DLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGdCQUFXLEdBQXNCLElBQUksQ0FBQztRQUN0QyxpQkFBWSxHQUF5QixJQUFJLENBQUM7UUFDMUMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQW1LM0I7O1dBRUc7UUFDSCxnQkFBVyxHQUFHLENBQUMsS0FBOEIsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBRTVELElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUN6RCxLQUFLLENBQUMsRUFBRTs7b0JBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN2QixNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUM3QyxDQUFDLEVBQ0QsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUNSLEdBQUcsRUFBRTtvQkFDSCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTt3QkFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFM0Qsc0VBQXNFO3dCQUN0RSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFOzRCQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUNyRTs2QkFBTTs0QkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt5QkFDN0I7d0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUMxQjtvQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsQ0FBQyxDQUNGLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQztRQXpMQSxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBOUNELElBQUksYUFBYSxDQUFDLEtBQTRCO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksS0FBSyxLQUFLLE1BQU0sSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQXFDRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBVSxDQUFDLGFBQWEsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsYUFBYSxDQUFDO1FBRW5ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYTthQUNmLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLHdGQUF3RjtRQUN4RixzQ0FBc0M7UUFDdEMsNkJBQTZCO1FBQzdCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFNUMsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksYUFBYSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDN0MsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7YUFBTTtZQUNMLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN6QjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxDQUFDLENBQWdCO1FBQ3hCLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNaO2FBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLFdBQVcsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsR0FBRztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWE7UUFDaEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7UUFFRCxnQ0FBZ0M7UUFDaEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoSCxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUssY0FBYyxDQUFDLFFBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekcsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVE7WUFDWCxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVM7Z0JBQ3pCLENBQUMsQ0FBQyxJQUFJLDJCQUEyQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLElBQUkseUJBQXlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDMUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM3QixZQUFZLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNsQztJQUNILENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBc0NELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7OztZQTdTRixTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO2dCQUNELElBQUksRUFBRTtvQkFDSiwrQkFBK0IsRUFBRSxVQUFVO2lCQUM1QzthQUNGOzs7WUFoRkMsVUFBVTtZQWVVLGVBQWU7WUFObkMsU0FBUztZQVpULGlCQUFpQjtZQUxWLFFBQVE7WUF3Qk8sZUFBZTtZQUE5QixhQUFhO3dDQWlJakIsUUFBUSxZQUFJLE1BQU0sU0FBQyw2QkFBNkI7OzsrQkF4RGxELGVBQWUsU0FBQywwQkFBMEI7d0JBRTFDLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3lCQUN4QyxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFFekMsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFFTCxLQUFLOzZCQWtCTCxNQUFNOzRCQUNOLE1BQU07O0FBMUJnQjtJQUFiLFVBQVUsRUFBRTs7cURBQXlDO0FBQ3hCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7MERBQStCO0FBQzlCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7bURBQXdCO0FBQ3ZCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTs7dURBQTZCO0FBQzdCO0lBQTVCLFVBQVUsRUFBRTtJQUFFLFdBQVcsRUFBRTs7NERBQWdDO0FBQzdDO0lBQWQsV0FBVyxFQUFFOzs4REFBeUI7QUFLaEQ7SUFEQyxVQUFVLEVBQUU7Ozt3REFRWiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IExFRlRfQVJST1csIFJJR0hUX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56RHJhZ1NlcnZpY2UsIE56UmVzaXplU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCBJbnB1dE51bWJlciB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDYXJvdXNlbENvbnRlbnREaXJlY3RpdmUgfSBmcm9tICcuL2Nhcm91c2VsLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56Q2Fyb3VzZWxCYXNlU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvYmFzZS1zdHJhdGVneSc7XG5pbXBvcnQgeyBOekNhcm91c2VsT3BhY2l0eVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL29wYWNpdHktc3RyYXRlZ3knO1xuaW1wb3J0IHsgTnpDYXJvdXNlbFRyYW5zZm9ybVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3RyYW5zZm9ybS1zdHJhdGVneSc7XG5pbXBvcnQge1xuICBGcm9tVG9JbnRlcmZhY2UsXG4gIE56Q2Fyb3VzZWxEb3RQb3NpdGlvbixcbiAgTnpDYXJvdXNlbEVmZmVjdHMsXG4gIE56Q2Fyb3VzZWxTdHJhdGVneVJlZ2lzdHJ5SXRlbSxcbiAgTlpfQ0FST1VTRUxfQ1VTVE9NX1NUUkFURUdJRVMsXG4gIFBvaW50ZXJWZWN0b3Jcbn0gZnJvbSAnLi90eXBpbmdzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdjYXJvdXNlbCc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1jYXJvdXNlbCcsXG4gIGV4cG9ydEFzOiAnbnpDYXJvdXNlbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJzbGljay1pbml0aWFsaXplZCBzbGljay1zbGlkZXJcIiBbY2xhc3Muc2xpY2stdmVydGljYWxdPVwibnpEb3RQb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IG56RG90UG9zaXRpb24gPT09ICdyaWdodCdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgI3NsaWNrTGlzdFxuICAgICAgICBjbGFzcz1cInNsaWNrLWxpc3RcIlxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAobW91c2Vkb3duKT1cInBvaW50ZXJEb3duKCRldmVudClcIlxuICAgICAgICAodG91Y2hzdGFydCk9XCJwb2ludGVyRG93bigkZXZlbnQpXCJcbiAgICAgID5cbiAgICAgICAgPCEtLSBSZW5kZXIgY2Fyb3VzZWwgaXRlbXMuIC0tPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIiAjc2xpY2tUcmFjaz5cbiAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIFJlbmRlciBkb3RzLiAtLT5cbiAgICAgIDx1bFxuICAgICAgICBjbGFzcz1cInNsaWNrLWRvdHNcIlxuICAgICAgICAqbmdJZj1cIm56RG90c1wiXG4gICAgICAgIFtjbGFzcy5zbGljay1kb3RzLXRvcF09XCJuekRvdFBvc2l0aW9uID09PSAndG9wJ1wiXG4gICAgICAgIFtjbGFzcy5zbGljay1kb3RzLWJvdHRvbV09XCJuekRvdFBvc2l0aW9uID09PSAnYm90dG9tJ1wiXG4gICAgICAgIFtjbGFzcy5zbGljay1kb3RzLWxlZnRdPVwibnpEb3RQb3NpdGlvbiA9PT0gJ2xlZnQnXCJcbiAgICAgICAgW2NsYXNzLnNsaWNrLWRvdHMtcmlnaHRdPVwibnpEb3RQb3NpdGlvbiA9PT0gJ3JpZ2h0J1wiXG4gICAgICA+XG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgY29udGVudCBvZiBjYXJvdXNlbENvbnRlbnRzOyBsZXQgaSA9IGluZGV4XCIgW2NsYXNzLnNsaWNrLWFjdGl2ZV09XCJjb250ZW50LmlzQWN0aXZlXCIgKGNsaWNrKT1cImdvVG8oaSlcIj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpEb3RSZW5kZXIgfHwgcmVuZGVyRG90VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGkgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLXRlbXBsYXRlICNyZW5kZXJEb3RUZW1wbGF0ZSBsZXQtaW5kZXg+XG4gICAgICA8YnV0dG9uPnt7IGluZGV4ICsgMSB9fTwvYnV0dG9uPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1jYXJvdXNlbC12ZXJ0aWNhbF0nOiAndmVydGljYWwnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekVuYWJsZVN3aXBlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRvdHM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b1BsYXk6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b1BsYXlTcGVlZDogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelRyYW5zaXRpb25TcGVlZDogTnVtYmVySW5wdXQ7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZSkgY2Fyb3VzZWxDb250ZW50cyE6IFF1ZXJ5TGlzdDxOekNhcm91c2VsQ29udGVudERpcmVjdGl2ZT47XG5cbiAgQFZpZXdDaGlsZCgnc2xpY2tMaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIHNsaWNrTGlzdD86IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3NsaWNrVHJhY2snLCB7IHN0YXRpYzogZmFsc2UgfSkgc2xpY2tUcmFjaz86IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgbnpEb3RSZW5kZXI/OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyIH0+O1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56RWZmZWN0OiBOekNhcm91c2VsRWZmZWN0cyA9ICdzY3JvbGx4JztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpFbmFibGVTd2lwZTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56RG90czogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgQElucHV0Qm9vbGVhbigpIG56QXV0b1BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXROdW1iZXIoKSBuekF1dG9QbGF5U3BlZWQ6IG51bWJlciA9IDMwMDA7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56VHJhbnNpdGlvblNwZWVkID0gNTAwO1xuXG4gIEBJbnB1dCgpXG4gIC8vIEB0cy1pZ25vcmVcbiAgQFdpdGhDb25maWcoKVxuICBzZXQgbnpEb3RQb3NpdGlvbih2YWx1ZTogTnpDYXJvdXNlbERvdFBvc2l0aW9uKSB7XG4gICAgdGhpcy5fZG90UG9zaXRpb24gPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUgPT09ICdsZWZ0JyB8fCB2YWx1ZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy52ZXJ0aWNhbCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEb3RQb3NpdGlvbigpOiBOekNhcm91c2VsRG90UG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9kb3RQb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2RvdFBvc2l0aW9uOiBOekNhcm91c2VsRG90UG9zaXRpb24gPSAnYm90dG9tJztcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpCZWZvcmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZyb21Ub0ludGVyZmFjZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56QWZ0ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBhY3RpdmVJbmRleCA9IDA7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgc2xpY2tMaXN0RWwhOiBIVE1MRWxlbWVudDtcbiAgc2xpY2tUcmFja0VsITogSFRNTEVsZW1lbnQ7XG4gIHN0cmF0ZWd5PzogTnpDYXJvdXNlbEJhc2VTdHJhdGVneTtcbiAgdmVydGljYWwgPSBmYWxzZTtcbiAgdHJhbnNpdGlvbkluUHJvZ3Jlc3M6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGdlc3R1cmVSZWN0OiBDbGllbnRSZWN0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcG9pbnRlckRlbHRhOiBQb2ludGVyVmVjdG9yIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaXNUcmFuc2l0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlYWRvbmx5IG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXNpemVTZXJ2aWNlOiBOelJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBuekRyYWdTZXJ2aWNlOiBOekRyYWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTlpfQ0FST1VTRUxfQ1VTVE9NX1NUUkFURUdJRVMpIHByaXZhdGUgY3VzdG9tU3RyYXRlZ2llczogTnpDYXJvdXNlbFN0cmF0ZWd5UmVnaXN0cnlJdGVtW11cbiAgKSB7XG4gICAgdGhpcy5uekRvdFBvc2l0aW9uID0gJ2JvdHRvbSc7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1jYXJvdXNlbCcpO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrQ29udGVudEFjdGl2ZSgwKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWNrTGlzdEVsID0gdGhpcy5zbGlja0xpc3QhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5zbGlja1RyYWNrRWwgPSB0aGlzLnNsaWNrVHJhY2shLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLmNhcm91c2VsQ29udGVudHMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubWFya0NvbnRlbnRBY3RpdmUoMCk7XG4gICAgICB0aGlzLmxheW91dCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZXNpemVTZXJ2aWNlXG4gICAgICAuc3Vic2NyaWJlKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnN3aXRjaFN0cmF0ZWd5KCk7XG4gICAgdGhpcy5tYXJrQ29udGVudEFjdGl2ZSgwKTtcbiAgICB0aGlzLmxheW91dCgpO1xuXG4gICAgLy8gSWYgZW1iZWRkZWQgaW4gYW4gZW50cnkgY29tcG9uZW50LCBpdCBtYXkgZG8gaW5pdGlhbCByZW5kZXIgYXQgYW4gaW5hcHByb3ByaWF0ZSB0aW1lLlxuICAgIC8vIG5nWm9uZS5vblN0YWJsZSB3b24ndCBkbyB0aGlzIHRyaWNrXG4gICAgLy8gVE9ETzogbmVlZCB0byBjaGFuZ2UgdGhpcy5cbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekVmZmVjdCwgbnpEb3RQb3NpdGlvbiB9ID0gY2hhbmdlcztcblxuICAgIGlmIChuekVmZmVjdCAmJiAhbnpFZmZlY3QuaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLnN3aXRjaFN0cmF0ZWd5KCk7XG4gICAgICB0aGlzLm1hcmtDb250ZW50QWN0aXZlKDApO1xuICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICB9XG5cbiAgICBpZiAobnpEb3RQb3NpdGlvbiAmJiAhbnpEb3RQb3NpdGlvbi5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgIHRoaXMuc3dpdGNoU3RyYXRlZ3koKTtcbiAgICAgIHRoaXMubWFya0NvbnRlbnRBY3RpdmUoMCk7XG4gICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5uekF1dG9QbGF5IHx8ICF0aGlzLm56QXV0b1BsYXlTcGVlZCkge1xuICAgICAgdGhpcy5jbGVhclNjaGVkdWxlZFRyYW5zaXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zY2hlZHVsZU5leHRUcmFuc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclNjaGVkdWxlZFRyYW5zaXRpb24oKTtcbiAgICBpZiAodGhpcy5zdHJhdGVneSkge1xuICAgICAgdGhpcy5zdHJhdGVneS5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBMRUZUX0FSUk9XKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnByZSgpO1xuICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvVG8odGhpcy5hY3RpdmVJbmRleCArIDEpO1xuICB9XG5cbiAgcHJlKCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ubyh0aGlzLmFjdGl2ZUluZGV4IC0gMSk7XG4gIH1cblxuICBnb1RvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYXJvdXNlbENvbnRlbnRzICYmIHRoaXMuY2Fyb3VzZWxDb250ZW50cy5sZW5ndGggJiYgIXRoaXMuaXNUcmFuc2l0aW5nKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmNhcm91c2VsQ29udGVudHMubGVuZ3RoO1xuICAgICAgY29uc3QgZnJvbSA9IHRoaXMuYWN0aXZlSW5kZXg7XG4gICAgICBjb25zdCB0byA9IChpbmRleCArIGxlbmd0aCkgJSBsZW5ndGg7XG4gICAgICB0aGlzLmlzVHJhbnNpdGluZyA9IHRydWU7XG4gICAgICB0aGlzLm56QmVmb3JlQ2hhbmdlLmVtaXQoeyBmcm9tLCB0byB9KTtcbiAgICAgIHRoaXMuc3RyYXRlZ3khLnN3aXRjaCh0aGlzLmFjdGl2ZUluZGV4LCBpbmRleCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU5leHRUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMubnpBZnRlckNoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgICAgdGhpcy5pc1RyYW5zaXRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tYXJrQ29udGVudEFjdGl2ZSh0byk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN3aXRjaFN0cmF0ZWd5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLnN0cmF0ZWd5LmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIGN1c3RvbSBzdHJhdGVnaWVzIGZpcnN0LlxuICAgIGNvbnN0IGN1c3RvbVN0cmF0ZWd5ID0gdGhpcy5jdXN0b21TdHJhdGVnaWVzID8gdGhpcy5jdXN0b21TdHJhdGVnaWVzLmZpbmQocyA9PiBzLm5hbWUgPT09IHRoaXMubnpFZmZlY3QpIDogbnVsbDtcbiAgICBpZiAoY3VzdG9tU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMuc3RyYXRlZ3kgPSBuZXcgKGN1c3RvbVN0cmF0ZWd5LnN0cmF0ZWd5IGFzIE56U2FmZUFueSkodGhpcywgdGhpcy5jZHIsIHRoaXMucmVuZGVyZXIsIHRoaXMucGxhdGZvcm0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RyYXRlZ3kgPVxuICAgICAgdGhpcy5uekVmZmVjdCA9PT0gJ3Njcm9sbHgnXG4gICAgICAgID8gbmV3IE56Q2Fyb3VzZWxUcmFuc2Zvcm1TdHJhdGVneSh0aGlzLCB0aGlzLmNkciwgdGhpcy5yZW5kZXJlciwgdGhpcy5wbGF0Zm9ybSlcbiAgICAgICAgOiBuZXcgTnpDYXJvdXNlbE9wYWNpdHlTdHJhdGVneSh0aGlzLCB0aGlzLmNkciwgdGhpcy5yZW5kZXJlciwgdGhpcy5wbGF0Zm9ybSk7XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlTmV4dFRyYW5zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclNjaGVkdWxlZFRyYW5zaXRpb24oKTtcbiAgICBpZiAodGhpcy5uekF1dG9QbGF5ICYmIHRoaXMubnpBdXRvUGxheVNwZWVkID4gMCAmJiB0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy50cmFuc2l0aW9uSW5Qcm9ncmVzcyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmdvVG8odGhpcy5hY3RpdmVJbmRleCArIDEpO1xuICAgICAgfSwgdGhpcy5uekF1dG9QbGF5U3BlZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJTY2hlZHVsZWRUcmFuc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyYW5zaXRpb25JblByb2dyZXNzKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50cmFuc2l0aW9uSW5Qcm9ncmVzcyk7XG4gICAgICB0aGlzLnRyYW5zaXRpb25JblByb2dyZXNzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1hcmtDb250ZW50QWN0aXZlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG5cbiAgICBpZiAodGhpcy5jYXJvdXNlbENvbnRlbnRzKSB7XG4gICAgICB0aGlzLmNhcm91c2VsQ29udGVudHMuZm9yRWFjaCgoc2xpZGUsIGkpID0+IHtcbiAgICAgICAgc2xpZGUuaXNBY3RpdmUgPSBpbmRleCA9PT0gaTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYWcgY2Fyb3VzZWwuXG4gICAqL1xuICBwb2ludGVyRG93biA9IChldmVudDogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyAmJiAhdGhpcy5pc1RyYW5zaXRpbmcgJiYgdGhpcy5uekVuYWJsZVN3aXBlKSB7XG4gICAgICB0aGlzLmNsZWFyU2NoZWR1bGVkVHJhbnNpdGlvbigpO1xuICAgICAgdGhpcy5nZXN0dXJlUmVjdCA9IHRoaXMuc2xpY2tMaXN0RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgIHRoaXMubnpEcmFnU2VydmljZS5yZXF1ZXN0RHJhZ2dpbmdTZXF1ZW5jZShldmVudCkuc3Vic2NyaWJlKFxuICAgICAgICBkZWx0YSA9PiB7XG4gICAgICAgICAgdGhpcy5wb2ludGVyRGVsdGEgPSBkZWx0YTtcbiAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc3RyYXRlZ3k/LmRyYWdnaW5nKHRoaXMucG9pbnRlckRlbHRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uekVuYWJsZVN3aXBlICYmIHRoaXMuaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgeERlbHRhID0gdGhpcy5wb2ludGVyRGVsdGEgPyB0aGlzLnBvaW50ZXJEZWx0YS54IDogMDtcblxuICAgICAgICAgICAgLy8gU3dpdGNoIHRvIGFub3RoZXIgc2xpZGUgaWYgZGVsdGEgaXMgYmlnZ2VyIHRoYW4gdGhpcmQgb2YgdGhlIHdpZHRoLlxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHhEZWx0YSkgPiB0aGlzLmdlc3R1cmVSZWN0IS53aWR0aCAvIDMpIHtcbiAgICAgICAgICAgICAgdGhpcy5nb1RvKHhEZWx0YSA+IDAgPyB0aGlzLmFjdGl2ZUluZGV4IC0gMSA6IHRoaXMuYWN0aXZlSW5kZXggKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZ29Ubyh0aGlzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlUmVjdCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnBvaW50ZXJEZWx0YSA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGxheW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdHJhdGVneSkge1xuICAgICAgdGhpcy5zdHJhdGVneS53aXRoQ2Fyb3VzZWxDb250ZW50cyh0aGlzLmNhcm91c2VsQ29udGVudHMpO1xuICAgIH1cbiAgfVxufVxuIl19