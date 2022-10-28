import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-contact-icon',
  templateUrl: './contact-icon.component.html',
  styleUrls: ['./contact-icon.component.scss']
})
export class ContactIconComponent implements OnInit {

  @Input()
  contact!:Contact;
  constructor() { }

  ngOnInit(): void {
    
  }

}