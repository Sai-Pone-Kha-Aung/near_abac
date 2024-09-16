"use client"
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchDialogProps  {
  isDarkMode: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  searchQuery: string;
  handleSearch: (query: string) => void;
  filteredCategories: string[];
  handleSelect: (category: string) => void;
  handleButtonSearch: () => void;
}

const SearchDialog = ({
  isDarkMode,
  isDialogOpen,
  setIsDialogOpen,
  searchQuery,
  handleSearch,
  filteredCategories,
  handleSelect,
  handleButtonSearch
}: SearchDialogProps) => {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>

                    <Button 
                        data-testid="search-dialog"
                        variant="outline"
                        className={`hidden md:inline-flex ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white text-black'}`}
                        onClick={() => setIsDialogOpen(false)}
                        >
                        <Search className={`h-4 w-4 mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`}/>
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