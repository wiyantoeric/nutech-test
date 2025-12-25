'use client';

import React, { useEffect, useState, useRef } from 'react';
import { getBanners } from '~/services/assets/banners';

const PromotionList = () => {
    const [banners, setBanners] = useState([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        getBanners().then((res) => setBanners(res.data.data));
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();

        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto gap-4 pb-4 no-scrollbar cursor-grab active:cursor-grabbing select-none ${isDragging ? 'scroll-smooth' : ''}`}
            style={{ scrollSnapType: isDragging ? 'none' : 'x mandatory' }}
        >
            {banners.map((banner: any, index: number) => (
                <div key={index} className="shrink-0 w-70 h-30 rounded-xl overflow-hidden shadow-sm pointer-events-none" style={{ scrollSnapAlign: 'start' }}>
                    <img src={banner.banner_image} alt={banner.banner_name} className="w-full h-full object-cover" draggable="false" />
                </div>
            ))}
        </div>
    );
};

export default PromotionList;
