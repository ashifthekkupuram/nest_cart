import { Show, SimpleShowLayout, TextField } from 'react-admin'

const CategoryShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source='id' />
                <TextField source='name' />
            </SimpleShowLayout>
        </Show>
    )
}

export default CategoryShow