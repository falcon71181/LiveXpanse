import { useState, useEffect } from "react";
import MessageInput from "../components/GlobalChat/MessageInput";
import MessagesLogs from "../components/GlobalChat/Messages";
import socket from "../lib/socket";
import { Message, MessageData } from "../types/GlobalChat";

const GlobalChat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);

  // handle sent-message data {}
  const handleSentMessage = (message: string) => {
    // TODO add user data in Message {}
    const newSentMessage: Message = {
      type: "sent",
      data: {
        socketId: socket.id,
        message: message,
      },
    };

    setMessages((prevMessages) => {
      return [...prevMessages, newSentMessage];
    });

    console.log("client side emitting messages");
    socket.emit("sent-message", newSentMessage.data);
  };

  // handle received-message data {}
  const handleReceivedMessage = (data: MessageData) => {
    const newReceivedMessage: Message = {
      type: "received",
      data: data,
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

    const onReceiveMessage = (data: MessageData) => {
      // to not print back the sent-message as received-message
      if (data.socketId === socket.id) return;
      handleReceivedMessage(data);
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
    <main className="pt-14 w-screen min-h-screen z-10">
      {!isConnected && (
        <h1 className="p-3 text-white">
          ERROR: Some error occured: Couldn't connect to socker server
        </h1>
      )}
      {isConnected && (
        <div className="w-full h-[calc(100vh-8rem)] overflow-y-auto border-2 border-yellow-500">
          <MessagesLogs messages={messages} />
        </div>
      )}
      <div className="absolute bottom-0">
        <MessageInput onSendMessage={handleSentMessage} />
      </div>
    </main>
  );
};

export default GlobalChat;
