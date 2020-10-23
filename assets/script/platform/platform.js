let PlatformBase = require("PlatformBase")
let PlatformWx = require("PlatformWx")
let PlatformQQ = require("PlatformQQ")

 // 实例持有者
 var s_instance = undefined
 var _static = {   //另一个对象
    getInstance: function(options) {
        if(s_instance === undefined) {
            log.d('===cc.sys.platform===type:', cc.sys.platform, cc.sys.isMobile)
			if( cc.sys.platform == cc.sys.WECHAT_GAME ){
				s_instance = new PlatformWx()
			}else if( cc.sys.platform == cc.sys.QQ_PLAY ){
				s_instance = new PlatformQQ()
			}else if( cc.sys.platform == cc.sys.ANDROID){
				
			}else{
				s_instance = new PlatformBase()
			}
        }
        return s_instance
    }
 };

 window.platform = _static

