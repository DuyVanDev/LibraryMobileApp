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

        public bool CheckQuantity(int bookId)
        {
            var book = _context.Books.FirstOrDefault(b => b.BookId == bookId);
            if (book.Quantity == 0)
            {
                return false;
            }
            return true;
        }

        public async Task BorrowBook(int bookId, int userId)
        {
            Book book = _context.Books.FirstOrDefault(b => b.BookId == bookId);
            book.Quantity = book.Quantity - 1;
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
            await _context.Transactions.AddAsync(query);
            await _context.SaveChangesAsync();
            return;
        }

        public async Task CancelRequestBorrow(int bookId, int userId)
        {
            var a = bookId;
            Transaction transaction = _context.Transactions.FirstOrDefault(t => t.BookId == bookId && t.UserId == userId);
            Book book = _context.Books.FirstOrDefault(b => b.BookId == transaction.BookId && b.BookId == bookId);
            
          
                book.Quantity = book.Quantity + 1;
                _context.Transactions.Remove(transaction);
                _context.SaveChangesAsync();
            return ;

        }

       

        public async Task<ICollection<Transaction>> GetTransactions()
        {
            var result = await _context.Transactions.ToListAsync();
            return result;
        }
    }
}
