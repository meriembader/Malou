/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
export class NzResultTitleDirective {
}
NzResultTitleDirective.decorators = [
    { type: Directive, args: [{
                selector: 'div[nz-result-title]',
                exportAs: 'nzResultTitle',
                host: {
                    class: 'ant-result-title'
                }
            },] }
];
export class NzResultSubtitleDirective {
}
NzResultSubtitleDirective.decorators = [
    { type: Directive, args: [{
                selector: 'div[nz-result-subtitle]',
                exportAs: 'nzResultSubtitle',
                host: {
                    class: 'ant-result-subtitle'
                }
            },] }
];
export class NzResultIconDirective {
}
NzResultIconDirective.decorators = [
    { type: Directive, args: [{
                selector: 'i[nz-result-icon], div[nz-result-icon]',
                exportAs: 'nzResultIcon'
            },] }
];
export class NzResultContentDirective {
}
NzResultContentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'div[nz-result-content]',
                exportAs: 'nzResultContent',
                host: {
                    class: 'ant-result-content'
                }
            },] }
];
export class NzResultExtraDirective {
}
NzResultExtraDirective.decorators = [
    { type: Directive, args: [{
                selector: 'div[nz-result-extra]',
                exportAs: 'nzResultExtra',
                host: {
                    class: 'ant-result-extra'
                }
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWNlbGxzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9yZXN1bHQvIiwic291cmNlcyI6WyJyZXN1bHQtY2VsbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVMxQyxNQUFNLE9BQU8sc0JBQXNCOzs7WUFQbEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtpQkFDMUI7YUFDRjs7QUFVRCxNQUFNLE9BQU8seUJBQXlCOzs7WUFQckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUscUJBQXFCO2lCQUM3QjthQUNGOztBQU9ELE1BQU0sT0FBTyxxQkFBcUI7OztZQUpqQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdDQUF3QztnQkFDbEQsUUFBUSxFQUFFLGNBQWM7YUFDekI7O0FBVUQsTUFBTSxPQUFPLHdCQUF3Qjs7O1lBUHBDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtpQkFDNUI7YUFDRjs7QUFVRCxNQUFNLE9BQU8sc0JBQXNCOzs7WUFQbEMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGtCQUFrQjtpQkFDMUI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbnotcmVzdWx0LXRpdGxlXScsXG4gIGV4cG9ydEFzOiAnbnpSZXN1bHRUaXRsZScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1yZXN1bHQtdGl0bGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXN1bHRUaXRsZURpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbnotcmVzdWx0LXN1YnRpdGxlXScsXG4gIGV4cG9ydEFzOiAnbnpSZXN1bHRTdWJ0aXRsZScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1yZXN1bHQtc3VidGl0bGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXN1bHRTdWJ0aXRsZURpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpW256LXJlc3VsdC1pY29uXSwgZGl2W256LXJlc3VsdC1pY29uXScsXG4gIGV4cG9ydEFzOiAnbnpSZXN1bHRJY29uJ1xufSlcbmV4cG9ydCBjbGFzcyBOelJlc3VsdEljb25EaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnZGl2W256LXJlc3VsdC1jb250ZW50XScsXG4gIGV4cG9ydEFzOiAnbnpSZXN1bHRDb250ZW50JyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXJlc3VsdC1jb250ZW50J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UmVzdWx0Q29udGVudERpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkaXZbbnotcmVzdWx0LWV4dHJhXScsXG4gIGV4cG9ydEFzOiAnbnpSZXN1bHRFeHRyYScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1yZXN1bHQtZXh0cmEnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXN1bHRFeHRyYURpcmVjdGl2ZSB7fVxuIl19