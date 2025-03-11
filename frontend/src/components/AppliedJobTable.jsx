import React from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
import { Badge } from "./ui/badge";

const AppliedJobTable =() =>{
    return (
        <div>
            <Table>
                <TableCaption>
                    List of Applied Jobs 
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1,2,3,4].map((item, index) =>(
                            <TableRow key={index}>
                                <TableCell>11-03-2025</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Adobe</TableCell>
                                <TableCell className="text-right"><Badge>Pending</Badge></TableCell>

                            </TableRow>
                        ))
                    }

                </TableBody>

            </Table>
           
        </div>
    )
}

export default AppliedJobTable