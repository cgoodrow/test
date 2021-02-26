import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const DroppableComponent = props => {
    const { name, getDroppableStyle, direction, isDropDisabled, type, renderClone } = props;
    return (
        <Droppable
        id={name}
        type={type}
        droppableId={`${name}`}
        isDropDisabled={isDropDisabled}
        direction={direction}
        renderClone={renderClone}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    style={getDroppableStyle(snapshot.isDraggingOver)}>
                    {props.children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default DroppableComponent;