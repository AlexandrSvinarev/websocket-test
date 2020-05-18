import { useEffect, useState, useCallback } from "react";

const statuses = {
  connect: "Подключение...",
  error: "Ошибка соединения! Идет переподключение...",
  connected: "Подключено!",
  close: "Разорвано соединение! Идет переподключение...",
};

export default function useConnectWS(callback) {
  const [socketClose, setSocketClose] = useState(null);
  const [status, setStatus] = useState(statuses.connect);

  const connect = useCallback(() => {
    let socket = new WebSocket("ws://127.0.0.1:8080");

    socket.onmessage = function (event) {
      callback(JSON.parse(event.data));
    };

    socket.onopen = () => setStatus(statuses.connected);
    socket.onclose = () => setStatus(statuses.close);
    socket.onerror = () => setStatus(statuses.error);

    setSocketClose({
      close: (v) => {
        socket.close();
      },
    });
  }, []);

  useEffect(() => {
    if (status !== statuses.connected && status !== statuses.connect) {
      let timeout = null;
      switch (statuses.error) {
        case statuses.close:
          timeout = setTimeout(() => {
            connect();
          }, 1000);
          break;
        case statuses.error:
          timeout = setTimeout(() => {
            connect();
          }, 1000);
          break;

        default:
          break;
      }

      return () => clearTimeout(timeout);
    }
  }, [status]);

  useEffect(() => {
    connect();

    return () => {
      socketClose.close();
    };
  }, []);

  return status;
}
