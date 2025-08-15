"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LinkData } from "@/lib/types";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface MobileNavMenuProps {
  links: LinkData[];
}

const MobileNavMenu = ({ links }: MobileNavMenuProps) => {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  return (
    <div className="flex md:hidden items-center">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cornerstone Legacy</SheetTitle>
          </SheetHeader>
          <nav className="w-full px-4">
            <ul>
              {links.map((link) => (
                <li key={link.title}>
                  <Button
                    asChild
                    variant={pathname === link.href ? "default" : "ghost"}
                    className="w-full"
                  >
                    <Link href={link.href}>{link.title}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavMenu;
