using AutoMapper;
using Ls.Application.Activities.Dto;
using Ls.Domain.Activity;
using Ls.Domain.User;
using Ls.Domain.User.Entity;

namespace Ls.Application.Activities.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                ;
        }
    }
}