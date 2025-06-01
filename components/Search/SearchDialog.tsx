import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/types";
import { usePaginationListings } from "@/hooks/usePaginationListings";

interface SearchDialogProps {
    onClose: () => void;
    className?: string;

}

const SearchDialog = ({ onClose, className }: SearchDialogProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [allItems, setAllItems] = useState<string[]>([]);
    const { listings, loading, error, setSearchTerm, searchTerm } = usePaginationListings();
    const router = useRouter();

    useEffect(() => {
        if (isDialogOpen) {
            const fetchCategories = async () => {
                try {
                    const response = await fetch('/api/listings?fetchAll=true');
                    const allListings = await response.json();

                    if (Array.isArray(allListings)) {
                        const uniqueCategories = Array.from(
                            new Set(allListings.map((listing: Listing) => listing.category))
                        ).filter(Boolean) as string[];
                        setAllItems(uniqueCategories);
                    }
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            };
            fetchCategories();
        }
    }, [isDialogOpen]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchTerm(searchQuery.trim());
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, setSearchTerm]);


    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    const handleSelectListing = (listingId: string) => {
        router.push(`/listing/${listingId}`);
        onClose();
        setIsDialogOpen(false);
    }

    const handleSelectCategory = (category: string) => {
        router.push(`/categories/${category}`);
        onClose();
        setIsDialogOpen(false);
    }

    const handleButtonSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
            onClose();
            setIsDialogOpen(false);
        }
    }

    const filteredCategories = searchTerm.trim()
        ? allItems.filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))
        : allItems.slice(0, 5);

    const showListings = searchTerm.trim() && listings.length > 0;
    const showCategories = filteredCategories.length > 0;
    const showNoResults = searchQuery.trim() && searchTerm.trim() && !loading && !showListings && !showCategories;

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
                        Search for listings or categories near ABAC.
                        You can search by listing name, category, or any other relevant keyword.
                    </DialogDescription>
                    <Command shouldFilter={false}>
                        <CommandInput
                            data-testid="search-input"
                            placeholder="Search for Near ABAC"
                            value={searchQuery}
                            onValueChange={handleSearch}
                        />
                        <CommandList>
                            {loading && searchTerm.trim() && (
                                <CommandItem>
                                    <div className="flex justify-center items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-near-purple"></div>
                                        <span>Loading...</span>
                                    </div>
                                </CommandItem>
                            )}
                            {showNoResults && (
                                <CommandItem>
                                    No results found
                                </CommandItem>
                            )}
                            {showListings && (
                                <>
                                    {listings.map((listing) => (
                                        <CommandItem
                                            key={listing.id}
                                            onSelect={() => handleSelectListing(listing.id)}
                                            className="flex flex-col items-start py-3"
                                        >
                                            <span className="font-medium">{listing.name}</span>
                                            <span className="text-sm text-muted-foreground">{listing.category} • {listing.address}</span>

                                        </CommandItem>
                                    ))}
                                </>
                            )}

                            {showCategories && (
                                <>
                                    {showListings && (
                                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b mt-2">
                                            Categories
                                        </div>
                                    )}
                                    {!showListings && !searchTerm.trim() && (
                                        <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b">
                                            Popular Categories
                                        </div>
                                    )}
                                    {filteredCategories.map((category, index) => (
                                        <CommandItem
                                            key={index}
                                            onSelect={() => handleSelectCategory(category)}
                                            className="py-2"
                                        >
                                            <span className="capitalize">{category}</span>
                                        </CommandItem>
                                    ))}
                                </>
                            )}
                        </CommandList>
                    </Command>
                    <Button
                        data-testid="search-button"
                        variant="outline"
                        onClick={handleButtonSearch}
                        disabled={!searchQuery.trim() || loading}
                        className="mt-2"
                    >
                        View All Results
                    </Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SearchDialog