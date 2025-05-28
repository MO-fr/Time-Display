import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const MenuSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" }, // Updated path
    { name: "Progress Hub", path: "/achievements" }, // Updated path
  ];

  // Variants for the menu backdrop and panel
  const backdropVariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };
  const panelVariants = {
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      scale: 0.95,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
  };

  // Variants for menu items
  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    closed: { opacity: 0, y: 20 },
  };

  return (
    <>
      {/* Menu trigger button */}      <button
        onClick={() => setIsOpen(!isOpen)}
        className="menu-trigger-button"
        style={{ zIndex: 1000, position: 'relative' }}
      >
        {/* Hamburger or X icon */}
        {isOpen ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Menu backdrop and panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-backdrop"
            onClick={() => setIsOpen(false)}
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          >            <motion.div
              className="menu-panel"
              onClick={(e) => e.stopPropagation()}
              variants={panelVariants}
            >
              <div className="menu-header">
                <h2 className="menu-title">Timer Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="menu-close-button"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <motion.div
                className="menu-navigation"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    <Link
                      to={item.path}
                      className="menu-item"
                      style={{ color: "#333", textDecoration: "none" }}
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
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