/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Host, Optional, Renderer2 } from '@angular/core';
import { NzButtonGroupComponent } from 'ng-zorro-antd/button';
export class NzDropdownButtonDirective {
    constructor(renderer, nzButtonGroupComponent, elementRef) {
        this.renderer = renderer;
        this.nzButtonGroupComponent = nzButtonGroupComponent;
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
        if (this.nzButtonGroupComponent && parentElement) {
            this.renderer.addClass(parentElement, 'ant-dropdown-button');
        }
    }
}
NzDropdownButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-button][nz-dropdown]'
            },] }
];
NzDropdownButtonDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: NzButtonGroupComponent, decorators: [{ type: Host }, { type: Optional }] },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24tYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvZHJvcGRvd24vIiwic291cmNlcyI6WyJkcm9wZG93bi1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUs5RCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQ1UsUUFBbUIsRUFDQyxzQkFBOEMsRUFDbEUsVUFBc0I7UUFGdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDbEUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUM3QixDQUFDO0lBQ0osZUFBZTtRQUNiLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLElBQUksYUFBYSxFQUFFO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7O1lBZEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7YUFDckM7OztZQUw4RCxTQUFTO1lBQy9ELHNCQUFzQix1QkFRMUIsSUFBSSxZQUFJLFFBQVE7WUFUYyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0LCBPcHRpb25hbCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekJ1dHRvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnotYnV0dG9uXVtuei1kcm9wZG93bl0nXG59KVxuZXhwb3J0IGNsYXNzIE56RHJvcGRvd25CdXR0b25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuekJ1dHRvbkdyb3VwQ29tcG9uZW50OiBOekJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBpZiAodGhpcy5uekJ1dHRvbkdyb3VwQ29tcG9uZW50ICYmIHBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocGFyZW50RWxlbWVudCwgJ2FudC1kcm9wZG93bi1idXR0b24nKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==