"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

export default function WhyChildrenLoveIt() {
  return (
    <>
      {/* Image section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden mb-6 shadow-lg"
      >
        <ImageWithFallback
          src="/images/photo-mama-kid-reading-book.jpg"
          alt="Children reading with parents"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
      </motion.div>

      {/* Two motion boxes */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Left motion box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.03 }}
          viewport={{ once: true }}
          className="flex-1 flex"
        >
          <div
            className="bg-gradient-to-br from-[#F8FAF5] to-[#E7EFDF] border border-[#C9D8C1] 
                          rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full"
          >
            <h3 className="font-semibold text-[#3D4635] mb-3 text-left">
              Why children love it
            </h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "They become the main character",
                "Choose their own adventure",
                "Stories grow with them",
              ].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right motion box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          viewport={{ once: true }}
          className="flex-1 flex"
        >
          <div
            className="bg-gradient-to-br from-[#F8FAF5] to-[#E7EFDF] border border-[#C9D8C1]
                          rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full"
          >
            <h3 className="font-semibold text-gray-900 mb-3 text-left">
              Parents love it too
            </h3>
            <ul className="space-y-2 text-gray-700">
              {[
                `"My child asks for new stories every night!"`,
                `"Finally, stories that match their imagination!"`,
              ].map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
}
