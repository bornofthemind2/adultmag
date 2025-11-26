import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
        <HelpCircle className="text-gold-500" /> Frequently Asked Questions
      </h1>
      
      <div className="space-y-6">
        <div className="bg-dark-800 p-6 rounded border border-dark-700">
            <h3 className="text-gold-500 font-bold mb-2">How discreet is the shipping?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Extremely discreet. All items are shipped in plain, brown or white boxes/envelopes. There are no logos, branding, or indication of the contents on the exterior. The return address is listed simply as "VV Logistics" or "Fulfillment Center".
            </p>
        </div>

        <div className="bg-dark-800 p-6 rounded border border-dark-700">
            <h3 className="text-gold-500 font-bold mb-2">What will appear on my credit card statement?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Your privacy is our priority. Charges will appear as "VV LOGISTICS" or "VINTAGE MEDIA". There is no reference to adult content on your billing statement.
            </p>
        </div>

        <div className="bg-dark-800 p-6 rounded border border-dark-700">
            <h3 className="text-gold-500 font-bold mb-2">How do the Digital NFTs work?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                When you purchase a digital version, you receive a unique token on the Ethereum blockchain representing ownership of that digital asset. This grants you access to a high-resolution download of the issue. You can pay using Credit Card (USD) or Crypto.
            </p>
        </div>

        <div className="bg-dark-800 p-6 rounded border border-dark-700">
            <h3 className="text-gold-500 font-bold mb-2">What is the condition of the magazines?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Unless stated otherwise, all magazines are in Very Good to Fine condition. We inspect every issue for tears, missing pages, or water damage. Specific collector notes are included on the product page.
            </p>
        </div>

        <div className="bg-dark-800 p-6 rounded border border-dark-700">
            <h3 className="text-gold-500 font-bold mb-2">Do you ship internationally?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
                Yes, we ship to most countries where import of adult material is legal. It is the buyer's responsibility to know the laws of their region regarding the importation of adult publications.
            </p>
        </div>
      </div>
    </div>
  );
};