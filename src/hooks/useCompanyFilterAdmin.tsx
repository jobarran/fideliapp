import { useState, useMemo } from "react";
import { Company } from "@/interfaces";

const useCompanyFilterAdmin = (companies: Company[]) => {
    const [filters, setFilters] = useState({
        text: "",
        active: "",
        validated: "",
        sortBy: "",
    });

    const setFilter = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const filteredCompanies = useMemo(() => {
        let result = companies;

        if (filters.text) {
            const text = filters.text.toLowerCase();
            result = result.filter(
                (company) =>
                    company.name.toLowerCase().includes(text) ||
                    company.slug.toLowerCase().includes(text) ||
                    company.user.name.toLowerCase().includes(text) ||
                    company.user.lastName.toLowerCase().includes(text)
            );
        }

        if (filters.active) {
            const isActive = filters.active === "true";
            result = result.filter((company) => company.active === isActive);
        }

        if (filters.validated) {
            const isValidated = filters.validated === "true";
            result = result.filter((company) => company.validated === isValidated);
        }

        if (filters.sortBy) {
            result = [...result].sort((a, b) => {
                const key = filters.sortBy as keyof Company;
                if (typeof a[key] === "string" && typeof b[key] === "string") {
                    return (a[key] as string).localeCompare(b[key] as string);
                }
                return 0;
            });
        }

        return result;
    }, [companies, filters]);

    return { filters, setFilter, filteredCompanies };
};

export default useCompanyFilterAdmin;
