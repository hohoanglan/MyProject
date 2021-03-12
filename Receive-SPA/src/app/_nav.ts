import { INavData } from "@coreui/angular";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // <- ADD THIS
})
export class NavItem {
  navItems: INavData[] = [];
  constructor() {}
  getNav() {
    this.navItems = [];
    const user: any = JSON.parse(localStorage.getItem("user"));
    if (user.roleID === 1) {
      const navItem1 = {
        name: "Quản lý người dùng",
        url: "/admin/user",
        icon: "icon-people",
      };
      const navItem4 = {
        name: "Quản lý sản phẩm",
        url: "/product/manager",
        icon: "icon-wallet",
      };
      this.navItems.push(navItem4);
    } else if (user.roleID === 2) {
      const navItem1 = {
        name: "Xét duyệt",
        url: "/approval/manager",
        icon: "icon-people",
      };
      this.navItems.push(navItem1);
      const navItem2 = {
        name: "Lịch sử",
        url: "/history/main",
        icon: "icon-hourglass",
      };
      this.navItems.push(navItem2);
    } else if (user.roleID === 3) {

    } else if (user.roleID === 0) {
      const navItem1 = {
        name: "Quản lý người dùng",
        url: "/admin/user",
        icon: "icon-people",
      };
      this.navItems.push(navItem1);

      const navItem2 = {
        name: "Quản lý sản phẩm",
        url: "/product/manager",
        icon: "icon-wallet",
      };
      this.navItems.push(navItem2);

      const navItem3 = {
        name: "Xét duyệt lãnh",
        url: "/admin/management",
        icon: "cui-task",
      };
      this.navItems.push(navItem3);

      const navItem4 = {
        name: "Lịch sử",
        url: "/history/main",
        icon: "icon-hourglass",
      };
      this.navItems.push(navItem4);

      const navItem5 = {
        name: "Testakita",
        url: "/testakita/main",
        icon: "icon-hourglass",
      };
      this.navItems.push(navItem5);
    }
    return this.navItems;
  }
}
