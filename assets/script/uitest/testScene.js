

var menuCfg = require("menuCfg")

cc.Class({
    extends: Aframe.BaseScene,
    properties: { 
        view : {default : null,type: Agui.TableView,},
    },

    onLoad() {
        this._super()
    },

    start(){
        var tempData = []
        for (const key in menuCfg) {
            tempData.push(menuCfg[key])
        }
        this.view.setData(tempData)
        this.view.reloadData()
        this.view.setClickCallBack((cell, data)=>{
            var clsView = require(data.jsname)
            if(clsView && clsView.show){
                clsView.show()
            }
        })
    },
   
});
