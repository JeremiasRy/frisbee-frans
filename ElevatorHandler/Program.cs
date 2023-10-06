// See https://aka.ms/new-console-template for more information
using ElevatorHandler;

ScreenBuffer buffer = new ();
Graphic human = new("../../../Assets/Human.txt");
Graphic elevator = new("../../../Assets/Elevator.txt");
Graphic backDrop = new();

buffer.WriteGraphicToBuffer(backDrop.Picture, 0, 0);
buffer.WriteGraphicToBuffer(human.Picture, 12, 3);
buffer.WriteGraphicToBuffer(elevator.Picture, 15, 3);
buffer.DrawBuffer();
