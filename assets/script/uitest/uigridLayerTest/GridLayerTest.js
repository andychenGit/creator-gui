
module.exports.show = function (closeCallbacK) {
    game.UIMgr.getInstance().loadRes("prefabs/GridLayerTest", (node)=>{
        var view = node.getComponent("GridLayerTest")
        view.setCloseCallbacK(closeCallbacK)
        view.show(null,null,false)
    })
};

cc.Class({
    extends: Aframe.BaseView,

    properties: {
        view : {default : null,type: Agui.GridView,},
        view1 : {default : null,type: Agui.GridView,},
    },

    start () {
        var tempData = []
        for (let i = 0; i < 100; i++) {
            tempData.push(i)
        }
        
        this.view.setData(tempData)
        this.view.reloadData()
        
        this.view1.setData(tempData)
        this.view1.reloadData()
    },

});
