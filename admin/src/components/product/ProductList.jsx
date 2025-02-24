import { List, Datagrid, TextField, ImageField, ArrayField, SingleFieldList, ChipField } from 'react-admin'

const ProductList = () => {
  return (
    <List>
      <Datagrid>
        <ImageField source='images[0]' label='Image' />
        <TextField source='name' />
        <TextField source='price' />
        <ArrayField source='categories' label='Categories'>
          <SingleFieldList>
            <ChipField sx={{ textTransform: 'capitalize' }} source="name" />
          </SingleFieldList>
        </ArrayField>
      </Datagrid>
    </List>
  )
}

export default ProductList
