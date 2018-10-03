using System;
using kpi.core.Context;

namespace kpi.core.DbFactory
{
    public interface IDbFactory : IDisposable
    {
        KpiContext Init();
    }
}