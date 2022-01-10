/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, QueryList, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
export class NzTimelineComponent {
    constructor(cdr, timelineService) {
        this.cdr = cdr;
        this.timelineService = timelineService;
        this.nzMode = 'left';
        this.nzReverse = false;
        this.isPendingBoolean = false;
        this.timelineItems = [];
        this.destroy$ = new Subject();
    }
    ngOnChanges(changes) {
        const { nzMode, nzReverse, nzPending } = changes;
        if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
            this.updateChildren();
        }
        if (nzPending) {
            this.isPendingBoolean = nzPending.currentValue === true;
        }
    }
    ngOnInit() {
        this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngAfterContentInit() {
        this.updateChildren();
        this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateChildren();
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateChildren() {
        if (this.listOfItems && this.listOfItems.length) {
            const length = this.listOfItems.length;
            this.listOfItems.forEach((item, index) => {
                item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
                item.position = getInferredTimelineItemPosition(index, this.nzMode);
                item.detectChanges();
            });
            this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
        }
        this.cdr.markForCheck();
    }
}
NzTimelineComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                selector: 'nz-timeline',
                providers: [TimelineService],
                exportAs: 'nzTimeline',
                template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-right]="nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate' || nzMode === 'custom'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
    >
      <!-- pending dot (reversed) -->
      <ng-container *ngIf="nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- timeline items -->
      <ng-container *ngFor="let item of timelineItems">
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      </ng-container>
      <ng-container *ngIf="!nzReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      <li *ngIf="nzPending" class="ant-timeline-item ant-timeline-item-pending">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
          <ng-container *nzStringTemplateOutlet="nzPendingDot">
            {{ nzPendingDot }}<i *ngIf="!nzPendingDot" nz-icon nzType="loading"></i>
          </ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-container *nzStringTemplateOutlet="nzPending">
            {{ isPendingBoolean ? '' : nzPending }}
          </ng-container>
        </div>
      </li>
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `
            },] }
];
NzTimelineComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: TimelineService }
];
NzTimelineComponent.propDecorators = {
    listOfItems: [{ type: ContentChildren, args: [NzTimelineItemComponent,] }],
    nzMode: [{ type: Input }],
    nzPending: [{ type: Input }],
    nzPendingDot: [{ type: Input }],
    nzReverse: [{ type: Input }]
};
function simpleChangeActivated(simpleChange) {
    return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}
function getInferredTimelineItemPosition(index, mode) {
    return mode === 'custom'
        ? undefined
        : mode === 'left'
            ? 'left'
            : mode === 'right'
                ? 'right'
                : mode === 'alternate' && index % 2 === 0
                    ? 'left'
                    : 'right';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90aW1lbGluZS8iLCJzb3VyY2VzIjpbInRpbWVsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLEtBQUssRUFJTCxTQUFTLEVBSVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQThDckQsTUFBTSxPQUFPLG1CQUFtQjtJQWE5QixZQUFvQixHQUFzQixFQUFVLGVBQWdDO1FBQWhFLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBVjNFLFdBQU0sR0FBbUIsTUFBTSxDQUFDO1FBR2hDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFcEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLGtCQUFhLEdBQThCLEVBQUUsQ0FBQztRQUV0QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQUVnRCxDQUFDO0lBRXhGLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFakQsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7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UTtRQUN0QixDQUFDLENBQUMsU0FBUztRQUNYLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUNqQixDQUFDLENBQUMsTUFBTTtZQUNSLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTztnQkFDbEIsQ0FBQyxDQUFDLE9BQU87Z0JBQ1QsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUN6QyxDQUFDLENBQUMsTUFBTTtvQkFDUixDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelRpbWVsaW5lSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vdGltZWxpbmUtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZWxpbmVTZXJ2aWNlIH0gZnJvbSAnLi90aW1lbGluZS5zZXJ2aWNlJztcbmltcG9ydCB7IE56VGltZWxpbmVNb2RlLCBOelRpbWVsaW5lUG9zaXRpb24gfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBzZWxlY3RvcjogJ256LXRpbWVsaW5lJyxcbiAgcHJvdmlkZXJzOiBbVGltZWxpbmVTZXJ2aWNlXSxcbiAgZXhwb3J0QXM6ICduelRpbWVsaW5lJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWxcbiAgICAgIGNsYXNzPVwiYW50LXRpbWVsaW5lXCJcbiAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtcmlnaHRdPVwibnpNb2RlID09PSAncmlnaHQnXCJcbiAgICAgIFtjbGFzcy5hbnQtdGltZWxpbmUtYWx0ZXJuYXRlXT1cIm56TW9kZSA9PT0gJ2FsdGVybmF0ZScgfHwgbnpNb2RlID09PSAnY3VzdG9tJ1wiXG4gICAgICBbY2xhc3MuYW50LXRpbWVsaW5lLXBlbmRpbmddPVwiISFuelBlbmRpbmdcIlxuICAgICAgW2NsYXNzLmFudC10aW1lbGluZS1yZXZlcnNlXT1cIm56UmV2ZXJzZVwiXG4gICAgPlxuICAgICAgPCEtLSBwZW5kaW5nIGRvdCAocmV2ZXJzZWQpIC0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56UmV2ZXJzZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInBlbmRpbmdUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPCEtLSB0aW1lbGluZSBpdGVtcyAtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdGltZWxpbmVJdGVtc1wiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiaXRlbS50ZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpSZXZlcnNlXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwicGVuZGluZ1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8IS0tIHBlbmRpbmcgZG90IC0tPlxuICAgIDwvdWw+XG4gICAgPG5nLXRlbXBsYXRlICNwZW5kaW5nVGVtcGxhdGU+XG4gICAgICA8bGkgKm5nSWY9XCJuelBlbmRpbmdcIiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtIGFudC10aW1lbGluZS1pdGVtLXBlbmRpbmdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLXRhaWxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWhlYWQgYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1jdXN0b20gYW50LXRpbWVsaW5lLWl0ZW0taGVhZC1ibHVlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56UGVuZGluZ0RvdFwiPlxuICAgICAgICAgICAge3sgbnpQZW5kaW5nRG90IH19PGkgKm5nSWY9XCIhbnpQZW5kaW5nRG90XCIgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCI+PC9pPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC10aW1lbGluZS1pdGVtLWNvbnRlbnRcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpQZW5kaW5nXCI+XG4gICAgICAgICAgICB7eyBpc1BlbmRpbmdCb29sZWFuID8gJycgOiBuelBlbmRpbmcgfX1cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPCEtLSBHcmFzcCBpdGVtcyAtLT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpUaW1lbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE56VGltZWxpbmVJdGVtQ29tcG9uZW50KSBsaXN0T2ZJdGVtcyE6IFF1ZXJ5TGlzdDxOelRpbWVsaW5lSXRlbUNvbXBvbmVudD47XG5cbiAgQElucHV0KCkgbnpNb2RlOiBOelRpbWVsaW5lTW9kZSA9ICdsZWZ0JztcbiAgQElucHV0KCkgbnpQZW5kaW5nPzogc3RyaW5nIHwgYm9vbGVhbiB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelBlbmRpbmdEb3Q/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpSZXZlcnNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgaXNQZW5kaW5nQm9vbGVhbjogYm9vbGVhbiA9IGZhbHNlO1xuICB0aW1lbGluZUl0ZW1zOiBOelRpbWVsaW5lSXRlbUNvbXBvbmVudFtdID0gW107XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHRpbWVsaW5lU2VydmljZTogVGltZWxpbmVTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56TW9kZSwgbnpSZXZlcnNlLCBuelBlbmRpbmcgfSA9IGNoYW5nZXM7XG5cbiAgICBpZiAoc2ltcGxlQ2hhbmdlQWN0aXZhdGVkKG56TW9kZSkgfHwgc2ltcGxlQ2hhbmdlQWN0aXZhdGVkKG56UmV2ZXJzZSkpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICBpZiAobnpQZW5kaW5nKSB7XG4gICAgICB0aGlzLmlzUGVuZGluZ0Jvb2xlYW4gPSBuelBlbmRpbmcuY3VycmVudFZhbHVlID09PSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGltZWxpbmVTZXJ2aWNlLmNoZWNrJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4oKTtcblxuICAgIHRoaXMubGlzdE9mSXRlbXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2hpbGRyZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdE9mSXRlbXMgJiYgdGhpcy5saXN0T2ZJdGVtcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGlzdE9mSXRlbXMubGVuZ3RoO1xuXG4gICAgICB0aGlzLmxpc3RPZkl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uaXNMYXN0ID0gIXRoaXMubnpSZXZlcnNlID8gaW5kZXggPT09IGxlbmd0aCAtIDEgOiBpbmRleCA9PT0gMDtcbiAgICAgICAgaXRlbS5wb3NpdGlvbiA9IGdldEluZmVycmVkVGltZWxpbmVJdGVtUG9zaXRpb24oaW5kZXgsIHRoaXMubnpNb2RlKTtcbiAgICAgICAgaXRlbS5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGltZWxpbmVJdGVtcyA9IHRoaXMubnpSZXZlcnNlID8gdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCkucmV2ZXJzZSgpIDogdGhpcy5saXN0T2ZJdGVtcy50b0FycmF5KCk7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUNoYW5nZUFjdGl2YXRlZChzaW1wbGVDaGFuZ2U/OiBTaW1wbGVDaGFuZ2UpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKHNpbXBsZUNoYW5nZSAmJiAoc2ltcGxlQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IHNpbXBsZUNoYW5nZS5jdXJyZW50VmFsdWUgfHwgc2ltcGxlQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkpO1xufVxuXG5mdW5jdGlvbiBnZXRJbmZlcnJlZFRpbWVsaW5lSXRlbVBvc2l0aW9uKGluZGV4OiBudW1iZXIsIG1vZGU6IE56VGltZWxpbmVNb2RlKTogTnpUaW1lbGluZVBvc2l0aW9uIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdjdXN0b20nXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IG1vZGUgPT09ICdsZWZ0J1xuICAgID8gJ2xlZnQnXG4gICAgOiBtb2RlID09PSAncmlnaHQnXG4gICAgPyAncmlnaHQnXG4gICAgOiBtb2RlID09PSAnYWx0ZXJuYXRlJyAmJiBpbmRleCAlIDIgPT09IDBcbiAgICA/ICdsZWZ0J1xuICAgIDogJ3JpZ2h0Jztcbn1cbiJdfQ==