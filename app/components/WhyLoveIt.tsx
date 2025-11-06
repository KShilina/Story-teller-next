// "use client";

// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { motion } from "framer-motion";

// export default function WhyChildrenLoveIt() {
//   return (
//     <>
//       {/* Image section */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ once: true }}
//         className="relative rounded-2xl overflow-hidden mb-6 shadow-lg"
//       >
//         <ImageWithFallback
//           src="/images/photo-mama-kid-reading-book.jpg"
//           alt="Children reading with parents"
//           className="w-full h-64 object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
//       </motion.div>

//       {/* Two motion boxes */}
//       <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-3xl mx-auto">

//         {/* Left motion box */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: 0.1 }}
//           whileHover={{ scale: 1.03 }}
//           viewport={{ once: true }}
//           className="flex-1 flex"
//         >
//           <div
//             className=" bg-white border border-[#C9D8C1] 
//                           rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full"
//           >
//             <h3 className="font-semibold text-[#3D4635] mb-3 text-center">
//               Why children love it
//             </h3>
//             <ul className="space-y-2 text-gray-700">
//   {[
//     "– They become the main character",
//     "– Choose their own adventure",
//     "– Stories grow with them",
//   ].map((item) => (
//     <li key={item} className="flex items-center space-x-2 italic">
//       <span>{item}</span>
//     </li>
//   ))}
// </ul>

//           </div>
//         </motion.div>

      
//        {/* Right motion box */}
// <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.4, delay: 0.2 }}
//   whileHover={{ scale: 1.03 }}
//   viewport={{ once: true }}
//   className="flex-1 flex"
// >
//   <div
//     className=" bg-white border border-[#C9D8C1]
//                 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-full"
//   >
//     <h3 className="font-semibold text-[#3D4635] mb-3 text-center">
//       Parents love it too
//     </h3>

//     <div className="space-y-4 text-gray-700">
//       <div>
//         <p className="italic text-gray-800">
//           “My child asks for new stories every night!”
//         </p>
//         <p className="text-sm text-gray-600 mt-1">– Katya Sh., Parent of a 4-year-old</p>
//       </div>

//       <div>
//         <p className="italic text-gray-800">
//           “Finally, stories that match their imagination!”
//         </p>
//         <p className="text-sm text-gray-600 mt-1">– Ilya N., Father of two</p>
//       </div>
//     </div>
//   </div>
// </motion.div>

//       </div>
//     </>
//   );
// }


"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";
import React from "react";
import MotionCard from "./MotionCard";

export const WhyLoveIt: React.FC = () => {
  const kidsPoints: string[] = [
    "– They become the main character",
    "– Choose their own adventure",
    "– Stories grow with them",
  ];

  const parentReviews: { quote: string; author: string }[] = [
    {
      quote: "My child asks for new stories every night!",
      author: "– Katya Sh., Parent of a 4-year-old",
    },
    {
      quote: "Finally, stories that match their imagination!",
      author: "– Ilya N., Father of two",
    },
  ];

  return (
    <>
      {/* Header image */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent" />
      </motion.div>

      {/* Motion cards */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch max-w-3xl mx-auto">
        <MotionCard title="Why children love it" delay={0.1}>
          <ul className="space-y-2 text-gray-700">
            {kidsPoints.map((point) => (
              <li key={point} className="flex items-center space-x-2 italic">
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </MotionCard>

        <MotionCard title="Parents love it too" delay={0.2}>
          <div className="space-y-4 text-gray-700">
            {parentReviews.map(({ quote, author }) => (
              <div key={author}>
                <p className="italic text-gray-800">“{quote}”</p>
                <p className="text-sm text-gray-600 mt-1">{author}</p>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </>
  );
};

export default WhyLoveIt;
