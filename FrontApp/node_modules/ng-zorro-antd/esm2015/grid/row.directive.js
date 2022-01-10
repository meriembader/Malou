/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input, NgZone, Renderer2 } from '@angular/core';
import { gridResponsiveMap, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzRowDirective {
    constructor(elementRef, renderer, mediaMatcher, ngZone, platform, breakpointService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.mediaMatcher = mediaMatcher;
        this.ngZone = ngZone;
        this.platform = platform;
        this.breakpointService = breakpointService;
        this.nzAlign = null;
        this.nzJustify = null;
        this.nzGutter = null;
        this.actualGutter$ = new ReplaySubject(1);
        this.destroy$ = new Subject();
    }
    getGutter() {
        const results = [null, null];
        const gutter = this.nzGutter || 0;
        const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
        normalizedGutter.forEach((g, index) => {
            if (typeof g === 'object' && g !== null) {
                results[index] = null;
                Object.keys(gridResponsiveMap).map((screen) => {
                    const bp = screen;
                    if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
                        results[index] = g[bp];
                    }
                });
            }
            else {
                results[index] = g || null;
            }
        });
        return results;
    }
    setGutterStyle() {
        const [horizontalGutter, verticalGutter] = this.getGutter();
        this.actualGutter$.next([horizontalGutter, verticalGutter]);
        const renderGutter = (name, gutter) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
                this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
            }
        };
        renderGutter('margin-left', horizontalGutter);
        renderGutter('margin-right', horizontalGutter);
        renderGutter('margin-top', verticalGutter);
        renderGutter('margin-bottom', verticalGutter);
    }
    ngOnInit() {
        this.setGutterStyle();
    }
    ngOnChanges(changes) {
        if (changes.nzGutter) {
            this.setGutterStyle();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.breakpointService
                .subscribe(gridResponsiveMap)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.setGutterStyle();
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-row],nz-row,nz-form-item',
                exportAs: 'nzRow',
                host: {
                    '[class.ant-row]': `true`,
                    '[class.ant-row-top]': `nzAlign === 'top'`,
                    '[class.ant-row-middle]': `nzAlign === 'middle'`,
                    '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
                    '[class.ant-row-start]': `nzJustify === 'start'`,
                    '[class.ant-row-end]': `nzJustify === 'end'`,
                    '[class.ant-row-center]': `nzJustify === 'center'`,
                    '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
                    '[class.ant-row-space-between]': `nzJustify === 'space-between'`
                }
            },] }
];
NzRowDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: MediaMatcher },
    { type: NgZone },
    { type: Platform },
    { type: NzBreakpointService }
];
NzRowDirective.propDecorators = {
    nzAlign: [{ type: Input }],
    nzJustify: [{ type: Input }],
    nzGutter: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZ3JpZC8iLCJzb3VyY2VzIjpbInJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZ0MsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLG1CQUFtQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBb0IzQyxNQUFNLE9BQU8sY0FBYztJQTRDekIsWUFDUyxVQUFzQixFQUN0QixRQUFtQixFQUNuQixZQUEwQixFQUMxQixNQUFjLEVBQ2QsUUFBa0IsRUFDakIsaUJBQXNDO1FBTHZDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNqQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXFCO1FBakR2QyxZQUFPLEdBQW1CLElBQUksQ0FBQztRQUMvQixjQUFTLEdBQXFCLElBQUksQ0FBQztRQUNuQyxhQUFRLEdBQTRGLElBQUksQ0FBQztRQUV6RyxrQkFBYSxHQUFHLElBQUksYUFBYSxDQUFpQyxDQUFDLENBQUMsQ0FBQztRQUU3RCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUs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RCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTVGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLElBQUksRUFBRTtvQkFDSixpQkFBaUIsRUFBRSxNQUFNO29CQUN6QixxQkFBcUIsRUFBRSxtQkFBbUI7b0JBQzFDLHdCQUF3QixFQUFFLHNCQUFzQjtvQkFDaEQsd0JBQXdCLEVBQUUsc0JBQXNCO29CQUNoRCx1QkFBdUIsRUFBRSx1QkFBdUI7b0JBQ2hELHFCQUFxQixFQUFFLHFCQUFxQjtvQkFDNUMsd0JBQXdCLEVBQUUsd0JBQXdCO29CQUNsRCw4QkFBOEIsRUFBRSw4QkFBOEI7b0JBQzlELCtCQUErQixFQUFFLCtCQUErQjtpQkFDakU7YUFDRjs7O1lBdkJrQyxVQUFVO1lBQStDLFNBQVM7WUFGNUYsWUFBWTtZQUVpQyxNQUFNO1lBRG5ELFFBQVE7WUFFNEIsbUJBQW1COzs7c0JBd0I3RCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE1lZGlhTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdyaWRSZXNwb25zaXZlTWFwLCBOekJyZWFrcG9pbnRLZXksIE56QnJlYWtwb2ludFNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgSW5kZXhhYmxlT2JqZWN0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgTnpKdXN0aWZ5ID0gJ3N0YXJ0JyB8ICdlbmQnIHwgJ2NlbnRlcicgfCAnc3BhY2UtYXJvdW5kJyB8ICdzcGFjZS1iZXR3ZWVuJztcbmV4cG9ydCB0eXBlIE56QWxpZ24gPSAndG9wJyB8ICdtaWRkbGUnIHwgJ2JvdHRvbSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuei1yb3ddLG56LXJvdyxuei1mb3JtLWl0ZW0nLFxuICBleHBvcnRBczogJ256Um93JyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXJvd10nOiBgdHJ1ZWAsXG4gICAgJ1tjbGFzcy5hbnQtcm93LXRvcF0nOiBgbnpBbGlnbiA9PT0gJ3RvcCdgLFxuICAgICdbY2xhc3MuYW50LXJvdy1taWRkbGVdJzogYG56QWxpZ24gPT09ICdtaWRkbGUnYCxcbiAgICAnW2NsYXNzLmFudC1yb3ctYm90dG9tXSc6IGBuekFsaWduID09PSAnYm90dG9tJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcm93LXN0YXJ0XSc6IGBuekp1c3RpZnkgPT09ICdzdGFydCdgLFxuICAgICdbY2xhc3MuYW50LXJvdy1lbmRdJzogYG56SnVzdGlmeSA9PT0gJ2VuZCdgLFxuICAgICdbY2xhc3MuYW50LXJvdy1jZW50ZXJdJzogYG56SnVzdGlmeSA9PT0gJ2NlbnRlcidgLFxuICAgICdbY2xhc3MuYW50LXJvdy1zcGFjZS1hcm91bmRdJzogYG56SnVzdGlmeSA9PT0gJ3NwYWNlLWFyb3VuZCdgLFxuICAgICdbY2xhc3MuYW50LXJvdy1zcGFjZS1iZXR3ZWVuXSc6IGBuekp1c3RpZnkgPT09ICdzcGFjZS1iZXR3ZWVuJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBuekFsaWduOiBOekFsaWduIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56SnVzdGlmeTogTnpKdXN0aWZ5IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56R3V0dGVyOiBudW1iZXIgfCBJbmRleGFibGVPYmplY3QgfCBbbnVtYmVyLCBudW1iZXJdIHwgW0luZGV4YWJsZU9iamVjdCwgSW5kZXhhYmxlT2JqZWN0XSB8IG51bGwgPSBudWxsO1xuXG4gIHJlYWRvbmx5IGFjdHVhbEd1dHRlciQgPSBuZXcgUmVwbGF5U3ViamVjdDxbbnVtYmVyIHwgbnVsbCwgbnVtYmVyIHwgbnVsbF0+KDEpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGdldEd1dHRlcigpOiBbbnVtYmVyIHwgbnVsbCwgbnVtYmVyIHwgbnVsbF0ge1xuICAgIGNvbnN0IHJlc3VsdHM6IFtudW1iZXIgfCBudWxsLCBudW1iZXIgfCBudWxsXSA9IFtudWxsLCBudWxsXTtcbiAgICBjb25zdCBndXR0ZXIgPSB0aGlzLm56R3V0dGVyIHx8IDA7XG4gICAgY29uc3Qgbm9ybWFsaXplZEd1dHRlciA9IEFycmF5LmlzQXJyYXkoZ3V0dGVyKSA/IGd1dHRlciA6IFtndXR0ZXIsIG51bGxdO1xuICAgIG5vcm1hbGl6ZWRHdXR0ZXIuZm9yRWFjaCgoZywgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZyA9PT0gJ29iamVjdCcgJiYgZyAhPT0gbnVsbCkge1xuICAgICAgICByZXN1bHRzW2luZGV4XSA9IG51bGw7XG4gICAgICAgIE9iamVjdC5rZXlzKGdyaWRSZXNwb25zaXZlTWFwKS5tYXAoKHNjcmVlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgYnAgPSBzY3JlZW4gYXMgTnpCcmVha3BvaW50S2V5O1xuICAgICAgICAgIGlmICh0aGlzLm1lZGlhTWF0Y2hlci5tYXRjaE1lZGlhKGdyaWRSZXNwb25zaXZlTWFwW2JwXSkubWF0Y2hlcyAmJiBnW2JwXSkge1xuICAgICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSBnIVticF0gYXMgbnVtYmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRzW2luZGV4XSA9IGcgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIHNldEd1dHRlclN0eWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IFtob3Jpem9udGFsR3V0dGVyLCB2ZXJ0aWNhbEd1dHRlcl0gPSB0aGlzLmdldEd1dHRlcigpO1xuICAgIHRoaXMuYWN0dWFsR3V0dGVyJC5uZXh0KFtob3Jpem9udGFsR3V0dGVyLCB2ZXJ0aWNhbEd1dHRlcl0pO1xuICAgIGNvbnN0IHJlbmRlckd1dHRlciA9IChuYW1lOiBzdHJpbmcsIGd1dHRlcjogbnVtYmVyIHwgbnVsbCkgPT4ge1xuICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgaWYgKGd1dHRlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsZW1lbnQsIG5hbWUsIGAtJHtndXR0ZXIgLyAyfXB4YCk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZW5kZXJHdXR0ZXIoJ21hcmdpbi1sZWZ0JywgaG9yaXpvbnRhbEd1dHRlcik7XG4gICAgcmVuZGVyR3V0dGVyKCdtYXJnaW4tcmlnaHQnLCBob3Jpem9udGFsR3V0dGVyKTtcbiAgICByZW5kZXJHdXR0ZXIoJ21hcmdpbi10b3AnLCB2ZXJ0aWNhbEd1dHRlcik7XG4gICAgcmVuZGVyR3V0dGVyKCdtYXJnaW4tYm90dG9tJywgdmVydGljYWxHdXR0ZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHVibGljIG1lZGlhTWF0Y2hlcjogTWVkaWFNYXRjaGVyLFxuICAgIHB1YmxpYyBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwdWJsaWMgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IE56QnJlYWtwb2ludFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0R3V0dGVyU3R5bGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uekd1dHRlcikge1xuICAgICAgdGhpcy5zZXRHdXR0ZXJTdHlsZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMuYnJlYWtwb2ludFNlcnZpY2VcbiAgICAgICAgLnN1YnNjcmliZShncmlkUmVzcG9uc2l2ZU1hcClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldEd1dHRlclN0eWxlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19