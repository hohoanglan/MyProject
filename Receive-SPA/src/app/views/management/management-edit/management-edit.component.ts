import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Select2OptionData } from 'ng-select2';
import { ReceiveDetail } from '../../../_core/_models/receive-detail';
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { ManagerService } from "../../../_core/_services/manager.service";
import { ReceiveDetailService } from '../../../_core/_services/receive-detail.service';

@Component({
  selector: "app-management-edit",
  templateUrl: "./management-edit.component.html",
  styleUrls: ["./management-edit.component.scss"],
})
export class ManagementEditComponent implements OnInit {
  receiveId: string;
  receiveDetails: ReceiveDetail[] = [];
  public products: Array<Select2OptionData>;
  ListproductName:any;
  optionsProduct = { 
    allowClear: true, 
    width: "100%"
  };
  constructor(
    private managerService: ManagerService,
    private receiveDetailService: ReceiveDetailService,
    public translate: TranslateService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.receiveId = this.route.snapshot.params["receiveId"];
    if (this.receiveId !== null && this.receiveId !== undefined || this.receiveId !== '') {
      this.getData();
    }
  }
  getData() {
    this.receiveDetailService.getReceiveDetail(this.receiveId).subscribe(res => {
      this.receiveDetails = res;
      this.getAllProduct(res[0].productID);
    });
  }

  save() {
    this.managerService.editReceive(this.receiveDetails).subscribe((res) => {
      this.alertify.success("Edit success !!");
      this.router.navigate(["/admin/management"]);
    }, error => {
      this.alertify.error("Edit error !!!");
    });
  }
  cancel() {
    this.getData();
  }
  back() {
    this.router.navigate(["/admin/management"]);
  }
  getAllProduct(productID) {
    this.managerService.getProduct(productID).subscribe(res => {
      this.ListproductName = res.map(obj => {
        return { id: obj.id.toString(), text:obj.name  }
      });;
      this.products = res.map(obj => {
        return { id: obj.id.toString(), text: obj.id  }
      });
    });
}
  changeProduct(e: any,item): void {
    item.productID =e;
    this.ListproductName.filter(x=>x.id ==e).map(res=>{
      item.productName = res.text;
    });
  }
}
