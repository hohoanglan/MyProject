import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../../_core/_services/history.service';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ReceiveInfomationModel } from '../../../_core/_models/receiveInfomation-model';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FunctionUtility } from '../../../_core/_utility/function-utility';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ReceiveDetailService } from '../../../_core/_services/receive-detail.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-history-main',
  templateUrl: './history-main.component.html',
  styleUrls: ['./history-main.component.scss']
})
export class HistoryMainComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  userID: '';
  time_start: string;
  time_end: string;
  bsConfig: Partial<BsDatepickerConfig>;
  historys: ReceiveInfomationModel[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  productID: string ='All';
  status:string ='All';
  style =false;
  public products: Array<Select2OptionData>;
  public statusList: Array<Select2OptionData>;
  optionsProduct = {
    allowClear: true,
    width: "100%"
  };
  optionsStatus = {
    allowClear: true,
    width: "100%"
  };
  constructor(private historyService: HistoryService,
    private alertify: AlertifyService,
    private translate: TranslateService,
    private receiveDetailService: ReceiveDetailService,
    private router: Router,
    private functionUtility: FunctionUtility) { }

  ngOnInit() {
    this.getAllStatus();
    this.getAllProduct();
    this.loadData();
    if(this.user.roleID === 1 || this.user.roleID === 2)
    {
      this.style = true;
    }
  }
  loadData() {
    this.historyService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
        this.historys = res.result;
        this.changeNameDepartment();
        this.pagination = res.pagination;
      }, (error) => {
        this.alertify.error(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  search() {
    let isSearch = true;
    let param;
    if (!(this.functionUtility.checkEmpty(this.time_start))) {
      if (this.functionUtility.checkEmpty(this.time_end)) {
        isSearch = false;
        this.alertify.error('Xin chọn ngày kết thúc');
      } else {
        let form_date = this.functionUtility.getDateFormat(new Date(this.time_start));
        let to_date = this.functionUtility.getDateFormat(new Date(this.time_end));
        param = {
          userID: this.userID,
          from_Date: form_date,
          to_Date: to_date,
          productID: this.productID=='All'?'':this.productID,
          status: this.status=='All'?'':this.status
        }
      }
    } else if (this.functionUtility.checkEmpty(this.time_start)) {
      if (!(this.functionUtility.checkEmpty(this.time_end))) {
        isSearch = false;
        this.alertify.error('Xin chọn ngày bắt đầu');
      } else {
        param = {
          userID: this.userID,
          from_Date: '',
          to_Date: '',
          productID: this.productID=='All'?'':this.productID,
          status: this.status=='All'?'':this.status
        }
      }
    }
    if (isSearch) {
      this.pagination.currentPage = 1;
      this.historyService.search(this.pagination.currentPage, this.pagination.itemsPerPage, param)
        .subscribe((res: PaginatedResult<ReceiveInfomationModel[]>) => {
          console.log(res);
          this.historys = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    }
  }
  changeNameDepartment() {
    if (this.translate.currentLang === 'zh') {
      this.historys = this.historys.map(obj => {
        obj.depNameShow = obj.depID + ' - ' + obj.depName_ZW;
        return obj;
      });
    } else if (this.translate.currentLang === undefined || this.translate.currentLang === 'vi') {
      
      if(this.historys.length >0) {
        this.historys = this.historys.map(obj => {
          obj.depNameShow = obj.depID + ' - ' + obj.depName;
          return obj;
        });
      }
    }
  }
  ngAfterContentChecked() {
    this.changeNameDepartment();
    this.getAllStatus();
  }

  detail(value) {
    this.receiveDetailService.changeBackUrl('history');
    this.receiveDetailService.changeReceiveID(value);
    this.router.navigate(['/receive/manager/detail']);
  }
  getAllProduct() {
      this.historyService.getAllProduct().subscribe(res => {
        this.products = res.map(obj => {
          return { id: obj.id.toString(), text: obj.id + "-" + obj.name  }
        });
        this.products.unshift({ id: "All", text: "All" });
      });
  }
  getAllStatus(){
    if (this.translate.currentLang === undefined || this.translate.currentLang === 'vi') {
      this.statusList = [{id: 'All', text: 'All'},
      {id: '0', text: 'Chờ duyệt'},
      {id: '1', text: 'Chưa lãnh'},
      {id: '2', text: 'Đã lãnh liệu'}]
    } else if (this.translate.currentLang === 'zh') {
      this.statusList = [{id: 'All', text: 'All'},
              {id: '0', text: '待審核'},
            {id: '1', text: '還沒發料'},
            {id: '2', text: '已發料'}]
    }
   
  }
  changeProduct(e: any): void {
    this.productID = e;
  }
  changeStatus(e: any): void {
    this.status = e;
  }
}
