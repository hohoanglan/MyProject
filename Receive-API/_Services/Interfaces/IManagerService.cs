using System.Collections.Generic;
using System.Threading.Tasks;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Interfaces
{
    public interface IManagerService
    {
        Task<PagedList<Receive>> GetWithPaginations(PaginationParams param);
        Task<ReceiveInformationModel> GetReceive(string receiveID);
        Task<ReceiveInformationModel> GetUserID(string userID);
        Task<bool> AcceptReceive(string receiveID);
        Task<bool> DecliceReceive(string receiveID);
        Task<bool> ImportExcel(string filePath, string user);
        Task<bool> EditReceive(List<Receive_Detail> data, string user);
        Task<PagedList<Receive>> SearchWithPaginations(PaginationParams param, ManagerParam filterParam);
         Task<List<Product>> GetProduct(string ProductID);
    }
}