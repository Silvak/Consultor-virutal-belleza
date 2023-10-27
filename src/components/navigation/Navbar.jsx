"use client";
import Link from "next/link";
//cn components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//temporal routes
const links = [
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
    label: "Upload",
    route: "/upload",
  },
  {
    label: "Profile",
    route: "/profile",
  },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-screen h-[56px] border-b border-gray-200 bg-white-50 backdrop-blur-md">
      <nav className="flex w-full h-full justify-between items-center px-8">
        {/*Logo */}
        <Link href="/home" className="font-semibold">
          CBV-IA
        </Link>

        {/* Desktop Menu */}
        <NavigationMenu className="sm:hidden md:flex">
          <NavigationMenuList>
            {links.map(({ label, route }) => (
              <NavigationMenuItem key={route}>
                <Link href={route} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Sidebar */}
        <Sheet className="">
          <SheetTrigger>
            <Avatar className="rounded-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] p-0">
            {/* User*/}
            <div className="flex items-center w-full gap-4 border-b border-gray-200  px-8 py-6">
              <Avatar className="w-24 h-24 rounded-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold mt-2">Nombre Usuario</h3>
                <p className="text-sm">user@gmail.com</p>
              </div>
            </div>

            {/* Navigation  */}
            <ul className="flex flex-col gap-2 px-6 py-8 ">
              <h4 className="font-semibold px-2">Menú</h4>
              {links.map(({ label, route }) => (
                <li
                  key={route}
                  id={route}
                  className="flex items-center h-[42px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
                >
                  <Link href={route}>{label}</Link>
                </li>
              ))}
            </ul>

            {/* Logout */}
            <div className="flex justify-left items-center px-6 py-8">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-sm px-4 py-2">
                Logout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
