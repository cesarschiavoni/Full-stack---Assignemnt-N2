using BackEnd.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.DataAccessComponents
{
    public class WalletTDG
    {

        public static DataSet GetByParam(Wallet pWallet)
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                Dictionary<string, object> valores = new Dictionary<string, object>();
                if (pWallet.Id != null)
                {
                    valores.Add("Id", pWallet.Id);
                }
                if (pWallet.AccountBalanceEth != null)
                {
                    valores.Add("AccountBalanceEth", pWallet.AccountBalanceEth);
                }
                if (pWallet.Favorite != null)
                {
                    valores.Add("Favorite", pWallet.Favorite);
                }
                if (pWallet.Name != null)
                {
                    valores.Add("Name", pWallet.Name);
                }               
                if (pWallet.TranDate != null)
                {
                    valores.Add("TranDate", pWallet.TranDate);
                }
                if (pWallet.UserKey != null)
                {
                    valores.Add("UserKey", pWallet.UserKey);
                }     
                      

                string pzwheres = oDBConnect.QueriUpdateWhere(valores, true);

                return oDBConnect.GetByParam("Wallet", pzwheres);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDBConnect = null;
            }
        }

        public static void Insert(Wallet wallet)
        {

            DBConnect oDBConnect = new DBConnect();
            try
            {
                Dictionary<string, object> valores = new Dictionary<string, object>();
                valores.Add("Id", null);

                valores.Add("Name", wallet.Name);
                valores.Add("AccountBalanceEth", wallet.AccountBalanceEth);
                valores.Add("TranDate", wallet.TranDate);                     
                valores.Add("Favorite", wallet.Favorite);              
                valores.Add("UserKey", wallet.UserKey);                               

                string pzinsert = oDBConnect.QueriInsert(valores, true);
                wallet.Id = oDBConnect.Insert("Wallet", pzinsert);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDBConnect = null;
            }

        }

        public static void Update(Wallet wallet)
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                Dictionary<string, object> valores = new Dictionary<string, object>();
                valores.Add("Id", wallet.Id);
                String pzwheres = oDBConnect.QueriUpdateWhere(valores, true);

               
                valores = new Dictionary<string, object>();
                valores.Add("Name", wallet.Name);
                valores.Add("AccountBalanceEth", wallet.AccountBalanceEth);
                valores.Add("TranDate", wallet.TranDate);
                valores.Add("Favorite", wallet.Favorite);            
           

                string pzupdates = oDBConnect.QueriUpdateWhere(valores, false);


                oDBConnect.Update("Wallet", pzupdates, pzwheres);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                oDBConnect = null;
            }
        }
    }
}
