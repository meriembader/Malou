/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, ElementRef, Inject, Input, NgZone, Optional } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
export class NzTabsInkBarDirective {
    constructor(elementRef, ngZone, animationMode) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.animationMode = animationMode;
        this.position = 'horizontal';
        this.animated = true;
    }
    get _animated() {
        return this.animationMode !== 'NoopAnimations' && this.animated;
    }
    alignToElement(element) {
        this.ngZone.runOutsideAngular(() => {
            reqAnimFrame(() => this.setStyles(element));
        });
    }
    setStyles(element) {
        const inkBar = this.elementRef.nativeElement;
        if (this.position === 'horizontal') {
            inkBar.style.top = '';
            inkBar.style.height = '';
            inkBar.style.left = this.getLeftPosition(element);
            inkBar.style.width = this.getElementWidth(element);
        }
        else {
            inkBar.style.left = '';
            inkBar.style.width = '';
            inkBar.style.top = this.getTopPosition(element);
            inkBar.style.height = this.getElementHeight(element);
        }
    }
    getLeftPosition(element) {
        return element ? (element.offsetLeft || 0) + 'px' : '0';
    }
    getElementWidth(element) {
        return element ? (element.offsetWidth || 0) + 'px' : '0';
    }
    getTopPosition(element) {
        return element ? (element.offsetTop || 0) + 'px' : '0';
    }
    getElementHeight(element) {
        return element ? (element.offsetHeight || 0) + 'px' : '0';
    }
}
NzTabsInkBarDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-tabs-ink-bar, [nz-tabs-ink-bar]',
                host: {
                    class: 'ant-tabs-ink-bar',
                    '[class.ant-tabs-ink-bar-animated]': '_animated'
                }
            },] }
];
NzTabsInkBarDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] }
];
NzTabsInkBarDirective.propDecorators = {
    position: [{ type: Input }],
    animated: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy1pbmstYmFyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvdGFicy8iLCJzb3VyY2VzIjpbInRhYnMtaW5rLWJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVczRCxNQUFNLE9BQU8scUJBQXFCO0lBUWhDLFlBQ1UsVUFBbUMsRUFDbkMsTUFBYyxFQUM0QixhQUFzQjtRQUZoRSxlQUFVLEdBQVYsVUFBVSxDQUF5QjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQzRCLGtCQUFhLEdBQWIsYUFBYSxDQUFTO1FBVmpFLGFBQVEsR0FBc0IsWUFBWSxDQUFDO1FBQzNDLGFBQVEsR0FBRyxJQUFJLENBQUM7SUFVdEIsQ0FBQztJQVJKLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ2xFLENBQUM7SUFRRCxjQUFjLENBQUMsT0FBb0I7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDakMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBb0I7UUFDNUIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQW9CO1FBQ2xDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDMUQsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFvQjtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzNELENBQUM7SUFFRCxjQUFjLENBQUMsT0FBb0I7UUFDakMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBb0I7UUFDbkMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM1RCxDQUFDOzs7WUF6REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixtQ0FBbUMsRUFBRSxXQUFXO2lCQUNqRDthQUNGOzs7WUFibUIsVUFBVTtZQUFpQixNQUFNO3lDQXlCaEQsUUFBUSxZQUFJLE1BQU0sU0FBQyxxQkFBcUI7Ozt1QkFWMUMsS0FBSzt1QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0LCBOZ1pvbmUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBTklNQVRJT05fTU9EVUxFX1RZUEUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyByZXFBbmltRnJhbWUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvcG9seWZpbGwnO1xuXG5pbXBvcnQgeyBOelRhYlBvc2l0aW9uTW9kZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ256LXRhYnMtaW5rLWJhciwgW256LXRhYnMtaW5rLWJhcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtdGFicy1pbmstYmFyJyxcbiAgICAnW2NsYXNzLmFudC10YWJzLWluay1iYXItYW5pbWF0ZWRdJzogJ19hbmltYXRlZCdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYnNJbmtCYXJEaXJlY3RpdmUge1xuICBASW5wdXQoKSBwb3NpdGlvbjogTnpUYWJQb3NpdGlvbk1vZGUgPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGFuaW1hdGVkID0gdHJ1ZTtcblxuICBnZXQgX2FuaW1hdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFuaW1hdGlvbk1vZGUgIT09ICdOb29wQW5pbWF0aW9ucycgJiYgdGhpcy5hbmltYXRlZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmdcbiAgKSB7fVxuXG4gIGFsaWduVG9FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmVxQW5pbUZyYW1lKCgpID0+IHRoaXMuc2V0U3R5bGVzKGVsZW1lbnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFN0eWxlcyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlua0JhcjogSFRNTEVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGlua0Jhci5zdHlsZS50b3AgPSAnJztcbiAgICAgIGlua0Jhci5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgIGlua0Jhci5zdHlsZS5sZWZ0ID0gdGhpcy5nZXRMZWZ0UG9zaXRpb24oZWxlbWVudCk7XG4gICAgICBpbmtCYXIuc3R5bGUud2lkdGggPSB0aGlzLmdldEVsZW1lbnRXaWR0aChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5rQmFyLnN0eWxlLmxlZnQgPSAnJztcbiAgICAgIGlua0Jhci5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgaW5rQmFyLnN0eWxlLnRvcCA9IHRoaXMuZ2V0VG9wUG9zaXRpb24oZWxlbWVudCk7XG4gICAgICBpbmtCYXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5nZXRFbGVtZW50SGVpZ2h0KGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDApICsgJ3B4JyA6ICcwJztcbiAgfVxuXG4gIGdldEVsZW1lbnRXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAwKSArICdweCcgOiAnMCc7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5vZmZzZXRUb3AgfHwgMCkgKyAncHgnIDogJzAnO1xuICB9XG5cbiAgZ2V0RWxlbWVudEhlaWdodChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMCkgKyAncHgnIDogJzAnO1xuICB9XG59XG4iXX0=