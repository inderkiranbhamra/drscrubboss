import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// Consistent link data
const quickLinks = [
  { title: "Home", path: "home" },
  { title: "About", path: "about" },
  { title: "Products", path: "regional-solutions" },
  { title: "Process", path: "process" },
  { title: "Contact", path: "contact" },
];

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get current location to determine linking behavior
  const location = useLocation();
  const onHomePage = location.pathname === '/';

  const linkClassName = "text-gray-200 hover:text-white hover:underline cursor-pointer transition-colors";

  return (
    <footer ref={ref} className="bg-[#1656A0] text-white py-10 px-4">
      <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

          <div>
            <h3 className="font-bold text-xl mb-3">Contact Us</h3>
            <div className="space-y-1 text-gray-200">
              <p>+91 9780624397</p>
              <p>info@nexgencred.com</p>
              <p className="font-semibold mt-2">Global HQ:</p>
              <p>The Circle Work, Huda City Centre Metro Station, Gurugram, Haryana 122002</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  {onHomePage ? (
                    // If on homepage, use smooth scroll
                    <ScrollLink
                      to={link.path}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      className={linkClassName}
                    >
                      {link.title}
                    </ScrollLink>
                  ) : (
                    // If on another page, use a standard anchor to navigate back to the section
                    <a href={`/#${link.path}`} className={linkClassName}>
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Follow Our Global Journey</h3>
            <div className="flex justify-center sm:justify-start gap-5 text-3xl">
              {/* Remember to replace '#' with your actual social media URLs */}
              <a href="#" aria-label="Instagram" className="hover:scale-110 hover:text-green-400 transition-all hover:-translate-y-1"><FaInstagram /></a>
              <a href="#" aria-label="Facebook" className="hover:scale-110 hover:text-green-400 transition-all hover:-translate-y-1"><FaFacebookF /></a>
              <a href="#" aria-label="LinkedIn" className="hover:scale-110 hover:text-green-400 transition-all hover:-translate-y-1"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-300 mt-10 pt-6 border-t border-blue-400/50">
          <p className="mt-4 text-sm">
            <RouterLink to="/privacy" className="hover:underline">Privacy Policy</RouterLink> | <RouterLink to="/terms" className="hover:underline">Terms of Service</RouterLink> | <RouterLink to="/cancellationpolicy" className="hover:underline">Cancellation Policy</RouterLink> | <RouterLink to="/refundpolicy" className="hover:underline">Refund Policy</RouterLink>
          </p>
          <p>© {new Date().getFullYear()} NexGenCred. All rights reserved.</p>
          {/* --- ADDED FOOTNOTE HERE --- */}
          <p className="mt-1 text-xs">This website is owned by Varsha.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
// import { Link as ScrollLink } from "react-scroll";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import { useInView } from "react-intersection-observer";

// // Updated link data for consistency
// const quickLinks = [
//   { title: "Home", path: "home" },
//   { title: "About", path: "about" },
//   { title: "Products", path: "products" },
//   { title: "Process", path: "process" },
//   { title: "Contact", path: "contact" },
// ];

// const Footer = () => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const location = useLocation();
//   const onHomePage = location.pathname === '/';

//   const linkClassName = "text-gray-400 hover:text-white hover:underline cursor-pointer transition-colors";

//   return (
//     <footer ref={ref} className="bg-gray-900 text-white pt-16 pb-12 px-4 border-t border-gray-800">
//       <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

//           {/* Contact Us Section */}
//           <div>
//             <h3 className="font-bold text-xl mb-4 text-white">Contact Us</h3>
//             <div className="space-y-2 text-gray-400">
//               <p>+91 98725 00160</p>
//               <p>contact@dashdrobe.in</p>
//               <p className="font-semibold text-gray-200 mt-3">Our Office:</p>
//               <p>13531 St.No 15, Vishkarma Colony, Ludhiana, 141003</p>
//             </div>
//           </div>

//           {/* Quick Links Section */}
//           <div>
//             <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.path}>
//                   {onHomePage ? (
//                     <ScrollLink
//                       to={link.path}
//                       smooth={true}
//                       duration={500}
//                       offset={-80}
//                       className={linkClassName}
//                     >
//                       {link.title}
//                     </ScrollLink>
//                   ) : (
//                     <a href={`/#${link.path}`} className={linkClassName}>
//                       {link.title}
//                     </a>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Follow Us Section */}
//           <div>
//             <h3 className="font-bold text-xl mb-4 text-white">Connect With Us</h3>
//             <div className="flex justify-center md:justify-start gap-6 text-2xl">
//               <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all hover:-translate-y-1"><FaInstagram /></a>
//               <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all hover:-translate-y-1"><FaFacebookF /></a>
//               <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all hover:-translate-y-1"><FaLinkedinIn /></a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="text-center text-gray-500 mt-10 pt-8 border-t border-gray-800">
//           <p className="text-sm">
//             <RouterLink to="/privacy" className="hover:underline hover:text-gray-300">Privacy Policy</RouterLink> | <RouterLink to="/terms" className="hover:underline hover:text-gray-300">Terms of Service</RouterLink> | <RouterLink to="/cancellationpolicy" className="hover:underline hover:text-gray-300">Cancellation Policy</RouterLink> | <RouterLink to="/refundpolicy" className="hover:underline hover:text-gray-300">Refund Policy</RouterLink>
//           </p>
//           <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} DashDrobe Technologies. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;