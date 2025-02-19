'use client';
import { Alert } from "@/interfaces";
import { useState, useRef, useEffect } from "react";
import { FiBell, FiMessageCircle, FiX } from "react-icons/fi"; // Added FiMessageCircle for comment icon

interface AlertsDropdownProps {
  unseenAlerts?: number;
  alerts?: Alert[];
  onAlertClick: (alertId: string) => void;
  handleDeleteAlert: (alertId: string) => void; // Added a delete function
}

export const AlertsDropdownMenu = ({
  unseenAlerts = 0,
  alerts = [],
  onAlertClick,
  handleDeleteAlert,
}: AlertsDropdownProps) => {
  console.log(alerts);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle adding a comment (currently just logs the action)
  const handleAddComment = (companyName: string) => {
    console.log(`Open modal for comment about ${companyName}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative flex items-center"
        onClick={toggleDropdown}
        aria-label="Alerts"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-white font-bold relative">
          <FiBell className="w-4 h-4 text-slate-800" />
          {unseenAlerts > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="absolute -right-10 mt-3 w-80 bg-white border border-gray-200 rounded z-50 shadow-md">
          <ul className="divide-y divide-gray-200">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <li
                  key={alert.id}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    if (onAlertClick) onAlertClick(alert.id);

                    // If the alert type is COMMENT_PENDING, open comment modal
                    if (alert.type === 'COMMENT_PENDING' && alert.company?.name) {
                      handleAddComment(alert.company.name);
                    }
                  }}
                >
                  <div className="flex-1">
                    <p className="text-xs text-gray-700">
                      <div className="inline-flex items-center space-x-1">
                        <span>
                          <FiMessageCircle className="w-4 h-4 text-gray-600" />
                        </span>
                        <span className="flex-shrink-0">Agregar comentario sobre </span>
                        <span className="truncate font-semibold max-w-full">{alert.company?.name}</span>
                        </div>
                    </p>
                  </div>

                  {/* Delete button ('x') */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the alert click handler
                      if (handleDeleteAlert) handleDeleteAlert(alert.id);
                    }}
                    className="text-xs text-gray-500"
                    aria-label="Delete Alert"
                  >
                    <FiX className="w-4 h-4 ml-1" />
                  </button>
                </li>
              ))
            ) : (
              <li className="p-2 text-xs text-gray-500">
                No tienes notificaciones
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
