const {
    color,
    size,
    screenshot,
    fullScreen
} = require('./actions');
const {clearStatus, successStatus, errorStatus} = require('../common/utils');

module.exports = function(RED) {
    function screenActions(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.on('input', async (msg) => {
            try{
                clearStatus(node)
                let action = config.action
                node.path = config.path || msg.path
                node.param1 = config.param1 || msg.param1
                node.param2 = config.param2 || msg.param2
                if(action === 'color') msg.payload = await color(node, msg)
                else if(action === 'size') msg.payload = await size(node, msg)
                else if(action === 'screenshot') await screenshot(node, msg)
                else if(action === 'fullScreen') await fullScreen(node, msg)
                successStatus(node, 'Done')
                node.send(msg)
            }
            catch(err){
                errorStatus(node, err.message)
            }
        });
    }
    RED.nodes.registerType("screen",screenActions);
}