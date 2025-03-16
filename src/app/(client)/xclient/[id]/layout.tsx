import { AppFooter, Footer, MapProvider, TopMenu } from "@/components";
import { auth } from "@/auth.config";
import React from "react";
import { Alert, User } from "@/interfaces";
import { getAlertsByUser, getCompanyByUser } from "@/actions";
import Sidebar from "@/components/ui/sidebar/Sidebar";
import ClientAdminBreadcrumb from "@/components/ui/breadcrumnb/ClientAdminBreadcrumb";

export default async function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user || null;

    // Pass user prop to all children
    const passUserToChildren = (children: React.ReactNode): React.ReactNode => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                // Clone child with additional user prop
                return React.cloneElement(
                    child as React.ReactElement<{ user?: User | null }>,
                    { user }
                );
            }
            return child;
        });
    };

    const company = await getCompanyByUser(user ? user.id : "");
    const alertsResult = await getAlertsByUser(user ? user.id : "");

    const alerts: Alert[] =
        alertsResult.ok && alertsResult.alerts ? alertsResult.alerts : [];
    const unseenAlerts: Alert[] = alerts.filter(
        (alert) => alert.status === "NOT_SEEN"
    );

    return (
        <div className="flex flex-row h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar company={company} />
            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-hidden">
                <div className="flex-grow overflow-y-auto">
                    <div className="container px-4 py-4 mt-4 sm:mt-0 mb-20 sm:mb-0">
                    <ClientAdminBreadcrumb />
                        <div className="w-full mx-auto">
                            {passUserToChildren(children)}
                        </div>
                    </div>
                </div>
                {/* Footer (if needed) */}
                <AppFooter />
            </div>
        </div>
    );
}