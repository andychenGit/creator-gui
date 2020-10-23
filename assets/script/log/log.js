/**
 * trace
 * @param [int] [count=10]
 */
function trace () 
{
    if (Config.CC_SHOW_LOG){
        console.trace.apply(null,arguments)
    }
}

function info()
{
    if (Config.CC_SHOW_LOG){
        console.info.apply(null,arguments)
    }
}

function debug()
{
    if (Config.CC_SHOW_LOG){
        console.log.apply(null,arguments)  
    }
}

function warn()
{
    if (Config.CC_SHOW_LOG){
        console.warn("################### warn begin ###################")
        console.warn.apply(null,arguments)
        console.warn("################### warn end ###################")
    }
}

function error()
{
    console.error("################### error begin ###################")
    console.error(arguments)
    console.error("################### error end ###################")
}

function tryError( err )
{
    console.error("################### tryError begin ###################")
    console.error(err, err.stack)
    console.error("################### tryError end ###################")
}

var log = {
    i : info,
    d : debug,
    w : warn,
    e : error,
    trace : trace,
    tryError : tryError,
}

window.log = log