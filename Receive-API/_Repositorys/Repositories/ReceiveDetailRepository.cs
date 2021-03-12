using Receive_API._Repositorys.Interfaces;
using Receive_API.Data;
using Receive_API.Models;

namespace Receive_API._Repositorys.Repositories
{
    public class ReceiveDetailRepository : ReceiveDBRepository<Receive_Detail>, IReceiveDetailRepository
    {
        private readonly DataContext _context;
        public ReceiveDetailRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}