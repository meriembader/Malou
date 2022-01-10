/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
export class NzTreeIndentComponent {
    constructor() {
        this.nzSelectMode = false;
        this.listOfUnit = [];
    }
    unitMapOfClass(index) {
        return {
            [`ant-tree-indent-unit`]: !this.nzSelectMode,
            [`ant-tree-indent-unit-start`]: !this.nzSelectMode && this.nzIsStart[index + 1],
            [`ant-tree-indent-unit-end`]: !this.nzSelectMode && this.nzIsEnd[index + 1],
            [`ant-select-tree-indent-unit`]: this.nzSelectMode,
            [`ant-select-tree-indent-unit-start`]: this.nzSelectMode && this.nzIsStart[index + 1],
            [`ant-select-tree-indent-unit-end`]: this.nzSelectMode && this.nzIsEnd[index + 1]
        };
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        const { nzTreeLevel } = changes;
        if (nzTreeLevel) {
            this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
        }
    }
}
NzTreeIndentComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-indent',
                exportAs: 'nzTreeIndent',
                template: ` <span *ngFor="let i of listOfUnit; let index = index" [ngClass]="unitMapOfClass(index)"></span> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[attr.aria-hidden]': 'true',
                    '[class.ant-tree-indent]': '!nzSelectMode',
                    '[class.ant-select-tree-indent]': 'nzSelectMode'
                }
            },] }
];
NzTreeIndentComponent.propDecorators = {
    nzTreeLevel: [{ type: Input }],
    nzIsStart: [{ type: Input }],
    nzIsEnd: [{ type: Input }],
    nzSelectMode: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1pbmRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy90cmVlLyIsInNvdXJjZXMiOlsidHJlZS1pbmRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQWM1RyxNQUFNLE9BQU8scUJBQXFCO0lBWmxDO1FBZ0JXLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRTlCLGVBQVUsR0FBYSxFQUFFLENBQUM7SUFxQjVCLENBQUM7SUFuQkMsY0FBYyxDQUFDLEtBQWE7UUFDMUIsT0FBTztZQUNMLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQzVDLENBQUMsNEJBQTRCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFNBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE9BQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzVFLENBQUMsNkJBQTZCLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNsRCxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDdEYsQ0FBQyxpQ0FBaUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE9BQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ25GLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxLQUFVLENBQUM7SUFFbkIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDaEMsSUFBSSxXQUFXLEVBQUU7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsbUdBQW1HO2dCQUM3RyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsSUFBSSxFQUFFO29CQUNKLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLHlCQUF5QixFQUFFLGVBQWU7b0JBQzFDLGdDQUFnQyxFQUFFLGNBQWM7aUJBQ2pEO2FBQ0Y7OzswQkFFRSxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzsyQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyZWUtaW5kZW50JyxcbiAgZXhwb3J0QXM6ICduelRyZWVJbmRlbnQnLFxuICB0ZW1wbGF0ZTogYCA8c3BhbiAqbmdGb3I9XCJsZXQgaSBvZiBsaXN0T2ZVbml0OyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT1cInVuaXRNYXBPZkNsYXNzKGluZGV4KVwiPjwvc3Bhbj4gYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICd0cnVlJyxcbiAgICAnW2NsYXNzLmFudC10cmVlLWluZGVudF0nOiAnIW56U2VsZWN0TW9kZScsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXRyZWUtaW5kZW50XSc6ICduelNlbGVjdE1vZGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlSW5kZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBuelRyZWVMZXZlbD86IG51bWJlcjtcbiAgQElucHV0KCkgbnpJc1N0YXJ0PzogYm9vbGVhbltdO1xuICBASW5wdXQoKSBueklzRW5kPzogYm9vbGVhbltdO1xuICBASW5wdXQoKSBuelNlbGVjdE1vZGUgPSBmYWxzZTtcblxuICBsaXN0T2ZVbml0OiBudW1iZXJbXSA9IFtdO1xuXG4gIHVuaXRNYXBPZkNsYXNzKGluZGV4OiBudW1iZXIpOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtgYW50LXRyZWUtaW5kZW50LXVuaXRgXTogIXRoaXMubnpTZWxlY3RNb2RlLFxuICAgICAgW2BhbnQtdHJlZS1pbmRlbnQtdW5pdC1zdGFydGBdOiAhdGhpcy5uelNlbGVjdE1vZGUgJiYgdGhpcy5ueklzU3RhcnQhW2luZGV4ICsgMV0sXG4gICAgICBbYGFudC10cmVlLWluZGVudC11bml0LWVuZGBdOiAhdGhpcy5uelNlbGVjdE1vZGUgJiYgdGhpcy5ueklzRW5kIVtpbmRleCArIDFdLFxuICAgICAgW2BhbnQtc2VsZWN0LXRyZWUtaW5kZW50LXVuaXRgXTogdGhpcy5uelNlbGVjdE1vZGUsXG4gICAgICBbYGFudC1zZWxlY3QtdHJlZS1pbmRlbnQtdW5pdC1zdGFydGBdOiB0aGlzLm56U2VsZWN0TW9kZSAmJiB0aGlzLm56SXNTdGFydCFbaW5kZXggKyAxXSxcbiAgICAgIFtgYW50LXNlbGVjdC10cmVlLWluZGVudC11bml0LWVuZGBdOiB0aGlzLm56U2VsZWN0TW9kZSAmJiB0aGlzLm56SXNFbmQhW2luZGV4ICsgMV1cbiAgICB9O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VHJlZUxldmVsIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelRyZWVMZXZlbCkge1xuICAgICAgdGhpcy5saXN0T2ZVbml0ID0gWy4uLm5ldyBBcnJheShuelRyZWVMZXZlbC5jdXJyZW50VmFsdWUgfHwgMCldO1xuICAgIH1cbiAgfVxufVxuIl19