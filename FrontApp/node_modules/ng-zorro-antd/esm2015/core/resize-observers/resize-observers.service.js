/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { coerceElement } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { Observable, Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Factory that creates a new ResizeObserver and allows us to stub it out in unit tests.
 */
export class NzResizeObserverFactory {
    create(callback) {
        return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    }
}
NzResizeObserverFactory.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeObserverFactory_Factory() { return new NzResizeObserverFactory(); }, token: NzResizeObserverFactory, providedIn: "root" });
NzResizeObserverFactory.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** An injectable service that allows watching elements for changes to their content. */
export class NzResizeObserver {
    constructor(nzResizeObserverFactory) {
        this.nzResizeObserverFactory = nzResizeObserverFactory;
        /** Keeps track of the existing ResizeObservers so they can be reused. */
        this.observedElements = new Map();
    }
    ngOnDestroy() {
        this.observedElements.forEach((_, element) => this.cleanupObserver(element));
    }
    observe(elementOrRef) {
        const element = coerceElement(elementOrRef);
        return new Observable((observer) => {
            const stream = this.observeElement(element);
            const subscription = stream.subscribe(observer);
            return () => {
                subscription.unsubscribe();
                this.unobserveElement(element);
            };
        });
    }
    /**
     * Observes the given element by using the existing ResizeObserver if available, or creating a
     * new one if not.
     */
    observeElement(element) {
        if (!this.observedElements.has(element)) {
            const stream = new Subject();
            const observer = this.nzResizeObserverFactory.create(mutations => stream.next(mutations));
            if (observer) {
                observer.observe(element);
            }
            this.observedElements.set(element, { observer, stream, count: 1 });
        }
        else {
            this.observedElements.get(element).count++;
        }
        return this.observedElements.get(element).stream;
    }
    /**
     * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
     * observing this element.
     */
    unobserveElement(element) {
        if (this.observedElements.has(element)) {
            this.observedElements.get(element).count--;
            if (!this.observedElements.get(element).count) {
                this.cleanupObserver(element);
            }
        }
    }
    /** Clean up the underlying ResizeObserver for the specified element. */
    cleanupObserver(element) {
        if (this.observedElements.has(element)) {
            const { observer, stream } = this.observedElements.get(element);
            if (observer) {
                observer.disconnect();
            }
            stream.complete();
            this.observedElements.delete(element);
        }
    }
}
NzResizeObserver.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzResizeObserver_Factory() { return new NzResizeObserver(i0.ɵɵinject(NzResizeObserverFactory)); }, token: NzResizeObserver, providedIn: "root" });
NzResizeObserver.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
NzResizeObserver.ctorParameters = () => [
    { type: NzResizeObserverFactory }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLW9ic2VydmVycy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb3JlL3Jlc2l6ZS1vYnNlcnZlcnMvIiwic291cmNlcyI6WyJyZXNpemUtb2JzZXJ2ZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBYyxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBWSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRXJEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxNQUFNLENBQUMsUUFBZ0M7UUFDckMsT0FBTyxPQUFPLGNBQWMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckYsQ0FBQzs7OztZQUpGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBT2xDLHdGQUF3RjtBQUV4RixNQUFNLE9BQU8sZ0JBQWdCO0lBVzNCLFlBQW9CLHVCQUFnRDtRQUFoRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBVnBFLHlFQUF5RTtRQUNqRSxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFPL0IsQ0FBQztJQUVtRSxDQUFDO0lBRXhFLFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxPQUFPLENBQUMsWUFBMkM7UUFDakQsTUFBTSxPQUFPLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTVDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxRQUF5QyxFQUFFLEVBQUU7WUFDbEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELE9BQU8sR0FBRyxFQUFFO2dCQUNWLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGNBQWMsQ0FBQyxPQUFnQjtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBeUIsQ0FBQztZQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFGLElBQUksUUFBUSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEU7YUFBTTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7SUFFRDs7O09BR0c7SUFDSyxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUN2QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsQ0FBQyxLQUFLLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7SUFFRCx3RUFBd0U7SUFDaEUsZUFBZSxDQUFDLE9BQWdCO1FBQ3RDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0QyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFFLENBQUM7WUFDakUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7O1lBekVGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQVlhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGNvZXJjZUVsZW1lbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogRmFjdG9yeSB0aGF0IGNyZWF0ZXMgYSBuZXcgUmVzaXplT2JzZXJ2ZXIgYW5kIGFsbG93cyB1cyB0byBzdHViIGl0IG91dCBpbiB1bml0IHRlc3RzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE56UmVzaXplT2JzZXJ2ZXJGYWN0b3J5IHtcbiAgY3JlYXRlKGNhbGxiYWNrOiBSZXNpemVPYnNlcnZlckNhbGxiYWNrKTogUmVzaXplT2JzZXJ2ZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBuZXcgUmVzaXplT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICB9XG59XG5cbi8qKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBhbGxvd3Mgd2F0Y2hpbmcgZWxlbWVudHMgZm9yIGNoYW5nZXMgdG8gdGhlaXIgY29udGVudC4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTnpSZXNpemVPYnNlcnZlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgZXhpc3RpbmcgUmVzaXplT2JzZXJ2ZXJzIHNvIHRoZXkgY2FuIGJlIHJldXNlZC4gKi9cbiAgcHJpdmF0ZSBvYnNlcnZlZEVsZW1lbnRzID0gbmV3IE1hcDxcbiAgICBFbGVtZW50LFxuICAgIHtcbiAgICAgIG9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGw7XG4gICAgICBzdHJlYW06IFN1YmplY3Q8UmVzaXplT2JzZXJ2ZXJFbnRyeVtdPjtcbiAgICAgIGNvdW50OiBudW1iZXI7XG4gICAgfVxuICA+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyRmFjdG9yeTogTnpSZXNpemVPYnNlcnZlckZhY3RvcnkpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5vYnNlcnZlZEVsZW1lbnRzLmZvckVhY2goKF8sIGVsZW1lbnQpID0+IHRoaXMuY2xlYW51cE9ic2VydmVyKGVsZW1lbnQpKTtcbiAgfVxuXG4gIG9ic2VydmUoZWxlbWVudE9yUmVmOiBFbGVtZW50IHwgRWxlbWVudFJlZjxFbGVtZW50Pik6IE9ic2VydmFibGU8UmVzaXplT2JzZXJ2ZXJFbnRyeVtdPiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGNvZXJjZUVsZW1lbnQoZWxlbWVudE9yUmVmKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFJlc2l6ZU9ic2VydmVyRW50cnlbXT4pID0+IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMub2JzZXJ2ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBzdHJlYW0uc3Vic2NyaWJlKG9ic2VydmVyKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudW5vYnNlcnZlRWxlbWVudChlbGVtZW50KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIGdpdmVuIGVsZW1lbnQgYnkgdXNpbmcgdGhlIGV4aXN0aW5nIFJlc2l6ZU9ic2VydmVyIGlmIGF2YWlsYWJsZSwgb3IgY3JlYXRpbmcgYVxuICAgKiBuZXcgb25lIGlmIG5vdC5cbiAgICovXG4gIHByaXZhdGUgb2JzZXJ2ZUVsZW1lbnQoZWxlbWVudDogRWxlbWVudCk6IFN1YmplY3Q8UmVzaXplT2JzZXJ2ZXJFbnRyeVtdPiB7XG4gICAgaWYgKCF0aGlzLm9ic2VydmVkRWxlbWVudHMuaGFzKGVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBuZXcgU3ViamVjdDxSZXNpemVPYnNlcnZlckVudHJ5W10+KCk7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMubnpSZXNpemVPYnNlcnZlckZhY3RvcnkuY3JlYXRlKG11dGF0aW9ucyA9PiBzdHJlYW0ubmV4dChtdXRhdGlvbnMpKTtcbiAgICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5vYnNlcnZlZEVsZW1lbnRzLnNldChlbGVtZW50LCB7IG9ic2VydmVyLCBzdHJlYW0sIGNvdW50OiAxIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9ic2VydmVkRWxlbWVudHMuZ2V0KGVsZW1lbnQpIS5jb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vYnNlcnZlZEVsZW1lbnRzLmdldChlbGVtZW50KSEuc3RyZWFtO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuLW9ic2VydmVzIHRoZSBnaXZlbiBlbGVtZW50IGFuZCBjbGVhbnMgdXAgdGhlIHVuZGVybHlpbmcgUmVzaXplT2JzZXJ2ZXIgaWYgbm9ib2R5IGVsc2UgaXNcbiAgICogb2JzZXJ2aW5nIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIHByaXZhdGUgdW5vYnNlcnZlRWxlbWVudChlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZWRFbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZWRFbGVtZW50cy5nZXQoZWxlbWVudCkhLmNvdW50LS07XG4gICAgICBpZiAoIXRoaXMub2JzZXJ2ZWRFbGVtZW50cy5nZXQoZWxlbWVudCkhLmNvdW50KSB7XG4gICAgICAgIHRoaXMuY2xlYW51cE9ic2VydmVyKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBDbGVhbiB1cCB0aGUgdW5kZXJseWluZyBSZXNpemVPYnNlcnZlciBmb3IgdGhlIHNwZWNpZmllZCBlbGVtZW50LiAqL1xuICBwcml2YXRlIGNsZWFudXBPYnNlcnZlcihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZWRFbGVtZW50cy5oYXMoZWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IHsgb2JzZXJ2ZXIsIHN0cmVhbSB9ID0gdGhpcy5vYnNlcnZlZEVsZW1lbnRzLmdldChlbGVtZW50KSE7XG4gICAgICBpZiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgfVxuICAgICAgc3RyZWFtLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLm9ic2VydmVkRWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuIl19