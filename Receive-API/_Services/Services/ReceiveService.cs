using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Receive_API._Repositorys.Interfaces;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Services
{
    public class ReceiveService : IReceiveService
    {
        private readonly ICategoryRepository _repoCategory;
        private readonly IProductRepository _repoProduct;
        private readonly IReceiveDetailRepository _repoReceiveDetail;
        private readonly IReceiveRepository _repoReceive;
        private readonly IWarehouseRepository _repoWarehouse;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IUserService _serverUser;
        public ReceiveService(ICategoryRepository repoCategory,
                                IProductRepository repoProduct,
                                IReceiveRepository repoReceive,
                                IWarehouseRepository repoWarehouse,
                                IReceiveDetailRepository repoReceiveDetail,
                                IMapper mapper,
                                MapperConfiguration configMapper,
                                IUserService serverUser)
        {
            _repoCategory = repoCategory;
            _repoProduct = repoProduct;
            _repoReceive = repoReceive;
            _repoWarehouse = repoWarehouse;
            _mapper = mapper;
            _configMapper = configMapper;
            _serverUser = serverUser;
            _repoReceiveDetail = repoReceiveDetail;
        }

        public async Task<List<Warehouse>> GetAllWarehouse()
        {
            var warehouses = await _repoWarehouse.GetAll().ToListAsync();
            return warehouses;
        }

        public async Task<List<Category>> GetAllCategory(string id)
        {
            var categorys = await _repoCategory.FindAll(x => x.WarehouseID.ToString() == id.Trim()).ToListAsync();
            return categorys;
        }

        public async Task<List<Product>> GetProductByCatID(int categoryID)
        {
            var products = await _repoProduct.FindAll(x => x.CatID == categoryID).ToListAsync();
            return products;
        }

        public async Task<bool> ReceiveRegister(List<ReceiveDetailModel> data, string userId)
        {
            // Thêm vào bảng Receive
            var receiveID = CodeUtility.RandomString();
            var receiveModel = new Receive_Dto();
            receiveModel.ID = receiveID;
            receiveModel.UserID = userId;
            receiveModel.Register_Date = DateTime.Now;
            receiveModel.Updated_Time = DateTime.Now;
            receiveModel.Status = "0";
            var user = await _serverUser.GetUserById(userId);
            receiveModel.DepID = user.DepID;
            var receive = _mapper.Map<Receive>(receiveModel);
            _repoReceive.Add(receive);

            // Thêm vào bảng Receive Detail
            foreach (var item in data)
            {
                var receiveDetail = new Receive_Detail();
                receiveDetail.ReceiveID = receive.ID;
                receiveDetail.ProductID = item.ProductID;
                receiveDetail.ProductName = item.ProductName;
                receiveDetail.Qty = item.Qty;
                receiveDetail.Update_Time = DateTime.Now;
                _repoReceiveDetail.Add(receiveDetail);
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

        public async Task<PagedList<Receive>> GetWithPaginations(PaginationParams param, string userID)
        {
            var receives = _repoReceive.FindAll(x => x.UserID.Trim() == userID && x.Status != "-1"
                                               && x.Status != "2").OrderByDescending(x=>x.Updated_Time);
            return await PagedList<Receive>.CreateAsync(receives, param.PageNumber, param.PageSize);
        }

        public async Task<List<Receive_Detail>> GetAllReceiveDetail(string receiveId)
        {
            var receiveDetails = await _repoReceiveDetail.FindAll(x => x.ReceiveID.Trim() == receiveId.Trim()).ToListAsync();
            return receiveDetails;
        }
    }
}