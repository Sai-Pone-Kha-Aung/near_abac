import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { sheetsData } from '@/types/types';
import { Link } from 'next-view-transitions';
import Card from '@/components/Card/Card';

interface CategorySectionProps {
    category: string;
    items: sheetsData[];
    router: ReturnType<typeof useRouter>;
}

const CategorySection = ({ category, items, router }: CategorySectionProps) => (
    <div className='bg-background/50 backdrop-blur-md rounded-lg shadow-lg' data-testid="feature-page">
        <div className='pl-6 pt-6'>
            <h2
                className='text-xl font-bold mb-2 cursor-pointer hover:text-2xl transition-all duration-300 ease-in-out'
                data-testid="feature-title"
                onClick={() => router.push(`/category/${category}`)}
            >
                {category}
            </h2>
        </div>
        <div className='flex flex-row gap-4 m-4 overflow-x-auto'>
            {items.slice(0, 4).map((item, index) => (
                <div key={index}  className='flex-shrink-0 pb-4' data-testid="feature-card">
                    <Card {...item} />
                </div>
            ))}
            {items.length > 4 && (
                <div className='flex justify-center items-center'>
                    <Button className='flex justify-center items-center rounded-xl' variant={'outline'} data-testid="feature-view-all">
                        <Link rel='noopener noreferrer' href={`/category/${category}`}>View All</Link>
                    </Button>
                </div>
            )}
        </div>
    </div>
);

export default CategorySection;