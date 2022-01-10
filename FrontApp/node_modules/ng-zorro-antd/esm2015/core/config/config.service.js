/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { NZ_CONFIG } from './config';
import * as i0 from "@angular/core";
import * as i1 from "./config";
const isDefined = function (value) {
    return value !== undefined;
};
const ɵ0 = isDefined;
export class NzConfigService {
    constructor(defaultConfig) {
        this.configUpdated$ = new Subject();
        this.config = defaultConfig || {};
    }
    getConfigForComponent(componentName) {
        return this.config[componentName];
    }
    getConfigChangeEventForComponent(componentName) {
        return this.configUpdated$.pipe(filter(n => n === componentName), mapTo(undefined));
    }
    set(componentName, value) {
        this.config[componentName] = Object.assign(Object.assign({}, this.config[componentName]), value);
        this.configUpdated$.next(componentName);
    }
}
NzConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzConfigService_Factory() { return new NzConfigService(i0.ɵɵinject(i1.NZ_CONFIG, 8)); }, token: NzConfigService, providedIn: "root" });
NzConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_CONFIG,] }] }
];
// tslint:disable:no-invalid-this
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// tslint:disable-next-line:typedef
export function WithConfig() {
    return function ConfigDecorator(target, propName, originalDescriptor) {
        const privatePropName = `$$__assignedValue__${propName}`;
        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });
        return {
            get() {
                const originalValue = (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.get) ? originalDescriptor.get.bind(this)() : this[privatePropName];
                const assignedByUser = ((this.assignmentCount || {})[propName] || 0) > 1;
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                }
                const componentConfig = this.nzConfigService.getConfigForComponent(this._nzModuleName) || {};
                const configValue = componentConfig[propName];
                const ret = isDefined(configValue) ? configValue : originalValue;
                return ret;
            },
            set(value) {
                // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                this.assignmentCount = this.assignmentCount || {};
                this.assignmentCount[propName] = (this.assignmentCount[propName] || 0) + 1;
                if (originalDescriptor === null || originalDescriptor === void 0 ? void 0 : originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(value);
                }
                else {
                    this[privatePropName] = value;
                }
            },
            configurable: true,
            enumerable: true
        };
    };
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvY29uZmlnLyIsInNvdXJjZXMiOlsiY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQXlCLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7O0FBRTVELE1BQU0sU0FBUyxHQUFHLFVBQVUsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQzdCLENBQUMsQ0FBQzs7QUFLRixNQUFNLE9BQU8sZUFBZTtJQU0xQixZQUEyQyxhQUF3QjtRQUwzRCxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBTXJELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQscUJBQXFCLENBQXdCLGFBQWdCO1FBQzNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsZ0NBQWdDLENBQUMsYUFBMEI7UUFDekQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxFQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQsR0FBRyxDQUF3QixhQUFnQixFQUFFLEtBQWtCO1FBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLG1DQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUssS0FBSyxDQUFFLENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztZQTNCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs0Q0FPYyxRQUFRLFlBQUksTUFBTSxTQUFDLFNBQVM7O0FBcUIzQyxpQ0FBaUM7QUFFakM7OztHQUdHO0FBQ0gsbUNBQW1DO0FBQ25DLE1BQU0sVUFBVSxVQUFVO0lBQ3hCLE9BQU8sU0FBUyxlQUFlLENBQUMsTUFBaUIsRUFBRSxRQUFtQixFQUFFLGtCQUErQztRQUNySCxNQUFNLGVBQWUsR0FBRyxzQkFBc0IsUUFBUSxFQUFFLENBQUM7UUFFekQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsZUFBZSxFQUFFO1lBQzdDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsT0FBTztZQUNMLEdBQUc7Z0JBQ0QsTUFBTSxhQUFhLEdBQUcsQ0FBQSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1RyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXpFLElBQUksY0FBYyxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDOUMsT0FBTyxhQUFhLENBQUM7aUJBQ3RCO2dCQUVELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0YsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUVqRSxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUM7WUFDRCxHQUFHLENBQUMsS0FBUztnQkFDWCx3RkFBd0Y7Z0JBQ3hGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFM0UsSUFBSSxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxHQUFHLEVBQUU7b0JBQzNCLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQztZQUNELFlBQVksRUFBRSxJQUFJO1lBQ2xCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgZmlsdGVyLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWcsIE56Q29uZmlnS2V5LCBOWl9DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGlzRGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZT86IE56U2FmZUFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE56Q29uZmlnU2VydmljZSB7XG4gIHByaXZhdGUgY29uZmlnVXBkYXRlZCQgPSBuZXcgU3ViamVjdDxrZXlvZiBOekNvbmZpZz4oKTtcblxuICAvKiogR2xvYmFsIGNvbmZpZyBob2xkaW5nIHByb3BlcnR5LiAqL1xuICBwcml2YXRlIGNvbmZpZzogTnpDb25maWc7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOWl9DT05GSUcpIGRlZmF1bHRDb25maWc/OiBOekNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gZGVmYXVsdENvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGdldENvbmZpZ0ZvckNvbXBvbmVudDxUIGV4dGVuZHMgTnpDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQpOiBOekNvbmZpZ1tUXSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdO1xuICB9XG5cbiAgZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoY29tcG9uZW50TmFtZTogTnpDb25maWdLZXkpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jb25maWdVcGRhdGVkJC5waXBlKFxuICAgICAgZmlsdGVyKG4gPT4gbiA9PT0gY29tcG9uZW50TmFtZSksXG4gICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgKTtcbiAgfVxuXG4gIHNldDxUIGV4dGVuZHMgTnpDb25maWdLZXk+KGNvbXBvbmVudE5hbWU6IFQsIHZhbHVlOiBOekNvbmZpZ1tUXSk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnW2NvbXBvbmVudE5hbWVdID0geyAuLi50aGlzLmNvbmZpZ1tjb21wb25lbnROYW1lXSwgLi4udmFsdWUgfTtcbiAgICB0aGlzLmNvbmZpZ1VwZGF0ZWQkLm5leHQoY29tcG9uZW50TmFtZSk7XG4gIH1cbn1cblxuLy8gdHNsaW50OmRpc2FibGU6bm8taW52YWxpZC10aGlzXG5cbi8qKlxuICogVGhpcyBkZWNvcmF0b3IgaXMgdXNlZCB0byBkZWNvcmF0ZSBwcm9wZXJ0aWVzLiBJZiBhIHByb3BlcnR5IGlzIGRlY29yYXRlZCwgaXQgd291bGQgdHJ5IHRvIGxvYWQgZGVmYXVsdCB2YWx1ZSBmcm9tXG4gKiBjb25maWcuXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0eXBlZGVmXG5leHBvcnQgZnVuY3Rpb24gV2l0aENvbmZpZzxUPigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIENvbmZpZ0RlY29yYXRvcih0YXJnZXQ6IE56U2FmZUFueSwgcHJvcE5hbWU6IE56U2FmZUFueSwgb3JpZ2luYWxEZXNjcmlwdG9yPzogVHlwZWRQcm9wZXJ0eURlc2NyaXB0b3I8VD4pOiBOelNhZmVBbnkge1xuICAgIGNvbnN0IHByaXZhdGVQcm9wTmFtZSA9IGAkJF9fYXNzaWduZWRWYWx1ZV9fJHtwcm9wTmFtZX1gO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJpdmF0ZVByb3BOYW1lLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0KCk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBvcmlnaW5hbFZhbHVlID0gb3JpZ2luYWxEZXNjcmlwdG9yPy5nZXQgPyBvcmlnaW5hbERlc2NyaXB0b3IuZ2V0LmJpbmQodGhpcykoKSA6IHRoaXNbcHJpdmF0ZVByb3BOYW1lXTtcbiAgICAgICAgY29uc3QgYXNzaWduZWRCeVVzZXIgPSAoKHRoaXMuYXNzaWdubWVudENvdW50IHx8IHt9KVtwcm9wTmFtZV0gfHwgMCkgPiAxO1xuXG4gICAgICAgIGlmIChhc3NpZ25lZEJ5VXNlciAmJiBpc0RlZmluZWQob3JpZ2luYWxWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudENvbmZpZyA9IHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0ZvckNvbXBvbmVudCh0aGlzLl9uek1vZHVsZU5hbWUpIHx8IHt9O1xuICAgICAgICBjb25zdCBjb25maWdWYWx1ZSA9IGNvbXBvbmVudENvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIGNvbnN0IHJldCA9IGlzRGVmaW5lZChjb25maWdWYWx1ZSkgPyBjb25maWdWYWx1ZSA6IG9yaWdpbmFsVmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG4gICAgICBzZXQodmFsdWU/OiBUKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHRoZSB2YWx1ZSBpcyBhc3NpZ25lZCwgd2UgY29uc2lkZXIgdGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlIGFzICdhc3NpZ25lZCBieSB1c2VyJy5cbiAgICAgICAgdGhpcy5hc3NpZ25tZW50Q291bnQgPSB0aGlzLmFzc2lnbm1lbnRDb3VudCB8fCB7fTtcbiAgICAgICAgdGhpcy5hc3NpZ25tZW50Q291bnRbcHJvcE5hbWVdID0gKHRoaXMuYXNzaWdubWVudENvdW50W3Byb3BOYW1lXSB8fCAwKSArIDE7XG5cbiAgICAgICAgaWYgKG9yaWdpbmFsRGVzY3JpcHRvcj8uc2V0KSB7XG4gICAgICAgICAgb3JpZ2luYWxEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzW3ByaXZhdGVQcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9O1xuICB9O1xufVxuIl19