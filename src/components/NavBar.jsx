import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import { Drawer, IconButton, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import clsx from 'clsx';

const navLinks = [
    { title: "Home", path: "home" },
    { title: "About", path: "about" },
    { title: "Products", path: "regional-solutions" },
    { title: "Process", path: "process" },
    { title: "Contact", path: "contact" },
];

const ScrollLink = ({ to, offset, children, onClick, className, spy, activeClass }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        const targetElement = document.getElementById(to);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset + offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        if (onClick) onClick();
    }, [to, offset, onClick]);

    const handleScrollSpy = useCallback(() => {
        if (!spy) return;
        const element = document.getElementById(to);
        if (element) {
            const rect = element.getBoundingClientRect();
            const isNowActive = rect.top <= -offset + 1 && rect.bottom >= -offset + 1;
            setIsActive(isNowActive);
        }
    }, [to, offset, spy]);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollSpy, { passive: true });
        handleScrollSpy();
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, [handleScrollSpy]);

    return (
        <a href={`#${to}`} onClick={handleClick} className={clsx(className, isActive && activeClass)}>
            {children}
        </a>
    );
};

const Navbar = ({ openAuthModal }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const onHomePage = location.pathname === "/";

    const { currentUser } = useAuth();
    const { cartItems } = useCart();

    const navbarHeight = '68px';

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleDrawer = useCallback((isOpen) => () => setOpen(isOpen), []);

    const linkProps = { offset: -80 };
    const linkClassName = "cursor-pointer transform transition-all duration-300 ease-in-out hover:text-green-400 hover:scale-110";
    const activeLinkClassName = "text-green-400 font-bold scale-110";

    const NavLink = ({ path, title, isMobile = false }) => {
        const mobileClasses = isMobile ? 'text-xl py-2 w-full rounded-md hover:bg-white/10' : '';
        if (onHomePage) {
            return (
                <ScrollLink
                    to={path}
                    spy={true}
                    activeClass={activeLinkClassName}
                    className={clsx(linkClassName, mobileClasses)}
                    onClick={isMobile ? toggleDrawer(false) : undefined}
                    {...linkProps}
                >
                    {title}
                </ScrollLink>
            );
        }
        return (
            <a href={`/#${path}`} className={clsx(linkClassName, mobileClasses)}>
                {title}
            </a>
        );
    };

    return (
        <>
            <nav
                className={clsx(
                    'fixed top-0 left-0 w-full z-[1000] transition-colors duration-300',
                    scrolled
                        ? 'bg-[#000b1c]/80 backdrop-blur-md shadow-lg'
                        : 'bg-[#000b1c]/90 backdrop-blur-md shadow-lg'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" style={{ height: navbarHeight }}>
                    {onHomePage ? (
                        <ScrollLink to="home" {...linkProps} className="cursor-pointer transition-transform duration-300 hover:scale-105">
                            <img src="logo.png" alt="NexGenCred Logo" className="h-auto w-32" />
                        </ScrollLink>
                    ) : (
                        <RouterLink to="/" className="cursor-pointer transition-transform duration-300 hover:scale-105">
                            <img src="logo.png" alt="NexGenCred Logo" className="h-auto w-32" />
                        </RouterLink>
                    )}

                    <div className="hidden md:flex items-center gap-6 text-white text-base">
                        {navLinks.map((item) => <NavLink key={item.title} path={item.path} title={item.title} />)}
                        {currentUser ? (
                            <>
                                <IconButton component={RouterLink} to="/profile" aria-label="profile" sx={{ color: 'white', transition: 'all 0.3s', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)', transform: 'scale(1.1)' } }}>
                                    <AccountCircleIcon />
                                </IconButton>
                                <IconButton component={RouterLink} to="/cart" aria-label="cart" sx={{ color: 'white', transition: 'all 0.3s', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)', transform: 'scale(1.1)' } }}>
                                    <Badge badgeContent={cartItems.length} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button onClick={() => openAuthModal('login')} className="bg-[#1656a0] hover:bg-[#114683] text-white px-5 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                Login / Sign Up
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <IconButton onClick={toggleDrawer(true)} aria-label="open menu" sx={{ color: 'white' }}>
                            <MenuIcon />
                        </IconButton>
                    </div>

                    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#000b1c', opacity: 0.90, color: 'white', width: '250px' } }}>
                        <div className="p-4 flex flex-col h-full">
                            <div className="flex justify-end">
                                <IconButton onClick={toggleDrawer(false)} aria-label="close menu"><CloseIcon sx={{ color: 'white' }} /></IconButton>
                            </div>
                            <div className="flex flex-col items-center gap-6 text-center mt-4">
                                {navLinks.map((item) => <NavLink key={item.title} path={item.path} title={item.title} isMobile={true} />)}
                                {currentUser ? (
                                    <>
                                        <RouterLink to="/profile" onClick={toggleDrawer(false)} className={clsx(linkClassName, 'text-xl py-2 w-full rounded-md hover:bg-white/10 flex items-center justify-center gap-2')}>
                                            <AccountCircleIcon /> Profile
                                        </RouterLink>
                                        <RouterLink to="/cart" onClick={toggleDrawer(false)} className={clsx(linkClassName, 'text-xl py-2 w-full rounded-md hover:bg-white/10 flex items-center justify-center gap-2')}>
                                            <ShoppingCartIcon /> Cart ({cartItems.length})
                                        </RouterLink>
                                        <button onClick={() => { handleLogout(); toggleDrawer(false)(); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 w-full transition-transform duration-300 hover:scale-105">
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => { openAuthModal('login'); toggleDrawer(false)(); }} className="bg-[#1656a0] hover:bg-[#114683] text-white px-4 py-2 rounded-lg mt-4 w-full transition-transform duration-300 hover:scale-105">
                                        Login / Sign Up
                                    </button>
                                )}
                            </div>
                        </div>
                    </Drawer>
                </div>
            </nav>

            {/* --- MODIFIED: Guest User Static Banner --- */}
            {currentUser && currentUser.isAnonymous && (
                <div
                    className="fixed left-0 w-full z-[999] bg-green-100 text-green-800 text-center p-2 text-sm"
                    style={{ top: navbarHeight }}
                >
                    You're logged in as a Guest. Please&nbsp;
                    <RouterLink to="/profile" className="font-bold underline hover:text-green-900">
                        link account in profile.
                    </RouterLink>
                </div>
            )}
        </>
    );
};

export default Navbar;

// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
// import { Drawer, IconButton, Badge } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useAuth } from "../contexts/AuthContext";
// import { useCart } from "../contexts/CartContext";
// import clsx from 'clsx';

// const navLinks = [
//     { title: "Home", path: "home" },
//     { title: "About", path: "about" },
//     { title: "Products", path: "products" },
//     { title: "Process", path: "process" },
//     { title: "Contact", path: "contact" },
// ];

// const ScrollLink = ({ to, offset, children, onClick, className, spy, activeClass }) => {
//     const [isActive, setIsActive] = useState(false);

//     const handleClick = useCallback((e) => {
//         e.preventDefault();
//         const targetElement = document.getElementById(to);
//         if (targetElement) {
//             const elementPosition = targetElement.getBoundingClientRect().top;
//             const offsetPosition = elementPosition + window.pageYOffset + offset;
//             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
//         }
//         if (onClick) onClick();
//     }, [to, offset, onClick]);

//     useEffect(() => {
//         const handleScrollSpy = () => {
//             if (!spy) return;
//             const element = document.getElementById(to);
//             if (element) {
//                 const rect = element.getBoundingClientRect();
//                 const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
//                 const isNowActive = rect.top <= viewHeight * 0.4 && rect.bottom >= viewHeight * 0.4;
//                 setIsActive(isNowActive);
//             }
//         };

//         window.addEventListener("scroll", handleScrollSpy, { passive: true });
//         handleScrollSpy();
//         return () => window.removeEventListener("scroll", handleScrollSpy);
//     }, [to, spy]);

//     return (
//         <a href={`#${to}`} onClick={handleClick} className={clsx(className, isActive && activeClass)}>
//             {children}
//         </a>
//     );
// };

// const Navbar = ({ openAuthModal }) => {
//     const [open, setOpen] = useState(false);
//     // The 'scrolled' state is no longer needed
//     // const [scrolled, setScrolled] = useState(false); 
//     const location = useLocation();
//     const navigate = useNavigate();
//     const onHomePage = location.pathname === "/";

//     const { currentUser } = useAuth();
//     const { cartItems } = useCart();
//     const navbarHeight = '68px';

//     const handleLogout = async () => {
//         await signOut(auth);
//         navigate('/');
//     };

//     // This useEffect for tracking scroll is no longer needed
//     /*
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 10);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);
//     */

//     const toggleDrawer = useCallback((isOpen) => () => setOpen(isOpen), []);

//     const linkProps = { offset: -80 };
//     const linkClassName = "cursor-pointer transform transition-all duration-300 ease-in-out text-gray-300 hover:text-white hover:scale-110";
//     const activeLinkClassName = "text-blue-400 font-bold scale-110";

//     const NavLink = ({ path, title, isMobile = false }) => {
//         const mobileClasses = isMobile ? 'text-xl py-2 w-full rounded-md text-gray-200 hover:bg-gray-700/50' : '';
//         if (onHomePage) {
//             return (
//                 <ScrollLink
//                     to={path}
//                     spy={true}
//                     activeClass={activeLinkClassName}
//                     className={clsx(linkClassName, mobileClasses)}
//                     onClick={isMobile ? toggleDrawer(false) : undefined}
//                     {...linkProps}
//                 >
//                     {title}
//                 </ScrollLink>
//             );
//         }
//         return (
//             <a href={`/#${path}`} className={clsx(linkClassName, mobileClasses)}>
//                 {title}
//             </a>
//         );
//     };

//     return (
//         <>
//             <nav
//                 className={clsx(
//                     'fixed top-0 left-0 w-full z-[1000] transition-all duration-300',
//                     'bg-gray-900/80 backdrop-blur-md shadow-lg' // This style is now applied constantly
//                 )}
//             >
//                 <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between" style={{ height: navbarHeight }}>
//                     <RouterLink to="/" className="cursor-pointer transition-transform duration-300 hover:scale-105">
//                         <img src="logo3.png" alt="DashDrobe Technologies Logo" className="h-auto w-40" />
//                     </RouterLink>

//                     <div className="hidden md:flex items-center gap-6 text-base font-medium">
//                         {navLinks.map((item) => <NavLink key={item.title} path={item.path} title={item.title} />)}
//                         {currentUser ? (
//                             <>
//                                 <IconButton component={RouterLink} to="/profile" aria-label="profile" sx={{ color: '#D1D5DB', '&:hover': { color: '#60A5FA' } }}>
//                                     <AccountCircleIcon />
//                                 </IconButton>
//                                 <IconButton component={RouterLink} to="/cart" aria-label="cart" sx={{ color: '#D1D5DB', '&:hover': { color: '#60A5FA' } }}>
//                                     <Badge badgeContent={cartItems.length} color="primary">
//                                         <ShoppingCartIcon />
//                                     </Badge>
//                                 </IconButton>
//                                 <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105">
//                                     Logout
//                                 </button>
//                             </>
//                         ) : (
//                             <button onClick={() => openAuthModal('login')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 font-medium">
//                                 Login / Sign Up
//                             </button>
//                         )}
//                     </div>

//                     <div className="md:hidden">
//                         <IconButton onClick={toggleDrawer(true)} aria-label="open menu" sx={{ color: 'white' }}>
//                             <MenuIcon />
//                         </IconButton>
//                     </div>

//                     <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { backgroundColor: '#111827', color: '#D1D5DB', width: '250px' } }}>
//                         <div className="p-4 flex flex-col h-full">
//                             <div className="flex justify-end">
//                                 <IconButton onClick={toggleDrawer(false)} aria-label="close menu"><CloseIcon sx={{ color: 'white' }} /></IconButton>
//                             </div>
//                             <div className="flex flex-col items-center gap-6 text-center mt-4">
//                                 {navLinks.map((item) => <NavLink key={item.title} path={item.path} title={item.title} isMobile={true} />)}
//                                 {currentUser ? (
//                                     <>
//                                         <RouterLink to="/profile" onClick={toggleDrawer(false)} className={clsx(linkClassName, 'text-xl py-2 w-full rounded-md text-gray-200 hover:bg-gray-700/50 flex items-center justify-center gap-2')}>
//                                             <AccountCircleIcon /> Profile
//                                         </RouterLink>
//                                         <RouterLink to="/cart" onClick={toggleDrawer(false)} className={clsx(linkClassName, 'text-xl py-2 w-full rounded-md text-gray-200 hover:bg-gray-700/50 flex items-center justify-center gap-2')}>
//                                             <ShoppingCartIcon /> Cart ({cartItems.length})
//                                         </RouterLink>
//                                         <button onClick={() => { handleLogout(); toggleDrawer(false)(); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4 w-full text-lg transition-transform duration-300 hover:scale-105">
//                                             Logout
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <button onClick={() => { openAuthModal('login'); toggleDrawer(false)(); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 w-full text-lg transition-transform duration-300 hover:scale-105">
//                                         Login / Sign Up
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </Drawer>
//                 </div>
//             </nav>

//             {currentUser && currentUser.isAnonymous && (
//                 <div
//                     className="fixed left-0 w-full z-[999] bg-amber-200 text-amber-900 text-center p-2 text-sm"
//                     style={{ top: navbarHeight }}
//                 >
//                     You are browsing as a Guest. To save your cart and data, please&nbsp;
//                     <button onClick={() => openAuthModal('signup')} className="font-bold underline hover:text-amber-950">
//                         create an account or sign in.
//                     </button>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Navbar;