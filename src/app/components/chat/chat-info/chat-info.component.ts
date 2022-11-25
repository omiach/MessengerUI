import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { concatMap, of, Subscription, switchMap } from 'rxjs';
import { AddChatUserDTO } from 'src/app/models/AddChatUserDTO';
import { Chat } from 'src/app/models/Chat';
import { BackendService } from 'src/app/services/backend.service';
import { MessengerStateService } from 'src/app/services/messenger-state.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit,OnDestroy {
  
  @Input()
  chat:Chat|undefined;
  private _subscriptions: Subscription[] = [];

  constructor(private messengerState:MessengerStateService,
    private backendService:BackendService,
    private signalrService:SignalrService,
    private messengerStateService:MessengerStateService) { }

  ngOnInit(): void {
    this._subscriptions.push(
      this.messengerStateService.GetChatDataChangeEmitter().subscribe({
        next: (chat: Chat) => {
          if (chat.guid === this.chat?.guid) {
            this.chat = chat;
          }
        }
      }));
  }

  public AddMembers() {
    this.messengerState.SelectContacts().pipe(
      concatMap((contacts) => {
        if (contacts === undefined || contacts.length === 0){
          return of(false);
        }
        return this.backendService.post("PostChatUser",
          new AddChatUserDTO(this.chat?.guid ?? "", contacts.map(x => x.name)))
      }
      )
    ).subscribe({
      next: (result) => {
        if (result === true){
          this.signalrService.SendNewChat(this.chat?.guid ?? "");
        }
      }
    });
  }

  ngOnDestroy():void{
    this._subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
