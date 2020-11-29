using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class MessageQueryParams
    {
        public int SenderId { get; set; }
        public int RecipientId { get; set; }

    }
}
