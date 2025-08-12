import Lottie from "lottie-react";
import aanimation from "../../public/Lottie1.json";
import animationlottie from "../../public/Lottie2.json";

const Chat = ({ msg }) => {
  const isUser = msg.sender === "user";
  return (
    <div>
      {isUser ? (
        <div className="flex justify-end mb-4">
          <div className="chat chat-end flex  items-center space-x-2">
            <div className="flex flex-col items-center">
              <div className="chat-image avatar mb-4">
                <div className="w-30 rounded-full">
                  {/* alt="User avatar" */}
                  <Lottie animationData={animationlottie} loop={true} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h2 className="chat-bubble max-w-xs text-md backdrop-blur-md bg-gray-200 text-black p-3 rounded-lg">
                {msg.text}
              </h2>
              <time className="text-xs text-right opacity-50">
                {new Date().toLocaleTimeString()}
              </time>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat chat-start flex items-start space-x-2">
          <div className="flex flex-col items-center">
            <div className="chat-image avatar mb-1">
              <div className="w-30 rounded-full">
                {/* alt="Bot avatar */}
                <Lottie animationData={aanimation} loop={true} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="chat-bubble max-w-xs bg-gray-200 text-black p-3 rounded-lg">
              {msg.text}
            </div>
            <time className="text-xs text-right opacity-50">
              {new Date().toLocaleTimeString()}
            </time>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
