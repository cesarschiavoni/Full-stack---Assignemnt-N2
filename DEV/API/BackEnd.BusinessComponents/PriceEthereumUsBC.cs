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
    public class PriceEthereumUsBC
    {
        public static PriceEthereumUs GetLastPrice()
        {
            PriceEthereumUs oPriceEthereumUs = null;
            List<PriceEthereumUs> lPriceEthereumUs = new List<PriceEthereumUs>();
            DataSet oDs = PriceEthereumUsTDG.GetAll();
            if (oDs != null)
            {
                if (oDs.Tables[0] != null)
                {
                    lPriceEthereumUs = oDs.Tables[0].ToList<PriceEthereumUs>();
                    foreach (var item in lPriceEthereumUs)
                    {
                        if (oPriceEthereumUs == null)
                        {
                            oPriceEthereumUs = item;
                        }
                        else
                        {
                            if (item.ethusd_datetime > oPriceEthereumUs.ethusd_datetime)
                            {
                                oPriceEthereumUs = item;
                            }
                        }                       
                    }
                }
            }
            return oPriceEthereumUs;
        }

        public static void Update(PriceEthereumUs oPriceEthereumUs)
        {
            PriceEthereumUsTDG.Update(oPriceEthereumUs);
        }
    }
}
