using LibraryAPI.Models;

namespace LibraryAPI.Services
{
    public interface IUserService
    {
        Task<ICollection<User>> GetUsers();
        Task<User> Login(string email, string password);
    }
}
