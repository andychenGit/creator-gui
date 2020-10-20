

cc.Class({
    extends: Agui.BaseCell,
    properties: {
        bgSprite : cc.Sprite,
        indexLab : cc.Label,
    },

    onLoad(){
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

    //更新cell数据
    updateData( idx, data ){
        this.indexLab.string = data.idx
    },

});
