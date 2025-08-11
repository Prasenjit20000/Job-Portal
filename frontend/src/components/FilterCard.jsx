import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import { Button } from './ui/button'

const filterData = [
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
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
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
                    <div className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} key={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </RadioGroup >
      <div className='flex justify-center'>
        <Button variant='outline' onClick={()=>dispatch(setSearchedQuery(''))}>Reset Filter</Button>
      </div>
    </div >
  )
}

export default FilterCard 