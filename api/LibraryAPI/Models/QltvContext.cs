using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Models;

public partial class QltvContext : DbContext
{
    public QltvContext()
    {
    }

    public QltvContext(DbContextOptions<QltvContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<TboAdmin> TboAdmins { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=QLTV;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.BookId).HasName("PK__Book__3DE0C20706FF9F7F");

            entity.ToTable("Book");

            entity.Property(e => e.BookAuthor).HasMaxLength(50);
            entity.Property(e => e.BookImage).HasMaxLength(255);
            entity.Property(e => e.BookPosition)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.BookStatus).HasMaxLength(50);
            entity.Property(e => e.CopyRights).HasMaxLength(50);
            entity.Property(e => e.Date)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FileUpLoad).HasMaxLength(255);
            entity.Property(e => e.Isbn)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ISBN");
            entity.Property(e => e.Language).HasMaxLength(50);
            entity.Property(e => e.Publisher).HasMaxLength(50);
            entity.Property(e => e.Source).HasMaxLength(50);
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ViewTotal).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.Category).WithMany(p => p.Books)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Book_Category");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A0B9F27A368");

            entity.ToTable("Category");

            entity.Property(e => e.CategoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<TboAdmin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admin__719FE4882437DD3D");

            entity.ToTable("TboAdmin");

            entity.Property(e => e.AdminEmail).HasMaxLength(30);
            entity.Property(e => e.AdminName).HasMaxLength(30);
            entity.Property(e => e.AdminPassword)
                .HasMaxLength(30)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.TranId).HasName("PK__Transact__F70897C9A56475EB");

            entity.Property(e => e.TranDate).HasMaxLength(50);
            entity.Property(e => e.TranDateAccReturned)
                .HasMaxLength(50)
                .HasColumnName("TranDate_AccReturned");
            entity.Property(e => e.TranDateAccepted)
                .HasMaxLength(50)
                .HasColumnName("TranDate_Accepted");
            entity.Property(e => e.TranDateDeleteRequest)
                .HasMaxLength(50)
                .HasColumnName("TranDate_DeleteRequest");
            entity.Property(e => e.TranDateGet)
                .HasMaxLength(50)
                .HasColumnName("TranDate_Get");
            entity.Property(e => e.TranDateGiveBack)
                .HasMaxLength(50)
                .HasColumnName("TranDate_GiveBack");
            entity.Property(e => e.TranDateReturned)
                .HasMaxLength(50)
                .HasColumnName("TranDate_Returned");
            entity.Property(e => e.TranStatus).HasMaxLength(20);

            entity.HasOne(d => d.Book).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Transactions_Book");

            entity.HasOne(d => d.User).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Transactions_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserEmail)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserPassword)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UserPhone)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.UserResetPassword)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
