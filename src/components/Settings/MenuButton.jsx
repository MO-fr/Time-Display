import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Menu, X, HomeIcon, Award } from "lucide-react";

const MenuSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Progress Hub", path: "/achievements", icon: <Award className="w-5 h-5" /> },
  ];

  const backdropVariants = {
    open: { 
      opacity: 1, 
      backdropFilter: "blur(8px)",
      transition: { duration: 0.3 } 
    },
    closed: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3 } 
    },
  };

  const panelVariants = {
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
  };

  const itemVariants = {
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 } 
    },
    closed: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="themed-button round"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-backdrop"
            onClick={() => setIsOpen(false)}
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
          >
            <motion.div
              className="menu-panel"
              onClick={(e) => e.stopPropagation()}
              variants={panelVariants}
            >
              <div className="menu-header">
                <h2 className="menu-title">Timer Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="menu-close-button"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <motion.div className="menu-navigation">
                {menuItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      to={item.path}
                      className="menu-item"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span className="menu-item-text">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Component prop types
MenuSlider.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default MenuSlider;