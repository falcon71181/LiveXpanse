"use client";
import React, { useState, useEffect } from "react";
import MessageInput from "../components/GlobalChat/MessageInput";
import { socket } from "../lib/socket";

const GlobalChat: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSentMessage = (message: string) => {
    const newSentMessage = {
      type: "sent",
      data: message,
    };

    setMessages((prevMessages) => {
      return [...prevMessages, newSentMessage];
    });

    socket.emit("send-message", message);
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("disconnected");
      setIsConnected(false);
    };

    const onReceiveMessage = (message: string) => {
      const newReceivedMessage = {
        type: "received",
        data: message,
      };

      setMessages((prevMessages) => {
        return [...prevMessages, newReceivedMessage];
      });
    };

    // events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive-message", onReceiveMessage);

    return () => {
      // Clean up by removing event listeners
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive-message", onReceiveMessage);
    };
  }, []);

  return (
    <main className="pt-20 w-full h-full z-10">
      {isConnected && <div>connected</div>}
      <MessageInput onSendMessage={handleSentMessage} />
    </main>
  );
};

export default GlobalChat;
