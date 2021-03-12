using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Receive_API._Services.Interfaces;
using Receive_API.Dto;
using Receive_API.Helpers;

namespace Receive_API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ApprovalController : ControllerBase
    {
        private readonly IApprovalService _serviceApproval;
        public ApprovalController(IApprovalService serviceApproval) {
            _serviceApproval = serviceApproval;
        }

        [HttpGet("getReceives")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param) {
            var userCurrent = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var receives = await _serviceApproval.GetWithPaginations(param, userCurrent);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetReceivePagination([FromQuery]PaginationParams param, ManagerParam filterParam) {
            var userCurrent = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var receives = await _serviceApproval.SearchWithPaginations(param,filterParam, userCurrent);
            Response.AddPagination(receives.CurrentPage, receives.PageSize, receives.TotalCount, receives.TotalPages);
            return Ok(receives);
        }
        [HttpGet("acceptReceive/{id}")]
        public async Task<IActionResult> AcceptReceive(string id) {
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _serviceApproval.AcceptReceive(id, user);
            return Ok(new {result = result});
        }

        [HttpGet("declineReceive/{id}")]
        public async Task<IActionResult> DeclineReceive(string id) {
            var user = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _serviceApproval.DeclineReceive(id, user);
            return Ok(new {result = result});
        }

    }
}