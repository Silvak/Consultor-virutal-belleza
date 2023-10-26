import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

/**
 * The HorizontalMenu component renders a navigation menu with links based on the provided routes.
 * @returns a JSX element representing a horizontal navigation menu. The menu is rendered using the
 * `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, and `NavigationMenuLink` components.
 * The menu items are generated dynamically based on the `routes` prop, which is an array of objects
 * containing the label and route for each menu item. Each menu item is rendered as a `Link`
 */
export default function HorizontalMenu({ routes }) {
  return (
    <NavigationMenu className="sm:hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          {routes.map(({ label, route }) => (
            <Link href={route} legacyBehavior passHref id={route} key={route}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {label}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
