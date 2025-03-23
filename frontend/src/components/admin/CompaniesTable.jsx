import { Edit2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const CompaniesTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>
            A List of your recent registered Companies
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                    <Avatar>
                        <AvatarImage src = "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"/>
                    </Avatar>
                </TableCell>
                <TableCell>Adobe</TableCell>
                <TableCell>23-03-2025</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className='flex items-center gap-2 w-fit cursor-pointer'> 
                                <Edit2 className='w-4' />
                                <span>Edit</span>
                            </div>

                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        

      </Table>
    </div>
  )
}

export default CompaniesTable
