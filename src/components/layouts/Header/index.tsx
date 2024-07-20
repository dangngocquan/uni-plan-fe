import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const navigations = [
    {
      text: "Home",
      link: "#",
    },
    {
      text: "Features",
      link: "#",
    },
    {
      text: "Schools",
      link: "/school",
    },
    {
      text: "About",
      link: "#",
    },
    {
      text: "Contact",
      link: "#",
    },
  ];

  const onClickNav = (navKey: string, link: string) => {
    return () => {
      if (link !== "#") {
        router.push(link);
      }
      setNavKey(navKey);
    };
  };

  console.log(navKey);

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        {navigations.map((nav) => {
          return (
            <NavbarItem
              className="px-2"
              key={nav.text}
              isActive={nav.text === navKey}
            >
              <Link
                color={nav.text === navKey ? "primary" : "foreground"}
                href={nav.link}
                onPressEnd={onClickNav(nav.text, nav.link)}
              >
                {nav.text}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link href={"/auth/signin"}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
