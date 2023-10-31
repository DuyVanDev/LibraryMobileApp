using System;
using System.Collections.Generic;

namespace LibraryAPI.Models;

public partial class TboAdmin
{
    public int AdminId { get; set; }

    public string? AdminName { get; set; }

    public string? AdminEmail { get; set; }

    public string? AdminPassword { get; set; }
}
