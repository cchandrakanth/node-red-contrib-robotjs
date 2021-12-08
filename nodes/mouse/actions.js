const {robot, isValidJSON, handleException} = require("../common/utils")

const click = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            await robot.mouseClick()
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const rightClick = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            await robot.mouseClick("right", false)
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const doubleClick = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            await robot.mouseClick("left", true)
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const getPosition = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let position = await robot.getMousePos() 
            resolve(position)
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const move = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let pos = JSON.parse(node.param1)
            await robot.moveMouse(pos.x, pos.y) 
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const moveSmooth = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let pos = JSON.parse(node.param1)
            await robot.moveMouseSmooth(pos.x, pos.y) 
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const scroll = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let pos = JSON.parse(node.param1)
            await robot.scrollMouse(pos.x, pos.y) 
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const dragDrop = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let from = JSON.parse(node.param1)
            let to = JSON.parse(node.param2)
            await robot.moveMouse(from.x, from.y)
            await robot.mouseToggle("down","left")
            await robot.moveMouseSmooth(to.x, to.y)
            await robot.mouseToggle("up","left");
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

module.exports = {
    click,
    rightClick,
    doubleClick,
    getPosition,
    move,
    moveSmooth,
    scroll,
    dragDrop
}