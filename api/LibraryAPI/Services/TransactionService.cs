using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly QltvContext _context;
        public TransactionService(QltvContext context)
        {
            _context = context;
        }
        public async Task BorrowBook(int bookId, int userId)
        {
            var query =  new Transaction
                {
                    BookId = bookId,
                    UserId= userId,
                    TranDate = DateTime.Now.ToString(),
                    TranDateGet = DateTime.Now.AddDays(3).ToString(),
                    TranDateGiveBack = DateTime.Now.AddDays(7).ToString(),
                    TranStatus = "Requested",
                    TranDateAccepted = null,
                    TranDateAccReturned= null,
                    TranDateDeleteRequest= null,
                    TranDateReturned= null,

                };
            await _context.AddAsync(query);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task CancelRequestBorrow(int tranId)
        {
            Transaction transaction = _context.Transactions.FirstOrDefault(t => t.TranId == tranId);
            Book book = _context.Books.FirstOrDefault(b => b.BookId == transaction.BookId);
            book.Quantity = book.Quantity + 1;
            _context.Transactions.Remove(transaction);
            _context.SaveChangesAsync();
        }

        public async Task<ICollection<Transaction>> GetTransactions()
        {
            var result = await _context.Transactions.ToListAsync();
            return result;
        }
    }
}
