import { Box } from '@mui/material'

const Table = ({ headers, rows }) => {
    // This will bog down eventually due to being a very basic table. Using something with virtualization of the data would 
    // help keep things snappy as the row list gets longer.
    return (
        <Box display='flex' flexDirection='column' marginTop='2rem' border='1px solid #000000' overflow='auto'>
            <Box display='flex' flexDirection='row'>
                {headers.map((h,i) => {
                    return (
                        <Box key={h} flex='1' padding='1rem' display='flex' justifyContent='center' alignItems='center' borderLeft={i > 0 ? '1px solid #000000' : 'none'}>
                            {h}
                        </Box>
                    )
                })}
            </Box>
            {
                rows.map((r,i) => {
                    return (
                        <Box key={r.id} display='flex' flexDirection='row' borderTop='1px solid #000000' bgcolor={i % 2 !== 0 ? 'grey' : 'none'} color={i % 2 !== 0 ? 'white' : 'inherit'}>
                            <Box flex='1' padding='1rem' display='flex' justifyContent='center' alignItems='center'>
                                {r.inputName}
                            </Box>
                            <Box flex='1' padding='1rem' display='flex' justifyContent='center' alignItems='center' borderLeft='1px solid #000000'>
                                {r.location}
                            </Box>
                        </Box>
                    ) 
                })
            }
        </Box>
    )
}

export default Table