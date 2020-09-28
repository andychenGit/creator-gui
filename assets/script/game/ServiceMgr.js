

var kServiceMap = {
    // PlayerService: {path:"PlayerService",  autoStart : true,},
}

//service管理器
var ServiceMgr = cc.Class({
    properties: {
        m_services : [],
    },


    init(){
        for (const key in kServiceMap) {
            this.getService(key)
        }
    },

    getService(name){
        if(this.m_services[name] === undefined){
            var config = kServiceMap[name]
            var clsService = require(config.path)
            var obj = new clsService()
            this.m_services[name] = obj
            if (config.autoStart) {
                obj.start()
            }
        }
        return this.m_services[name]
    },

    reset(){
        for (const key in kServiceMap) {
            object.stop()
        }
    },
})

 // 实例持有者
 var s_instance;
 var _static = {   //另一个对象
    getInstance: function(options) {
        if(s_instance === undefined) {
            s_instance = new ServiceMgr(options);
        }
        return s_instance;
    }
 };

 module.exports = _static;