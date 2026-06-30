import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input';

const TransactionSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className='relative max-w-md'>
      <Search className='absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2'/>
      <Input 
        placeholder='Search transactions...'
        className='pl-8'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default TransactionSearch;