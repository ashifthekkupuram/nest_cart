import { Create, SimpleForm, TextInput, required } from 'react-admin'

const CategoryCreate = () => {
    return (
        <Create title='Create Category'>
            <SimpleForm>
                <TextInput source='name' validate={[required()]} />
            </SimpleForm>
        </Create>
    )
}

export default CategoryCreate