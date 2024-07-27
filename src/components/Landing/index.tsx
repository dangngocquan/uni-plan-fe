import classNames from "classnames";
import MainLayout from "../layouts/MainLayout";
import About from "./About";
import HeroSection from "./HeroSection";

import styles from "./index.module.scss";

const LandingPage = () => {
  return (
    <div className={classNames(styles.wrapper)}>
      <MainLayout>
        <HeroSection />
        <About/>
      </MainLayout>
    </div>
  );
};

export default LandingPage;
