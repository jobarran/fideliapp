// utils/translateProductType.ts

export const translateProductType = (productType: "PRODUCT" | "PROMOTION"): string => {
    switch (productType) {
        case "PRODUCT":
            return "Producto"; // Translate "PRODUCT" to Spanish
        case "PROMOTION":
            return "Promocion"; // Translate "PROMOTION" to Spanish
        default:
            return productType; // Return original value if not found (though this shouldn't happen with current input types)
    }
};
