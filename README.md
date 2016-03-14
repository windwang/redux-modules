# Reduxify
A library for defining clear, boilerplate free Redux reducers with propType checked actions.

## Advantages
- Proptype checking for your action payloads.
- Generate new actions quickly and easily
- Automatic action name convention (camel cased)
- Auto prefixed action types

## Usage
```js
const {actions, reducer} = reduxify(actionPrefix, transformations);
```
### Arguments:
- **actionPrefix**: Prefix for action type
- **transformations**: Array of `transformation` objects.

## Transformation Object
```js
{
  action: 'ADD_TODO_ITEM',
  payloadTypes: {
    'todo': PropTypes.shapeOf({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  },
  reducer: (state, {todo}) => state.set(todo.id, todo),
},
```
### Attributes:
- **action**: Action constant
- **payloadTypes**: Like React PropTypes, but for your action payload.
- **reducer**: State transformation that corresponds to the action

## Example
```js
import {PropTypes} from 'react';
import reduxify from 'reduxify';

const transformations = [
  {
    action: 'ADD_TODO_ITEM',
    payloadTypes: {
      'todo': PropTypes.object.isRequired,
    },
    reducer: (state, {todo}) => state.set(todo.id, todo),
  },

  {
    action: 'REMOVE_TODO_ITEM',
    payloadTypes: {
      'id': PropTypes.number.isRequired,
    },
    reducer: (state, {id}) => state.remove(id),
  },

  {
    action: 'COMPLETE_TODO_ITEM',
    payloadTypes: {
      'id': PropTypes.number.isRequired,
    },
    reducer: (state, {id}) =>
      state.update(id, todo => todo.set('complete', true)),
  },
];

const {reducer, actions} = reduxify('todos', transformations);

export {
  reducer as default,
  actions,
};
```

Equivalent reducer with module/duck paradigm:
```js
import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const ADD_TODO_ITEM = 'todos/ADD_TODO_ITEM';
const REMOVE_TODO_ITEM = 'todos/REMOVE_TODO_ITEM';
const COMPLETE_TODO_ITEM = 'todos/COMPLETE_TODO_ITEM';

const addTodoItem = createAction(ADD_TODO_ITEM);
const removeTodoItem = createAction(REMOVE_TODO_ITEM);
const completeTodoItem = createAction(COMPLETE_TODO_ITEM);

export const reducer = handleActions(
  {
    [ADD_TODO_ITEM]: (state, {todo}) => state.set(todo.id, todo),
    [REMOVE_TODO_ITEM]: (state, {id}) => state.remove(id),
    [COMPLETE_TODO_ITEM]: (state, {id}) => state.update(id, todo => todo.set('complete', true)),
  },
  Map()
);

export default reducer;
export const actions = {
  addTodoItem,
  removeTodoItem,
  completeTodoItem,
};
```
