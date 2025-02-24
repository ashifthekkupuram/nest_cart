import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const CategoryList = () => {
  return (
    <List>
      <Datagrid>
        <TextField sx={{ textTransform: 'capitalize' }} source="name" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default CategoryList;