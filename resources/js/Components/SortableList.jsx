import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Container, Draggable } from 'react-smooth-dnd'
import { arrayMoveImmutable } from 'array-move'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'

const SortableList = () => {
    const [items, setItems] = useState([
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
        { id: '3', text: 'Item 3' },
        { id: '4', text: 'Item 4' },
    ])

    const onDrop = ({ removedIndex, addedIndex }) => {
        setItems(items => arrayMoveImmutable(items, removedIndex, addedIndex))
    }

    return (
        <List>
            <Container
                dragHandleSelector=".drag-handle"
                lockAxis="y"
                onDrop={onDrop}>
                {items.map(({ id, text }) => (
                    <Draggable key={id}>
                        <ListItem>
                            <ListItemText primary={text} />
                            <ListItemSecondaryAction>
                                <ListItemIcon className="drag-handle">
                                    <DragHandleIcon />
                                </ListItemIcon>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Draggable>
                ))}
            </Container>
        </List>
    )
}

export default SortableList
