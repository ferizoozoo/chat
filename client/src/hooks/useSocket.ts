import { useEffect } from "react";
import socket from "../socket";

const useSocket = <T = any>(event: string, callback: (data: T) => void) => {
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);

  const emit = (event: string, data: any) => {
    socket.emit(event, data);
  };

  return { emit };
};

export default useSocket;
