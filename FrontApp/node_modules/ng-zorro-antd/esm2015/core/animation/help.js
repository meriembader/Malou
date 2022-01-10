/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { animate, style, transition, trigger } from '@angular/animations';
import { AnimationCurves, AnimationDuration } from './animation-consts';
export const helpMotion = trigger('helpMotion', [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
            opacity: 1,
            transform: 'translateY(0)'
        }))
    ]),
    transition(':leave', [
        style({
            opacity: 1,
            transform: 'translateY(0)'
        }),
        animate(`${AnimationDuration.SLOW} ${AnimationCurves.EASE_IN_OUT}`, style({
            opacity: 0,
            transform: 'translateY(-5px)'
        }))
    ])
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92c3RzL3dvcmsvMS9zL2NvbXBvbmVudHMvY29yZS9hbmltYXRpb24vIiwic291cmNlcyI6WyJoZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxPQUFPLEVBQTRCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXhFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBNkIsT0FBTyxDQUFDLFlBQVksRUFBRTtJQUN4RSxVQUFVLENBQUMsUUFBUSxFQUFFO1FBQ25CLEtBQUssQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1lBQ1YsU0FBUyxFQUFFLGtCQUFrQjtTQUM5QixDQUFDO1FBQ0YsT0FBTyxDQUNMLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsRUFDMUQsS0FBSyxDQUFDO1lBQ0osT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQ0g7S0FDRixDQUFDO0lBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtRQUNuQixLQUFLLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUM7UUFDRixPQUFPLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksZUFBZSxDQUFDLFdBQVcsRUFBRSxFQUMxRCxLQUFLLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztZQUNWLFNBQVMsRUFBRSxrQkFBa0I7U0FDOUIsQ0FBQyxDQUNIO0tBQ0YsQ0FBQztDQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlcywgQW5pbWF0aW9uRHVyYXRpb24gfSBmcm9tICcuL2FuaW1hdGlvbi1jb25zdHMnO1xuXG5leHBvcnQgY29uc3QgaGVscE1vdGlvbjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gdHJpZ2dlcignaGVscE1vdGlvbicsIFtcbiAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgIHN0eWxlKHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01cHgpJ1xuICAgIH0pLFxuICAgIGFuaW1hdGUoXG4gICAgICBgJHtBbmltYXRpb25EdXJhdGlvbi5TTE9XfSAke0FuaW1hdGlvbkN1cnZlcy5FQVNFX0lOX09VVH1gLFxuICAgICAgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ1xuICAgICAgfSlcbiAgICApXG4gIF0pLFxuICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgc3R5bGUoe1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknXG4gICAgfSksXG4gICAgYW5pbWF0ZShcbiAgICAgIGAke0FuaW1hdGlvbkR1cmF0aW9uLlNMT1d9ICR7QW5pbWF0aW9uQ3VydmVzLkVBU0VfSU5fT1VUfWAsXG4gICAgICBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTVweCknXG4gICAgICB9KVxuICAgIClcbiAgXSlcbl0pO1xuIl19