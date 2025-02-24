import { Edit, SimpleForm, TextInput, NumberInput, SelectArrayInput, ReferenceArrayInput, required, minLength, maxLength, minValue } from 'react-admin'

const ProductEdit = (props) => {

  const formatCategories = (categories) => {
    return categories ? categories.map((category) => category.id) : []
  }

  const parseCategories = (ids) => {
    return ids ? ids.map((id) => ({ id })) : [];
  }


  return (
    <Edit {...props} >
      <SimpleForm>
        <TextInput source='name' validate={[required(), minLength(6), maxLength(156)]} resettable />
        <TextInput source='description' multiline={true} validate={[required(), minLength(20)]} resettable />
        <NumberInput source='price' validate={[required(), minValue(5)]} resettable />
        <ReferenceArrayInput source='categories_id' reference='category' format={formatCategories} parse={parseCategories}>
          <SelectArrayInput optionText='name' />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export default ProductEdit
