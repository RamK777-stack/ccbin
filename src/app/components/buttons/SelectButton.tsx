import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

type SelectButtonProps = {
  handleOnChange: (value: string) => void;
};

const SelectButton = ({ handleOnChange }: SelectButtonProps) => {
  return (
    <Select onValueChange={handleOnChange} defaultValue='3600'>
      <SelectTrigger className='w-[180px] dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <SelectValue placeholder='Expiration time' />
      </SelectTrigger>
      <SelectContent className='dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <SelectItem value='3600'>Expire in one hour</SelectItem>
        <SelectItem value='86400'>Expire in one day</SelectItem>
        <SelectItem value='604800'>Expire in one week</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectButton;
