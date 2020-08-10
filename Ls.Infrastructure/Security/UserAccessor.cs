using System.Linq;
using System.Security.Claims;
using Ls.Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Ls.Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public UserAccessor(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string GetCurrentUserName()
        {
            var username = _contextAccessor
                .HttpContext
                .User?
                .Claims?
                .FirstOrDefault(x =>x.Type == ClaimTypes.Name)?.Value;
            
            return username;
        }
    }
}