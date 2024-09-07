import React from "react";
import { motion } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        className="bg-white dark:bg-neutral-800 p-5 rounded-lg shadow-lg max-w-lg w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-end">
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
