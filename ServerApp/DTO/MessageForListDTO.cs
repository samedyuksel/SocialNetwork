using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class MessageForListDTO
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
        public string Text { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateRead { get; set; }

        public bool IsRead { get; set; }

    }
}
