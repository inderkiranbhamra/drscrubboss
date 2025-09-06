import React from "react";
import { Button } from "@mui/material";
import { useInView } from "react-intersection-observer";

// No need to import Link from react-router-dom anymore

const HeroSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="home" ref={ref} className="bg-white pt-24 pb-12 md:pt-32 md:pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">

        <div className={`flex-1 text-center md:text-left transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            The AI Platform for Global Asset Reconstruction
            <br />
            <span className="text-green-600">Technology-Driven Debt Solutions</span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-xl mx-auto md:mx-0">
            NexGenCred combines a powerful SaaS platform with a global network of Reconstruction experts. Our software provides real-time analytics and seamless case management to help financial institutions reclaim assets efficiently and ethically.
          </p>

          <Button
            variant="contained"
            component="a" // 1. Render the button as an anchor tag
            href="#contact" // 2. Set the href to the ID of the contact section
            sx={{
              backgroundColor: '#1656a0',
              '&:hover': { 
                backgroundColor: '#114683',
                transform: 'scale(1.05) translateY(-4px)',
              },
              marginTop: '2rem',
              paddingX: '2rem',
              paddingY: '0.8rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            Get a Demo
          </Button>
        </div>

        <div className={`flex-1 transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <img
            src="/debt.png"
            alt="Dashboard showing global asset Reconstruction data"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// import React from "react";
// import { Button } from "@mui/material";
// import { useInView } from "react-intersection-observer";

// const HeroSection = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const handleScrollTo = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = -80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset + offset;
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <section id="home" ref={ref} className="bg-gray-900 text-white pt-24 pb-12 md:pt-32 md:pb-20 overflow-x-hidden">
//       <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
//         <div
//           className={`text-center md:text-left transition-all duration-1000 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//             }`}
//         >
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
//             Your Vision,
//             <br />
//             <span className="text-blue-400">Engineered.</span>
//           </h1>

//           <p className="text-gray-300 mt-6 text-lg max-w-xl mx-auto md:mx-0">
//             DashDrobe Technologies builds bespoke software to power your business. From AI-driven factory management and e-learning platforms to smart gym solutions and custom websites, we translate your complex challenges into elegant, effective technology.
//           </p>

//           <Button
//             variant="contained"
//             onClick={() => handleScrollTo('products')}
//             sx={{
//               backgroundColor: '#18a2cd', // blue-500
//               '&:hover': {
//                 backgroundColor: '#18a2cd', // blue-600
//                 transform: 'scale(1.05) translateY(-4px)',
//               },
//               marginTop: '2rem',
//               paddingX: '2rem',
//               paddingY: '0.8rem',
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               textTransform: 'none',
//               borderRadius: '8px',
//               transition: 'all 0.3s ease-in-out',
//               boxShadow: '0 4px 14px 0 rgb(59 130 246 / 39%)',
//             }}
//           >
//             Explore Solutions
//           </Button>
//         </div>

//         <div
//           className={`transition-all duration-1000 ease-out delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
//             }`}
//         >
//           <img
//             src="/hero-digital.png"
//             alt="A dynamic visualization of various technology solutions"
//             className="w-full h-auto rounded-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;