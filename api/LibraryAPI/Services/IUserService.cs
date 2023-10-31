using LibraryAPI.Models;

namespace LibraryAPI.Services
{
    public interface IUserService
    {
        Task<ICollection<User>> GetUsers();
    }
}
