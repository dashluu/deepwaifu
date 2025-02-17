export default class MessageModel {
    constructor(id, sender, receiver, text) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.text = text;
    }
}