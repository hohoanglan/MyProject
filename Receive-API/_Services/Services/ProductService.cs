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
    public class ProductService : IProductService
    {   
        private readonly IProductRepository _repoProduct;
        private readonly ICategoryRepository _repoCategory;
        public ProductService(  IProductRepository repoProduct,
                                ICategoryRepository repoCategory) {
            _repoProduct = repoProduct;
            _repoCategory = repoCategory;
        }

        public async Task<string> Add(Product model)
        {
            var productFind =   _repoProduct.FindSingle(x => x.ID.Trim() == model.ID.Trim());
            if(productFind != null) {
                return "exist";
            } else {
                model.Update_Time = DateTime.Now;
                model.Status = "1";
                _repoProduct.Add(model);
                if(await _repoProduct.SaveAll()) {
                    return "ok";
                } else {
                    return "error";
                }
            }
        }

        public async Task<bool> Delete(string id)
        {
            var product =  _repoProduct.FindSingle(x => x.ID.Trim() == id.Trim());
            if(product != null) {
                _repoProduct.Remove(product);
                try {
                    return await _repoProduct.SaveAll();
                } catch(Exception) {
                    return false;
                }
            } else {
                return false;
            }
        }

        public async Task<List<Category>> GetAllCategory()
        {
            var categories = await _repoCategory.GetAll().ToListAsync();
            return categories;
        }

        public async Task<Product> GetProduct(string id)
        {
            var product = await _repoProduct.FindById(id);
            return product;
        }

        public async Task<PagedList<Product_Dto>> GetProducts(PaginationParams param)
        {
            var products =  _repoProduct.FindAll();
            var categorys =  _repoCategory.FindAll();
            var data =  (from a in products join b in categorys 
                    on a.CatID equals b.ID select new Product_Dto(){
                        ID = a.ID,
                        Name = a.Name,
                        category = b,
                        Update_By = a.Updated_By,
                        Update_Time = a.Update_Time
                    }).OrderByDescending(x => x.Update_Time);
            return await PagedList<Product_Dto>.CreateAsync(data, param.PageNumber, param.PageSize);;
        }


        public async Task<PagedList<Product_Dto>> GetWithPaginations(PaginationParams param)
        {
            var products =  _repoProduct.FindAll();
            var categorys =  _repoCategory.FindAll();
            var data = (from a in products join b in categorys 
                    on a.CatID equals b.ID select new Product_Dto(){
                        ID = a.ID,
                        Name = a.Name,
                        CatID = a.CatID,
                        category = b,
                        CatName = b.Name_LL,
                        CatName_ZW = b.Name_ZW,
                        Update_By = a.Updated_By,
                        Update_Time = a.Update_Time
                    }).OrderByDescending(x => x.Update_Time);
            return await PagedList<Product_Dto>.CreateAsync(data, param.PageNumber, param.PageSize);
        }

        public async Task<PagedList<Product_Dto>> Search(PaginationParams param, string filterParam)
        {
            var products =  _repoProduct.FindAll(x => x.ID.Trim().Contains(filterParam.Trim()));
            var categorys =  _repoCategory.FindAll();
            var data = products.Join(categorys, x => x.CatID, y => y.ID, (x , y) => new Product_Dto() {
                        ID = x.ID,
                        Name = x.Name,
                        CatID = x.CatID,
                        CatName = y.Name_LL,
                        CatName_ZW = y.Name_ZW,
                        category = y,
                        Update_By = x.Updated_By,
                        Update_Time = x.Update_Time
            }).OrderByDescending(x => x.Update_Time);
            return await PagedList<Product_Dto>.CreateAsync(data, param.PageNumber, param.PageSize);
        }

        public async Task<bool> Update(Product model)
        {
            var product =  _repoProduct.FindSingle(x => x.ID.Trim() == model.ID.Trim());
            if(product != null) {
                product.Name = model.Name;
                product.CatID = model.CatID;
                product.Status = "1";
                product.Update_Time = DateTime.Now;
                try {
                    return await _repoProduct.SaveAll();
                } catch(Exception) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}