using System.Collections.Generic;
using Ls.Domain.User.Entity;
using Microsoft.AspNetCore.Identity;

namespace Ls.Domain.User
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public ICollection<UserActivity> UserActivities { get; set; }
    }
}