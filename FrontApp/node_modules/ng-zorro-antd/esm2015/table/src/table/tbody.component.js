/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/* tslint:disable:component-selector */
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzTableStyleService } from '../table-style.service';
export class NzTbodyComponent {
    constructor(nzTableStyleService) {
        this.nzTableStyleService = nzTableStyleService;
        this.isInsideTable = false;
        this.showEmpty$ = new BehaviorSubject(false);
        this.noResult$ = new BehaviorSubject(undefined);
        this.listOfMeasureColumn$ = new BehaviorSubject([]);
        this.isInsideTable = !!this.nzTableStyleService;
        if (this.nzTableStyleService) {
            const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.nzTableStyleService;
            noResult$.subscribe(this.noResult$);
            listOfMeasureColumn$.subscribe(this.listOfMeasureColumn$);
            showEmpty$.subscribe(this.showEmpty$);
        }
    }
    onListOfAutoWidthChange(listOfAutoWidth) {
        this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
    }
}
NzTbodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'tbody',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
      <tr
        nz-table-measure-row
        *ngIf="isInsideTable && listOfMeasureColumn.length"
        [listOfMeasureColumn]="listOfMeasureColumn"
        (listOfAutoWidth)="onListOfAutoWidthChange($event)"
      ></tr>
    </ng-container>
    <ng-content></ng-content>
    <tr class="ant-table-placeholder" nz-table-fixed-row *ngIf="showEmpty$ | async">
      <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!"></nz-embed-empty>
    </tr>
  `,
                host: {
                    '[class.ant-table-tbody]': 'isInsideTable'
                }
            },] }
];
NzTbodyComponent.ctorParameters = () => [
    { type: NzTableStyleService, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJvZHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90YWJsZS8iLCJzb3VyY2VzIjpbInNyYy90YWJsZS90Ym9keS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBQ0gsdUNBQXVDO0FBRXZDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFlLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUF5QjdELE1BQU0sT0FBTyxnQkFBZ0I7SUFNM0IsWUFBZ0MsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFMeEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ2pELGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBOEMsU0FBUyxDQUFDLENBQUM7UUFDeEYseUJBQW9CLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFHdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1lBQ2pGLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMxRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxlQUF5QjtRQUMvQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsT0FBTztnQkFDakIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7R0FhVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0oseUJBQXlCLEVBQUUsZUFBZTtpQkFDM0M7YUFDRjs7O1lBeEJRLG1CQUFtQix1QkErQmIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG4vKiB0c2xpbnQ6ZGlzYWJsZTpjb21wb25lbnQtc2VsZWN0b3IgKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT3B0aW9uYWwsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTnpUYWJsZVN0eWxlU2VydmljZSB9IGZyb20gJy4uL3RhYmxlLXN0eWxlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0Ym9keScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGlzdE9mTWVhc3VyZUNvbHVtbiQgfCBhc3luYyBhcyBsaXN0T2ZNZWFzdXJlQ29sdW1uXCI+XG4gICAgICA8dHJcbiAgICAgICAgbnotdGFibGUtbWVhc3VyZS1yb3dcbiAgICAgICAgKm5nSWY9XCJpc0luc2lkZVRhYmxlICYmIGxpc3RPZk1lYXN1cmVDb2x1bW4ubGVuZ3RoXCJcbiAgICAgICAgW2xpc3RPZk1lYXN1cmVDb2x1bW5dPVwibGlzdE9mTWVhc3VyZUNvbHVtblwiXG4gICAgICAgIChsaXN0T2ZBdXRvV2lkdGgpPVwib25MaXN0T2ZBdXRvV2lkdGhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+PC90cj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPHRyIGNsYXNzPVwiYW50LXRhYmxlLXBsYWNlaG9sZGVyXCIgbnotdGFibGUtZml4ZWQtcm93ICpuZ0lmPVwic2hvd0VtcHR5JCB8IGFzeW5jXCI+XG4gICAgICA8bnotZW1iZWQtZW1wdHkgbnpDb21wb25lbnROYW1lPVwidGFibGVcIiBbc3BlY2lmaWNDb250ZW50XT1cIihub1Jlc3VsdCQgfCBhc3luYykhXCI+PC9uei1lbWJlZC1lbXB0eT5cbiAgICA8L3RyPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdGFibGUtdGJvZHldJzogJ2lzSW5zaWRlVGFibGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYm9keUNvbXBvbmVudCB7XG4gIGlzSW5zaWRlVGFibGUgPSBmYWxzZTtcbiAgc2hvd0VtcHR5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBub1Jlc3VsdCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gIGxpc3RPZk1lYXN1cmVDb2x1bW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgbnpUYWJsZVN0eWxlU2VydmljZTogTnpUYWJsZVN0eWxlU2VydmljZSkge1xuICAgIHRoaXMuaXNJbnNpZGVUYWJsZSA9ICEhdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlO1xuICAgIGlmICh0aGlzLm56VGFibGVTdHlsZVNlcnZpY2UpIHtcbiAgICAgIGNvbnN0IHsgc2hvd0VtcHR5JCwgbm9SZXN1bHQkLCBsaXN0T2ZNZWFzdXJlQ29sdW1uJCB9ID0gdGhpcy5uelRhYmxlU3R5bGVTZXJ2aWNlO1xuICAgICAgbm9SZXN1bHQkLnN1YnNjcmliZSh0aGlzLm5vUmVzdWx0JCk7XG4gICAgICBsaXN0T2ZNZWFzdXJlQ29sdW1uJC5zdWJzY3JpYmUodGhpcy5saXN0T2ZNZWFzdXJlQ29sdW1uJCk7XG4gICAgICBzaG93RW1wdHkkLnN1YnNjcmliZSh0aGlzLnNob3dFbXB0eSQpO1xuICAgIH1cbiAgfVxuXG4gIG9uTGlzdE9mQXV0b1dpZHRoQ2hhbmdlKGxpc3RPZkF1dG9XaWR0aDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICB0aGlzLm56VGFibGVTdHlsZVNlcnZpY2Uuc2V0TGlzdE9mQXV0b1dpZHRoKGxpc3RPZkF1dG9XaWR0aCk7XG4gIH1cbn1cbiJdfQ==