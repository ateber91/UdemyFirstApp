import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 2)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

const newIngredients = initialState.ingredients;

export function shoppingListReducer(
    state: State = initialState,
    action: ShoppingListAction.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            const indexIngredient = [...state.ingredients].findIndex(
                i => i.name === action.payload.name
            );
            if (indexIngredient === -1) {
                newIngredients.push(action.payload);
            } else {
                newIngredients[indexIngredient].amount += action.payload.amount;
            }
            return {
                ...state,
                ingredients: newIngredients
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            for (const ingr of [...action.payload]) {
                const indexIngredients = [...state.ingredients].findIndex(
                    i => i.name === ingr.name
                );
                if (indexIngredients === -1) {
                    newIngredients.push(ingr);
                } else {
                    newIngredients[indexIngredients].amount += ingr.amount;
                }
            }
            return {
                ...state,
                ingredients: [...newIngredients]
            };
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = { ...ingredient, ...action.payload };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListAction.DELETE_INGREDIENT:
            const updatedIngr = [...state.ingredients];
            updatedIngr.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: [...updatedIngr],
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListAction.START_EDIT:
            console.log('Payload on START_EDIT: ' + action.payload);
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: state.ingredients[action.payload]
            };
        case ShoppingListAction.STOP_EDIT:
            console.log('STOP_EDIT');
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    }
}
