import { Create, SimpleForm, TextInput, NumberInput, ImageInput, SelectArrayInput, ReferenceArrayInput, ImageField, required, minLength, maxLength, minValue } from 'react-admin'
const ProductCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source='name' validate={[required(), minLength(6), maxLength(156)]} resettable />
                <TextInput source='description' multiline={true} validate={[required(), minLength(20)]} resettable />
                <NumberInput source='price' validate={[required(), minValue(5)]} resettable />
                <ImageInput name='images' source='images' validate={[required(), minLength(1), maxLength(10)]} multiple={true} accept="image/*" resettable>
                    <ImageField source='src' />
                </ImageInput>
                <ReferenceArrayInput source='categories' reference='category' validate={[required()]}>
                    <SelectArrayInput/>
                </ReferenceArrayInput>
            </SimpleForm>
        </Create>
    )
}

export default ProductCreate
