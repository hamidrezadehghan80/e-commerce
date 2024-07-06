import { createPortal } from "react-dom";
import { XCircle } from "@phosphor-icons/react";
import { cn } from "../../libs/utils";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onChange: (isOpen: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  open,
  onChange,
  title,
  children,
  className,
}: ModalProps) {
  if (!open) return null;

  const handleClose = () => {
    onChange(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div
        className={cn(
          "relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md",
          className
        )}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XCircle size={24} />
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body
  );
}
