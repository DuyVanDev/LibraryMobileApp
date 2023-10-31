using LibraryAPI.Models;

namespace LibraryAPI.Services
{
    public interface ITransactionService
    {
        Task BorrowBook(int bookId, int userId);
        Task<ICollection<Transaction>> GetTransactions();
        Task CancelRequestBorrow(int tranId);
    }
}
