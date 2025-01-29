type FilterProps = {
  loading: boolean;
  applyFilter: (searchQuery: string, category: string, source: number) => void;
};