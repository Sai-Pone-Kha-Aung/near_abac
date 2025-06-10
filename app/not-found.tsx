import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='min-h-screen flex bg-gray-300 items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold mb-4'>404</h1>
                <p className='text-xl mb-4'>Page not found.</p>
                <Link href="/" className="text-gray-700 underline hover:text-near-purple smooth-transition">Go to Home</Link>
            </div>
        </div>
    );
};