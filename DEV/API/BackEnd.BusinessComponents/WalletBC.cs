using BackEnd.BusinessEntities;
using BackEnd.DataAccessComponents;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.BusinessComponents
{
    public class WalletBC
    {    

        public static List<Wallet> GetByParam(Wallet pWallet)
        {

            List<Wallet> lWallet = new List<Wallet>();
            DataSet oDs = WalletTDG.GetByParam(pWallet);
            if (oDs != null)
            {
                if (oDs.Tables[0] != null)
                {
                    lWallet = oDs.Tables[0].ToList<Wallet>();
                    foreach (var item in lWallet)
                    {
                        if (Convert.ToDateTime(item.TranDate).Date < DateTime.Now.AddYears(-1).Date)
                        {
                            item.Old = true;
                        }
                        else {
                            item.Old = false;
                        }
                    }
                }
            }
            return lWallet;
        }

       

        public static void Insert(Wallet wallet)
        {
            WalletTDG.Insert(wallet);           
        }

        public static void Update(Wallet wallet)
        {
            WalletTDG.Update(wallet);
        }

      
    }
}
