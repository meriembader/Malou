/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export const DEFAULT_RESIZE_DIRECTION = [
    'bottomRight',
    'topRight',
    'bottomLeft',
    'topLeft',
    'bottom',
    'right',
    'top',
    'left'
];
export class NzResizeHandlesComponent {
    constructor() {
        this.nzDirections = DEFAULT_RESIZE_DIRECTION;
        this.directions = new Set(this.nzDirections);
    }
    ngOnChanges(changes) {
        if (changes.nzDirections) {
            this.directions = new Set(changes.nzDirections.currentValue);
        }
    }
}
NzResizeHandlesComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-resize-handles',
                exportAs: 'nzResizeHandles',
                template: ` <nz-resize-handle *ngFor="let dir of directions" [nzDirection]="dir"></nz-resize-handle> `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
NzResizeHandlesComponent.ctorParameters = () => [];
NzResizeHandlesComponent.propDecorators = {
    nzDirections: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWhhbmRsZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9yZXNpemFibGUvIiwic291cmNlcyI6WyJyZXNpemUtaGFuZGxlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBSXBHLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUF3QjtJQUMzRCxhQUFhO0lBQ2IsVUFBVTtJQUNWLFlBQVk7SUFDWixTQUFTO0lBQ1QsUUFBUTtJQUNSLE9BQU87SUFDUCxLQUFLO0lBQ0wsTUFBTTtDQUNQLENBQUM7QUFRRixNQUFNLE9BQU8sd0JBQXdCO0lBSW5DO1FBSFMsaUJBQVksR0FBd0Isd0JBQXdCLENBQUM7UUFJcEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsNEZBQTRGO2dCQUN0RyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OzsyQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelJlc2l6ZURpcmVjdGlvbiB9IGZyb20gJy4vcmVzaXplLWhhbmRsZS5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9SRVNJWkVfRElSRUNUSU9OOiBOelJlc2l6ZURpcmVjdGlvbltdID0gW1xuICAnYm90dG9tUmlnaHQnLFxuICAndG9wUmlnaHQnLFxuICAnYm90dG9tTGVmdCcsXG4gICd0b3BMZWZ0JyxcbiAgJ2JvdHRvbScsXG4gICdyaWdodCcsXG4gICd0b3AnLFxuICAnbGVmdCdcbl07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXJlc2l6ZS1oYW5kbGVzJyxcbiAgZXhwb3J0QXM6ICduelJlc2l6ZUhhbmRsZXMnLFxuICB0ZW1wbGF0ZTogYCA8bnotcmVzaXplLWhhbmRsZSAqbmdGb3I9XCJsZXQgZGlyIG9mIGRpcmVjdGlvbnNcIiBbbnpEaXJlY3Rpb25dPVwiZGlyXCI+PC9uei1yZXNpemUtaGFuZGxlPiBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOelJlc2l6ZUhhbmRsZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuekRpcmVjdGlvbnM6IE56UmVzaXplRGlyZWN0aW9uW10gPSBERUZBVUxUX1JFU0laRV9ESVJFQ1RJT047XG4gIGRpcmVjdGlvbnM6IFNldDxOelJlc2l6ZURpcmVjdGlvbj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kaXJlY3Rpb25zID0gbmV3IFNldCh0aGlzLm56RGlyZWN0aW9ucyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMubnpEaXJlY3Rpb25zKSB7XG4gICAgICB0aGlzLmRpcmVjdGlvbnMgPSBuZXcgU2V0KGNoYW5nZXMubnpEaXJlY3Rpb25zLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=