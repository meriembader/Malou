/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzTreeNode } from './nz-tree-base-node';
export class NzTreeBase {
    constructor(nzTreeService) {
        this.nzTreeService = nzTreeService;
    }
    /**
     * Coerces a value({@link any[]}) to a TreeNodes({@link NzTreeNode[]})
     */
    coerceTreeNodes(value) {
        let nodes = [];
        if (!this.nzTreeService.isArrayOfNzTreeNode(value)) {
            // has not been new NzTreeNode
            nodes = value.map(item => new NzTreeNode(item, null, this.nzTreeService));
        }
        else {
            nodes = value.map((item) => {
                item.service = this.nzTreeService;
                return item;
            });
        }
        return nodes;
    }
    /**
     * Get all nodes({@link NzTreeNode})
     */
    getTreeNodes() {
        return this.nzTreeService.rootNodes;
    }
    /**
     * Get {@link NzTreeNode} with key
     */
    getTreeNodeByKey(key) {
        // flat tree nodes
        const nodes = [];
        const getNode = (node) => {
            nodes.push(node);
            node.getChildren().forEach(n => {
                getNode(n);
            });
        };
        this.getTreeNodes().forEach(n => {
            getNode(n);
        });
        return nodes.find(n => n.key === key) || null;
    }
    /**
     * Get checked nodes(merged)
     */
    getCheckedNodeList() {
        return this.nzTreeService.getCheckedNodeList();
    }
    /**
     * Get selected nodes
     */
    getSelectedNodeList() {
        return this.nzTreeService.getSelectedNodeList();
    }
    /**
     * Get half checked nodes
     */
    getHalfCheckedNodeList() {
        return this.nzTreeService.getHalfCheckedNodeList();
    }
    /**
     * Get expanded nodes
     */
    getExpandedNodeList() {
        return this.nzTreeService.getExpandedNodeList();
    }
    /**
     * Get matched nodes(if nzSearchValue is not null)
     */
    getMatchedNodeList() {
        return this.nzTreeService.getMatchedNodeList();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJlZS1iYXNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb3JlL3RyZWUvIiwic291cmNlcyI6WyJuei10cmVlLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBR0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2pELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQW1CLGFBQWdDO1FBQWhDLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtJQUFHLENBQUM7SUFFdkQ7O09BRUc7SUFDSCxlQUFlLENBQUMsS0FBa0I7UUFDaEMsSUFBSSxLQUFLLEdBQWlCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsRCw4QkFBOEI7WUFDOUIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1NBQzNFO2FBQU07WUFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWdCLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUNsQyxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQixDQUFDLEdBQVc7UUFDMUIsa0JBQWtCO1FBQ2xCLE1BQU0sS0FBSyxHQUFpQixFQUFFLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFnQixFQUFRLEVBQUU7WUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM3QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILHNCQUFzQjtRQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBOelRyZWVOb2RlIH0gZnJvbSAnLi9uei10cmVlLWJhc2Utbm9kZSc7XG5pbXBvcnQgeyBOelRyZWVCYXNlU2VydmljZSB9IGZyb20gJy4vbnotdHJlZS1iYXNlLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgTnpUcmVlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuelRyZWVTZXJ2aWNlOiBOelRyZWVCYXNlU2VydmljZSkge31cblxuICAvKipcbiAgICogQ29lcmNlcyBhIHZhbHVlKHtAbGluayBhbnlbXX0pIHRvIGEgVHJlZU5vZGVzKHtAbGluayBOelRyZWVOb2RlW119KVxuICAgKi9cbiAgY29lcmNlVHJlZU5vZGVzKHZhbHVlOiBOelNhZmVBbnlbXSk6IE56VHJlZU5vZGVbXSB7XG4gICAgbGV0IG5vZGVzOiBOelRyZWVOb2RlW10gPSBbXTtcbiAgICBpZiAoIXRoaXMubnpUcmVlU2VydmljZS5pc0FycmF5T2ZOelRyZWVOb2RlKHZhbHVlKSkge1xuICAgICAgLy8gaGFzIG5vdCBiZWVuIG5ldyBOelRyZWVOb2RlXG4gICAgICBub2RlcyA9IHZhbHVlLm1hcChpdGVtID0+IG5ldyBOelRyZWVOb2RlKGl0ZW0sIG51bGwsIHRoaXMubnpUcmVlU2VydmljZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlcyA9IHZhbHVlLm1hcCgoaXRlbTogTnpUcmVlTm9kZSkgPT4ge1xuICAgICAgICBpdGVtLnNlcnZpY2UgPSB0aGlzLm56VHJlZVNlcnZpY2U7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIG5vZGVzKHtAbGluayBOelRyZWVOb2RlfSlcbiAgICovXG4gIGdldFRyZWVOb2RlcygpOiBOelRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLm56VHJlZVNlcnZpY2Uucm9vdE5vZGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB7QGxpbmsgTnpUcmVlTm9kZX0gd2l0aCBrZXlcbiAgICovXG4gIGdldFRyZWVOb2RlQnlLZXkoa2V5OiBzdHJpbmcpOiBOelRyZWVOb2RlIHwgbnVsbCB7XG4gICAgLy8gZmxhdCB0cmVlIG5vZGVzXG4gICAgY29uc3Qgbm9kZXM6IE56VHJlZU5vZGVbXSA9IFtdO1xuICAgIGNvbnN0IGdldE5vZGUgPSAobm9kZTogTnpUcmVlTm9kZSk6IHZvaWQgPT4ge1xuICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgIG5vZGUuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKG4gPT4ge1xuICAgICAgICBnZXROb2RlKG4pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB0aGlzLmdldFRyZWVOb2RlcygpLmZvckVhY2gobiA9PiB7XG4gICAgICBnZXROb2RlKG4pO1xuICAgIH0pO1xuICAgIHJldHVybiBub2Rlcy5maW5kKG4gPT4gbi5rZXkgPT09IGtleSkgfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2hlY2tlZCBub2RlcyhtZXJnZWQpXG4gICAqL1xuICBnZXRDaGVja2VkTm9kZUxpc3QoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5uelRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2RlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzZWxlY3RlZCBub2Rlc1xuICAgKi9cbiAgZ2V0U2VsZWN0ZWROb2RlTGlzdCgpOiBOelRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLm56VHJlZVNlcnZpY2UuZ2V0U2VsZWN0ZWROb2RlTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBoYWxmIGNoZWNrZWQgbm9kZXNcbiAgICovXG4gIGdldEhhbGZDaGVja2VkTm9kZUxpc3QoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5uelRyZWVTZXJ2aWNlLmdldEhhbGZDaGVja2VkTm9kZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZXhwYW5kZWQgbm9kZXNcbiAgICovXG4gIGdldEV4cGFuZGVkTm9kZUxpc3QoKTogTnpUcmVlTm9kZVtdIHtcbiAgICByZXR1cm4gdGhpcy5uelRyZWVTZXJ2aWNlLmdldEV4cGFuZGVkTm9kZUxpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgbWF0Y2hlZCBub2RlcyhpZiBuelNlYXJjaFZhbHVlIGlzIG5vdCBudWxsKVxuICAgKi9cbiAgZ2V0TWF0Y2hlZE5vZGVMaXN0KCk6IE56VHJlZU5vZGVbXSB7XG4gICAgcmV0dXJuIHRoaXMubnpUcmVlU2VydmljZS5nZXRNYXRjaGVkTm9kZUxpc3QoKTtcbiAgfVxufVxuIl19