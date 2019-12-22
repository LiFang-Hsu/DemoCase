using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DapperExtensions;
using System.Linq;
using System.Web;
using WebApp1.Models;
using DapperExtensions.Sql;
using Dapper;

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

        internal List<UserData> QueryAll(UserData userData)
        {
            List<UserData> result = new List<UserData>();
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();

                    string sqlCommand = "Select Seq, Id, Name, Email, Password " +
                        "From Member " +
                        "Order By Seq";
                    var listUserEntity = conn.Query<Models.Entity.UserEntity>(sqlCommand).ToList();
                    foreach (Models.Entity.UserEntity userEntity in listUserEntity)
                    {
                        result.Add(new UserData
                        {
                            Id= userEntity.Id,
                            Name = userEntity.Name,
                            Email = userEntity.Email,
                            Password = userEntity.Password
                        });
                    }
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        internal string UpdateOne(UserData userData)
        {
            var result = string.Empty;
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();
                    string sqlCommand = "UPDATE Member " +
                        "SET Name=@Name,Email=@Email,Password=@Password " +
                        "WHERE Id = @Id";
                    var data = new { Id = userData.Id, Name = userData.Name, Email=userData.Email , Password=userData.Password };
                    conn.Execute(sqlCommand, data);
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public bool Delete(List<string> arrIds)
        {
            bool result = false;
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();
                    string sqlCommand = @"Delete From Member Where Id = @Id";
                    result = conn.Execute(sqlCommand, arrIds.Select(item => new { Id = item })) > 0;
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public UserData Read(UserData userData)
        {
            dynamic result = null;
            try
            {
                using (SqlConnection conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();
                    DynamicParameters dp = new DynamicParameters();
                    dp.Add("@Id", userData.Id);
                    dp.Add("@Password", userData.Password);

                    string sqlCommand = "SELECT TOP 1 Seq, Id, Name, Email, Password " +
                        "FROM Member " +
                        "WHERE Id = @Id AND Password = @Password";
                    var data = conn.Query<Models.Entity.UserEntity>(sqlCommand, dp).ToList();


                    //var arg = new PredicateGroup {
                    //    Operator = GroupOperator.And,
                    //    Predicates = new List<IPredicate>()
                    //};
                    //var preId = Predicates.Field<Models.Entity.UserEntity>(f => f.Id, Operator.Eq, userData.Id);
                    //var prePassword = Predicates.Field<Models.Entity.UserEntity>(f => f.Password, Operator.Eq, userData.Password);
                    //arg.Predicates.Add(preId);
                    //arg.Predicates.Add(prePassword);
                    //var userEntity = conn.Get<Models.Entity.UserEntity>(arg);

                    if (data.Count() > 0)
                    {
                        userData.Name = data[0].Name;
                        userData.Email = data[0].Email;
                    }
                    else {
                        throw new Exception("登入失敗!");
                    }
                    result = userData;
                   
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