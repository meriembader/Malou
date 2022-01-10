/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
export class NzListEmptyComponent {
}
NzListEmptyComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-empty',
                exportAs: 'nzListHeader',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `,
                host: {
                    class: 'ant-list-empty-text'
                }
            },] }
];
NzListEmptyComponent.propDecorators = {
    nzNoResult: [{ type: Input }]
};
export class NzListHeaderComponent {
}
NzListHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-header',
                exportAs: 'nzListHeader',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'ant-list-header'
                }
            },] }
];
export class NzListFooterComponent {
}
NzListFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-footer',
                exportAs: 'nzListFooter',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'ant-list-footer'
                }
            },] }
];
export class NzListPaginationComponent {
}
NzListPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-list-pagination',
                exportAs: 'nzListPagination',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: ` <ng-content></ng-content> `,
                host: {
                    class: 'ant-list-pagination'
                }
            },] }
];
export class NzListLoadMoreDirective {
}
NzListLoadMoreDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-list-load-more',
                exportAs: 'nzListLoadMoreDirective'
            },] }
];
export class NzListGridDirective {
}
NzListGridDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-list[nzGrid]',
                host: {
                    class: 'ant-list-grid'
                }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jZWxsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9saXN0LyIsInNvdXJjZXMiOlsibGlzdC1jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZSxNQUFNLGVBQWUsQ0FBQztBQVdsRyxNQUFNLE9BQU8sb0JBQW9COzs7WUFUaEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsY0FBYztnQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSwrRkFBK0Y7Z0JBQ3pHLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUscUJBQXFCO2lCQUM3QjthQUNGOzs7eUJBRUUsS0FBSzs7QUFZUixNQUFNLE9BQU8scUJBQXFCOzs7WUFUakMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQkFBaUI7aUJBQ3pCO2FBQ0Y7O0FBWUQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBVGpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYztnQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsaUJBQWlCO2lCQUN6QjthQUNGOztBQVlELE1BQU0sT0FBTyx5QkFBeUI7OztZQVRyQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUscUJBQXFCO2lCQUM3QjthQUNGOztBQU9ELE1BQU0sT0FBTyx1QkFBdUI7OztZQUpuQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFLHlCQUF5QjthQUNwQzs7QUFTRCxNQUFNLE9BQU8sbUJBQW1COzs7WUFOL0IsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsZUFBZTtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtZW1wdHknLFxuICBleHBvcnRBczogJ256TGlzdEhlYWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYCA8bnotZW1iZWQtZW1wdHkgW256Q29tcG9uZW50TmFtZV09XCInbGlzdCdcIiBbc3BlY2lmaWNDb250ZW50XT1cIm56Tm9SZXN1bHRcIj48L256LWVtYmVkLWVtcHR5PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1lbXB0eS10ZXh0J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEVtcHR5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpOb1Jlc3VsdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWhlYWRlcicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0SGVhZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtaGVhZGVyJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEhlYWRlckNvbXBvbmVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWZvb3RlcicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0Rm9vdGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtZm9vdGVyJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEZvb3RlckNvbXBvbmVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LXBhZ2luYXRpb24nLFxuICBleHBvcnRBczogJ256TGlzdFBhZ2luYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1wYWdpbmF0aW9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1sb2FkLW1vcmUnLFxuICBleHBvcnRBczogJ256TGlzdExvYWRNb3JlRGlyZWN0aXZlJ1xufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RMb2FkTW9yZURpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei1saXN0W256R3JpZF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1ncmlkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEdyaWREaXJlY3RpdmUge31cbiJdfQ==