import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { UsersService } from '../../../_core/_services/users.service';
import { UserModel } from '../../../_core/_models/user-model';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  users: UserModel[];
  userID = "";
  constructor(private alertify: AlertifyService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UsersService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    let parma ={
      userID : this.userID
    }
    this.userService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage,parma)
    .subscribe((res: PaginatedResult<UserModel[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, (error) => {
      this.alertify.error(error);
    });
  }
  deleteUser(userId: string) {
    this.alertify.confirm('Delete User!', 'Are you sure you want to delete this userID "' + userId + '" ?', () => {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadData();
        this.alertify.success('User has been deleted');
      }, error => {
        this.alertify.error('User is already in use, cannot delete User');
      });
    });
  }
  add() {
    this.userService.changeFlag('0');
    this.userService.changeUser({});
    this.router.navigate(['/admin/user/change']);
  }
  edit(user: UserModel) {
    delete user.roleName;
    delete user.department_Name;
    this.userService.changeFlag('1');
    this.userService.changeUser(user);
    this.router.navigate(['/admin/user/change']);
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  search(){
    this.loadData();
  }
}
