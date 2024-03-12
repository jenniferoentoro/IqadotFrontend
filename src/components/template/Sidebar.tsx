import {List, SvgIconProps} from '@mui/material'
import {
    Article,
    History, Person,
    Upload
} from '@mui/icons-material';
import {ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {Link} from "react-router-dom";
import React from "react";

interface sidebarItem {
    title: string,
    link: string,
    icon: React.ReactElement<SvgIconProps>
}

const Sidebar = () => {
    const menuItems: sidebarItem[] = [
        {
            title: "Import",
            link: "/import",
            icon: <Upload/>
        },
        {
            title: "History",
            link: "/history",
            icon: <History/>
        },
        {
            title: "Sources",
            link: "/sources",
            icon: <Article/>
        },
        {
            title: "User",
            link: "/users",
            icon: <Person/>
        }
    ];

    return (
        <List component="nav">
            {menuItems.map((menuItem: sidebarItem, index: number) => {
                return (
                    <Link to={menuItem.link} className={"link"} key={index}>
                        <ListItemButton>
                            <ListItemIcon>
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={menuItem.title}/>
                        </ListItemButton>
                    </Link>
                )
            })}
        </List>
    )
}

export default Sidebar;