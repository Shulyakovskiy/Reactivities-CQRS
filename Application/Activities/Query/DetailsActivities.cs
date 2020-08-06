using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Ls.Application.Errors;
using Ls.Domain;
using Ls.Domain.Activity;
using Ls.Persistence;
using MediatR;

namespace Ls.Application.Activities.Query
{
    [UsedImplicitly]
    public class DetailsActivities
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {activity = "Not Found"});
                return activity;
            }
        }
    }
}