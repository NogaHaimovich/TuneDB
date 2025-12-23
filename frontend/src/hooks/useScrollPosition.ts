import { useState, useEffect } from "react";

export const isHeroSectionVisible = (threshold: number = 100) => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    let timer: number | null = null;

    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(() => {
        setIsHeroVisible(window.scrollY < threshold);
      }, 50); 
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [threshold]);

  return { isHeroVisible };
};
