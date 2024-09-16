import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SkeletonCard from '@/components/Card/SkeletonCard';
import { sheetsData } from '@/types/types';
import CategorySection from './CategorySection';

interface FeatureProps {
    data?: sheetsData[];
}

const Feature = ({data = []}: FeatureProps) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      if (data && data.length > 0) {
          setLoading(false);
          router.refresh();
      } else {
        setLoading(false);
      }
  }, [data, router]);

  if (loading) {
      return (
          <SkeletonCard count={1} className='h-screen' />
      );
  }

    const groupedData: Record<string, sheetsData[]> = data.reduce((acc: Record<string, sheetsData[]>, item: any) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

  return (
    <div>
         {Object.entries(groupedData).map(([category, items]) => (
                <CategorySection key={category} category={category} items={items} router={router} />
            ))}
    </div>
  )
}

export default Feature