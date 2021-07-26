using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SecuritizeDigitalWalletAPI.Areas.HelpPage
{
    public class FuncionComun
    {
        internal static bool keyValida(string userKey)
        {
            if (userKey == "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY")
            {
                return true;
            }
            else {
                return false;
            }
        }
    }
}