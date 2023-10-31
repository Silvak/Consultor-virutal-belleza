import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useSession } from 'next-auth/react';

/**
 * The HorizontalMenu component renders a navigation menu with links based on the provided routes.
 * @returns a JSX element representing a horizontal navigation menu. The menu is rendered using the
 * `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, and `NavigationMenuLink` components.
 * The menu items are generated dynamically based on the `routes` prop, which is an array of objects
 * containing the label and route for each menu item. Each menu item is rendered as a `Link`
 */
export default function HorizontalMenu({ routes }) {
	const { data: session, status } = useSession();

	return (
		<NavigationMenu className="hidden lg:flex">
			<NavigationMenuList>
				<NavigationMenuItem>
					{status === 'authenticated' &&
						routes.map(({ label, route }) => (
							<Link href={route} legacyBehavior passHref id={route} key={route}>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent`}
								>
									{label}
								</NavigationMenuLink>
							</Link>
						))}

					{status === 'authenticated' &&
						session.user.user.rol === 'ADMIN_ROLE' && (
							<Link
								href="/dashboard/admin"
								legacyBehavior
								passHref
								id="/dashboard/admin"
								key="/dashboard/admin"
							>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent`}
								>
									Dashboard
								</NavigationMenuLink>
							</Link>
						)}

					{status === 'authenticated' &&
						session.user.user.rol === 'ESPEC_ROLE' && (
							<Link
								href="/dashboard/specialist"
								legacyBehavior
								passHref
								id="/dashboard/specialist"
								key="/dashboard/specialist"
							>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent`}
								>
									Dashboard
								</NavigationMenuLink>
							</Link>
						)}

					{status == 'unauthenticated' && (
						<>
							<Link
								href="/login"
								legacyBehavior
								passHref
								id="/login"
								key="/login"
							>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent`}
								>
									Login
								</NavigationMenuLink>
							</Link>
							<Link
								href="/register"
								legacyBehavior
								passHref
								id="/register"
								key="/register"
							>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent`}
								>
									Sign Up
								</NavigationMenuLink>
							</Link>
						</>
					)}
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
