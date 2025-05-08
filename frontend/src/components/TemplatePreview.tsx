import { useState, useEffect } from "react";

const TemplatePreview = () => {
  // We'll update this component to get the template data from a context in a real implementation
  // For now, we'll just show a static preview

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Template Preview</h2>

      <div className="bg-[#e6f7d9] p-4 rounded-lg max-w-md mx-auto">
        <div className="flex items-start space-x-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="flex-grow">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="font-semibold text-sm">Sample Business</div>
              <div className="text-xs text-gray-500 mb-2">Template Preview</div>

              {/* Header */}
              <div className="font-semibold mb-2">
                Your appointment is confirmed!
              </div>

              {/* Body */}
              <div className="text-sm mb-2">
                Hello John,
                <br />
                Your appointment for dental cleaning has been scheduled for May
                15th at 2:00 PM.
                <br />
                <br />
                Please arrive 10 minutes early to complete any paperwork.
              </div>

              {/* Footer */}
              <div className="text-xs text-gray-500 mt-2">
                Thank you for choosing our services
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-1 space-y-1">
              <button className="w-full bg-[#128c7e] text-white text-sm py-1.5 px-3 rounded">
                Reschedule Appointment
              </button>
              <button className="w-full bg-[#128c7e] text-white text-sm py-1.5 px-3 rounded">
                Cancel Appointment
              </button>
            </div>

            <div className="text-xs text-gray-500 mt-1 text-right">
              12:30 PM
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-3 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">About Template Preview</h3>
        <p className="text-sm text-gray-600">
          This is a mockup of how your template might appear in WhatsApp. The
          actual appearance may vary based on Twilio's processing and WhatsApp's
          rendering on different devices.
        </p>
      </div>
    </div>
  );
};

export default TemplatePreview;
