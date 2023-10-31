using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class Transaction
{
    public int TranId { get; set; }

    public int? BookId { get; set; }

    public string? TranStatus { get; set; }

    public string? TranDate { get; set; }

    public int? UserId { get; set; }

    public string? TranDateAccepted { get; set; }

    public string? TranDateReturned { get; set; }

    public string? TranDateAccReturned { get; set; }

    public string? TranDateGet { get; set; }

    public string? TranDateGiveBack { get; set; }

    public string? TranDateDeleteRequest { get; set; }

    public virtual Book? Book { get; set; }

    public virtual User? User { get; set; }
}
