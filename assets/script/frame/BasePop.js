
//弹窗基类
//用于弹窗界面层
var BaseView = require("BaseView")
var BasePop = cc.Class({
    extends: BaseView,   
    properties: { 
    },

    ctor(){

    },

    onLoad(){
        this._super() 
        // console.log("==========BasePop onLoad===========");  
    },

    start(){
        this._super()
        // console.log("==========BasePop start===========");
    },

    //显示
    show(zorder, parent, needAnim, alpha, needBgColor){
        game.UIMgr.getInstance().open(this, zorder, parent, needAnim, alpha, needBgColor);
    },

    //关闭
    close(needAnim){
        game.UIMgr.getInstance().close(this, needAnim)
    },


});

module.exports = BasePop;

``