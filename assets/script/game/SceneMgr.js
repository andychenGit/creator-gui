

var SceneMgr = cc.Class({
    properties: {
    },

	ctor : function(){
		this.m_curSceneUrl = ''
		this.m_curSceneType = undefined
	},

	init(){
	},

	setCurSceneType(curSceneType){
		this.m_curSceneType = curSceneType
	},
	
	getCurSceneType(){
        return this.m_curSceneType
	},
	

	loadScene( url, doneCallback, onProgress, params)
	{
		this.m_curSceneUrl = url
        cc.director.preloadScene(url, (completedCount, totalCount, item)=>{
			if(onProgress != undefined){
				onProgress(completedCount, totalCount, item)
			}
		}, (error, asset)=> {
			cc.director.loadScene(url, (event, scene)=>{
				if(doneCallback != undefined){
					doneCallback(scene, params)
				}
			})
		})
	},

})

 // 实例持有者
 var s_instance
 var _static = {   //另一个对象
    getInstance: function(options) {
        if(s_instance === undefined) {
            s_instance = new SceneMgr(options)
        }
        return s_instance
    }
 };
 module.exports = _static