/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
export class NzSelectSearchComponent {
    constructor(elementRef, renderer, focusMonitor) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.focusMonitor = focusMonitor;
        this.disabled = false;
        this.mirrorSync = false;
        this.showInput = true;
        this.focusTrigger = false;
        this.value = '';
        this.autofocus = false;
        this.valueChange = new EventEmitter();
        this.isComposingChange = new EventEmitter();
    }
    setCompositionState(isComposing) {
        this.isComposingChange.next(isComposing);
    }
    onValueChange(value) {
        this.value = value;
        this.valueChange.next(value);
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
    }
    clearInputValue() {
        const inputDOM = this.inputElement.nativeElement;
        inputDOM.value = '';
        this.onValueChange('');
    }
    syncMirrorWidth() {
        const mirrorDOM = this.mirrorElement.nativeElement;
        const hostDOM = this.elementRef.nativeElement;
        const inputDOM = this.inputElement.nativeElement;
        this.renderer.removeStyle(hostDOM, 'width');
        mirrorDOM.innerHTML = `${inputDOM.value}&nbsp;`;
        this.renderer.setStyle(hostDOM, 'width', `${mirrorDOM.scrollWidth}px`);
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    ngOnChanges(changes) {
        const inputDOM = this.inputElement.nativeElement;
        const { focusTrigger, showInput } = changes;
        if (showInput) {
            if (this.showInput) {
                this.renderer.removeAttribute(inputDOM, 'readonly');
            }
            else {
                this.renderer.setAttribute(inputDOM, 'readonly', 'readonly');
            }
        }
        // IE11 cannot input value if focused before removing readonly
        if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
            inputDOM.focus();
        }
    }
    ngAfterViewInit() {
        if (this.mirrorSync) {
            this.syncMirrorWidth();
        }
        if (this.autofocus) {
            this.focus();
        }
    }
}
NzSelectSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-select-search',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <input
      #inputElement
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    <span #mirrorElement *ngIf="mirrorSync" class="ant-select-selection-search-mirror"></span>
  `,
                host: {
                    '[class.ant-select-selection-search]': 'true'
                },
                providers: [{ provide: COMPOSITION_BUFFER_MODE, useValue: false }]
            },] }
];
NzSelectSearchComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: FocusMonitor }
];
NzSelectSearchComponent.propDecorators = {
    disabled: [{ type: Input }],
    mirrorSync: [{ type: Input }],
    showInput: [{ type: Input }],
    focusTrigger: [{ type: Input }],
    value: [{ type: Input }],
    autofocus: [{ type: Input }],
    valueChange: [{ type: Output }],
    isComposingChange: [{ type: Output }],
    inputElement: [{ type: ViewChild, args: ['inputElement', { static: true },] }],
    mirrorElement: [{ type: ViewChild, args: ['mirrorElement', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NlbGVjdC8iLCJzb3VyY2VzIjpbInNlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUVULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUEwQnpELE1BQU0sT0FBTyx1QkFBdUI7SUErQ2xDLFlBQW9CLFVBQXNCLEVBQVUsUUFBbUIsRUFBVSxZQUEwQjtRQUF2RixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBOUNsRyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNSLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6QyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBdUMyQyxDQUFDO0lBbkMvRyxtQkFBbUIsQ0FBQyxXQUFvQjtRQUN0QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN6QixJQUFJLENB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S0FBSzsyQkFDTCxLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxNQUFNO2dDQUNOLE1BQU07MkJBQ04sU0FBUyxTQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7NEJBQzFDLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1zZWxlY3Qtc2VhcmNoJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0XG4gICAgICAjaW5wdXRFbGVtZW50XG4gICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgY2xhc3M9XCJhbnQtc2VsZWN0LXNlbGVjdGlvbi1zZWFyY2gtaW5wdXRcIlxuICAgICAgW25nTW9kZWxdPVwidmFsdWVcIlxuICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cImF1dG9mb2N1cyA/ICdhdXRvZm9jdXMnIDogbnVsbFwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgW3N0eWxlLm9wYWNpdHldPVwic2hvd0lucHV0ID8gbnVsbCA6IDBcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25WYWx1ZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIChjb21wb3NpdGlvbnN0YXJ0KT1cInNldENvbXBvc2l0aW9uU3RhdGUodHJ1ZSlcIlxuICAgICAgKGNvbXBvc2l0aW9uZW5kKT1cInNldENvbXBvc2l0aW9uU3RhdGUoZmFsc2UpXCJcbiAgICAvPlxuICAgIDxzcGFuICNtaXJyb3JFbGVtZW50ICpuZ0lmPVwibWlycm9yU3luY1wiIGNsYXNzPVwiYW50LXNlbGVjdC1zZWxlY3Rpb24tc2VhcmNoLW1pcnJvclwiPjwvc3Bhbj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXNlbGVjdC1zZWxlY3Rpb24tc2VhcmNoXSc6ICd0cnVlJ1xuICB9LFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENPTVBPU0lUSU9OX0JVRkZFUl9NT0RFLCB1c2VWYWx1ZTogZmFsc2UgfV1cbn0pXG5leHBvcnQgY2xhc3MgTnpTZWxlY3RTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBtaXJyb3JTeW5jID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dJbnB1dCA9IHRydWU7XG4gIEBJbnB1dCgpIGZvY3VzVHJpZ2dlciA9IGZhbHNlO1xuICBASW5wdXQoKSB2YWx1ZSA9ICcnO1xuICBASW5wdXQoKSBhdXRvZm9jdXMgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBpc0NvbXBvc2luZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQFZpZXdDaGlsZCgnaW5wdXRFbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRFbGVtZW50ITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbWlycm9yRWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSBtaXJyb3JFbGVtZW50PzogRWxlbWVudFJlZjtcblxuICBzZXRDb21wb3NpdGlvblN0YXRlKGlzQ29tcG9zaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc0NvbXBvc2luZ0NoYW5nZS5uZXh0KGlzQ29tcG9zaW5nKTtcbiAgfVxuXG4gIG9uVmFsdWVDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLm5leHQodmFsdWUpO1xuICAgIGlmICh0aGlzLm1pcnJvclN5bmMpIHtcbiAgICAgIHRoaXMuc3luY01pcnJvcldpZHRoKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJJbnB1dFZhbHVlKCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0RE9NID0gdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICBpbnB1dERPTS52YWx1ZSA9ICcnO1xuICAgIHRoaXMub25WYWx1ZUNoYW5nZSgnJyk7XG4gIH1cblxuICBzeW5jTWlycm9yV2lkdGgoKTogdm9pZCB7XG4gICAgY29uc3QgbWlycm9yRE9NID0gdGhpcy5taXJyb3JFbGVtZW50IS5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhvc3RET00gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBpbnB1dERPTSA9IHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShob3N0RE9NLCAnd2lkdGgnKTtcbiAgICBtaXJyb3JET00uaW5uZXJIVE1MID0gYCR7aW5wdXRET00udmFsdWV9Jm5ic3A7YDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKGhvc3RET00sICd3aWR0aCcsIGAke21pcnJvckRPTS5zY3JvbGxXaWR0aH1weGApO1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c01vbml0b3IuZm9jdXNWaWEodGhpcy5pbnB1dEVsZW1lbnQsICdrZXlib2FyZCcpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dERPTSA9IHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgeyBmb2N1c1RyaWdnZXIsIHNob3dJbnB1dCB9ID0gY2hhbmdlcztcblxuICAgIGlmIChzaG93SW5wdXQpIHtcbiAgICAgIGlmICh0aGlzLnNob3dJbnB1dCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZShpbnB1dERPTSwgJ3JlYWRvbmx5Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dERPTSwgJ3JlYWRvbmx5JywgJ3JlYWRvbmx5Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSUUxMSBjYW5ub3QgaW5wdXQgdmFsdWUgaWYgZm9jdXNlZCBiZWZvcmUgcmVtb3ZpbmcgcmVhZG9ubHlcbiAgICBpZiAoZm9jdXNUcmlnZ2VyICYmIGZvY3VzVHJpZ2dlci5jdXJyZW50VmFsdWUgPT09IHRydWUgJiYgZm9jdXNUcmlnZ2VyLnByZXZpb3VzVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpbnB1dERPTS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5taXJyb3JTeW5jKSB7XG4gICAgICB0aGlzLnN5bmNNaXJyb3JXaWR0aCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvZm9jdXMpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==