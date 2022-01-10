/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
export class NzSliderTrackComponent {
    constructor() {
        this.offset = 0;
        this.reverse = false;
        this.length = 0;
        this.vertical = false;
        this.included = false;
        this.style = {};
    }
    ngOnChanges() {
        const vertical = this.vertical;
        const reverse = this.reverse;
        const visibility = this.included ? 'visible' : 'hidden';
        const offset = this.offset;
        const length = this.length;
        const positonStyle = vertical
            ? {
                [reverse ? 'top' : 'bottom']: `${offset}%`,
                [reverse ? 'bottom' : 'top']: 'auto',
                height: `${length}%`,
                visibility
            }
            : {
                [reverse ? 'right' : 'left']: `${offset}%`,
                [reverse ? 'left' : 'right']: 'auto',
                width: `${length}%`,
                visibility
            };
        this.style = positonStyle;
    }
}
NzSliderTrackComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-slider-track',
                exportAs: 'nzSliderTrack',
                preserveWhitespaces: false,
                template: ` <div class="ant-slider-track" [ngStyle]="style"></div> `
            },] }
];
NzSliderTrackComponent.propDecorators = {
    offset: [{ type: Input }],
    reverse: [{ type: Input }],
    length: [{ type: Input }],
    vertical: [{ type: Input }],
    included: [{ type: Input }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzSliderTrackComponent.prototype, "offset", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzSliderTrackComponent.prototype, "reverse", void 0);
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], NzSliderTrackComponent.prototype, "length", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderTrackComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderTrackComponent.prototype, "included", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zbGlkZXIvIiwic291cmNlcyI6WyJ0cmFjay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhHLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFrQnBFLE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFlMEIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQzFCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFDLFVBQUssR0FBdUIsRUFBRSxDQUFDO0lBeUJqQyxDQUFDO0lBdkJDLFdBQVc7UUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTNCLE1BQU0sWUFBWSxHQUF1QixRQUFRO1lBQy9DLENBQUMsQ0FBQztnQkFDRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRztnQkFDMUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTTtnQkFDcEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxHQUFHO2dCQUNwQixVQUFVO2FBQ1g7WUFDSCxDQUFDLENBQUM7Z0JBQ0UsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUc7Z0JBQzFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU07Z0JBQ3BDLEtBQUssRUFBRSxHQUFHLE1BQU0sR0FBRztnQkFDbkIsVUFBVTthQUNYLENBQUM7UUFFTixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztJQUM1QixDQUFDOzs7WUE3Q0YsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRSwwREFBMEQ7YUFDckU7OztxQkFRRSxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7O0FBSmtCO0lBQWQsV0FBVyxFQUFFOztzREFBb0I7QUFDbEI7SUFBZixZQUFZLEVBQUU7O3VEQUEwQjtBQUMxQjtJQUFkLFdBQVcsRUFBRTs7c0RBQW9CO0FBQ2xCO0lBQWYsWUFBWSxFQUFFOzt3REFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O3dEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpTbGlkZXJUcmFja1N0eWxlIHtcbiAgYm90dG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgaGVpZ2h0Pzogc3RyaW5nIHwgbnVsbDtcbiAgbGVmdD86IHN0cmluZyB8IG51bGw7XG4gIHdpZHRoPzogc3RyaW5nIHwgbnVsbDtcbiAgdmlzaWJpbGl0eT86IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXNsaWRlci10cmFjaycsXG4gIGV4cG9ydEFzOiAnbnpTbGlkZXJUcmFjaycsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYCA8ZGl2IGNsYXNzPVwiYW50LXNsaWRlci10cmFja1wiIFtuZ1N0eWxlXT1cInN0eWxlXCI+PC9kaXY+IGBcbn0pXG5leHBvcnQgY2xhc3MgTnpTbGlkZXJUcmFja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vZmZzZXQ6IE51bWJlcklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGVuZ3RoOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZlcnRpY2FsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmNsdWRlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmV2ZXJzZTogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG9mZnNldDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbGVuZ3RoOiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgdmVydGljYWwgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGluY2x1ZGVkID0gZmFsc2U7XG5cbiAgc3R5bGU6IE56U2xpZGVyVHJhY2tTdHlsZSA9IHt9O1xuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGNvbnN0IHZlcnRpY2FsID0gdGhpcy52ZXJ0aWNhbDtcbiAgICBjb25zdCByZXZlcnNlID0gdGhpcy5yZXZlcnNlO1xuICAgIGNvbnN0IHZpc2liaWxpdHkgPSB0aGlzLmluY2x1ZGVkID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG5cbiAgICBjb25zdCBwb3NpdG9uU3R5bGU6IE56U2xpZGVyVHJhY2tTdHlsZSA9IHZlcnRpY2FsXG4gICAgICA/IHtcbiAgICAgICAgICBbcmV2ZXJzZSA/ICd0b3AnIDogJ2JvdHRvbSddOiBgJHtvZmZzZXR9JWAsXG4gICAgICAgICAgW3JldmVyc2UgPyAnYm90dG9tJyA6ICd0b3AnXTogJ2F1dG8nLFxuICAgICAgICAgIGhlaWdodDogYCR7bGVuZ3RofSVgLFxuICAgICAgICAgIHZpc2liaWxpdHlcbiAgICAgICAgfVxuICAgICAgOiB7XG4gICAgICAgICAgW3JldmVyc2UgPyAncmlnaHQnIDogJ2xlZnQnXTogYCR7b2Zmc2V0fSVgLFxuICAgICAgICAgIFtyZXZlcnNlID8gJ2xlZnQnIDogJ3JpZ2h0J106ICdhdXRvJyxcbiAgICAgICAgICB3aWR0aDogYCR7bGVuZ3RofSVgLFxuICAgICAgICAgIHZpc2liaWxpdHlcbiAgICAgICAgfTtcblxuICAgIHRoaXMuc3R5bGUgPSBwb3NpdG9uU3R5bGU7XG4gIH1cbn1cbiJdfQ==