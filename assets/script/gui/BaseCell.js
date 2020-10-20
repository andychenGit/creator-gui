//tableview cell的基类
var BaseCell = cc.Class({
    extends: cc.Component,
    properties: {
    },

    onLoad () {

    },

    handleUpdateData(coreTable, idx, data){
        this.coreTable = coreTable
        this.updateData(idx, data)
    },

    handleUpdateAnim(idx, data){
        this.node.scale = 0
        this.scheduleOnce(()=>{
            this.node.scale = 1
            this.updateAnim(idx, data)
        }, 0)
    },

    handleUpdateActive( isActive ){
        this.updateActive(isActive)
    },

    handleUpdateScale( scale ){
        this.updateScale(scale)
    },

    //----------------以下方法都是可以重写-------------------
    //更新cell动画显示,子类可以重新这个动画效果
    updateAnim(){
        this.node.opacity = 0
        var fadeIn = cc.fadeIn(0.1)
        this.node.runAction(fadeIn)
    },

    //这里只能用于更新界面的选中状态显示
    //比如说选中变红色，没有选中变正常颜色
    updateActive( isActive ){
        // log.d("handle Cell Click active state", isActive);
    },

    // PickerView 中cell的scale和节点里view中心缩放相关
    updateScale( scale ){
        // log.d("handle Cell updateScale scale", scale);
    },
    
    // handle cell 的点击事件
    handleCellClick(){
        // log.d("handle Cell Click");
    },

    //更新cell数据, cellData数据信息
    updateData( idx, cellData ){
        // log.d("################# please over write this function updateData()", idx, cellData)
    },

    //获取cell的size, cell重写这个将可以自定义每个cell的大小
    getCellSize(idx, cellData){
        return this.node.getContentSize()
    },

});

module.exports = BaseCell