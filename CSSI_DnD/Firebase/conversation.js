import { Auth } from 'auth';
import { app } from 'initializeApp';

const firebase = require("firebase");
const firestore = require("firebase/firestore");

export default class Conversation {
  database = firestore.getFirestore(app);

  constructor(contact, messages = [], id = 0) {
    this.contact = contact;
    this.messages = messages;
    this.currentId = id;
    
    const conversation = firestore.doc(database, 'conversations', `${Auth.displayName}-${this.contact}`)
      .withConverter(conversationConverter);
    await setDoc(conversation, new Conversation(this.contact, this.messages, this.currentId));
  }

  // document ID is saved as `${current user's display name}-${contact's display name}`
  addMessage(message, sentByUser) {
    this.messages.push(new Message(sentByUser, message, this.currentId));
    this.currentId += 1;

    // todo update message array with arrayUnion()
  }

  getMessages() {
    let messageString = '';

    this.messages.forEach(message => {
      messageString += `${message.getMessageString()}\n`;
    })

    return messageString;
  }

}

class Message { // todo turn this into an interface - see https://stackoverflow.com/questions/46578701/firestore-add-custom-object-to-db
  
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
    return new Conversation(data.contact, data.messages, data.currentId);
  }
}

// todo does this need a messageConverter function