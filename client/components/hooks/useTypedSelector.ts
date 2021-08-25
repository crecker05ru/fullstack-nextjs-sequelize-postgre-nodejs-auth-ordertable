import { RootState } from "../../store/reducers";
import { useSelector,TypedUseSelectorHook } from 'react-redux';


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector