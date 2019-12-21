using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp1.Dal;
using WebApp1.Models;

namespace WebApp1.Service
{
    public class UserService
    {
        UserDal userDal = new UserDal();
        public string Create(UserData userData)
        {
            var result = string.Empty;
            try
            {
                result = this.userDal.Create(userData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}