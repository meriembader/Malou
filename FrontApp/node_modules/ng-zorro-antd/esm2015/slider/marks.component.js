/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzSliderMarksComponent {
    constructor() {
        this.lowerBound = null;
        this.upperBound = null;
        this.marksArray = [];
        this.vertical = false;
        this.included = false;
        this.marks = [];
    }
    ngOnChanges(changes) {
        const { marksArray, lowerBound, upperBound } = changes;
        if (marksArray) {
            this.buildMarks();
        }
        if (marksArray || lowerBound || upperBound) {
            this.togglePointActive();
        }
    }
    trackById(_index, mark) {
        return mark.value;
    }
    buildMarks() {
        const range = this.max - this.min;
        this.marks = this.marksArray.map(mark => {
            const { value, offset, config } = mark;
            const style = this.getMarkStyles(value, range, config);
            const label = isConfigObject(config) ? config.label : config;
            return {
                label,
                offset,
                style,
                value,
                config,
                active: false
            };
        });
    }
    getMarkStyles(value, range, config) {
        let style;
        if (this.vertical) {
            style = {
                marginBottom: '-50%',
                bottom: `${((value - this.min) / range) * 100}%`
            };
        }
        else {
            style = {
                transform: `translate3d(-50%, 0, 0)`,
                left: `${((value - this.min) / range) * 100}%`
            };
        }
        if (isConfigObject(config) && config.style) {
            style = Object.assign(Object.assign({}, style), config.style);
        }
        return style;
    }
    togglePointActive() {
        if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
            this.marks.forEach(mark => {
                const value = mark.value;
                const isActive = (!this.included && value === this.upperBound) || (this.included && value <= this.upperBound && value >= this.lowerBound);
                mark.active = isActive;
            });
        }
    }
}
NzSliderMarksComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                selector: 'nz-slider-marks',
                exportAs: 'nzSliderMarks',
                template: `
    <div class="ant-slider-mark">
      <span
        class="ant-slider-mark-text"
        *ngFor="let attr of marks; trackBy: trackById"
        [class.ant-slider-mark-active]="attr.active"
        [ngStyle]="attr.style!"
        [innerHTML]="attr.label"
      >
      </span>
    </div>
  `
            },] }
];
NzSliderMarksComponent.propDecorators = {
    lowerBound: [{ type: Input }],
    upperBound: [{ type: Input }],
    marksArray: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    vertical: [{ type: Input }],
    included: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderMarksComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderMarksComponent.prototype, "included", void 0);
