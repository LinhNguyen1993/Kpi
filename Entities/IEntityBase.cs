using System;

namespace kpi_learning.Entities
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
    }

    public class EntityBase : IEntityBase
    {
        public Guid Id { get => Id; set => Id = new Guid(); }
    }
}