/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCodeEditorComponent } from './code-editor.component';
export class NzCodeEditorModule {
}
NzCodeEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzCodeEditorComponent],
                imports: [CommonModule, NzIconModule, NzSpinModule],
                exports: [NzCodeEditorComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3IubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb2RlLWVkaXRvci8iLCJzb3VyY2VzIjpbImNvZGUtZWRpdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBT2hFLE1BQU0sT0FBTyxrQkFBa0I7OztZQUw5QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuaW1wb3J0IHsgTnpDb2RlRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9jb2RlLWVkaXRvci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtOekNvZGVFZGl0b3JDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIE56U3Bpbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtOekNvZGVFZGl0b3JDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56Q29kZUVkaXRvck1vZHVsZSB7fVxuIl19