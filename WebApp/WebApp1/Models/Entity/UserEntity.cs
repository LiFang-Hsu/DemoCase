using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp1.Models.Entity
{
    public class UserEntity
    {
        public int Seq { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}