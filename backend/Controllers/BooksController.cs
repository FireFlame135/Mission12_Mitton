using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookstoreApi.Models;

namespace BookstoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks(
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 5, 
            [FromQuery] string sortOrder = "title_asc")
        {
            // Start with all books
            IQueryable<Book> query = _context.Books;

            // 1. Sorting logic (AI-assisted sorting as per instructions)
            query = sortOrder switch
            {
                "title_desc" => query.OrderByDescending(b => b.Title),
                "title_asc" => query.OrderBy(b => b.Title),
                _ => query.OrderBy(b => b.Title) // Default sort
            };

            // 2. Get total count for pagination metadata
            var totalCount = await query.CountAsync();

            // 3. Pagination logic: Skip the previous pages and take the requested amount
            var books = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new 
                {
                    b.BookId,
                    b.Title,
                    b.Author,
                    b.Publisher,
                    b.Isbn,
                    b.Classification,
                    b.Category,
                    b.PageCount,
                    b.Price
                })
                .ToListAsync();

            // 4. Return the data along with pagination metadata so React knows how to build the buttons
            return Ok(new
            {
                TotalItems = totalCount,
                PageSize = pageSize,
                CurrentPage = page,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Books = books
            });
        }
    }
}