import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";



export default function OwnerHotelDetails() {
    const location = useLocation();
    // hotel
    const hotelId = location.state.hotelId;
    const [name, setName] = useState("default");
    const [city, setCity] = useState("default");
    const [district, setDistrict] = useState("default");
    const [street, setStreet] = useState("default");
    const [description, setDescription] = useState("default");
    const [utilities, setUtilities] = useState([]);
    const [hotelImages, setHotelImages] = useState([]);

    const [isEditable, setIsEditable] = useState(false);

    const fetchHotelById = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/hotels/${hotelId}`);
            const result = response.data.result;
            setName(result.name);
            setCity(result.city);
            setDistrict(result.district);
            setStreet(result.street);
            setDescription(result.description);
            setUtilities(result.utilities);
            setHotelImages(result.hotelImages);
        }
        catch {
            console.error("Cannot fetch hotel");
        }
    }

    const handleEditable = () => {
        setIsEditable(!isEditable);
        fetchHotelById(location.state.hotelId);
    }

    const handleSave = async () => {
        try {
            const request = await axios.put(`http://localhost:8080/api/hotels/${hotelId}`, {
                name: name,
                street: street,
                district: district,
                city: city,
                description: description,
                utilities: utilities,
                hotelImages: hotelImages
            });
            if (request.data) {
                window.alert("Lưu thành công");
                setIsEditable(!isEditable);
            }
        } catch (error) {
            console.error("Cannot save edit", error);
            window.alert("Lưu thất bại");
        }
    }

    useEffect(() => {
        fetchHotelById();
    }, [location.state.hotelId]);
    return (
        <div>
            <div className="my-5 text-center">
                <p className="text-3xl capitalize font-bold">Thông tin khách sạn</p>
            </div>
            <div className="my-5 mx-56">
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên khách sạn</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                readOnly={!isEditable}/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Thành phố</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                readOnly={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Quận/huyện</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                readOnly={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên đường</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                readOnly={!isEditable} />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Mô tả</label>
                        <textarea
                            rows="10"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            readOnly={!isEditable}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    <button
                        id="isEditableBtn"
                        type="button"
                        onClick={handleEditable}
                        class="mr-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        {isEditable ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
                    </button>

                    {isEditable && (
                        <button
                            type="button"
                            onClick={handleSave}
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Lưu
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
}