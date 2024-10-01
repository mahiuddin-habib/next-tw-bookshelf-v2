import * as React from 'react';

interface LoadingSpinnerProps {
  size?: number; // Optional size prop
}

const LoadingSpinner: React.FC<
  LoadingSpinnerProps & React.SVGProps<SVGSVGElement>
> = ({ size = 24, ...props }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        stroke="#E5E7EB"
        viewBox="0 0 24 24" // Keeps proportions for any size
        {...props}
      >
        <style>
          {`@keyframes spinner_zKoa{to{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,to{stroke-dasharray:42 150;stroke-dashoffset:-59}}`}
        </style>
        <g
          style={{
            transformOrigin: 'center',
            animation: 'spinner_zKoa 2s linear infinite',
          }}
        >
          <circle
            cx={12}
            cy={12}
            r={9.5}
            fill="none"
            strokeWidth={3}
            style={{
              strokeLinecap: 'round',
              animation: 'spinner_YpZS 1.5s ease-in-out infinite',
            }}
          />
        </g>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
