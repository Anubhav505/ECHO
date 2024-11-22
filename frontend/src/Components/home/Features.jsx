import React from 'react';
import { Video, Users, Globe2, Shield } from 'lucide-react';

const features = [
  {
    icon: <Video className="w-6 h-6 text-blue-600" />,
    title: "HD Video Conferencing",
    description: "Crystal clear video meetings with up to 1000 participants"
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Team Collaboration",
    description: "Built-in chat, screen sharing, and breakout rooms"
  },
  {
    icon: <Globe2 className="w-6 h-6 text-blue-600" />,
    title: "Global Reach",
    description: "Connect with anyone, anywhere in the world"
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Enterprise Security",
    description: "End-to-end encryption for all your meetings"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features that make online meetings and collaboration seamless
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}