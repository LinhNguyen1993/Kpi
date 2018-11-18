using Microsoft.AspNetCore.Mvc;
using kpi_learning.Models;
using Microsoft.AspNetCore.Authorization;
using kpi_learning.core.BaseRepositories;
using System.Threading.Tasks;
using System.Collections.Generic;
using kpi_learning.core.Context;
using Microsoft.EntityFrameworkCore;

namespace kpi_learning.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class CarController : Controller
    {
       private readonly IEntityBaseRepository<CarModel> _repository;
       private readonly KpiContext _context;
        public CarController(
           IEntityBaseRepository<CarModel> repository, KpiContext context)
        {
           this._repository = repository;            
           this._context = context;
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CarModel>>> GetAllCars()
        {
            List<CarModel> cars = new List<CarModel>();
            var qCars = await _repository.GetAllAsync();            
            cars.AddRange(qCars);                        
            return cars;
        }        

        [HttpPost("[action]")]
        [Authorize]
        public async Task<IActionResult> AddNewCar([FromBody]CarModel model)
        {
            if (ModelState.IsValid)
            {
                var cars = await _repository.FindByAsync(c => c.Name == model.Name);
                if (cars == null)
                {
                    _repository.Add(model);
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}