/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class NzStringTemplateOutletDirective {
    constructor(viewContainer, templateRef) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.embeddedViewRef = null;
        this.context = new NzStringTemplateOutletContext();
        this.nzStringTemplateOutletContext = null;
        this.nzStringTemplateOutlet = null;
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    recreateView() {
        this.viewContainer.clear();
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const templateRef = (isTemplateRef ? this.nzStringTemplateOutlet : this.templateRef);
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(templateRef, isTemplateRef ? this.nzStringTemplateOutletContext : this.context);
    }
    updateContext() {
        const isTemplateRef = this.nzStringTemplateOutlet instanceof TemplateRef;
        const newCtx = isTemplateRef ? this.nzStringTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef.context;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }
    ngOnChanges(changes) {
        const { nzStringTemplateOutletContext, nzStringTemplateOutlet } = changes;
        const shouldRecreateView = () => {
            let shouldOutletRecreate = false;
            if (nzStringTemplateOutlet) {
                if (nzStringTemplateOutlet.firstChange) {
                    shouldOutletRecreate = true;
                }
                else {
                    const isPreviousOutletTemplate = nzStringTemplateOutlet.previousValue instanceof TemplateRef;
                    const isCurrentOutletTemplate = nzStringTemplateOutlet.currentValue instanceof TemplateRef;
                    shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
                }
            }
            const hasContextShapeChanged = (ctxChange) => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            };
            const shouldContextRecreate = nzStringTemplateOutletContext && hasContextShapeChanged(nzStringTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };
        if (nzStringTemplateOutlet) {
            this.context.$implicit = nzStringTemplateOutlet.currentValue;
        }
        const recreateView = shouldRecreateView();
        if (recreateView) {
            /** recreate view when context shape or outlet change **/
            this.recreateView();
        }
        else {
            /** update context **/
            this.updateContext();
        }
    }
}
NzStringTemplateOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nzStringTemplateOutlet]',
                exportAs: 'nzStringTemplateOutlet'
            },] }
];
NzStringTemplateOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef }
];
NzStringTemplateOutletDirective.propDecorators = {
    nzStringTemplateOutletContext: [{ type: Input }],
    nzStringTemplateOutlet: [{ type: Input }]
};
export class NzStringTemplateOutletContext {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nX3RlbXBsYXRlX291dGxldC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvcmUvb3V0bGV0LyIsInNvdXJjZXMiOlsic3RyaW5nX3RlbXBsYXRlX291dGxldC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBbUIsS0FBSyxFQUEwQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPekksTUFBTSxPQUFPLCtCQUErQjtJQStCMUMsWUFBb0IsYUFBK0IsRUFBVSxXQUFtQztRQUE1RSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBd0I7UUE5QnhGLG9CQUFlLEdBQXNDLElBQUksQ0FBQztRQUMxRCxZQUFPLEdBQUcsSUFBSSw2QkFBNkIsRUFBRSxDQUFDO1FBQzdDLGtDQUE2QixHQUFxQixJQUFJLENBQUM7UUFDdkQsMkJBQXNCLEdBQXVDLElBQUksQ0FBQztJQTJCd0IsQ0FBQztJQXpCcEcsTUFBTSxDQUFDLHNCQUFzQixDQUFJLElBQXdDLEVBQUUsSUFBZTtRQUN4RixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixZQUFZLFdBQVcsQ0FBQztRQUN6RSxNQUFNLFdBQVcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFjLENBQUM7UUFDbEcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUMxRCxXQUFXLEVBQ1gsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENB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QUFPLDZCQUE2QjtDQUV6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbnpTdHJpbmdUZW1wbGF0ZU91dGxldF0nLFxuICBleHBvcnRBczogJ256U3RyaW5nVGVtcGxhdGVPdXRsZXQnXG59KVxuZXhwb3J0IGNsYXNzIE56U3RyaW5nVGVtcGxhdGVPdXRsZXREaXJlY3RpdmU8X1QgPSB1bmtub3duPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNvbnRleHQgPSBuZXcgTnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQoKTtcbiAgQElucHV0KCkgbnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQ6IE56U2FmZUFueSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelN0cmluZ1RlbXBsYXRlT3V0bGV0OiBOelNhZmVBbnkgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+ID0gbnVsbDtcblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxUPihfZGlyOiBOelN0cmluZ1RlbXBsYXRlT3V0bGV0RGlyZWN0aXZlPFQ+LCBfY3R4OiBOelNhZmVBbnkpOiBfY3R4IGlzIE56U3RyaW5nVGVtcGxhdGVPdXRsZXRDb250ZXh0IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVjcmVhdGVWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIGNvbnN0IGlzVGVtcGxhdGVSZWYgPSB0aGlzLm56U3RyaW5nVGVtcGxhdGVPdXRsZXQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICBjb25zdCB0ZW1wbGF0ZVJlZiA9IChpc1RlbXBsYXRlUmVmID8gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0IDogdGhpcy50ZW1wbGF0ZVJlZikgYXMgTnpTYWZlQW55O1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRlbXBsYXRlUmVmLFxuICAgICAgaXNUZW1wbGF0ZVJlZiA/IHRoaXMubnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQgOiB0aGlzLmNvbnRleHRcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb250ZXh0KCk6IHZvaWQge1xuICAgIGNvbnN0IGlzVGVtcGxhdGVSZWYgPSB0aGlzLm56U3RyaW5nVGVtcGxhdGVPdXRsZXQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICBjb25zdCBuZXdDdHggPSBpc1RlbXBsYXRlUmVmID8gdGhpcy5uelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCA6IHRoaXMuY29udGV4dDtcbiAgICBjb25zdCBvbGRDdHggPSB0aGlzLmVtYmVkZGVkVmlld1JlZiEuY29udGV4dCBhcyBOelNhZmVBbnk7XG4gICAgaWYgKG5ld0N0eCkge1xuICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBPYmplY3Qua2V5cyhuZXdDdHgpKSB7XG4gICAgICAgIG9sZEN0eFtwcm9wTmFtZV0gPSBuZXdDdHhbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TnpTYWZlQW55Pikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCwgbnpTdHJpbmdUZW1wbGF0ZU91dGxldCB9ID0gY2hhbmdlcztcbiAgICBjb25zdCBzaG91bGRSZWNyZWF0ZVZpZXcgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBsZXQgc2hvdWxkT3V0bGV0UmVjcmVhdGUgPSBmYWxzZTtcbiAgICAgIGlmIChuelN0cmluZ1RlbXBsYXRlT3V0bGV0KSB7XG4gICAgICAgIGlmIChuelN0cmluZ1RlbXBsYXRlT3V0bGV0LmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgc2hvdWxkT3V0bGV0UmVjcmVhdGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlzUHJldmlvdXNPdXRsZXRUZW1wbGF0ZSA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXQucHJldmlvdXNWYWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgICAgICAgIGNvbnN0IGlzQ3VycmVudE91dGxldFRlbXBsYXRlID0gbnpTdHJpbmdUZW1wbGF0ZU91dGxldC5jdXJyZW50VmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICAgICAgICBzaG91bGRPdXRsZXRSZWNyZWF0ZSA9IGlzUHJldmlvdXNPdXRsZXRUZW1wbGF0ZSB8fCBpc0N1cnJlbnRPdXRsZXRUZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgaGFzQ29udGV4dFNoYXBlQ2hhbmdlZCA9IChjdHhDaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBwcmV2Q3R4S2V5cyA9IE9iamVjdC5rZXlzKGN0eENoYW5nZS5wcmV2aW91c1ZhbHVlIHx8IHt9KTtcbiAgICAgICAgY29uc3QgY3VyckN0eEtleXMgPSBPYmplY3Qua2V5cyhjdHhDaGFuZ2UuY3VycmVudFZhbHVlIHx8IHt9KTtcbiAgICAgICAgaWYgKHByZXZDdHhLZXlzLmxlbmd0aCA9PT0gY3VyckN0eEtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBjdXJyQ3R4S2V5cykge1xuICAgICAgICAgICAgaWYgKHByZXZDdHhLZXlzLmluZGV4T2YocHJvcE5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2hvdWxkQ29udGV4dFJlY3JlYXRlID0gbnpTdHJpbmdUZW1wbGF0ZU91dGxldENvbnRleHQgJiYgaGFzQ29udGV4dFNoYXBlQ2hhbmdlZChuelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCk7XG4gICAgICByZXR1cm4gc2hvdWxkQ29udGV4dFJlY3JlYXRlIHx8IHNob3VsZE91dGxldFJlY3JlYXRlO1xuICAgIH07XG5cbiAgICBpZiAobnpTdHJpbmdUZW1wbGF0ZU91dGxldCkge1xuICAgICAgdGhpcy5jb250ZXh0LiRpbXBsaWNpdCA9IG56U3RyaW5nVGVtcGxhdGVPdXRsZXQuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlY3JlYXRlVmlldyA9IHNob3VsZFJlY3JlYXRlVmlldygpO1xuICAgIGlmIChyZWNyZWF0ZVZpZXcpIHtcbiAgICAgIC8qKiByZWNyZWF0ZSB2aWV3IHdoZW4gY29udGV4dCBzaGFwZSBvciBvdXRsZXQgY2hhbmdlICoqL1xuICAgICAgdGhpcy5yZWNyZWF0ZVZpZXcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLyoqIHVwZGF0ZSBjb250ZXh0ICoqL1xuICAgICAgdGhpcy51cGRhdGVDb250ZXh0KCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOelN0cmluZ1RlbXBsYXRlT3V0bGV0Q29udGV4dCB7XG4gIHB1YmxpYyAkaW1wbGljaXQ6IE56U2FmZUFueTtcbn1cbiJdfQ==