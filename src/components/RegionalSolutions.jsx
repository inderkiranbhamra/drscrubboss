import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaCogs, FaChartBar, FaGlobe, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const regionalData = [
  {
    region: "Europe",
    icon: <FaCogs />,
    products: [
      {
        name: "EuroDebt Navigator",
        description: "EU-focused dashboard for individuals and SMEs to consolidate debts across lenders, simulate restructuring plans, and track progress with GDPR-grade audit trails.",
        features: ["PSD2-ready aggregation (where supported)", "Multi-currency EUR/GBP/CHF", "Settlement and hardship scenario builder", "Creditor communication logs", "Compliance reports"],
        pricing: "₹20,999 / $249 per user/month; enterprise plans from ₹1,25,000 / $1,499/month.",
      },
      {
        name: "CreditorSync EU Pro",
        description: "Portfolio analytics for agencies/banks with segmentation, promise-to-pay workflows, and case/dispute management aligned to EU processes.",
        features: ["Risk banding", "Waterfall repayment strategies", "Digital outreach templates", "Aging buckets", "Cohort analytics"],
        pricing: "₹31,999 / $379 per user/month; enterprise plans from ₹2,05,000 / $2,499/month.",
      },
    ],
  },
  {
    region: "North America",
    icon: <FaChartBar />,
    products: [
      {
        name: "NorthStar Debt Console",
        description: "North America-oriented dashboard for consumers and servicers with state/province-aware settings, credit-dispute packaging, and tax/hardship flags.",
        features: ["ACH/real-time rails integrations", "Re-aging controls", "Settlement calculators", "Delinquency heatmaps", "Audit exports"],
        pricing: "₹25,999 / $309 per user/month; enterprise plans from ₹1,75,000 / $2,099/month.",
      },
      {
        name: "LatAm Gateway MX",
        description: "Mexico-optimized interface for tracking and restructuring personal and small-business debts, fully localized in Spanish with local payment providers.",
        features: ["Inflation-aware amortization", "SMS/WhatsApp consent capture", "Local holiday/SLA calendars", "Promise-to-pay tracking"],
        pricing: "₹12,999 / $149 per user/month; enterprise plans from ₹1,00,000 / $1,199/month.",
      },
    ],
  },
  {
    region: "South America",
    icon: <FaGlobe />,
    products: [
      {
        name: "Andean Debt Tracker",
        description: "Regional dashboard for multi-lender consolidation and repayment scheduling across Spanish/Portuguese markets.",
        features: ["Interest recalculation wizard", "Hardship deferral playbooks", "WhatsApp-first outreach flows", "Settlement ranges by segment"],
        pricing: "₹11,199 / $129 per user/month; enterprise plans from ₹75,000 / $899/month.",
      },
      {
        name: "ConoSur Recovery Studio",
        description: "Collector productivity suite with dialer/CRM connectors and promise-break triggers to restore stalled payment plans.",
        features: ["Agent KPI board", "Dispute/validation queues", "Settlement simulator", "Payment adherence scoring"],
        pricing: "₹13,699 / $159 per user/month; enterprise plans from ₹90,000 / $1,099/month.",
      },
    ],
  },
  {
    region: "Middle East",
    icon: <FaGears />,
    products: [
      {
        name: "MENA Restructure Hub",
        description: "Arabic/English dashboard with optional Shariah-compliant restructuring options and regional remittance support.",
        features: ["Multi-currency (AED/SAR/QAR/OMR/BHD)", "Localized dunning sequences", "Role-based permissions", "Bilingual comms templates"],
        pricing: "₹18,999 / $229 per user/month; enterprise plans from ₹1,55,000 / $1,849/month.",
      },
      {
        name: "Gulf Portfolio Command",
        description: "Bank-grade portfolio control for early/late-stage cycles with legal escalation dossiers and external counsel hand-offs.",
        features: ["Promise-to-pay likelihood scoring", "Settlement orchestration", "Recovery cohort analysis", "SLA/compliance logs"],
        pricing: "₹28,499 / $339 per user/month; enterprise plans from ₹2,40,000 / $2,899/month.",
      },
    ],
  },
  {
    region: "Asia-Pacific",
    icon: <FaCogs />,
    products: [
      {
        name: "APAC Debt Grid",
        description: "Pan-APAC debt tracking and restructuring with localization for India/SEA/ANZ and support for regional instant-pay rails.",
        features: ["UPI/PayNow/FP integrations (where available)", "Multi-time-zone scheduling", "Bureau/alt-data ingestion", "Consent capture"],
        pricing: "₹9,999 / $119 per user/month; enterprise plans from ₹70,000 / $849/month.",
      },
      {
        name: "Pacific Restructure Suite",
        description: "Enterprise scenario-planning suite with predictive outcomes across roll-ups, settlements, and hardship plans.",
        features: ["What-if simulators", "Collector QA scorecards", "Cohort uplift forecasts", "Configurable governance controls"],
        pricing: "₹15,999 / $189 per user/month; enterprise plans from ₹1,15,000 / $1,399/month.",
      },
    ],
  },
];

