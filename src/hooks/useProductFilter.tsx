import { useState, useEffect } from "react";
import { Product } from "@/interfaces/product.interface";

export const useProductFilter = (
    products: Product[],
    searchTerm: string,
    itemsPerPage?: number // Optional parameter for pagination
) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const normalizeString = (str: string) => {
        return str
            .normalize("NFD") // Normalize to decomposed form (NFD)
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks (accents)
            .toLowerCase(); // Make lowercase for case-insensitive comparison
    };

    useEffect(() => {
        const filtered = products.filter((product) => {
            const normalizedSearchTerm = normalizeString(searchTerm);
            const normalizedName = normalizeString(product.name);
            const normalizedDescription = product.description
                ? normalizeString(product.description)
                : "";

            const matchesName = normalizedName.includes(normalizedSearchTerm);
            const matchesDescription = normalizedDescription.includes(normalizedSearchTerm);

            return matchesName || matchesDescription;
        });

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset pagination when filters change
    }, [searchTerm, products]);

    useEffect(() => {
        if (itemsPerPage) {
            setVisibleProducts(filteredProducts.slice(0, currentPage * itemsPerPage));
        } else {
            setVisibleProducts(filteredProducts); // Show all if itemsPerPage is not provided
        }
    }, [currentPage, filteredProducts, itemsPerPage]);

    const loadMore = () => {
        if (itemsPerPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return { visibleProducts, loadMore, filteredProducts };
};
