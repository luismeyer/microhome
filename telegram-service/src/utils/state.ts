type State = {
  language?: string;
};
export let state: State = {};

export const clearState = () => (state = {});

export const setState = (newState: State) => (state = newState);
