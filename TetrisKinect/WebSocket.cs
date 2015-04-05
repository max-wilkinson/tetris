using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fleck;
using System.Diagnostics;

namespace Microsoft.Samples.Kinect.SkeletonBasics
{
    class WebSocket
    {
        /*static*/ List<IWebSocketConnection> _sockets;

        public /*static*/ void InitializeSockets()
        {
            _sockets = new List<IWebSocketConnection>();

            var server = new WebSocketServer("ws://127.0.0.1:8181");

            server.Start(socket =>
            {
                socket.OnOpen = () =>
                {
                    Debug.WriteLine("Connected to " + socket.ConnectionInfo.ClientIpAddress);
                    _sockets.Add(socket);
                    sendMsg("first message");
                };
                socket.OnClose = () =>
                {
                    Debug.WriteLine("Disconnected from " + socket.ConnectionInfo.ClientIpAddress);
                    _sockets.Remove(socket);
                };
                socket.OnMessage = message =>
                {
                    Debug.WriteLine(message);
                };
            });

            //Console.ReadLine();
        }

        public /*static*/ void sendMsg(string msg)
        {
            Debug.WriteLine("sending message");
            foreach (var socket in this._sockets)
            {
                socket.Send(msg);
            }
        }
    }
}
