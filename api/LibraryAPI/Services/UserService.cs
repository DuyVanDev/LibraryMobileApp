using LibraryAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;
namespace LibraryAPI.Services
{
    public class UserService : IUserService
    {
        private readonly QltvContext _context;

        public UserService()
        {
        }

        public UserService(QltvContext context)
        {
            _context= context;
        }
        public async Task<ICollection<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
        public static string Encrypt(string password)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] encrypt;
            UTF8Encoding encode = new UTF8Encoding();
            encrypt = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder encryptdata = new StringBuilder();
            for (int i = 0; i < encrypt.Length; i++)
            {
                encryptdata.Append(encrypt[i].ToString());



            }
            return encryptdata.ToString();
        }
        public async Task<User> Login(string email, string password)
        {
            var result = await _context.Users.SingleOrDefaultAsync(u => u.UserEmail == email && u.UserPassword == Encrypt(password));
            return result;
        }

    }
}
