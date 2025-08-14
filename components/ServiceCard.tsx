import React from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon?: React.ReactNode;
  iconType?:
    | "residential"
    | "commercial"
    | "roofing"
    | "concrete"
    | "electrical"
    | "plumbing"
    | "remodeling"
    | "custom";
  price?: {
    starting: string;
    unit: string;
  };
  href: string;
  badge?: string;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

// Default icons for different service types
const getServiceIcon = (type: string) => {
  const iconClass = "w-8 h-8";

  switch (type) {
    case "residential":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      );
    case "commercial":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      );
    case "roofing":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 10h6M9 14h6"
          />
        </svg>
      );
    case "concrete":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      );
    case "electrical":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    case "plumbing":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      );
    case "remodeling":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      );
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  icon,
  iconType = "custom",
  price,
  href,
  badge,
  variant = "default",
  className = "",
}) => {
  const displayIcon = icon || getServiceIcon(iconType);
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <div
      className={`
      relative bg-white rounded-lg shadow-construction border border-gray-200 
      hover:shadow-xl hover:border-red-600/20 transition-all duration-300 
      group overflow-hidden service-card min-h-[350px]
      ${isFeatured ? "ring-2 ring-red-600 shadow-xl" : ""}
      ${className}
    `}
      style={{
        contain: 'layout style',
        aspectRatio: isCompact ? '1 / 1.1' : '1 / 1.2'
      }}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Custom Badge */}
      {badge && !isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-yellow-400 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      <div className={`p-6 ${isCompact ? "p-4" : "p-6"}`}>
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4 min-h-[60px]">
          <div
            className={`
            flex-shrink-0 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300
            ${
              isFeatured
                ? "bg-gradient-to-br from-red-600 to-orange-500 text-white"
                : "bg-yellow-100 text-green-700"
            }
          `}
          >
            {displayIcon}
          </div>

          <div className="flex-grow">
            <h3
              className={`font-bold text-green-700 group-hover:text-red-600 transition-colors duration-300 ${
                isCompact ? "text-lg" : "text-xl"
              }`}
            >
              {title}
            </h3>

            {price && (
              <div className="mt-1">
                <span className="text-lg font-bold text-red-600">
                  {price.starting}
                </span>
                <span className="text-sm text-gray-600 ml-1">{price.unit}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-gray-600 mb-4 leading-relaxed ${
            isCompact ? "text-sm" : "text-base"
          }`}
        >
          {description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <ul className="space-y-2">
            {features
              .slice(0, isCompact ? 3 : features.length)
              .map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <svg
                    className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            {isCompact && features.length > 3 && (
              <li className="flex items-start space-x-2 text-sm">
                <svg
                  className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-gray-600 font-medium">
                  +{features.length - 3} more services
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <a
            href={href}
            className={`
              block w-full text-center font-semibold py-3 px-4 rounded-lg 
              transition-all duration-300 transform group-hover:scale-105
              ${
                isFeatured
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                  : "bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              }
            `}
          >
            Get Free Quote
          </a>

          <div className="flex items-center justify-between text-sm">
            <a
              href={`${href}#details`}
              className="text-green-700 hover:text-red-600 font-medium transition-colors duration-200"
            >
              View Details →
            </a>

            <div className="flex items-center space-x-1 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>24hr response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={`h-1 bg-gradient-to-r transition-all duration-300 ${
          isFeatured
            ? "from-red-600 via-orange-500 to-yellow-400"
            : "from-green-700 via-green-500 to-yellow-400 opacity-0 group-hover:opacity-100"
        }`}
      ></div>
    </div>
  );
};

export default ServiceCard;
