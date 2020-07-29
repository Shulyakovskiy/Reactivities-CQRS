using System;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Ls.Domain;
using Ls.Persistence;
using MediatR;

namespace Ls.Application.Activities.Command
{
    [UsedImplicitly]
    public class CreateActivities
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
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
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                await _context.Activities.AddAsync(activity, cancellationToken);
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success)
                    return Unit.Value;
                //TODO: Make CONST Response answer
                throw new Exception("Problem saving changes");
            }
        }
    }
}