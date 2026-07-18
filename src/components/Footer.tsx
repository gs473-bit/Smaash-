import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy text-white py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 border-b border-white/20 pb-12 mb-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-8 h-8 text-shuttle-lime" strokeWidth={3} />
            <span className="font-heading font-black text-2xl tracking-tight">SMASH<span className="text-shuttle-lime">POINT</span></span>
          </div>
          <p className="text-white/60 font-medium max-w-sm">
            The premier destination for badminton training in Maharashtra. Play hard, train harder.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-wider text-vivid-teal">Links</h4>
          <ul className="space-y-3 font-medium text-white/70">
            <li><Link to="/programs" className="hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/centres" className="hover:text-white transition-colors">Centers</Link></li>
            <li><Link to="/coaches" className="hover:text-white transition-colors">Coaches</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold text-lg mb-4 uppercase tracking-wider text-vivid-teal">Legal</h4>
          <ul className="space-y-3 font-medium text-white/70">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} SmashPoint Academy</p>
        <p className="mt-2 md:mt-0">Never Stop Moving.</p>
      </div>
    </footer>
  );
}
