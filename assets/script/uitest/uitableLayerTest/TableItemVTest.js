

cc.Class({
    extends: Agui.BaseCell,
    properties: {
        bgSprite : cc.Node,
        indexLab : cc.Label,
        infoNode : cc.Node,
        delNode : cc.Node,
    },

    onLoad(){
        this.bgStartPos = this.bgSprite.position
    },

    //更新cell动画显示,子类可以重新这个动画效果
    updateAnim( idx, data ){
        this.node.opacity = 0
        this.node.x = this.node.x - 100
        var moveBy = cc.moveBy(0.2, cc.v2(100, 0))
        var fadeIn = cc.fadeIn(0.2)
        var action1 = cc.spawn(moveBy, fadeIn)
        this.node.runAction(action1)
    },

    //横向滑动事件处理
    slideTouch(type, event){
        let touch = event.touch;
        if (type == cc.Node.EventType.TOUCH_START) {
            this.touchBeganBgPos = this.bgSprite.position
            var box = this.bgSprite.getBoundingBox()
            var pos = this.node.convertToNodeSpaceAR(touch.getStartLocation())
            if ((box.contains(pos) && this.slideState) || pos.y < box.yMin || pos.y > box.yMax){
                this.scheduleOnce(()=>{
                    this.bgSprite.stopAllActions()
                    var moveBy = cc.moveTo(0.1, cc.v2(this.bgStartPos.x, this.bgStartPos.y))
                    this.bgSprite.runAction(moveBy)
                    this.slideState = false
                },0.1)
            }
        }else if(type == cc.Node.EventType.TOUCH_MOVE) {
            this.infoNode.active = true
            this.delNode.active = true
            this.bgSprite.stopAllActions()
            this.bgSprite.x = this.touchBeganBgPos.x + touch.getLocation().x - touch.getStartLocation().x
        }else if(type == cc.Node.EventType.TOUCH_END || type == cc.Node.EventType.TOUCH_CANCEL) {
            let deltaMove = touch.getLocation().sub(touch.getStartLocation());
            this.slideState = false
            this.bgSprite.stopAllActions()
            if (touch.getLocation().x - touch.getStartLocation().x < 0) {
                if (deltaMove.mag() > 5) {
                    var moveBy = cc.moveTo(0.1, cc.v2(this.bgStartPos.x - 160, this.bgStartPos.y))
                    this.bgSprite.runAction(moveBy)
                    this.slideState = true
                }else{
                    var moveBy = cc.moveTo(0.1, cc.v2(this.bgStartPos.x, this.bgStartPos.y))
                    this.bgSprite.runAction(moveBy)
                }
            }else{
                var moveBy = cc.moveTo(0.1, cc.v2(this.bgStartPos.x, this.bgStartPos.y))
                this.bgSprite.runAction(moveBy)
            }
        }
    },

    //更新cell数据
    updateData( idx, data ){
        this.bgSprite.position = this.bgStartPos
        this.indexLab.string = data.idx
    },

    //删除item
    onDeleteCell(){
        this.coreTable.removeAtCell(this.node, true)   
    },

});
