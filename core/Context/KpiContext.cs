using kpi.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace kpi.core.Context
{
    public class KpiContext :  IdentityDbContext
    {
        public KpiContext(DbContextOptions<KpiContext> options) : base(options)
        {

        }
    }
}