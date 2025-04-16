import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sheetsData } from "@/types/types";

interface SearchDialogProps {
    isDialogOpen: boolean;
    onClose: () => void;
    className?: string;

}

const SearchDialog = ({ onClose, className }: SearchDialogProps) => {
    const [data, setData] = useState<sheetsData[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const router = useRouter();
    const range = 'Sheet1!A1:M';

    useEffect(() => {
        if (isDialogOpen) {
            const fetchData = async () => {
                const response = await fetch(`/api/postData?range=${encodeURIComponent(range)}`); // Replace with your API endpoint
                const result = await response.json();
                setData(result);
            };
            fetchData();
        }
    }, [isDialogOpen]);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set((data || []).map(category => category.category)));
        setFilteredCategories(uniqueCategories);
    }, [data]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = filteredCategories.filter(category => category.toLowerCase().includes(query.toLowerCase()));
            console.log('Filtered Categories:', filtered);
            setFilteredCategories(filtered);
        } else {
            console.log('Resetting Filtered Categories:', filteredCategories);
            setFilteredCategories(filteredCategories);
        }
    }

    const handleSelect = (category: string) => {
        setSearchQuery(category);
        setFilteredCategories([category]);
    }

    const handleButtonSearch = () => {
        if (searchQuery) {
            router.push(`/category/${searchQuery}`);
            onClose();
            setIsDialogOpen(false);
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
            <DialogTrigger asChild>
                <Button
                    data-testid="search-dialog"
                    variant="outline"
                    onClick={() => setIsDialogOpen(true)}
                    className={className}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                    Search
                </Button>
            </DialogTrigger>
            <DialogContent data-testid="search-dialog">
                <DialogHeader>
                    <DialogTitle>Search</DialogTitle>
                    <DialogDescription>
                        Search by category
                    </DialogDescription>
                    <Command>
                        <CommandInput
                            data-testid="search-input"
                            placeholder="Search for Near ABAC"
                            value={searchQuery}
                            onValueChange={(value) => handleSearch(value)}
                        />
                        <CommandList>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <CommandItem
                                        key={index}
                                        onSelect={() => handleSelect(category)}
                                    >
                                        {category}
                                    </CommandItem>
                                ))
                            ) : (
                                <CommandItem>No result found</CommandItem>
                            )}
                        </CommandList>
                    </Command>
                    <Button
                        data-testid="search-button"
                        variant="outline"
                        onClick={handleButtonSearch}
                    >
                        Search
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog