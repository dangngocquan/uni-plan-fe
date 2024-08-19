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
  DropdownItem,
  DropdownMenu,
  Avatar,
  Dropdown,
  DropdownTrigger,
  AvatarIcon,
} from "@nextui-org/react";
import { TbLogout } from "react-icons/tb";
import { useRouter } from "next/router";
import {
  getFromSessionStorage,
  getAdminAccessToken,
  logout,
  SESSION_STORAGE_KEYS,
} from "@/src/utils/sessionStorage";
import { AcmeLogo } from "@/src/components/UI/AcmeLogo";
import { ResponseAuthMe } from "@/src/api/response/auth";
import { REQUEST } from "@/src/api/request";

export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const [navKey, setNavKey] = useState("");
  const [user, setUser] = useState(new ResponseAuthMe());
  const [accessToken, setAccessToken] = useState(
    getFromSessionStorage(SESSION_STORAGE_KEYS.ADMIN_ACCESS_TOKEN_KEY)
  );

  useEffect(() => {
    const accessToken = getAdminAccessToken();
    if (accessToken) {
      REQUEST.AUTH_ME("ADMIN").then((res: any) => {
        if (!res.message) {
          setUser(res);
        }
      });
    } else {
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

      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="warning"
            href="#"
            variant="flat"
            startContent={<TbLogout />}
          ></Button>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        {(!getAdminAccessToken() && (
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
