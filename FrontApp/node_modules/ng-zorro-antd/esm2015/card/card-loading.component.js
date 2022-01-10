/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
export class NzCardLoadingComponent {
    constructor() {
        this.listOfLoading = [
            ['ant-col-22'],
            ['ant-col-8', 'ant-col-15'],
            ['ant-col-6', 'ant-col-18'],
            ['ant-col-13', 'ant-col-9'],
            ['ant-col-4', 'ant-col-3', 'ant-col-16'],
            ['ant-col-8', 'ant-col-6', 'ant-col-8']
        ];
    }
}
NzCardLoadingComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-card-loading',
                exportAs: 'nzCardLoading',
                template: `
    <div class="ant-card-loading-content">
      <div class="ant-row" style="margin-left: -4px; margin-right: -4px;" *ngFor="let listOfClassName of listOfLoading">
        <div *ngFor="let className of listOfClassName" [ngClass]="className" style="padding-left: 4px; padding-right: 4px;">
          <div class="ant-card-loading-block"></div>
        </div>
      </div>
    </div>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ant-card-loading-content]': 'true'
                }
            },] }
];
NzCardLoadingComponent.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC1sb2FkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY2FyZC8iLCJzb3VyY2VzIjpbImNhcmQtbG9hZGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXFCdEYsTUFBTSxPQUFPLHNCQUFzQjtJQVNqQztRQVJBLGtCQUFhLEdBQWU7WUFDMUIsQ0FBQyxZQUFZLENBQUM7WUFDZCxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7WUFDM0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDO1lBQzNCLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQztZQUMzQixDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDO1lBQ3hDLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7U0FDeEMsQ0FBQztJQUNhLENBQUM7OztZQTVCakIsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0osa0NBQWtDLEVBQUUsTUFBTTtpQkFDM0M7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNhcmQtbG9hZGluZycsXG4gIGV4cG9ydEFzOiAnbnpDYXJkTG9hZGluZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWxvYWRpbmctY29udGVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1yb3dcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAtNHB4OyBtYXJnaW4tcmlnaHQ6IC00cHg7XCIgKm5nRm9yPVwibGV0IGxpc3RPZkNsYXNzTmFtZSBvZiBsaXN0T2ZMb2FkaW5nXCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNsYXNzTmFtZSBvZiBsaXN0T2ZDbGFzc05hbWVcIiBbbmdDbGFzc109XCJjbGFzc05hbWVcIiBzdHlsZT1cInBhZGRpbmctbGVmdDogNHB4OyBwYWRkaW5nLXJpZ2h0OiA0cHg7XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWxvYWRpbmctYmxvY2tcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1sb2FkaW5nLWNvbnRlbnRdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXJkTG9hZGluZ0NvbXBvbmVudCB7XG4gIGxpc3RPZkxvYWRpbmc6IHN0cmluZ1tdW10gPSBbXG4gICAgWydhbnQtY29sLTIyJ10sXG4gICAgWydhbnQtY29sLTgnLCAnYW50LWNvbC0xNSddLFxuICAgIFsnYW50LWNvbC02JywgJ2FudC1jb2wtMTgnXSxcbiAgICBbJ2FudC1jb2wtMTMnLCAnYW50LWNvbC05J10sXG4gICAgWydhbnQtY29sLTQnLCAnYW50LWNvbC0zJywgJ2FudC1jb2wtMTYnXSxcbiAgICBbJ2FudC1jb2wtOCcsICdhbnQtY29sLTYnLCAnYW50LWNvbC04J11cbiAgXTtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19