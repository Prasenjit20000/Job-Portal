import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'
import { setLocalSearchedQuery } from '../redux/jobSlice'
import { Button } from './ui/button'

const filterData = [
  {
    filterType: 'Job Type',
    array: ['Full Time', 'Part Time', 'Internship']
  },
  {
    filterType: 'Location',
    array: ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore', 'Chennai']
  },
  {
    filterType: 'Designation',
    array: [
      'Software Engineer',
      'Data Scientist',
      'Project Manager',
      'Graphic Designer',
      'Sales Manager',
      'Accountant',
      'Web Developer',
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer'
    ]
  },
  {
    filterType: 'Company',
    array: [
      'Google',
      'Microsoft',
      'Amazon',
      'Apple',
      'IBM',
      'Meta',
      'Oracle',
      'Accenture',
      'TCS',
      'Infosys'
    ]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLocalSearchedQuery(selectedValue));
  }, [selectedValue]);

  const resetFilters = () =>{
    setSelectedValue('');
    dispatch(setLocalSearchedQuery(''));
  }
  return (
    <div className='w-full p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) =>
            <div>
              <h1 className='font-bold text-md'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `r${index}-${idx}`;
                  return (
                    <div className="flex items-center space-x-2 my-2 ">
                      <RadioGroupItem value={item} key={itemId} className='cursor-pointer' />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </RadioGroup >
      <div className='flex justify-center my-4'>
        <Button variant='outline' className='cursor-pointer border border-gray-400 shadow-gray-500' onClick={resetFilters}>Reset Filter</Button>
      </div>
    </div >
  )
}

export default FilterCard 