export class Message{
    date:Date = new Date();
    guid:string = "";
    chatGuid:string = "";
    contactName:string = "";
    commentedMessage?:Message;
    text:string = "";
}