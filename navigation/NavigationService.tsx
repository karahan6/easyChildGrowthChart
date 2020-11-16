import { CommonActions } from '@react-navigation/native';

let _navigator:any;

export interface INavigationService {
  setTopLevelNavigator(navigatorRef: any):any,
  navigate(name: string, params: any):any
}

export const navigationService: INavigationService = {
  navigate: function(name, params) {
    _navigator.dispatch(CommonActions.navigate({ name, params}));
  },
  setTopLevelNavigator: function(navigatorRef) {
    _navigator = navigatorRef;
  }
};