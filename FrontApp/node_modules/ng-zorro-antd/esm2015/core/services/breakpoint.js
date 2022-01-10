/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { NzResizeService } from './resize';
import * as i0 from "@angular/core";
import * as i1 from "./resize";
import * as i2 from "@angular/cdk/layout";
export var NzBreakpointEnum;
(function (NzBreakpointEnum) {
    NzBreakpointEnum["xxl"] = "xxl";
    NzBreakpointEnum["xl"] = "xl";
    NzBreakpointEnum["lg"] = "lg";
    NzBreakpointEnum["md"] = "md";
    NzBreakpointEnum["sm"] = "sm";
    NzBreakpointEnum["xs"] = "xs";
})(NzBreakpointEnum || (NzBreakpointEnum = {}));
export const gridResponsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
export const siderResponsiveMap = {
    xs: '(max-width: 479.98px)',
    sm: '(max-width: 575.98px)',
    md: '(max-width: 767.98px)',
    lg: '(max-width: 991.98px)',
    xl: '(max-width: 1199.98px)',
    xxl: '(max-width: 1599.98px)'
};
export class NzBreakpointService {
    constructor(resizeService, mediaMatcher) {
        this.resizeService = resizeService;
        this.mediaMatcher = mediaMatcher;
        this.resizeService.subscribe().subscribe(() => { });
    }
    subscribe(breakpointMap, fullMap) {
        if (fullMap) {
            const get = () => this.matchMedia(breakpointMap, true);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged((x, y) => x[0] === y[0]), map(x => x[1]));
        }
        else {
            const get = () => this.matchMedia(breakpointMap);
            return this.resizeService.subscribe().pipe(map(get), startWith(get()), distinctUntilChanged());
        }
    }
    matchMedia(breakpointMap, fullMap) {
        let bp = NzBreakpointEnum.md;
        const breakpointBooleanMap = {};
        Object.keys(breakpointMap).map(breakpoint => {
            const castBP = breakpoint;
            const matched = this.mediaMatcher.matchMedia(gridResponsiveMap[castBP]).matches;
            breakpointBooleanMap[breakpoint] = matched;
            if (matched) {
                bp = castBP;
            }
        });
        if (fullMap) {
            return [bp, breakpointBooleanMap];
        }
        else {
            return bp;
        }
    }
}
NzBreakpointService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzBreakpointService_Factory() { return new NzBreakpointService(i0.ɵɵinject(i1.NzResizeService), i0.ɵɵinject(i2.MediaMatcher)); }, token: NzBreakpointService, providedIn: "root" });
NzBreakpointService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzBreakpointService.ctorParameters = () => [
    { type: NzResizeService },
    { type: MediaMatcher }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY29yZS9zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbImJyZWFrcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sVUFBVSxDQUFDOzs7O0FBRTNDLE1BQU0sQ0FBTixJQUFZLGdCQU9YO0FBUEQsV0FBWSxnQkFBZ0I7SUFDMUIsK0JBQVcsQ0FBQTtJQUNYLDZCQUFTLENBQUE7SUFDVCw2QkFBUyxDQUFBO0lBQ1QsNkJBQVMsQ0FBQTtJQUNULDZCQUFTLENBQUE7SUFDVCw2QkFBUyxDQUFBO0FBQ1gsQ0FBQyxFQVBXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFPM0I7QUFNRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBa0I7SUFDOUMsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLEVBQUUsRUFBRSxvQkFBb0I7SUFDeEIsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixFQUFFLEVBQUUscUJBQXFCO0lBQ3pCLEdBQUcsRUFBRSxxQkFBcUI7Q0FDM0IsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFrQjtJQUMvQyxFQUFFLEVBQUUsdUJBQXVCO0lBQzNCLEVBQUUsRUFBRSx1QkFBdUI7SUFDM0IsRUFBRSxFQUFFLHVCQUF1QjtJQUMzQixFQUFFLEVBQUUsdUJBQXVCO0lBQzNCLEVBQUUsRUFBRSx3QkFBd0I7SUFDNUIsR0FBRyxFQUFFLHdCQUF3QjtDQUM5QixDQUFDO0FBS0YsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFvQixhQUE4QixFQUFVLFlBQTBCO1FBQWxFLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3BGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFJRCxTQUFTLENBQUMsYUFBNEIsRUFBRSxPQUFjO1FBQ3BELElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNSLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUNoQixvQkFBb0IsQ0FBQyxDQUFDLENBQTJDLEVBQUUsQ0FBMkMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDZixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1NBQ2hHO0lBQ0gsQ0FBQztJQUlPLFVBQVUsQ0FBQyxhQUE0QixFQUFFLE9BQWM7UUFDN0QsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1FBRTdCLE1BQU0sb0JBQW9CLEdBQWtDLEVBQUUsQ0FBQztRQUUvRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxVQUE4QixDQUFDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBRWhGLG9CQUFvQixDQUFDLFVBQThCLENBQUMsR0FBRyxPQUFPLENBQUM7WUFFL0QsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsRUFBRSxHQUFHLE1BQU0sQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sQ0FBQyxFQUFFLEVBQUUsb0JBQTRDLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7Ozs7WUFoREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFuQ1EsZUFBZTtZQUxmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBNZWRpYU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi9yZXNpemUnO1xuXG5leHBvcnQgZW51bSBOekJyZWFrcG9pbnRFbnVtIHtcbiAgeHhsID0gJ3h4bCcsXG4gIHhsID0gJ3hsJyxcbiAgbGcgPSAnbGcnLFxuICBtZCA9ICdtZCcsXG4gIHNtID0gJ3NtJyxcbiAgeHMgPSAneHMnXG59XG5cbmV4cG9ydCB0eXBlIEJyZWFrcG9pbnRNYXAgPSB7IFtrZXkgaW4gTnpCcmVha3BvaW50RW51bV06IHN0cmluZyB9O1xuZXhwb3J0IHR5cGUgQnJlYWtwb2ludEJvb2xlYW5NYXAgPSB7IFtrZXkgaW4gTnpCcmVha3BvaW50RW51bV06IGJvb2xlYW4gfTtcbmV4cG9ydCB0eXBlIE56QnJlYWtwb2ludEtleSA9IGtleW9mIHR5cGVvZiBOekJyZWFrcG9pbnRFbnVtO1xuXG5leHBvcnQgY29uc3QgZ3JpZFJlc3BvbnNpdmVNYXA6IEJyZWFrcG9pbnRNYXAgPSB7XG4gIHhzOiAnKG1heC13aWR0aDogNTc1cHgpJyxcbiAgc206ICcobWluLXdpZHRoOiA1NzZweCknLFxuICBtZDogJyhtaW4td2lkdGg6IDc2OHB4KScsXG4gIGxnOiAnKG1pbi13aWR0aDogOTkycHgpJyxcbiAgeGw6ICcobWluLXdpZHRoOiAxMjAwcHgpJyxcbiAgeHhsOiAnKG1pbi13aWR0aDogMTYwMHB4KSdcbn07XG5cbmV4cG9ydCBjb25zdCBzaWRlclJlc3BvbnNpdmVNYXA6IEJyZWFrcG9pbnRNYXAgPSB7XG4gIHhzOiAnKG1heC13aWR0aDogNDc5Ljk4cHgpJyxcbiAgc206ICcobWF4LXdpZHRoOiA1NzUuOThweCknLFxuICBtZDogJyhtYXgtd2lkdGg6IDc2Ny45OHB4KScsXG4gIGxnOiAnKG1heC13aWR0aDogOTkxLjk4cHgpJyxcbiAgeGw6ICcobWF4LXdpZHRoOiAxMTk5Ljk4cHgpJyxcbiAgeHhsOiAnKG1heC13aWR0aDogMTU5OS45OHB4KSdcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56QnJlYWtwb2ludFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IE56UmVzaXplU2VydmljZSwgcHJpdmF0ZSBtZWRpYU1hdGNoZXI6IE1lZGlhTWF0Y2hlcikge1xuICAgIHRoaXMucmVzaXplU2VydmljZS5zdWJzY3JpYmUoKS5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICB9XG5cbiAgc3Vic2NyaWJlKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXApOiBPYnNlcnZhYmxlPE56QnJlYWtwb2ludEVudW0+O1xuICBzdWJzY3JpYmUoYnJlYWtwb2ludE1hcDogQnJlYWtwb2ludE1hcCwgZnVsbE1hcDogdHJ1ZSk6IE9ic2VydmFibGU8QnJlYWtwb2ludEJvb2xlYW5NYXA+O1xuICBzdWJzY3JpYmUoYnJlYWtwb2ludE1hcDogQnJlYWtwb2ludE1hcCwgZnVsbE1hcD86IHRydWUpOiBPYnNlcnZhYmxlPE56QnJlYWtwb2ludEVudW0gfCBCcmVha3BvaW50Qm9vbGVhbk1hcD4ge1xuICAgIGlmIChmdWxsTWFwKSB7XG4gICAgICBjb25zdCBnZXQgPSAoKSA9PiB0aGlzLm1hdGNoTWVkaWEoYnJlYWtwb2ludE1hcCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5yZXNpemVTZXJ2aWNlLnN1YnNjcmliZSgpLnBpcGUoXG4gICAgICAgIG1hcChnZXQpLFxuICAgICAgICBzdGFydFdpdGgoZ2V0KCkpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeDogW056QnJlYWtwb2ludEVudW0sIEJyZWFrcG9pbnRCb29sZWFuTWFwXSwgeTogW056QnJlYWtwb2ludEVudW0sIEJyZWFrcG9pbnRCb29sZWFuTWFwXSkgPT4geFswXSA9PT0geVswXSksXG4gICAgICAgIG1hcCh4ID0+IHhbMV0pXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBnZXQgPSAoKSA9PiB0aGlzLm1hdGNoTWVkaWEoYnJlYWtwb2ludE1hcCk7XG4gICAgICByZXR1cm4gdGhpcy5yZXNpemVTZXJ2aWNlLnN1YnNjcmliZSgpLnBpcGUobWFwKGdldCksIHN0YXJ0V2l0aChnZXQoKSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWF0Y2hNZWRpYShicmVha3BvaW50TWFwOiBCcmVha3BvaW50TWFwKTogTnpCcmVha3BvaW50RW51bTtcbiAgcHJpdmF0ZSBtYXRjaE1lZGlhKGJyZWFrcG9pbnRNYXA6IEJyZWFrcG9pbnRNYXAsIGZ1bGxNYXA6IHRydWUpOiBbTnpCcmVha3BvaW50RW51bSwgQnJlYWtwb2ludEJvb2xlYW5NYXBdO1xuICBwcml2YXRlIG1hdGNoTWVkaWEoYnJlYWtwb2ludE1hcDogQnJlYWtwb2ludE1hcCwgZnVsbE1hcD86IHRydWUpOiBOekJyZWFrcG9pbnRFbnVtIHwgW056QnJlYWtwb2ludEVudW0sIEJyZWFrcG9pbnRCb29sZWFuTWFwXSB7XG4gICAgbGV0IGJwID0gTnpCcmVha3BvaW50RW51bS5tZDtcblxuICAgIGNvbnN0IGJyZWFrcG9pbnRCb29sZWFuTWFwOiBQYXJ0aWFsPEJyZWFrcG9pbnRCb29sZWFuTWFwPiA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoYnJlYWtwb2ludE1hcCkubWFwKGJyZWFrcG9pbnQgPT4ge1xuICAgICAgY29uc3QgY2FzdEJQID0gYnJlYWtwb2ludCBhcyBOekJyZWFrcG9pbnRFbnVtO1xuICAgICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMubWVkaWFNYXRjaGVyLm1hdGNoTWVkaWEoZ3JpZFJlc3BvbnNpdmVNYXBbY2FzdEJQXSkubWF0Y2hlcztcblxuICAgICAgYnJlYWtwb2ludEJvb2xlYW5NYXBbYnJlYWtwb2ludCBhcyBOekJyZWFrcG9pbnRFbnVtXSA9IG1hdGNoZWQ7XG5cbiAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgIGJwID0gY2FzdEJQO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGZ1bGxNYXApIHtcbiAgICAgIHJldHVybiBbYnAsIGJyZWFrcG9pbnRCb29sZWFuTWFwIGFzIEJyZWFrcG9pbnRCb29sZWFuTWFwXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJwO1xuICAgIH1cbiAgfVxufVxuIl19