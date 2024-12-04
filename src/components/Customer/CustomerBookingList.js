import React, { useEffect, useState } from "react";

export default function CustomerBookingList({ rooms, hotels, bookings }) {
  const [bookingsInfo, setBookingsInfo] = useState([]);

  useEffect(() => {
    const info = bookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);
      const hotel = hotels.find((h) => h.id === room?.hotelId);
      if (room && hotel) {
        let date1 = new Date(booking.checkInDate);
        let date2 = new Date(booking.checkOutDate);
        let diffTime = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = diffTime/(1000*60*60*24);
        return {
          hotelName: hotel.name,
          city: hotel.city || "N/A", // Add city property if available
          bookingDate: booking.createdAt,
          checkIn: booking.checkInDate,
          checkOut: booking.checkOutDate,
          nightStay: diffDays,
          totalPrice: room.price * diffDays,
        };
      }
      return null;
    });
    setBookingsInfo(info);
  }, [rooms, hotels, bookings]);

  const handleCancel = (index) => {
    console.log(`Cancel booking at index: ${index}`);
    // Add cancellation logic here
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Tên khách sạn</th>
            <th scope="col" className="px-6 py-3">Ngày đặt</th>
            <th scope="col" className="px-6 py-3">Thành phố</th>
            <th scope="col" className="px-6 py-3">Ngày nhận phòng</th>
            <th scope="col" className="px-6 py-3">Ngày trả phòng</th>
            <th scope="col" className="px-6 py-3">Tổng số đêm</th>
            <th scope="col" className="px-6 py-3">Tổng tiền</th>
            {/* <th scope="col" className="px-6 py-3">Hủy đặt</th> */}
          </tr>
        </thead>
        <tbody>
          {bookingsInfo.map((booking, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {booking.hotelName}
              </td>
              <td className="px-6 py-4">{booking.bookingDate}</td>
              <td className="px-6 py-4">{booking.city}</td>
              <td className="px-6 py-4">{booking.checkIn}</td>
              <td className="px-6 py-4">{booking.checkOut}</td>
              <td className="px-6 py-4">{booking.nightStay}</td>
              <td className="px-6 py-4">{booking.totalPrice} VNĐ</td>
              {/* <td className="px-6 py-4">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleCancel(index)}
                >
                  HỦY
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  
}
