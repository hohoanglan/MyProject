using Receive_API._Repositorys.Interfaces;
using Receive_API.Data;
using Receive_API.Models;

namespace Receive_API._Repositorys.Repositories
{
    public class WarehouseRepository : ReceiveDBRepository<Warehouse>, IWarehouseRepository
    {
        private readonly DataContext _context;
        public WarehouseRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}