/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { zoomBadgeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { badgePresetColors } from './preset-colors';
const NZ_CONFIG_MODULE_NAME = 'badge';
export class NzBadgeComponent {
    constructor(nzConfigService) {
        this.nzConfigService = nzConfigService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.showSup = false;
        this.presetColor = null;
        this.nzShowZero = false;
        this.nzShowDot = true;
        this.nzStandalone = false;
        this.nzDot = false;
        this.nzOverflowCount = 99;
        this.nzColor = undefined;
        this.nzStyle = null;
        this.nzText = null;
    }
    ngOnChanges(changes) {
        const { nzColor, nzShowDot, nzDot, nzCount, nzShowZero } = changes;
        if (nzColor) {
            this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
        }
        if (nzShowDot || nzDot || nzCount || nzShowZero) {
            this.showSup = (this.nzShowDot && this.nzDot) || this.nzCount > 0 || (this.nzCount <= 0 && this.nzShowZero);
        }
    }
}
NzBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-badge',
                exportAs: 'nzBadge',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [zoomBadgeMotion],
                template: `
    <ng-container *ngIf="nzStatus || nzColor">
      <span
        class="ant-badge-status-dot ant-badge-status-{{ nzStatus || presetColor }}"
        [style.background]="!presetColor && nzColor"
        [ngStyle]="nzStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    </ng-container>
    <ng-content></ng-content>
    <ng-container *nzStringTemplateOutlet="nzCount">
      <nz-badge-sup
        *ngIf="showSup"
        [nzOffset]="nzOffset"
        [nzTitle]="nzTitle"
        [nzStyle]="nzStyle"
        [nzDot]="nzDot"
        [nzOverflowCount]="nzOverflowCount"
        [disableAnimation]="!!(nzStandalone || nzStatus || nzColor)"
        [nzCount]="nzCount"
      ></nz-badge-sup>
    </ng-container>
  `,
                host: {
                    '[class.ant-badge]': 'true',
                    '[class.ant-badge-status]': 'nzStatus',
                    '[class.ant-badge-not-a-wrapper]': '!!(nzStandalone || nzStatus || nzColor)'
                }
            },] }
];
NzBadgeComponent.ctorParameters = () => [
    { type: NzConfigService }
];
NzBadgeComponent.propDecorators = {
    nzShowZero: [{ type: Input }],
    nzShowDot: [{ type: Input }],
    nzStandalone: [{ type: Input }],
    nzDot: [{ type: Input }],
    nzOverflowCount: [{ type: Input }],
    nzColor: [{ type: Input }],
    nzStyle: [{ type: Input }],
    nzText: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzCount: [{ type: Input }],
    nzOffset: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzBadgeComponent.prototype, "nzShowZero", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzShowDot", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzStandalone", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBadgeComponent.prototype, "nzDot", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Number)
], NzBadgeComponent.prototype, "nzOverflowCount", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzBadgeComponent.prototype, "nzColor", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9iYWRnZS8iLCJzb3VyY2VzIjpbImJhZGdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXlDLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQWUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdwRCxNQUFNLHFCQUFxQixHQUFnQixPQUFPLENBQUM7QUF3Q25ELE1BQU0sT0FBTyxnQkFBZ0I7SUFxQjNCLFlBQW1CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQXBCMUMsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFLNUQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDVCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNoQixvQkFBZSxHQUFXLEVBQUUsQ0FBQztRQUM3QixZQUFPLEdBQVksU0FBUyxDQUFDO1FBQzNDLFlBQU8sR0FBcUMsSUFBSSxDQUFDO1FBQ2pELFdBQU0sR0FBdUMsSUFBSSxDQUFDO0lBTUwsQ0FBQztJQUV2RCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDbkUsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3pHO1FBQ0QsSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUU7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVEsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9HO0lBQ0gsQ0FBQzs7O1lBckVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsVUFBVSxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osbUJBQW1CLEVBQUUsTUFBTTtvQkFDM0IsMEJBQTBCLEVBQUUsVUFBVTtvQkFDdEMsaUNBQWlDLEVBQUUseUNBQXlDO2lCQUM3RTthQUNGOzs7WUE3Q3FCLGVBQWU7Ozt5QkFzRGxDLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLO29CQUNMLEtBQUs7OEJBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOztBQVhtQjtJQUFmLFlBQVksRUFBRTs7b0RBQTZCO0FBQzVCO0lBQWYsWUFBWSxFQUFFOzttREFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O3NEQUFzQjtBQUNyQjtJQUFmLFlBQVksRUFBRTs7K0NBQWU7QUFDaEI7SUFBYixVQUFVLEVBQUU7O3lEQUE4QjtBQUM3QjtJQUFiLFVBQVUsRUFBRTs7aURBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB6b29tQmFkZ2VNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IGJhZGdlUHJlc2V0Q29sb3JzIH0gZnJvbSAnLi9wcmVzZXQtY29sb3JzJztcbmltcG9ydCB7IE56QmFkZ2VTdGF0dXNUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYmFkZ2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1iYWRnZScsXG4gIGV4cG9ydEFzOiAnbnpCYWRnZScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW3pvb21CYWRnZU1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U3RhdHVzIHx8IG56Q29sb3JcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiYW50LWJhZGdlLXN0YXR1cy1kb3QgYW50LWJhZGdlLXN0YXR1cy17eyBuelN0YXR1cyB8fCBwcmVzZXRDb2xvciB9fVwiXG4gICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kXT1cIiFwcmVzZXRDb2xvciAmJiBuekNvbG9yXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpTdHlsZVwiXG4gICAgICA+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhbnQtYmFkZ2Utc3RhdHVzLXRleHRcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56VGV4dFwiPnt7IG56VGV4dCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpDb3VudFwiPlxuICAgICAgPG56LWJhZGdlLXN1cFxuICAgICAgICAqbmdJZj1cInNob3dTdXBcIlxuICAgICAgICBbbnpPZmZzZXRdPVwibnpPZmZzZXRcIlxuICAgICAgICBbbnpUaXRsZV09XCJuelRpdGxlXCJcbiAgICAgICAgW256U3R5bGVdPVwibnpTdHlsZVwiXG4gICAgICAgIFtuekRvdF09XCJuekRvdFwiXG4gICAgICAgIFtuek92ZXJmbG93Q291bnRdPVwibnpPdmVyZmxvd0NvdW50XCJcbiAgICAgICAgW2Rpc2FibGVBbmltYXRpb25dPVwiISEobnpTdGFuZGFsb25lIHx8IG56U3RhdHVzIHx8IG56Q29sb3IpXCJcbiAgICAgICAgW256Q291bnRdPVwibnpDb3VudFwiXG4gICAgICA+PC9uei1iYWRnZS1zdXA+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1iYWRnZV0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2Utc3RhdHVzXSc6ICduelN0YXR1cycsXG4gICAgJ1tjbGFzcy5hbnQtYmFkZ2Utbm90LWEtd3JhcHBlcl0nOiAnISEobnpTdGFuZGFsb25lIHx8IG56U3RhdHVzIHx8IG56Q29sb3IpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QmFkZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1plcm86IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd0RvdDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEb3Q6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U3RhbmRhbG9uZTogQm9vbGVhbklucHV0O1xuICBzaG93U3VwID0gZmFsc2U7XG4gIHByZXNldENvbG9yOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd1plcm86IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2hvd0RvdCA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelN0YW5kYWxvbmUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RG90ID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpPdmVyZmxvd0NvdW50OiBudW1iZXIgPSA5OTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuekNvbG9yPzogc3RyaW5nID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VGV4dD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56VGl0bGU/OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelN0YXR1cz86IE56QmFkZ2VTdGF0dXNUeXBlIHwgc3RyaW5nO1xuICBASW5wdXQoKSBuekNvdW50PzogbnVtYmVyIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgQElucHV0KCkgbnpPZmZzZXQ/OiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekNvbG9yLCBuelNob3dEb3QsIG56RG90LCBuekNvdW50LCBuelNob3daZXJvIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekNvbG9yKSB7XG4gICAgICB0aGlzLnByZXNldENvbG9yID0gdGhpcy5uekNvbG9yICYmIGJhZGdlUHJlc2V0Q29sb3JzLmluZGV4T2YodGhpcy5uekNvbG9yKSAhPT0gLTEgPyB0aGlzLm56Q29sb3IgOiBudWxsO1xuICAgIH1cbiAgICBpZiAobnpTaG93RG90IHx8IG56RG90IHx8IG56Q291bnQgfHwgbnpTaG93WmVybykge1xuICAgICAgdGhpcy5zaG93U3VwID0gKHRoaXMubnpTaG93RG90ICYmIHRoaXMubnpEb3QpIHx8IHRoaXMubnpDb3VudCEgPiAwIHx8ICh0aGlzLm56Q291bnQhIDw9IDAgJiYgdGhpcy5uelNob3daZXJvKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==