using LibraryAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var users = await _userService.GetUsers();
            return Ok(users);
        }
    }
}
