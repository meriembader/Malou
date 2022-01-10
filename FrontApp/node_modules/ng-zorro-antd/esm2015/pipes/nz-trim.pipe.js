/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Pipe } from '@angular/core';
export class NzTrimPipe {
    // TODO(chensimeng) trimEnd, trimStart
    transform(text) {
        return text.trim();
    }
}
NzTrimPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nzTrim'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJpbS5waXBlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9waXBlcy8iLCJzb3VyY2VzIjpbIm56LXRyaW0ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sVUFBVTtJQUNyQixzQ0FBc0M7SUFDdEMsU0FBUyxDQUFDLElBQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7O1lBUEYsSUFBSSxTQUFDO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ256VHJpbSdcbn0pXG5leHBvcnQgY2xhc3MgTnpUcmltUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBUT0RPKGNoZW5zaW1lbmcpIHRyaW1FbmQsIHRyaW1TdGFydFxuICB0cmFuc2Zvcm0odGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC50cmltKCk7XG4gIH1cbn1cbiJdfQ==