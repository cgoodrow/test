import React, {lazy, useState} from 'react';
import {Tooltip} from '@material-ui/core';
import {controlPanelStyles} from 'assets/styles/control-panel';
import components from 'constants/components';
import controlIcons from 'constants/control-icons';

const DroppableWithChildren = lazy(() => import('components/common/droppable-with-children'));

const grid = 8;

export const getContainerStyles = (isDragging, draggableStyle) => {
    return ({
    userSelect: 'none',
    background: isDragging ? 'lightgrey' : 'inherit',
    padding: 5,
    display: 'flex',
    flex: 'auto',
    ...draggableStyle,
    })
};

export const getDroppableStyle = ()=> ({
    marginBottom: 15,
    padding: 7,
    marginTop: 50,
});

export const childDropSyles = () => ({
    padding: grid,
});

export const childDraggableStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? 'lightgrey' : 'inherit',
    padding: 5,
    display: 'flex',
    ...draggableStyle,
})


const ControlPanel = props => {
    const {} = props;
    const classes = controlPanelStyles();
    const [type, setType] = useState('COMPONENTS');

    const handleControls = type => {
        setType(type);
    }

    const renderControlIcons = () => controlIcons.map(item => (
        <Tooltip key={item.name} title={`${item.name}`} aria-label={`${item.name}`}
        >
            <item.icon onClick={() => handleControls(item.type)} className={classes.icon} />
        </Tooltip>
    ))

    return (
        <div className={classes.root}>
        <div className={classes.controlIconWrapper}>
            {renderControlIcons()}
        </div>
             <DroppableWithChildren
                childType="INPUTS"
                parentType={type}
                name="controlPanel"
                direction="vertical"
                getDroppableStyle={getDroppableStyle}
                getDraggableStyle={getContainerStyles}
                childDraggableStyle={childDraggableStyle}
                childDropStyles={childDropSyles}
                components={components.filter(item => item.type === type)}
                />
        </div>
    )
}

export default ControlPanel;