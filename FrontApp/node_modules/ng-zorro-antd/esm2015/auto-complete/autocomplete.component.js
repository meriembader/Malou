/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Host, Input, NgZone, Optional, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { defer, merge, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { NzAutocompleteOptionComponent } from './autocomplete-option.component';
export class NzAutocompleteComponent {
    constructor(changeDetectorRef, ngZone, noAnimation) {
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.noAnimation = noAnimation;
        this.nzOverlayClassName = '';
        this.nzOverlayStyle = {};
        this.nzDefaultActiveFirstOption = true;
        this.nzBackfill = false;
        this.compareWith = (o1, o2) => o1 === o2;
        this.selectionChange = new EventEmitter();
        this.showPanel = true;
        this.isOpen = false;
        this.activeItemIndex = -1;
        this.selectionChangeSubscription = Subscription.EMPTY;
        this.optionMouseEnterSubscription = Subscription.EMPTY;
        this.dataSourceChangeSubscription = Subscription.EMPTY;
        /** Options changes listener */
        this.optionSelectionChanges = defer(() => {
            if (this.options) {
                return merge(...this.options.map(option => option.selectionChange));
            }
            return this.ngZone.onStable.asObservable().pipe(take(1), switchMap(() => this.optionSelectionChanges));
        });
        this.optionMouseEnter = defer(() => {
            if (this.options) {
                return merge(...this.options.map(option => option.mouseEntered));
            }
            return this.ngZone.onStable.asObservable().pipe(take(1), switchMap(() => this.optionMouseEnter));
        });
    }
    /**
     * Options accessor, its source may be content or dataSource
     */
    get options() {
        // first dataSource
        if (this.nzDataSource) {
            return this.fromDataSourceOptions;
        }
        else {
            return this.fromContentOptions;
        }
    }
    ngAfterContentInit() {
        if (!this.nzDataSource) {
            this.optionsInit();
        }
    }
    ngAfterViewInit() {
        if (this.nzDataSource) {
            this.optionsInit();
        }
    }
    ngOnDestroy() {
        this.dataSourceChangeSubscription.unsubscribe();
        this.selectionChangeSubscription.unsubscribe();
        this.optionMouseEnterSubscription.unsubscribe();
    }
    setVisibility() {
        this.showPanel = !!this.options.length;
        this.changeDetectorRef.markForCheck();
    }
    setActiveItem(index) {
        const activeItem = this.options.toArray()[index];
        if (activeItem && !activeItem.active) {
            this.activeItem = activeItem;
            this.activeItemIndex = index;
            this.clearSelectedOptions(this.activeItem);
            this.activeItem.setActiveStyles();
            this.changeDetectorRef.markForCheck();
        }
    }
    setNextItemActive() {
        const nextIndex = this.activeItemIndex + 1 <= this.options.length - 1 ? this.activeItemIndex + 1 : 0;
        this.setActiveItem(nextIndex);
    }
    setPreviousItemActive() {
        const previousIndex = this.activeItemIndex - 1 < 0 ? this.options.length - 1 : this.activeItemIndex - 1;
        this.setActiveItem(previousIndex);
    }
    getOptionIndex(value) {
        return this.options.reduce((result, current, index) => {
            return result === -1 ? (this.compareWith(value, current.nzValue) ? index : -1) : result;
        }, -1);
    }
    getOption(value) {
        return this.options.find(item => this.compareWith(value, item.nzValue)) || null;
    }
    optionsInit() {
        this.setVisibility();
        this.subscribeOptionChanges();
        const changes = this.nzDataSource ? this.fromDataSourceOptions.changes : this.fromContentOptions.changes;
        // async
        this.dataSourceChangeSubscription = changes.subscribe(e => {
            if (!e.dirty && this.isOpen) {
                setTimeout(() => this.setVisibility());
            }
            this.subscribeOptionChanges();
        });
    }
    /**
     * Clear the status of options
     */
    clearSelectedOptions(skip, deselect = false) {
        this.options.forEach(option => {
            if (option !== skip) {
                if (deselect) {
                    option.deselect();
                }
                option.setInactiveStyles();
            }
        });
    }
    subscribeOptionChanges() {
        this.selectionChangeSubscription.unsubscribe();
        this.selectionChangeSubscription = this.optionSelectionChanges
            .pipe(filter((event) => event.isUserInput))
            .subscribe((event) => {
            event.source.select();
            event.source.setActiveStyles();
            this.activeItem = event.source;
            this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
            this.clearSelectedOptions(event.source, true);
            this.selectionChange.emit(event.source);
        });
        this.optionMouseEnterSubscription.unsubscribe();
        this.optionMouseEnterSubscription = this.optionMouseEnter.subscribe((event) => {
            event.setActiveStyles();
            this.activeItem = event;
            this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
            this.clearSelectedOptions(event);
        });
    }
}
NzAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-autocomplete',
                exportAs: 'nzAutocomplete',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-template>
      <div
        #panel
        class="ant-select-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-select-dropdown-hidden]="!showPanel"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
      >
        <div style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
          <div style="display: flex; flex-direction: column;">
            <ng-template *ngTemplateOutlet="nzDataSource ? optionsTemplate : contentTemplate"></ng-template>
          </div>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        <nz-auto-option
          *ngFor="let option of nzDataSource!"
          [nzValue]="option"
          [nzLabel]="option && $any(option).label ? $any(option).label : $any(option)"
        >
          {{ option && $any(option).label ? $any(option).label : $any(option) }}
        </nz-auto-option>
      </ng-template>
    </ng-template>
  `,
                animations: [slideMotion]
            },] }
];
NzAutocompleteComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
NzAutocompleteComponent.propDecorators = {
    nzWidth: [{ type: Input }],
    nzOverlayClassName: [{ type: Input }],
    nzOverlayStyle: [{ type: Input }],
    nzDefaultActiveFirstOption: [{ type: Input }],
    nzBackfill: [{ type: Input }],
    compareWith: [{ type: Input }],
    nzDataSource: [{ type: Input }],
    selectionChange: [{ type: Output }],
    fromContentOptions: [{ type: ContentChildren, args: [NzAutocompleteOptionComponent, { descendants: true },] }],
    fromDataSourceOptions: [{ type: ViewChildren, args: [NzAutocompleteOptionComponent,] }],
    template: [{ type: ViewChild, args: [TemplateRef, { static: false },] }],
    panel: [{ type: ViewChild, args: ['panel', { static: false },] }],
    content: [{ type: ViewChild, args: ['content', { static: false },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAutocompleteComponent.prototype, "nzDefaultActiveFirstOption", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzAutocompleteComponent.prototype, "nzBackfill", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHOztBQUVILE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixJQUFJLEVBQ0osS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXpFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLDZCQUE2QixFQUEyQixNQUFNLGlDQUFpQyxDQUFDO0FBaUR6RyxNQUFNLE9BQU8sdUJBQXVCO0lBaUVsQyxZQUNVLGlCQUFvQyxFQUNwQyxNQUFjLEVBQ0ssV0FBb0M7UUFGdkQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ0ssZ0JBQVcsR0FBWCxXQUFXLENBQXlCO1FBL0R4RCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsbUJBQWMsR0FBOEIsRUFBRSxDQUFDO1FBQy9CLCtC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LGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXBORixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7Z0JBQ0QsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQzFCOzs7WUF4RUMsaUJBQWlCO1lBT2pCLE1BQU07WUFXQyxzQkFBc0IsdUJBMkgxQixJQUFJLFlBQUksUUFBUTs7O3NCQWhFbEIsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7eUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxNQUFNO2lDQW9CTixlQUFlLFNBQUMsNkJBQTZCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO29DQUdwRSxZQUFZLFNBQUMsNkJBQTZCO3VCQUcxQyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtvQkFDeEMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7c0JBQ3BDLFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQWhDZDtJQUFmLFlBQVksRUFBRTs7MkVBQW1DO0FBQ2xDO0lBQWYsWUFBWSxFQUFFOzsyREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2xpZGVNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgQ29tcGFyZVdpdGgsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBkZWZlciwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50LCBOek9wdGlvblNlbGVjdGlvbkNoYW5nZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9jb21wbGV0ZURhdGFTb3VyY2VJdGVtIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQXV0b2NvbXBsZXRlRGF0YVNvdXJjZSA9IEFycmF5PEF1dG9jb21wbGV0ZURhdGFTb3VyY2VJdGVtIHwgc3RyaW5nIHwgbnVtYmVyPjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYXV0b2NvbXBsZXRlJyxcbiAgZXhwb3J0QXM6ICduekF1dG9jb21wbGV0ZScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGU+XG4gICAgICA8ZGl2XG4gICAgICAgICNwYW5lbFxuICAgICAgICBjbGFzcz1cImFudC1zZWxlY3QtZHJvcGRvd24gYW50LXNlbGVjdC1kcm9wZG93bi1wbGFjZW1lbnQtYm90dG9tTGVmdFwiXG4gICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LWRyb3Bkb3duLWhpZGRlbl09XCIhc2hvd1BhbmVsXCJcbiAgICAgICAgW25nQ2xhc3NdPVwibnpPdmVybGF5Q2xhc3NOYW1lXCJcbiAgICAgICAgW25nU3R5bGVdPVwibnpPdmVybGF5U3R5bGVcIlxuICAgICAgICBbbnpOb0FuaW1hdGlvbl09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtAc2xpZGVNb3Rpb25dPVwiJ2VudGVyJ1wiXG4gICAgICAgIFtALmRpc2FibGVkXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBzdHlsZT1cIm1heC1oZWlnaHQ6IDI1NnB4OyBvdmVyZmxvdy15OiBhdXRvOyBvdmVyZmxvdy1hbmNob3I6IG5vbmU7XCI+XG4gICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuekRhdGFTb3VyY2UgPyBvcHRpb25zVGVtcGxhdGUgOiBjb250ZW50VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLXRlbXBsYXRlICNjb250ZW50VGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgI29wdGlvbnNUZW1wbGF0ZT5cbiAgICAgICAgPG56LWF1dG8tb3B0aW9uXG4gICAgICAgICAgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBuekRhdGFTb3VyY2UhXCJcbiAgICAgICAgICBbbnpWYWx1ZV09XCJvcHRpb25cIlxuICAgICAgICAgIFtuekxhYmVsXT1cIm9wdGlvbiAmJiAkYW55KG9wdGlvbikubGFiZWwgPyAkYW55KG9wdGlvbikubGFiZWwgOiAkYW55KG9wdGlvbilcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgb3B0aW9uICYmICRhbnkob3B0aW9uKS5sYWJlbCA/ICRhbnkob3B0aW9uKS5sYWJlbCA6ICRhbnkob3B0aW9uKSB9fVxuICAgICAgICA8L256LWF1dG8tb3B0aW9uPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBhbmltYXRpb25zOiBbc2xpZGVNb3Rpb25dXG59KVxuZXhwb3J0IGNsYXNzIE56QXV0b2NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGVmYXVsdEFjdGl2ZUZpcnN0T3B0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJhY2tmaWxsOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCkgbnpXaWR0aD86IG51bWJlcjtcbiAgQElucHV0KCkgbnpPdmVybGF5Q2xhc3NOYW1lID0gJyc7XG4gIEBJbnB1dCgpIG56T3ZlcmxheVN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRlZmF1bHRBY3RpdmVGaXJzdE9wdGlvbiA9IHRydWU7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekJhY2tmaWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoOiBDb21wYXJlV2l0aCA9IChvMSwgbzIpID0+IG8xID09PSBvMjtcbiAgQElucHV0KCkgbnpEYXRhU291cmNlPzogQXV0b2NvbXBsZXRlRGF0YVNvdXJjZTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQ+KCk7XG5cbiAgc2hvd1BhbmVsOiBib29sZWFuID0gdHJ1ZTtcbiAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIGFjdGl2ZUl0ZW0hOiBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudDtcblxuICAvKipcbiAgICogT3B0aW9ucyBhY2Nlc3NvciwgaXRzIHNvdXJjZSBtYXkgYmUgY29udGVudCBvciBkYXRhU291cmNlXG4gICAqL1xuICBnZXQgb3B0aW9ucygpOiBRdWVyeUxpc3Q8TnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQ+IHtcbiAgICAvLyBmaXJzdCBkYXRhU291cmNlXG4gICAgaWYgKHRoaXMubnpEYXRhU291cmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5mcm9tRGF0YVNvdXJjZU9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmZyb21Db250ZW50T3B0aW9ucztcbiAgICB9XG4gIH1cblxuICAvKiogUHJvdmlkZWQgYnkgY29udGVudCAqL1xuICBAQ29udGVudENoaWxkcmVuKE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGZyb21Db250ZW50T3B0aW9ucyE6IFF1ZXJ5TGlzdDxOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudD47XG4gIC8qKiBQcm92aWRlZCBieSBkYXRhU291cmNlICovXG4gIEBWaWV3Q2hpbGRyZW4oTnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQpIGZyb21EYXRhU291cmNlT3B0aW9ucyE6IFF1ZXJ5TGlzdDxOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudD47XG5cbiAgLyoqIGNkay1vdmVybGF5ICovXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSB0ZW1wbGF0ZT86IFRlbXBsYXRlUmVmPHt9PjtcbiAgQFZpZXdDaGlsZCgncGFuZWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgcGFuZWw/OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvbnRlbnQ/OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgYWN0aXZlSXRlbUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBzZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgb3B0aW9uTW91c2VFbnRlclN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBkYXRhU291cmNlQ2hhbmdlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAvKiogT3B0aW9ucyBjaGFuZ2VzIGxpc3RlbmVyICovXG4gIHJlYWRvbmx5IG9wdGlvblNlbGVjdGlvbkNoYW5nZXM6IE9ic2VydmFibGU8TnpPcHRpb25TZWxlY3Rpb25DaGFuZ2U+ID0gZGVmZXIoKCkgPT4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBtZXJnZTxOek9wdGlvblNlbGVjdGlvbkNoYW5nZT4oLi4udGhpcy5vcHRpb25zLm1hcChvcHRpb24gPT4gb3B0aW9uLnNlbGVjdGlvbkNoYW5nZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5vcHRpb25TZWxlY3Rpb25DaGFuZ2VzKVxuICAgICk7XG4gIH0pO1xuICByZWFkb25seSBvcHRpb25Nb3VzZUVudGVyOiBPYnNlcnZhYmxlPE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50PiA9IGRlZmVyKCgpID0+IHtcbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICByZXR1cm4gbWVyZ2U8TnpBdXRvY29tcGxldGVPcHRpb25Db21wb25lbnQ+KC4uLnRoaXMub3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5tb3VzZUVudGVyZWQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMub3B0aW9uTW91c2VFbnRlcilcbiAgICApO1xuICB9KTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHVibGljIG5vQW5pbWF0aW9uPzogTnpOb0FuaW1hdGlvbkRpcmVjdGl2ZVxuICApIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekRhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMub3B0aW9uc0luaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLm9wdGlvbnNJbml0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLm9wdGlvbk1vdXNlRW50ZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNldFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93UGFuZWwgPSAhIXRoaXMub3B0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHNldEFjdGl2ZUl0ZW0oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpW2luZGV4XTtcbiAgICBpZiAoYWN0aXZlSXRlbSAmJiAhYWN0aXZlSXRlbS5hY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGFjdGl2ZUl0ZW07XG4gICAgICB0aGlzLmFjdGl2ZUl0ZW1JbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5jbGVhclNlbGVjdGVkT3B0aW9ucyh0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldEFjdGl2ZVN0eWxlcygpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXROZXh0SXRlbUFjdGl2ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleCArIDEgPD0gdGhpcy5vcHRpb25zLmxlbmd0aCAtIDEgPyB0aGlzLmFjdGl2ZUl0ZW1JbmRleCArIDEgOiAwO1xuICAgIHRoaXMuc2V0QWN0aXZlSXRlbShuZXh0SW5kZXgpO1xuICB9XG5cbiAgc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleCAtIDEgPCAwID8gdGhpcy5vcHRpb25zLmxlbmd0aCAtIDEgOiB0aGlzLmFjdGl2ZUl0ZW1JbmRleCAtIDE7XG4gICAgdGhpcy5zZXRBY3RpdmVJdGVtKHByZXZpb3VzSW5kZXgpO1xuICB9XG5cbiAgZ2V0T3B0aW9uSW5kZXgodmFsdWU6IE56U2FmZUFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5yZWR1Y2UoKHJlc3VsdDogbnVtYmVyLCBjdXJyZW50OiBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gLTEgPyAodGhpcy5jb21wYXJlV2l0aCh2YWx1ZSwgY3VycmVudC5uelZhbHVlKSA/IGluZGV4IDogLTEpIDogcmVzdWx0O1xuICAgIH0sIC0xKSE7XG4gIH1cblxuICBnZXRPcHRpb24odmFsdWU6IE56U2FmZUFueSk6IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maW5kKGl0ZW0gPT4gdGhpcy5jb21wYXJlV2l0aCh2YWx1ZSwgaXRlbS5uelZhbHVlKSkgfHwgbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgb3B0aW9uc0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPcHRpb25DaGFuZ2VzKCk7XG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMubnpEYXRhU291cmNlID8gdGhpcy5mcm9tRGF0YVNvdXJjZU9wdGlvbnMuY2hhbmdlcyA6IHRoaXMuZnJvbUNvbnRlbnRPcHRpb25zLmNoYW5nZXM7XG4gICAgLy8gYXN5bmNcbiAgICB0aGlzLmRhdGFTb3VyY2VDaGFuZ2VTdWJzY3JpcHRpb24gPSBjaGFuZ2VzLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmICghZS5kaXJ0eSAmJiB0aGlzLmlzT3Blbikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2V0VmlzaWJpbGl0eSgpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vic2NyaWJlT3B0aW9uQ2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBzdGF0dXMgb2Ygb3B0aW9uc1xuICAgKi9cbiAgY2xlYXJTZWxlY3RlZE9wdGlvbnMoc2tpcD86IE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50IHwgbnVsbCwgZGVzZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAob3B0aW9uICE9PSBza2lwKSB7XG4gICAgICAgIGlmIChkZXNlbGVjdCkge1xuICAgICAgICAgIG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi5zZXRJbmFjdGl2ZVN0eWxlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVPcHRpb25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm9wdGlvblNlbGVjdGlvbkNoYW5nZXNcbiAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQ6IE56T3B0aW9uU2VsZWN0aW9uQ2hhbmdlKSA9PiBldmVudC5pc1VzZXJJbnB1dCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogTnpPcHRpb25TZWxlY3Rpb25DaGFuZ2UpID0+IHtcbiAgICAgICAgZXZlbnQuc291cmNlLnNlbGVjdCgpO1xuICAgICAgICBldmVudC5zb3VyY2Uuc2V0QWN0aXZlU3R5bGVzKCk7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGV2ZW50LnNvdXJjZTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtSW5kZXggPSB0aGlzLmdldE9wdGlvbkluZGV4KHRoaXMuYWN0aXZlSXRlbS5uelZhbHVlKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkT3B0aW9ucyhldmVudC5zb3VyY2UsIHRydWUpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KGV2ZW50LnNvdXJjZSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMub3B0aW9uTW91c2VFbnRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMub3B0aW9uTW91c2VFbnRlclN1YnNjcmlwdGlvbiA9IHRoaXMub3B0aW9uTW91c2VFbnRlci5zdWJzY3JpYmUoKGV2ZW50OiBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgZXZlbnQuc2V0QWN0aXZlU3R5bGVzKCk7XG4gICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBldmVudDtcbiAgICAgIHRoaXMuYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5nZXRPcHRpb25JbmRleCh0aGlzLmFjdGl2ZUl0ZW0ubnpWYWx1ZSk7XG4gICAgICB0aGlzLmNsZWFyU2VsZWN0ZWRPcHRpb25zKGV2ZW50KTtcbiAgICB9KTtcbiAgfVxufVxuIl19