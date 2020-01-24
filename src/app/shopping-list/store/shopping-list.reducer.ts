import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

const initialState = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 2)]
};

const newIngredients = initialState.ingredients;

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListAction.ShoppingListActions
) {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            const indexIngredient = [...state.ingredients].findIndex(
                i => i.name === action.payload.name
            );
            if (indexIngredient === -1) {
                console.log('indexIngredient = -1');
                newIngredients.push(action.payload);
            } else {
                console.log('indexIngredient = number');
                newIngredients[indexIngredient].amount += action.payload.amount;
            }
            return {
                ...state,
                ingredients: newIngredients
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            for (const ingredient of [...action.payload]) {
                const indexIngredients = [...state.ingredients].findIndex(
                    i => i.name === ingredient.name
                );
                if (indexIngredients === -1) {
                    console.log('indexIngredients = -1');
                    newIngredients.push(ingredient);
                } else {
                    newIngredients[indexIngredients].amount +=
                        ingredient.amount;
                    console.log('indexIngredients = number');
                }
            }
            return {
                ...state,
                ingredients: [...newIngredients]
            };
        default:
            return state;
    }
}
