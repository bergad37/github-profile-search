import { CiCircleRemove } from 'react-icons/ci';

const MessageCard = ({ message, isVisible, handleReset }) => {
  return (
    isVisible && (
      <div
        className={`flex space-x-4 max-w-md mx-auto mb-4 flex items-center justify-center rounded-md bg-[#FF0000] bg-opacity-10 p-3 text-sm font-light text-gray-dark`}
      >
        <p>{message}</p>
        <CiCircleRemove
          size={20}
          className="cursor-pointer"
          onClick={handleReset}
        />
      </div>
    )
  );
};

export default MessageCard;
