export interface IProduct {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    rating: rating;
    category: string;
}

interface rating {
    rate: number;
    count: number;
}