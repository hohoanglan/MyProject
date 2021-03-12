using System.Collections.Generic;
using System.Threading.Tasks;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Interfaces
{
    public interface IReceiveService
    {
        Task<List<Warehouse>> GetAllWarehouse();
        Task<List<Category>> GetAllCategory(string id);
        Task<List<Product>> GetProductByCatID(int categoryID);
        Task<bool> ReceiveRegister(List<ReceiveDetailModel> data, string userId);
        Task<PagedList<Receive>> GetWithPaginations(PaginationParams param, string userID);
        Task<List<Receive_Detail>> GetAllReceiveDetail(string receiveId);
    }
}