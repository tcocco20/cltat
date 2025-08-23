"use client";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import {
  NavigationMenu,
  // NavigationMenuContent, These are for dropdown menus
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger, These are for dropdown menus
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import MobileNavMenu from "./MobileNavMenu";
import { Menu } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMenu } from "@/lib/actions/wordpress.actions";

const Header = () => {
  const [menuItems, setMenuItems] = useState<Menu>([]);
  const scrollPosition = useScrollPosition();
  const pathname = usePathname();

  useEffect(() => {
    const fallbackMenuItems = [
      { title: "Home", href: "/" },
      { title: "Sign Up", href: "/signup" },
    ] as Menu;
    const fetchMenuItems = async () => {
      const response = await getMenu("main-nav");
      const data = response ?? fallbackMenuItems;
      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full bg-foreground/60 text-background p-2 md:p-4 flex items-center justify-between md:justify-start gap-12 backdrop-blur-sm hover:bg-foreground/85 transition-all duration-300 z-50",
        scrollPosition === 0 ? "bg-foreground/85" : ""
      )}
    >
      <h1 className="text-xl md:text-2xl font-bold">Cornerstone Legacy</h1>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                href={item.href}
                className={cn("text-base", {
                  "font-bold bg-white text-foreground hover:opacity-80":
                    pathname === item.href,
                })}
                active={pathname === item.href}
              >
                {item.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <MobileNavMenu links={menuItems} />
    </header>
  );
};

export default Header;
