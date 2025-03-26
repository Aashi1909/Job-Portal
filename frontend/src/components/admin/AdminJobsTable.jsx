import { Edit2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const {companies, searchCompanyByText} = useSelector(store =>store.company)
    const {allAdminJobs} = useSelector(store =>store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = allAdminJobs.length >=0 && allAdminJobs.filter((job) => {
            if(!searchCompanyByText){
                return true
            }
            return allAdminJobs?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterJobs(filteredCompany)
    }, [companies, searchCompanyByText]) 
  return ( 
    <div>
      <Table>
        <TableCaption>
            A List of your recent posted Jobs
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                     {
                        filterJobs.map((job) =>(
                                <tr>
                            <TableCell>{job.company.name}</TableCell>
                            <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => navigate(`/admin/companies/${job._id}`)}> 
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            </tr>

                            ))
                     }
                    

                
            </TableBody>
        

      </Table>
    </div>
  )
}

export default AdminJobsTable

