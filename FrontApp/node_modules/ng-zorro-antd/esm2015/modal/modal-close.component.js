/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalOptions } from './modal-types';
export class NzModalCloseComponent {
    constructor(config) {
        this.config = config;
    }
}
NzModalCloseComponent.decorators = [
    { type: Component, args: [{
                selector: 'button[nz-modal-close]',
                exportAs: 'NzModalCloseBuiltin',
                template: `
    <span class="ant-modal-close-x">
      <ng-container *nzStringTemplateOutlet="config.nzCloseIcon; let closeIcon">
        <i nz-icon [nzType]="closeIcon" class="ant-modal-close-icon"></i>
      </ng-container>
    </span>
  `,
                host: {
                    class: 'ant-modal-close',
                    'aria-label': 'Close'
                },
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzModalCloseComponent.ctorParameters = () => [
    { type: ModalOptions }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY2xvc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbIm1vZGFsLWNsb3NlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFrQjdDLE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFBbUIsTUFBb0I7UUFBcEIsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUFHLENBQUM7OztZQWpCNUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLFlBQVksRUFBRSxPQUFPO2lCQUN0QjtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBakJRLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1vZGFsT3B0aW9ucyB9IGZyb20gJy4vbW9kYWwtdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b25bbnotbW9kYWwtY2xvc2VdJyxcbiAgZXhwb3J0QXM6ICdOek1vZGFsQ2xvc2VCdWlsdGluJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC1tb2RhbC1jbG9zZS14XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiY29uZmlnLm56Q2xvc2VJY29uOyBsZXQgY2xvc2VJY29uXCI+XG4gICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJjbG9zZUljb25cIiBjbGFzcz1cImFudC1tb2RhbC1jbG9zZS1pY29uXCI+PC9pPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9zcGFuPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbW9kYWwtY2xvc2UnLFxuICAgICdhcmlhLWxhYmVsJzogJ0Nsb3NlJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOek1vZGFsQ2xvc2VDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29uZmlnOiBNb2RhbE9wdGlvbnMpIHt9XG59XG4iXX0=