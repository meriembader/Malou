/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { moveUpMotion } from 'ng-zorro-antd/core/animation';
import { NzMNComponent } from './base';
export class NzMessageComponent extends NzMNComponent {
    constructor(cdr) {
        super(cdr);
        this.destroyed = new EventEmitter();
    }
}
NzMessageComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-message',
                exportAs: 'nzMessage',
                preserveWhitespaces: false,
                animations: [moveUpMotion],
                template: `
    <div class="ant-message-notice" [@moveUpMotion]="instance.state" (mouseenter)="onEnter()" (mouseleave)="onLeave()">
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i *ngSwitchCase="'success'" nz-icon nzType="check-circle"></i>
            <i *ngSwitchCase="'info'" nz-icon nzType="info-circle"></i>
            <i *ngSwitchCase="'warning'" nz-icon nzType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" nz-icon nzType="close-circle"></i>
            <i *ngSwitchCase="'loading'" nz-icon nzType="loading"></i>
          </ng-container>
          <ng-container *nzStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
            },] }
];
NzMessageComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzMessageComponent.propDecorators = {
    instance: [{ type: Input }],
    destroyed: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21lc3NhZ2UvIiwic291cmNlcyI6WyJtZXNzYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBNkJ2QyxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsYUFBYTtJQUluRCxZQUFZLEdBQXNCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUhNLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBdUMsQ0FBQztJQUl2RixDQUFDOzs7WUFoQ0YsU0FBUyxTQUFDO2dCQUNULGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7YUFDRjs7O1lBdkNDLGlCQUFpQjs7O3VCQXlDaEIsS0FBSzt3QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbW92ZVVwTW90aW9uIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2FuaW1hdGlvbic7XG5cbmltcG9ydCB7IE56TU5Db21wb25lbnQgfSBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHsgTnpNZXNzYWdlRGF0YSB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduei1tZXNzYWdlJyxcbiAgZXhwb3J0QXM6ICduek1lc3NhZ2UnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9uczogW21vdmVVcE1vdGlvbl0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlLW5vdGljZVwiIFtAbW92ZVVwTW90aW9uXT1cImluc3RhbmNlLnN0YXRlXCIgKG1vdXNlZW50ZXIpPVwib25FbnRlcigpXCIgKG1vdXNlbGVhdmUpPVwib25MZWF2ZSgpXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LW1lc3NhZ2Utbm90aWNlLWNvbnRlbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1tZXNzYWdlLWN1c3RvbS1jb250ZW50XCIgW25nQ2xhc3NdPVwiJ2FudC1tZXNzYWdlLScgKyBpbnN0YW5jZS50eXBlXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiaW5zdGFuY2UudHlwZVwiPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidzdWNjZXNzJ1wiIG56LWljb24gbnpUeXBlPVwiY2hlY2stY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidpbmZvJ1wiIG56LWljb24gbnpUeXBlPVwiaW5mby1jaXJjbGVcIj48L2k+XG4gICAgICAgICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ3dhcm5pbmcnXCIgbnotaWNvbiBuelR5cGU9XCJleGNsYW1hdGlvbi1jaXJjbGVcIj48L2k+XG4gICAgICAgICAgICA8aSAqbmdTd2l0Y2hDYXNlPVwiJ2Vycm9yJ1wiIG56LWljb24gbnpUeXBlPVwiY2xvc2UtY2lyY2xlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nU3dpdGNoQ2FzZT1cIidsb2FkaW5nJ1wiIG56LWljb24gbnpUeXBlPVwibG9hZGluZ1wiPjwvaT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaW5zdGFuY2UuY29udGVudFwiPlxuICAgICAgICAgICAgPHNwYW4gW2lubmVySFRNTF09XCJpbnN0YW5jZS5jb250ZW50XCI+PC9zcGFuPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56TWVzc2FnZUNvbXBvbmVudCBleHRlbmRzIE56TU5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGluc3RhbmNlITogUmVxdWlyZWQ8TnpNZXNzYWdlRGF0YT47XG4gIEBPdXRwdXQoKSByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaWQ6IHN0cmluZzsgdXNlckFjdGlvbjogYm9vbGVhbiB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihjZHIpO1xuICB9XG59XG4iXX0=