const globalProduct = {
  name: "Global Debt Command Center",
  description: "Unified, multi-tenant admin and analytics layer to oversee all regional products from one console; ideal for multinational agencies or BPOs.",
  features: ["Cross-region reporting", "Currency normalization", "Policy packs per region", "SSO/MFA", "Data residency routing options"],
  pricing: "From ₹2,10,000 / $2,499/month platform fee plus ₹2,999 / $35 per seat/month.",
};

// MODIFICATION 2: ProductCard now accepts an `isInCart` prop to decide which button to render.
const ProductCard = ({ product, onAddToCart, isInCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <h4 className="text-xl font-bold text-[#1656A0] mb-3">{product.name}</h4>
      <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2">Key Features:</h5>
        <ul className="space-y-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
        <p className="font-semibold text-gray-700 m-0">
          {product.pricing}
        </p>
        {isInCart ? (
          <button
            disabled
            className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed"
          >
            <FaCheckCircle /> Added to Cart
          </button>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <FaShoppingCart /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};


const RegionalSolutions = ({ openAuthModal }) => {
  const [activeTab, setActiveTab] = useState(regionalData[0].region);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const { currentUser } = useAuth();
  // MODIFICATION 1: Destructure `cartItems` from the context.
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product) => {
    if (currentUser) {
      addToCart(product);
    } else {
      openAuthModal('signup');
    }
  };

  const activeProducts = regionalData.find(r => r.region === activeTab)?.products || [];

  return (
    <section id="regional-solutions" ref={ref} className="bg-gray-50 py-20 px-4 overflow-hidden">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Tailored Solutions for Every Region
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Our platform is localized to meet the unique compliance, currency, and communication needs of markets across the globe.
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {regionalData.map(item => (
            <button
              key={item.region}
              onClick={() => setActiveTab(item.region)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${activeTab === item.region
                  ? 'bg-[#1656A0] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
            >
              {item.icon} {item.region}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {activeProducts.map(product => {
            // Check if the current product is in the cart
            const isInCart = cartItems.some(item => item.name === product.name);
            return (
              <ProductCard
                key={product.name}
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={isInCart} // Pass the result as a prop
              />
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#003366] to-[#1656A0] text-white p-8 rounded-lg shadow-xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-green-400">
            Cross-Region Command
          </h3>
          <div className="text-center max-w-4xl mx-auto">
            {/* Also check for the global product */}
            <ProductCard
              product={globalProduct}
              onAddToCart={handleAddToCart}
              isInCart={cartItems.some(item => item.name === globalProduct.name)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalSolutions;

// import React, { useState, useEffect, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import {
//   FaShoppingCart,
//   FaCheckCircle,
//   FaIndustry,
//   FaPalette,
//   FaGraduationCap,
//   FaDumbbell,
//   FaHome,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";
// import { useAuth } from '../contexts/AuthContext';
// import { useCart } from '../contexts/CartContext';

// const productsData = [
//   {
//     id: "manufacturing",
//     category: "Factory Management App",
//     tagline: "An AI-powered app to streamline factory operations, integrate machines, and optimize productivity.",
//     icon: <FaIndustry />,
//     theme: {
//       accentBg: 'bg-blue-600',
//       accentText: 'text-blue-400',
//       accentBorder: 'border-blue-500',
//       bgGradient: "bg-gradient-to-br from-gray-800 to-gray-900",
//       headerText: "text-blue-300"
//     },
//     media: {
//       type: 'carousel',
//       slides: [
//         { src: 'https://themanufacturer-cdn-1.s3.eu-west-2.amazonaws.com/wp-content/uploads/2017/10/14122806/IoT-IIoT-Industrial-Internet-Connectivity-Automation-Robotics-Digital-Technologies-Stock-Image.jpg', alt: 'Automated robotic arms working on a production line' },
//         { src: 'https://media.istockphoto.com/id/1482440776/photo/factory-female-industrial-engineer-working-with-ai-automation-robot-arms-machine-in.jpg?s=612x612&w=0&k=20&c=ov1xVqFnT2HlITarSAp4MrLhjLuILM5Rv2ljI_ytzXY=', alt: 'Engineer monitoring industrial equipment from a digital tablet' },
//         { src: 'https://5.imimg.com/data5/SELLER/Default/2025/4/504692662/LU/KZ/OY/242850963/manufacturing-and-industrial-plants-automation-solution-500x500.jpeg', alt: 'A modern, clean manufacturing facility interior' }
//       ]
//     },
//     plans: [
//       { name: "Starter Plan", price: "₹1,10,000", billing: "+ ₹25,000/year", features: ["Basic machine integration", "Production monitoring dashboard", "Employee & shift management", "Maintenance reminders"] },
//       { name: "Growth Plan", price: "₹2,80,000", billing: "+ ₹50,000/year", description: "Up to 5 machines. ₹30k/extra.", features: ["All Starter features", "IoT real-time data", "AI predictive maintenance", "Inventory management", "Quality control", "Smart Production Scheduling"] },
//       { name: "Premium AI Plan", price: "₹8,00,000", billing: "+ ₹1,00,000/year", description: "Up to 20 machines. ₹30k/extra.", features: ["All Growth features", "Plant digital twin", "AI efficiency optimization", "ERP/SCM/CRM integrations", "Anomaly Detection", "Cost & Yield Prediction", "1 year dedicated support"] },
//     ],
//   },
//   {
//     id: "website",
//     category: "Website Development",
//     tagline: "Crafting beautiful, high-performance websites that drive growth and engage your audience.",
//     icon: <FaPalette />,
//     theme: {
//       accentBg: 'bg-purple-600',
//       accentText: 'text-purple-400',
//       accentBorder: 'border-purple-500',
//       bgGradient: "bg-gradient-to-br from-gray-800 to-gray-900",
//       headerText: "text-purple-300"
//     },
//     media: {
//       type: 'image',
//       src: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//       alt: 'A modern website design displayed on a sleek monitor'
//     },
//     plans: [
//       { name: "Basic Plan", price: "₹20,000", billing: "+ ₹2,000/year", features: ["5–6 Pages Static Website", "Mobile responsive design", "Contact form integration", "Basic SEO setup"] },
//       { name: "Business Plan", price: "₹40,000", billing: "+ ₹2,000/year", features: ["10–15 Pages Dynamic Website", "Admin panel to manage content", "Blog/News section", "On-page SEO + Analytics"] },
//       { name: "Premium Plan", price: "₹60,000", billing: "+ ₹10,000/year", features: ["E-commerce or Client Portal", "User management system", "Payment gateway integration", "1 year free maintenance"] },
//     ],
//   },
//   {
//     id: "learning",
//     category: "Student Learning App",
//     tagline: "Engaging and intelligent learning solutions that adapt to every student's unique journey.",
//     icon: <FaGraduationCap />,
//     theme: {
//       accentBg: 'bg-amber-500',
//       accentText: 'text-amber-400',
//       accentBorder: 'border-amber-500',
//       bgGradient: "bg-gradient-to-br from-gray-800 to-gray-900",
//       headerText: "text-amber-300"
//     },
//     media: {
//       type: 'carousel',
//       slides: [
//         { src: 'https://images.pexels.com/photos/4144144/pexels-photo-4144144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Young students collaborating with a tablet in a modern classroom' },
//         { src: 'https://images.pexels.com/photos/8617967/pexels-photo-8617967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'An interactive digital whiteboard displaying educational content' },
//         { src: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'A student engaged in an online learning session on a laptop at home' }
//       ]
//     },
//     plans: [
//       { name: "Starter Plan", price: "₹1,40,000", billing: "+ ₹25,000/year", features: ["Curriculum-aligned video lessons", "Gamified quizzes & learning", "Progress dashboard for students", "Admin panel for teachers"] },
//       { name: "Growth Plan", price: "₹2,40,000", billing: "+ ₹35,000/year", features: ["All Starter features", "AI-powered personalized learning", "AI-based doubt-solving", "Exam prep tools", "Parent-teacher insights"] },
//       { name: "Premium AI Plan", price: "₹3,60,000", billing: "+ ₹55,000/year", features: ["All Growth features", "Face recognition for focus detection", "Real-time engagement tracking", "1 year free support"] },
//     ],
//   },
//   {
//     id: "gym",
//     category: "Smart Gym Platform",
//     tagline: "An intelligent, all-in-one platform to manage your members, trainers, and operations.",
//     icon: <FaDumbbell />,
//     theme: {
//       accentBg: 'bg-green-600',
//       accentText: 'text-green-400',
//       accentBorder: 'border-green-500',
//       bgGradient: "bg-gradient-to-br from-gray-800 to-gray-900",
//       headerText: "text-green-300"
//     },
//     media: {
//       type: 'carousel',
//       slides: [
//         { src: 'https://images.pexels.com/photos/4761790/pexels-photo-4761790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Woman tracking her workout on a smartphone in a modern gym' },
//         { src: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'People using various cardio machines in a bright, spacious gym' },
//         { src: 'https://images.pexels.com/photos/866027/pexels-photo-866027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Close-up of a smart treadmill console showing workout data' }
//       ]
//     },
//     plans: [
//       { name: "Digital Gym Companion", price: "₹2,00,000", billing: "one-time + ₹25,000/year", features: ["Member App", "Trainer Dashboard", "Owner Dashboard"] },
//       { name: "Smart Gym Management", price: "₹3,25,000", billing: "one-time + ₹50,000/year", features: ["All Basic features", "Real-time Crowd Meter", "Trainer performance analytics", "Live occupancy & peak-hour analytics"] },
//       { name: "AI Full Suite", price: "₹4,75,000", billing: "one-time + ₹75,000/year", features: ["All Standard features", "AI Workout Assistant", "Equipment usage insights", "Ready for wearables & payment gateway"] },
//     ],
//   },
//   {
//     id: "automation",
//     category: "Home Automation",
//     tagline: "Experience the future of living with seamless, intelligent, and secure home automation.",
//     icon: <FaHome />,
//     theme: {
//       accentBg: 'bg-sky-500',
//       accentText: 'text-sky-400',
//       accentBorder: 'border-sky-500',
//       bgGradient: "bg-gradient-to-br from-gray-800 to-gray-900",
//       headerText: "text-sky-300"
//     },
//     media: {
//       type: 'image',
//       src: 'https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//       alt: 'A modern living room with integrated smart home technology'
//     },
//     plans: [
//       { name: "Basic", price: "₹75,000", billing: "One-Time Cost", description: "Up to 12 control points.", features: ["Smart lighting & appliance control", "Mobile app + voice assistant", "Basic security (smart lock OR doorbell)"] },
//       { name: "Standard", price: "₹1,60,000", billing: "One-Time Cost", description: "Up to 24 control points.", features: ["All Basic features", "Full smart security system", "Energy monitoring", "Multi-room automation", "Scene setting ('Movie Mode')"] },
//       { name: "Premium", price: "₹2,75,000", billing: "+ ₹50,000/year", description: "Up to 48 control points.", features: ["All Standard features", "AI energy optimization", "CCTV + AI facial recognition", "Smart kitchen integration", "Digital Twin of home"] },
//     ],
//   }
// ];

// const SimpleCarousel = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (slides.length <= 1) return;
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [currentIndex, slides.length]);

//   const goToPrevious = () => setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
//   const goToNext = () => setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));

//   return (
//     <div className="h-full w-full relative group">
//       <div
//         style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
//         className="w-full h-full rounded-xl bg-center bg-cover duration-500"
//         role="img"
//         aria-label={slides[currentIndex].alt}
//       ></div>
//       {slides.length > 1 && (
//         <>
//           <button aria-label="Previous slide" onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-3 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
//             <FaChevronLeft />
//           </button>
//           <button aria-label="Next slide" onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-3 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
//             <FaChevronRight />
//           </button>
//           <div className='flex justify-center py-2 absolute bottom-2 left-1/2 -translate-x-1/2'>
//             {slides.map((_, slideIndex) => (
//               <div key={slideIndex} onClick={() => setCurrentIndex(slideIndex)} className={`h-2 mx-1 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white w-6' : 'bg-white/50 w-2'}`} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const PlanCard = ({ plan, theme, onAddToCart, isInCart }) => (
//   <div className={`bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col h-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-b-4 ${theme.accentBorder}`}>
//     <h4 className="text-lg font-bold text-gray-100">{plan.name}</h4>
//     <p className="text-xs text-gray-400 mb-3 flex-grow min-h-[30px]">{plan.description || ''}</p>
//     <div className="mb-4">
//       <span className={`text-2xl font-extrabold ${theme.accentText}`}>{plan.price}</span>
//       <p className="text-gray-400 text-xs mt-1">{plan.billing}</p>
//     </div>
//     <ul className="space-y-2 text-gray-300 flex-grow mb-6 text-sm">
//       {plan.features.map((feature, i) => (
//         <li key={i} className="flex items-start">
//           <FaCheckCircle className={`text-green-500 mr-2.5 mt-1 flex-shrink-0`} />
//           <span>{feature}</span>
//         </li>
//       ))}
//     </ul>
//     <div className="mt-auto">
//       {isInCart ? (
//         <button disabled className="w-full bg-gray-600 text-gray-400 py-2 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed font-semibold text-sm">
//           <FaCheckCircle /> Added to Cart
//         </button>
//       ) : (
//         <button onClick={() => onAddToCart(plan)} className={`w-full ${theme.accentBg} text-white py-2 px-4 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 transition-transform duration-300 transform hover:scale-105 font-semibold text-sm`}>
//           <FaShoppingCart /> Add to Cart
//         </button>
//       )}
//     </div>
//   </div>
// );

// const ProductSection = ({ product, cartItems, onAddToCart }) => {
//   return (
//     <div className={`${product.theme.bgGradient} rounded-2xl p-6 md:p-8 shadow-2xl`}>
//       <div className="grid lg:grid-cols-2 gap-8 items-center">
//         <div className="h-64 md:h-72 w-full relative order-last lg:order-first">
//           {product.media.type === 'carousel' ? (
//             <SimpleCarousel slides={product.media.slides} />
//           ) : (
//             <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
//               <img src={product.media.src} alt={product.media.alt} className="w-full h-full object-cover" />
//             </div>
//           )}
//           <div className="absolute inset-0 bg-black/10 rounded-xl pointer-events-none"></div>
//         </div>
//         <div className="text-center lg:text-left">
//           <div className="inline-flex items-center gap-4 mb-3">
//             <span className={`text-2xl lg:text-3xl ${product.theme.accentText}`}>{product.icon}</span>
//             <h3 className={`text-2xl lg:text-3xl font-extrabold text-white`}>{product.category}</h3>
//           </div>
//           <p className="text-base lg:text-lg text-gray-300 leading-relaxed">{product.tagline}</p>
//         </div>
//       </div>
//       <div className="mt-12">
//         <h4 className={`text-xl lg:text-2xl font-bold text-center ${product.theme.accentText} mb-6`}>Choose Your Plan</h4>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {product.plans.map(plan => (
//             <PlanCard
//               key={plan.name}
//               plan={plan}
//               theme={product.theme}
//               onAddToCart={() => onAddToCart(product.id, plan)}
//               isInCart={cartItems.some(item => item.id === `${product.id}-${plan.name}`)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const RegionalSolutions = ({ openAuthModal }) => {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
//   const { currentUser } = useAuth();
//   const { addToCart, cartItems } = useCart();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const scrollContainerRef = useRef(null);
//   const slideRefs = useRef([]);

//   const handleAddToCart = (productId, plan) => {
//     const product = productsData.find(p => p.id === productId);
//     const itemToAdd = { ...plan, id: `${productId}-${plan.name}`, category: product.category };
//     if (currentUser) {
//       addToCart(itemToAdd);
//     } else {
//       openAuthModal('signup');
//     }
//   };

//   const scrollToSlide = (index) => {
//     if (slideRefs.current[index]) {
//       slideRefs.current[index].scrollIntoView({
//         behavior: 'smooth',
//         block: 'nearest',
//         inline: 'start',
//       });
//     }
//   };

//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, clientWidth } = scrollContainerRef.current;
//       const index = Math.round(scrollLeft / clientWidth);
//       if (index !== currentSlide) {
//         setCurrentSlide(index);
//       }
//     }
//   };

//   return (
//     <section ref={ref} id="products" className="py-12 px-4 overflow-hidden bg-gray-900 text-white">
//       <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Innovative Solutions for Modern Businesses</h2>
//           <p className="mt-4 text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">Explore our tailored platforms designed to drive efficiency, engagement, and growth.</p>
//         </div>
//         <div>
//           <div className="sticky top-[68px] z-20 bg-gray-900/80 backdrop-blur-sm py-4 mb-8">
//             <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3">
//               {productsData.map((product, index) => (
//                 <button
//                   key={product.id}
//                   onClick={() => scrollToSlide(index)}
//                   className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${currentSlide === index ? `${product.theme.accentBg} text-white shadow-lg` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
//                 >
//                   {product.icon}
//                   <span>{product.category}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div
//             ref={scrollContainerRef}
//             onScroll={handleScroll}
//             className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
//           >
//             {productsData.map((product, index) => (
//               <div
//                 key={product.id}
//                 ref={el => slideRefs.current[index] = el}
//                 className="w-full flex-shrink-0 snap-center px-2"
//               >
//                 <ProductSection
//                   product={product}
//                   cartItems={cartItems}
//                   onAddToCart={handleAddToCart}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RegionalSolutions;