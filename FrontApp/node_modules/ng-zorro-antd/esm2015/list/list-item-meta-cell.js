/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class NzListItemMetaTitleComponent {
}
NzListItemMetaTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-meta-title',
                exportAs: 'nzListItemMetaTitle',
                template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
export class NzListItemMetaDescriptionComponent {
}
NzListItemMetaDescriptionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-meta-description',
                exportAs: 'nzListItemMetaDescription',
                template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
export class NzListItemMetaAvatarComponent {
}
NzListItemMetaAvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-item-meta-avatar',
                exportAs: 'nzListItemMetaAvatar',
                template: `
    <div class="ant-list-item-meta-avatar">
      <nz-avatar *ngIf="nzSrc" [nzSrc]="nzSrc"></nz-avatar>
      <ng-content *ngIf="!nzSrc"></ng-content>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzListItemMetaAvatarComponent.propDecorators = {
    nzSrc: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLW1ldGEtY2VsbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvbGlzdC8iLCJzb3VyY2VzIjpbImxpc3QtaXRlbS1tZXRhLWNlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZMUUsTUFBTSxPQUFPLDRCQUE0Qjs7O1lBVnhDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7QUFhRCxNQUFNLE9BQU8sa0NBQWtDOzs7WUFWOUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOztBQWNELE1BQU0sT0FBTyw2QkFBNkI7OztZQVh6QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7OztHQUtUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7b0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtaXRlbS1tZXRhLXRpdGxlJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtTWV0YVRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aDQgY2xhc3M9XCJhbnQtbGlzdC1pdGVtLW1ldGEtdGl0bGVcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2g0PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RJdGVtTWV0YVRpdGxlQ29tcG9uZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtaXRlbS1tZXRhLWRlc2NyaXB0aW9uJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtTWV0YURlc2NyaXB0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LWxpc3QtaXRlbS1tZXRhLWRlc2NyaXB0aW9uXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEl0ZW1NZXRhRGVzY3JpcHRpb25Db21wb25lbnQge31cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1pdGVtLW1ldGEtYXZhdGFyJyxcbiAgZXhwb3J0QXM6ICduekxpc3RJdGVtTWV0YUF2YXRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1saXN0LWl0ZW0tbWV0YS1hdmF0YXJcIj5cbiAgICAgIDxuei1hdmF0YXIgKm5nSWY9XCJuelNyY1wiIFtuelNyY109XCJuelNyY1wiPjwvbnotYXZhdGFyPlxuICAgICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhbnpTcmNcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEl0ZW1NZXRhQXZhdGFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpTcmM/OiBzdHJpbmc7XG59XG4iXX0=