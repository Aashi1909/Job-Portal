import React from "react";
import {RadioGroup, RadioGroupItem} from "./ui/radio-group"
import {Label} from './ui/label'


const filterData =[
    {
        filterType :"Location",
        array:["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType :"Industry",
        array:["Frontend Developer", "Backend Developer", "Full Stack Developer", "Devops Engineer", "Data Scientist"]
    },
    {
        filterType :"Salary",
        array:["0K-40K", "42K-1Lakh", "1Lakh-3Lakh"]
    },
]

const FilterCard =() =>{
    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-semibold text-lg">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {
                    filterData.map((data, index) =>(
                        <div>
                            <h1 className="font-bold font-lg">{data.filterType}</h1>
                            {
                                  data.array.map((item, index) => {
                                    return (
                                        <div className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={item} />
                                            <Label >{item}</Label>

                                            
                                        </div>
                                    )

                                  })
                            }
                        </div>
                    ))
                }

            </RadioGroup>
        </div>
    )
}

export default FilterCard