import { TableRow, TableCell, Skeleton } from "@mui/material";

const TableSkeleton = ({
  colums,
}: {
  colums: number;
}) => (
    <>
    {[1, 2, 3, 4, 5].map((row) => (
      <TableRow hover>
        {Array(colums).fill('_').map((item) => (
        <TableCell>
          <Skeleton />
        </TableCell>))}
      </TableRow>
      ))}
    </>             
)

export default TableSkeleton;
