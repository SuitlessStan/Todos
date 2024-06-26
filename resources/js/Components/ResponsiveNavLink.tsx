import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? "border-darkseagreen text-darkseagreen bg-darkseagreen focus:text-darkseagreen focus:bg-darkseagreen focus:darkseagreen"
                    : "border-transparent text-blacklike hover:text-blacklike hover:bg-gray-50 hover:border-gray-300 focus:text-blacklike focus:bg-gray-50 focus:border-gray-300"
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
