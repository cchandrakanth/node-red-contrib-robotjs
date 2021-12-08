const {robot, isValidJSON, handleException} = require("../common/utils")

const keyTap = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let checkJSON = await isValidJSON(node.param2 || "")
            node.param2? checkJSON ? await robot.keyTap(node.param1, JSON.parse(node.param2) ): await robot.keyTap(node.param1, node.param2): await robot.keyTap(node.param1)
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const typeString = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            node.param2? await robot.typeStringDelayed(node.param1, parseInt(node.param2) ): await robot.typeString(node.param1)
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

module.exports = {
    keyTap,
    typeString,
}