/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
export class NzPaginationItemComponent {
    constructor() {
        this.active = false;
        this.index = null;
        this.disabled = false;
        this.type = null;
        this.itemRender = null;
        this.diffIndex = new EventEmitter();
        this.gotoIndex = new EventEmitter();
        this.title = null;
    }
    clickItem() {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit(this.index);
            }
            else {
                this.diffIndex.emit({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                }[this.type]);
            }
        }
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        const { locale, index, type } = changes;
        if (locale || index || type) {
            this.title = {
                page: `${this.index}`,
                next: (_a = this.locale) === null || _a === void 0 ? void 0 : _a.next_page,
                prev: (_b = this.locale) === null || _b === void 0 ? void 0 : _b.prev_page,
                prev_5: (_c = this.locale) === null || _c === void 0 ? void 0 : _c.prev_5,
                next_5: (_d = this.locale) === null || _d === void 0 ? void 0 : _d.next_5
            }[this.type];
        }
    }
}
NzPaginationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'li[nz-pagination-item]',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'"><i nz-icon nzType="left"></i></button>
        <button [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'"><i nz-icon nzType="right"></i></button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <i *ngSwitchCase="'prev_5'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                <i *ngSwitchCase="'next_5'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
                host: {
                    '[class.ant-pagination-prev]': `type === 'prev'`,
                    '[class.ant-pagination-next]': `type === 'next'`,
                    '[class.ant-pagination-item]': `type === 'page'`,
                    '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
                    '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
                    '[class.ant-pagination-jump-next]': `type === 'next_5'`,
                    '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
                    '[class.ant-pagination-disabled]': 'disabled',
                    '[class.ant-pagination-item-active]]': 'active',
                    '[attr.title]': 'title',
                    '(click)': 'clickItem()'
                }
            },] }
];
NzPaginationItemComponent.propDecorators = {
    active: [{ type: Input }],
    locale: [{ type: Input }],
    index: [{ type: Input }],
    disabled: [{ type: Input }],
    type: [{ type: Input }],
    itemRender: [{ type: Input }],
    diffIndex: [{ type: Output }],
    gotoIndex: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvcGFnaW5hdGlvbi8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBR04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBZ0R2QixNQUFNLE9BQU8seUJBQXlCO0lBM0N0QztRQStDVyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFDNUIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixTQUFJLEdBQXVDLElBQUksQ0FBQztRQUNoRCxlQUFVLEdBQW9ELElBQUksQ0FBQztRQUN6RCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN2QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxRCxVQUFLLEdBQWtCLElBQUksQ0FBQztJQTZCOUIsQ0FBQztJQTVCQyxTQUFTO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNoQjtvQkFDQyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQ1YsTUFBTSxFQUFFLENBQUM7aUJBQ0ksQ0FBQyxJQUFJLENBQUMsSUFBSyxDQUFDLENBQzVCLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFzQjs7UUFDaEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBSTtnQkFDWixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNyQixJQUFJLFFBQUUsSUFBSSxDQUFDLE1BQU0sMENBQUUsU0FBUztnQkFDNUIsSUFBSSxRQUFFLElBQUksQ0FBQyxNQUFNLDBDQUFFLFNBQVM7Z0JBQzVCLE1BQU0sUUFBRSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNO2dCQUMzQixNQUFNLFFBQUUsSUFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTTthQUNkLENBQUMsSUFBSSxDQUFDLElBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7O1lBbkZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLDZCQUE2QixFQUFFLGlCQUFpQjtvQkFDaEQsNkJBQTZCLEVBQUUsaUJBQWlCO29CQUNoRCw2QkFBNkIsRUFBRSxpQkFBaUI7b0JBQ2hELGtDQUFrQyxFQUFFLG1CQUFtQjtvQkFDdkQsOENBQThDLEVBQUUsbUJBQW1CO29CQUNuRSxrQ0FBa0MsRUFBRSxtQkFBbUI7b0JBQ3ZELDhDQUE4QyxFQUFFLG1CQUFtQjtvQkFDbkUsaUNBQWlDLEVBQUUsVUFBVTtvQkFDN0MscUNBQXFDLEVBQUUsUUFBUTtvQkFDL0MsY0FBYyxFQUFFLE9BQU87b0JBQ3ZCLFNBQVMsRUFBRSxhQUFhO2lCQUN6QjthQUNGOzs7cUJBS0UsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzttQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsTUFBTTt3QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dCwgUGFnaW5hdGlvbkl0ZW1UeXBlIH0gZnJvbSAnLi9wYWdpbmF0aW9uLnR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGlbbnotcGFnaW5hdGlvbi1pdGVtXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI3JlbmRlckl0ZW1UZW1wbGF0ZSBsZXQtdHlwZSBsZXQtcGFnZT1cInBhZ2VcIj5cbiAgICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cInR5cGVcIj5cbiAgICAgICAgPGEgKm5nU3dpdGNoQ2FzZT1cIidwYWdlJ1wiPnt7IHBhZ2UgfX08L2E+XG4gICAgICAgIDxidXR0b24gW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWxpbmtcIiAqbmdTd2l0Y2hDYXNlPVwiJ3ByZXYnXCI+PGkgbnotaWNvbiBuelR5cGU9XCJsZWZ0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rXCIgKm5nU3dpdGNoQ2FzZT1cIiduZXh0J1wiPjxpIG56LWljb24gbnpUeXBlPVwicmlnaHRcIj48L2k+PC9idXR0b24+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgICA8YSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tbGlua1wiIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1jb250YWluZXJcIiAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG4gICAgICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidwcmV2XzUnXCIgbnotaWNvbiBuelR5cGU9XCJkb3VibGUtbGVmdFwiIGNsYXNzPVwiYW50LXBhZ2luYXRpb24taXRlbS1saW5rLWljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIiduZXh0XzUnXCIgbnotaWNvbiBuelR5cGU9XCJkb3VibGUtcmlnaHRcIiBjbGFzcz1cImFudC1wYWdpbmF0aW9uLWl0ZW0tbGluay1pY29uXCI+PC9pPlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtcGFnaW5hdGlvbi1pdGVtLWVsbGlwc2lzXCI+4oCi4oCi4oCiPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpdGVtUmVuZGVyIHx8IHJlbmRlckl0ZW1UZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IHR5cGUsIHBhZ2U6IGluZGV4IH1cIlxuICAgID48L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1wcmV2XSc6IGB0eXBlID09PSAncHJldidgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tbmV4dF0nOiBgdHlwZSA9PT0gJ25leHQnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWl0ZW1dJzogYHR5cGUgPT09ICdwYWdlJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1qdW1wLXByZXZdJzogYHR5cGUgPT09ICdwcmV2XzUnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWp1bXAtcHJldi1jdXN0b20taWNvbl0nOiBgdHlwZSA9PT0gJ3ByZXZfNSdgLFxuICAgICdbY2xhc3MuYW50LXBhZ2luYXRpb24tanVtcC1uZXh0XSc6IGB0eXBlID09PSAnbmV4dF81J2AsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1qdW1wLW5leHQtY3VzdG9tLWljb25dJzogYHR5cGUgPT09ICduZXh0XzUnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1pdGVtLWFjdGl2ZV1dJzogJ2FjdGl2ZScsXG4gICAgJ1thdHRyLnRpdGxlXSc6ICd0aXRsZScsXG4gICAgJyhjbGljayknOiAnY2xpY2tJdGVtKCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV90eXBlOiBQYWdpbmF0aW9uSXRlbVR5cGUgfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5kZXg6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxvY2FsZSE6IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgdHlwZTogUGFnaW5hdGlvbkl0ZW1UeXBlIHwgc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRpZmZJbmRleCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZ290b0luZGV4ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHRpdGxlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgY2xpY2tJdGVtKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgIHRoaXMuZ290b0luZGV4LmVtaXQodGhpcy5pbmRleCEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaWZmSW5kZXguZW1pdChcbiAgICAgICAgICAoe1xuICAgICAgICAgICAgbmV4dDogMSxcbiAgICAgICAgICAgIHByZXY6IC0xLFxuICAgICAgICAgICAgcHJldl81OiAtNSxcbiAgICAgICAgICAgIG5leHRfNTogNVxuICAgICAgICAgIH0gYXMgTnpTYWZlQW55KVt0aGlzLnR5cGUhXVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBsb2NhbGUsIGluZGV4LCB0eXBlIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChsb2NhbGUgfHwgaW5kZXggfHwgdHlwZSkge1xuICAgICAgdGhpcy50aXRsZSA9ICh7XG4gICAgICAgIHBhZ2U6IGAke3RoaXMuaW5kZXh9YCxcbiAgICAgICAgbmV4dDogdGhpcy5sb2NhbGU/Lm5leHRfcGFnZSxcbiAgICAgICAgcHJldjogdGhpcy5sb2NhbGU/LnByZXZfcGFnZSxcbiAgICAgICAgcHJldl81OiB0aGlzLmxvY2FsZT8ucHJldl81LFxuICAgICAgICBuZXh0XzU6IHRoaXMubG9jYWxlPy5uZXh0XzVcbiAgICAgIH0gYXMgTnpTYWZlQW55KVt0aGlzLnR5cGUhXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==