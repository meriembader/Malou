/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { toCssPixel } from 'ng-zorro-antd/core/util';
export class NzSkeletonComponent {
    constructor(cdr, renderer, elementRef) {
        this.cdr = cdr;
        this.nzActive = false;
        this.nzLoading = true;
        this.nzRound = false;
        this.nzTitle = true;
        this.nzAvatar = false;
        this.nzParagraph = true;
        this.rowsList = [];
        this.widthList = [];
        renderer.addClass(elementRef.nativeElement, 'ant-skeleton');
    }
    toCSSUnit(value = '') {
        return toCssPixel(value);
    }
    getTitleProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasParagraph = !!this.nzParagraph;
        let width = '';
        if (!hasAvatar && hasParagraph) {
            width = '38%';
        }
        else if (hasAvatar && hasParagraph) {
            width = '50%';
        }
        return Object.assign({ width }, this.getProps(this.nzTitle));
    }
    getAvatarProps() {
        const shape = !!this.nzTitle && !this.nzParagraph ? 'square' : 'circle';
        const size = 'large';
        return Object.assign({ shape, size }, this.getProps(this.nzAvatar));
    }
    getParagraphProps() {
        const hasAvatar = !!this.nzAvatar;
        const hasTitle = !!this.nzTitle;
        const basicProps = {};
        // Width
        if (!hasAvatar || !hasTitle) {
            basicProps.width = '61%';
        }
        // Rows
        if (!hasAvatar && hasTitle) {
            basicProps.rows = 3;
        }
        else {
            basicProps.rows = 2;
        }
        return Object.assign(Object.assign({}, basicProps), this.getProps(this.nzParagraph));
    }
    getProps(prop) {
        return prop && typeof prop === 'object' ? prop : {};
    }
    getWidthList() {
        const { width, rows } = this.paragraph;
        let widthList = [];
        if (width && Array.isArray(width)) {
            widthList = width;
        }
        else if (width && !Array.isArray(width)) {
            widthList = [];
            widthList[rows - 1] = width;
        }
        return widthList;
    }
    updateProps() {
        this.title = this.getTitleProps();
        this.avatar = this.getAvatarProps();
        this.paragraph = this.getParagraphProps();
        this.rowsList = [...Array(this.paragraph.rows)];
        this.widthList = this.getWidthList();
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.updateProps();
    }
    ngOnChanges(changes) {
        if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
            this.updateProps();
        }
    }
}
NzSkeletonComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-skeleton',
                exportAs: 'nzSkeleton',
                host: {
                    '[class.ant-skeleton-with-avatar]': '!!nzAvatar',
                    '[class.ant-skeleton-active]': 'nzActive',
                    '[class.ant-skeleton-round]': '!!nzRound'
                },
                template: `
    <ng-container *ngIf="nzLoading">
      <div class="ant-skeleton-header" *ngIf="!!nzAvatar">
        <nz-skeleton-element nzType="avatar" [nzSize]="avatar.size || 'default'" [nzShape]="avatar.shape || 'circle'"></nz-skeleton-element>
      </div>
      <div class="ant-skeleton-content">
        <h3 *ngIf="!!nzTitle" class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        <ul *ngIf="!!nzParagraph" class="ant-skeleton-paragraph">
          <li *ngFor="let row of rowsList; let i = index" [style.width]="toCSSUnit(widthList[i])"></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!nzLoading">
      <ng-content></ng-content>
    </ng-container>
  `
            },] }
];
NzSkeletonComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef }
];
NzSkeletonComponent.propDecorators = {
    nzActive: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzRound: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzAvatar: [{ type: Input }],
    nzParagraph: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9za2VsZXRvbi8iLCJzb3VyY2VzIjpbInNrZWxldG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQThCckQsTUFBTSxPQUFPLG1CQUFtQjtJQWM5QixZQUFvQixHQUFzQixFQUFFLFFBQW1CLEVBQUUsVUFBc0I7UUFBbkUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFiakMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUE4QixJQUFJLENBQUM7UUFDMUMsYUFBUSxHQUErQixLQUFLLENBQUM7UUFDN0MsZ0JBQVcsR0FBa0MsSUFBSSxDQUFDO1FBSzNELGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFHckMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxTQUFTLENBQUMsUUFBeUIsRUFBRTtRQUNuQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLFNBQVMsR0FBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxNQUFNLFlBQVksR0FBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLEtBQUss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QztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQzlELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7OztZQXJIRixTQUFTLFNBQUM7Z0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLElBQUksRUFBRTtvQkFDSixrQ0FBa0MsRUFBRSxZQUFZO29CQUNoRCw2QkFBNkIsRUFBRSxVQUFVO29CQUN6Qyw0QkFBNEIsRUFBRSxXQUFXO2lCQUMxQztnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2FBQ0Y7OztZQXhDQyxpQkFBaUI7WUFNakIsU0FBUztZQUpULFVBQVU7Ozt1QkF3Q1QsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB0b0Nzc1BpeGVsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpTa2VsZXRvbkF2YXRhciwgTnpTa2VsZXRvbkF2YXRhclNoYXBlLCBOelNrZWxldG9uQXZhdGFyU2l6ZSwgTnpTa2VsZXRvblBhcmFncmFwaCwgTnpTa2VsZXRvblRpdGxlIH0gZnJvbSAnLi9za2VsZXRvbi50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LXNrZWxldG9uJyxcbiAgZXhwb3J0QXM6ICduelNrZWxldG9uJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYW50LXNrZWxldG9uLXdpdGgtYXZhdGFyXSc6ICchIW56QXZhdGFyJyxcbiAgICAnW2NsYXNzLmFudC1za2VsZXRvbi1hY3RpdmVdJzogJ256QWN0aXZlJyxcbiAgICAnW2NsYXNzLmFudC1za2VsZXRvbi1yb3VuZF0nOiAnISFuelJvdW5kJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuekxvYWRpbmdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtc2tlbGV0b24taGVhZGVyXCIgKm5nSWY9XCIhIW56QXZhdGFyXCI+XG4gICAgICAgIDxuei1za2VsZXRvbi1lbGVtZW50IG56VHlwZT1cImF2YXRhclwiIFtuelNpemVdPVwiYXZhdGFyLnNpemUgfHwgJ2RlZmF1bHQnXCIgW256U2hhcGVdPVwiYXZhdGFyLnNoYXBlIHx8ICdjaXJjbGUnXCI+PC9uei1za2VsZXRvbi1lbGVtZW50PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXNrZWxldG9uLWNvbnRlbnRcIj5cbiAgICAgICAgPGgzICpuZ0lmPVwiISFuelRpdGxlXCIgY2xhc3M9XCJhbnQtc2tlbGV0b24tdGl0bGVcIiBbc3R5bGUud2lkdGhdPVwidG9DU1NVbml0KHRpdGxlLndpZHRoKVwiPjwvaDM+XG4gICAgICAgIDx1bCAqbmdJZj1cIiEhbnpQYXJhZ3JhcGhcIiBjbGFzcz1cImFudC1za2VsZXRvbi1wYXJhZ3JhcGhcIj5cbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHJvdyBvZiByb3dzTGlzdDsgbGV0IGkgPSBpbmRleFwiIFtzdHlsZS53aWR0aF09XCJ0b0NTU1VuaXQod2lkdGhMaXN0W2ldKVwiPjwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW56TG9hZGluZ1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56U2tlbGV0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG56QWN0aXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TG9hZGluZyA9IHRydWU7XG4gIEBJbnB1dCgpIG56Um91bmQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpUaXRsZTogTnpTa2VsZXRvblRpdGxlIHwgYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG56QXZhdGFyOiBOelNrZWxldG9uQXZhdGFyIHwgYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBuelBhcmFncmFwaDogTnpTa2VsZXRvblBhcmFncmFwaCB8IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHRpdGxlITogTnpTa2VsZXRvblRpdGxlO1xuICBhdmF0YXIhOiBOelNrZWxldG9uQXZhdGFyO1xuICBwYXJhZ3JhcGghOiBOelNrZWxldG9uUGFyYWdyYXBoO1xuICByb3dzTGlzdDogbnVtYmVyW10gPSBbXTtcbiAgd2lkdGhMaXN0OiBBcnJheTxudW1iZXIgfCBzdHJpbmc+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LXNrZWxldG9uJyk7XG4gIH1cblxuICB0b0NTU1VuaXQodmFsdWU6IG51bWJlciB8IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdG9Dc3NQaXhlbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFRpdGxlUHJvcHMoKTogTnpTa2VsZXRvblRpdGxlIHtcbiAgICBjb25zdCBoYXNBdmF0YXI6IGJvb2xlYW4gPSAhIXRoaXMubnpBdmF0YXI7XG4gICAgY29uc3QgaGFzUGFyYWdyYXBoOiBib29sZWFuID0gISF0aGlzLm56UGFyYWdyYXBoO1xuICAgIGxldCB3aWR0aCA9ICcnO1xuICAgIGlmICghaGFzQXZhdGFyICYmIGhhc1BhcmFncmFwaCkge1xuICAgICAgd2lkdGggPSAnMzglJztcbiAgICB9IGVsc2UgaWYgKGhhc0F2YXRhciAmJiBoYXNQYXJhZ3JhcGgpIHtcbiAgICAgIHdpZHRoID0gJzUwJSc7XG4gICAgfVxuICAgIHJldHVybiB7IHdpZHRoLCAuLi50aGlzLmdldFByb3BzKHRoaXMubnpUaXRsZSkgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXZhdGFyUHJvcHMoKTogTnpTa2VsZXRvbkF2YXRhciB7XG4gICAgY29uc3Qgc2hhcGU6IE56U2tlbGV0b25BdmF0YXJTaGFwZSA9ICEhdGhpcy5uelRpdGxlICYmICF0aGlzLm56UGFyYWdyYXBoID8gJ3NxdWFyZScgOiAnY2lyY2xlJztcbiAgICBjb25zdCBzaXplOiBOelNrZWxldG9uQXZhdGFyU2l6ZSA9ICdsYXJnZSc7XG4gICAgcmV0dXJuIHsgc2hhcGUsIHNpemUsIC4uLnRoaXMuZ2V0UHJvcHModGhpcy5uekF2YXRhcikgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyYWdyYXBoUHJvcHMoKTogTnpTa2VsZXRvblBhcmFncmFwaCB7XG4gICAgY29uc3QgaGFzQXZhdGFyOiBib29sZWFuID0gISF0aGlzLm56QXZhdGFyO1xuICAgIGNvbnN0IGhhc1RpdGxlOiBib29sZWFuID0gISF0aGlzLm56VGl0bGU7XG4gICAgY29uc3QgYmFzaWNQcm9wczogTnpTa2VsZXRvblBhcmFncmFwaCA9IHt9O1xuICAgIC8vIFdpZHRoXG4gICAgaWYgKCFoYXNBdmF0YXIgfHwgIWhhc1RpdGxlKSB7XG4gICAgICBiYXNpY1Byb3BzLndpZHRoID0gJzYxJSc7XG4gICAgfVxuICAgIC8vIFJvd3NcbiAgICBpZiAoIWhhc0F2YXRhciAmJiBoYXNUaXRsZSkge1xuICAgICAgYmFzaWNQcm9wcy5yb3dzID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzaWNQcm9wcy5yb3dzID0gMjtcbiAgICB9XG4gICAgcmV0dXJuIHsgLi4uYmFzaWNQcm9wcywgLi4udGhpcy5nZXRQcm9wcyh0aGlzLm56UGFyYWdyYXBoKSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcm9wczxUPihwcm9wOiBUIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCk6IFQgfCB7fSB7XG4gICAgcmV0dXJuIHByb3AgJiYgdHlwZW9mIHByb3AgPT09ICdvYmplY3QnID8gcHJvcCA6IHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXaWR0aExpc3QoKTogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPiB7XG4gICAgY29uc3QgeyB3aWR0aCwgcm93cyB9ID0gdGhpcy5wYXJhZ3JhcGg7XG4gICAgbGV0IHdpZHRoTGlzdDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IFtdO1xuICAgIGlmICh3aWR0aCAmJiBBcnJheS5pc0FycmF5KHdpZHRoKSkge1xuICAgICAgd2lkdGhMaXN0ID0gd2lkdGg7XG4gICAgfSBlbHNlIGlmICh3aWR0aCAmJiAhQXJyYXkuaXNBcnJheSh3aWR0aCkpIHtcbiAgICAgIHdpZHRoTGlzdCA9IFtdO1xuICAgICAgd2lkdGhMaXN0W3Jvd3MhIC0gMV0gPSB3aWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIHdpZHRoTGlzdDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJvcHMoKTogdm9pZCB7XG4gICAgdGhpcy50aXRsZSA9IHRoaXMuZ2V0VGl0bGVQcm9wcygpO1xuICAgIHRoaXMuYXZhdGFyID0gdGhpcy5nZXRBdmF0YXJQcm9wcygpO1xuICAgIHRoaXMucGFyYWdyYXBoID0gdGhpcy5nZXRQYXJhZ3JhcGhQcm9wcygpO1xuICAgIHRoaXMucm93c0xpc3QgPSBbLi4uQXJyYXkodGhpcy5wYXJhZ3JhcGgucm93cyldO1xuICAgIHRoaXMud2lkdGhMaXN0ID0gdGhpcy5nZXRXaWR0aExpc3QoKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlUHJvcHMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uelRpdGxlIHx8IGNoYW5nZXMubnpBdmF0YXIgfHwgY2hhbmdlcy5uelBhcmFncmFwaCkge1xuICAgICAgdGhpcy51cGRhdGVQcm9wcygpO1xuICAgIH1cbiAgfVxufVxuIl19