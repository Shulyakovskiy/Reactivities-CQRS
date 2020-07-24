using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using JetBrains.Annotations;
using MediatR;
using Persistence;

namespace Application.Activities.Query
{
    [UsedImplicitly]
    public class DetailsActivities
    {
        public class Query: IRequest<Activity>
        {
            public Guid Id { get; set; }
        }
        public class Handler: IRequestHandler<Query, Activity>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);
                return activity;
            }
        }
    }    
}