function isConfigObject(config) {
    return typeof config !== 'string';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zbGlkZXIvIiwic291cmNlcyI6WyJtYXJrcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2SCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUF1QnZELE1BQU0sT0FBTyxzQkFBc0I7SUFuQm5DO1FBdUJXLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDLGVBQVUsR0FBcUIsRUFBRSxDQUFDO1FBR2xCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQyxVQUFLLEdBQXNCLEVBQUUsQ0FBQztJQXNFaEMsQ0FBQztJQXBFQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRXZELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO1FBRUQsSUFBSSxVQUFVLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUMxQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYyxFQUFFLElBQXFCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRU8sVUFBVTtRQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxD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IG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOekRpc3BsYXllZE1hcmssIE56RXh0ZW5kZWRNYXJrLCBOek1hcmssIE56TWFya09iaiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLW1hcmtzJyxcbiAgZXhwb3J0QXM6ICduelNsaWRlck1hcmtzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LXNsaWRlci1tYXJrXCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz1cImFudC1zbGlkZXItbWFyay10ZXh0XCJcbiAgICAgICAgKm5nRm9yPVwibGV0IGF0dHIgb2YgbWFya3M7IHRyYWNrQnk6IHRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hbnQtc2xpZGVyLW1hcmstYWN0aXZlXT1cImF0dHIuYWN0aXZlXCJcbiAgICAgICAgW25nU3R5bGVdPVwiYXR0ci5zdHlsZSFcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cImF0dHIubGFiZWxcIlxuICAgICAgPlxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2xpZGVyTWFya3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luY2x1ZGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbG93ZXJCb3VuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHVwcGVyQm91bmQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtYXJrc0FycmF5OiBOekV4dGVuZGVkTWFya1tdID0gW107XG4gIEBJbnB1dCgpIG1pbiE6IG51bWJlcjtcbiAgQElucHV0KCkgbWF4ITogbnVtYmVyO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgdmVydGljYWwgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIGluY2x1ZGVkID0gZmFsc2U7XG5cbiAgbWFya3M6IE56RGlzcGxheWVkTWFya1tdID0gW107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbWFya3NBcnJheSwgbG93ZXJCb3VuZCwgdXBwZXJCb3VuZCB9ID0gY2hhbmdlcztcblxuICAgIGlmIChtYXJrc0FycmF5KSB7XG4gICAgICB0aGlzLmJ1aWxkTWFya3MoKTtcbiAgICB9XG5cbiAgICBpZiAobWFya3NBcnJheSB8fCBsb3dlckJvdW5kIHx8IHVwcGVyQm91bmQpIHtcbiAgICAgIHRoaXMudG9nZ2xlUG9pbnRBY3RpdmUoKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5SWQoX2luZGV4OiBudW1iZXIsIG1hcms6IE56RGlzcGxheWVkTWFyayk6IG51bWJlciB7XG4gICAgcmV0dXJuIG1hcmsudmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkTWFya3MoKTogdm9pZCB7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLm1heCAtIHRoaXMubWluO1xuXG4gICAgdGhpcy5tYXJrcyA9IHRoaXMubWFya3NBcnJheS5tYXAobWFyayA9PiB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBvZmZzZXQsIGNvbmZpZyB9ID0gbWFyaztcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5nZXRNYXJrU3R5bGVzKHZhbHVlLCByYW5nZSwgY29uZmlnKTtcbiAgICAgIGNvbnN0IGxhYmVsID0gaXNDb25maWdPYmplY3QoY29uZmlnKSA/IGNvbmZpZy5sYWJlbCA6IGNvbmZpZztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIG9mZnNldCxcbiAgICAgICAgc3R5bGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb25maWcsXG4gICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE1hcmtTdHlsZXModmFsdWU6IG51bWJlciwgcmFuZ2U6IG51bWJlciwgY29uZmlnOiBOek1hcmspOiBOZ1N0eWxlSW50ZXJmYWNlIHtcbiAgICBsZXQgc3R5bGU7XG5cbiAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgc3R5bGUgPSB7XG4gICAgICAgIG1hcmdpbkJvdHRvbTogJy01MCUnLFxuICAgICAgICBib3R0b206IGAkeygodmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSkgKiAxMDB9JWBcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlID0ge1xuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgtNTAlLCAwLCAwKWAsXG4gICAgICAgIGxlZnQ6IGAkeygodmFsdWUgLSB0aGlzLm1pbikgLyByYW5nZSkgKiAxMDB9JWBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzQ29uZmlnT2JqZWN0KGNvbmZpZykgJiYgY29uZmlnLnN0eWxlKSB7XG4gICAgICBzdHlsZSA9IHsgLi4uc3R5bGUsIC4uLmNvbmZpZy5zdHlsZSB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdHlsZTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlUG9pbnRBY3RpdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWFya3MgJiYgdGhpcy5sb3dlckJvdW5kICE9PSBudWxsICYmIHRoaXMudXBwZXJCb3VuZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5tYXJrcy5mb3JFYWNoKG1hcmsgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG1hcmsudmFsdWU7XG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID1cbiAgICAgICAgICAoIXRoaXMuaW5jbHVkZWQgJiYgdmFsdWUgPT09IHRoaXMudXBwZXJCb3VuZCkgfHwgKHRoaXMuaW5jbHVkZWQgJiYgdmFsdWUgPD0gdGhpcy51cHBlckJvdW5kISAmJiB2YWx1ZSA+PSB0aGlzLmxvd2VyQm91bmQhKTtcblxuICAgICAgICBtYXJrLmFjdGl2ZSA9IGlzQWN0aXZlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzQ29uZmlnT2JqZWN0KGNvbmZpZzogTnpNYXJrKTogY29uZmlnIGlzIE56TWFya09iaiB7XG4gIHJldHVybiB0eXBlb2YgY29uZmlnICE9PSAnc3RyaW5nJztcbn1cbiJdfQ==