"use client";

import { clientAdminNavItems } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";

const ClientAdminBreadcrumb = () => {
    const pathname = usePathname();
    const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];

    // Extract the UUID from the path
    const clientId = pathSegments.find((segment) =>
        /^[0-9a-fA-F-]{36}$/.test(segment)
    );

    // Filter out "client" and the UUID
    const filteredSegments = pathSegments.filter(
        (segment) =>
            segment !== "client" && segment !== clientId
    );

    // Create a mapping of links to labels
    const linkToLabelMap = clientAdminNavItems.reduce((acc, item) => {
        acc[item.link] = item.label;
        return acc;
    }, {} as Record<string, string>);

    // Check if we are on the "Inicio" page
    const isInicioPage = pathname === `/client/${clientId}/`;

    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ul className="flex text-sm text-gray-600">
                {/* Conditionally render "Inicio" only if not the last breadcrumb */}
                {filteredSegments.length > 0 && (
                    <li className="flex items-center">
                        <Link
                            href={`/client/${clientId}/`}
                            className="flex items-baseline hover:underline"
                        >
                            Inicio
                        </Link>
                    </li>
                )}

                {filteredSegments.map((segment, index) => {
                    const href = `/${filteredSegments
                        .slice(0, index + 1)
                        .join("/")}`;
                    const isLast = index === filteredSegments.length - 1;
                    const label = linkToLabelMap[segment] || segment; // Use label or fallback to segment

                    // Skip rendering "Inicio" as the last breadcrumb
                    if (isLast && label === "Inicio") {
                        return null;
                    }

                    return (
                        <li key={href} className="flex items-center">
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span className="text-gray-900 font-medium">
                                    {decodeURIComponent(label)}
                                </span>
                            ) : (
                                <Link href={href} className="hover:underline">
                                    {decodeURIComponent(label)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default ClientAdminBreadcrumb;
