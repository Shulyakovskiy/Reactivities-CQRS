using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Ls.Application.Activities.Command;
using Ls.Application.Activities.Query;
using Ls.Domain;
using Ls.Domain.Activity;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ls.Api.Controllers
{
    public class ActivitiesController : BaseController
    {

        [Route("List")]
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await Mediator.Send(new ListActivities.Query(), ct);
        }

        [Route("Details/{id}")]
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await Mediator.Send(new DetailsActivities.Query {Id = id});
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody, Required] CreateActivities.Command command)
        {
            return await Mediator.Send(command);
        }

        [Route("Edit/{id}")]
        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditActivities.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new DeleteActivities.Command {Id = id});
        }
    }
}