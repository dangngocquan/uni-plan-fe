import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import Link from "next/link";
import { Button } from "@nextui-org/react";


const HeroSection = () => {
  const router = useRouter();
  return (
    <div className={classNames(styles.wrapper)}>
        <p className="font-bold text-3xl pb-[2rem] text-center">Plan Your Perfect Academic Journey with Uni Plan</p>
        <p className="font-bold text-xl pb-[5rem] text-center">
          Discover university curricula, plan your courses, and achieve your
          educational goals effortlessly.
        </p>
        <Button color="secondary" variant="shadow" className="h-[4rem] w-[15rem] transition-all">
          <Link href={"#"} className="text-xl font-bold">Explore now</Link>
        </Button>
        
    </div>
  );
};

export default HeroSection;
