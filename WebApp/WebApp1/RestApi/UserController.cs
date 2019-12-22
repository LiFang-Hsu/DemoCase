using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp1.Models;
using WebApp1.Service;
using Newtonsoft.Json;

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
                apiResult.Status = 0;
                apiResult.Message = result;
            } 
            catch (Exception ex)
            {
                //寫入log檔 or 資料庫...
                apiResult.Status = 1;
                apiResult.Message = ex.Message;
            }
            return apiResult;
        }

        [Route("User/Read")]
        [HttpPost()]
        public ApiResult Read(UserData userData)
        {
            var apiResult = new ApiResult();
            try
            {
                var result = this.userService.Read(userData);
                apiResult.Status = 0;
                apiResult.Data = JsonConvert.SerializeObject(result);
            } 
            catch (Exception ex)
            {
                //寫入log檔 or 資料庫...
                apiResult.Status = 1;
                apiResult.Message = ex.Message;
            }
            return apiResult;
        }

        [Route("User/QueryAll")]
        [HttpPost()]
        public ApiResult QueryAll(UserData userData)
        {
            var apiResult = new ApiResult();
            try
            {
                var result = this.userService.QueryAll(userData);
                apiResult.Status = 0;
                apiResult.Data = JsonConvert.SerializeObject(result);
            }
            catch (Exception ex)
            {
                //寫入log檔 or 資料庫...
                apiResult.Status = 1;
                apiResult.Message = ex.Message;
            }
            return apiResult;
        }

        [Route("User/Delete")]
        [HttpPost()]
        public ApiResult Delete(List<string> arrIds)
        {
            var apiResult = new ApiResult();
            try
            {
                //var result = this.userService.QueryAll(userData);
                apiResult.Status = 0;
                apiResult.Data = "";// JsonConvert.SerializeObject(result);
            }
            catch (Exception ex)
            {
                //寫入log檔 or 資料庫...
                apiResult.Status = 1;
                apiResult.Message = ex.Message;
            }
            return apiResult;
        }
    }
}
