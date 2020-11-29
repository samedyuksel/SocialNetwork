using System;
using System.ComponentModel.DataAnnotations;

namespace ServerApp.DTO
{
    public class UserForRegisterDTO
    {
        [Required(ErrorMessage = "The name field is required.")]
        public string Name { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Gender { get; set; }

        [Required]
        //   [StringLength(10,MinimumLength=6)]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
    }
}