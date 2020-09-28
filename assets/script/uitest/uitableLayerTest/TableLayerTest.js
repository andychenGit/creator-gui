
module.exports.show = function (closeCallbacK) {
    game.UIMgr.getInstance().loadRes("prefabs/TableLayerTest", (node)=>{
        var view = node.getComponent("TableLayerTest")
        view.setCloseCallbacK(closeCallbacK)
        view.show(null,null,false)
    })
};

cc.Class({
    extends: Aframe.BaseView,

    properties: {
        view : {default : null,type: Agui.TableView,},
        view2 : {default : null,type: Agui.TableView,},
    },

    start () {
        var tempData = []
        for (let i = 0; i < 20; i++) {
            tempData.push(i)
        }
        
        this.view.setData(tempData)
        this.view.reloadData()
        this.view.setClickCallBack((cell, data)=>{
            log.d("======click select idx=======",cell.getCellIdx())
        })


        this.view2.setData(tempData)
        this.view2.reloadData()
        this.view.setClickCallBack((cell, data)=>{
            log.d("======click select idx=======",cell.getCellIdx())
        })

    },

});
