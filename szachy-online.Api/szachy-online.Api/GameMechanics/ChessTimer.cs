using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace szachy_online.Api.GameMechanics
{
    public class ChessTimer
    {
        public float Increment { get; set; }
        public int P1Time { get; set; }
        public int P2Time { get; set; }

        public ChessTimer() //Standard
        {
            Increment = 0;
            P1Time = 599;
            P2Time = 599;
        }

        public ChessTimer(float Increment, int P1Time, int P2Time)
        {
            this.Increment = Increment;
            this.P1Time = P1Time;
            this.P2Time = P2Time;
        }

        public string TimeString(float time)
        {
            string min;
            string sec;
            min = ((int)(time / 60)).ToString();
            sec = ((int)(time % 60)).ToString();
            if ((time / 60) < 10) //min
            {
                min = "0" + min;
            }

            if ((time % 60) < 10) //sec
            {
                sec = "0" + sec;
            }

            return min + ":" + sec;
        }
    }
}
