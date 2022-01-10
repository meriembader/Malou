/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { __decorate, __metadata } from "tslib";
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ConnectionPositionPair, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Inject, Input, Optional, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DEFAULT_MENTION_BOTTOM_POSITIONS, DEFAULT_MENTION_TOP_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { getCaretCoordinates, getMentions, InputBoolean } from 'ng-zorro-antd/core/util';
import { fromEvent, merge } from 'rxjs';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionService } from './mention.service';
export class NzMentionComponent {
    constructor(ngDocument, cdr, overlay, viewContainerRef, nzMentionService) {
        this.ngDocument = ngDocument;
        this.cdr = cdr;
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.nzMentionService = nzMentionService;
        this.nzValueWith = value => value;
        this.nzPrefix = '@';
        this.nzLoading = false;
        this.nzNotFoundContent = '无匹配结果，轻敲空格完成输入';
        this.nzPlacement = 'bottom';
        this.nzSuggestions = [];
        this.nzOnSelect = new EventEmitter();
        this.nzOnSearchChange = new EventEmitter();
        this.isOpen = false;
        this.filteredSuggestions = [];
        this.suggestionTemplate = null;
        this.activeIndex = -1;
        this.previousValue = null;
        this.cursorMention = null;
        this.overlayRef = null;
    }
    set suggestionChild(value) {
        if (value) {
            this.suggestionTemplate = value;
        }
    }
    get triggerNativeElement() {
        return this.trigger.el.nativeElement;
    }
    ngOnInit() {
        this.nzMentionService.triggerChanged().subscribe(trigger => {
            this.trigger = trigger;
            this.bindTriggerEvents();
            this.closeDropdown();
            this.overlayRef = null;
        });
    }
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('nzSuggestions')) {
            if (this.isOpen) {
                this.previousValue = null;
                this.activeIndex = -1;
                this.resetDropdown(false);
            }
        }
    }
    ngOnDestroy() {
        this.closeDropdown();
    }
    closeDropdown() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.overlayOutsideClickSubscription.unsubscribe();
            this.isOpen = false;
            this.cdr.markForCheck();
        }
    }
    openDropdown() {
        this.attachOverlay();
        this.isOpen = true;
        this.cdr.markForCheck();
    }
    getMentions() {
        return this.trigger ? getMentions(this.trigger.value, this.nzPrefix) : [];
    }
    selectSuggestion(suggestion) {
        const value = this.nzValueWith(suggestion);
        this.trigger.insertMention({
            mention: value,
            startPos: this.cursorMentionStart,
            endPos: this.cursorMentionEnd
        });
        this.nzOnSelect.emit(suggestion);
        this.closeDropdown();
        this.activeIndex = -1;
    }
    handleInput(event) {
        const target = event.target;
        this.trigger.onChange(target.value);
        this.trigger.value = target.value;
        this.resetDropdown();
    }
    handleKeydown(event) {
        const keyCode = event.keyCode;
        if (this.isOpen && keyCode === ENTER && this.activeIndex !== -1 && this.filteredSuggestions.length) {
            this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
            event.preventDefault();
        }
        else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            this.resetDropdown();
            event.stopPropagation();
        }
        else {
            if (this.isOpen && (keyCode === TAB || keyCode === ESCAPE)) {
                this.closeDropdown();
                return;
            }
            if (this.isOpen && keyCode === UP_ARROW) {
                this.setPreviousItemActive();
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.isOpen && keyCode === DOWN_ARROW) {
                this.setNextItemActive();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    handleClick() {
        this.resetDropdown();
    }
    bindTriggerEvents() {
        this.trigger.onInput.subscribe((e) => this.handleInput(e));
        this.trigger.onKeydown.subscribe((e) => this.handleKeydown(e));
        this.trigger.onClick.subscribe(() => this.handleClick());
    }
    suggestionsFilter(value, emit) {
        const suggestions = value.substring(1);
        /**
         * Should always emit (nzOnSearchChange) when value empty
         *
         * @[something]... @[empty]... @[empty]
         *     ^             ^           ^
         * preValue        preValue  (should emit)
         */
        if (this.previousValue === value && value !== this.cursorMention[0]) {
            return;
        }
        this.previousValue = value;
        if (emit) {
            this.nzOnSearchChange.emit({
                value: this.cursorMention.substring(1),
                prefix: this.cursorMention[0]
            });
        }
        const searchValue = suggestions.toLowerCase();
        this.filteredSuggestions = this.nzSuggestions.filter(suggestion => this.nzValueWith(suggestion).toLowerCase().includes(searchValue));
    }
    resetDropdown(emit = true) {
        this.resetCursorMention();
        if (typeof this.cursorMention !== 'string' || !this.canOpen()) {
            this.closeDropdown();
            return;
        }
        this.suggestionsFilter(this.cursorMention, emit);
        const activeIndex = this.filteredSuggestions.indexOf(this.cursorMention.substring(1));
        this.activeIndex = activeIndex >= 0 ? activeIndex : 0;
        this.openDropdown();
    }
    setNextItemActive() {
        this.activeIndex = this.activeIndex + 1 <= this.filteredSuggestions.length - 1 ? this.activeIndex + 1 : 0;
        this.cdr.markForCheck();
    }
    setPreviousItemActive() {
        this.activeIndex = this.activeIndex - 1 < 0 ? this.filteredSuggestions.length - 1 : this.activeIndex - 1;
        this.cdr.markForCheck();
    }
    canOpen() {
        const element = this.triggerNativeElement;
        return !element.readOnly && !element.disabled;
    }
    resetCursorMention() {
        const value = this.triggerNativeElement.value.replace(/[\r\n]/g, ' ') || '';
        const selectionStart = this.triggerNativeElement.selectionStart;
        const prefix = typeof this.nzPrefix === 'string' ? [this.nzPrefix] : this.nzPrefix;
        let i = prefix.length;
        while (i >= 0) {
            const startPos = value.lastIndexOf(prefix[i], selectionStart);
            const endPos = value.indexOf(' ', selectionStart) > -1 ? value.indexOf(' ', selectionStart) : value.length;
            const mention = value.substring(startPos, endPos);
            if ((startPos > 0 && value[startPos - 1] !== ' ') || startPos < 0 || mention.includes(prefix[i], 1) || mention.includes(' ')) {
                this.cursorMention = null;
                this.cursorMentionStart = -1;
                this.cursorMentionEnd = -1;
            }
            else {
                this.cursorMention = mention;
                this.cursorMentionStart = startPos;
                this.cursorMentionEnd = endPos;
                return;
            }
            i--;
        }
    }
    updatePositions() {
        const coordinates = getCaretCoordinates(this.triggerNativeElement, this.cursorMentionStart);
        const top = coordinates.top -
            this.triggerNativeElement.getBoundingClientRect().height -
            this.triggerNativeElement.scrollTop +
            (this.nzPlacement === 'bottom' ? coordinates.height - 6 : -6);
        const left = coordinates.left - this.triggerNativeElement.scrollLeft;
        this.positionStrategy.withDefaultOffsetX(left).withDefaultOffsetY(top);
        if (this.nzPlacement === 'bottom') {
            this.positionStrategy.withPositions([...DEFAULT_MENTION_BOTTOM_POSITIONS]);
        }
        if (this.nzPlacement === 'top') {
            this.positionStrategy.withPositions([...DEFAULT_MENTION_TOP_POSITIONS]);
        }
        this.positionStrategy.apply();
    }
    subscribeOverlayOutsideClick() {
        return merge(this.overlayRef.outsidePointerEvents(), fromEvent(this.ngDocument, 'touchend')).subscribe((event) => {
            var _a;
            const clickTarget = event.target;
            if (this.isOpen && clickTarget !== this.trigger.el.nativeElement && !((_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.overlayElement.contains(clickTarget))) {
                this.closeDropdown();
            }
        });
    }
    attachOverlay() {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.suggestionsTemp, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
            this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
        }
        this.updatePositions();
    }
    getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this.getOverlayPosition(),
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            disposeOnNavigation: true
        });
    }
    getOverlayPosition() {
        const positions = [
            new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
            new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
        ];
        this.positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.trigger.el)
            .withPositions(positions)
            .withFlexibleDimensions(false)
            .withPush(false);
        return this.positionStrategy;
    }
}
NzMentionComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-mention',
                exportAs: 'nzMention',
                template: `
    <ng-content></ng-content>
    <ng-template #suggestions>
      <ul class="ant-mention-dropdown">
        <li
          class="ant-mention-dropdown-item"
          *ngFor="let suggestion of filteredSuggestions; let i = index"
          [class.focus]="i === activeIndex"
          (mousedown)="$event.preventDefault()"
          (click)="selectSuggestion(suggestion)"
        >
          <ng-container *ngIf="suggestionTemplate; else defaultSuggestion">
            <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: suggestion }"></ng-container>
          </ng-container>
          <ng-template #defaultSuggestion>{{ nzValueWith(suggestion) }}</ng-template>
        </li>
        <li class="ant-mention-dropdown-notfound ant-mention-dropdown-item" *ngIf="filteredSuggestions.length === 0">
          <span *ngIf="nzLoading"><i nz-icon nzType="loading"></i></span>
          <span *ngIf="!nzLoading">{{ nzNotFoundContent }}</span>
        </li>
      </ul>
    </ng-template>
  `,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [NzMentionService]
            },] }
];
NzMentionComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: ChangeDetectorRef },
    { type: Overlay },
    { type: ViewContainerRef },
    { type: NzMentionService }
];
NzMentionComponent.propDecorators = {
    nzValueWith: [{ type: Input }],
    nzPrefix: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzNotFoundContent: [{ type: Input }],
    nzPlacement: [{ type: Input }],
    nzSuggestions: [{ type: Input }],
    nzOnSelect: [{ type: Output }],
    nzOnSearchChange: [{ type: Output }],
    suggestionsTemp: [{ type: ViewChild, args: [TemplateRef, { static: false },] }],
    suggestionChild: [{ type: ContentChild, args: [NzMentionSuggestionDirective, { static: false, read: TemplateRef },] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzMentionComponent.prototype, "nzLoading", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21lbnRpb24vIiwic291cmNlcyI6WyJtZW50aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFHLE9BQU8sRUFDTCxzQkFBc0IsRUFFdEIsT0FBTyxFQUNQLGFBQWEsRUFHZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRXRELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXJFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBNkNyRCxNQUFNLE9BQU8sa0JBQWtCO0lBd0M3QixZQUN3QyxVQUFxQixFQUNuRCxHQUFz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QUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzlCOzs7NENBMENJLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTtZQTdHOUIsaUJBQWlCO1lBVmpCLE9BQU87WUF3QlAsZ0JBQWdCO1lBU1QsZ0JBQWdCOzs7MEJBZ0R0QixLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSztnQ0FDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxNQUFNOytCQUNOLE1BQU07OEJBR04sU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7OEJBRXhDLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7QUFWdkQ7SUFBZixZQUFZLEVBQUU7O3FEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBFU0NBUEUsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBUQUIsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXIsXG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgUG9zaXRpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBERUZBVUxUX01FTlRJT05fQk9UVE9NX1BPU0lUSU9OUywgREVGQVVMVF9NRU5USU9OX1RPUF9QT1NJVElPTlMgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBnZXRDYXJldENvb3JkaW5hdGVzLCBnZXRNZW50aW9ucywgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56TWVudGlvblN1Z2dlc3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL21lbnRpb24tc3VnZ2VzdGlvbnMnO1xuaW1wb3J0IHsgTnpNZW50aW9uVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vbWVudGlvbi10cmlnZ2VyJztcbmltcG9ydCB7IE56TWVudGlvblNlcnZpY2UgfSBmcm9tICcuL21lbnRpb24uc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudGlvbk9uU2VhcmNoVHlwZXMge1xuICB2YWx1ZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZW50aW9uIHtcbiAgc3RhcnRQb3M6IG51bWJlcjtcbiAgZW5kUG9zOiBudW1iZXI7XG4gIG1lbnRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWVudGlvblBsYWNlbWVudCA9ICd0b3AnIHwgJ2JvdHRvbSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LW1lbnRpb24nLFxuICBleHBvcnRBczogJ256TWVudGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxuZy10ZW1wbGF0ZSAjc3VnZ2VzdGlvbnM+XG4gICAgICA8dWwgY2xhc3M9XCJhbnQtbWVudGlvbi1kcm9wZG93blwiPlxuICAgICAgICA8bGlcbiAgICAgICAgICBjbGFzcz1cImFudC1tZW50aW9uLWRyb3Bkb3duLWl0ZW1cIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBzdWdnZXN0aW9uIG9mIGZpbHRlcmVkU3VnZ2VzdGlvbnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgIFtjbGFzcy5mb2N1c109XCJpID09PSBhY3RpdmVJbmRleFwiXG4gICAgICAgICAgKG1vdXNlZG93bik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbilcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN1Z2dlc3Rpb25UZW1wbGF0ZTsgZWxzZSBkZWZhdWx0U3VnZ2VzdGlvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInN1Z2dlc3Rpb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHN1Z2dlc3Rpb24gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdFN1Z2dlc3Rpb24+e3sgbnpWYWx1ZVdpdGgoc3VnZ2VzdGlvbikgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGkgY2xhc3M9XCJhbnQtbWVudGlvbi1kcm9wZG93bi1ub3Rmb3VuZCBhbnQtbWVudGlvbi1kcm9wZG93bi1pdGVtXCIgKm5nSWY9XCJmaWx0ZXJlZFN1Z2dlc3Rpb25zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibnpMb2FkaW5nXCI+PGkgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFuekxvYWRpbmdcIj57eyBuek5vdEZvdW5kQ29udGVudCB9fTwvc3Bhbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtOek1lbnRpb25TZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOek1lbnRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56VmFsdWVXaXRoOiAodmFsdWU6IE56U2FmZUFueSkgPT4gc3RyaW5nID0gdmFsdWUgPT4gdmFsdWU7XG4gIEBJbnB1dCgpIG56UHJlZml4OiBzdHJpbmcgfCBzdHJpbmdbXSA9ICdAJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TG9hZGluZyA9IGZhbHNlO1xuICBASW5wdXQoKSBuek5vdEZvdW5kQ29udGVudDogc3RyaW5nID0gJ+aXoOWMuemFjee7k+aenO+8jOi9u+aVsuepuuagvOWujOaIkOi+k+WFpSc7XG4gIEBJbnB1dCgpIG56UGxhY2VtZW50OiBNZW50aW9uUGxhY2VtZW50ID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgpIG56U3VnZ2VzdGlvbnM6IE56U2FmZUFueVtdID0gW107XG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uU2VsZWN0OiBFdmVudEVtaXR0ZXI8TnpTYWZlQW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56T25TZWFyY2hDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZW50aW9uT25TZWFyY2hUeXBlcz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgdHJpZ2dlciE6IE56TWVudGlvblRyaWdnZXJEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiBmYWxzZSB9KSBzdWdnZXN0aW9uc1RlbXA/OiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBAQ29udGVudENoaWxkKE56TWVudGlvblN1Z2dlc3Rpb25EaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgc2V0IHN1Z2dlc3Rpb25DaGlsZCh2YWx1ZTogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56U2FmZUFueSB9Pikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zdWdnZXN0aW9uVGVtcGxhdGUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBpc09wZW4gPSBmYWxzZTtcbiAgZmlsdGVyZWRTdWdnZXN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgc3VnZ2VzdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpTYWZlQW55IH0+IHwgbnVsbCA9IG51bGw7XG4gIGFjdGl2ZUluZGV4ID0gLTE7XG5cbiAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjdXJzb3JNZW50aW9uOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBjdXJzb3JNZW50aW9uU3RhcnQ/OiBudW1iZXI7XG4gIHByaXZhdGUgY3Vyc29yTWVudGlvbkVuZD86IG51bWJlcjtcbiAgcHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcG9ydGFsPzogVGVtcGxhdGVQb3J0YWw8dm9pZD47XG4gIHByaXZhdGUgcG9zaXRpb25TdHJhdGVneSE6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcbiAgcHJpdmF0ZSBvdmVybGF5T3V0c2lkZUNsaWNrU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xuXG4gIHByaXZhdGUgZ2V0IHRyaWdnZXJOYXRpdmVFbGVtZW50KCk6IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIG5nRG9jdW1lbnQ6IE56U2FmZUFueSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIG56TWVudGlvblNlcnZpY2U6IE56TWVudGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpNZW50aW9uU2VydmljZS50cmlnZ2VyQ2hhbmdlZCgpLnN1YnNjcmliZSh0cmlnZ2VyID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgICB0aGlzLmJpbmRUcmlnZ2VyRXZlbnRzKCk7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ256U3VnZ2VzdGlvbnMnKSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5yZXNldERyb3Bkb3duKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5vdmVybGF5T3V0c2lkZUNsaWNrU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkRyb3Bkb3duKCk6IHZvaWQge1xuICAgIHRoaXMuYXR0YWNoT3ZlcmxheSgpO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldE1lbnRpb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy50cmlnZ2VyID8gZ2V0TWVudGlvbnModGhpcy50cmlnZ2VyLnZhbHVlISwgdGhpcy5uelByZWZpeCkgOiBbXTtcbiAgfVxuXG4gIHNlbGVjdFN1Z2dlc3Rpb24oc3VnZ2VzdGlvbjogc3RyaW5nIHwge30pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMubnpWYWx1ZVdpdGgoc3VnZ2VzdGlvbik7XG4gICAgdGhpcy50cmlnZ2VyLmluc2VydE1lbnRpb24oe1xuICAgICAgbWVudGlvbjogdmFsdWUsXG4gICAgICBzdGFydFBvczogdGhpcy5jdXJzb3JNZW50aW9uU3RhcnQhLFxuICAgICAgZW5kUG9zOiB0aGlzLmN1cnNvck1lbnRpb25FbmQhXG4gICAgfSk7XG4gICAgdGhpcy5uek9uU2VsZWN0LmVtaXQoc3VnZ2VzdGlvbik7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5hY3RpdmVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVJbnB1dChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnRyaWdnZXIub25DaGFuZ2UodGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnRyaWdnZXIudmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZTtcbiAgICBpZiAodGhpcy5pc09wZW4gJiYga2V5Q29kZSA9PT0gRU5URVIgJiYgdGhpcy5hY3RpdmVJbmRleCAhPT0gLTEgJiYgdGhpcy5maWx0ZXJlZFN1Z2dlc3Rpb25zLmxlbmd0aCkge1xuICAgICAgdGhpcy5zZWxlY3RTdWdnZXN0aW9uKHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9uc1t0aGlzLmFjdGl2ZUluZGV4XSk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fCBrZXlDb2RlID09PSBSSUdIVF9BUlJPVykge1xuICAgICAgdGhpcy5yZXNldERyb3Bkb3duKCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIChrZXlDb2RlID09PSBUQUIgfHwga2V5Q29kZSA9PT0gRVNDQVBFKSkge1xuICAgICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc09wZW4gJiYga2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgdGhpcy5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiBrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIHRoaXMuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2V0RHJvcGRvd24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYmluZFRyaWdnZXJFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy50cmlnZ2VyLm9uSW5wdXQuc3Vic2NyaWJlKChlOiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmhhbmRsZUlucHV0KGUpKTtcbiAgICB0aGlzLnRyaWdnZXIub25LZXlkb3duLnN1YnNjcmliZSgoZTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5oYW5kbGVLZXlkb3duKGUpKTtcbiAgICB0aGlzLnRyaWdnZXIub25DbGljay5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oYW5kbGVDbGljaygpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3VnZ2VzdGlvbnNGaWx0ZXIodmFsdWU6IHN0cmluZywgZW1pdDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHN1Z2dlc3Rpb25zID0gdmFsdWUuc3Vic3RyaW5nKDEpO1xuICAgIC8qKlxuICAgICAqIFNob3VsZCBhbHdheXMgZW1pdCAobnpPblNlYXJjaENoYW5nZSkgd2hlbiB2YWx1ZSBlbXB0eVxuICAgICAqXG4gICAgICogQFtzb21ldGhpbmddLi4uIEBbZW1wdHldLi4uIEBbZW1wdHldXG4gICAgICogICAgIF4gICAgICAgICAgICAgXiAgICAgICAgICAgXlxuICAgICAqIHByZVZhbHVlICAgICAgICBwcmVWYWx1ZSAgKHNob3VsZCBlbWl0KVxuICAgICAqL1xuICAgIGlmICh0aGlzLnByZXZpb3VzVmFsdWUgPT09IHZhbHVlICYmIHZhbHVlICE9PSB0aGlzLmN1cnNvck1lbnRpb24hWzBdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IHZhbHVlO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm56T25TZWFyY2hDaGFuZ2UuZW1pdCh7XG4gICAgICAgIHZhbHVlOiB0aGlzLmN1cnNvck1lbnRpb24hLnN1YnN0cmluZygxKSxcbiAgICAgICAgcHJlZml4OiB0aGlzLmN1cnNvck1lbnRpb24hWzBdXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3Qgc2VhcmNoVmFsdWUgPSBzdWdnZXN0aW9ucy50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9ucyA9IHRoaXMubnpTdWdnZXN0aW9ucy5maWx0ZXIoc3VnZ2VzdGlvbiA9PiB0aGlzLm56VmFsdWVXaXRoKHN1Z2dlc3Rpb24pLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXREcm9wZG93bihlbWl0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMucmVzZXRDdXJzb3JNZW50aW9uKCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmN1cnNvck1lbnRpb24gIT09ICdzdHJpbmcnIHx8ICF0aGlzLmNhbk9wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3VnZ2VzdGlvbnNGaWx0ZXIodGhpcy5jdXJzb3JNZW50aW9uLCBlbWl0KTtcbiAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuZmlsdGVyZWRTdWdnZXN0aW9ucy5pbmRleE9mKHRoaXMuY3Vyc29yTWVudGlvbi5zdWJzdHJpbmcoMSkpO1xuICAgIHRoaXMuYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCA+PSAwID8gYWN0aXZlSW5kZXggOiAwO1xuICAgIHRoaXMub3BlbkRyb3Bkb3duKCk7XG4gIH1cblxuICBwcml2YXRlIHNldE5leHRJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4ICsgMSA8PSB0aGlzLmZpbHRlcmVkU3VnZ2VzdGlvbnMubGVuZ3RoIC0gMSA/IHRoaXMuYWN0aXZlSW5kZXggKyAxIDogMDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4IC0gMSA8IDAgPyB0aGlzLmZpbHRlcmVkU3VnZ2VzdGlvbnMubGVuZ3RoIC0gMSA6IHRoaXMuYWN0aXZlSW5kZXggLSAxO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5PcGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50ID0gdGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gIWVsZW1lbnQucmVhZE9ubHkgJiYgIWVsZW1lbnQuZGlzYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3Vyc29yTWVudGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQudmFsdWUucmVwbGFjZSgvW1xcclxcbl0vZywgJyAnKSB8fCAnJztcbiAgICBjb25zdCBzZWxlY3Rpb25TdGFydCA9IHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQhO1xuICAgIGNvbnN0IHByZWZpeCA9IHR5cGVvZiB0aGlzLm56UHJlZml4ID09PSAnc3RyaW5nJyA/IFt0aGlzLm56UHJlZml4XSA6IHRoaXMubnpQcmVmaXg7XG4gICAgbGV0IGkgPSBwcmVmaXgubGVuZ3RoO1xuICAgIHdoaWxlIChpID49IDApIHtcbiAgICAgIGNvbnN0IHN0YXJ0UG9zID0gdmFsdWUubGFzdEluZGV4T2YocHJlZml4W2ldLCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICBjb25zdCBlbmRQb3MgPSB2YWx1ZS5pbmRleE9mKCcgJywgc2VsZWN0aW9uU3RhcnQpID4gLTEgPyB2YWx1ZS5pbmRleE9mKCcgJywgc2VsZWN0aW9uU3RhcnQpIDogdmFsdWUubGVuZ3RoO1xuICAgICAgY29uc3QgbWVudGlvbiA9IHZhbHVlLnN1YnN0cmluZyhzdGFydFBvcywgZW5kUG9zKTtcbiAgICAgIGlmICgoc3RhcnRQb3MgPiAwICYmIHZhbHVlW3N0YXJ0UG9zIC0gMV0gIT09ICcgJykgfHwgc3RhcnRQb3MgPCAwIHx8IG1lbnRpb24uaW5jbHVkZXMocHJlZml4W2ldLCAxKSB8fCBtZW50aW9uLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgICAgdGhpcy5jdXJzb3JNZW50aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJzb3JNZW50aW9uU3RhcnQgPSAtMTtcbiAgICAgICAgdGhpcy5jdXJzb3JNZW50aW9uRW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb24gPSBtZW50aW9uO1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb25TdGFydCA9IHN0YXJ0UG9zO1xuICAgICAgICB0aGlzLmN1cnNvck1lbnRpb25FbmQgPSBlbmRQb3M7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGktLTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBvc2l0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldENhcmV0Q29vcmRpbmF0ZXModGhpcy50cmlnZ2VyTmF0aXZlRWxlbWVudCwgdGhpcy5jdXJzb3JNZW50aW9uU3RhcnQhKTtcbiAgICBjb25zdCB0b3AgPVxuICAgICAgY29vcmRpbmF0ZXMudG9wIC1cbiAgICAgIHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IC1cbiAgICAgIHRoaXMudHJpZ2dlck5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICtcbiAgICAgICh0aGlzLm56UGxhY2VtZW50ID09PSAnYm90dG9tJyA/IGNvb3JkaW5hdGVzLmhlaWdodCAtIDYgOiAtNik7XG4gICAgY29uc3QgbGVmdCA9IGNvb3JkaW5hdGVzLmxlZnQgLSB0aGlzLnRyaWdnZXJOYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LndpdGhEZWZhdWx0T2Zmc2V0WChsZWZ0KS53aXRoRGVmYXVsdE9mZnNldFkodG9wKTtcbiAgICBpZiAodGhpcy5uelBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICAgIHRoaXMucG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKFsuLi5ERUZBVUxUX01FTlRJT05fQk9UVE9NX1BPU0lUSU9OU10pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelBsYWNlbWVudCA9PT0gJ3RvcCcpIHtcbiAgICAgIHRoaXMucG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKFsuLi5ERUZBVUxUX01FTlRJT05fVE9QX1BPU0lUSU9OU10pO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kuYXBwbHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlT3ZlcmxheU91dHNpZGVDbGljaygpOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBtZXJnZTxNb3VzZUV2ZW50IHwgVG91Y2hFdmVudD4oXG4gICAgICB0aGlzLm92ZXJsYXlSZWYhLm91dHNpZGVQb2ludGVyRXZlbnRzKCksXG4gICAgICBmcm9tRXZlbnQ8VG91Y2hFdmVudD4odGhpcy5uZ0RvY3VtZW50LCAndG91Y2hlbmQnKVxuICAgICkuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNsaWNrVGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKHRoaXMuaXNPcGVuICYmIGNsaWNrVGFyZ2V0ICE9PSB0aGlzLnRyaWdnZXIuZWwubmF0aXZlRWxlbWVudCAmJiAhdGhpcy5vdmVybGF5UmVmPy5vdmVybGF5RWxlbWVudC5jb250YWlucyhjbGlja1RhcmdldCkpIHtcbiAgICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaE92ZXJsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMucG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuc3VnZ2VzdGlvbnNUZW1wISwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmICF0aGlzLm92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnBvcnRhbCk7XG4gICAgICB0aGlzLm92ZXJsYXlPdXRzaWRlQ2xpY2tTdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmliZU92ZXJsYXlPdXRzaWRlQ2xpY2soKTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVQb3NpdGlvbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5nZXRPdmVybGF5UG9zaXRpb24oKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICBkaXNwb3NlT25OYXZpZ2F0aW9uOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgICBuZXcgQ29ubmVjdGlvblBvc2l0aW9uUGFpcih7IG9yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nIH0sIHsgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJyB9KSxcbiAgICAgIG5ldyBDb25uZWN0aW9uUG9zaXRpb25QYWlyKHsgb3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ3RvcCcgfSwgeyBvdmVybGF5WDogJ3N0YXJ0Jywgb3ZlcmxheVk6ICdib3R0b20nIH0pXG4gICAgXTtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLnRyaWdnZXIuZWwpXG4gICAgICAud2l0aFBvc2l0aW9ucyhwb3NpdGlvbnMpXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgIC53aXRoUHVzaChmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25TdHJhdGVneTtcbiAgfVxufVxuIl19