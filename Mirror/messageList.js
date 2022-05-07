module.exports = {
    messageList: [
        ["color", /change (colour|color) to (?<value>.*)/],
        ["emoji", /show me (a|an) (?<value>.*) (emoji|face)/],
        ["weather", /show me the weather for (?<value>.*)/],
        ["picture", /show me a picture of (?<value>.*)/],
        ["map", /show me a map of (?<value>.*)/],
    ]
};