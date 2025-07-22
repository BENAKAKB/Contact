using ContactManager.API.Models;

namespace ContactManager.API.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
