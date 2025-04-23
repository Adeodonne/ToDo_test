using Microsoft.AspNetCore.Mvc;
using ToDoTest.Application.DTOs;
using ToDoTest.Domain.Task;
using ToDoTest.Infrastructure.DatabaseConfigurations;

namespace ToDoTest.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ToDoDbContext _context;

    public TaskController(ToDoDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllTasks()
    {
        return Ok(_context.Tasks.ToList());
    }

    [HttpPost]
    public IActionResult AddTask([FromBody] TaskDTO task)
    {
        var newTask = new TaskItem
        {
            Id = Guid.NewGuid().ToString(),
            Text = task.Text,
        };
        _context.Tasks.Add(newTask);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
    }
}