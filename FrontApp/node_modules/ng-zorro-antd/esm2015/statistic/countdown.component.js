/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output, ViewEncapsulation } from '@angular/core';
import { interval } from 'rxjs';
import { NzStatisticComponent } from './statistic.component';
const REFRESH_INTERVAL = 1000 / 30;
export class NzCountdownComponent extends NzStatisticComponent {
    constructor(cdr, ngZone, platform) {
        super();
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.platform = platform;
        this.nzFormat = 'HH:mm:ss';
        this.nzCountdownFinish = new EventEmitter();
        this.target = 0;
    }
    ngOnChanges(changes) {
        if (changes.nzValue) {
            this.target = Number(changes.nzValue.currentValue);
            if (!changes.nzValue.isFirstChange()) {
                this.syncTimer();
            }
        }
    }
    ngOnInit() {
        this.syncTimer();
    }
    ngOnDestroy() {
        this.stopTimer();
    }
    syncTimer() {
        if (this.target >= Date.now()) {
            this.startTimer();
        }
        else {
            this.stopTimer();
        }
    }
    startTimer() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                this.stopTimer();
                this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
                    this.updateValue();
                    this.cdr.detectChanges();
                });
            });
        }
    }
    stopTimer() {
        if (this.updater_) {
            this.updater_.unsubscribe();
            this.updater_ = null;
        }
    }
    /**
     * Update time that should be displayed on the screen.
     */
    updateValue() {
        this.diff = Math.max(this.target - Date.now(), 0);
        if (this.diff === 0) {
            this.stopTimer();
            this.nzCountdownFinish.emit();
        }
    }
}
NzCountdownComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-countdown',
                exportAs: 'nzCountdown',
                template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    >
    </nz-statistic>

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `
            },] }
];
NzCountdownComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: Platform }
];
NzCountdownComponent.propDecorators = {
    nzFormat: [{ type: Input }],
    nzCountdownFinish: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvc3RhdGlzdGljLyIsInNvdXJjZXMiOlsiY291bnRkb3duLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUlOLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBcUJuQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsb0JBQW9CO0lBUzVELFlBQW9CLEdBQXNCLEVBQVUsTUFBYyxFQUFVLFFBQWtCO1FBQzVGLEtBQUssRUFBRSxDQUFDO1FBRFUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVJyRixhQUFRLEdBQVcsVUFBVSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFJeEQsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUszQixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7U0FDRjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3hELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNPLFdBQVc7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7OztZQXRGRixTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7YUFDRjs7O1lBcENDLGlCQUFpQjtZQUlqQixNQUFNO1lBUEMsUUFBUTs7O3VCQXlDZCxLQUFLO2dDQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOelN0YXRpc3RpY0NvbXBvbmVudCB9IGZyb20gJy4vc3RhdGlzdGljLmNvbXBvbmVudCc7XG5cbmNvbnN0IFJFRlJFU0hfSU5URVJWQUwgPSAxMDAwIC8gMzA7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1jb3VudGRvd24nLFxuICBleHBvcnRBczogJ256Q291bnRkb3duJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotc3RhdGlzdGljXG4gICAgICBbbnpWYWx1ZV09XCJkaWZmXCJcbiAgICAgIFtuelZhbHVlU3R5bGVdPVwibnpWYWx1ZVN0eWxlXCJcbiAgICAgIFtuelZhbHVlVGVtcGxhdGVdPVwibnpWYWx1ZVRlbXBsYXRlIHx8IGNvdW50RG93blRwbFwiXG4gICAgICBbbnpUaXRsZV09XCJuelRpdGxlXCJcbiAgICAgIFtuelByZWZpeF09XCJuelByZWZpeFwiXG4gICAgICBbbnpTdWZmaXhdPVwibnpTdWZmaXhcIlxuICAgID5cbiAgICA8L256LXN0YXRpc3RpYz5cblxuICAgIDxuZy10ZW1wbGF0ZSAjY291bnREb3duVHBsPnt7IGRpZmYgfCBuelRpbWVSYW5nZTogbnpGb3JtYXQgfX08L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56Q291bnRkb3duQ29tcG9uZW50IGV4dGVuZHMgTnpTdGF0aXN0aWNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbnpGb3JtYXQ6IHN0cmluZyA9ICdISDptbTpzcyc7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNvdW50ZG93bkZpbmlzaCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBkaWZmITogbnVtYmVyO1xuXG4gIHByaXZhdGUgdGFyZ2V0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHVwZGF0ZXJfPzogU3Vic2NyaXB0aW9uIHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelZhbHVlKSB7XG4gICAgICB0aGlzLnRhcmdldCA9IE51bWJlcihjaGFuZ2VzLm56VmFsdWUuY3VycmVudFZhbHVlKTtcbiAgICAgIGlmICghY2hhbmdlcy5uelZhbHVlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICB0aGlzLnN5bmNUaW1lcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3luY1RpbWVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BUaW1lcigpO1xuICB9XG5cbiAgc3luY1RpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhcmdldCA+PSBEYXRlLm5vdygpKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZXJfID0gaW50ZXJ2YWwoUkVGUkVTSF9JTlRFUlZBTCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51cGRhdGVyXykge1xuICAgICAgdGhpcy51cGRhdGVyXy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy51cGRhdGVyXyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aW1lIHRoYXQgc2hvdWxkIGJlIGRpc3BsYXllZCBvbiB0aGUgc2NyZWVuLlxuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlmZiA9IE1hdGgubWF4KHRoaXMudGFyZ2V0IC0gRGF0ZS5ub3coKSwgMCk7XG5cbiAgICBpZiAodGhpcy5kaWZmID09PSAwKSB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5uekNvdW50ZG93bkZpbmlzaC5lbWl0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=