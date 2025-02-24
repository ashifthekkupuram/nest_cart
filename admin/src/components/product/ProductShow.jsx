import { Show, SimpleShowLayout, TextField, ArrayField, SingleFieldList, ChipField } from 'react-admin'

import ProductImages from './ProductImages'

const ProductShow = () => {

  return (
    <Show>
      <SimpleShowLayout>
        <TextField source='id' />
        <TextField source='name' />
        <TextField source='price' />
        <TextField source='description' />
        <ProductImages label='Images' />
        <ArrayField source='categories'>
          <SingleFieldList>
            <ChipField sx={{ textTransform: 'capitalize' }} source="name" />
          </SingleFieldList>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  )
}

export default ProductShow
