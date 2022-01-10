/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSkeletonElementAvatarComponent, NzSkeletonElementButtonComponent, NzSkeletonElementDirective, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent } from './skeleton-element.component';
import { NzSkeletonComponent } from './skeleton.component';
export class NzSkeletonModule {
}
NzSkeletonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzSkeletonComponent,
                    NzSkeletonElementDirective,
                    NzSkeletonElementButtonComponent,
                    NzSkeletonElementAvatarComponent,
                    NzSkeletonElementImageComponent,
                    NzSkeletonElementInputComponent
                ],
                imports: [CommonModule],
                exports: [
                    NzSkeletonComponent,
                    NzSkeletonElementDirective,
                    NzSkeletonElementButtonComponent,
                    NzSkeletonElementAvatarComponent,
                    NzSkeletonElementImageComponent,
                    NzSkeletonElementInputComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9za2VsZXRvbi8iLCJzb3VyY2VzIjpbInNrZWxldG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsZ0NBQWdDLEVBQ2hDLGdDQUFnQyxFQUNoQywwQkFBMEIsRUFDMUIsK0JBQStCLEVBQy9CLCtCQUErQixFQUNoQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBcUIzRCxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFuQjVCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLGdDQUFnQztvQkFDaEMsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLCtCQUErQjtpQkFDaEM7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUU7b0JBQ1AsbUJBQW1CO29CQUNuQiwwQkFBMEI7b0JBQzFCLGdDQUFnQztvQkFDaEMsZ0NBQWdDO29CQUNoQywrQkFBK0I7b0JBQy9CLCtCQUErQjtpQkFDaEM7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTnpTa2VsZXRvbkVsZW1lbnRBdmF0YXJDb21wb25lbnQsXG4gIE56U2tlbGV0b25FbGVtZW50QnV0dG9uQ29tcG9uZW50LFxuICBOelNrZWxldG9uRWxlbWVudERpcmVjdGl2ZSxcbiAgTnpTa2VsZXRvbkVsZW1lbnRJbWFnZUNvbXBvbmVudCxcbiAgTnpTa2VsZXRvbkVsZW1lbnRJbnB1dENvbXBvbmVudFxufSBmcm9tICcuL3NrZWxldG9uLWVsZW1lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE56U2tlbGV0b25Db21wb25lbnQgfSBmcm9tICcuL3NrZWxldG9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE56U2tlbGV0b25Db21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnREaXJlY3RpdmUsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRCdXR0b25Db21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRBdmF0YXJDb21wb25lbnQsXG4gICAgTnpTa2VsZXRvbkVsZW1lbnRJbWFnZUNvbXBvbmVudCxcbiAgICBOelNrZWxldG9uRWxlbWVudElucHV0Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTnpTa2VsZXRvbkNvbXBvbmVudCxcbiAgICBOelNrZWxldG9uRWxlbWVudERpcmVjdGl2ZSxcbiAgICBOelNrZWxldG9uRWxlbWVudEJ1dHRvbkNvbXBvbmVudCxcbiAgICBOelNrZWxldG9uRWxlbWVudEF2YXRhckNvbXBvbmVudCxcbiAgICBOelNrZWxldG9uRWxlbWVudEltYWdlQ29tcG9uZW50LFxuICAgIE56U2tlbGV0b25FbGVtZW50SW5wdXRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelNrZWxldG9uTW9kdWxlIHt9XG4iXX0=