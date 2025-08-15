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

const Header = () => {
  const scrollPosition = useScrollPosition();

  const menuItems = [
    { title: "Home", link: "#" },
    { title: "Sign Up", link: "#" },
    { title: "Contact Us", link: "#" },
    { title: "About Us", link: "#" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 bg-foreground/60 text-background p-2 md:p-4 flex items-center justify-start gap-12 backdrop-blur-md hover:bg-foreground/80 transition-all duration-300 z-50",
        scrollPosition === 0 ? "bg-foreground/85" : ""
      )}
    >
      <h1 className="text-2xl font-bold">Cornerstone Legacy</h1>
      <NavigationMenu>
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink href={item.link} className="text-base">
                {item.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
