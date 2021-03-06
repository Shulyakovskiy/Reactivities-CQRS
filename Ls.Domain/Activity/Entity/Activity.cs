﻿using System;
using System.Collections.Generic;
using Ls.Domain.User;
using Ls.Domain.User.Entity;

namespace Ls.Domain.Activity
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public ICollection<UserActivity> UserActivities { get; set; }
    }
}