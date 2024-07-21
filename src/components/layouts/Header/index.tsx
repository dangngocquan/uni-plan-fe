import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { useRouter } from "next/router";
import {
  getFromSessionStorage,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";

export default function Header() {
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [accessToken, setAccessToken] = useState(
    getFromSessionStorage(SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY)
  );
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
        {(!accessToken && (
          <NavbarItem>
            <Link href={"/auth/signin"} className="pr-[1rem]">
              Login
            </Link>
            <Button as={Link} color="primary" href="#" variant="flat">
              <Link href={"/auth/signup"}>Sign Up</Link>
            </Button>
          </NavbarItem>
        )) || (
          <NavbarItem>
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
            />
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
