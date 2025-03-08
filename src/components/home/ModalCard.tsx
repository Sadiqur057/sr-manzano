import Image from "next/image";

const ModalCard = ({ children = <></>, image, onClose }) => {
  return (
    <div className="relative w-[272px] overflow-hidden">
      <Image src={image} alt="status" className="w-full" />
      <button
        onClick={onClose}
        className="bg-[#d3484b] text-black aspect-square rounded-full absolute top-3 right-3 w-6 p-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      {children}
    </div>
  );
};
export default ModalCard;
