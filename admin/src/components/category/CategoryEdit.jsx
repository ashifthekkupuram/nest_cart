import { Edit, SimpleForm, TextInput, required } from 'react-admin'

const CategoryEdit = () => {
    return (
        <Edit  title='Edit Category'>
            <SimpleForm>
                <TextInput source='name' validate={[required()]} />
            </SimpleForm>
        </Edit>
    )
}

export default CategoryEdit