import React from 'react';
import { Zap } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Host up to 100 participants", "40 minute limit on group meetings", "Basic support"]
  },
  {
    name: "Pro",
    price: "$149.90",
    features: ["Host up to 300 participants", "Unlimited meeting duration", "Cloud recording", "Admin controls"]
  },
  {
    name: "Business",
    price: "$199.90",
    features: ["Host up to 1000 participants", "Company branding", "Advanced admin controls", "24/7 support"]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible plans for teams and businesses of all sizes
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.price !== "Free" && <span className="text-gray-600">/year</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <Zap className="h-5 w-5 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg transition ${
                index === 1 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}