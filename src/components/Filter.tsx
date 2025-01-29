import React, { ChangeEvent } from 'react';
import { Input } from '@base-ui-components/react/input';
import { categories } from '../constants/categories';
import { sources } from '../constants/sources';
import Select from './Select';

const Filter: React.FC<FilterProps> = ({ loading, applyFilter }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>(categories[0].key);
  const [selectedSource, setSelectedSource] = React.useState<number>(sources[0].id);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }

  const handleSourceChange = (source: string) => {
    setSelectedSource(Number(source));
  }

  const applyFilters = (searchQuery: string) => {
    applyFilter(searchQuery, selectedCategory, selectedSource);
  }

  return (
    <div className="h-[116px] flex items-center justify-between gap-4 w-full my-3 card-bg p-4 rounded-xl">
      <div className="flex flex-col items-start gap-2 w-full">
        <p className="font-bold">Filters</p>
        <Input
          placeholder="Search"
          className="w-full outline-none border-b px-2 py-1 text-white"
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') applyFilters(searchQuery) }}
        />
      </div>
      <Select
        label="Categories"
        data={categories}
        value={selectedCategory}
        dataKey={"key"}
        dataLabel={"name"}
        dataValue={"key"}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleCategoryChange(e.target.value) }}
      />
      <Select
        label="Sources"
        data={sources}
        value={String(selectedSource)}
        dataKey={"id"}
        dataLabel={"name"}
        dataValue={"id"}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleSourceChange(e.target.value) }}
      />
      <button
        disabled={loading}
        className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
        onClick={(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => applyFilters(searchQuery)}>
        Apply
      </button>
    </div>
  )
}

export default Filter