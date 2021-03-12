import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { ManagerService } from '../../../_core/_services/manager.service';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Router } from '@angular/router';
import { ReceiveDetailService } from '../../../_core/_services/receive-detail.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HistoryService } from '../../../_core/_services/history.service';
import { FunctionUtility } from '../../../_core/_utility/function-utility';
import { Receive } from '../../../_core/_models/receive';
import { Observable } from 'rxjs';
import { ReceiveQuery } from '../../../_core/_stores/Receive/Receive.query';
import { ReceiveStore } from '../../../_core/_stores/Receive/Receive.store';

@Component({
  selector: 'app-management-main',
  templateUrl: './management-main.component.html',
  styleUrls: ['./management-main.component.scss']
})
export class ManagementMainComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isReceive$: Observable<Receive[]>;
  receiveID = '';
  userID = '';
  time: string;
  receives: Receive[];
  bsConfig: Partial<BsDatepickerConfig>;
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  constructor(private managerService: ManagerService,
    private router: Router,
    private receiveDetailService: ReceiveDetailService,
    private functionUtility: FunctionUtility,
    private alertify: AlertifyService,
    private receiveQuery: ReceiveQuery,
    private receiveStore: ReceiveStore) { }

  ngOnInit() {
    this.isLoading$ = this.receiveQuery.selectLoading();
    this.loadDataAll();
    this.isReceive$ = this.receiveQuery.selectAll();
  } 
  loadDataAll() {
    this.isLoading$ = this.receiveQuery.selectLoading();
    this.managerService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: Pagination) => {
        this.pagination = res;
      }, (error) => {
        this.alertify.error(error);
      });
     
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getData();
  }
  getData() {
    let param,from_Date;
    if (this.functionUtility.checkEmpty(this.time)) {
      from_Date = '';
    } else {
      from_Date = this.functionUtility.getDateFormat(new Date(this.time));
    }
    param = {
      receiveID: this.receiveID,
      userID: this.userID,
      from_Date: from_Date,
    }
    this.managerService.search(this.pagination.currentPage, this.pagination.itemsPerPage, param)
      .subscribe((res: PaginatedResult<Receive[]>) => {
        this.receives = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }
  search() {
    this.pagination.currentPage = 1;
    this.getData();
  }

  editReceive(receiveId: string) {
    this.router.navigate(['/admin/management/receive-edit', receiveId]);
  }
  acceptReceive(receiveID: string) {
    this.alertify.confirm('Duyệt đơn', 'Bạn có chắc chắn duyệt đơn không?', () => {
      this.managerService.acceptReceive(receiveID).subscribe(res => {
        if (res.result) {
          this.alertify.success('Duyệt đơn thành công!');
          this.loadDataAll();
        } else {
          this.alertify.error('Duyệt đơn không thành công')
        }
      });
    });
  }
  delineReceive(receiveID: string) {
    this.alertify.confirm('Hủy đơn', 'Bạn có chắc chắn muốn hủy đơn không?', () => {
      this.managerService.declineReceive(receiveID).subscribe(res => {
        if (res.result) {
          this.alertify.success('Hủy đơn thành công');
          this.loadDataAll();
        } else {
          this.alertify.error('Hủy đơn không thành công')
        }
      });
    });
  }
  clear() {
    this.receiveID = '';
    this.userID = '';
    this.time = '';
    this.loadDataAll();
  }

  detail(receiveId: string) {
    this.receiveDetailService.changeReceiveID(receiveId);
    this.receiveDetailService.changeBackUrl('management');
    this.router.navigate(['/receive/manager/detail']);
  }
}
