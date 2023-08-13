export const STATUS = {
  main: 'main' as const,
  confirm: 'confirm' as const,
  confirmed: 'confirmed' as const,
  failed: 'failed' as const,
  closed: 'closed' as const,
};

type ModalStatusType = 'main' | 'confirm' | 'confirmed' | 'failed' | 'closed'; // 'loading' |

// export type ModalContextType<T> = {
export type ModalContextType = {
  status: ModalStatusType;
  failedCode?: number; // error.response.data.code
  failedMessage?: string; // error.response.data.message
  failedErrors?: string[]; // error.response.data.error
  // data: T;
};

export type ModalDispatchContextType = React.Dispatch<ModalActionType>;

// export type ModalActionType<T> =
export type ModalActionType =
  | { type: 'NEXT' } // for login purpose
  | { type: 'PREV' }
  | { type: 'CLOSE' } // for modifying the state freely
  | { type: 'OPEN' } // for refreshing purpose
  | {
      type: 'FAILED';
      payload: {
        failedCode?: number;
        failedMessage?: string;
        failedErrors?: string[];
      };
    }
  | { type: 'OPEN_AT'; payload: ModalStatusType };

const initial_value: ModalContextType = {
  status: 'closed',
};

export function reducer(
  state: ModalContextType,
  action: ModalActionType
): ModalContextType {
  switch (action.type) {
    case 'NEXT': {
      if (state.status === STATUS.closed) return { ...state, status: 'main' };
      if (state.status === STATUS.main) return { ...state, status: 'confirm' };
      if (state.status === STATUS.confirm)
        return { ...state, status: 'confirmed' };
      if (state.status === STATUS.failed) return { ...state, status: 'closed' };
      if (state.status === STATUS.confirmed)
        return { ...state, status: 'closed' };
      return state ?? { ...initial_value };
    }
    case 'PREV': {
      if (state.status === STATUS.closed)
        return { ...state, status: 'confirmed' };
      if (state.status === STATUS.main) return { ...state, status: 'closed' };
      if (state.status === STATUS.confirm) return { ...state, status: 'main' };
      if (state.status === STATUS.failed)
        return { ...state, status: 'confirm' };
      if (state.status === STATUS.confirmed)
        return { ...state, status: 'confirm' };
      return state ?? { ...initial_value };
    }
    case 'CLOSE': {
      return {
        ...state,
        status: STATUS.closed,
      };
    }
    case 'OPEN': {
      return {
        ...state,
        status: STATUS.main,
      };
    }
    case 'FAILED': {
      return {
        ...state,
        status: STATUS.failed,
        failedMessage: action.payload.failedMessage,
        failedCode: action.payload.failedCode,
        failedErrors: action.payload.failedErrors,
      };
    }
    case 'OPEN_AT': {
      return {
        ...state,
        status: action.payload,
      };
    }
    // case 'MODIFY_DATA': {
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       ...action.payload,
    //     },
    //   };
    // }
    default: {
      return { ...state };
      // throw new Error('Unknown action type');
    }
  }
}
/**
example usage with modal reducer with useGlobalReducer
export const {
  Context: MealContext,
  DispatchContext: MealDispatchContext,
  StateProvider: MealStateProvider,
} = createStateContext<ModalContextType<T>, ModalActionType<T>>(
  reducer,
  initial_value
);
export const useModalState = () => useContext(MealContext);
export const useModalDispatch = () => useContext(MealDispatchContext);

or can be used alone with useReducer
export default function useModal<T>(initialValue: {
  status: ModalStatusType;
  data: T;
}) {
    return useReducer<Reducer<ModalContextType<T>, ModalActionType<T>>>(
    reducer<T>,
    initialValue ?? initial_value
  );
}
 */
