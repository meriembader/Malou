/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, Renderer2, ViewEncapsulation } from '@angular/core';
export class NzCheckboxWrapperComponent {
    constructor(renderer, elementRef) {
        this.nzOnChange = new EventEmitter();
        this.checkboxList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
    }
    addCheckbox(value) {
        this.checkboxList.push(value);
    }
    removeCheckbox(value) {
        this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
    }
    onChange() {
        const listOfCheckedValue = this.checkboxList.filter(item => item.nzChecked).map(item => item.nzValue);
        this.nzOnChange.emit(listOfCheckedValue);
    }
}
NzCheckboxWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-checkbox-wrapper',
                exportAs: 'nzCheckboxWrapper',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: ` <ng-content></ng-content> `
            },] }
];
NzCheckboxWrapperComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzCheckboxWrapperComponent.propDecorators = {
    nzOnChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NoZWNrYm94LyIsInNvdXJjZXMiOlsiY2hlY2tib3gtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZbkksTUFBTSxPQUFPLDBCQUEwQjtJQWlCckMsWUFBWSxRQUFtQixFQUFFLFVBQXNCO1FBaEJwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQUN4RCxpQkFBWSxHQUEwQixFQUFFLENBQUM7UUFnQi9DLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFmRCxXQUFXLENBQUMsS0FBMEI7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUEwQjtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0MsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLFFBQVEsRUFBRSw2QkFBNkI7YUFDeEM7OztZQVg4RSxTQUFTO1lBQTNDLFVBQVU7Ozt5QkFhcEQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotY2hlY2tib3gtd3JhcHBlcicsXG4gIGV4cG9ydEFzOiAnbnpDaGVja2JveFdyYXBwZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYFxufSlcbmV4cG9ydCBjbGFzcyBOekNoZWNrYm94V3JhcHBlckNvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOelNhZmVBbnlbXT4oKTtcbiAgcHJpdmF0ZSBjaGVja2JveExpc3Q6IE56Q2hlY2tib3hDb21wb25lbnRbXSA9IFtdO1xuXG4gIGFkZENoZWNrYm94KHZhbHVlOiBOekNoZWNrYm94Q29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveExpc3QucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVDaGVja2JveCh2YWx1ZTogTnpDaGVja2JveENvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tib3hMaXN0LnNwbGljZSh0aGlzLmNoZWNrYm94TGlzdC5pbmRleE9mKHZhbHVlKSwgMSk7XG4gIH1cblxuICBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0T2ZDaGVja2VkVmFsdWUgPSB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIoaXRlbSA9PiBpdGVtLm56Q2hlY2tlZCkubWFwKGl0ZW0gPT4gaXRlbS5uelZhbHVlKTtcbiAgICB0aGlzLm56T25DaGFuZ2UuZW1pdChsaXN0T2ZDaGVja2VkVmFsdWUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1jaGVja2JveC1ncm91cCcpO1xuICB9XG59XG4iXX0=