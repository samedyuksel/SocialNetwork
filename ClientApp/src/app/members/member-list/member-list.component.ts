import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  public loading = false;
  userParams: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.refreshStorage();
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getUsers(null, this.userParams).subscribe(users => {
      this.loading = false;
      this.users = users;
    }, err => {
      this.loading = false;
      this.alertify.error(err);
    })
  }

  setStorage(gender = "", minAge = "", maxAge = "", country = "", city = "") {

    if (gender != "")
      localStorage.setItem("gender", gender);

    if (minAge != "")
      localStorage.setItem("minAge", minAge.toString());

    if (maxAge != "")
      localStorage.setItem("maxAge", maxAge.toString());

    if (city != "")
      localStorage.setItem("city", city);
    if (country != "")
      localStorage.setItem("country", country);
  }

  removeStorage() {
    localStorage.removeItem("gender");
    localStorage.removeItem("minAge");
    localStorage.removeItem("maxAge");
    localStorage.removeItem("city");
    localStorage.removeItem("country");
  }

  order(order = "") {
    if (order != "")
      localStorage.setItem("order", order);
  }

  refreshStorage() {
    this.userParams.orderby = localStorage.getItem("order");
    this.userParams.gender = localStorage.getItem("gender");
    this.userParams.minAge = localStorage.getItem("minAge");
    this.userParams.maxAge = localStorage.getItem("maxAge");
    this.userParams.country = localStorage.getItem("country");
    this.userParams.city = localStorage.getItem("city");
    this.userParams.order = localStorage.getItem("order");
  }

}
