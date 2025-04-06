import { useState, useEffect } from "react";
import { Product } from "@/interfaces/product.interface";

export const useProductFilter = (
    products: Product[],
    searchTerm: string,
    productType: string,
    itemsPerPage?: number
) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const normalizeString = (str: string) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    useEffect(() => {
        const normalizedSearchTerm = normalizeString(searchTerm);

        const filtered = products.filter((product) => {
            const normalizedName = normalizeString(product.name);
            const normalizedDescription = product.description
                ? normalizeString(product.description)
                : "";

            const matchesName = normalizedName.includes(normalizedSearchTerm);
            const matchesDescription = normalizedDescription.includes(normalizedSearchTerm);
            const matchesType = productType ? product.productType === productType : true;

            return (matchesName || matchesDescription) && matchesType;
        });

        // Sort by productType (alphabetically by default)
        const sorted = [...filtered].sort((a, b) => a.productType.localeCompare(b.productType));

        setFilteredProducts(sorted);
        setCurrentPage(1);
    }, [searchTerm, productType, products]);

    useEffect(() => {
        if (itemsPerPage) {
            setVisibleProducts(filteredProducts.slice(0, currentPage * itemsPerPage));
        } else {
            setVisibleProducts(filteredProducts);
        }
    }, [currentPage, filteredProducts, itemsPerPage]);

    const loadMore = () => {
        if (itemsPerPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return { visibleProducts, loadMore, filteredProducts };
};
