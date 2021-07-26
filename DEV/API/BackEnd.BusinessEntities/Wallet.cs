using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.BusinessEntities
{
    public class Wallet
    {
        public int? Id { set; get; }
        public string Name { set; get; }
        public decimal? AccountBalanceEth { set; get; }
        public DateTime? TranDate { set; get; }   
        public bool? Favorite { set; get; }
        public bool? Old { set; get; }
        public string UserKey { get; set; }
    }
}
