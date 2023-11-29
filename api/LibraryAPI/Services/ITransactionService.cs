using LibraryAPI.Models;

namespace LibraryAPI.Services
{
    public interface ITransactionService
    {
        Task BorrowBook(int bookId, int userId);
        bool CheckQuantity(int bookId); 
        Task<ICollection<Transaction>> GetTransactions();
        Task CancelRequestBorrow(int bookId, int userId);

    }
}
