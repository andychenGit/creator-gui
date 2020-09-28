

cc.Class({
    extends: Agui.BaseCell,
    properties: {
        bgSprite : cc.Sprite,
        indexLab : cc.Label,
    },

    // PickerView 中cell的scale和节点里view中心缩放相关
    updateScale( scale ){
        this.bgSprite.node.setScale(scale)
        this.bgSprite.node.opacity = scale * scale * 255
        this.indexLab.node.setScale(scale)
        this.indexLab.node.opacity = scale * scale * 255
    },

    //更新cell动画显示,子类可以重新这个动画效果
    updateAnim( idx, data ){
        this.node.opacity = 0
        this.node.y = this.node.y + 100
        var moveBy = cc.moveBy(0.2, cc.v2(0, -100))
        var fadeIn = cc.fadeIn(0.2)
        var action1 = cc.spawn(moveBy, fadeIn)
        this.node.runAction(action1)
    },


    //更新cell数据
    updateData( idx, cellData ){
        this.indexLab.string = idx
    },

    //获取cell的size  
    getCellSize(idx, cellData){
        var size = this.node.getContentSize()
        return cc.size(size.width, size.height)
    },
});
