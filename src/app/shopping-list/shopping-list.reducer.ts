import { Ingredient } from '../shared/ingredient.model';
import { Action, State } from '@ngrx/store';
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('tomatoes', 2)]
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action]
            };
    }
}
