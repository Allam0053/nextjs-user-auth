import React, { createContext, useReducer } from 'react';

// type DispatchContextType<T> = React.Dispatch<React.SetStateAction<T>>;

export function createStateContext<StateType, ActionType>(
  stateManager: (state: StateType, action: ActionType) => StateType,
  initialValue?: StateType
) {
  const Context = createContext(initialValue);
  const DispatchContext = createContext<React.Dispatch<ActionType>>(() => {
    return;
  });

  const StateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    // const [state, dispatch] = useState(initialValue);
    const [state, dispatch] = useReducer(
      stateManager,
      initialValue ?? (undefined as StateType)
    );

    return (
      <Context.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </Context.Provider>
    );
  };

  // const useStateContext = () => useContext(Context);
  // const useDispatchContext = () => useContext(DispatchContext);

  return {
    Context,
    DispatchContext,
    StateProvider,
    // useStateContext,
    // useDispatchContext,
  };
}

/* usage
// usage of useGlobalReducer.tsx in useMeal.ts
import lodashUniqBy from 'lodash/uniqBy';
import { useContext } from 'react';
import { createStateContext } from '@/hooks/useGlobalReducer';
import { Meal } from '@/types/models';
export type MealActionType =
  | // create new, clear all
  {
      type: 'NEW';
      payload: Meal[];
    }
  // push new meal, overwrite existing
  | {
      type: 'PUSH';
      payload: Meal[];
    };
type MealStateType = Meal[];
export function mealReducer(state: MealStateType, action: MealActionType) {
  switch (action.type) {
    case 'NEW': {
      const newMeals = new Array(...action.payload);
      return newMeals;
    }
    case 'PUSH': {
      const Meals = new Array(...state);
      Meals.push(...action.payload);
      const uniqueMeals = lodashUniqBy(Meals, 'idMeal');
      return uniqueMeals;
    }
  }
}
export const {
  Context: MealContext,
  DispatchContext: MealDispatchContext,
  StateProvider: MealStateProvider,
} = createStateContext<MealStateType, MealActionType>([], mealReducer);
export const useMealState = () => useContext(MealContext); // remember to only call it inside the provider
export const useMealDispatch = () => useContext(MealDispatchContext); // remember to only call it inside the provider
*/
