/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2 } from '@angular/core';
const spaceSize = {
    small: 8,
    middle: 16,
    large: 24
};
export class NzSpaceItemComponent {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    setDirectionAndSize(direction, size) {
        const marginSize = typeof size === 'string' ? spaceSize[size] : size;
        if (direction === 'horizontal') {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-bottom');
            this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `${marginSize}px`);
        }
        else {
            this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-right');
            this.renderer.setStyle(this.elementRef.nativeElement, 'margin-bottom', `${marginSize}px`);
        }
    }
    ngOnInit() { }
}
NzSpaceItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-space-item, [nz-space-item]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'ant-space-item'
                }
            },] }
];
NzSpaceItemComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NwYWNlLyIsInNvdXJjZXMiOlsic3BhY2UtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSWxHLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLEtBQUssRUFBRSxDQUFDO0lBQ1IsTUFBTSxFQUFFLEVBQUU7SUFDVixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFVRixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW9CLFFBQW1CLEVBQVUsVUFBc0I7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTNFLG1CQUFtQixDQUFDLFNBQTJCLEVBQUUsSUFBMEI7UUFDekUsTUFBTSxVQUFVLEdBQUcsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRSxJQUFJLFNBQVMsS0FBSyxZQUFZLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztTQUMxRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztTQUMzRjtJQUNILENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQzs7O1lBdEJwQixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNGOzs7WUFqQmdFLFNBQVM7WUFBN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56U3BhY2VEaXJlY3Rpb24sIE56U3BhY2VTaXplIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IHNwYWNlU2l6ZSA9IHtcbiAgc21hbGw6IDgsXG4gIG1pZGRsZTogMTYsXG4gIGxhcmdlOiAyNFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotc3BhY2UtaXRlbSwgW256LXNwYWNlLWl0ZW1dJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXNwYWNlLWl0ZW0nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTcGFjZUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBzZXREaXJlY3Rpb25BbmRTaXplKGRpcmVjdGlvbjogTnpTcGFjZURpcmVjdGlvbiwgc2l6ZTogbnVtYmVyIHwgTnpTcGFjZVNpemUpOiB2b2lkIHtcbiAgICBjb25zdCBtYXJnaW5TaXplID0gdHlwZW9mIHNpemUgPT09ICdzdHJpbmcnID8gc3BhY2VTaXplW3NpemVdIDogc2l6ZTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tYm90dG9tJyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0JywgYCR7bWFyZ2luU2l6ZX1weGApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXJpZ2h0Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLWJvdHRvbScsIGAke21hcmdpblNpemV9cHhgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHt9XG59XG4iXX0=