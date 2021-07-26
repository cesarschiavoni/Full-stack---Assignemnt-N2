
using BackEnd.BusinessComponents;
using BackEnd.BusinessEntities;
using log4net;
using SecuritizeDigitalWalletAPI.Areas.HelpPage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using System.Web.Script.Services;

namespace SecuritizeDigitalWalletAPI.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/PriceEthereumUs")]
    public class PriceEthereumUsController : ApiController
    {
        private static readonly ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// GetLastPriceEtheriumUs
        /// </summary>
        /// <param name="UserKey"></param>
        /// <returns></returns>
        [HttpGet]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]      
        public PriceEthereumUs GetLastPriceEtheriumUs(string UserKey)
        {
            PriceEthereumUs oPriceEthereumUs = null;
            try
            {
                if (FuncionComun.keyValida(UserKey))
                {
                    oPriceEthereumUs = PriceEthereumUsBC.GetLastPrice();                 
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return oPriceEthereumUs;
        }


        /// <summary>
        /// EditPriceEtheriumUs
        /// </summary>
        /// <param name="UserKey"></param>
        /// <param name="ethusd"></param>
        /// <returns></returns>
        [HttpPut]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool EditPriceEtheriumUs(string UserKey, decimal ethusd)
        {
            bool oSalida = false;
            try
            {
                if (FuncionComun.keyValida(UserKey))
                {
                    PriceEthereumUs oPriceEthereumUs = new PriceEthereumUs();
                    oPriceEthereumUs.ethusd = ethusd;
                    oPriceEthereumUs.ethusd_datetime = DateTime.Now;
                    PriceEthereumUsBC.Update(oPriceEthereumUs);
                    oSalida = true;
                }

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return oSalida;
        }


    }
}
