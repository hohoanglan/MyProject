using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IReceiveRepository _repoReceive;
        private readonly IDepartmentRepository _repoDepartment;
        private readonly IProductRepository _repoProduct;
        private readonly IUserRepository _repoUser;
        private readonly IReceiveDetailRepository _repoReceiveDetail;

        public HistoryService(IReceiveRepository repoReceive,
                                IDepartmentRepository repoDepartment,
                                IProductRepository repoProduct,
                                IUserRepository repoUser,
                                IReceiveDetailRepository repoReceiveDetail)
        {
            _repoReceive = repoReceive;
            _repoDepartment = repoDepartment;
            _repoProduct = repoProduct;
            _repoUser = repoUser;
            _repoReceiveDetail = repoReceiveDetail;
        }

        public async Task<PagedList<ReceiveInformationModel>> GetWithPaginations(PaginationParams param, string user)
        {
            var receives = _repoReceive.FindAll(x => x.Status.Trim() != "-1");
            var products = _repoProduct.FindAll();
            var users = _repoUser.FindAll();
            var departments = _repoDepartment.FindAll();
            var userLogin = _repoUser.FindSingle(x => x.ID.Trim() == user.Trim());
            if (userLogin.RoleID == 0 || userLogin.RoleID == 1)
            {

            }
            else if (userLogin.RoleID == 2)
            {
                receives = receives.Where(x => x.DepID.Trim() == userLogin.DepID.Trim() &&
                                            x.Status.Trim() != "2");
            }
            else if (userLogin.RoleID == 3)
            {
                receives = receives.Where(x => x.UserID.Trim() == user);
            }
            var data = await (from a in receives
                              join c in departments on a.DepID.Trim() equals c.ID.Trim()
                              join d in users on a.UserID.Trim() equals d.ID.Trim()
                              select new ReceiveInformationModel()
                              {
                                  ID = a.ID,
                                  UserID = a.UserID,
                                  UserName = d.Name,
                                  Accept_ID = a.Accept_ID,
                                  DepID = a.DepID,
                                  DepName = c.Name_LL,
                                  DepName_ZW = c.Name_ZW,
                                  Register_Date = a.Register_Date,
                                  Accept_Date = a.Accept_Date,
                                  Updated_By = a.Updated_By,
                                  Status = a.Status.Trim(),
                                  Updated_Time = a.Updated_Time
                              }).OrderByDescending(x => x.Register_Date).ToListAsync();
            foreach (var item in data)
            {
                if (item.Accept_ID != null)
                {
                    var userAccept = _repoUser.FindSingle(x => x.ID.Trim() == item.Accept_ID.Trim());
                    if (userAccept != null)
                    {
                        item.AcceptName = userAccept.Name;
                    }
                }
            }
            return PagedList<ReceiveInformationModel>.Create(data, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<ReceiveInformationModel>> SearchWithPaginations(PaginationParams param, string userLogin, HistoryParam filterParam)
        {
            var receives = _repoReceive.FindAll(x => x.Status.Trim() != "-1");
            var products = _repoProduct.FindAll();
            var users = _repoUser.FindAll();
            var departments = _repoDepartment.FindAll();
            var userCurrent = _repoUser.FindSingle(x => x.ID.Trim() == userLogin.Trim());
            if (userCurrent.RoleID == 0 || userCurrent.RoleID == 1)
            {

            }
            else if (userCurrent.RoleID == 2)
            {
                receives = receives.Where(x => x.DepID.Trim() == userCurrent.DepID.Trim() &&
                                            x.Status.Trim() != "2");
            }
            else if (userCurrent.RoleID == 3)
            {
                receives = receives.Where(x => x.UserID.Trim() == userLogin);
            }

            if (filterParam.UserID != null && filterParam.UserID != string.Empty)
            {
                receives = receives.Where(x => x.UserID.Trim() == filterParam.UserID.Trim());
            }
            if (filterParam.From_Date != "" && filterParam.To_Date != "")
            {
                receives = receives.Where(x => x.Register_Date >= Convert.ToDateTime(filterParam.From_Date + " 00:00:00.000") &&
                x.Register_Date <= Convert.ToDateTime(filterParam.To_Date + " 23:59:59.997"));
            }
             if (filterParam.ProductID != null && filterParam.ProductID != string.Empty)
            {
               var receiveDetails =  _repoReceiveDetail.FindAll(x => x.ProductID.Trim() == filterParam.ProductID.Trim()).
               GroupBy(x=>x.ReceiveID).Select(x=>x.Key);
                receives = receives.Where(x => receiveDetails.Contains( x.ID.Trim()));
            }
             if (filterParam.Status != null && filterParam.Status != string.Empty)
            {
                receives = receives.Where(x => x.Status.Trim() == filterParam.Status.Trim());
            }
            var data = await (from a in receives
                              join c in departments on a.DepID.Trim() equals c.ID.Trim()
                              join d in users on a.UserID.Trim() equals d.ID.Trim()
                              select new ReceiveInformationModel()
                              {
                                  ID = a.ID,
                                  UserID = a.UserID,
                                  UserName = d.Name,
                                  Accept_ID = a.Accept_ID,
                                  DepID = a.DepID,
                                  DepName = c.Name_LL,
                                  DepName_ZW = c.Name_ZW,
                                  Register_Date = a.Register_Date,
                                  Accept_Date = a.Accept_Date,
                                  Updated_By = a.Updated_By,
                                  Status = a.Status.Trim(),
                                  Updated_Time = a.Updated_Time
                              }).OrderByDescending(x => x.Register_Date).ToListAsync();
            foreach (var item in data)
            {
                if (item.Accept_ID != null)
                {
                    var userAccept = users.Where(x => x.ID.Trim() == item.Accept_ID.Trim()).FirstOrDefault();
                    if (userAccept != null)
                    {
                        item.AcceptName = userAccept.Name;
                    }
                }
            }
            return PagedList<ReceiveInformationModel>.Create(data, param.PageNumber, param.PageSize);
        }
       public async Task<List<Product>> GetAllProduct()
        {
            var products = await _repoProduct.FindAll().ToListAsync();
            return products;
        }
    }
}