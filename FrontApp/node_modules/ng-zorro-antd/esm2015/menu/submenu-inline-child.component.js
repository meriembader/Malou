/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
export class NzSubmenuInlineChildComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.templateOutlet = null;
        this.menuClass = '';
        this.mode = 'vertical';
        this.nzOpen = false;
        this.listOfCacheClassName = [];
        this.expandState = 'collapsed';
    }
    calcMotionState() {
        if (this.nzOpen) {
            this.expandState = 'expanded';
        }
        else {
            this.expandState = 'collapsed';
        }
    }
    ngOnInit() {
        this.calcMotionState();
    }
    ngOnChanges(changes) {
        const { mode, nzOpen, menuClass } = changes;
        if (mode || nzOpen) {
            this.calcMotionState();
        }
        if (menuClass) {
            if (this.listOfCacheClassName.length) {
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.removeClass(this.elementRef.nativeElement, className);
                });
            }
            if (this.menuClass) {
                this.listOfCacheClassName = this.menuClass.split(' ');
                this.listOfCacheClassName
                    .filter(item => !!item)
                    .forEach(className => {
                    this.renderer.addClass(this.elementRef.nativeElement, className);
                });
            }
        }
    }
}
NzSubmenuInlineChildComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-submenu-inline-child]',
                animations: [collapseMotion],
                exportAs: 'nzSubmenuInlineChild',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-template [ngTemplateOutlet]="templateOutlet"></ng-template> `,
                host: {
                    '[class.ant-menu]': 'true',
                    '[class.ant-menu-inline]': 'true',
                    '[class.ant-menu-sub]': 'true',
                    '[@collapseMotion]': 'expandState'
                }
            },] }
];
NzSubmenuInlineChildComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NzSubmenuInlineChildComponent.propDecorators = {
    templateOutlet: [{ type: Input }],
    menuClass: [{ type: Input }],
    mode: [{ type: Input }],
    nzOpen: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VibWVudS1pbmxpbmUtY2hpbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tZW51LyIsInNvdXJjZXMiOlsic3VibWVudS1pbmxpbmUtY2hpbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFrQjlELE1BQU0sT0FBTyw2QkFBNkI7SUFjeEMsWUFBb0IsVUFBc0IsRUFBVSxRQUFtQjtRQUFuRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWI5RCxtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFDckQsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixTQUFJLEdBQW1CLFVBQVUsQ0FBQztRQUNsQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHlCQUFvQixHQUFhLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztJQVFnRCxDQUFDO0lBUDNFLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUM1QyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxvQkFBb0I7cUJBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RFLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLG9CQUFvQjtxQkFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztxQkFDdEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQzs7O1lBdERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2dCQUNyQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzVCLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLG1FQUFtRTtnQkFDN0UsSUFBSSxFQUFFO29CQUNKLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLHlCQUF5QixFQUFFLE1BQU07b0JBQ2pDLHNCQUFzQixFQUFFLE1BQU07b0JBQzlCLG1CQUFtQixFQUFFLGFBQWE7aUJBQ25DO2FBQ0Y7OztZQTFCQyxVQUFVO1lBSVYsU0FBUzs7OzZCQXdCUixLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbGxhcHNlTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgTnpNZW51TW9kZVR5cGUgfSBmcm9tICcuL21lbnUudHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotc3VibWVudS1pbmxpbmUtY2hpbGRdJyxcbiAgYW5pbWF0aW9uczogW2NvbGxhcHNlTW90aW9uXSxcbiAgZXhwb3J0QXM6ICduelN1Ym1lbnVJbmxpbmVDaGlsZCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYCA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwidGVtcGxhdGVPdXRsZXRcIj48L25nLXRlbXBsYXRlPiBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtbWVudV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtbWVudS1pbmxpbmVdJzogJ3RydWUnLFxuICAgICdbY2xhc3MuYW50LW1lbnUtc3ViXSc6ICd0cnVlJyxcbiAgICAnW0Bjb2xsYXBzZU1vdGlvbl0nOiAnZXhwYW5kU3RhdGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpTdWJtZW51SW5saW5lQ2hpbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHRlbXBsYXRlT3V0bGV0OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG1lbnVDbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG1vZGU6IE56TWVudU1vZGVUeXBlID0gJ3ZlcnRpY2FsJztcbiAgQElucHV0KCkgbnpPcGVuID0gZmFsc2U7XG4gIGxpc3RPZkNhY2hlQ2xhc3NOYW1lOiBzdHJpbmdbXSA9IFtdO1xuICBleHBhbmRTdGF0ZSA9ICdjb2xsYXBzZWQnO1xuICBjYWxjTW90aW9uU3RhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpPcGVuKSB7XG4gICAgICB0aGlzLmV4cGFuZFN0YXRlID0gJ2V4cGFuZGVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leHBhbmRTdGF0ZSA9ICdjb2xsYXBzZWQnO1xuICAgIH1cbiAgfVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYWxjTW90aW9uU3RhdGUoKTtcbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBtb2RlLCBuek9wZW4sIG1lbnVDbGFzcyB9ID0gY2hhbmdlcztcbiAgICBpZiAobW9kZSB8fCBuek9wZW4pIHtcbiAgICAgIHRoaXMuY2FsY01vdGlvblN0YXRlKCk7XG4gICAgfVxuICAgIGlmIChtZW51Q2xhc3MpIHtcbiAgICAgIGlmICh0aGlzLmxpc3RPZkNhY2hlQ2xhc3NOYW1lLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmxpc3RPZkNhY2hlQ2xhc3NOYW1lXG4gICAgICAgICAgLmZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm1lbnVDbGFzcykge1xuICAgICAgICB0aGlzLmxpc3RPZkNhY2hlQ2xhc3NOYW1lID0gdGhpcy5tZW51Q2xhc3Muc3BsaXQoJyAnKTtcbiAgICAgICAgdGhpcy5saXN0T2ZDYWNoZUNsYXNzTmFtZVxuICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=