import React, { useEffect, useState } from "react";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AcmeLogo } from "../../../UI/AcmeLogo";
import { useRouter } from "next/router";
import { getUserAccessToken, logout } from "@/src/utils/sessionStorage";
import { REQUEST } from "@/src/api/request";
import { ResponseAuthMe } from "@/src/api/response/auth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [user, setUser] = useState(new ResponseAuthMe());
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

  useEffect(() => {
    const accessToken = getUserAccessToken();
    if (accessToken) {
      REQUEST.AUTH_ME().then((res: any) => {
        if (!res.message) {
          setUser(res);
        }
      });
    }
  }, [router]);

  const onClickNav = (navKey: string, link: string) => {
    return () => {
      if (link !== "#") {
        router.push(link);
      }
      setNavKey(navKey);
    };
  };

  const handleLogout = () => {
    logout();
    router.reload();
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">UNIPLAN</p>
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
        {(!getUserAccessToken() && (
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
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  icon={<AvatarIcon />}
                  isBordered
                  as="button"
                  className="transition-transform"
                  classNames={{
                    // base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    icon: "text-black/80",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="my-plans"
                  color="primary"
                  onClick={() => {router.push('/plan')}}
                >
                  My Plans
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
