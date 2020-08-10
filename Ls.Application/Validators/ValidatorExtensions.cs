using System.Threading.Tasks;
using FluentValidation;

namespace Ls.Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MaximumLength(6)
                .WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]")
                .WithMessage("Password must contain 1 uppercase latter")
                .Matches("[a-z]")
                .WithMessage("Password must have at least 1 lowercase character")
                .Matches("[0-9]")
                .WithMessage("Password must contain a number")
                .Matches("[^a-zA-z0-9]")
                .WithMessage("Password must contain non alphanumeric");
            return options;
        }
    }
}