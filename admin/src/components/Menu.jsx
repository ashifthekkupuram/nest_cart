import { Menu as ImMenu } from "react-admin"

import BookmarkIcon from '@mui/icons-material/Bookmark';

const Menu = () => {
    return (
        <ImMenu>
            <ImMenu.ResourceItem name="category"/>
            <ImMenu.ResourceItem name="product" />
        </ImMenu>
    )
}

export default Menu
