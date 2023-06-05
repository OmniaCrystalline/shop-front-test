/** @format */

export const handleResolveProducts = (state, action) => {
  state.isLoading = false;
  state.products = action.payload;
};

export const handlePending = (state, action) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
};

export const handleResolveOrder = (state, action) => {
  state.isLoading = false;
  state.user = {
    name: "",
    phone: "",
    email: "",
    adress: "",
    date: null,
    order: [],
  };
  state.basket = [];
};

export const handleResolveHistory = (state, action) => {
  state.isLoading = false;
  state.history = action.payload
};
