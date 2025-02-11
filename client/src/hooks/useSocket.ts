import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = <T = any>(event: string, callback: (data: T) => void) => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["polling", "websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    newSocket.on(event, callback);
    setSocket(newSocket);

    return () => {
      newSocket.off(event, callback);
      newSocket.disconnect();
    };
  }, [event]);

  const emit = (event: string, data: any) => {
    if (socket) socket!.emit(event, data);
  };

  return { emit };
};

export default useSocket;
