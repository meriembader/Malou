/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalOptions } from './modal-types';
export class NzModalTitleComponent {
    constructor(config) {
        this.config = config;
    }
}
NzModalTitleComponent.decorators = [
    { type: Component, args: [{
                selector: 'div[nz-modal-title]',
                exportAs: 'NzModalTitleBuiltin',
                template: `
    <div class="ant-modal-title">
      <ng-container *nzStringTemplateOutlet="config.nzTitle">
        <div [innerHTML]="config.nzTitle"></div>
      </ng-container>
    </div>
  `,
                host: {
                    class: 'ant-modal-header'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzModalTitleComponent.ctorParameters = () => [
    { type: ModalOptions }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLXRpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFpQjdDLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBbUIsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUFHLENBQUM7OztZQWhCNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUFoQlEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Rpdltuei1tb2RhbC10aXRsZV0nLFxuICBleHBvcnRBczogJ056TW9kYWxUaXRsZUJ1aWx0aW4nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtbW9kYWwtdGl0bGVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJjb25maWcubnpUaXRsZVwiPlxuICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiY29uZmlnLm56VGl0bGVcIj48L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbW9kYWwtaGVhZGVyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOek1vZGFsVGl0bGVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBNb2RhbE9wdGlvbnMpIHt9XG59XG4iXX0=