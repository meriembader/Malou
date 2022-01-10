/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export class NzAutosizeDirective {
    constructor(elementRef, ngZone, platform, resizeService) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.autosize = false;
        this.el = this.elementRef.nativeElement;
        this.maxHeight = null;
        this.minHeight = null;
        this.destroy$ = new Subject();
        this.inputGap = 10;
    }
    set nzAutosize(value) {
        const isAutoSizeType = (data) => {
            return typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows);
        };
        if (typeof value === 'string') {
            this.autosize = true;
        }
        else if (isAutoSizeType(value)) {
            this.autosize = value;
            this.minRows = value.minRows;
            this.maxRows = value.maxRows;
            this.maxHeight = this.setMaxHeight();
            this.minHeight = this.setMinHeight();
        }
    }
    resizeToFitContent(force = false) {
        this.cacheTextareaLineHeight();
        // If we haven't determined the line-height yet, we know we're still hidden and there's no point
        // in checking the height of the textarea.
        if (!this.cachedLineHeight) {
            return;
        }
        const textarea = this.el;
        const value = textarea.value;
        // Only resize if the value or minRows have changed since these calculations can be expensive.
        if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
            return;
        }
        const placeholderText = textarea.placeholder;
        // Reset the textarea height to auto in order to shrink back to its default size.
        // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
        // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
        // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
        // need to be removed temporarily.
        textarea.classList.add('nz-textarea-autosize-measuring');
        textarea.placeholder = '';
        let height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight + this.inputGap;
        if (this.maxHeight !== null && height > this.maxHeight) {
            height = this.maxHeight;
        }
        if (this.minHeight !== null && height < this.minHeight) {
            height = this.minHeight;
        }
        // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
        textarea.style.height = `${height}px`;
        textarea.classList.remove('nz-textarea-autosize-measuring');
        textarea.placeholder = placeholderText;
        // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
        // We need to re-set the selection in order for it to scroll to the proper position.
        if (typeof requestAnimationFrame !== 'undefined') {
            this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
                const { selectionStart, selectionEnd } = textarea;
                // IE will throw an "Unspecified error" if we try to set the selection range after the
                // element has been removed from the DOM. Assert that the directive hasn't been destroyed
                // between the time we requested the animation frame and when it was executed.
                // Also note that we have to assert that the textarea is focused before we set the
                // selection range. Setting the selection range on a non-focused textarea will cause
                // it to receive focus on IE and Edge.
                if (!this.destroy$.isStopped && document.activeElement === textarea) {
                    textarea.setSelectionRange(selectionStart, selectionEnd);
                }
            }));
        }
        this.previousValue = value;
        this.previousMinRows = this.minRows;
    }
    cacheTextareaLineHeight() {
        if (this.cachedLineHeight >= 0 || !this.el.parentNode) {
            return;
        }
        // Use a clone element because we have to override some styles.
        const textareaClone = this.el.cloneNode(false);
        textareaClone.rows = 1;
        // Use `position: absolute` so that this doesn't cause a browser layout and use
        // `visibility: hidden` so that nothing is rendered. Clear any other styles that
        // would affect the height.
        textareaClone.style.position = 'absolute';
        textareaClone.style.visibility = 'hidden';
        textareaClone.style.border = 'none';
        textareaClone.style.padding = '0';
        textareaClone.style.height = '';
        textareaClone.style.minHeight = '';
        textareaClone.style.maxHeight = '';
        // In Firefox it happens that textarea elements are always bigger than the specified amount
        // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
        // As a workaround that removes the extra space for the scrollbar, we can just set overflow
        // to hidden. This ensures that there is no invalid calculation of the line height.
        // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
        textareaClone.style.overflow = 'hidden';
        this.el.parentNode.appendChild(textareaClone);
        this.cachedLineHeight = textareaClone.clientHeight - this.inputGap;
        this.el.parentNode.removeChild(textareaClone);
        // Min and max heights have to be re-calculated if the cached line height changes
        this.maxHeight = this.setMaxHeight();
        this.minHeight = this.setMinHeight();
    }
    setMinHeight() {
        const minHeight = this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;
        if (minHeight !== null) {
            this.el.style.minHeight = `${minHeight}px`;
        }
        return minHeight;
    }
    setMaxHeight() {
        const maxHeight = this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;
        if (maxHeight !== null) {
            this.el.style.maxHeight = `${maxHeight}px`;
        }
        return maxHeight;
    }
    noopInputHandler() {
        // no-op handler that ensures we're running change detection on input events.
    }
    ngAfterViewInit() {
        if (this.autosize && this.platform.isBrowser) {
            this.resizeToFitContent();
            this.resizeService
                .subscribe()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.resizeToFitContent(true));
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngDoCheck() {
        if (this.autosize && this.platform.isBrowser) {
            this.resizeToFitContent();
        }
    }
}
NzAutosizeDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[nzAutosize]',
                exportAs: 'nzAutosize',
                host: {
                    // Textarea elements that have the directive applied should have a single row by default.
                    // Browsers normally show two rows by default and therefore this limits the minRows binding.
                    rows: '1',
                    '(input)': 'noopInputHandler()'
                }
            },] }
];
NzAutosizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: NzResizeService }
];
NzAutosizeDirective.propDecorators = {
    nzAutosize: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3NpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9pbnB1dC8iLCJzb3VyY2VzIjpbImF1dG9zaXplLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFpQixTQUFTLEVBQVcsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBaUIzQyxNQUFNLE9BQU8sbUJBQW1CO0lBbUo5QixZQUFvQixVQUFzQixFQUFVLE1BQWMsRUFBVSxRQUFrQixFQUFVLGFBQThCO1FBQWxILGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQWxKOUgsYUFBUSxHQUEyQixLQUFLLENBQUM7UUFDekMsT0FBRSxHQUEyQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQU0zRSxjQUFTLEdBQWtCLElBQUksQ0FBQztRQUNoQyxjQUFTLEdBQWtCLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN6QixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBd0ltSCxDQUFDO0lBdEkxSSxJQUNJLFVBQVUsQ0FBQyxLQUFzQztRQUNuRCxNQUFNLGNBQWMsR0FBRyxDQUFDLElBQXFDLEVBQXdCLEVBQUU7WUFDckYsT0FBTyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FB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b2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpSZXNpemVTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2l6ZVR5cGUge1xuICBtaW5Sb3dzPzogbnVtYmVyO1xuICBtYXhSb3dzPzogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICd0ZXh0YXJlYVtuekF1dG9zaXplXScsXG4gIGV4cG9ydEFzOiAnbnpBdXRvc2l6ZScsXG4gIGhvc3Q6IHtcbiAgICAvLyBUZXh0YXJlYSBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGRpcmVjdGl2ZSBhcHBsaWVkIHNob3VsZCBoYXZlIGEgc2luZ2xlIHJvdyBieSBkZWZhdWx0LlxuICAgIC8vIEJyb3dzZXJzIG5vcm1hbGx5IHNob3cgdHdvIHJvd3MgYnkgZGVmYXVsdCBhbmQgdGhlcmVmb3JlIHRoaXMgbGltaXRzIHRoZSBtaW5Sb3dzIGJpbmRpbmcuXG4gICAgcm93czogJzEnLFxuICAgICcoaW5wdXQpJzogJ25vb3BJbnB1dEhhbmRsZXIoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekF1dG9zaXplRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBEb0NoZWNrIHtcbiAgcHJpdmF0ZSBhdXRvc2l6ZTogYm9vbGVhbiB8IEF1dG9TaXplVHlwZSA9IGZhbHNlO1xuICBwcml2YXRlIGVsOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIGNhY2hlZExpbmVIZWlnaHQhOiBudW1iZXI7XG4gIHByaXZhdGUgcHJldmlvdXNWYWx1ZSE6IHN0cmluZztcbiAgcHJpdmF0ZSBwcmV2aW91c01pblJvd3M6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBtaW5Sb3dzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbWF4Um93czogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIG1heEhlaWdodDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbWluSGVpZ2h0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgaW5wdXRHYXAgPSAxMDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpBdXRvc2l6ZSh2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbiB8IEF1dG9TaXplVHlwZSkge1xuICAgIGNvbnN0IGlzQXV0b1NpemVUeXBlID0gKGRhdGE6IHN0cmluZyB8IGJvb2xlYW4gfCBBdXRvU2l6ZVR5cGUpOiBkYXRhIGlzIEF1dG9TaXplVHlwZSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBkYXRhICE9PSAnYm9vbGVhbicgJiYgKCEhZGF0YS5tYXhSb3dzIHx8ICEhZGF0YS5taW5Sb3dzKTtcbiAgICB9O1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmF1dG9zaXplID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGlzQXV0b1NpemVUeXBlKHZhbHVlKSkge1xuICAgICAgdGhpcy5hdXRvc2l6ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5taW5Sb3dzID0gdmFsdWUubWluUm93cztcbiAgICAgIHRoaXMubWF4Um93cyA9IHZhbHVlLm1heFJvd3M7XG4gICAgICB0aGlzLm1heEhlaWdodCA9IHRoaXMuc2V0TWF4SGVpZ2h0KCk7XG4gICAgICB0aGlzLm1pbkhlaWdodCA9IHRoaXMuc2V0TWluSGVpZ2h0KCk7XG4gICAgfVxuICB9XG5cbiAgcmVzaXplVG9GaXRDb250ZW50KGZvcmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmNhY2hlVGV4dGFyZWFMaW5lSGVpZ2h0KCk7XG5cbiAgICAvLyBJZiB3ZSBoYXZlbid0IGRldGVybWluZWQgdGhlIGxpbmUtaGVpZ2h0IHlldCwgd2Uga25vdyB3ZSdyZSBzdGlsbCBoaWRkZW4gYW5kIHRoZXJlJ3Mgbm8gcG9pbnRcbiAgICAvLyBpbiBjaGVja2luZyB0aGUgaGVpZ2h0IG9mIHRoZSB0ZXh0YXJlYS5cbiAgICBpZiAoIXRoaXMuY2FjaGVkTGluZUhlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5lbCBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIGNvbnN0IHZhbHVlID0gdGV4dGFyZWEudmFsdWU7XG5cbiAgICAvLyBPbmx5IHJlc2l6ZSBpZiB0aGUgdmFsdWUgb3IgbWluUm93cyBoYXZlIGNoYW5nZWQgc2luY2UgdGhlc2UgY2FsY3VsYXRpb25zIGNhbiBiZSBleHBlbnNpdmUuXG4gICAgaWYgKCFmb3JjZSAmJiB0aGlzLm1pblJvd3MgPT09IHRoaXMucHJldmlvdXNNaW5Sb3dzICYmIHZhbHVlID09PSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcGxhY2Vob2xkZXJUZXh0ID0gdGV4dGFyZWEucGxhY2Vob2xkZXI7XG5cbiAgICAvLyBSZXNldCB0aGUgdGV4dGFyZWEgaGVpZ2h0IHRvIGF1dG8gaW4gb3JkZXIgdG8gc2hyaW5rIGJhY2sgdG8gaXRzIGRlZmF1bHQgc2l6ZS5cbiAgICAvLyBBbHNvIHRlbXBvcmFyaWx5IGZvcmNlIG92ZXJmbG93OmhpZGRlbiwgc28gc2Nyb2xsIGJhcnMgZG8gbm90IGludGVyZmVyZSB3aXRoIGNhbGN1bGF0aW9ucy5cbiAgICAvLyBMb25nIHBsYWNlaG9sZGVycyB0aGF0IGFyZSB3aWRlciB0aGFuIHRoZSB0ZXh0YXJlYSB3aWR0aCBtYXkgbGVhZCB0byBhIGJpZ2dlciBzY3JvbGxIZWlnaHRcbiAgICAvLyB2YWx1ZS4gVG8gZW5zdXJlIHRoYXQgdGhlIHNjcm9sbEhlaWdodCBpcyBub3QgYmlnZ2VyIHRoYW4gdGhlIGNvbnRlbnQsIHRoZSBwbGFjZWhvbGRlcnNcbiAgICAvLyBuZWVkIHRvIGJlIHJlbW92ZWQgdGVtcG9yYXJpbHkuXG4gICAgdGV4dGFyZWEuY2xhc3NMaXN0LmFkZCgnbnotdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5nJyk7XG4gICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSAnJztcbiAgICBsZXQgaGVpZ2h0ID0gTWF0aC5yb3VuZCgodGV4dGFyZWEuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5pbnB1dEdhcCkgLyB0aGlzLmNhY2hlZExpbmVIZWlnaHQpICogdGhpcy5jYWNoZWRMaW5lSGVpZ2h0ICsgdGhpcy5pbnB1dEdhcDtcbiAgICBpZiAodGhpcy5tYXhIZWlnaHQgIT09IG51bGwgJiYgaGVpZ2h0ID4gdGhpcy5tYXhIZWlnaHQpIHtcbiAgICAgIGhlaWdodCA9IHRoaXMubWF4SGVpZ2h0ITtcbiAgICB9XG4gICAgaWYgKHRoaXMubWluSGVpZ2h0ICE9PSBudWxsICYmIGhlaWdodCA8IHRoaXMubWluSGVpZ2h0KSB7XG4gICAgICBoZWlnaHQgPSB0aGlzLm1pbkhlaWdodCE7XG4gICAgfVxuICAgIC8vIFVzZSB0aGUgc2Nyb2xsSGVpZ2h0IHRvIGtub3cgaG93IGxhcmdlIHRoZSB0ZXh0YXJlYSAqd291bGQqIGJlIGlmIGZpdCBpdHMgZW50aXJlIHZhbHVlLlxuICAgIHRleHRhcmVhLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XG4gICAgdGV4dGFyZWEuY2xhc3NMaXN0LnJlbW92ZSgnbnotdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5nJyk7XG4gICAgdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRleHQ7XG5cbiAgICAvLyBPbiBGaXJlZm94IHJlc2l6aW5nIHRoZSB0ZXh0YXJlYSB3aWxsIHByZXZlbnQgaXQgZnJvbSBzY3JvbGxpbmcgdG8gdGhlIGNhcmV0IHBvc2l0aW9uLlxuICAgIC8vIFdlIG5lZWQgdG8gcmUtc2V0IHRoZSBzZWxlY3Rpb24gaW4gb3JkZXIgZm9yIGl0IHRvIHNjcm9sbCB0byB0aGUgcHJvcGVyIHBvc2l0aW9uLlxuICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQgfSA9IHRleHRhcmVhO1xuXG4gICAgICAgICAgLy8gSUUgd2lsbCB0aHJvdyBhbiBcIlVuc3BlY2lmaWVkIGVycm9yXCIgaWYgd2UgdHJ5IHRvIHNldCB0aGUgc2VsZWN0aW9uIHJhbmdlIGFmdGVyIHRoZVxuICAgICAgICAgIC8vIGVsZW1lbnQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBET00uIEFzc2VydCB0aGF0IHRoZSBkaXJlY3RpdmUgaGFzbid0IGJlZW4gZGVzdHJveWVkXG4gICAgICAgICAgLy8gYmV0d2VlbiB0aGUgdGltZSB3ZSByZXF1ZXN0ZWQgdGhlIGFuaW1hdGlvbiBmcmFtZSBhbmQgd2hlbiBpdCB3YXMgZXhlY3V0ZWQuXG4gICAgICAgICAgLy8gQWxzbyBub3RlIHRoYXQgd2UgaGF2ZSB0byBhc3NlcnQgdGhhdCB0aGUgdGV4dGFyZWEgaXMgZm9jdXNlZCBiZWZvcmUgd2Ugc2V0IHRoZVxuICAgICAgICAgIC8vIHNlbGVjdGlvbiByYW5nZS4gU2V0dGluZyB0aGUgc2VsZWN0aW9uIHJhbmdlIG9uIGEgbm9uLWZvY3VzZWQgdGV4dGFyZWEgd2lsbCBjYXVzZVxuICAgICAgICAgIC8vIGl0IHRvIHJlY2VpdmUgZm9jdXMgb24gSUUgYW5kIEVkZ2UuXG4gICAgICAgICAgaWYgKCF0aGlzLmRlc3Ryb3kkLmlzU3RvcHBlZCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0ZXh0YXJlYSkge1xuICAgICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnByZXZpb3VzTWluUm93cyA9IHRoaXMubWluUm93cztcbiAgfVxuXG4gIHByaXZhdGUgY2FjaGVUZXh0YXJlYUxpbmVIZWlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FjaGVkTGluZUhlaWdodCA+PSAwIHx8ICF0aGlzLmVsLnBhcmVudE5vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBVc2UgYSBjbG9uZSBlbGVtZW50IGJlY2F1c2Ugd2UgaGF2ZSB0byBvdmVycmlkZSBzb21lIHN0eWxlcy5cbiAgICBjb25zdCB0ZXh0YXJlYUNsb25lID0gdGhpcy5lbC5jbG9uZU5vZGUoZmFsc2UpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGV4dGFyZWFDbG9uZS5yb3dzID0gMTtcblxuICAgIC8vIFVzZSBgcG9zaXRpb246IGFic29sdXRlYCBzbyB0aGF0IHRoaXMgZG9lc24ndCBjYXVzZSBhIGJyb3dzZXIgbGF5b3V0IGFuZCB1c2VcbiAgICAvLyBgdmlzaWJpbGl0eTogaGlkZGVuYCBzbyB0aGF0IG5vdGhpbmcgaXMgcmVuZGVyZWQuIENsZWFyIGFueSBvdGhlciBzdHlsZXMgdGhhdFxuICAgIC8vIHdvdWxkIGFmZmVjdCB0aGUgaGVpZ2h0LlxuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUuYm9yZGVyID0gJ25vbmUnO1xuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUucGFkZGluZyA9ICcwJztcbiAgICB0ZXh0YXJlYUNsb25lLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUubWluSGVpZ2h0ID0gJyc7XG4gICAgdGV4dGFyZWFDbG9uZS5zdHlsZS5tYXhIZWlnaHQgPSAnJztcblxuICAgIC8vIEluIEZpcmVmb3ggaXQgaGFwcGVucyB0aGF0IHRleHRhcmVhIGVsZW1lbnRzIGFyZSBhbHdheXMgYmlnZ2VyIHRoYW4gdGhlIHNwZWNpZmllZCBhbW91bnRcbiAgICAvLyBvZiByb3dzLiBUaGlzIGlzIGJlY2F1c2UgRmlyZWZveCB0cmllcyB0byBhZGQgZXh0cmEgc3BhY2UgZm9yIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhci5cbiAgICAvLyBBcyBhIHdvcmthcm91bmQgdGhhdCByZW1vdmVzIHRoZSBleHRyYSBzcGFjZSBmb3IgdGhlIHNjcm9sbGJhciwgd2UgY2FuIGp1c3Qgc2V0IG92ZXJmbG93XG4gICAgLy8gdG8gaGlkZGVuLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGVyZSBpcyBubyBpbnZhbGlkIGNhbGN1bGF0aW9uIG9mIHRoZSBsaW5lIGhlaWdodC5cbiAgICAvLyBTZWUgRmlyZWZveCBidWcgcmVwb3J0OiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0zMzY1NFxuICAgIHRleHRhcmVhQ2xvbmUuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgIHRoaXMuZWwucGFyZW50Tm9kZSEuYXBwZW5kQ2hpbGQodGV4dGFyZWFDbG9uZSk7XG4gICAgdGhpcy5jYWNoZWRMaW5lSGVpZ2h0ID0gdGV4dGFyZWFDbG9uZS5jbGllbnRIZWlnaHQgLSB0aGlzLmlucHV0R2FwO1xuICAgIHRoaXMuZWwucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQodGV4dGFyZWFDbG9uZSk7XG5cbiAgICAvLyBNaW4gYW5kIG1heCBoZWlnaHRzIGhhdmUgdG8gYmUgcmUtY2FsY3VsYXRlZCBpZiB0aGUgY2FjaGVkIGxpbmUgaGVpZ2h0IGNoYW5nZXNcbiAgICB0aGlzLm1heEhlaWdodCA9IHRoaXMuc2V0TWF4SGVpZ2h0KCk7XG4gICAgdGhpcy5taW5IZWlnaHQgPSB0aGlzLnNldE1pbkhlaWdodCgpO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IG1pbkhlaWdodCA9IHRoaXMubWluUm93cyAmJiB0aGlzLmNhY2hlZExpbmVIZWlnaHQgPyB0aGlzLm1pblJvd3MgKiB0aGlzLmNhY2hlZExpbmVIZWlnaHQgKyB0aGlzLmlucHV0R2FwIDogbnVsbDtcblxuICAgIGlmIChtaW5IZWlnaHQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZWwuc3R5bGUubWluSGVpZ2h0ID0gYCR7bWluSGVpZ2h0fXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbkhlaWdodDtcbiAgfVxuXG4gIHNldE1heEhlaWdodCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCBtYXhIZWlnaHQgPSB0aGlzLm1heFJvd3MgJiYgdGhpcy5jYWNoZWRMaW5lSGVpZ2h0ID8gdGhpcy5tYXhSb3dzICogdGhpcy5jYWNoZWRMaW5lSGVpZ2h0ICsgdGhpcy5pbnB1dEdhcCA6IG51bGw7XG4gICAgaWYgKG1heEhlaWdodCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5lbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHttYXhIZWlnaHR9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gbWF4SGVpZ2h0O1xuICB9XG5cbiAgbm9vcElucHV0SGFuZGxlcigpOiB2b2lkIHtcbiAgICAvLyBuby1vcCBoYW5kbGVyIHRoYXQgZW5zdXJlcyB3ZSdyZSBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24gb24gaW5wdXQgZXZlbnRzLlxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSwgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBOelJlc2l6ZVNlcnZpY2UpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9zaXplICYmIHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLnJlc2l6ZVRvRml0Q29udGVudCgpO1xuICAgICAgdGhpcy5yZXNpemVTZXJ2aWNlXG4gICAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZXNpemVUb0ZpdENvbnRlbnQodHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvc2l6ZSAmJiB0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5yZXNpemVUb0ZpdENvbnRlbnQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==