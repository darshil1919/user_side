import { configureStore } from '@reduxjs/toolkit';
// user slice
import userSlice from './slice/userSlice/userSlice';
import userProfileSlice from './slice/userSlice/userProfileSlice';
import forgotPasswordSlice from './slice/userSlice/forgotPasswordSlice';
// import allUserSlice from './slice/userSlice/allUserSlice';
import userDetailSlice from './slice/userSlice/userDetailSlice';

// category slice
import allCategorySlice from './slice/categorySlice/allCategorySlice';

// subcategory slice
import allSubCategorySlice from './slice/subCategorySlice/allSubCategorySlice';

// service slice
import allServiceSlice from './slice/serviceSlice/allServiceSlice';

// cart slice
import cartOperationSlice from './slice/cartSlice/cartOperationSlice';
import cartDetailsSlice from './slice/cartSlice/cartDetailsSlice';

// order slice
import orderDetailsSlice from './slice/orderSlice/orderDetailsSlice';

// review slice
import reviewDetailsSlice from './slice/reviewSlice/reviewDetailsSlice';
import reviewOperationSlice from './slice/reviewSlice/reviewOperationSlice';

const store = configureStore({
    reducer: {
        // user slice
        user: userSlice,
        profile: userProfileSlice,
        forgotPassword: forgotPasswordSlice,
        // allUser: allUserSlice,
        userDetail: userDetailSlice,

        // category slice
        allCategory: allCategorySlice,

        // subcategory slice
        allSubCategory: allSubCategorySlice,

        // service slice
        allService: allServiceSlice,

        // cart slice
        cartDetails: cartDetailsSlice,
        cartOperation : cartOperationSlice,

        // order slice
        orderDetails: orderDetailsSlice,

        // review slice
        reviewDetails: reviewDetailsSlice,
        reviewOperation: reviewOperationSlice
    },
});

export default store;