
import React from 'react';
import { TagIcon } from './icons';

interface FilterControlsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-zinc-200/60">
      <div className="flex items-center mb-4">
        <TagIcon className="w-6 h-6 text-zinc-500 mr-3" />
        <h3 className="text-xl font-bold text-zinc-800">กรองตามหมวดหมู่</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-2 ${
                isActive
                  ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterControls;
