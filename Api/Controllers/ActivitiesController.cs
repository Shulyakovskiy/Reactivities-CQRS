using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Ls.Application.Activities.Command;
using Ls.Application.Activities.Query;
using Ls.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Ls.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("List")]
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new ListActivities.Query(), ct);
        }

        [Route("Details/{id}")]
        [HttpGet]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new DetailsActivities.Query {Id = id});
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody, Required] CreateActivities.Command command)
        {
            return await _mediator.Send(command);
        }

        [Route("Edit/{id}")]
        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditActivities.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new DeleteActivities.Command{Id = id});
        }
    }
}