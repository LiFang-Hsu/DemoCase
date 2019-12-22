using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApp1.Models;

namespace WebApp1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (ViewData["userData"] == null)
            {
                UserData userData = new UserData();
                ViewData["userData"] = userData;
            }
            return View();
        }

        public ActionResult Management()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}