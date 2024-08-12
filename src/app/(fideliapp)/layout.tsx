import { TopMenu } from "@/components";
import { auth } from "@/auth.config";
import React from "react";
import { User } from "@/interfaces";

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

    return (
        <main>
            <TopMenu user={user} />
            <div className="flex flex-col items-center justify-center">
                <div className="container px-4 py-4">
                    <div className="max-w-4xl w-full mx-auto">
                        {passUserToChildren(children)}
                    </div>
                </div>
            </div>
        </main>
    );
}
