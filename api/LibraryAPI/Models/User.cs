using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? UserEmail { get; set; }

    public string? UserPassword { get; set; }

    public string? UserPhone { get; set; }

    public string? UserResetPassword { get; set; }

    public string? UserCode { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
