import { MessageCreateComponent } from './../../messages/message-create/message-create.component';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/user';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  user: User;
  followText: string = "Follow";

  constructor(private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data.user;
    })
  }

  followUser(userId: number) {
    this.userService.followUser(this.authService.decodedToken.nameid, userId)
      .subscribe(result => {
        this.alertify.success(this.user.name + ' following!');
        this.followText = "Following"
      }, err => {
        this.alertify.error(err);
      })
  }

  openSendMessageModel() {
    const modalRef = this.modalService.open(MessageCreateComponent);
    modalRef.componentInstance.recipientId = this.user.id;
  }

}
