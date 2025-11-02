import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary to-[#156B3A] text-white mt-20">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L60 20 L40 40 L20 20 Z M0 40 L20 60 L40 80 M40 40 L60 60 L80 80 M80 40 L60 60 L40 80" 
                    stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4">Kewirausahaan Rohis</h3>
            <p className="text-sm text-white/70">
              Menyediakan makanan dan minuman halal terbaik untuk mendukung kegiatan Rohis sekolah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Hubungi Kami</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+62 858-1456-7851</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 flex-shrink-0" />
                <span>@radar10jkt</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>SMKN 10 Jakarta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70">
            © 2025 RADAR-SMKN10.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:rohis@sekolah.sch.id"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
