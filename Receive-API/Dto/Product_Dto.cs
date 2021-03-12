using System;
using Receive_API.Models;

namespace Receive_API.Dto
{
    public class Product_Dto
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public int? CatID { get; set; }
        public string CatName {get;set;}
        public string CatName_ZW {get;set;}
        public string Update_By {get;set;}
        public DateTime? Update_Time {get;set;}
        public Category category {get; set;}
    }
}