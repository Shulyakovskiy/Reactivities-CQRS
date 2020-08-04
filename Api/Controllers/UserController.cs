using System.Threading.Tasks;
using Ls.Application.Login.Query;
using Ls.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Ls.Api.Controllers
{
    public class UserController : BaseController
    {
        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<AppUser>> Login([FromBody] Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}