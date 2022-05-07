const {messageList} = require("./messageList");
const {home} = require("../config.json");

const processMessage = (message) => {
    for(let i = 0; i < messageList.length; i += 1) {
        const match = messageList[i][1].exec(message.toString());
        if(match !== null) return {
            message: messageList[i][0],
            value: match.groups.value.replace("home", home),
        }
    }
}

module.exports = processMessage;