import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import RecentSearch from '../components/Search/RecentSearch';

const isClickedSearchIcon = createSlice({
  name: 'isClickedSearchIcon',
  initialState : false,
  reducers: {
      trueIsClickedSearchIconState (){
      return true;
    },
    falseIsClickedSearchIconState() {
      return false;
    }
  }
})

const isSearchResultPage = createSlice({
  name: 'isSearchResultPage',
  initialState: false,
  reducers: {
    trueIsSearchResultPage() {
      return true;
    },
    falseIsSearchResultPage() {
      return false;
    }
  }
})

const isSearching = createSlice({
  name: 'isSearching',
  initialState : false,
  reducers: {
    IsSearchingTrue (){
      return true;
    },

    IsSearchingFalse (){
      return false;
    }
  }
})

const searchTextInput = createSlice({
  name: 'searchTextInput',
  initialState : "",
  reducers: {
    changeSearchTextInput (state, action: PayloadAction<string>){
      return action.payload;
    }
  }
})

const recentSearchList = createSlice({
  name: 'recentSearchList',
  initialState: () => {
    let RecentSearchList: string[] = [];
    const RecentSearchListString = localStorage.getItem('RecentSearchList');
    if (RecentSearchListString) {
      RecentSearchList = JSON.parse(RecentSearchListString);
    }
    return RecentSearchList;
  },
  reducers: {
    removeRecentSearchList(state, action: PayloadAction<number>) {
      state.splice(action.payload, 1);
      localStorage.setItem('RecentSearchList', JSON.stringify(state));
    },

    addRecentSearchList(state, action: PayloadAction<string>) {
      const index = state.indexOf(action.payload);
      if (index > -1) {
        state.splice(index, 1);
      }
      else if (state.length >= 5) {
        state.pop();
      }
      state.unshift(action.payload);
      localStorage.setItem('RecentSearchList', JSON.stringify(state));
    },

    resetRecentSearchList(state) {
      state.length = 0;
      localStorage.removeItem('RecentSearchList');
    }
  }
})

export const { falseIsClickedSearchIconState, trueIsClickedSearchIconState } = isClickedSearchIcon.actions;
export const { IsSearchingFalse, IsSearchingTrue } = isSearching.actions;
export const { changeSearchTextInput } = searchTextInput.actions;
export const { removeRecentSearchList, addRecentSearchList, resetRecentSearchList } = recentSearchList.actions;
export const { trueIsSearchResultPage, falseIsSearchResultPage } = isSearchResultPage.actions;

export const store = configureStore({
  reducer: {
    isClickedSearchIcon: isClickedSearchIcon.reducer,
    isSearching: isSearching.reducer,
    searchTextInput: searchTextInput.reducer,
    recentSearchList: recentSearchList.reducer,
    isSearchResultPage: isSearchResultPage.reducer,
  }
})

//state 타입을 export 해두는건데 나중에 쓸 데가 있음
export type RootState = ReturnType<typeof store.getState>