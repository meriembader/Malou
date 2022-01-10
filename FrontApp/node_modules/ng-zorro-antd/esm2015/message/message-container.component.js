/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { toCssPixel } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzMNContainerComponent } from './base';
const NZ_CONFIG_COMPONENT_NAME = 'message';
const NZ_MESSAGE_DEFAULT_CONFIG = {
    nzAnimate: true,
    nzDuration: 3000,
    nzMaxStack: 7,
    nzPauseOnHover: true,
    nzTop: 24
};
export class NzMessageContainerComponent extends NzMNContainerComponent {
    constructor(cdr, nzConfigService) {
        super(cdr, nzConfigService);
        this.destroy$ = new Subject();
        this.instances = [];
    }
    subscribeConfigChange() {
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.updateConfig());
    }
    updateConfig() {
        this.config = Object.assign(Object.assign(Object.assign({}, NZ_MESSAGE_DEFAULT_CONFIG), this.config), this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME));
        this.top = toCssPixel(this.config.nzTop);
        this.cdr.markForCheck();
    }
}
NzMessageContainerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-message-container',
                exportAs: 'nzMessageContainer',
                preserveWhitespaces: false,
                template: `
    <div class="ant-message" [style.top]="top">
      <nz-message *ngFor="let instance of instances" [instance]="instance" (destroyed)="remove($event.id, $event.userAction)"></nz-message>
    </div>
  `
            },] }
];
NzMessageContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9tZXNzYWdlLyIsInNvdXJjZXMiOlsibWVzc2FnZS1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFpQixlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR2hELE1BQU0sd0JBQXdCLEdBQUcsU0FBUyxDQUFDO0FBRTNDLE1BQU0seUJBQXlCLEdBQTRCO0lBQ3pELFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLENBQUM7SUFDYixjQUFjLEVBQUUsSUFBSTtJQUNwQixLQUFLLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFjRixNQUFNLE9BQU8sMkJBQTRCLFNBQVEsc0JBQXNCO0lBTXJFLFlBQVksR0FBc0IsRUFBRSxlQUFnQztRQUNsRSxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBTnJCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRXhDLGNBQVMsR0FBbUMsRUFBRSxDQUFDO0lBSy9DLENBQUM7SUFFUyxxQkFBcUI7UUFDN0IsSUFBSSxDQUFDLGVBQWU7YUFDakIsZ0NBQWdDLENBQUMsd0JBQXdCLENBQUM7YUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFUyxZQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLGlEQUNOLHlCQUF5QixHQUN6QixJQUFJLENBQUMsTUFBTSxHQUNYLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsQ0FDeEUsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsUUFBUSxFQUFFOzs7O0dBSVQ7YUFDRjs7O1lBOUJpQyxpQkFBaUI7WUFDM0IsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVzc2FnZUNvbmZpZywgTnpDb25maWdTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOek1OQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IE56TWVzc2FnZURhdGEgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5jb25zdCBOWl9DT05GSUdfQ09NUE9ORU5UX05BTUUgPSAnbWVzc2FnZSc7XG5cbmNvbnN0IE5aX01FU1NBR0VfREVGQVVMVF9DT05GSUc6IFJlcXVpcmVkPE1lc3NhZ2VDb25maWc+ID0ge1xuICBuekFuaW1hdGU6IHRydWUsXG4gIG56RHVyYXRpb246IDMwMDAsXG4gIG56TWF4U3RhY2s6IDcsXG4gIG56UGF1c2VPbkhvdmVyOiB0cnVlLFxuICBuelRvcDogMjRcbn07XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1tZXNzYWdlLWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnbnpNZXNzYWdlQ29udGFpbmVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlXCIgW3N0eWxlLnRvcF09XCJ0b3BcIj5cbiAgICAgIDxuei1tZXNzYWdlICpuZ0Zvcj1cImxldCBpbnN0YW5jZSBvZiBpbnN0YW5jZXNcIiBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIiAoZGVzdHJveWVkKT1cInJlbW92ZSgkZXZlbnQuaWQsICRldmVudC51c2VyQWN0aW9uKVwiPjwvbnotbWVzc2FnZT5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOek1lc3NhZ2VDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBOek1OQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGluc3RhbmNlczogQXJyYXk8UmVxdWlyZWQ8TnpNZXNzYWdlRGF0YT4+ID0gW107XG4gIHRvcD86IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcihjZHIsIG56Q29uZmlnU2VydmljZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlQ29uZmlnQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZUNvbmZpZygpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAuLi5OWl9NRVNTQUdFX0RFRkFVTFRfQ09ORklHLFxuICAgICAgLi4udGhpcy5jb25maWcsXG4gICAgICAuLi50aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX0NPTVBPTkVOVF9OQU1FKVxuICAgIH07XG5cbiAgICB0aGlzLnRvcCA9IHRvQ3NzUGl4ZWwodGhpcy5jb25maWcubnpUb3ApO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=