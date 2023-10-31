using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string? BookTitle { get; set; }

    public int? CategoryId { get; set; }

    public string? Description { get; set; }

    public string? BookAuthor { get; set; }

    public string? BookStatus { get; set; }

    public string? BookPosition { get; set; }

    public string? Publisher { get; set; }

    public string? Isbn { get; set; }

    public string? Language { get; set; }

    public string? Date { get; set; }

    public string? CopyRights { get; set; }

    public string? Source { get; set; }

    public int? Quantity { get; set; }

    public string? FileUpLoad { get; set; }

    public string? BookImage { get; set; }

    public int? ViewTotal { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<Transaction>? Transactions { get; set; }
}
