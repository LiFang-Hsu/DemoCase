using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Models;
using WebApp1.Api;

namespace WebApp1.Controllers
{
    public class RegisterController : Controller
    {
        UserController userController = new UserController();
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        //public JsonResult Register(UserData userData)
        //{
        //    var apiResult = this.userController.Create(userData);
        //    //apiurl
        //    return Json(apiResult, JsonRequestBehavior.AllowGet);
        //}
    }
}