
const editableTypes = [
    {
        id: 'COMPONENTS',
        keys: ['label'],
    },
    {
        id: 'INPUTS',
        keys: ['name', 'label'],
    },
    {
        id: 'COMMON',
        keys: ['label']
    }
]
export const editItemHandler = data =>
editableTypes.filter(el => el.id === data.type).reduce((acc, item) => {
    acc['keys'] = [...item.keys]
    return acc;
  }, {});