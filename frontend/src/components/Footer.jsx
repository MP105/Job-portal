import React from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo Section */}
          <div>
            <h1 className="text-3xl font-bold">
              Job<span className="text-purple-600">Portal</span>
            </h1>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Find your dream job, connect with recruiters,
              and build your career with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-3 text-gray-600">
              <li className="hover:text-purple-600 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-purple-600 cursor-pointer transition">
                Jobs
              </li>

              <li className="hover:text-purple-600 cursor-pointer transition">
                Browse
              </li>

              <li className="hover:text-purple-600 cursor-pointer transition">
                Companies
              </li>

              <li className="hover:text-purple-600 cursor-pointer transition">
                Contact
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Connect With Us
            </h2>

            <p className="text-gray-500 mb-4">
              Follow us on social media for latest job updates.
            </p>

            <div className="flex gap-4">

              <a
                href="https://www.linkedin.com"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://github.com/MP105"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white flex items-center justify-center transition"
              >
                <FaEnvelope size={18} />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;