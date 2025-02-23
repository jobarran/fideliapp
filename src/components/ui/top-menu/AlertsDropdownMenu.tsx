'use client';
import { Alert } from "@/interfaces";
import { useState, useRef, useEffect } from "react";
import { FiBell, FiStar, FiX } from "react-icons/fi"; // Removed unused imports

interface AlertsDropdownProps {
  unseenAlerts?: number;
  alerts?: Alert[];
  onAlertClick: (alertId: string, alertType: string) => void;
  handleDeleteAlert: (alertId: string) => void;
  setIsAlertDropdownOpen: (isAlertDropdownOpen: boolean) => void;
  isAlertDropdownOpen: boolean;
  handleDeleteAllSeen: () => void; // Added a handler for deleting all seen alerts
  handleMarkAllAsSeen: () => void; // Added a handler for marking all alerts as seen
  handleDeleteAll: () => void; // Added a handler for deleting all alerts
}

export const AlertsDropdownMenu = ({
  unseenAlerts = 0,
  alerts = [],
  onAlertClick,
  handleDeleteAlert,
  setIsAlertDropdownOpen,
  isAlertDropdownOpen,
  handleDeleteAllSeen,
  handleMarkAllAsSeen,
  handleDeleteAll
}: AlertsDropdownProps) => {

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsAlertDropdownOpen(!isAlertDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAlertDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAlertDropdownOpen]);

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
      {isAlertDropdownOpen && (
        <div className="absolute -right-10 mt-3 w-80 bg-white border border-gray-200 rounded z-50 shadow-md">
          <ul className="divide-y divide-gray-200">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <li
                  key={alert.id}
                  className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${alert.status === "NOT_SEEN" ? "bg-slate-100 border-l-4 border-slate-500" : ""
                    }`} // Highlighting NOT_SEEN alerts
                  onClick={() => {
                    if (onAlertClick) onAlertClick(alert.id, alert.type);
                  }}
                >
                  <div className="flex-1">
                    <p className="text-xs text-gray-700 flex items-center space-x-2">
                      <FiStar className="w-5 h-5 text-gray-600" />
                      <span>
                        Tu opinión importa, ¿Cómo fue tu experiencia con{" "}
                        <span className="font-semibold">{alert.company?.name}</span>?
                      </span>
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
                No tienes notificaciones nuevas
              </li>
            )}
          </ul>

          {/* Options for deleting/marking all alerts */}
          {/* Options for deleting/marking all alerts, only shown if there are alerts */}
          {alerts.length > 0 && (
            <div className="flex justify-between items-center p-2 text-xs text-slate-500">
              <button
                onClick={handleDeleteAllSeen}
                className="hover:text-red-600"
              >
                Eliminar vistas
              </button>
              <button
                onClick={handleMarkAllAsSeen}
                className="hover:text-slate-800"
              >
                Marcar como visto
              </button>
              <button
                onClick={handleDeleteAll}
                className="hover:text-red-600"
              >
                Eliminar todo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
