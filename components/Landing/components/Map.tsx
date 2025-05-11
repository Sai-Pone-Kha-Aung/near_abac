import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Map = () => {
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

        const section = document.getElementById('map');
        if (section) {
            observer.observe(section);
        }
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, [])

    const handleFindNearbyPlaces = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
            }, (error) => {
                console.error('Error getting location:', error);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    return (
        <section id="map" className='py-16 md:py-20 bg-white'>
            <div className='container mx-auto px-4'>
                <div className={cn('text-center mb-10 transition-all duration-500 transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                    <span className='text-near-purple text-sm font-medium tracking-wider uppercase'>
                        navigate
                    </span>
                    <h2 className='text-3xl font-bold md:text-4xl my-4'>Explore the area</h2>
                    <p className='text-gray-600 max-w-2xl mx-auto'>Get a visual overview of locations around Assumption University</p>
                </div>

                <div className={cn('relative rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px] lg:h-[600px] transition-all duration-700 transform',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}>
                    <div className='absolute inset-0 bg-near-gray-dark'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.757492862784!2d100.83534157630517!3d13.611617900521134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d430e775155f9%3A0xf01923824353260!2sAssumption%20University%20Suvarnabhumi%20Campus!5e0!3m2!1sen!2sth!4v1744735317749!5m2!1sen!2sth"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* <div className='absolute top-4 left-4 bg-white/90 backdrop:blur-sm rounded-lg shadow-lg max-w-[300px] z-10 glass-effect'>
                        <div className='flex items-start gap-3 p-3'>
                            <div className='bg-near-purple rounded-full p-2 mt-1'>
                                <MapPin className='w-4 h-4 text-white' />
                            </div>
                            <div>
                                <h3 className='font-bold text-gray-900 '>
                                    Assumption University
                                </h3>
                                <p className='text-sm text-gray-600 mt-1'>88 Moo 8 Bang Na-Trad Km. 26, Bangsaothong, Samuthprakarn 10570, Thailand</p>
                                <div className='mt-3'>
                                    <Link href="https://maps.app.goo.gl/Tvb2BPkEM2bqwUKq5" target="_blank" className='text-near-purple text-sm hover:underline'>
                                        Get Direction
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>
                <div className={cn('flex justify-center gap-4 mt-8 transition-all duration-500 transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10')}>
                    <Button className='bg-near-purple hover:bg-near-purple-dark text-white px-6 py-3 rounded-full transition-colors shadow-md' onClick={handleFindNearbyPlaces}>Find Nearby Places</Button>
                    <Button className='text-near-purple rounded-full bg-white border border-near-purple hover:bg-near-purple/5 px-6 py-3 shadow-sm transition-colors'>View on Google Maps</Button>
                </div>
            </div >
        </section >
    )
}

export default Map