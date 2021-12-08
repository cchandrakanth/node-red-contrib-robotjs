const {
    click,
    rightClick,
    doubleClick,
    getPosition,
    move,
    moveSmooth,
    scroll,
    dragDrop
} =  require('./actions');
const {clearStatus, successStatus, errorStatus} = require("../common/utils");

module.exports = function(RED) {
    function mouse_actions(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', async (msg) => {
            try{
                clearStatus(node)
                let action = config.action
                node.param1 = config.param1 || msg.param1
                node.param2 = config.param2 || msg.param2
                if(action === 'click') await click(node, msg)
                else if(action === 'rightClick') await rightClick(node, msg)
                else if(action === 'doubleClick') await doubleClick(node, msg)
                else if(action === 'getPosition') msg.payload = await getPosition(node, msg)
                else if(action === 'move') await move(node, msg)
                else if(action === 'moveSmooth') await moveSmooth(node, msg)
                else if(action === 'scroll') await scroll(node, msg)
                else if(action === 'dragDrop') await dragDrop(node, msg)
                successStatus(node, 'Done')
                node.send(msg)
            }
            catch(err){
                errorStatus(node, err.message)
            }
        });
    }
    RED.nodes.registerType("mouse",mouse_actions);
}