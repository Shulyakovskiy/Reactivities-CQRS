using Microsoft.AspNetCore.Identity;

namespace Ls.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}