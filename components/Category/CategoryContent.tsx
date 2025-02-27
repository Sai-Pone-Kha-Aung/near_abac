import { sheetsData } from "@/types/types";
import Card from "../Card/Card";

interface CategoryContentProps {
    params: { slug: string };
    postDetail: sheetsData[];
}

const CategoryContent = ({ params, postDetail }: CategoryContentProps) => (
    <div className='bg-background/50 backdrop-blur-md rounded-lg shadow-lg'>
        <p className='pl-6 pt-6 text-2xl font-bold mb-2 cursor-pointer hover:text-2xl transition-all duration-300 ease-in-out' data-testid="category-title">
            {params.slug}
        </p>
        <div className='grid grid-cols-1 md:grid-flow-row xl:grid-cols-3 xl:px-6 gap-5 py-5 text-neutral-700 justify-items-center overflow-hidden mb-5'>
            {postDetail.map((item) => (
                <Card key={item.id} {...item} data-testid="category-card" />
            ))}
        </div>
    </div>
);

export default CategoryContent;