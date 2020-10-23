//tableview RefreshBar基类
var RefreshBar = cc.Class({
    extends: cc.Component,
    properties: {
        dropRefresh : cc.Node,  //拉动刷新
        releaseUpdate : cc.Node, //释放更新
        loading : cc.Node,      //加载中
        updated : cc.Node,      //已更新
    },

    onLoad () {
        this.node.active = false
    },

    //状态更新
    updateState( coreTable, state ){
        this.coreTable = coreTable
        this.node.active = true
        this.dropRefresh.active = false
        this.releaseUpdate.active = false
        this.loading.active = false
        this.updated.active = false
        this.node.opacity = 255
        
        let size = coreTable.getContainerSize() 
        let offset = coreTable.getContainerOffset() 
        let isVertical = coreTable.getDirection() == Agui.TableView.DirectType.VERTICAL
        
        if (state == Agui.TableView.RefreshState.DROP_REFRESH) {
            this.node.parent = this.coreTable.content
            this.node.position = isVertical ? cc.v2(offset.x, size.height) : cc.v2(-this.node.width, offset.y)
            this.dropRefresh.active = true
        }else if (state == Agui.TableView.RefreshState.RELEASE_UPDATE) {
            this.releaseUpdate.active = true
        }else if (state == Agui.TableView.RefreshState.LOADING) {
            if (!isVertical) {
                this.node.position = cc.v2(0, offset.y)
            }
            this.loading.active = true
        }else if (state == Agui.TableView.RefreshState.UPDATED) {
            this.scheduleOnce(()=>{
                let viewSize = this.coreTable.node.getContentSize()
                this.node.parent = this.coreTable.node
                this.node.opacity = 0
                this.node.position = isVertical ? cc.v2(-viewSize.width*0.5, viewSize.height*0.5 - this.node.height) : cc.v2(-viewSize.width*0.5, -viewSize.height*0.5)
                this.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.delayTime(1.0), cc.fadeOut(0.5)))
            }, 1.0) 

            this.node.parent = this.coreTable.content
            this.node.position = isVertical ? cc.v2(offset.x, size.height) : cc.v2(-this.node.width, offset.y)
            this.updated.active = true
        }else{
            this.node.active = false
        }
    },

});

module.exports = RefreshBar