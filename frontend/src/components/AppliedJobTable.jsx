import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div>
            <Table>
                {
                    allAppliedJobs.length <= 0 ?
                        <TableCaption>You haven't applied for any job yet. </TableCaption>
                        :<TableCaption>List of your applied jobs</TableCaption>
                }
                <TableHeader>
                    <TableHead className='text-center'>Date</TableHead>
                    <TableHead className='text-center'>Job Role</TableHead>
                    <TableHead className='text-center'>Company</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                </TableHeader>
                <TableBody>
                    {
                            allAppliedJobs?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className='text-center'>{item?.createdAt?.split('T')[0]}</TableCell>
                                    <TableCell className='text-center'>{item?.job?.title}</TableCell>
                                    <TableCell className='text-center'>{item?.job?.company?.name}</TableCell>
                                    <TableCell className='text-center'>
                                        {
                                            item?.status.toLowerCase() === "rejected" ? <Badge variant='destructive'>Rejected</Badge>
                                            : item?.status.toLowerCase() === "accepted" ? <Badge className='bg-green-600 text-white'>Accepted</Badge> : <Badge variant='default'>Pending</Badge> 
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}

export default AppliedJobTable