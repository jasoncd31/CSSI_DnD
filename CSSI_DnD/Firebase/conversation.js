import { Auth } from 'auth';
import { app } from 'initializeApp';

const firebase = require("firebase");
const firestore = require("firebase/firestore");

export default class ConversationData {
  database = firestore.getFirestore(app);

  constructor(contact, messages = []) {
    this.contact = contact;
    this.messages = messages;
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

const conversationConverter = {
  toFirestore: (conversation) => {
    return {
      contact: conversation.contact,
      messages: conversation.messages,
      currentId: conversation.currentId
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Conversation(data.contact, data.messages);
  }
}