using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _dbContext;

        public ValuesController(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            var values = await _dbContext.Values.ToListAsync();
            return Ok(values);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Get(int id)
        {
            var value = await _dbContext.Values.FindAsync(id);
            return Ok(value);
        }
    }
}