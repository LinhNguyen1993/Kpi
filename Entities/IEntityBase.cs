using System;

namespace kpi.Entities
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