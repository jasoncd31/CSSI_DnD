import { Auth } from 'auth'

export default class Conversation {

  constructor(contact) {
    this.contact = contact;
    this.messages = [];
    this.currentId = 0;
  }

  addMessage(message, sentByUser) {
    this.messages.push(new Message(sentByUser, message, this.currentId));
    this.currentId += 1;
  }

  getMessages() {
    let messageString = '';

    this.messages.forEach(message => {
      messageString += `${message.getMessageString()}\n`;
    })

    return messageString;
  }

}

class Message {
  
  constructor(sentByUser, message, id) {
    this.sentByUser = sentByUser;
    this.message = message;
    this.id = id; // todo use for edit/delete methods if we end up doing that, otherwise delete
  }

  getMessageString() {
    return `${this.sentByUser ? Auth.displayName : this.contact}: ${this.message}`;
  }

  // todo edit method?

  // todo delete method?

}