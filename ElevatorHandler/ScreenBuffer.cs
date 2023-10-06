namespace ElevatorHandler;

public class ScreenBuffer
{
    readonly int _x;
    readonly int _y;
    readonly char[][] _buffer;

    public void WriteCharToBuffer(char ch, int x, int y) => _buffer[x][y] = ch;
    public void WriteGraphicToBuffer(string[] graph, int x, int y)
    {
        for (int i = 0; i < graph.Length; i++)
        {
            for (int j = 0; j < graph[i].Length; j++)
            {
                _buffer[y + i][x + j] = graph[i][j];
            }

        }
    }
    public void DrawBuffer()
    {
        for (int iy = 0; iy < _buffer.Length; iy++)
        {
            Console.WriteLine(_buffer[iy]);
        }
        ClearBuffer();
    }

    void ClearBuffer()
    {
        for (int iy = 0; iy < _y; iy++)
        {
            _buffer[iy] = new char[_x];
            Array.Fill(_buffer[iy], ' ');
        }
    }

    public ScreenBuffer()
    {
        Console.CursorVisible = false;
        _x = Console.WindowWidth;
        _y = Console.WindowHeight;
        _buffer = new char[_y][];
        ClearBuffer();
    }
}
