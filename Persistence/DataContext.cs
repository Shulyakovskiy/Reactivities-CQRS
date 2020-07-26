﻿using Ls.Domain;
using Microsoft.EntityFrameworkCore;

namespace Ls.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 01"},
                    new Value {Id = 2, Name = "Value 02"},
                    new Value {Id = 3, Name = "Value 03"});
        }
    }
}