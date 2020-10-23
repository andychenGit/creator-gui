
//视图基类
//用于全屏界面层
var BaseNode = require("BaseNode")
var BaseView = cc.Class({
    extends: BaseNode,   
    properties: { 
    },

    ctor(){
        this.m_closeCallbacK = null; //关闭回调
    },

    onLoad(){
        this._super()
        this.blockInputEvents = this.getComponent(cc.BlockInputEvents)
        if (this.blockInputEvents == null) {
            this.blockInputEvents = this.addComponent(cc.BlockInputEvents)
            this.blockInputEvents.enabled = true;
        }
        // console.log("==========BaseView onLoad===========");  
    },

    start(){
        this._super()
        // console.log("==========BaseView start===========");
    },

    onDestroy(){
        // console.log("==========BaseView onDestroy===========");
        this._super()
        this.m_closeCallbacK && this.m_closeCallbacK()
    },

    //显示
    show(zorder, parent, needAnim, alpha, needBgColor){
        game.UIMgr.getInstance().open(this, zorder, parent, needAnim, alpha, needBgColor);
    },

    //关闭
    close(needAnim){
        game.UIMgr.getInstance().close(this, needAnim)
    },


    //设置关闭的回调
    setCloseCallbacK(closeCallbacK){
        this.m_closeCallbacK = closeCallbacK
    },

    //加载预制节点
    loadRes(resPath, doneCallback){
        cc.loader.loadRes(resPath, (err, prefab) =>{
            if (!err && doneCallback && this.node && cc.isValid(this.node, true)) {
                var node = cc.instantiate(prefab)
                doneCallback(node)
            } 
        })
    },

});

module.exports = BaseView;

