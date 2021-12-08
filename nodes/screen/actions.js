const {robot, isValidJSON, handleException} = require("../common/utils")
const Jimp = require('jimp');
const fs = require('fs');

const color = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let pos = JSON.parse(node.param1)
            let color = await robot.getPixelColor(pos.x, pos.y)
            resolve(color)
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const size = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let size = await robot.getScreenSize()
            resolve(size)
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const screenshot = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let from = JSON.parse(node.param1)
            let to = JSON.parse(node.param2)
            let image = await robot.screen.capture(from.x,from.y,to.x, to.y)
            for(let i=0; i < image.image.length; i++){
                if(i%4 == 0){
                    [image.image[i], image.image[i+2]] = [image.image[i+2], image.image[i]]
                }
            }
            var jimg = new Jimp(image.width, image.height)
            jimg.bitmap.data = image.image
            await jimg.getBuffer(Jimp.MIME_PNG, async (err, result)=>{
                await fs.writeFileSync(node.path, result)  
            })
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

const fullScreen = async (node, msg) => {
    return new Promise( async (resolve, reject) => {
        try{
            let size = await robot.getScreenSize()
            let image = await robot.screen.capture(0,0,size.width, size.height)
            for(let i=0; i < image.image.length; i++){
                if(i%4 == 0){
                    [image.image[i], image.image[i+2]] = [image.image[i+2], image.image[i]]
                }
            }
            var jimg = new Jimp(image.width, image.height)
            jimg.bitmap.data = image.image
            await jimg.getBuffer(Jimp.MIME_PNG, async (err, result)=>{
                await fs.writeFileSync(node.path, result)  
            })
            resolve()
        }
        catch(err){
            handleException(err.message, node, msg)
            reject(err)
        }
    })
}

module.exports = {
    color,
    size,
    screenshot,
    fullScreen
}