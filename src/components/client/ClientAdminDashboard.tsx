"use client";

import { CompanyClientDashboard, Product } from "@/interfaces";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { FiStar, FiShoppingCart, FiUser, FiTag, FiMessageSquare, FiGlobe } from "react-icons/fi";

interface Props {
    company: CompanyClientDashboard;
    products: Product[];
    transactions: CompanyTransaction[];
}

export const ClientAdminDashboard = ({ company, products, transactions }: Props) => {
    const totalTransactions = transactions.length;
    const totalCardsCreated = transactions.filter(t => t.type === "MANUAL").length; // Assuming MANUAL type represents card creation
    const totalProducts = products.length;
    const totalReviews = transactions.filter(t => t.companyReview).length;
    const companyRating = company.averageRating;

    // Calculate total points for each transaction type
    const manualTransactions = transactions.filter(t => t.type === "MANUAL");
    const manualPoints = manualTransactions.reduce((acc, t) => acc + t.points, 0);

    const buyTransactions = transactions.filter(t => t.type === "BUY");
    const buyPoints = buyTransactions.reduce((acc, t) => acc + t.points, 0);

    const rewardTransactions = transactions.filter(t => t.type === "REWARD");
    const rewardPoints = rewardTransactions.reduce((acc, t) => acc + t.points, 0);

    return (
        <div className="flex flex-wrap w-full gap-4 p-4">
            {/* Total Transactions */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4" >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Total Transactions</h3>
                    <FiShoppingCart className="text-slate-600 text-3xl" />
                </div>
                <p className="text-3xl font-bold mt-2 text-slate-800">{totalTransactions}</p>
                <div className="mt-2 text-slate-700">
                    <p><strong>Manual Transactions:</strong> {manualTransactions.length} - {manualPoints} points</p>
                    <p><strong>Buy Transactions:</strong> {buyTransactions.length} - {buyPoints} points</p>
                    <p><strong>Reward Transactions:</strong> {rewardTransactions.length} - {rewardPoints} points</p>
                </div>
            </div >

            {/* Total Cards Created */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4" >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Total Cards Created</h3>
                    <FiUser className="text-slate-600 text-3xl" />
                </div>
                <p className="text-3xl font-bold mt-2 text-slate-800">{totalCardsCreated}</p>
            </div >

            {/* Total Products */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4" >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Total Products</h3>
                    <FiTag className="text-slate-600 text-3xl" />
                </div>
                <p className="text-3xl font-bold mt-2 text-slate-800">{totalProducts}</p>
            </div >

            {/* Total Reviews */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4" >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Total Reviews</h3>
                    <FiMessageSquare className="text-slate-600 text-3xl" />
                </div>
                <p className="text-3xl font-bold mt-2 text-slate-800">{totalReviews}</p>
            </div >

            {/* Company Rating */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4" >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Company Rating</h3>
                    <FiStar className="text-slate-600 text-3xl" />
                </div>
                <p className="text-3xl font-bold mt-2 text-slate-800">{companyRating.toFixed(1)} / 5</p>
            </div >

            {/* Additional Widgets */}
            {/* Social Links */}
            <div className="w-full md:w-1/3 border bg-white border-slate-200 rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-700">Social Links</h3>
                    <FiGlobe className="text-slate-600 text-3xl" />
                </div>
                <ul className="mt-2 space-y-1">
                    {company.instagram && <li>Instagram: <a href={company.instagram} className="text-blue-300 underline">Link</a></li>}
                    {company.facebook && <li>Facebook: <a href={company.facebook} className="text-blue-300 underline">Link</a></li>}
                    {company.twitter && <li>Twitter: <a href={company.twitter} className="text-blue-300 underline">Link</a></li>}
                </ul>
            </div>
        </div>
    );
};
