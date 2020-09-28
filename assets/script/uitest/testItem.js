

cc.Class({
    extends: Agui.BaseCell,
    properties: {
        titleLab : cc.Label,
    },

    onLoad () {
        this._super()
    },

    //更新cell数据
    updateData( idx, data ){
        this.titleLab.string = data.title
    },

    //获取cell的size  
    getCellSize(idx, cellData){
        var size = this.node.getContentSize()
        return cc.size(size.width, size.height)
    },
});
