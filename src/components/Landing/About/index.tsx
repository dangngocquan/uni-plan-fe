import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import Link from "next/link";
import { Button } from "@nextui-org/react";


const About = () => {
  const router = useRouter();
  return (
    <div className={classNames(styles.wrapper)}>
        <p className="font-bold text-xl pb-[2rem] text-center">Mission: At Uni Plan, our mission is to empower students to take control
        of their academic future by providing the tools and resources they need
        to succeed.</p>
        <p className="font-bold text-xl pb-[5rem] text-center">
        
        Team Introduction: Meet our team of educators, developers, and advisors
        dedicated to making your academic planning as seamless as possible.
        </p>
        
    </div>
  );
};

export default About;
