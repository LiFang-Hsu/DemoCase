using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApp1.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp1.Models;

namespace WebApp1.Api.Tests
{
    [TestClass()]
    public class UserControllerTests
    {
        [TestMethod()]
        public void Test_註冊人員_成功()
        {
            UserData userData = new UserData {
                Id = "id_001",
                Name = "name_001",
                Password = "password_001",
                Email = "email_001@gmail.com"
            };

            ApiResult result = new UserController().Create(userData);

            //斷言: 成功傳回0
            Assert.AreEqual(result.Status, 0);
        }
        [TestMethod()]
        public void Test_註冊人員_失敗()
        {
            UserData userData = new UserData
            {
                Id = null,
                Name = "name_002",
                Password = "password_002",
                Email = "email_002@gmail.com"
            };

            ApiResult result = new UserController().Create(userData);

            //斷言: 失敗傳回非0
            Assert.AreNotEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_登入_成功()
        {
            UserData userData = new UserData
            {
                Id = "id_001",
                Password = "password_001",
            };

            ApiResult result = new UserController().Read(userData);

            //斷言: 成功傳回0
            Assert.AreEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_登入_失敗()
        {
            UserData userData = new UserData
            {
                Id = null,
                Password = null,
            };

            ApiResult result = new UserController().Read(userData);

            //斷言: 失敗傳回非0
            Assert.AreNotEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_查詢全部_成功()
        {
            UserData userData = new UserData
            {
            };

            ApiResult result = new UserController().QueryAll(userData);

            //斷言: 成功傳回0
            Assert.AreEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_刪除_成功()
        {
            List<string> arrIds = new List<string>()
            {
                "id_001"
            };
            ApiResult result = new UserController().Delete(arrIds);

            //斷言: 成功傳回0
            Assert.AreEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_刪除_失敗()
        {
            List<string> arrIds = null;
            ApiResult result = new UserController().Delete(arrIds);

            //斷言: 失敗傳回非0
            Assert.AreNotEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_修改_成功()
        {
            UserData userData = new UserData
            {
                Id = "id_001",
                Name = "name_001m",
                Email = "email@yy.yy",
                Password = "1234",
            };
            ApiResult result = new UserController().UpdateOne(userData);

            //斷言: 成功傳回0
            Assert.AreEqual(result.Status, 0);
        }

        [TestMethod()]
        public void Test_修改_失敗()
        {
            UserData userData = new UserData
            {
                Id = "id_001",
                Name = null,
                Email = null,
                Password = null,
            };
            ApiResult result = new UserController().UpdateOne(userData);

            //斷言: 失敗傳回非0
            Assert.AreNotEqual(result.Status, 0);
        }
    }
}