using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Nest;
using System.Net;
using System.Text.RegularExpressions;
using System.Text;

namespace LibraryAPI.Services
{
    public class BookService : IBookService
    {
        private readonly QltvContext _context;
        public BookService(QltvContext context)
        {
            _context = context;
        }

        public bool BookExists(int id)
        {
            return _context.Books.Any(x => x.BookId == id);
        }
        public async Task<ICollection<Book>> GetAllAsync()
        {
            var booksWithCategories = _context.Books
             .Include(b => b.Category)
             .Select(b => new Book
             {
                 BookId = b.BookId,

                 BookPosition = b.BookPosition,
                 BookTitle = b.BookTitle,
                 Description = b.Description,
                 BookStatus = b.BookStatus,
                 BookAuthor = b.BookAuthor,
                 Publisher = b.Publisher,
                 Isbn = b.Isbn,
                 Language = b.Language,
                 CopyRights = b.CopyRights,
                 Source= b.Source,
                 Quantity = b.Quantity,
                 FileUpLoad = b.FileUpLoad,
                 BookImage = b.BookImage,
                 
                 ViewTotal = b.ViewTotal,
                 Category = b.Category,
                 Type = b.Type,
             })
             .ToList();

            return booksWithCategories;
        }

        public async Task<Book> GetBook(int bookId)
        {
            var booksWithCategories = _context.Books
             .Include(b => b.Category)
             .Select(b => new Book
             {
                 BookId = b.BookId,
                 BookTitle = b.BookTitle,
                 Description = b.Description,
                 BookStatus = b.BookStatus,
                 BookAuthor = b.BookAuthor,
                 Publisher = b.Publisher,
                 Isbn = b.Isbn,
                 Language = b.Language,
                 CopyRights = b.CopyRights,
                 Source = b.Source,
                 Quantity = b.Quantity,
                 FileUpLoad = b.FileUpLoad,
                 BookImage = b.BookPosition,
                 ViewTotal = b.ViewTotal,
                 Category = b.Category,
                 Type = b.Type,
             })
             .FirstOrDefault(b => b.BookId == bookId);

            return booksWithCategories;
        }

        [HttpGet("{categoryId}")]
        public async Task<ICollection<Book>> GetBooksByCategoryId(int categoryId)
        {
            var booksWithCategories = _context.Books
             .Include(b => b.Category)
             .Where(b => b.CategoryId == categoryId)
             .Select(b => new Book
             {
                 BookId = b.BookId,
                 BookTitle = b.BookTitle,
                 Description = b.Description,
                 BookStatus = b.BookStatus,
                 BookAuthor = b.BookAuthor,
                 Publisher = b.Publisher,
                 Isbn = b.Isbn,
                 Language = b.Language,
                 CopyRights = b.CopyRights,
                 Source = b.Source,
                 Quantity = b.Quantity,
                 FileUpLoad = b.FileUpLoad,
                 BookImage = b.BookImage,
                 ViewTotal = b.ViewTotal,
                 Category = b.Category,
                 Type = b.Type,
             })
             .ToList();

            return booksWithCategories;
        }
        private string ConvertToUnSign(string input)
        {
            input = input.Trim();
            for (int i = 0x20; i < 0x30; i++)
            {
                input = input.Replace(((char)i).ToString(), " ");
            }
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string str = input.Normalize(NormalizationForm.FormD);
            string str2 = regex.Replace(str, string.Empty).Replace('đ', 'd').Replace('Đ', 'D');
            while (str2.IndexOf("?") >= 0)
            {
                str2 = str2.Remove(str2.IndexOf("?"), 1);
            }
            return str2;
        }

        public async Task<ICollection<Book>> SearchBooks(string searchTerm)
        {
            var books = _context.Books
           .Include(b => b.Category)
           .Where(b => b.BookTitle.Contains(searchTerm) || b.BookAuthor.Contains(searchTerm))
           .Select(b => new Book
           {
               BookId = b.BookId,
               BookTitle = b.BookTitle,
               Description = b.Description,
               BookStatus = b.BookStatus,
               BookAuthor = b.BookAuthor,
               Publisher = b.Publisher,
               Isbn = b.Isbn,
               Language = b.Language,
               CopyRights = b.CopyRights,
               Source = b.Source,
               Quantity = b.Quantity,
               FileUpLoad = b.FileUpLoad,
               BookImage = b.BookImage,
               ViewTotal = b.ViewTotal,
               Category = b.Category,
               Type = b.Type,
           })
             .ToList();
            return books;




        }

        public async Task<ICollection<Book>> GetBooksPopular()
        {
            var booksWithCategories = _context.Books
            .Include(b => b.Category)
            .OrderByDescending(b => b.ViewTotal)
            .Take(10)
            .Select(b => new Book
            {
                BookId = b.BookId,
                BookPosition = b.BookPosition,
                BookTitle = b.BookTitle,
                Description = b.Description,
                BookStatus = b.BookStatus,
                BookAuthor = b.BookAuthor,
                Publisher = b.Publisher,
                Isbn = b.Isbn,
                Language = b.Language,
                CopyRights = b.CopyRights,
                Source = b.Source,
                Quantity = b.Quantity,
                FileUpLoad = b.FileUpLoad,
                BookImage = b.BookImage,

                ViewTotal = b.ViewTotal,
                Category = b.Category,
                Type = b.Type,
            })
            .ToList();

            return booksWithCategories;
        }

        public async Task<ICollection<Book>> GetBooksNew()
        {
            var booksWithCategories = _context.Books
            .Include(b => b.Category)
            .OrderByDescending(b => b.Date)
            .Take(5)
            .Select(b => new Book
            {
                BookId = b.BookId,
                BookPosition = b.BookPosition,
                BookTitle = b.BookTitle,
                Description = b.Description,
                BookStatus = b.BookStatus,
                BookAuthor = b.BookAuthor,
                Publisher = b.Publisher,
                Isbn = b.Isbn,
                Language = b.Language,
                CopyRights = b.CopyRights,
                Source = b.Source,
                Quantity = b.Quantity,
                FileUpLoad = b.FileUpLoad,
                BookImage = b.BookImage,

                ViewTotal = b.ViewTotal,
                Category = b.Category,
                Type= b.Type,
            })
            .ToList();

            return booksWithCategories;
        }

        public async Task <ICollection<Book>> GetBooksReceived(int userId)
        {
            var joinedData = _context.Transactions
            .Join(_context.Books, t => t.BookId, b => b.BookId, (t, b) => new { t, b })
            .Where(result => result.t.UserId == userId && result.t.TranStatus == "Accepted_Request")
            .Select(result => new Book
            {
                BookId = result.b.BookId,
                BookPosition = result.b.BookPosition,
                BookTitle = result.b.BookTitle,
                Description = result.b.Description,
                BookStatus = result.b.BookStatus,
                BookAuthor = result.b.BookAuthor,
                Publisher = result.b.Publisher,
                Isbn = result.b.Isbn,
                Language = result.b.Language,
                CopyRights = result.b.CopyRights,
                Source = result.b.Source,
                Quantity = result.b.Quantity,
                FileUpLoad = result.b.FileUpLoad,
                BookImage = result.b.BookImage,

                ViewTotal = result.b.ViewTotal,
                Category = result.b.Category,
                Type = result.b.Type,
                // Add other properties as needed
            }).ToList();



            return joinedData;

        }

        public async Task<ICollection<Book>> GetBooksRequest(int userId)
        {
            var joinedData = _context.Transactions
           .Join(_context.Books, t => t.BookId, b => b.BookId, (t, b) => new { t, b })
           .Where(result => result.t.UserId == userId && result.t.TranStatus == "Requested")
           .Select(result => new Book
           {
               BookId = result.b.BookId,
               BookPosition = result.b.BookPosition,
               BookTitle = result.b.BookTitle,
               Description = result.b.Description,
               BookStatus = result.b.BookStatus,
               BookAuthor = result.b.BookAuthor,
               Publisher = result.b.Publisher,
               Isbn = result.b.Isbn,
               Language = result.b.Language,
               CopyRights = result.b.CopyRights,
               Source = result.b.Source,
               Quantity = result.b.Quantity,
               FileUpLoad = result.b.FileUpLoad,
               BookImage = result.b.BookImage,

               ViewTotal = result.b.ViewTotal,
               Category = result.b.Category,
               Type = result.b.Type,
               // Add other properties as needed
           }).ToList();



            return joinedData;

        }
    }
}
