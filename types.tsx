export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Children: undefined;
  Chart: undefined;
  Table: undefined;
};

export type ChildrenParamList = {
  ChildrenScreen: undefined;
  ChildFormScreen: {id:number};
  ChildDetailScreen: {id:number};
  LoginScreen: undefined;
  SignupScreen: undefined;
  MeasurementFormScreen: {id:number, childId:number};
};

export type ChartParamList = {
  ChartScreen: undefined;
};

export type TableParamList = {
  TableScreen: undefined;
};

export type FAQParamList = {
  FAQScreen: undefined;
};

export type AuthParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type AppStackParamList = {
  Auth: undefined;
  Drawer: undefined;
};