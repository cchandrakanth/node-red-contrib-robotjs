const robot = require('robotjs')

const isValidJSON = async (value) => {
    try{
        let val = JSON.parse(value)
        return true
    }
    catch(err){
        return false
    }
}

const clearStatus = (node) => {
    node.status({})
}

const successStatus = (node,message) => {
    node.status({fill:"green",shape:"dot",text:message});
}

const infoStatus = (node,message) => {
    node.status({fill:"blue",shape:"ring",text:message});
}

const warningStatus = (node,message) => {
    node.status({fill:"yellow",shape:"dot",text:message});
}

const errorStatus = (node,message) => {
    node.status({fill:"red",shape:"dot",text:message});
}

handleException = (errMsg,node,msg,stopFlow=true) => {
    if(stopFlow){
        console.log('Error - flow stopped: ', errMsg)
        node.status({fill:"red",shape:"ring", text: errMsg})
        node.error(errMsg, msg)
    }
    else{
        console.log('Error: ', errMsg)
        node.status({fill:"red",shape:"dot",text: errMsg})
    }
}

module.exports = {
    robot,
    isValidJSON,  
    clearStatus,
    successStatus,
    errorStatus,
    infoStatus,
    warningStatus,
    handleException
}