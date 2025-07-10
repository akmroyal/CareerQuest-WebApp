import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';


const Footer = () => {
  const quickLinks = [
    { name: 'Find Jobs', href: '#' },
    { name: 'Post a Job', href: '#' },
    { name: 'Career Advice', href: '#' },
    { name: 'For Employers', href: '#' },
  ];

  const categories = [
    { name: 'Technology', href: '#' },
    { name: 'Healthcare', href: '#' },
    { name: 'Finance', href: '#' },
    { name: 'Education', href: '#' },
  ];

  const contact = [
    { icon: Mail, text: 'support@jobquest.com' },
    { icon: Phone, text: '+91 9818084104' },
    { icon: MapPin, text: 'New Delhi, IND, 110052' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Job Alerts</h3>
              <p className="text-gray-600">Get the latest jobs delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2] flex-1 md:w-64"
              />
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-[#6A38C2]" />
              <h2 className="text-xl font-bold">Job Quest</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Connecting talented professionals with their dream careers. Your journey to success starts here.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contact.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-gray-600">
                  <Icon className="h-4 w-4" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Job Quest. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;