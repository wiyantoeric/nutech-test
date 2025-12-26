import { useEffect, useState } from 'react';
import { getBanners } from '~/src/features/app/services/bannerService';

const PromotionList = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getBanners().then((res) => setBanners(res.data.data));
    }, []);

    return (
        <div
            className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
            style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
            }}
        >
            {banners.map((banner: any, index: number) => (
                <a key={index} href="#" className="shrink-0 cursor-pointer focus:outline-none">
                    <div className="w-70 h-30 rounded-xl overflow-hidden shadow-sm" style={{ scrollSnapAlign: 'start' }}>
                        <img src={banner.banner_image} alt={banner.banner_name} className="w-full h-full object-cover" />
                    </div>
                </a>
            ))}
        </div>
    );
};

export default PromotionList;
