module.exports = {
    messageList: [
        ["color", /change (colour|color) to (?<value>.*)/],
        ["emoji", /(show|get) me (a|an) (?<value>.*) (emoji|face)/],
        ["weather", /(show|get) me the weather for (?<value>.*)/],
        ["picture", /(show|get) me (a picture|pictures) of (?<value>.*)/],
        ["map", /(get|show) me a map of (?<value>.*)/],
    ]
};