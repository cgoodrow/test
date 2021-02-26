import React, { lazy, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {Form, Field} from 'react-final-form';
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons';
import { editItemHandler } from 'utils/edit-item-handler';
import { Button, Grid } from '@material-ui/core';
import { denormalizeArray, normalizeById } from 'store/utils';
import { sub } from 'date-fns';

const DroppableComponent = lazy(() => import('components/common/droppable-component'));
const CommonModal = lazy(() => import('components/common/modal'));
const CommonTextField = lazy(() => import('components/common/text-field'));

const DroppableWithChildren = props => {
    const {
        components = [],
        getDraggableStyle,
        getDroppableStyle,
        name,
        childDropStyles,
        direction,
        childDraggableStyle,
        parentType,
        childType,
        submitObject,
        setSubmitObject,
        children = []
    } = props;

    const [editModal, turnEditModal] = useState(false);
    const [editItem, setEditItem] = useState({});

    const handleEditItem = item => {
        setEditItem(item);
        turnEditModal(!editModal);
    }

    const updateItem = (item) => {
        const normalize = normalizeById(submitObject[item.parent] ? submitObject[item.parent] : [item]);
        const updateObject = { ...normalize, [item.id]: item };
        return denormalizeArray(updateObject);
    }

    const onSubmit = values => {
        let filter;
        if (editItem.parentId) {
          new Set([...components, submitObject[editItem.parent] ? submitObject[editItem.parent] : []]).forEach(element => {
                if (element.id === editItem.parentId) {
                    element.children = element.children.map(item => item.id === editItem.id ? {...item, ...values} : item)
                };
            });
            filter = {[editItem.parent]: components}
        } else {
            filter = components.reduce((acc, item) => {
                item.id === editItem.id ? acc[item.parent] = updateItem({ ...item, ...values }) : acc[item.parent] = [{ ...editItem, ...values }];
                return acc;
            }, {});
        }
        setSubmitObject({...submitObject, ...filter});
    }
    console.log('subMitObject', submitObject);

    const renderItemFields = item => (<Field key={item} style={{marginBottom: 15}} name={item} label={`${item}`} component={CommonTextField}/>)

    const draggableChildren = (array) => array.map((item, index) =>
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={childDraggableStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}>
                    {item.content}
                    {name !== 'controlPanel' &&
                        <Edit size="large" onClick={() => handleEditItem(item)} />
                    }
                </div>
            )}
        </Draggable>
    );

    return (
        <React.Fragment>
            <DroppableComponent
                type={parentType}
                name={name}
                direction={direction}
                {...{ getDroppableStyle }}
                renderClone={(provided, snapshot, rubric) => {
                    const item = components[rubric.source.index];
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getDraggableStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            {item.children ?
                                <item.content>
                                    <DroppableComponent
                                        getDroppableStyle={childDropStyles}
                                        name={item.id}
                                        direction='vertical'
                                    >
                                        {draggableChildren(children)}
                                    </DroppableComponent>
                                </item.content>
                                :
                                item.content
                            }
                            {name !== 'controlPanel' &&
                                <Edit size="large" />
                            }
                        </div>
                    )
                }}
            >
                {components.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getDraggableStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.children ?
                                    <item.content>
                                        <DroppableComponent
                                            getDroppableStyle={childDropStyles}
                                            name={item.id}
                                            direction='vertical'
                                            type={childType}
                                        >
                                            {draggableChildren(children)}
                                        </DroppableComponent>
                                    </item.content>
                                    :
                                    item.content}
                                {name !== 'controlPanel' && item.name !== 'box' &&
                                    <Edit onClick={() => handleEditItem(item)} size="large" />
                                }
                            </div>
                        )}
                    </Draggable>
                ))}
            </DroppableComponent>
            <CommonModal open={editModal} setOpen={turnEditModal} close header="Edit Element">
                <Form onSubmit={onSubmit}>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} style={{marginTop: 15}}>
                            {(editItemHandler(editItem).keys || []).map(item => renderItemFields(item))}
                            <Grid container justify='flex-end' style={{marginTop: 15}}>
                                <Button style={{marginRight: 8}} type="button" variant='contained' color='default' onClick={() => turnEditModal(!editModal)}>Cancel</Button>
                                <Button type="submit" variant='contained' color='primary'>Submit</Button>
                            </Grid>
                        </form>
                    )}
                </Form>
            </CommonModal>
        </React.Fragment>
    )
}

export default DroppableWithChildren;

DroppableWithChildren.propTypes = {
    name: PropTypes.string,
    getDraggableStyle: PropTypes.func,
    getDroppableStyle: PropTypes.func,
    childDropStyles: PropTypes.func,
    childDraggableStyle: PropTypes.func,
    components: PropTypes.array,
    direction: PropTypes.string,
    parentType: PropTypes.string,
    childType: PropTypes.string,
};