import React from 'react';
import { BookA, Building, Cake, Camera, Coffee, Settings, ShoppingBag, ShoppingBagIcon, Utensils } from 'lucide-react';

interface CategoryIconProps {
    type: string;
    size?: number;
}

export const CategoryIcon = ({ type, size = 24 }: CategoryIconProps) => {
    const iconProps = { className: `h-${size} w-${size}` };

    switch (type) {
        case 'apartment-condo':
            return <Building {...iconProps} />;
        case 'service':
            return <Settings {...iconProps} />;
        case 'restaurant':
            return <Utensils {...iconProps} />;
        case 'cafe':
            return <Coffee {...iconProps} />;
        case 'bakery':
            return <Cake {...iconProps} />;
        case 'shop':
            return <ShoppingBagIcon {...iconProps} />;
        case 'snack':
            return <ShoppingBagIcon {...iconProps} />;
        case 'stationery':
            return <BookA {...iconProps} />;
        default:
            return <Camera {...iconProps} />;
    }
};
