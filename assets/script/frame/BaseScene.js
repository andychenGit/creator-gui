
var BaseNode = require("BaseNode")
var BaseScene = cc.Class({
    extends: BaseNode,   

    onLoad () { 
        this._super()
    },

    start () {

    },

    getSceneType(){
        return 0 //默认场景
    },

   
});

module.exports = BaseScene;


