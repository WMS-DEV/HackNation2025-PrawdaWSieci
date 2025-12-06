import React from "react";
import EagleIcon from "../assets/mObywatelLogo.svg?react";

interface DocumentCardProps {
  title: string;
  colorClass: string;
  icon?: React.ReactNode;
  heightClass?: string;
  zIndexClass?: string;
  lastUpdated?: string;
  isExpanded?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  colorClass,
  icon,
  heightClass = "h-48",
  zIndexClass = "z-0",
}) => {
  return (
    <div
      className={`relative w-full ${heightClass} ${colorClass} rounded-2xl p-4 shadow-lg text-white flex flex-col justify-between overflow-hidden shrink-0 ${zIndexClass}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg max-w-[70%] leading-tight">
          {title}
        </h3>
        {icon || <EagleIcon className="w-6 h-6 text-white" />}
      </div>

      {/* Decorative background elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default DocumentCard;
