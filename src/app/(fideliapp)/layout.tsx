import { AppFooter, Footer, MapProvider, TopMenu } from "@/components";
import { auth } from "@/auth.config";
import React from "react";
import { Alert, User } from "@/interfaces";
import { getAlertsByUser, getCompanyByUser } from "@/actions";

export default async function BaseLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user || null;

    // Pass user prop to all children
    const passUserToChildren = (children: React.ReactNode): React.ReactNode => {
        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                // Clone child with additional user prop
                return React.cloneElement(child as React.ReactElement<{ user?: User | null }>, { user });
            }
            return child;
        });
    };

    const company = await getCompanyByUser(user ? user.id : "");
    const alertsResult = await getAlertsByUser(user ? user.id : "");

    const alerts: Alert[] = alertsResult.ok && alertsResult.alerts ? alertsResult.alerts : [];
    const unseenAlerts: Alert[] = alerts.filter(alert => alert.status === 'NOT_SEEN');

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <TopMenu user={user} company={company} alerts={alerts} unseenAlerts={unseenAlerts.length} />
                <div className="flex flex-col items-center justify-center">
                    <div className="container px-4 py-4 mb-20 sm:mb-0">
                        <div className="max-w-4xl w-full mx-auto">
                            {passUserToChildren(children)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <AppFooter userId={user?.id} />
        </div>
    );
}
