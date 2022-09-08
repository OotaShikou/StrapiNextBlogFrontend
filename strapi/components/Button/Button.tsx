import React from "react";

type Props = {
  outlined?: boolean;
  size?: 'small' | 'middle';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  outlined = false,
  size = 'middle',
  children,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`
        rounded-sm
        text-xs
        h-8
        shadow-md
        hover:shadow-lg
        transition-all
        duration-150
        ${size === 'middle'
          ? 'px-5 py-1'
          : 'px-3 py-1 text-sm'
        }
        ${outlined
          ? 'border border-purple-800 text-purple-800 hover:bg-purple-100'
          : 'border-none bg-purple-800 text-white hover:bg-purple-700'
        }
      `}
      onClick={onClick}
      >
        {children}
    </button>
  );
};