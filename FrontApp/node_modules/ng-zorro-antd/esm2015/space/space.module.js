/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSpaceItemComponent } from './space-item.component';
import { NzSpaceComponent } from './space.component';
export class NzSpaceModule {
}
NzSpaceModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzSpaceComponent, NzSpaceItemComponent],
                exports: [NzSpaceComponent, NzSpaceItemComponent],
                imports: [CommonModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9zcGFjZS8iLCJzb3VyY2VzIjpbInNwYWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQU9yRCxNQUFNLE9BQU8sYUFBYTs7O1lBTHpCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDdEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelNwYWNlSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc3BhY2UtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTcGFjZUNvbXBvbmVudCB9IGZyb20gJy4vc3BhY2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTnpTcGFjZUNvbXBvbmVudCwgTnpTcGFjZUl0ZW1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbTnpTcGFjZUNvbXBvbmVudCwgTnpTcGFjZUl0ZW1Db21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOelNwYWNlTW9kdWxlIHt9XG4iXX0=