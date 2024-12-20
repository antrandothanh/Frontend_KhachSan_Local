import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import CustomerLayout from './components/Customer/CustomerLayout.js';
import CustomerBookingPage from './components/Customer/CustomerBookingPage.js';
import SignInPage from './components/SignInPage.js';
import SignUpPage from './components/SignUpPage.js';
import CustomerBookingHistoryPage from "./components/Customer/CustomerBookingHistoryPage.js";
import CustomerPaymentPage from './components/Customer/CustomerPaymentPage.js';
import CustomerHotelDetailPage from './components/Customer/CustomerHotelDetailPage.js';
import OwnerHotelsPage from './components/Owner/OwnerHotelsPage.js';
import OwnerLayout from "./components/Owner/OwnerLayout.js";
import OwnerHotelManagementLayout from "./components/Owner/OwnerHotelManagementLayout.js";
import OwnerHotelDetails from "./components/Owner/OwnerHotelManagement/OwnerHotelDetails.js";
import OwnerRooms from "./components/Owner/OwnerHotelManagement/OwnerRooms.js";
import OwnerPostRoom from "./components/Owner/OwnerHotelManagement/OwnerPostRoom.js";
import OwnerUpdateRoom from "./components/Owner/OwnerHotelManagement/OwnerUpdateRoom.js";
import CustomerAllHotelImages from './components/Customer/CustomerAllHotelImages.js';
import OwnerCustomersBooking from "./components/Owner/OwnerHotelManagement/OwnerCustomersBooking.js";
import OwnerCustomerRatings from './components/Owner/OwnerHotelManagement/OwnerCustomerRatings.js';
import OwnerHotelRegistration from './components/Owner/OwnerHotelRegistration.js';
import CustomerPaymentStatus from './components/Customer/CustomerPaymentStatus.js';
import ForgetPassword from './components/ForgetPassword.js';
import VerifyOTP from "./components/VerifyOTP.js";
import ChangePassword from './components/ChangePassword.js';
import CustomerHomePage from './components/Customer/CustomerHomePage.js';

const router = createBrowserRouter([
  {
    path: "",
    element: <CustomerLayout />,
    children: [
      {
        path: "",
        element: <CustomerHomePage />
      },
      {
        path: ":cityUrl",
        element: <CustomerBookingPage/>
      },
      {
        path: "sign-in",
        element: <SignInPage />
      },
      {
        path: "booking-history",
        element: <CustomerBookingHistoryPage />
      },
      {
        path: "sign-up",
        element: <SignUpPage />
      },
      {
        path: "payment",
        element: <CustomerPaymentPage />
      },
      {
        path: ":cityUrl/hotel-detail",
        element: <CustomerHotelDetailPage />,
      },
      {
        path: ":city/hotel-detail/all-images",
        element: <CustomerAllHotelImages />
      },
      {
        path: "payment-result",
        element: <CustomerPaymentStatus />
      },
      {
        path: 'forgot-password',
        element: <ForgetPassword />
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />
      },
      {
        path: "change-password",
        element: <ChangePassword />
      }
    ],
  },
  {
    path: "owner",
    element: <OwnerLayout />,
    children: [
      {
        path: "",
        element: <OwnerHotelsPage />,
      },
      {
        path: "hotel-info",
        element: <OwnerHotelManagementLayout />,
        children: [
          {
            path: "",
            element: <OwnerHotelDetails />
          },
          {
            path: "rooms",
            element: <OwnerRooms />
          },
          {
            path: "post-room",
            element: <OwnerPostRoom />
          },
          {
            path: "update-room",
            element: <OwnerUpdateRoom />
          },
          {
            path: "customers-booking",
            element: <OwnerCustomersBooking />
          },
          {
            path: "customer-ratings",
            element: <OwnerCustomerRatings />
          }
        ]
      },
      {
        path: "register-hotel",
        element: <OwnerHotelRegistration />
      }
    ],
  }
]);


function App() {
  
  useEffect(() => {
    document.title = "Booking xin chào";
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
