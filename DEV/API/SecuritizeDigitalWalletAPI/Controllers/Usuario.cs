using BackEnd.BusinessEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Script.Services;

namespace SecuritizeDigitalWalletAPI.Controllers
{
    [RoutePrefix("api/Usuario")]
    public class UsuarioController : ApiController
    {
        private static readonly ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);          
    
        [AllowAnonymous]
        [HttpPost]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public List<Usuario> GetByParam(Usuario pUsuario)
        {
            List<Usuario> output = new List<Usuario>();

            try
            {
                Usuario oUsuario = new Usuario();
                output.Add(oUsuario);
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }

            return output;
        }

      

     
      
       



    }
}