import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Form } from 'react-final-form';
import { Grid } from '@material-ui/core';
import { normalizeById, denormalizeArray } from 'store/utils';
import { standardStyles } from 'assets/styles/standard';

import DroppableWithChildren from 'components/common/droppable-with-children';
import ControlPanel from 'components/control-panel';
import components from 'constants/components';
import CommonSearchComponent from 'components/common/search-component';

const StandardTemplate = () => {
    const grid = 8;
    const classes = standardStyles();

    const getDroppableStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        marginBottom: 15,
        marginRight: 5,
        marginLeft: 5,
        minHeight: 40,
        display: 'flex',
        flex: 'auto',
        flexDirection: 'row',
    });

    const getDroppableButtonStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        marginBottom: 15,
        marginRight: 5,
        marginLeft: 5,
        minHeight: 40,
        display: 'flex',
        flex: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
    });

    const childDropSyles = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        display: 'flex',
        flex: 'auto',
        flexDirection: 'column',
    })

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        display: 'flex',
        padding: 9,
        alignItems: 'center',
        // width: '100%',
        background: isDragging ? 'lightgrey' : 'inherit',
        maxHeight: isDragging ? 'auto !important' : 'inherit',
        ...draggableStyle,
    });

    const getGridItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        display: 'flex',
        padding: 9,
        alignItems: 'center',
        background: isDragging ? 'lightgrey' : 'inherit',
        maxHeight: isDragging ? 'auto !important' : 'inherit',
        justifyContent: 'space-between',
        flex: 'auto',
        ...draggableStyle,
    });

    const getGridTwoItemStyle = (isDragging, draggableStyle) => ({
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDragging ? 'lightgrey' : 'inherit',
        maxHeight: isDragging ? 'auto !important' : 'inherit',
        ...draggableStyle,
    })

    const [gridComponents, setGridComponents] = useState({});
    const [submitObject, setSubmitObject] = useState({});

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const findIndex = sourceClone.findIndex(item => item.id === droppableSource.draggableId);
        const [removed] = sourceClone.splice(findIndex, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    const randomGuid = uuidv4();

    // const getChildArray = destination => {
    //     let childArray = [];
    //     Object.entries(gridComponents).map(([key, value]) => {
    //         value.map(el => {
    //             if (el.id === destination.droppableId) {
    //                 childArray = gridComponents[key];
    //             }
    //         });
    //     })
    //     return childArray;
    // }

    console.log('components', gridComponents[`gridTwo`] ? gridComponents[`gridTwo`][`components`] : []);

    console.log('components', gridComponents);


    const getParentKey = (destination) => {
        console.log('gridCOmponents', gridComponents, 'destination', destination);
        let parentKey;
        Object.entries(gridComponents).forEach(([key, value]) => {
            Object.entries(value).forEach(([key, item]) => {
                item.forEach(el => {
                    if (el.id === destination.droppableId) {
                        parentKey = el.parent;
                    }
                });
            });
        });
        return parentKey;
    }

    const onDragEnd = result => {
        const { source, destination, type, draggableId } = result;

        console.log('result', result);

        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            if (type === 'INPUTS') {
                const normalizeObject = normalizeById(getChildArray(destination));
                const items = reorder(
                    normalizeObject[destination.droppableId].children,
                    source.index,
                    destination.index
                );
                const newArray = { ...normalizeObject, [destination.droppableId]: { ...normalizeObject[destination.droppableId], children: items } }
                setGridComponents({ ...gridComponents, [getParentKey(destination)]: denormalizeArray(newArray) });

            } else {
                const items = reorder(
                    gridComponents[destination.droppableId],
                    source.index,
                    destination.index
                );
                setGridComponents({ ...gridComponents, [destination.droppableId]: items });
            }
        } else {
            let mergeSource = Object.assign({ ...source, draggableId: draggableId });
            // if (destination.droppableId.includes('Grid') && source.droppableId.includes('Grid')) {
            //     const response = move(
            //         gridComponents[source.droppableId] ? gridComponents[source.droppableId] : [],
            //         gridComponents[destination.droppableId] ? gridComponents[destination.droppableId] : [],
            //         mergeSource,
            //         destination,
            //     )
            //     setGridComponents({...gridComponents, ...response});
            if (type === 'INPUTS') {
                const mergeDestination = Object.assign({...destination, droppableId: result.type.toLowerCase()})
                const response = move(
                    components,
                    gridComponents[getParentKey(destination)][result.type.toLowerCase()] ? gridComponents[getParentKey(destination)][result.type.toLowerCase()] : [],
                    mergeSource,
                    mergeDestination,
                )
                const generateId = response[result.type.toLowerCase()].map(item => ({ ...item, parentId: destination.droppableId, id: item.id === draggableId ? randomGuid : item.id }));
                setGridComponents({ ...gridComponents, [getParentKey(destination)]: {...gridComponents[getParentKey(destination)], [result.type.toLowerCase()]: generateId}});
            } else {0
                const destinationParent = gridComponents[destination.droppableId] ? gridComponents[destination.droppableId] : {};
                const mergeDestination = Object.assign({...destination, droppableId: result.type.toLowerCase()})
                const response = move(
                    components,
                    destinationParent[result.type.toLowerCase()] ? destinationParent[result.type.toLowerCase()] : [],
                    mergeSource,
                    mergeDestination,
                )
                const generateId = response[result.type.toLowerCase()].map(item => ({ ...item, parent: destination.droppableId, id: item.id === draggableId ? randomGuid : item.id }))
                setGridComponents({ ...gridComponents, [destination.droppableId]: {[result.type.toLowerCase()]: generateId}});
            }
        }
    };
    const onSubmit = values => {
        console.log('values', values);
    }

    return (
        <Form onSubmit={onSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Grid container justify="center" className={classes.droppableContainers}>
                            <Grid item xs={5}>
                            <DroppableWithChildren
                                    childType=""
                                    parentType="COMPONENTS"
                                    name="header"
                                    direction="horizontal"
                                    getDroppableStyle={getDroppableStyle}
                                    getDraggableStyle={getGridItemStyle}
                                    childDraggableStyle={getItemStyle}
                                    childDropStyles={childDropSyles}
                                    components={gridComponents['header'] ? gridComponents['header']['components'] : []}
                                    {...{submitObject, setSubmitObject}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <DroppableWithChildren
                                    childType=""
                                    parentType="COMMON"
                                    name="gridOne"
                                    direction="horizontal"
                                    getDroppableStyle={getDroppableStyle}
                                    getDraggableStyle={getGridItemStyle}
                                    childDraggableStyle={getItemStyle}
                                    childDropStyles={childDropSyles}
                                    components={gridComponents['gridOne'] ? gridComponents['gridOne']['common'] : []}
                                    {...{submitObject, setSubmitObject}}
                                />
                            </Grid>
                            <Grid item container justify="center" xs={12} sm={6}>
                                <DroppableWithChildren
                                    childType="INPUTS"
                                    parentType="COMPONENTS"
                                    name="gridTwo"
                                    direction="horizontal"
                                    getDroppableStyle={getDroppableButtonStyle}
                                    getDraggableStyle={getGridTwoItemStyle}
                                    childDraggableStyle={getItemStyle}
                                    childDropStyles={childDropSyles}
                                    children={gridComponents['gridTwo'] ? gridComponents['gridTwo']['inputs'] : []}
                                    components={gridComponents['gridTwo'] ? gridComponents['gridTwo']['components'] : []}
                                    {...{submitObject, setSubmitObject}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <DroppableWithChildren
                                    childType=""
                                    parentType="COMMON"
                                    name="gridThree"
                                    direction="horizontal"
                                    getDroppableStyle={getDroppableStyle}
                                    getDraggableStyle={getGridItemStyle}
                                    childDraggableStyle={getItemStyle}
                                    childDropStyles={childDropSyles}
                                    components={gridComponents['gridThree'] ? gridComponents['gridThree']['common'] : []}
                                    {...{submitObject, setSubmitObject}}
                                />
                            </Grid>
                        </Grid>
                        <ControlPanel />
                    </DragDropContext>
                </form>
            )}
        </Form>
    );
}

export default StandardTemplate;
