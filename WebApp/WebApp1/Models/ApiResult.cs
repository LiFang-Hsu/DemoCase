﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp1.Models
{
    public class ApiResult
    {
        public int Status { get; set; }
        public string Message { get; set; }
        /// <summary>
        /// 封包資料
        /// </summary>
        public string Data { get; set; }
    }
}