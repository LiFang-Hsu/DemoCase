using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp1.Models;
using WebApp1.Service;

namespace WebApp1.Api
{
    public class UserController : ApiController
    {
        UserService userService = new UserService();

        [Route("User/Create")]
        [HttpPost()]
        public ApiResult Create(UserData userData)
        {
            var apiResult = new ApiResult();
            try
            {
                var result = this.userService.Create(userData);
                apiResult.Status = 1;
                apiResult.Message = result;
            } 
            catch (Exception ex)
            {
                //寫入log檔 or 資料庫...
                apiResult.Status = 0;
                apiResult.Message = ex.Message;
            }
            return apiResult;
        }
    }
}
