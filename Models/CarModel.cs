using System;
using kpi_learning.Entities;

namespace kpi_learning.Models
{
    public class CarModel : EntityBase
    {        
        public string Name { get; set; }
        public string Image { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
    }
}