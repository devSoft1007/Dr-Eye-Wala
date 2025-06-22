import Image from 'next/image';
import React, { memo } from 'react';

interface MenuSection {
  title: string;
  items: CategoryItem[] | string[];
  isCategory?: boolean; // Flag to indicate if it's a category section
}

interface CategoryItem {
  label: string;
  description: string;
  imageUrl: string;
}

interface DropdownMenuProps {
  sections: MenuSection[];
}

const Menu: React.FC<DropdownMenuProps> = ({ sections }) => {
  return (
    <div className="absolute z-1 top-[8rem] left-0 w-full bg-white shadow-md p-4 grid grid-cols-4 gap-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="space-y-4">
          <h4 className="font-semibold">{section.title}</h4>
          <div className="space-y-2">
            {section.isCategory ? (
              section.items.map((item, idx) => {
                const categoryItem = item as CategoryItem; // Cast to CategoryItem
                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-2">
                    <Image
                      width={100}
                      height={100}
                      src={categoryItem.imageUrl}
                      alt={categoryItem.label}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <h5 className="font-medium">{categoryItem.label}</h5>
                      <p className="text-sm text-gray-500">{categoryItem.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <ul className="space-y-2">
                {section.items.map((item, idx) => {
                  const categoryItem = item as CategoryItem; // Cast to CategoryItem
                  return (
                    <li
                      key={idx}
                      className="text-sm text-gray-500">
                      {categoryItem.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Menu);
