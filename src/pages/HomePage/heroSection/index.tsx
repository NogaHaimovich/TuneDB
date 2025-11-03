import "./styles.scss";
import React from "react";
import { isHeroSectionVisible } from "../../../hooks/useScrollPosition";
import SearchBar from "../../../components/layout/SearchBar";
import Threads from "../../../components/animations/ThreadAnimation/Threads";

const HeroSection: React.FC = () => {
  const { isHeroVisible } = isHeroSectionVisible();

  return (
    <section className="hero">
      <div className="threads-container">
        <Threads color={[0.61, 0.35, 0.71]} amplitude={1.2} enableMouseInteraction />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">Your Ultimate Songs Database</h1>
        <h2 className="hero__subtitle">
          Search, explore and save your favorite music
        </h2>

        {isHeroVisible && <SearchBar />}
      </div>
    </section>
  );
};

export default HeroSection;
