using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DapperExtensions;
using System.Linq;
using System.Web;
using WebApp1.Models;

namespace WebApp1.Dal
{
    public class UserDal : BaseDal
    {
        public string Create(UserData userData)
        {
            var result = string.Empty;
            try
            {
                var userEntity = new WebApp1.Models.Entity.UserEntity()
                {
                    Id = userData.Id,
                    Name = userData.Name,
                    Email = userData.Email,
                    Password = userData.Password
                };

                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();
                    conn.Insert(userEntity);
                    result = userEntity.Id.ToString();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}