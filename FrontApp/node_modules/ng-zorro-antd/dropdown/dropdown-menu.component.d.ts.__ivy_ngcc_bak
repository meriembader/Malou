/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentInit, ChangeDetectorRef, ElementRef, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService } from 'ng-zorro-antd/menu';
import { BehaviorSubject } from 'rxjs';
export declare type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
export declare class NzDropdownMenuComponent implements AfterContentInit {
    private cdr;
    private elementRef;
    private renderer;
    viewContainerRef: ViewContainerRef;
    nzMenuService: MenuService;
    noAnimation?: NzNoAnimationDirective | undefined;
    mouseState$: BehaviorSubject<boolean>;
    isChildSubMenuOpen$: BehaviorSubject<boolean>;
    descendantMenuItemClick$: import("rxjs").Subject<any>;
    nzOverlayClassName: string;
    nzOverlayStyle: IndexableObject;
    templateRef: TemplateRef<NzSafeAny>;
    setMouseState(visible: boolean): void;
    setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2, viewContainerRef: ViewContainerRef, nzMenuService: MenuService, noAnimation?: NzNoAnimationDirective | undefined);
    ngAfterContentInit(): void;
}
