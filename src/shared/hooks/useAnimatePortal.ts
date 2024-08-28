import { useEffect, useState } from "react";

const useAnimatePortal = (isOpen: boolean) => {
  const [hasActiveClass, setActiveClass] = useState(false);
  const [isOpenPortal, setOpenPortal] = useState(false);

  const onAnimationEnd = () => {
    if (!isOpen) setOpenPortal(false);
  };

  useEffect(() => {
    if (isOpen) {
      setOpenPortal(true);
      setTimeout(() => setActiveClass(true), 50);
      document.body.setAttribute("data-fixed-scroll", "");
    } else {
      setActiveClass(false);
      document.body.removeAttribute("data-fixed-scroll");
    }
  }, [isOpen]);

  return { hasActiveClass, isOpenPortal, onAnimationEnd };
};
export default useAnimatePortal;
