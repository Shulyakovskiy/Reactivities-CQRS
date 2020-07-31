using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Ls.Application.Errors;
using Ls.Persistence;
using MediatR;

namespace Ls.Application.Activities.Command
{
    [UsedImplicitly]
    public class DeleteActivities
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new {activity = "Not Found"});

                try
                {
                    _context.Activities.Remove(activity);
                    var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                    if (success)
                        return Unit.Value;
                }
                catch (Exception e)
                {
                    //TODO: Make CONST Response answer
                    throw new Exception($"Problem delete activity - {e.Message}");
                }

                return default;
            }
        }
    }
}