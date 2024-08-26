"use client"
import Link from 'next/link'
import { MapPin} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Mobile from './Mobile'
import useFetchData from '@/hooks/useFetchData'
import SearchDialog from '../Search/SearchDialog'

const Navbar = () => {
  const {data, error} = useFetchData();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const uniqueCategories = Array.from(new Set((data || []).map(category => category.category)));
  const [filteredCategories, setFilteredCategories] = useState(uniqueCategories);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const {setTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
        setFilteredCategories(uniqueCategories.filter(category => category.toLowerCase().includes(query.toLowerCase())));
    } else {
        setFilteredCategories(uniqueCategories);
    }
  }

  const handleSelect = (category: string) => {
    setSearchQuery(category);
    setFilteredCategories([category]);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? 'light' : 'dark');
  }

  const handleButtonSearch = () => {
    if(searchQuery) {
        router.push(`/category/${searchQuery}`);
        setIsDialogOpen(false);
    }
  }

  return (
    <nav className={`sticky top-0 z-50 w-full ${isDarkMode ? "bg-black/80 text-white" : "bg-background/80 text-black"}background-blur-md`}>

        <div className={`container flex flex-col md:flex-row items-center justify-between h-16 px-4 md:px-6 mx-auto p-4 ${isDarkMode ? "text-white" : "text-black"}`}>

            <div className='flex flex:col gap-6 text-lg font-medium justify-center md:items-center md:flex-row'>
                    <Link href='/' className='text-lg font-semibold'>
                        <span className='flex items-center gap-2' data-testid="navbar-title">
                            <MapPin className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'}` }/>
                            Near ABAC
                        </span>
                    </Link>
                    <div className='flex items-center gap-4 md:ml-auto justify-center md:justify-start'>
                        {/* <Link href='/' className='hidden sm:block'>Home</Link>
                        <Link href='/' className='hidden sm:block'>Explore</Link>
                        <Link href='/' className='hidden sm:block'>About</Link>
                        <Link href='/' className='hidden sm:block'>Contact</Link> */}
                    </div>

                    <div className='sm:hidden flex items-center gap-4 md:ml-auto justify-center md:justify-start'>
                        <Mobile/>
                    </div>
            </div>
            <div className='flex gap-4 mt-4 md:mt-0'>
                <SearchDialog
                  isDarkMode={isDarkMode}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  filteredCategories={filteredCategories}
                  handleSelect={handleSelect}
                  handleButtonSearch={handleButtonSearch}
                />
                {/* <Button
                 variant="outline"
                 size="icon"
                 onClick={toggleDarkMode}
                 className={`hidden md:inline-flex text-primary-foreground hover:bg-primary/10 ${isDarkMode ? 'bg-black/80 text-white' : 'bg-white text-black'}`}
                >
                    {isDarkMode ? <Sun className={`h-4 w-4`}/> : <Moon className='h-4 w-4'/>}
                </Button> */}
            </div>
        </div>
    </nav>
  )
}

export default Navbar