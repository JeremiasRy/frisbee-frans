using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElevatorHandler;

public class Graphic
{
    public string[] Picture { get; }
    public Graphic(string filePath)
    {
        List<string> readBuffer = new();
        using (var sr = new StreamReader(filePath))
        {
            while (!sr.EndOfStream)
            {
                var line = sr.ReadLine();
                if (line == null)
                {
                    continue;
                }
                readBuffer.Add(line);
            }
        }
        Picture = readBuffer.ToArray();
    }
    public Graphic() 
    {
        List<string> graphic = new();
        for (int i = 0; i < Console.WindowHeight; i++)
        {
            if (i % 5 == 0)
            {
                graphic.Add(new('-', Console.WindowWidth));
                continue;
            }
            graphic.Add(new(' ', Console.WindowWidth));
        }
        Picture = graphic.ToArray();
    }
}
