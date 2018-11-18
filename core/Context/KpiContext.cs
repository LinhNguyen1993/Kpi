using kpi_learning.Entities;
using kpi_learning.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace kpi_learning.core.Context
{
    public class KpiContext :  IdentityDbContext
    {
        public KpiContext(DbContextOptions<KpiContext> options) : base(options)
        {

        }

        public DbSet<CarModel> Cars { get; set; }
    }
}