import { ChatEvent } from "./ChatEvent";
import { Message } from "./Message";

export class NewMessageEvent{
    
    constructor(
        private _message:Message, 
        private _chatEvent:ChatEvent) {
            
    }

    public GetMessage():Message{
        return this._message;
    }

    public GetEvent():ChatEvent{
        return this._chatEvent;
    }
}