import React from "react";
import Link from "next/link";
import ThemeSwitch from "@/components/themeSwitch";
import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react";

// Removed the unused handleSubmit function. If it's needed, correct the typo and use it where applicable.

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="container mx-auto px-4">
        <div className="mt-8 border-t border-gray-300 pt-8 text-center text-gray-400 dark:border-gray-800">
          <div className="text-center text-sm">
            © {new Date().getFullYear()} Codewithhridoy. All rights
            reserved.
          </div>
          <ul className="mb-6 mt-4 flex items-center justify-center text-sm font-medium">
            <li>
              <Link
                href="/privacy-policy"
                className="me-4 text-gray-700 hover:underline dark:text-gray-400 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-condition"
                className="me-4 text-gray-700 hover:underline dark:text-gray-400 md:me-6">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:underline dark:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
          <div className="my-5 flex items-center justify-center">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
