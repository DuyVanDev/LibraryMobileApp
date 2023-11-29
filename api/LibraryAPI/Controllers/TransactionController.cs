using LibraryAPI.Models;
using LibraryAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions() 
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _transactionService.GetTransactions();
            return Ok(result);
        }

        [HttpPost("borrow/")]

        public async Task<IActionResult> BorrowBook([FromQuery] int bookId, [FromQuery] int userId)
        {
            var check = _transactionService.CheckQuantity(bookId);
            if(check == false)
            {
                return BadRequest("Khong du so luong");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _transactionService.BorrowBook(bookId, userId);
            return Ok("done");
        }

        [HttpPost("cancel/")]

        public async Task<IActionResult> CancelRequestBorrow([FromQuery] int bookId,[FromQuery] int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
             await _transactionService.CancelRequestBorrow(bookId, userId);
            return Ok("done");
        }

       

    }
}
