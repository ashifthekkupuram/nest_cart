import { useRecordContext, ArrayField } from "react-admin"
import { Box, ImageList, } from "@mui/material"

const ProductImages = () => {

    const record = useRecordContext()

    if (!record) return null

    return (
        <Box sx={{ display: 'flex', gap: '1rem' }} >
            {record.images.map((image) => <img src={image} height={130} />)}
        </Box>
    )
}

export default ProductImages
