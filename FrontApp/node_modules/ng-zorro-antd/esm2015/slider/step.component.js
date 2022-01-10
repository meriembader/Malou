/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';
export class NzSliderStepComponent {
    constructor() {
        this.lowerBound = null;
        this.upperBound = null;
        this.marksArray = [];
        this.vertical = false;
        this.included = false;
        this.steps = [];
    }
    ngOnChanges(changes) {
        if (changes.marksArray) {
            this.buildSteps();
        }
        if (changes.marksArray || changes.lowerBound || changes.upperBound) {
            this.togglePointActive();
        }
    }
    trackById(_index, step) {
        return step.value;
    }
    buildSteps() {
        const orient = this.vertical ? 'bottom' : 'left';
        this.steps = this.marksArray.map(mark => {
            const { value, offset, config } = mark;
            return {
                value,
                offset,
                config,
                active: false,
                style: {
                    [orient]: `${offset}%`
                }
            };
        });
    }
    togglePointActive() {
        if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
            this.steps.forEach(step => {
                const value = step.value;
                const isActive = (!this.included && value === this.upperBound) || (this.included && value <= this.upperBound && value >= this.lowerBound);
                step.active = isActive;
            });
        }
    }
}
NzSliderStepComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-slider-step',
                exportAs: 'nzSliderStep',
                preserveWhitespaces: false,
                template: `
    <div class="ant-slider-step">
      <span
        class="ant-slider-dot"
        *ngFor="let mark of steps; trackBy: trackById"
        [class.ant-slider-dot-active]="mark.active"
        [ngStyle]="mark.style!"
      >
      </span>
    </div>
  `
            },] }
];
NzSliderStepComponent.propDecorators = {
    lowerBound: [{ type: Input }],
    upperBound: [{ type: Input }],
    marksArray: [{ type: Input }],
    vertical: [{ type: Input }],
    included: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderStepComponent.prototype, "vertical", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzSliderStepComponent.prototype, "included", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3NsaWRlci8iLCJzb3VyY2VzIjpbInN0ZXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRzs7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBc0J2RCxNQUFNLE9BQU8scUJBQXFCO0lBbEJsQztRQXNCVyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQyxlQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUMsVUFBSyxHQUFzQixFQUFFLENBQUM7SUEyQ2hDLENBQUM7SUF6Q0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjLEVBQUUsSUFBcUI7UUFDN0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFTyxVQUFVO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRWpELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBRXZDLE9BQU87Z0JBQ0wsS0FBSztnQkFDTCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsS0FBSyxFQUFFO29CQUNMLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUc7aUJBQ3ZCO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDdEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLE1BQU0sUUFBUSxHQUNaLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVyxDQUFDLENBQUM7Z0JBQzdILElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUF0RUYsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2FBQ0Y7Ozt5QkFLRSxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7O0FBRG1CO0lBQWYsWUFBWSxFQUFFOzt1REFBa0I7QUFDakI7SUFBZixZQUFZLEVBQUU7O3VEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56RGlzcGxheWVkU3RlcCwgTnpFeHRlbmRlZE1hcmsgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotc2xpZGVyLXN0ZXAnLFxuICBleHBvcnRBczogJ256U2xpZGVyU3RlcCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtc2xpZGVyLXN0ZXBcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPVwiYW50LXNsaWRlci1kb3RcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgbWFyayBvZiBzdGVwczsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFudC1zbGlkZXItZG90LWFjdGl2ZV09XCJtYXJrLmFjdGl2ZVwiXG4gICAgICAgIFtuZ1N0eWxlXT1cIm1hcmsuc3R5bGUhXCJcbiAgICAgID5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOelNsaWRlclN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfdmVydGljYWw6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luY2x1ZGVkOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbG93ZXJCb3VuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHVwcGVyQm91bmQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBtYXJrc0FycmF5OiBOekV4dGVuZGVkTWFya1tdID0gW107XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSB2ZXJ0aWNhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgaW5jbHVkZWQgPSBmYWxzZTtcblxuICBzdGVwczogTnpEaXNwbGF5ZWRTdGVwW10gPSBbXTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubWFya3NBcnJheSkge1xuICAgICAgdGhpcy5idWlsZFN0ZXBzKCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLm1hcmtzQXJyYXkgfHwgY2hhbmdlcy5sb3dlckJvdW5kIHx8IGNoYW5nZXMudXBwZXJCb3VuZCkge1xuICAgICAgdGhpcy50b2dnbGVQb2ludEFjdGl2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnlJZChfaW5kZXg6IG51bWJlciwgc3RlcDogTnpEaXNwbGF5ZWRTdGVwKTogbnVtYmVyIHtcbiAgICByZXR1cm4gc3RlcC52YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTdGVwcygpOiB2b2lkIHtcbiAgICBjb25zdCBvcmllbnQgPSB0aGlzLnZlcnRpY2FsID8gJ2JvdHRvbScgOiAnbGVmdCc7XG5cbiAgICB0aGlzLnN0ZXBzID0gdGhpcy5tYXJrc0FycmF5Lm1hcChtYXJrID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIG9mZnNldCwgY29uZmlnIH0gPSBtYXJrO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICBjb25maWcsXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgW29yaWVudF06IGAke29mZnNldH0lYFxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB0b2dnbGVQb2ludEFjdGl2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGVwcyAmJiB0aGlzLmxvd2VyQm91bmQgIT09IG51bGwgJiYgdGhpcy51cHBlckJvdW5kICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3RlcC52YWx1ZTtcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPVxuICAgICAgICAgICghdGhpcy5pbmNsdWRlZCAmJiB2YWx1ZSA9PT0gdGhpcy51cHBlckJvdW5kKSB8fCAodGhpcy5pbmNsdWRlZCAmJiB2YWx1ZSA8PSB0aGlzLnVwcGVyQm91bmQhICYmIHZhbHVlID49IHRoaXMubG93ZXJCb3VuZCEpO1xuICAgICAgICBzdGVwLmFjdGl2ZSA9IGlzQWN0aXZlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=