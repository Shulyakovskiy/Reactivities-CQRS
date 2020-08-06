using System.Threading.Tasks;
using Ls.Application.Login.Query;
using Ls.Domain;
using Ls.Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ls.Api.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<User>> Login([FromBody] Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}