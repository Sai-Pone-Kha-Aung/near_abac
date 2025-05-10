import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Building, Cake, Camera, ChevronRight, Coffee, Home, ShoppingBag, Utensils } from 'lucide-react'
import { CategoryType } from '@/types/types';
import { cn } from '@/lib/utils';

const categories: Category[] = [
    { id: '1', name: 'Apartments', type: 'apartment', icon: 'building', count: 24 },
    { id: '2', name: 'Condos', type: 'condo', icon: 'home', count: 18 },
    { id: '3', name: 'Restaurants', type: 'restaurant', icon: 'utensils', count: 42 },
    { id: '4', name: 'Cafes', type: 'cafe', icon: 'coffee', count: 36 },
    { id: '5', name: 'Bakeries', type: 'bakery', icon: 'cake', count: 15 },
    { id: '6', name: 'Shopping', type: 'shopping', icon: 'shopping-bag', count: 28 },
    { id: '7', name: 'Entertainment', type: 'entertainment', icon: 'camera', count: 12 },
];
interface Category {
    id: string;
    name: string;
    type: CategoryType;
    icon: string;
    count: number;
}

interface CategoryIconProps {
    type: CategoryType;
    size?: number;
}

export const CategoryIcon = ({ type, size
}: CategoryIconProps) => {
    const iconProps = { className: `h-${size} w-${size}` };

    switch (type) {
        case 'apartment':
            return <Building {...iconProps} />;
        case 'condo':
            return <Home {...iconProps} />;
        case 'restaurant':
            return <Utensils {...iconProps} />;
        case 'cafe':
            return <Coffee {...iconProps} />;
        case 'bakery':
            return <Cake {...iconProps} />;
        case 'shopping':
            return <ShoppingBag {...iconProps} />;
        case 'entertainment':
        default:
            return <Camera {...iconProps} />;
    }
}

export { categories };

const Categories = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((

            [entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        },
            { threshold: 0.1 });

        const section = document.getElementById('categories');
        if (section) {
            observer.observe(section);
        }
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, [])

    return (
        <section id="categories" className='py-16 md:py-24 bg-neutral-100'>
            <div className='container mx-auto px-4'>

                <div className='flex flex-col items-center text-center mb-12'>
                    <span className='text-center text-near-purple text-sm font-medium uppercase tracking-wider'>Browse By</span>
                    <h2 className='text-3xl font-bold md:text-4xl my-4'>Categories</h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>
                        Explore different types of places around Assumption University
                    </p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6'>
                    {categories.map((category, index) => (
                        <Link key={category.id} href={`/categories/${category.type}`}
                            className={cn('bg-white rounded-xl shadow-sm p-4 text-center card-hover transition-all duration-500 transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',)} style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className='h-14 w-14 bg-near-purple/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <CategoryIcon type={category.type} size={24} />
                            </div>
                            <h3 className='font-medium mb-1'>{category.name}</h3>
                            <p className='text-sm text-gray-500 '>{category.count} places</p>

                        </Link>
                    ))}
                </div>

                <div className='flex justify-center mt-10'>
                    <Link href='/categories'>
                        <span className='flex items-center gap-2 text-near-purple hover:text-near-purple-dark transition-color duration-300'>
                            View All Categories
                            <ChevronRight className='h-4 w-4' />
                        </span>
                    </Link>

                </div>
            </div>

        </section>
    )
}

export default Categories