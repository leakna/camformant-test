import React from "react";

const FormatBold: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1_49)">
        <path
          d="M13.5 8.99168C14.3083 8.43334 14.875 7.51668 14.875 6.66668C14.875 4.78334 13.4166 3.33334 11.5416 3.33334H6.33331V15H12.2C13.9416 15 15.2916 13.5833 15.2916 11.8417C15.2916 10.575 14.575 9.49168 13.5 8.99168ZM8.83331 5.41668H11.3333C12.025 5.41668 12.5833 5.97501 12.5833 6.66668C12.5833 7.35834 12.025 7.91668 11.3333 7.91668H8.83331V5.41668ZM11.75 12.9167H8.83331V10.4167H11.75C12.4416 10.4167 13 10.975 13 11.6667C13 12.3583 12.4416 12.9167 11.75 12.9167Z"
          fill="#27384C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_49">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FormatBold;
