/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { NzCommentActionComponent as CommentAction } from './comment-cells';
export class NzCommentComponent {
    constructor() { }
}
NzCommentComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-comment',
                exportAs: 'nzComment',
                template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          <span *ngIf="nzAuthor" class="ant-comment-content-author-name">
            <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
          </span>
          <span *ngIf="nzDatetime" class="ant-comment-content-author-time">
            <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
          </span>
        </div>
        <ng-content select="nz-comment-content"></ng-content>
        <ul class="ant-comment-actions" *ngIf="actions?.length">
          <li *ngFor="let action of actions">
            <span><ng-template [nzCommentActionHost]="action.content"></ng-template></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content></ng-content>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    class: 'ant-comment'
                }
            },] }
];
NzCommentComponent.ctorParameters = () => [];
NzCommentComponent.propDecorators = {
    nzAuthor: [{ type: Input }],
    nzDatetime: [{ type: Input }],
    actions: [{ type: ContentChildren, args: [CommentAction,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2NvbW1lbnQvIiwic291cmNlcyI6WyJjb21tZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRJLE9BQU8sRUFBRSx3QkFBd0IsSUFBSSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXFDNUUsTUFBTSxPQUFPLGtCQUFrQjtJQUs3QixnQkFBZSxDQUFDOzs7WUF4Q2pCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCVDtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsYUFBYTtpQkFDckI7YUFDRjs7Ozt1QkFFRSxLQUFLO3lCQUNMLEtBQUs7c0JBRUwsZUFBZSxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekNvbW1lbnRBY3Rpb25Db21wb25lbnQgYXMgQ29tbWVudEFjdGlvbiB9IGZyb20gJy4vY29tbWVudC1jZWxscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNvbW1lbnQnLFxuICBleHBvcnRBczogJ256Q29tbWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1jb21tZW50LWlubmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LWNvbW1lbnQtYXZhdGFyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LWF2YXRhcltuei1jb21tZW50LWF2YXRhcl1cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY29tbWVudC1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY29tbWVudC1jb250ZW50LWF1dGhvclwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibnpBdXRob3JcIiBjbGFzcz1cImFudC1jb21tZW50LWNvbnRlbnQtYXV0aG9yLW5hbWVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekF1dGhvclwiPnt7IG56QXV0aG9yIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibnpEYXRldGltZVwiIGNsYXNzPVwiYW50LWNvbW1lbnQtY29udGVudC1hdXRob3ItdGltZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RGF0ZXRpbWVcIj57eyBuekRhdGV0aW1lIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotY29tbWVudC1jb250ZW50XCI+PC9uZy1jb250ZW50PlxuICAgICAgICA8dWwgY2xhc3M9XCJhbnQtY29tbWVudC1hY3Rpb25zXCIgKm5nSWY9XCJhY3Rpb25zPy5sZW5ndGhcIj5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zXCI+XG4gICAgICAgICAgICA8c3Bhbj48bmctdGVtcGxhdGUgW256Q29tbWVudEFjdGlvbkhvc3RdPVwiYWN0aW9uLmNvbnRlbnRcIj48L25nLXRlbXBsYXRlPjwvc3Bhbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1jb21tZW50LW5lc3RlZFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWNvbW1lbnQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDb21tZW50Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpBdXRob3I/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpEYXRldGltZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQ29tbWVudEFjdGlvbikgYWN0aW9ucyE6IFF1ZXJ5TGlzdDxDb21tZW50QWN0aW9uPjtcbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIl19