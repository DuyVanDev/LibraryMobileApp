using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nest;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService) //, Cloudinary cloudinary
        {

            _bookService = bookService;
        }
        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _bookService.GetAllAsync();
            return Ok(books);
        }

        [HttpGet("{bookId}")]
        public IActionResult GetBook(int bookId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var book = _bookService.GetBook(bookId);
                
            return Ok(book);
        }

        [HttpGet("/api/Book/search")]
        public async Task<IActionResult> SearchBooks([FromQuery] string search="")
        {
            var eBook = new Array[] { };
            
            if(search.Length == 0)
            {
                return Ok(new
                {
                    result = eBook
                }); ;
            }
            var books = _bookService.SearchBooks(search);
            return Ok(books);
        }

        [HttpGet("/api/Book/category")]
        public async Task<IActionResult> GetBookByCategory([FromQuery] int cat)
        {
            var eBook = new Array[] { };
            
            var books = _bookService.GetBooksByCategoryId(cat);
            if(books == null)
            {
                return Ok(new
                {
                    result = eBook
                }); ;
            }
            return Ok(books);
        }

        [HttpGet("/api/Book/popular")]
        public IActionResult GetBooksPopular()
        {
            var books = _bookService.GetBooksPopular();
            return Ok(books);
        }

        [HttpGet("/api/Book/new")]
        public IActionResult GetBooksNew()
        {
            var books = _bookService.GetBooksNew();
            return Ok(books);
        }
    }
}
