using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ManagerService : IManagerService
    {
        private readonly IReceiveRepository _repoReceive;
        private readonly IProductRepository _repoProduct;
        private readonly IDepartmentRepository _repoDepartment;
        private readonly ICategoryRepository _repoCategory;
        private readonly IReceiveDetailRepository _repoReceiveDetail;

        public ManagerService(IReceiveRepository repoReceive,
                                IProductRepository repoProduct,
                                IDepartmentRepository repoDepartment,
                                ICategoryRepository repoCategory,
                                IReceiveDetailRepository repoReceiveDetail)
        {
            _repoReceive = repoReceive;
            _repoProduct = repoProduct;
            _repoDepartment = repoDepartment;
            _repoCategory = repoCategory;
            _repoReceiveDetail = repoReceiveDetail;
        }

        public async Task<bool> AcceptReceive(string receiveID)
        {
            var receiveModel = _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            if (receiveModel != null)
            {
                receiveModel.Status = "2";
                receiveModel.Updated_Time = DateTime.Now;
                try
                {
                    return await _repoReceive.SaveAll();
                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DecliceReceive(string receiveID)
        {
            var receive = _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim());
            var receiveDetail = await _repoReceiveDetail.FindAll(x => x.ReceiveID.Trim() == receiveID.Trim()).ToListAsync();
            if (receive != null)
            {
                _repoReceive.Remove(receive);
                _repoReceiveDetail.RemoveMultiple(receiveDetail);
                try
                {
                    return await _repoReceive.SaveAll();
                }
                catch (Exception)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public async Task<ReceiveInformationModel> GetReceive(string receiveID)
        {
            var receiveModel = _repoReceive.FindSingle(x => x.ID.Trim() == receiveID.Trim() && x.Status.Trim() == "1");
            if (receiveModel == null)
            {
                return null;
            }
            else
            {
                var department = await _repoDepartment.FindAll(x => x.ID.Trim() == receiveModel.DepID.Trim()).FirstOrDefaultAsync();
                var receiveResult = new ReceiveInformationModel();
                receiveResult.ID = receiveModel.ID;
                receiveResult.UserID = receiveModel.UserID;
                receiveResult.Accept_ID = receiveModel.Accept_ID;
                receiveResult.DepID = receiveModel.DepID;
                receiveResult.DepName = department.Name_LL;
                receiveResult.Register_Date = receiveModel.Register_Date;
                receiveResult.Accept_Date = receiveModel.Accept_Date;
                return receiveResult;
            }
        }

        public async Task<PagedList<Receive>> GetWithPaginations(PaginationParams param)
        {
            var receives = _repoReceive.FindAll(x => x.Status == "1");
            receives = receives.OrderByDescending(x => x.Register_Date);
            return await PagedList<Receive>.CreateAsync(receives, param.PageNumber, param.PageSize);
        }

        public async Task<bool> ImportExcel(string filePath, string user)
        {

            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                for (int i = workSheet.Dimension.Start.Row + 1; i <= workSheet.Dimension.End.Row; i++)
                {
                    var id = workSheet.Cells[i, 1].Value.ToString();
                    if (!(await this.CheckDept(id)))
                    {
                        Department department = new Department();
                        department.Status = "1";
                        department.Updated_Time = DateTime.Now;
                        department.Updated_By = user;
                        department.ID = workSheet.Cells[i, 1].Value.ToString();
                        department.Name_ZW = workSheet.Cells[i, 2].Value == null ? "" : workSheet.Cells[i, 2].Value.ToString();
                        department.Name_LL = workSheet.Cells[i, 3].Value == null ? "" : workSheet.Cells[i, 3].Value.ToString();
                        department.Name_EN = workSheet.Cells[i, 4].Value == null ? "" : workSheet.Cells[i, 4].Value.ToString();
                        _repoDepartment.Add(department);
                    }
                }
                try
                {
                    return await _repoDepartment.SaveAll();
                }
                catch (System.Exception)
                {
                    return false;
                    throw;
                }
            }
        }
        public async Task<bool> CheckDept(string id)
        {
            var dept = await _repoDepartment.GetAll().Where(x => x.ID.Trim() == id.Trim()).FirstOrDefaultAsync();
            if (dept != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<bool> EditReceive(List<Receive_Detail> data, string user)
        {
            // Lay update_by tu List<Receive_Detail> dua ve Receive_Detail
            foreach (var item in data)
            {
                var receiveDetail = new Receive_Detail();
                receiveDetail.ID = item.ID;
                receiveDetail.ReceiveID = item.ReceiveID;
                receiveDetail.ProductID = item.ProductID;
                receiveDetail.ProductName = item.ProductName;
                receiveDetail.Qty = item.Qty;
                receiveDetail.Update_By = user;
                receiveDetail.Update_Time = DateTime.Now;
                _repoReceiveDetail.Update(receiveDetail);
            }
            try
            {
                return await _repoReceiveDetail.SaveAll();
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }

        public async Task<ReceiveInformationModel> GetUserID(string userID)
        {
            var receiveModel = _repoReceive.FindSingle(x => x.UserID.Trim() == userID.Trim() && x.Status.Trim() == "1");
            if (receiveModel == null)
            {
                return null;
            }
            else
            {
                var department = await _repoDepartment.FindAll(x => x.ID.Trim() == receiveModel.DepID.Trim()).FirstOrDefaultAsync();
                var receiveResult = new ReceiveInformationModel();
                receiveResult.ID = receiveModel.ID;
                receiveResult.UserID = receiveModel.UserID;
                receiveResult.Accept_ID = receiveModel.Accept_ID;
                receiveResult.DepID = receiveModel.DepID;
                receiveResult.DepName = department.Name_LL;
                receiveResult.Register_Date = receiveModel.Register_Date;
                receiveResult.Accept_Date = receiveModel.Accept_Date;
                return receiveResult;
            }
        }

        public async Task<PagedList<Receive>> SearchWithPaginations(PaginationParams param, ManagerParam filterParam)
        {
            var receives = _repoReceive.FindAll(x => x.Status.Trim() == "1");
            var departments = _repoDepartment.FindAll();
            if (!String.IsNullOrEmpty(filterParam.from_Date))
            {
                receives = receives.Where(x => x.Register_Date >= Convert.ToDateTime(filterParam.from_Date +
                 " 00:00:00") &&
                x.Register_Date <= Convert.ToDateTime(filterParam.from_Date + " 23:59:59.997"));
            }
            if (!String.IsNullOrEmpty(filterParam.receiveID))
            {
                receives = receives.Where(x => x.ID.Trim() == filterParam.receiveID.Trim());
            }
            if (!String.IsNullOrEmpty(filterParam.userID))
            {
                receives = receives.Where(x => x.UserID.Trim() == filterParam.userID.Trim());
            }
            receives = receives.OrderByDescending(x => x.Register_Date);
            return await PagedList<Receive>.CreateAsync(receives, param.PageNumber, param.PageSize);
        }
    
            public async Task<List<Product>> GetProduct(string ProductID)
        {
            var product =  _repoProduct.FindAll(x=>x.ID.Trim() == ProductID.Trim()).FirstOrDefault().CatID;

            var Warehouse = _repoCategory.FindAll(x=>x.ID == product).FirstOrDefault().WarehouseID;
            var categorys = _repoCategory.FindAll(x=>x.WarehouseID == Warehouse).Select(x=>x.ID).ToList();
             var products = await _repoProduct.FindAll(x=>categorys.Contains((int)x.CatID)).ToListAsync();
            return products;
        }
    }
}