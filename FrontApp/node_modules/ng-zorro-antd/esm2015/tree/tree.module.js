/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';
export class NzTreeModule {
}
NzTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzOutletModule, NzIconModule, NzNoAnimationModule, NzHighlightModule, ScrollingModule],
                declarations: [
                    NzTreeComponent,
                    NzTreeNodeComponent,
                    NzTreeIndentComponent,
                    NzTreeNodeSwitcherComponent,
                    NzTreeNodeCheckboxComponent,
                    NzTreeNodeTitleComponent
                ],
                exports: [NzTreeComponent, NzTreeNodeComponent, NzTreeIndentComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL3RyZWUvIiwic291cmNlcyI6WyJ0cmVlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFjbkQsTUFBTSxPQUFPLFlBQVk7OztZQVp4QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO2dCQUM5RyxZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO2FBQ3ZFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56SGlnaGxpZ2h0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2hpZ2hsaWdodCc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56VHJlZUluZGVudENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1pbmRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJlZU5vZGVDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1ub2RlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlU3dpdGNoZXJDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbm9kZS1zd2l0Y2hlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZVRpdGxlQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW5vZGUtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJlZU5vZGVDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56T3V0bGV0TW9kdWxlLCBOekljb25Nb2R1bGUsIE56Tm9BbmltYXRpb25Nb2R1bGUsIE56SGlnaGxpZ2h0TW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOelRyZWVDb21wb25lbnQsXG4gICAgTnpUcmVlTm9kZUNvbXBvbmVudCxcbiAgICBOelRyZWVJbmRlbnRDb21wb25lbnQsXG4gICAgTnpUcmVlTm9kZVN3aXRjaGVyQ29tcG9uZW50LFxuICAgIE56VHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcbiAgICBOelRyZWVOb2RlVGl0bGVDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW056VHJlZUNvbXBvbmVudCwgTnpUcmVlTm9kZUNvbXBvbmVudCwgTnpUcmVlSW5kZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVNb2R1bGUge31cbiJdfQ==