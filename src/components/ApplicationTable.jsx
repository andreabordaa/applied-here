"use client";

import { useState } from "react";

const STATUS_STYLES = {
  Applied: "text-[#6AABED] bg-[#6AABED]/10",
  Interview: "text-[#AD5FDA] bg-[#AD5FDA]/10",
  Challenge: "text-[#DBC66A] bg-[#DBC66A]/10",
  Offer: "text-[#72D562] bg-[#72D562]/10",
  Rejected: "text-[#DA2C2C] bg-[#DA2C2C]/10",
};

export default function ApplicationsTable({ applications }) {
  const recent = applications.slice(0, 8);

  return (
    <div className="bg-[#3F3F3F] border border-gray-700 rounded-2xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-base font-semibold">
          Recent Applications
        </h2>
      </div>
      <div className="border-t border-gray-700 pt-4">
        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-gray-400 text-sm mb-5">No applications yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-4 px-3 pb-2">
              {/* Table header */}
              <span className="col-span-4 text-gray-500 text-xs font-medium">
                Role
              </span>
              <span className="col-span-3 text-gray-500 text-xs font-medium">
                Company
              </span>
              <span className="col-span-2 text-gray-500 text-xs font-medium">
                Location
              </span>
              <span className="col-span-2 text-gray-500 text-xs font-medium">
                Date
              </span>
              <span className="col-span-1 text-gray-500 text-xs font-medium">
                Status
              </span>
            </div>
            {/* Rows */}
            {recent.map((app) => (
              <div
                key={app.id}
                className="grid grid-cols-12 gap-4 px-3 py-3 rounded-xl bg-white/8 hover:bg-white/5 transition-colors"
              >
                <span className="col-span-4 text-white text-sm truncate">
                  {app.role}
                </span>
                <span className="col-span-3 text-gray-400 text-sm truncate">
                  {app.company}
                </span>
                <span className="col-span-2 text-gray-400 text-sm truncate">
                  {app.location || "—"}
                </span>
                <span className="col-span-2 text-gray-400 text-sm">
                  {app.date_applied
                    ? new Date(app.date_applied).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </span>
                <span className="col-span-1">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[app.status] || ""}`}
                  >
                    {app.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
