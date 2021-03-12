import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../_core/_services/users.service';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.scss']
})
export class UserChangeComponent implements OnInit {
  userCurrent: any = {};
  user: any = {};
  flag: string;
  rePassword: string;
  isCheckPass: boolean;
  disable: false;
  public roles: Array<Select2OptionData>;
  public departments: Array<Select2OptionData>;
  optionsRole = {
    allowClear: true,
    width: "100%"
  };
  optionsDepartment = {
    allowClear: true,
    width: "100%"
  }
  constructor(  private router: Router,
                private alertify: AlertifyService,
                private userService: UsersService,
                public translate: TranslateService,
                ) { }
  
  ngOnInit() {
    this.userService.currentFlag.subscribe(flag => this.flag = flag);
    this.userService.currentUser.subscribe(user => this.user = JSON.parse(JSON.stringify(user)));
    this.getAllRole();
    this.getAllDepartment();
    if(this.flag === '1') {
      this.isCheckPass = true;
    }
  }
  getAllRole() {
    this.userService.getListRole().subscribe(res => {
      this.roles = res.map(item => {
        return {id: item.id.toString(), text: item.name};
      });
    })
  }
  getAllDepartment() {
    this.userService.getListDepartment().subscribe(res => {
      this.departments = res.map(item => {
        return {id: item.id.toString(), text: item.id.toString() + ' - ' + item.name_LL}
      });
    });
  }
  changedRole(e: any): void {
    this.user.roleID = e;
  }
  changedDepartment(e: any): void {
    this.user.depID = e;
  }
  checkRePass() {
    if(this.user.password === this.rePassword) {
      this.isCheckPass = true;
    } else {
      this.isCheckPass = false;
    }
  }
  checkExistUser() {
    this.userService.checkExistUser(this.user.id).subscribe(res => {
      if(res.result) {
        this.alertify.error('This userId already exists!');
      }
    })
  }
  save() {
    this.user.roleID = parseInt(this.user.roleID);
    if(this.flag === '0') {
      this.userService.addUser(this.user).subscribe(res => {
        if(res.result) {
          this.alertify.success('Add new user succesed!');
          this.router.navigate(['/admin/user']);
        } else {
          this.alertify.error('An error occurred!!!');
        }
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.userService.editUser(this.user).subscribe(res => {
        if(res.result) {
          this.alertify.success('Update user succesed!');
          this.router.navigate(['/admin/user']);
        } else {
          this.alertify.error('An error occurred!!!');
        }
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  saveAndNext() {
    this.user.roleID = parseInt(this.user.roleID);
    this.userService.addUser(this.user).subscribe(res => {
      if(res.result) {
        this.alertify.success('Add new user succesed!');
      } else {
        this.alertify.error('An error occurred!!!');
      }
    }, error => {
      this.alertify.error(error);
    });
  }
  cancel() {
    if(this.flag === '0') {
      this.rePassword = '';
      this.user = {};
    } else {
      this.userService.currentUser.subscribe(user => this.user = JSON.parse(JSON.stringify(user)));
    }
  }
  back() {
    this.router.navigate(['/admin/user']);
  }
  ngAfterViewChecked() {
    if(this.translate.currentLang === undefined || this.translate.currentLang === 'vi') {
      this.userService.getListDepartment().subscribe(res => {
        this.departments = res.map(item => {
          return {id: item.id.toString(), text: item.id.toString() + ' - ' + item.name_LL}
        });
      });
    } else if(this.translate.currentLang === 'zh') {
      this.userService.getListDepartment().subscribe(res => {
        this.departments = res.map(item => {
          return {id: item.id.toString(), text: item.id.toString() + ' - ' + item.name_ZW}
        });
      });
    }
  }
}
