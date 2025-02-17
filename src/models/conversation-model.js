export default class ConversationModel {
    constructor(character, user) {
        this.character = character;
        this.user = user;
        this.messages = [];
    }
}