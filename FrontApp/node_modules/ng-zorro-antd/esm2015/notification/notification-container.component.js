/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { NzMNContainerComponent } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
const NZ_CONFIG_MODULE_NAME = 'notification';
const NZ_NOTIFICATION_DEFAULT_CONFIG = {
    nzTop: '24px',
    nzBottom: '24px',
    nzPlacement: 'topRight',
    nzDuration: 4500,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzAnimate: true
};
export class NzNotificationContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.instances = [];
        this.topLeftInstances = [];
        this.topRightInstances = [];
        this.bottomLeftInstances = [];
        this.bottomRightInstances = [];
    }
    create(notification) {
        const noti = this.onCreate(notification);
        const key = noti.options.nzKey;
        const notificationWithSameKey = this.instances.find(msg => msg.options.nzKey === notification.options.nzKey);
        if (key && notificationWithSameKey) {
            this.replaceNotification(notificationWithSameKey, noti);
        }
        else {
            if (this.instances.length >= this.config.nzMaxStack) {
                this.instances = this.instances.slice(1);
            }
            this.instances = [...this.instances, noti];
        }
        this.readyInstances();
        return noti;
    }
    onCreate(instance) {
        instance.options = this.mergeOptions(instance.options);
        instance.onClose = new Subject();
        instance.onClick = new Subject();
        return instance;
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.updateConfig());
    }
    updateConfig() {
        this.config = Object.assign(Object.assign(Object.assign({}, NZ_NOTIFICATION_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME));
        this.top = toCssPixel(this.config.nzTop);
        this.bottom = toCssPixel(this.config.nzBottom);
        this.cdr.markForCheck();
    }
    replaceNotification(old, _new) {
        old.title = _new.title;
        old.content = _new.content;
        old.template = _new.template;
        old.type = _new.type;
        old.options = _new.options;
    }
    readyInstances() {
        this.topLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'topLeft');
        this.topRightInstances = this.instances.filter(m => m.options.nzPlacement === 'topRight' || !m.options.nzPlacement);
        this.bottomLeftInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomLeft');
        this.bottomRightInstances = this.instances.filter(m => m.options.nzPlacement === 'bottomRight');
        this.cdr.detectChanges();
    }
    mergeOptions(options) {
        const { nzDuration, nzAnimate, nzPauseOnHover, nzPlacement } = this.config;
        return Object.assign({ nzDuration, nzAnimate, nzPauseOnHover, nzPlacement: nzPlacement }, options);
    }
}
NzNotificationContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-notification-container',
                exportAs: 'nzNotificationContainer',
                preserveWhitespaces: false,
                template: `
    <div class="ant-notification ant-notification-topLeft" [style.top]="top" [style.left]="'0px'">
      <nz-notification
        *ngFor="let instance of topLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-topRight" [style.top]="top" [style.right]="'0px'">
      <nz-notification
        *ngFor="let instance of topRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-bottomLeft" [style.bottom]="bottom" [style.left]="'0px'">
      <nz-notification
        *ngFor="let instance of bottomLeftInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
    <div class="ant-notification ant-notification-bottomRight" [style.bottom]="bottom" [style.right]="'0px'">
      <nz-notification
        *ngFor="let instance of bottomRightInstances"
        [instance]="instance"
        [placement]="config.nzPlacement"
        (destroyed)="remove($event.id, $event.userAction)"
      ></nz-notification>
    </div>
  `
            },] }
];
NzNotificationContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFtQyxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFckQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsTUFBTSxxQkFBcUIsR0FBZ0IsY0FBYyxDQUFDO0FBRTFELE1BQU0sOEJBQThCLEdBQWlDO0lBQ25FLEtBQUssRUFBRSxNQUFNO0lBQ2IsUUFBUSxFQUFFLE1BQU07SUFDaEIsV0FBVyxFQUFFLFVBQVU7SUFDdkIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLENBQUM7SUFDYixjQUFjLEVBQUUsSUFBSTtJQUNwQixTQUFTLEVBQUUsSUFBSTtDQUNoQixDQUFDO0FBMkNGLE1BQU0sT0FBTyxnQ0FBaUMsU0FBUSxzQkFBc0I7SUFVMUUsWUFBWSxHQUFzQixFQUFFLGVBQWdDO1FBQ2xFLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFQOUIsY0FBUyxHQUF3QyxFQUFFLENBQUM7UUFDcEQscUJBQWdCLEdBQXdDLEVBQUUsQ0FBQztRQUMzRCxzQkFBaUIsR0FBd0MsRUFBRSxDQUFDO1FB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O2FBQ0Y7OztZQTlEaUMsaUJBQWlCO1lBQ1QsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uQ29uZmlnLCBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOek1OQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnbmctem9ycm8tYW50ZC9tZXNzYWdlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpOb3RpZmljYXRpb25EYXRhLCBOek5vdGlmaWNhdGlvbkRhdGFPcHRpb25zIH0gZnJvbSAnLi90eXBpbmdzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdub3RpZmljYXRpb24nO1xuXG5jb25zdCBOWl9OT1RJRklDQVRJT05fREVGQVVMVF9DT05GSUc6IFJlcXVpcmVkPE5vdGlmaWNhdGlvbkNvbmZpZz4gPSB7XG4gIG56VG9wOiAnMjRweCcsXG4gIG56Qm90dG9tOiAnMjRweCcsXG4gIG56UGxhY2VtZW50OiAndG9wUmlnaHQnLFxuICBuekR1cmF0aW9uOiA0NTAwLFxuICBuek1heFN0YWNrOiA3LFxuICBuelBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgbnpBbmltYXRlOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotbm90aWZpY2F0aW9uLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpOb3RpZmljYXRpb25Db250YWluZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbiBhbnQtbm90aWZpY2F0aW9uLXRvcExlZnRcIiBbc3R5bGUudG9wXT1cInRvcFwiIFtzdHlsZS5sZWZ0XT1cIicwcHgnXCI+XG4gICAgICA8bnotbm90aWZpY2F0aW9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBpbnN0YW5jZSBvZiB0b3BMZWZ0SW5zdGFuY2VzXCJcbiAgICAgICAgW2luc3RhbmNlXT1cImluc3RhbmNlXCJcbiAgICAgICAgW3BsYWNlbWVudF09XCJjb25maWcubnpQbGFjZW1lbnRcIlxuICAgICAgICAoZGVzdHJveWVkKT1cInJlbW92ZSgkZXZlbnQuaWQsICRldmVudC51c2VyQWN0aW9uKVwiXG4gICAgICA+PC9uei1ub3RpZmljYXRpb24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFudC1ub3RpZmljYXRpb24gYW50LW5vdGlmaWNhdGlvbi10b3BSaWdodFwiIFtzdHlsZS50b3BdPVwidG9wXCIgW3N0eWxlLnJpZ2h0XT1cIicwcHgnXCI+XG4gICAgICA8bnotbm90aWZpY2F0aW9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBpbnN0YW5jZSBvZiB0b3BSaWdodEluc3RhbmNlc1wiXG4gICAgICAgIFtpbnN0YW5jZV09XCJpbnN0YW5jZVwiXG4gICAgICAgIFtwbGFjZW1lbnRdPVwiY29uZmlnLm56UGxhY2VtZW50XCJcbiAgICAgICAgKGRlc3Ryb3llZCk9XCJyZW1vdmUoJGV2ZW50LmlkLCAkZXZlbnQudXNlckFjdGlvbilcIlxuICAgICAgPjwvbnotbm90aWZpY2F0aW9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtbm90aWZpY2F0aW9uIGFudC1ub3RpZmljYXRpb24tYm90dG9tTGVmdFwiIFtzdHlsZS5ib3R0b21dPVwiYm90dG9tXCIgW3N0eWxlLmxlZnRdPVwiJzBweCdcIj5cbiAgICAgIDxuei1ub3RpZmljYXRpb25cbiAgICAgICAgKm5nRm9yPVwibGV0IGluc3RhbmNlIG9mIGJvdHRvbUxlZnRJbnN0YW5jZXNcIlxuICAgICAgICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAgICAgICBbcGxhY2VtZW50XT1cImNvbmZpZy5uelBsYWNlbWVudFwiXG4gICAgICAgIChkZXN0cm95ZWQpPVwicmVtb3ZlKCRldmVudC5pZCwgJGV2ZW50LnVzZXJBY3Rpb24pXCJcbiAgICAgID48L256LW5vdGlmaWNhdGlvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LW5vdGlmaWNhdGlvbiBhbnQtbm90aWZpY2F0aW9uLWJvdHRvbVJpZ2h0XCIgW3N0eWxlLmJvdHRvbV09XCJib3R0b21cIiBbc3R5bGUucmlnaHRdPVwiJzBweCdcIj5cbiAgICAgIDxuei1ub3RpZmljYXRpb25cbiAgICAgICAgKm5nRm9yPVwibGV0IGluc3RhbmNlIG9mIGJvdHRvbVJpZ2h0SW5zdGFuY2VzXCJcbiAgICAgICAgW2luc3RhbmNlXT1cImluc3RhbmNlXCJcbiAgICAgICAgW3BsYWNlbWVudF09XCJjb25maWcubnpQbGFjZW1lbnRcIlxuICAgICAgICAoZGVzdHJveWVkKT1cInJlbW92ZSgkZXZlbnQuaWQsICRldmVudC51c2VyQWN0aW9uKVwiXG4gICAgICA+PC9uei1ub3RpZmljYXRpb24+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBOek1OQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgYm90dG9tPzogc3RyaW5nIHwgbnVsbDtcbiAgdG9wPzogc3RyaW5nIHwgbnVsbDtcbiAgY29uZmlnITogUmVxdWlyZWQ8Tm90aWZpY2F0aW9uQ29uZmlnPjsgLy8gaW5pdGlhbGl6ZWQgYnkgcGFyZW50IGNsYXNzIGNvbnN0cnVjdG9yXG4gIGluc3RhbmNlczogQXJyYXk8UmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPj4gPSBbXTtcbiAgdG9wTGVmdEluc3RhbmNlczogQXJyYXk8UmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPj4gPSBbXTtcbiAgdG9wUmlnaHRJbnN0YW5jZXM6IEFycmF5PFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4+ID0gW107XG4gIGJvdHRvbUxlZnRJbnN0YW5jZXM6IEFycmF5PFJlcXVpcmVkPE56Tm90aWZpY2F0aW9uRGF0YT4+ID0gW107XG4gIGJvdHRvbVJpZ2h0SW5zdGFuY2VzOiBBcnJheTxSZXF1aXJlZDxOek5vdGlmaWNhdGlvbkRhdGE+PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2RyLCBuekNvbmZpZ1NlcnZpY2UpO1xuICB9XG5cbiAgY3JlYXRlKG5vdGlmaWNhdGlvbjogTnpOb3RpZmljYXRpb25EYXRhKTogUmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPiB7XG4gICAgY29uc3Qgbm90aSA9IHRoaXMub25DcmVhdGUobm90aWZpY2F0aW9uKTtcbiAgICBjb25zdCBrZXkgPSBub3RpLm9wdGlvbnMubnpLZXk7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uV2l0aFNhbWVLZXkgPSB0aGlzLmluc3RhbmNlcy5maW5kKFxuICAgICAgbXNnID0+IG1zZy5vcHRpb25zLm56S2V5ID09PSAobm90aWZpY2F0aW9uLm9wdGlvbnMgYXMgUmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucz4pLm56S2V5XG4gICAgKTtcbiAgICBpZiAoa2V5ICYmIG5vdGlmaWNhdGlvbldpdGhTYW1lS2V5KSB7XG4gICAgICB0aGlzLnJlcGxhY2VOb3RpZmljYXRpb24obm90aWZpY2F0aW9uV2l0aFNhbWVLZXksIG5vdGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5pbnN0YW5jZXMubGVuZ3RoID49IHRoaXMuY29uZmlnLm56TWF4U3RhY2spIHtcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSB0aGlzLmluc3RhbmNlcy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5zdGFuY2VzID0gWy4uLnRoaXMuaW5zdGFuY2VzLCBub3RpXTtcbiAgICB9XG5cbiAgICB0aGlzLnJlYWR5SW5zdGFuY2VzKCk7XG5cbiAgICByZXR1cm4gbm90aTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkNyZWF0ZShpbnN0YW5jZTogTnpOb3RpZmljYXRpb25EYXRhKTogUmVxdWlyZWQ8TnpOb3RpZmljYXRpb25EYXRhPiB7XG4gICAgaW5zdGFuY2Uub3B0aW9ucyA9IHRoaXMubWVyZ2VPcHRpb25zKGluc3RhbmNlLm9wdGlvbnMpO1xuICAgIGluc3RhbmNlLm9uQ2xvc2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICAgIGluc3RhbmNlLm9uQ2xpY2sgPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xuICAgIHJldHVybiBpbnN0YW5jZSBhcyBSZXF1aXJlZDxOek5vdGlmaWNhdGlvbkRhdGE+O1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZUNvbmZpZ0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVDb25maWcoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlQ29uZmlnKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgLi4uTlpfTk9USUZJQ0FUSU9OX0RFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAuLi50aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgIH07XG5cbiAgICB0aGlzLnRvcCA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpUb3AhKTtcbiAgICB0aGlzLmJvdHRvbSA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpCb3R0b20hKTtcblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXBsYWNlTm90aWZpY2F0aW9uKG9sZDogTnpOb3RpZmljYXRpb25EYXRhLCBfbmV3OiBOek5vdGlmaWNhdGlvbkRhdGEpOiB2b2lkIHtcbiAgICBvbGQudGl0bGUgPSBfbmV3LnRpdGxlO1xuICAgIG9sZC5jb250ZW50ID0gX25ldy5jb250ZW50O1xuICAgIG9sZC50ZW1wbGF0ZSA9IF9uZXcudGVtcGxhdGU7XG4gICAgb2xkLnR5cGUgPSBfbmV3LnR5cGU7XG4gICAgb2xkLm9wdGlvbnMgPSBfbmV3Lm9wdGlvbnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZHlJbnN0YW5jZXMoKTogdm9pZCB7XG4gICAgdGhpcy50b3BMZWZ0SW5zdGFuY2VzID0gdGhpcy5pbnN0YW5jZXMuZmlsdGVyKG0gPT4gbS5vcHRpb25zLm56UGxhY2VtZW50ID09PSAndG9wTGVmdCcpO1xuICAgIHRoaXMudG9wUmlnaHRJbnN0YW5jZXMgPSB0aGlzLmluc3RhbmNlcy5maWx0ZXIobSA9PiBtLm9wdGlvbnMubnpQbGFjZW1lbnQgPT09ICd0b3BSaWdodCcgfHwgIW0ub3B0aW9ucy5uelBsYWNlbWVudCk7XG4gICAgdGhpcy5ib3R0b21MZWZ0SW5zdGFuY2VzID0gdGhpcy5pbnN0YW5jZXMuZmlsdGVyKG0gPT4gbS5vcHRpb25zLm56UGxhY2VtZW50ID09PSAnYm90dG9tTGVmdCcpO1xuICAgIHRoaXMuYm90dG9tUmlnaHRJbnN0YW5jZXMgPSB0aGlzLmluc3RhbmNlcy5maWx0ZXIobSA9PiBtLm9wdGlvbnMubnpQbGFjZW1lbnQgPT09ICdib3R0b21SaWdodCcpO1xuXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1lcmdlT3B0aW9ucyhvcHRpb25zPzogTnpOb3RpZmljYXRpb25EYXRhT3B0aW9ucyk6IE56Tm90aWZpY2F0aW9uRGF0YU9wdGlvbnMge1xuICAgIGNvbnN0IHsgbnpEdXJhdGlvbiwgbnpBbmltYXRlLCBuelBhdXNlT25Ib3ZlciwgbnpQbGFjZW1lbnQgfSA9IHRoaXMuY29uZmlnO1xuICAgIHJldHVybiB7IG56RHVyYXRpb24sIG56QW5pbWF0ZSwgbnpQYXVzZU9uSG92ZXIsIG56UGxhY2VtZW50OiBuelBsYWNlbWVudCwgLi4ub3B0aW9ucyB9O1xuICB9XG59XG4iXX0=