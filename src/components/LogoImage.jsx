import React from "react";

export default function LogoImage() {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 180 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Car silhouette */}
      <path
        d="M30 60 Q40 40 90 40 Q140 40 150 60"
        stroke="#1e293b"
        strokeWidth="4"
        fill="none"
      />
      <circle
        cx="45"
        cy="65"
        r="8"
        fill="#1e293b"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle
        cx="135"
        cy="65"
        r="8"
        fill="#1e293b"
        stroke="#fff"
        strokeWidth="2"
      />
      {/* Pin */}
      <g>
        <ellipse cx="90" cy="38" rx="18" ry="18" fill="#1e293b" />
        <path
          d="M90 56 Q86 48 90 38 Q94 48 90 56 Z"
          fill="#1e293b"
        />
        {/* Car icon inside pin */}
        <rect x="80" y="30" width="20" height="8" rx="3" fill="#fff" />
        <rect
          x="85"
          y="34"
          width="10"
          height="3"
          rx="1.5"
          fill="#1e293b"
        />
      </g>
      {/* Text */}
      <text
        x="50%"
        y="88"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="700"
        fontSize="20"
        fill="#222"
      >
        CarGas
      </text>
      <text
        x="50%"
        y="88"
        textAnchor="middle"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="700"
        fontSize="20"
        fill="#2563eb"
        dx="48"
      >
        &Drive
      </text>
    </svg>
  );
}
