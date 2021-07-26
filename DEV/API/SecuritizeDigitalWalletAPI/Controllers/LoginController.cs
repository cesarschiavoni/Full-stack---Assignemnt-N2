using BackEnd.BusinessComponents;
using BackEnd.BusinessEntities;
using log4net;
using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using System.Threading;
using System.Web.Http;
using WebApiTemporayGarage.Controllers;
namespace WebApiSenVol.Controllers
{
    /// <summary>
    /// login controller class for authenticate users
    /// </summary>
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        private static readonly ILog Logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        [HttpGet]     
        public IHttpActionResult echoping()
        {
            bool bSalida = false;
            try
            {
                bSalida = true;
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return Ok(bSalida);
        }

        [HttpGet]      
        public IHttpActionResult echouser()
        {
            string szSalida = string.Empty;
            try
            {
                var identity = Thread.CurrentPrincipal.Identity;
                szSalida = $" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}";
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }
            return Ok(szSalida);
        }

        [HttpPost] 
        public IHttpActionResult authenticate([FromBody] LoginRequest login)
        {
            string szSalida = string.Empty;
            Usuario oUsuario = new Usuario();
            try
            {
                if (login == null)
                    throw new HttpResponseException(HttpStatusCode.BadRequest);

                string usr = login.Username.Trim().ToLower();

                if (usr == oUsuario.usr)
                {
                    string pass = login.Password;
                  
                    if (pass == oUsuario.pass)
                    {                       
                       szSalida = TokenGenerator.GenerateTokenJwt(usr);                       
                    }
                    else
                    {
                        szSalida = "Contraseña incorrecta. Vuelve a intentarlo.";
                    }
                }
                else
                {
                    szSalida = "No se ha podido encontrar la cuenta " + login.Username ;
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex);
            }

            return Ok(szSalida);

        }


    }
}
