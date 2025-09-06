import React from "react";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaRobot, FaUserShield, FaChartLine } from "react-icons/fa";

const steps = [
  {
    title: "Global Partner Onboarding",
    description: "Our global partners securely onboard overdue accounts onto our encrypted, centralized platform from anywhere in the world.",
    icon: <FaUsers className="text-white" size={24} />,
  },
  {
    title: "AI-Powered Global Assignment",
    description: "Our proprietary AI analyzes each case, instantly assigning it to the best-suited, certified agent in our vast global network based on location, expertise, and local regulations.",
    icon: <FaRobot className="text-white" size={24} />,
  },
  {
    title: "Compliant Cross-Border Reconstruction",
    description: "Our agents engage with defaulters following the highest ethical standards and international compliance protocols, ensuring your brand reputation is protected.",
    icon: <FaUserShield className="text-white" size={24} />,
  },
  {
    title: "Real-Time Global Dashboard",
    description: "Track the progress of all your international cases 24/7 through our transparent, real-time dashboard, offering live updates, communication logs, and performance analytics.",
    icon: <FaChartLine className="text-white" size={24} />,
  },
];

const StepItem = ({ step, index }) => {
  const isReversed = index % 2 !== 0;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="relative">
      <div className={`flex items-center ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>

        <div className="w-5/12">
          <div
            className={`
              bg-gray-50 p-6 rounded-lg shadow-lg border-l-4 
              ${isReversed ? 'border-[#1656A0]' : 'border-green-600'}
              transition-all duration-700 ease-in-out transform
              hover:scale-105 hover:-translate-y-2
              ${inView ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? 'translate-x-10' : '-translate-x-10'}`}
            `}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>

        <div className="w-2/12"></div>
      </div>

      <div
        className={`
          absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
          w-14 h-14 rounded-full flex items-center justify-center 
          ${isReversed ? 'bg-[#1656A0]' : 'bg-green-600'}
          transition-all duration-500 ease-in-out transform
          ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}
      >
        {step.icon}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="process" className="bg-white py-20 px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Our Intelligent Reconstruction Process
        </h2>
        <p className="text-center text-lg text-gray-600 mb-20 max-w-3xl mx-auto">
          From onboarding to resolution, our platform provides a seamless, transparent, and technology-driven workflow.
        </p>

        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200" style={{ transform: 'translateX(-50%)' }}></div>
          <div className="space-y-16">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

// import React from "react";
// import { useInView } from "react-intersection-observer";
// import { FaClipboardList, FaPalette, FaCode, FaRocket } from "react-icons/fa";

// const steps = [
//   {
//     title: "1. Consultation & Planning",
//     description: "We start by diving deep into your goals. Our experts collaborate with you to define the project scope, roadmap, and success metrics for your custom solution.",
//     icon: <FaClipboardList className="text-white" size={24} />,
//     theme: {
//       color: "bg-blue-600",
//       border: "border-blue-500",
//     },
//   },
//   {
//     title: "2. Design & Prototyping",
//     description: "Our team designs an intuitive, user-centric interface. We create interactive prototypes that allow you to experience the solution before development begins.",
//     icon: <FaPalette className="text-white" size={24} />,
//     theme: {
//       color: "bg-purple-600",
//       border: "border-purple-500",
//     },
//   },
//   {
//     title: "3. Development & Integration",
//     description: "Using agile methodologies, we build your solution with clean, scalable code and ensure it integrates seamlessly with your existing systems.",
//     icon: <FaCode className="text-white" size={24} />,
//     theme: {
//       color: "bg-green-500",
//       border: "border-green-500",
//     },
//   },
//   {
//     title: "4. Deployment & Support",
//     description: "We handle the full deployment to a secure infrastructure. After launch, we provide ongoing support and strategic insights to help you scale and adapt.",
//     icon: <FaRocket className="text-white" size={24} />,
//     theme: {
//       color: "bg-amber-500",
//       border: "border-amber-500",
//     },
//   },
// ];

// const StepItem = ({ step, index }) => {
//   const isReversed = index % 2 !== 0;
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.2,
//   });

//   return (
//     <div ref={ref} className="relative">
//       {/* --- Mobile View (Simple Stack) --- */}
//       <div className="md:hidden flex items-center gap-6">
//         <div
//           className={`
//                         w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center 
//                         ${step.theme.color}
//                         transition-all duration-700 ease-out transform
//                         ${inView ? "opacity-100 scale-100" : "opacity-0 scale-50"}
//                     `}
//         >
//           {step.icon}
//         </div>
//         <div
//           className={`
//                         bg-gray-800 p-6 rounded-lg shadow-lg w-full 
//                         transition-all duration-700 ease-out transform
//                         ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
//                     `}
//         >
//           <h3 className="text-xl font-bold text-gray-100 mb-2">{step.title}</h3>
//           <p className="text-gray-300 leading-relaxed">{step.description}</p>
//         </div>
//       </div>

//       {/* --- Desktop View (Alternating Timeline) --- */}
//       <div className={`hidden md:flex items-center w-full ${isReversed ? 'flex-row-reverse' : ''}`}>
//         <div className="w-5/12">
//           <div
//             className={`
//                             bg-gray-800 p-6 rounded-lg shadow-xl 
//                             ${isReversed ? `text-right border-l-4 ${step.theme.border}` : `text-left border-r-4 ${step.theme.border}`}
//                             transition-all duration-700 ease-out transform
//                             hover:scale-105 hover:-translate-y-2
//                             ${inView ? 'opacity-100 translate-x-0' : `opacity-0 ${isReversed ? 'translate-x-10' : '-translate-x-10'}`}
//                         `}
//           >
//             <h3 className="text-xl font-bold text-gray-100 mb-2">{step.title}</h3>
//             <p className="text-gray-300 leading-relaxed">{step.description}</p>
//           </div>
//         </div>
//         <div className="w-2/12"></div>
//         <div className="w-5/12"></div>
//       </div>

//       <div
//         className={`
//                     hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
//                     w-16 h-16 rounded-full items-center justify-center 
//                     ${step.theme.color}
//                     transition-all duration-500 ease-out transform
//                     ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
//                 `}
//       >
//         {step.icon}
//       </div>
//     </div>
//   );
// };

// const HowItWorks = () => {
//   return (
//     <section id="process" className="bg-gray-900 text-white py-20 px-4 overflow-hidden">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl lg:text-4xl font-extrabold text-center mb-4">
//           Our Process
//         </h2>
//         <p className="text-center text-lg text-gray-300 mb-16 md:mb-20 max-w-3xl mx-auto">
//           From initial idea to final product, we follow a proven, transparent workflow to ensure your success.
//         </p>

//         <div className="relative">
//           <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-700" style={{ transform: 'translateX(-50%)' }}></div>

//           <div className="space-y-12 md:space-y-16">
//             {steps.map((step, index) => (
//               <StepItem key={index} step={step} index={index} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;