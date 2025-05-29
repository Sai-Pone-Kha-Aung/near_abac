"use client"
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils';
import { useCategories, useCategoryCounts } from '@/hooks/useCategories';
import { CategoryIcon } from '@/components/CategoryIcon';

const Categories = () => {
    const { categories } = useCategories();
    const [isVisible, setIsVisible] = useState(false);
    const { categoryCounts } = useCategoryCounts();

    const categoriesWithCount = useMemo(() => {
        return categories.map(category => ({
            ...category,
            count: categoryCounts[category.name] || 0
        }))
    }, [categories, categoryCounts]);

    const sortedCategories = useMemo(() => {
        return categoriesWithCount.sort((a, b) => {
            if (a.name === b.name) {
                return a.count - b.count;
            }
            return a.name.localeCompare(b.name);
        });
    }, [categoriesWithCount]);

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

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6'>
                    {sortedCategories.slice(0, 6).map((category, index) => (
                        <Link key={index} href={`/categories/${category.name}`}
                            className={cn('bg-white rounded-xl shadow-sm p-4 text-center card-hover transition-all duration-500 transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',)} style={{ transitionDelay: `${index * 0.1}s` }}>
                            <div className='h-14 w-14 bg-near-purple/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <CategoryIcon type={category.name} size={24} />
                            </div>
                            <h3 className='font-medium mb-1'>{category.name.toLocaleUpperCase().charAt(0) + category.name.slice(1)}</h3>
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