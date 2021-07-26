using BackEnd.BusinessEntities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd.DataAccessComponents
{
    public class PriceEthereumUsTDG
    {
        public static DataSet GetAll()
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                return oDBConnect.GetAll("PriceEthereumUs");
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

        public static void Update(PriceEthereumUs oPriceEthereumUs)
        {
            DBConnect oDBConnect = new DBConnect();
            try
            {
                Dictionary<string, object> valores = new Dictionary<string, object>();               
                String pzwheres = oDBConnect.QueriUpdateWhere(valores, true);


                valores = new Dictionary<string, object>();
                valores.Add("ethusd", oPriceEthereumUs.ethusd);
                valores.Add("ethusd_datetime", oPriceEthereumUs.ethusd_datetime);

                string pzupdates = oDBConnect.QueriUpdateWhere(valores, false);


                oDBConnect.Update("PriceEthereumUs", pzupdates, pzwheres);
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
