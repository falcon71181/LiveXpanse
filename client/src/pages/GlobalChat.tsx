import { useState, useEffect } from "react";
import MessageInput from "../components/GlobalChat/MessageInput";
import MessagesLogs from "../components/GlobalChat/Messages";
import socket from "../lib/socket";

const GlobalChat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSentMessage = (message: string) => {
    const newSentMessage = {
      type: "sent",
      data: message,
    };

    setMessages((prevMessages) => {
      return [...prevMessages, newSentMessage];
    });

    console.log("client side eminting messages");
    socket.emit("sent-message", message);
  };

  const handleReceivedMessage = (message: string) => {
    const newReceivedMessage = {
      type: "received",
      data: message,
    };

    setMessages((prevMessages) => {
      return [...prevMessages, newReceivedMessage];
    });
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onReceiveMessage = (message: string) => {
      console.log("client side rec");
      handleReceivedMessage(message);
    };

    // events
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("received-message", onReceiveMessage);

    return () => {
      // Clean up by removing event listeners
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("received-message", onReceiveMessage);
    };
  }, []);

  return (
    <main className="pt-14 w-full h-full z-10">
      <div className="w-full h-[80vh] overflow-y-auto bg-[#162536] border-2 border-yellow-500">
        <MessagesLogs messages={messages} />
      </div>
      <MessageInput onSendMessage={handleSentMessage} />
    </main>
  );
};

export default GlobalChat;
