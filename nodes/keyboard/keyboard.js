const {keyTap, typeString} = require("./actions");
const {clearStatus, successStatus, errorStatus} = require("../common/utils");

module.exports = function(RED) {
    function keyboard_actions(config) {
        RED.nodes.createNode(this,config)
        var node = this

        node.on('input', async (msg) => {
            try{
                clearStatus(node)
                let action = config.action
                node.param1 = config.param1 || msg.param1
                node.param2 = config.param2 || msg.param2
                if(action === 'tap') await keyTap(node, msg)
                else if(action === 'type') await typeString(node, msg)
                successStatus(node, 'Done')
                node.send(msg)
            }
            catch(err){
                errorStatus(node, err.message)
            }
        });
    }
    RED.nodes.registerType("keyboard",keyboard_actions);
}