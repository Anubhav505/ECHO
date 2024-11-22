import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users worldwide and experience better online
            meetings
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={"/signup"}>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
                Sign Up Free <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}