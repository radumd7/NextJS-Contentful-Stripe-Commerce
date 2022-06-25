export interface ProductInterface {
    fields: {
        description: any
        gender: string[];
        images: Array<{
            fields: {
                title: string;
                file: {
                    url: string;
                    fileName: string;
                };
            };
        }>;
        price: number;
        sizes: string[];
        slug: string;
        title: string
    }
};

export interface CartProduct {
    id: string;
    title: string;
    price: number;
    size: string;
    quantity: number;
    image: {
        url: string;
        alt: string;
    };
};