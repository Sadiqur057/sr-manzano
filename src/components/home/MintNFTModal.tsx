"use client";

const MintNFTModal = ({ onClose, isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background Overlay - Closes modal when clicked */}
          <div
            className="absolute inset-0 bg-[#7a8061] bg-opacity-90"
            onClick={onClose}
          />

          {/* Modal Content - Prevents clicks from closing the modal */}
          <div
            className="relative z-10 max-w-xs w-[90%] transition-all duration-300 scale-100 p-6"
            onClick={(e) => e.stopPropagation()} 
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default MintNFTModal;
