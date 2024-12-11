import React, { useEffect, useState } from "react";

export default function CustomerBookingList({ rooms, hotels, bookings }) {
  const [bookingsInfo, setBookingsInfo] = useState([]);

  useEffect(() => {
    const info = bookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);
      const hotel = room && hotels.find((h) => h.id === room.hotelId);
      if (room && hotel) {
        const date1 = new Date(booking.checkInDate);
        const date2 = new Date(booking.checkOutDate);
        const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
        return {
          hotelName: hotel.name,
          city: hotel.city || "N/A",
          bookingDate: new Date(booking.createdAt).toLocaleDateString(),
          checkIn: date1.toLocaleDateString(),
          checkOut: date2.toLocaleDateString(),
          nightStay: diffDays,
          totalPrice: room.price * diffDays,
        };
      }
      return null;
    }).filter(Boolean); // Filter out null values
    setBookingsInfo(info);
  }, [rooms, hotels, bookings]);

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
          </tr>
        </thead>
        <tbody>
          {bookingsInfo.length > 0 ? (
            bookingsInfo.map((booking, index) => (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                Chưa có lần đặt nào
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
