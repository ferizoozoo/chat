import { useState } from "react";
import "../../assets/styles/common/hamburger.css";

type IconProps = {
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  ariaExpanded?: boolean;
};

export const HamburgerIcon = ({
  onClick,
  ariaLabel = "Toggle menu",
  className = "",
  ariaExpanded,
}: IconProps) => {
  return (
    <button
      className={["hamburger-button", className].filter(Boolean).join(" ")}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
    >
      <div className="hamburger-lines">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>
    </button>
  );
};

interface HamburgerProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Hamburger = ({
  isOpen = false,
  onOpen,
  onClose,
  children,
}: HamburgerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    if (newState && onOpen) {
      onOpen();
    } else if (!newState && onClose) {
      onClose();
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <HamburgerIcon
        onClick={toggleMenu}
        ariaLabel="Toggle menu"
        ariaExpanded={isMenuOpen}
      />

      {isMenuOpen && (
        <div className="hamburger-overlay" onClick={closeMenu}>
          <div className="hamburger-menu" onClick={(e) => e.stopPropagation()}>
            {children}
            <button className="hamburger-close" onClick={closeMenu}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hamburger;
