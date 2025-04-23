using Microsoft.EntityFrameworkCore;
using ToDoTest.Domain.Task;

namespace ToDoTest.Infrastructure.DatabaseConfigurations;

public class ToDoDbContext(DbContextOptions<ToDoDbContext> options) : DbContext(options)
{
    public DbSet<TaskItem> Tasks { get; set; }
}