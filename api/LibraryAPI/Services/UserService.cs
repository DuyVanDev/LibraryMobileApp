using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services
{
    public class UserService : IUserService
    {
        private readonly QltvContext _context;
        public UserService(QltvContext context)
        {
            _context= context;
        }
        public async Task<ICollection<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}
