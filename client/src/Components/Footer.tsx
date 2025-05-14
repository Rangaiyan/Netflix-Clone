import React from "react";
import { FiChevronRight } from "react-icons/fi";

function Footer() {
  return (
    <>
      <div className="py-10 px-[10%]">
        {/* Email Section Centered */}
        <div className="flex flex-col items-center text-center">
          <p className="max-w-xl pb-4">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row items-center gap-3 px-4 w-full max-w-2xl">
              <input
                type="email"
                placeholder="Email address"
                className="w-full md:w-[500px] px-6 py-3 rounded text-white bg-black placeholder-white focus:outline-none opacity-50 border"
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 font-bold text-white bg-red-600 hover:bg-red-500 rounded text-lg px-6 py-3 transition"
              >
                Get Started
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links and Info */}
        <div className="bg-black text-neutral-400 text-sm px-10 pt-10 pb-20 mt-10">
          <p className="mb-6">
            Questions? Call <span className="underline">000-800-919-1743</span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <p className="underline cursor-pointer">FAQ</p>
              <p className="underline cursor-pointer">Investor Relations</p>
              <p className="underline cursor-pointer">Privacy</p>
              <p className="underline cursor-pointer">Speed Test</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Help Centre</p>
              <p className="underline cursor-pointer">Jobs</p>
              <p className="underline cursor-pointer">Cookie Preferences</p>
              <p className="underline cursor-pointer">Legal Notices</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Account</p>
              <p className="underline cursor-pointer">Ways to Watch</p>
              <p className="underline cursor-pointer">Corporate Information</p>
              <p className="underline cursor-pointer">Only on Netflix</p>
            </div>
            <div className="space-y-2">
              <p className="underline cursor-pointer">Media Centre</p>
              <p className="underline cursor-pointer">Terms of Use</p>
              <p className="underline cursor-pointer">Contact Us</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mb-4">
            <select className="bg-transparent border border-gray-400 text-gray-200 px-2 py-1 rounded">
              <option>English</option>
              <option>हिंदी</option>
            </select>
          </div>

          <p>Netflix India</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
