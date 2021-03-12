using System;

namespace Receive_API.Dto
{
    public class ReceiveInformationModel
    {
        public string ID { get; set; }
        // ---UserID và Name người xin ------
        public string UserID { get; set; }
        public string UserName { get; set; }

        // ---UserID và Name người chủ quản--- 
        public string Accept_ID { get; set; }
        public string AcceptName { get; set; }
        public string DepID { get; set; }
        public string DepName { get; set; }
        public string DepName_ZW { get; set; }
        public int CategoryID { get; set; }
        public DateTime? Register_Date { get; set; }
        public DateTime? Accept_Date { get; set; }
        public string Status { get; set; }
        public string Updated_By { get; set; }
        public DateTime? Updated_Time { get; set; }
    }
}