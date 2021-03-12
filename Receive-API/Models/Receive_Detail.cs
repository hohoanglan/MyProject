using System;
using System.ComponentModel.DataAnnotations;

namespace Receive_API.Models
{
    public class Receive_Detail
    {
        public int ID { get; set; }
        public string ReceiveID { get; set; }
        public string ProductID { get; set; }
        public string ProductName { get; set; }
        public int? Qty { get; set; }
        public string Update_By { get; set; }
        public DateTime? Update_Time { get; set; }
    }
}