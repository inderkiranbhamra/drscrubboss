import React from "react";
import { useInView } from "react-intersection-observer";

const AnimatedFeature = ({ icon, alt, title, delay }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img src={icon} alt={alt} className="mx-auto mb-4 h-24 hover:scale-110 transition-transform duration-300" />
      <p className="font-semibold text-lg text-gray-700">{title}</p>
    </div>
  );
};

const AboutUs = () => {
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: whyRef, inView: whyInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <section id="about" className="bg-white pb-10 overflow-x-hidden">
      <div ref={bannerRef} className="relative">
        <div
          className="bg-cover bg-center py-20 md:py-24 text-white relative"
          style={{ backgroundImage: "url('/aboutus.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#003366]/75"></div>
          <div className={`relative z-10 max-w-6xl mx-auto px-4 text-center transition-opacity duration-1000 ${bannerInView ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold">The Future of Financial Reconstruction</h2>
            <p className="mt-4 text-lg md:text-xl">Fusing Advanced SaaS Technology with Human Expertise</p>
          </div>
        </div>
      </div>

      <div ref={contentRef} className={`max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 text-gray-600 text-lg leading-relaxed transition-all duration-1000 ease-out ${contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p>
          At <span className="text-[#1656A0] font-semibold">NexGenCred</span>, we are a technology-first company revolutionizing the asset Reconstruction industry. At our core is a proprietary SaaS platform designed to give global financial institutions unprecedented control and insight over their Reconstruction portfolios.
        </p>
        <p>
          We enhance this powerful software with a worldwide network of vetted Reconstruction professionals, offering a hybrid solution that delivers both cutting-edge analytics and effective, on-the-ground results.
        </p>
      </div>

      <div ref={whyRef} className="max-w-6xl mx-auto px-4 pb-12">
        <h3 className={`text-3xl font-bold text-center text-[#003366] mb-10 transition-opacity duration-1000 ${whyInView ? 'opacity-100' : 'opacity-0'}`}>
          Why NexGenCred?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedFeature icon="/data.png" alt="AI-Powered Analytics" title="AI-Powered Analytics" delay={0} />
          <AnimatedFeature icon="/compliance.png" alt="Platform-Driven Compliance" title="Platform-Driven Compliance" delay={150} />
          <AnimatedFeature icon="/client.png" alt="Centralized Dashboard" title="Your Centralized Dashboard" delay={300} />
          <AnimatedFeature icon="/experience.png" alt="Expert Global Network" title="Expert Global Network" delay={450} />
        </div>
      </div>

      <div ref={ctaRef} className={`max-w-6xl mx-auto px-4 transition-all duration-1000 ease-out ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-[#EAF3FC] py-10 text-center rounded-lg">
          <h4 className="text-[#003366] font-bold text-2xl mb-4">
            See how our platform can transform your Reconstruction strategy.
          </h4>
          <button className="bg-[#1DA1F2] hover:bg-[#0b82c5] text-white text-xl font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            Discover Our Technology
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

// import React from "react";
// import { useInView } from "react-intersection-observer";

// // A reusable component for animated feature icons
// const AnimatedFeature = ({ icon, alt, title, delay, theme }) => {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
//   return (
//     <div
//       ref={ref}
//       className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//         }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       <div
//         className={`p-4 rounded-full shadow-lg mb-4 transition-transform duration-300 hover:scale-110 ${theme.bg}`}
//       >
//         <img src={icon} alt={alt} className="mx-auto h-16 w-16" />
//       </div>
//       <p className="font-semibold text-lg text-gray-300">{title}</p>
//     </div>
//   );
// };

// const AboutUs = () => {
//   const { ref: bannerRef, inView: bannerInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.3,
//   });
//   const { ref: contentRef, inView: contentInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.2,
//   });
//   const { ref: whyRef, inView: whyInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.2,
//   });
//   const { ref: ctaRef, inView: ctaInView } = useInView({
//     triggerOnce: true,
//     threshold: 0.5,
//   });

//   const expertiseData = [
//     { icon: "/industry.png", alt: "Industrial Automation", title: "Industrial Automation", theme: { bg: 'bg-blue-900/50' } },
//     { icon: "/web-design.png", alt: "Web & E-Commerce", title: "Web & E-Commerce", theme: { bg: 'bg-purple-900/50' } },
//     { icon: "/education.png", alt: "EdTech Solutions", title: "EdTech Solutions", theme: { bg: 'bg-amber-900/50' } },
//     { icon: "/gym.png", alt: "Fitness Platforms", title: "Fitness Platforms", theme: { bg: 'bg-green-900/50' } },
//     { icon: "/smart-home.png", alt: "Smart Home (IoT)", title: "Smart Home (IoT)", theme: { bg: 'bg-sky-900/50' } }
//   ];

//   return (
//     <section id="about" className="bg-gray-900 text-white pb-16 overflow-x-hidden">
//       {/* --- Banner Section --- */}
//       <div ref={bannerRef} className="relative">
//         <div
//           className="bg-cover bg-center py-20 md:py-28 text-white relative"
//           style={{
//             backgroundImage:
//               "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
//           }}
//         >
//           <div className="absolute inset-0 bg-gray-900/80"></div>
//           <div
//             className={`relative z-10 max-w-6xl mx-auto px-4 text-center transition-all duration-1000 ${bannerInView
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 -translate-y-8"
//               }`}
//           >
//             <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
//               Engineering Your Digital Future
//             </h2>
//             <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
//               We build intelligent, tailor-made software solutions that drive growth and efficiency for modern businesses.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* --- Content Section --- */}
//       <div
//         ref={contentRef}
//         className={`max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 md:gap-12 text-gray-300 text-lg leading-relaxed transition-all duration-1000 ease-out ${contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//       >
//         <p>
//           At{" "}
//           <span className="text-blue-400 font-semibold">
//             DashDrobe Technologies
//           </span>
//           , we are a dynamic software house dedicated to crafting bespoke digital solutions. We specialize in developing AI-powered platforms and applications that transform industries, from manufacturing and education to fitness and home automation.
//         </p>
//         <p>
//           Our mission is to empower our clients with intuitive, powerful, and scalable technology. We combine innovative engineering with a deep understanding of your unique challenges to deliver not just software, but a true competitive advantage.
//         </p>
//       </div>

//       {/* --- Why Us Section --- */}
//       <div ref={whyRef} className="max-w-6xl mx-auto px-4 pb-16">
//         <h3
//           className={`text-3xl font-bold text-center text-white mb-12 transition-opacity duration-1000 ${whyInView ? "opacity-100" : "opacity-0"
//             }`}
//         >
//           Our Areas of Expertise
//         </h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
//           {expertiseData.map((feature, index) => (
//             <div
//               key={feature.title}
//               className={
//                 index === 4 ? "col-span-2 sm:col-span-1 sm:col-start-2 lg:col-start-auto" : ""
//               }
//             >
//               <AnimatedFeature
//                 icon={feature.icon}
//                 alt={feature.alt}
//                 title={feature.title}
//                 delay={index * 100}
//                 theme={feature.theme}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- CTA Section --- */}
//       <div
//         ref={ctaRef}
//         className={`max-w-5xl mx-auto px-4 transition-all duration-1000 ease-out ${ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//       >
//         <div
//           className="bg-cover bg-center py-12 px-6 text-center rounded-xl shadow-2xl relative overflow-hidden"
//           style={{ backgroundImage: "url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
//         >
//           <div className="absolute inset-0 bg-gray-900/75 rounded-xl"></div>
//           <div className="relative z-10">
//             <h4 className="text-white font-bold text-2xl md:text-3xl mb-4">
//               Ready to build your next big idea?
//             </h4>
//             <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//               Let's discuss how our technology can transform your business.
//             </p>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
//               Get in Touch
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUs;