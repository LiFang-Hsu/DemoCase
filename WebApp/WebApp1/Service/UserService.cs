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

        public UserData Read(UserData userData)
        {
            var result = default(UserData);

            try
            {
                result = this.userDal.Read(userData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public List<UserData> QueryAll(UserData userData)
        {
            var result = default(List<UserData>);

            try
            {
                result = this.userDal.QueryAll(userData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public bool Delete(List<string> arrIds)
        {
            dynamic result;

            try
            {
                result = this.userDal.Delete(arrIds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public string UpdateOne(UserData userData)
        {
            var result = string.Empty;

            try
            {
                result = this.userDal.UpdateOne(userData);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}