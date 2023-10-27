"use client";
import Link from "next/link";
import { DarkMode } from "../ModeToggleTheme";
import HorizontalMenu from "./HorizontalMenu";
import SidebarContent from "./SidebarContent";

//cn components
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//temporal routes
export const routes = [
  {
    label: "Home",
    route: "/home",
  },
  {
    label: "Blog",
    route: "/blog",
  },
  {
    label: "Products",
    route: "/products",
  },
  {
    label: "Consult",
    route: "/upload",
  },
  {
    label: "Profile",
    route: "/profile",
  },
  {
    label: "Dashboard",
    route: "/dashboard/admin",
  },
  {
    label: "Register",
    route: "/register",
  },
  {
    label: "Login",
    route: "/login",
  },
];

/**
 * The `Navbar` function returns a JSX element representing a navigation bar component with a logo,
 * desktop menu, sidebar, user information, navigation links, and a logout button.
 * @returns The function `Navbar` returns a JSX element representing the navigation bar component.
 */
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-screen h-[60px] border-b border-gray-300/50 bg-white-40 backdrop-blur-md">
      <nav className="flex w-full h-full justify-between items-center px-8">
        {/*Logo */}
        <Link href="/home" className="font-semibold">
          CBV-IA
        </Link>

        {/* Desktop Menu */}
        <HorizontalMenu routes={routes} />

        <div className="flex items-center h-full gap-4">
          {/* DarkMode */}
          <DarkMode />

          {/* Sidebar */}
          <Sheet className="">
            <SheetTrigger>
              <Avatar className="rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </SheetTrigger>

            <SheetContent className="w-[400px] sm:w-[540px] p-0">
              <SidebarContent routes={routes} />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
