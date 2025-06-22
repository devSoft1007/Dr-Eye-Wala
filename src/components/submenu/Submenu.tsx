'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import Menu from './menu/Menu';

const Submenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => setHoveredMenu(menu);

  const handleMouseLeave = () => setHoveredMenu(null);

  const menuItems = [
    { name: 'EYEGLASSES' },
    { name: 'SCREEN GLASSES' },
    { name: 'KIDS GLASSES' },
    { name: 'CONTACT LENSES' },
    { name: 'SUNGLASSES' },
    { name: 'HOME EYE-TEST' },
    { name: 'STORE LOCATOR' }
  ];

  // Menu data: this can be dynamic
  const dropdownSections = [
    {
      title: 'SELECT CATEGORY',
      isCategory: true,
      items: [
        {
          label: 'Men',
          description: 'CLASSIC SUNGLASSES\nStarting From ₹1000',
          imageUrl: '/images/men_pic.webp'
        },
        {
          label: 'Women',
          description: 'PREMIUM SUNGLASSES\nStarting From ₹2700',
          imageUrl: '/images/women_pic.webp'
        }
      ]
    },
    {
      title: 'Our Top Picks',
      items: ['Best Seller', 'New Arrivals', 'Power Sunglasses']
    },
    {
      title: 'Shape',
      items: ['Aviator', 'Rounders', 'Wayfarer', 'Rectangle', 'Hexagon', 'Cat-Eye', 'Clubmaster']
    },
    {
      title: 'Collection',
      items: [
        'Maverick',
        'Fashion Essentials',
        'Aerodynamics',
        'Petite Sunglasses',
        'Havana',
        'Wedding Edit',
        'Holiday Edit',
        'Pilot'
      ]
    }
  ];

  return (
    <div className="bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Menu */}
        <ul className="overflow-x-auto items-center md:w-full flex space-x-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="group h-16 flex items-center"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="subMenuItem whitespace-nowrap">
                {item.name}
              </Link>

              {/* Dropdown Menu */}
              {hoveredMenu === item.name && item.name === 'SUNGLASSES' && <Menu sections={dropdownSections} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default memo(Submenu);
