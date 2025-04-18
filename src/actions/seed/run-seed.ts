"use server";

import { auth } from "@/auth.config";
import { UserRole as UserRoleData } from "@/interfaces";
import prisma from "@/lib/prisma";
import { initialData } from "@/seed/seed";
import { generateSlug } from "@/utils";
import { UserRole } from "@prisma/client";

export const runSeed = async () => {
    console.log("Starting seed");

    const session = await auth();
    const userRole = session?.user.role;

    if (userRole !== UserRole.ADMIN) {
        console.log("Unauthorized: Only ADMIN can run the seed script.");
        return;
    }

    try {
        // Clear existing data
        await prisma.alert.deleteMany(); 
        await prisma.transactionProduct.deleteMany();
        await prisma.pointTransaction.deleteMany();
        await prisma.pointTransactionTemplate.deleteMany();
        await prisma.productImage.deleteMany();
        await prisma.product.deleteMany();
        await prisma.pin.deleteMany();
        await prisma.card.deleteMany();
        await prisma.companyReview.deleteMany();
        await prisma.companyLogo.deleteMany();
        await prisma.company.deleteMany();
        await prisma.activityType.deleteMany();
        await prisma.subCategory.deleteMany();
        await prisma.user.deleteMany();


        // Insert users
        const { users, companies, activityTypes, subCategories } = initialData;
        await prisma.user.createMany({ data: users });

        // Insert subCategories
        const subCategoryResults = await Promise.all(
            subCategories.map((subCat) =>
                prisma.subCategory.create({ data: subCat })
            )
        );

        // Create a map of subCategory names to IDs
        const subCategoryMap = subCategoryResults.reduce(
            (map, subCat) => {
                map[subCat.name] = subCat.id;
                return map;
            },
            {} as Record<string, string>
        );

        // Insert activity types with subCategoryId
        const activityTypeResults = await Promise.all(
            activityTypes.map((activityType) =>
                prisma.activityType.create({
                    data: {
                        name: activityType.name,
                        category: activityType.category,
                        subCategory: {
                            connect: {
                                id: subCategoryMap[activityType.subCategoryName],
                            },
                        },
                    },
                })
            )
        );

        // Create a map of activity type names to IDs
        const activityTypeMap = activityTypeResults.reduce(
            (map, activityType) => {
                map[activityType.name] = activityType.id;
                return map;
            },
            {} as Record<string, string>
        );

        // Retrieve created users
        const usersDB = await prisma.user.findMany();
        const usersMap = usersDB.reduce(
            (map, user) => {
                map[user.email.toLowerCase()] = user;
                return map;
            },
            {} as Record<string, { id: string; email: string; role: UserRoleData }>
        );

        // Track created userIds to avoid duplicates
        const createdUserIds = new Set<string>();
        const createdCompanies = [];

        // Default open hours
        const defaultOpenHours = {
            mon: { from: "09:00", to: "17:00" },
            tue: { from: "09:00", to: "17:00" },
            wed: { from: "09:00", to: "17:00" },
            thu: { from: "09:00", to: "17:00" },
            fri: { from: "09:00", to: "17:00" },
            sat: { from: "09:00", to: "17:00" },
            sun: { closed: true },
        };

        // Create companies and logos for CLIENT users
        for (const companyData of companies) {
            const user = usersMap[companyData.userEmail.toLowerCase()];
            if (user && user.role === "CLIENT") {
                if (!createdUserIds.has(user.id)) {
                    const slug = generateSlug(companyData.name, user.id);
                    const company = await prisma.company.create({
                        data: {
                            name: companyData.name,
                            slug: slug,
                            activityTypeId: activityTypeMap[companyData.activityType],
                            backgroundColor: companyData.backgroundColor,
                            address: companyData.address,
                            lat: companyData.lat,
                            lng: companyData.lng,
                            openHours: defaultOpenHours,
                            userId: user.id,
                        },
                    });

                    // Create logo for the company
                    console.log('creatingLogo')
                    await prisma.companyLogo.create({
                        data: {
                            url: companyData.logo,
                            companyId: company.id,
                        },
                    });
                    console.log('created')
                    createdUserIds.add(user.id);
                    createdCompanies.push(company);
                    console.log(company)
                }
            }
        }

        // Create 3 random cards for each user with role 'USER'
        const userUsers = usersDB.filter((user) => user.role === UserRole.USER);
        for (const user of userUsers) {
            const shuffledCompanies = createdCompanies.sort(() => 0.5 - Math.random());
            const selectedCompanies = shuffledCompanies.slice(0, 3);

            for (const company of selectedCompanies) {
                const randomPoints = Math.floor(Math.random() * 1001);
                const randomFavourite = Math.random() < 0.5;

                await prisma.card.create({
                    data: {
                        points: randomPoints,
                        favourite: randomFavourite,
                        userId: user.id,
                        companyId: company.id,
                    },
                });
            }
        }

        console.log("Seed executed successfully");
    } catch (error) {
        console.error("Error during seed execution:", error);
    } finally {
        await prisma.$disconnect();
    }
};
