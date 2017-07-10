export interface IAppState {
  ui: {
    articleTitleIsVisible: boolean;
  };
}

const intiialAppState:IAppState = {
  ui: {
    articleTitleIsVisible: true,
  },
};

export default intiialAppState;
