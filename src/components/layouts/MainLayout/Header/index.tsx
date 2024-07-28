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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { AcmeLogo } from "../../../UI/AcmeLogo";
import { useRouter } from "next/router";
import {
  getFromSessionStorage,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [accessToken, setAccessToken] = useState(
    getFromSessionStorage(SESSION_STORAGE_KEYS.ACCESS_TOKEN_KEY)
  );
  const navigations = [
    {
      text: "Home",
      link: "/",
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

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        {navigations.map((nav) => {
          return (
            <NavbarMenuItem
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
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>

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
