using System.Threading.Tasks;
using Ls.Application.Login.Command;
using Ls.Application.Login.Query;
using Ls.Domain;
using Ls.Domain.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ls.Api.Controllers
{
    public class UserController : BaseController
    {
     
        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<User>> Login([FromBody] Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [Route("Register")]
        [HttpPost]
        public async Task<ActionResult<User>> Register([FromBody] Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [Route("Detail")]
        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}