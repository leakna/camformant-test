"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import Background from "../background/background";
import socket from "@/utils/socketClient"; // Import the socket instance
import axiosInstance from "@/utils/axios";
// import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { formatDistanceToNow } from "date-fns";
import React from "react";
// import { Job } from "@/app/jobs/[id]/message/page";

interface conversation {
  _id: string;
  roomId: string;
  createdAt: Date;
  messages:
    | {
        _id: string;
        senderId: string;
        receiverId: string;
        message: string;
        createdAt: Date;
        updatedAt: Date;
        conversationId: string;
      }[]
    | [];
  participants:
    | {
        participantType: "User" | "Company";
        participantId: string;
        name?: string;
        profile?: string;
      }[]
    | [];
  updatedAt: Date;
}

interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  conversationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SkeletonLoader = () => (
  <div className="w-full p-4">
    {/* Message Skeleton */}
    <div className="space-y-2">
      <div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>
    </div>
  </div>
);

const Message = React.memo(
  ({
    userId,
    handleError,
    error,
    receiverId,
  }: {
    handleError: (text: string) => void;
    userId?: string;
    receiverId: string;
    error: string | null;
  }) => {
    const id = receiverId;
    const [isSend, setIsSend] = useState(false);

    const [messages, setMessages] = useState<Message[] | []>();
    const [inputMessage, setInputMessage] = useState<string>("");

    // Ref to track message container for scrolling
    const messageContainerRef = useRef<HTMLDivElement>(null);
    //

    //pagination for scroll
    const [paginationMessage, setPaginationMessage] = useState({
      currentPage: 0,
      totalPage: 0,
      limit: 0,
      skip: 0,
      totalMessages: 0,
    });

    const [conversations, setConversations] = useState<conversation | null>({
      _id: "",
      roomId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      participants: [],
      messages: [],
    });
    //
    // Play sound notification when a new message is received
    const playNotificationSound = useCallback(() => {
      if (typeof window !== "undefined") {
        const notificationTone = new Audio(
          "/iphone-sms-tone-original-mp4-5732.mp3"
        );
        notificationTone.play();
      }
    }, []);

    // Scroll to the bottom of the messages container
    const scrollToBottom = useCallback(() => {
      const container = messageContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, []);
    //todo:
    useEffect(() => {
      // Fetch messages
      const fetchConversations = async () => {
        try {
          const response = await axiosInstance.get(
            `http://localhost:4000/v1/messages/${receiverId}?page=1`
          );
          const data = await response.data;
          if (response.status === 200 && data) {
            const conversation = data.conversation;
            setConversations(conversation);

            setPaginationMessage({
              currentPage: data.currentPage,
              totalPage: data.totalPage,
              limit: data.limit,
              skip: data.skip,
              totalMessages: data.totalMessages,
            });
            setMessages(conversation.messages);
          } else {
            handleError("Message not found");
          }
        } catch (error) {
          console.error("chat error: ", error);
          handleError("Failed to fetch conversation data");
        }
      };
      if (receiverId) {
        fetchConversations();
      }
    }, [receiverId]);
    // Join the room of conversation
    // useEffect(() => {
    //   if (!conversationId) return;

    //   socket.emit("joinRoom", { conversationId });

    //   const handleReceiveMessage = (message: Message) => {
    //     console.log("Received message:", message);
    //     setMessages((prevMessages) => [...prevMessages, message]);
    //     scrollToBottom(); // Ensure the latest message is visible
    //     playNotificationSound();
    //   };

    //   socket.on("receiveMessage", handleReceiveMessage);

    //   // Clean up on unmount
    //   return () => {
    //     socket.emit("leaveRoom", { conversationId });
    //     socket.off("receiveMessage", handleReceiveMessage);
    //   };
    // }, [conversationId, playNotificationSound, scrollToBottom]);

    // Fetch messages when roomId changes
    // useEffect(() => {
    //   if (!conversationId) return;

    //   // Fetch messages from the backend
    //   const fetchMessages = async () => {
    //     try {
    //       const response = await axiosInstance.get(
    //         `${API_ENDPOINTS.CONVERSATIONS}/${conversationId}/messages`
    //       );
    //       setMessages(response.data.data);
    //     } catch (error) {
    //       console.error("Failed to fetch messages:", error);
    //     }
    //   };

    //   fetchMessages();
    //   setIsSend(false);
    // }, [conversationId, isSend]);

    // Scroll to the bottom whenever messages change
    // useEffect(() => {
    //   scrollToBottom();
    // }, [messages, scrollToBottom]);

    const sendMessage = async () => {
      if (inputMessage.trim() === "") return;
      //todo: send message
      const newMessage: Message = {
        message: inputMessage,
        senderId: userId!,
        receiverId: receiverId,
        conversationId: conversationId!,
      };

      // Emit the message to the server
      socket.emit("sendMessage", newMessage);

      // Play the sending sound & Clear the input
      playNotificationSound();
      setInputMessage("");
      setIsSend(true);
    };

    if (!receiverId && !error) {
      return (
        <div className="flex flex-col w-full h-screen">
          <Background>
            <SkeletonLoader />
          </Background>
        </div>
      );
    }

    return (
      <>
        {/*body section: render message*/}
        <div className="-mt-28">
          <div
            className="overflow-auto w-screen h-[70vh] p-4 rounded-md xl:h-[60vh] pb-10"
            ref={messageContainerRef} // Add ref here
          >
            {messages &&
              messages.map((message, idx) => (
                <div
                  key={message._id}
                  className={`${messages.length - 1 === idx ? "mb-8" : "mb-2"} flex ${message.senderId === userId ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs break-words ${
                      message.senderId === userId
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {message.message}
                    <div
                      className={`text-xs ${
                        message.senderId === userId
                          ? "text-left text-gray-400"
                          : "text-right text-gray-300"
                      } mt-1`}
                    >
                      {formatDistanceToNow(new Date(message.createdAt!), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer section: message input */}
        <div className="absolute left-0 flex items-center justify-center w-full py-4 bg-white bottom-9 xl:w-full">
          <div className="relative flex items-center justify-center w-full p-5">
            <input
              className="w-full p-4 border border-gray-200 shadow-sm rounded-3xl"
              type="text"
              placeholder="Text Message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <span
              className="absolute text-2xl cursor-pointer right-7"
              onClick={sendMessage}
            >
              <IoMdSend />
            </span>
          </div>
        </div>
      </>
    );
  }
);

// Add displayName for the component
Message.displayName = "MessageComponent";

export default Message;
