using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace szachy_online.Api.GameMechanics
{
    public class Coords
    {
        public char x { get; set; }
        public sbyte y { get; set; }

        public Coords(char x, sbyte y)
        {
            this.x = x;
            this.y = y;
        }
        public Coords(char x, int y)
        {
            this.x = (char)x;
            this.y = (sbyte)y;
        }

        public Coords()
        {

        }
    }
}
