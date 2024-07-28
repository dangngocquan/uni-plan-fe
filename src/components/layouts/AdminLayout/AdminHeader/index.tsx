import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/router";
import {
  getFromSessionStorage,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
import { AcmeLogo } from "@/src/components/UI/AcmeLogo";

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [accessToken, setAccessToken] = useState(
    getFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY)
  );

  useEffect(() => {
    if (!getFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY)) {
      router.push("/admin/login");
    }
  }, [accessToken, router]);

  const menuItems = [
    {
      text: "Schools",
      link: "/admin/school",
    },
    {
      text: "Majors",
      link: "/admin/major",
    },
    {
      text: "Courses",
      link: "/admin/course",
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
        {menuItems.map((item, index) => (
          <NavbarItem
            className="px-2"
            key={item.text}
            isActive={item.text === navKey}
          >
            <Link
              color={item.text === navKey ? "primary" : "foreground"}
              href={item.link}
              onPressEnd={onClickNav(item.text, item.link)}
            >
              {item.text}
            </Link>
          </NavbarItem>
        ))}
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
        {menuItems.map((item) => (
          <NavbarMenuItem
            className="px-2"
            key={item.text}
            isActive={item.text === navKey}
          >
            <Link
              color={item.text === navKey ? "primary" : "foreground"}
              href={item.link}
              onPressEnd={onClickNav(item.text, item.link)}
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="warning"
            href="#"
            variant="flat"
            startContent={<TbLogout />}
          ></Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
