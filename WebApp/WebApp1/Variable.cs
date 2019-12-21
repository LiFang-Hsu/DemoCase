using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace WebApp1
{
    public static class Variable
    {
        public static string Version
        {
            get { return ConfigurationManager.AppSettings["Version"]; }
        }
    }
}