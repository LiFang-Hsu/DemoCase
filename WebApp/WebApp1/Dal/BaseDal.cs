using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp1.Dal
{
    public class BaseDal
    {
        private static readonly string connectionID= "Default";

        /// <summary>
        /// 取得Config檔內的DB 連線字串
        /// </summary>
        /// <returns></returns>
        public static string GetConnectionString()
        {
            string ConnectionString;
            ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings[connectionID].ConnectionString.ToString();
            return ConnectionString;
        }
    }
}