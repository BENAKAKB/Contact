using ContactManager.API.Data;
using ContactManager.API.Dtos;
using ContactManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ContactManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactsController(AppDbContext context)
        {
            _context = context;
        }

        // Helper to get user ID from token
        private int GetUserId() =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var userId = GetUserId();
            var contacts = await _context.Contacts
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(ContactDto dto)
        {
            var userId = GetUserId();
            var contact = new Contact
            {
                Name = dto.Name,
                Address = dto.Address,
                Phone = dto.Phone,
                UserId = userId
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var userId = GetUserId();
            var contact = await _context.Contacts
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (contact == null)
                return NotFound();

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
