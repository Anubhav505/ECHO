import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect With Anyone, <span className="text-blue-600">Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional video conferencing for teams of all sizes. Simple,
            reliable, and secure meetings for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={"/dashboard"}>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                Start Meeting Now <ChevronRight className="ml-2 h-5 w-5" />
              </button> 
            </Link>
            <Link to={"/signup"}>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
                Sign Up Free
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&q=80&w=2000"
            alt="Video conference"
            className="rounded-xl shadow-2xl mx-auto"
          />
        </div>
      </div>
    </section>
  );
}