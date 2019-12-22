using DapperExtensions.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp1.Models.Entity
{
    public class UserEntityMap : ClassMapper<Entity.UserEntity>
    {
        public UserEntityMap()
        {
            Table("Member");
            Map(m => m.Seq).Column("Seq").Key(KeyType.Identity);
            Map(m => m.Id).Column("Id");
            Map(m => m.Name).Column("Name");
            Map(m => m.Email).Column("Email");
            Map(m => m.Password).Column("Password");
        }
        }
}