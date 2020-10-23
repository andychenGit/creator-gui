
let Config = {}

Config.CC_SHOW_FPS = true  // 是否显示FPS
Config.CC_SHOW_LOG = true  // 是否显示LOG

let ENV = {
    INNER_TEST  : 1,    // 内侧环境
    OUT_TEST    : 2,    // 外侧环境
    RELEASE     : 3,    // 正式环境
}

const CUR_RUN = ENV.INNER_TEST;  //运行环境

Config.getCurEnv = () => {
    return CUR_RUN;
}

Config.isInnerTest = () => {
    return CUR_RUN === ENV.INNER_TEST;
}

Config.isOutTest = () => {
    return CUR_RUN == ENV.OUT_TEST;
}

Config.isRelease = () => {
    return CUR_RUN === ENV.RELEASE;
}


window.Config = Config

