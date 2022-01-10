/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional, Renderer2, SkipSelf, ViewChild, ViewEncapsulation } from '@angular/core';
import { NzIsMenuInsideDropDownToken } from './menu.token';
export function MenuGroupFactory(isMenuInsideDropDownToken) {
    return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
export class NzMenuGroupComponent {
    constructor(elementRef, renderer, isMenuInsideDropDown) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isMenuInsideDropDown = isMenuInsideDropDown;
        const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group' : 'ant-menu-item-group';
        this.renderer.addClass(elementRef.nativeElement, className);
    }
    ngAfterViewInit() {
        const ulElement = this.titleElement.nativeElement.nextElementSibling;
        if (ulElement) {
            /** add classname to ul **/
            const className = this.isMenuInsideDropDown ? 'ant-dropdown-menu-item-group-list' : 'ant-menu-item-group-list';
            this.renderer.addClass(ulElement, className);
        }
    }
}
NzMenuGroupComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-menu-group]',
                exportAs: 'nzMenuGroup',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    /** check if menu inside dropdown-menu component **/
                    {
                        provide: NzIsMenuInsideDropDownToken,
                        useFactory: MenuGroupFactory,
                        deps: [[new SkipSelf(), new Optional(), NzIsMenuInsideDropDownToken]]
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropDown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      <ng-content select="[title]" *ngIf="!nzTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
                preserveWhitespaces: false
            },] }
];
NzMenuGroupComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Boolean, decorators: [{ type: Inject, args: [NzIsMenuInsideDropDownToken,] }] }
];
NzMenuGroupComponent.propDecorators = {
    nzTitle: [{ type: Input }],
    titleElement: [{ type: ViewChild, args: ['titleElement',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21lbnUvIiwic291cmNlcyI6WyJtZW51LWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFFBQVEsRUFFUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMseUJBQWtDO0lBQ2pFLE9BQU8seUJBQXlCLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDdkUsQ0FBQztBQTJCRCxNQUFNLE9BQU8sb0JBQW9CO0lBSS9CLFlBQ1MsVUFBc0IsRUFDckIsUUFBbUIsRUFDaUIsb0JBQTZCO1FBRmxFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNpQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQVM7UUFFekUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUM7UUFDckcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsZUFBZTtRQUNiLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO1FBQ3RFLElBQUksU0FBUyxFQUFFO1lBQ2IsMkJBQTJCO1lBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO1lBQy9HLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7OztZQTlDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUU7b0JBQ1Qsb0RBQW9EO29CQUNwRDt3QkFDRSxPQUFPLEVBQUUsMkJBQTJCO3dCQUNwQyxVQUFVLEVBQUUsZ0JBQWdCO3dCQUM1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO3FCQUN0RTtpQkFDRjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSzthQUMzQjs7O1lBeENDLFVBQVU7WUFJVixTQUFTOzBDQTRDTixNQUFNLFNBQUMsMkJBQTJCOzs7c0JBTnBDLEtBQUs7MkJBQ0wsU0FBUyxTQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgUmVuZGVyZXIyLFxuICBTa2lwU2VsZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW4gfSBmcm9tICcuL21lbnUudG9rZW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gTWVudUdyb3VwRmFjdG9yeShpc01lbnVJbnNpZGVEcm9wRG93blRva2VuOiBib29sZWFuKTogYm9vbGVhbiB7XG4gIHJldHVybiBpc01lbnVJbnNpZGVEcm9wRG93blRva2VuID8gaXNNZW51SW5zaWRlRHJvcERvd25Ub2tlbiA6IGZhbHNlO1xufVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW256LW1lbnUtZ3JvdXBdJyxcbiAgZXhwb3J0QXM6ICduek1lbnVHcm91cCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICAvKiogY2hlY2sgaWYgbWVudSBpbnNpZGUgZHJvcGRvd24tbWVudSBjb21wb25lbnQgKiovXG4gICAge1xuICAgICAgcHJvdmlkZTogTnpJc01lbnVJbnNpZGVEcm9wRG93blRva2VuLFxuICAgICAgdXNlRmFjdG9yeTogTWVudUdyb3VwRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtbbmV3IFNraXBTZWxmKCksIG5ldyBPcHRpb25hbCgpLCBOeklzTWVudUluc2lkZURyb3BEb3duVG9rZW5dXVxuICAgIH1cbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbY2xhc3MuYW50LW1lbnUtaXRlbS1ncm91cC10aXRsZV09XCIhaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgW2NsYXNzLmFudC1kcm9wZG93bi1tZW51LWl0ZW0tZ3JvdXAtdGl0bGVdPVwiaXNNZW51SW5zaWRlRHJvcERvd25cIlxuICAgICAgI3RpdGxlRWxlbWVudFxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelRpdGxlXCI+e3sgbnpUaXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3RpdGxlXVwiICpuZ0lmPVwiIW56VGl0bGVcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBOek1lbnVHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBWaWV3Q2hpbGQoJ3RpdGxlRWxlbWVudCcpIHRpdGxlRWxlbWVudD86IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBJbmplY3QoTnpJc01lbnVJbnNpZGVEcm9wRG93blRva2VuKSBwdWJsaWMgaXNNZW51SW5zaWRlRHJvcERvd246IGJvb2xlYW5cbiAgKSB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5pc01lbnVJbnNpZGVEcm9wRG93biA/ICdhbnQtZHJvcGRvd24tbWVudS1pdGVtLWdyb3VwJyA6ICdhbnQtbWVudS1pdGVtLWdyb3VwJztcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB1bEVsZW1lbnQgPSB0aGlzLnRpdGxlRWxlbWVudCEubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKHVsRWxlbWVudCkge1xuICAgICAgLyoqIGFkZCBjbGFzc25hbWUgdG8gdWwgKiovXG4gICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmlzTWVudUluc2lkZURyb3BEb3duID8gJ2FudC1kcm9wZG93bi1tZW51LWl0ZW0tZ3JvdXAtbGlzdCcgOiAnYW50LW1lbnUtaXRlbS1ncm91cC1saXN0JztcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModWxFbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxufVxuIl19