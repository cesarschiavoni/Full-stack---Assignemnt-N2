
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
    [RoutePrefix("api/Wallet")]
    public class WalletController : ApiController
    {
        private static readonly ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// AddWallet
        /// </summary>
        /// <param name="Wallet"></param>
        /// <returns></returns>
        [HttpPost]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public int? AddWallet(Wallet Wallet)
        {
            try
            {
                if (FuncionComun.keyValida(Wallet.UserKey))
                {
                    Wallet.TranDate = DateTime.Now;
                    WalletBC.Insert(Wallet);
                }

            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return Wallet.Id;
        }

        /// <summary>
        /// GetAllWallet
        /// </summary>
        /// <param name="UserKey"></param>
        /// <param name="OrderByFav"></param>
        /// <returns></returns>
        [HttpGet]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Wallet> GetAllWallet(string UserKey, bool OrderByFav)
        {
            List<Wallet> lSalida = new List<Wallet>();
            try
            {
                if (FuncionComun.keyValida(UserKey))
                {
                    Wallet oWallet = new Wallet();
                    oWallet.UserKey = UserKey;
                    lSalida = WalletBC.GetByParam(oWallet);
                    if (OrderByFav)
                    {
                        if (lSalida.Count > 0)
                        {
                            lSalida = lSalida.OrderByDescending(o => o.Favorite).ToList();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return lSalida;
        }

        /// <summary>
        /// GetAllWallet
        /// </summary>
        /// <param name="UserKey"></param>
        /// <param name="OrderByFav"></param>
        /// <returns></returns>
        [HttpGet]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public Wallet GetWallet(int Id, string UserKey)
        {
            Wallet oSalida = new Wallet();
            try
            {
                if (FuncionComun.keyValida(UserKey))
                {
                    Wallet oWallet = new Wallet();
                    oWallet.Id = Id;
                    oWallet.UserKey = UserKey;
                    List<Wallet> lSalida = WalletBC.GetByParam(oWallet);
                    if(lSalida.Count == 1)
                    {
                        oSalida = lSalida[0];
                    }
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return oSalida;
        }

        /// <summary>
        /// EditWallet
        /// </summary>
        /// <param name="Wallet"></param>
        /// <returns></returns>
        [HttpPut]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool EditWallet(Wallet Wallet)
        {
            bool oSalida = false;
            try
            {
                if (FuncionComun.keyValida(Wallet.UserKey))
                {
                    Wallet.TranDate = DateTime.Now;
                    Wallet oexiste = new Wallet();
                    oexiste.Id = Wallet.Id;
                    oexiste.UserKey = Wallet.UserKey;
                    if (WalletBC.GetByParam(oexiste).Count == 1)
                    {
                        WalletBC.Update(Wallet);
                        oSalida = true;
                    }
                  
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
