import React from "react";
import Slider from "react-slick";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FaChartLine, FaUsers, FaMagnifyingGlassDollar } from "react-icons/fa6";
import { VscLaw } from "react-icons/vsc";
import { useInView } from "react-intersection-observer";

const solutions = [
  {
    title: "Reconstruction Management Platform (SaaS)",
    description: "Our centralized dashboard provides real-time analytics, case tracking, and performance insights for your entire global portfolio.",
    icon: <FaChartLine className="text-6xl text-green-600 mb-4" />,
  },
  {
    title: "Global Managed Reconstruction",
    description: "Leverage our worldwide network of certified agents, managed seamlessly through our platform for ethical and efficient debt resolution.",
    icon: <FaUsers className="text-6xl text-green-600 mb-4" />,
  },
  {
    title: "AI-Powered Skip Tracing",
    description: "Utilize our advanced software to locate defaulters and assets across international borders with unparalleled accuracy.",
    icon: <FaMagnifyingGlassDollar className="text-6xl text-green-600 mb-4" />,
  },
  {
    title: "Platform-Driven Legal Support",
    description: "Access integrated legal assistance and ensure global compliance with automated tracking and reporting.",
    icon: <VscLaw className="text-6xl text-green-600 mb-4" />,
  },
];

const ArrowButton = ({ onClick, children, position }) => (
  <IconButton
    onClick={onClick}
    sx={{
      background: "#25A352",
      color: '#fff',
      borderRadius: "50%",
      position: "absolute",
      [position]: "-2.5rem",
      top: "50%",
      transform: 'translateY(-50%)',
      zIndex: 2,
      '&:hover': { background: '#1e8449' },
      display: { xs: 'none', md: 'inline-flex' }
    }}
  >
    {children}
  </IconButton>
);

const CarouselSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowButton position="right"><ArrowForwardIosIcon /></ArrowButton>,
    prevArrow: <ArrowButton position="left"><ArrowBackIosNewIcon /></ArrowButton>,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div id="solutions" ref={ref} className="py-16 px-5 bg-[#1656A0] overflow-hidden">
      <div className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-center text-white text-4xl font-bold mb-12">Our Solutions: Platform & Services</h2>
        <div className="relative max-w-[1200px] mx-auto">
          <Slider {...settings}>
            {solutions.map((solution, index) => (
              <div key={index} className="px-3 py-2">
                <div className="bg-white rounded-lg shadow-lg p-8 min-h-[300px] flex flex-col justify-center items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  {solution.icon}
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-md leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;