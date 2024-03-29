import { Component, HostBinding, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { MessengerStateService } from 'src/app/services/messenger-state.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  public my: boolean = false;
  public openOptions: boolean = false;
  @Input() message!: Message;
  @HostBinding('style.flex-direction') messageFlexDirection: string = "row";

  constructor(
    //private _ngZone: NgZone,
    private _messengerState: MessengerStateService
  ) { }


  ngOnInit(): void {
    this.my = this.message.contactName == this._messengerState.GetUser()?.name;
    if (this.my) {
      this.messageFlexDirection = "row-reverse";
    }
  }

  StartForward() {
    this._messengerState.StartForward(this.message);
  }

  MessageOptions(event: Event) {
    event.preventDefault();
    this.openOptions = !this.openOptions;
  }

  StartEdit() {
    this._messengerState.StartUpdate(this.message);
  }

  StartComment() {
    this._messengerState.StartComment(this.message);
  }

  Delete() {
    this._messengerState.DeleteMessage(this.message);
  }

  DeleteForMe() {
    this._messengerState.DeleteMessageForMe(this.message);
  }
}
