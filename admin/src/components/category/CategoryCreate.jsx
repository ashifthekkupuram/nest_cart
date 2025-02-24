import { Create, SimpleForm, TextInput, required, minLength } from 'react-admin'

const CategoryCreate = () => {
    return (
        <Create title='Create Category'>
            <SimpleForm>
                <TextInput source='name' validate={[required(), minLength(3)]} />
            </SimpleForm>
        </Create>
    )
}

export default CategoryCreate