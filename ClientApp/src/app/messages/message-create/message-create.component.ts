import { Conversation } from './../../_models/conversation';
import { User } from './../../_models/user';
import { AlertifyService } from './../../_services/alertify.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent implements OnInit {

  @Input() recipientId: number;
  message: any = {};
  user: User;
  sent: Conversation[] = [];
  receive: Conversation[] = [];
  conversation: Conversation[] = [];

  constructor(private activeModal: NgbActiveModal,
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.recipientId)
    this.getMessage();
    this.conversation = this.sent.concat(this.receive);
    console.log(this.conversation)
  }

  closeModal() {
    this.activeModal.close();
  }

  sendMessage() {
    this.message.recipientId = this.recipientId;

    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.message)
      .subscribe(result => {
        console.log(result);
        this.alertify.success("Message has been sent.");
        this.getMessage();
        // this.router.navigate(['/messages']);
        // this.closeModal();
      }, err => {
        this.alertify.error(err);
      });

  }

  getMessage() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.recipientId).subscribe(result => {
      this.sent = result;
    }, err => {
      this.alertify.error(err);
    })

    this.userService.getMessages(this.recipientId, this.authService.decodedToken.nameid).subscribe(result => {
      this.receive = result;
    }, err => {
      this.alertify.error(err);
    })


    this.conversation.sort((a, b) => Number(b.dateAdded) - Number(a.dateAdded))
  }

}
