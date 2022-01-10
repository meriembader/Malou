import { __rest } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerServiceModule } from './drawer.service.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "./drawer.service.module";
export class DrawerBuilderForService {
    constructor(overlay, options) {
        this.overlay = overlay;
        this.options = options;
        this.unsubscribe$ = new Subject();
        /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
        const _a = this.options, { nzOnCancel } = _a, componentOption = __rest(_a, ["nzOnCancel"]);
        this.overlayRef = this.overlay.create();
        this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent)).instance;
        this.updateOptions(componentOption);
        // Prevent repeatedly open drawer when tap focus element.
        this.drawerRef.savePreviouslyFocusedElement();
        this.drawerRef.nzOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.drawerRef.open();
        });
        this.drawerRef.nzOnClose.subscribe(() => {
            if (nzOnCancel) {
                nzOnCancel().then(canClose => {
                    if (canClose !== false) {
                        this.drawerRef.close();
                    }
                });
            }
            else {
                this.drawerRef.close();
            }
        });
        this.drawerRef.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.overlayRef.dispose();
            this.drawerRef = null;
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        });
    }
    getInstance() {
        return this.drawerRef;
    }
    updateOptions(options) {
        Object.assign(this.drawerRef, options);
    }
}
export class NzDrawerService {
    constructor(overlay) {
        this.overlay = overlay;
    }
    create(options) {
        return new DrawerBuilderForService(this.overlay, options).getInstance();
    }
}
NzDrawerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzDrawerService_Factory() { return new NzDrawerService(i0.ɵɵinject(i1.Overlay)); }, token: NzDrawerService, providedIn: i2.NzDrawerServiceModule });
NzDrawerService.decorators = [
    { type: Injectable, args: [{ providedIn: NzDrawerServiceModule },] }
];
NzDrawerService.ctorParameters = () => [
    { type: Overlay }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2RyYXdlci8iLCJzb3VyY2VzIjpbImRyYXdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sc0JBQXNCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFFaEUsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxZQUFvQixPQUFnQixFQUFVLE9BQXdCO1FBQWxELFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUY5RCxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHekMsbUVBQW1FO1FBQ25FLE1BQU0sS0FBcUMsSUFBSSxDQUFDLE9BQU8sRUFBakQsRUFBRSxVQUFVLE9BQXFDLEVBQWhDLGVBQWUsY0FBaEMsY0FBa0MsQ0FBZSxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDekYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM1RSxJQUFJLENBQUMsU0FBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzNCLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTt3QkFDdEIsSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDekI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQW1DO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFHRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO0lBQUcsQ0FBQztJQUV4QyxNQUFNLENBQThDLE9BQXlEO1FBQzNHLE9BQU8sSUFBSSx1QkFBdUIsQ0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hGLENBQUM7Ozs7WUFORixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQUU7OztZQXhEeEMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOekRyYXdlck9wdGlvbnMsIE56RHJhd2VyT3B0aW9uc09mQ29tcG9uZW50IH0gZnJvbSAnLi9kcmF3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBOekRyYXdlclJlZiB9IGZyb20gJy4vZHJhd2VyLXJlZic7XG5pbXBvcnQgeyBOekRyYXdlckNvbXBvbmVudCB9IGZyb20gJy4vZHJhd2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekRyYXdlclNlcnZpY2VNb2R1bGUgfSBmcm9tICcuL2RyYXdlci5zZXJ2aWNlLm1vZHVsZSc7XG5cbmV4cG9ydCBjbGFzcyBEcmF3ZXJCdWlsZGVyRm9yU2VydmljZTxULCBSPiB7XG4gIHByaXZhdGUgZHJhd2VyUmVmOiBOekRyYXdlckNvbXBvbmVudDxULCBSPiB8IG51bGw7XG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSBvcHRpb25zOiBOekRyYXdlck9wdGlvbnMpIHtcbiAgICAvKiogcGljayB7QGxpbmsgTnpEcmF3ZXJPcHRpb25zLm56T25DYW5jZWx9IGFuZCBvbWl0IHRoaXMgb3B0aW9uICovXG4gICAgY29uc3QgeyBuek9uQ2FuY2VsLCAuLi5jb21wb25lbnRPcHRpb24gfSA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKCk7XG4gICAgdGhpcy5kcmF3ZXJSZWYgPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5ldyBDb21wb25lbnRQb3J0YWwoTnpEcmF3ZXJDb21wb25lbnQpKS5pbnN0YW5jZTtcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoY29tcG9uZW50T3B0aW9uKTtcbiAgICAvLyBQcmV2ZW50IHJlcGVhdGVkbHkgb3BlbiBkcmF3ZXIgd2hlbiB0YXAgZm9jdXMgZWxlbWVudC5cbiAgICB0aGlzLmRyYXdlclJlZi5zYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk7XG4gICAgdGhpcy5kcmF3ZXJSZWYubnpPblZpZXdJbml0LnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZHJhd2VyUmVmIS5vcGVuKCk7XG4gICAgfSk7XG4gICAgdGhpcy5kcmF3ZXJSZWYubnpPbkNsb3NlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAobnpPbkNhbmNlbCkge1xuICAgICAgICBuek9uQ2FuY2VsKCkudGhlbihjYW5DbG9zZSA9PiB7XG4gICAgICAgICAgaWYgKGNhbkNsb3NlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5kcmF3ZXJSZWYhLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZHJhd2VyUmVmIS5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmF3ZXJSZWYuYWZ0ZXJDbG9zZS5waXBlKHRha2VVbnRpbCh0aGlzLnVuc3Vic2NyaWJlJCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5kcmF3ZXJSZWYgPSBudWxsO1xuICAgICAgdGhpcy51bnN1YnNjcmliZSQubmV4dCgpO1xuICAgICAgdGhpcy51bnN1YnNjcmliZSQuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluc3RhbmNlKCk6IE56RHJhd2VyUmVmPFQsIFI+IHtcbiAgICByZXR1cm4gdGhpcy5kcmF3ZXJSZWYhO1xuICB9XG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRpb25zOiBOekRyYXdlck9wdGlvbnNPZkNvbXBvbmVudCk6IHZvaWQge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5kcmF3ZXJSZWYhLCBvcHRpb25zKTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46IE56RHJhd2VyU2VydmljZU1vZHVsZSB9KVxuZXhwb3J0IGNsYXNzIE56RHJhd2VyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSkge31cblxuICBjcmVhdGU8VCA9IE56U2FmZUFueSwgRCA9IHVuZGVmaW5lZCwgUiA9IE56U2FmZUFueT4ob3B0aW9uczogTnpEcmF3ZXJPcHRpb25zPFQsIEQgZXh0ZW5kcyB1bmRlZmluZWQgPyB7fSA6IEQ+KTogTnpEcmF3ZXJSZWY8VCwgUj4ge1xuICAgIHJldHVybiBuZXcgRHJhd2VyQnVpbGRlckZvclNlcnZpY2U8VCwgUj4odGhpcy5vdmVybGF5LCBvcHRpb25zKS5nZXRJbnN0YW5jZSgpO1xuICB9XG59XG4iXX0=