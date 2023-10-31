using LibraryAPI.Models;
using Microsoft.OpenApi.Any;

namespace LibraryAPI.Services
{
    public interface IBookService
    {

        Task<ICollection<Book>> GetAllAsync();
        Task<Book> GetBook(int id);

        Task<ICollection<Book>> GetBooksByCategoryId(int categoryId);
        Task<ICollection<Book>> SearchBooks(string searchTerm);

        Task<ICollection<Book>> GetBooksPopular();
        Task<ICollection<Book>> GetBooksNew();
    }
}
