
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
        for (let i = 0; i < 13; i++) {
            tempData.push({idx : i})
        }
        
        this.view.setData(tempData)
        this.view.reloadData()
        this.view.setClickCallBack((cell, data)=>{
            log.d("======click select idx=======",cell.getCellIdx())
        })

        var tempData = []
        for (let i = 0; i < 3; i++) {
            tempData.push({idx : i})
        }
        this.view2.setData(tempData)
        this.view2.reloadData()
        this.view2.setClickCallBack((cell, data)=>{
            log.d("======click select idx=======",cell.getCellIdx())
        })
        this.view2.setBreakTouchCallback((type, event)=>{
            let touch = event.touch;
            if (type == cc.Node.EventType.TOUCH_START) {
                var showCells = this.view2.getCells()
                for (const i in showCells) {
                    if (showCells[i] != null && showCells[i] != undefined) {
                        showCells[i].getComponent(Agui.BaseCell).slideTouch(type, event)
                    }
                }
            }else{ 
                var cell = this.view2.getCellAtTouchPos(touch.getStartLocation())
                cell.getComponent(Agui.BaseCell).slideTouch(type, event)
            }
        })
        this.view2.setUpdateCallBack((type)=>{
            this.scheduleOnce(()=>{
                var tempData = []
                for (let i = 0; i < 5; i++) {
                    tempData.push({idx : i})
                }
                this.view2.setUpdateFinish()
                this.view2.setData(tempData)
                this.view2.reloadData(true)
            }, 2)
        })
    },

});
