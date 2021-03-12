using System.Collections.Generic;
using System.Threading.Tasks;
using Receive_API.Dto;
using Receive_API.Helpers;
using Receive_API.Models;

namespace Receive_API._Services.Interfaces
{
    public interface IProductService
    {
        Task<PagedList<Product_Dto>> GetWithPaginations(PaginationParams param);
        Task<PagedList<Product_Dto>> Search(PaginationParams param, string filterParam);
        Task<bool> Delete(string id);
        Task<string> Add(Product model);
        Task<bool> Update(Product model);

        Task<PagedList<Product_Dto>> GetProducts(PaginationParams param);

        Task<Product> GetProduct(string id);
        Task<List<Category>> GetAllCategory();
    }
}