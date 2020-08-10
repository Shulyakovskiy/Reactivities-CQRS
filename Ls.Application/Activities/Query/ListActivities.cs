using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Ls.Domain.Activity;
using Ls.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Ls.Application.Activities.Query
{
    [UsedImplicitly]
    public class ListActivities
    {
        public class Query: IRequest<List<Activity>>
        {
            
        }

        public class Handler: IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListActivities> _logger;

            public Handler(DataContext context, ILogger<ListActivities> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ToListAsync(cancellationToken);
                return activities;
            }
        }
    }
}