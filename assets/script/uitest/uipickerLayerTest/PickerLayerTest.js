
module.exports.show = function (closeCallbacK) {
    game.UIMgr.getInstance().loadRes("prefabs/PickerLayerTest", (node)=>{
        var view = node.getComponent("PickerLayerTest")
        view.setCloseCallbacK(closeCallbacK)
        view.show(null,null,false)
    })
};

cc.Class({
    extends: Aframe.BaseView,

    properties: {
        view : {default : null,type: Agui.PickerView,},
        view2 : {default : null,type: Agui.PickerView,},
        desc : {default : null,type: cc.Label,},
    },

    start () {
        var tempData = []
        for (let i = 0; i < 12; i++) {
            tempData.push(i)
        }
        
        this.view.setData(tempData)
        this.view.reloadData()
        
        this.view2.setData(tempData)
        this.view2.reloadData()
        this.view2.gotoIndexPage(5)
    },

    onBtnLeftPage(){
        this.view.gotoPrePage()
    },

    onBtnRightPage(){
        this.view.gotoNextPage()
    },

    onUpdatePageIndex(){
        var index = this.view.getCurrentIndex()
        this.desc.string = "Index of then middle is: " + index
    },

});
