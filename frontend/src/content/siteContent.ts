function hasProductionUrl(value: string | undefined): boolean {
    try {
        const parsed = new URL(value || '');
        return parsed.protocol === 'https:' && parsed.hostname.includes('.') &&
            !parsed.hostname.endsWith('.invalid') && !parsed.hostname.endsWith('.localhost') &&
            parsed.hostname !== '127.0.0.1';
    } catch {
        return false;
    }
}

export const site = {
    name: 'Buffalo Barbershop', shortName: 'BUFFALO', city: 'Göteborg',
    address: 'Kungsportsavenyen 26', postcode: '411 36',
    phone: import.meta.env.VITE_PHONE || '', phoneHref: import.meta.env.VITE_PHONE ? `tel:${import.meta.env.VITE_PHONE.replace(/[^+0-9]/g, '')}` : '', email: import.meta.env.VITE_EMAIL || '',
    bookingUrl: 'https://www.bokadirekt.se/places/-a-52383',
    instagram: 'https://www.instagram.com/buffalobarber_1/',
    kenaisInstagram: 'https://www.instagram.com/atkenais/',
    kenaisBookingUrl: import.meta.env.VITE_KENAIS_BOOKING_URL || '',
    url: (import.meta.env.VITE_SITE_URL || 'https://buffalo-barber-shop.vercel.app').replace(/\/$/, ''),
    indexable: import.meta.env.VITE_INDEXABLE === 'true' && import.meta.env.VITE_CONTENT_APPROVED === 'true' && hasProductionUrl(import.meta.env.VITE_SITE_URL),
    heroVideo: import.meta.env.VITE_HERO_VIDEO || '/media/hero-buffalo-scrub.mp4',
    creditUrl: 'https://mediamagnet.se/', verifiedDate: 'Projektunderlag - ska godkannas fore publicering',
    hours: [
        { label: 'Måndag · Fredag', value: '10.00 – 19.00' },
        { label: 'Lördag', value: '10.00 – 17.00' },
        { label: 'Söndag', value: '11.00 – 16.30' }
    ],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Buffalo+Barbershop+Kungsportsavenyen+26+G%C3%B6teborg',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Kungsportsavenyen+26+G%C3%B6teborg',
    mapsEmbed: 'https://maps.google.com/maps?q=Kungsportsavenyen%2026%2C%20G%C3%B6teborg&t=k&z=18&ie=UTF8&iwloc=&output=embed'
};
export const navigation = [
    { to: '/om-oss', label: 'Salongen' }, { to: '/tjanster', label: 'Tjänster & priser' },
    { to: '/barberare', label: 'Barberare' }, { to: '/galleri', label: 'The gallery' },
    { to: '/kontakt', label: 'Hitta hit' }
];
