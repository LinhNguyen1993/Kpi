using System;
using kpi_learning.core.Context;

namespace kpi_learning.core.DbFactory
{
    public interface IDbFactory : IDisposable
    {
        KpiContext Init();
    }
}