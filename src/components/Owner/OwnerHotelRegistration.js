import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


export default function OwnerHotelRegistration() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const owner = cookies.user;
    const [hotelName, setHotelName] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [district, setDistrict] = useState("");
    const [description, setDescription] = useState("");
    const [utilities, setUtilities] = useState([]);
    const [selectedUtilities, setSelectedUtilities] = useState([]);
    const [hotelImagesLinks, setHotelImagesLinks] = useState([]);
    // const [hotelImages, setHotelImages] = useState([]);
    const hotelImages = [];
    const [uploadImageMessage, setUploadImageMessage] = useState("");

    // const handleImageUrlChange = (index, value) => {
    //     const updatedUrls = [...imageUrls];
    //     updatedUrls[index] = value;
    //     setImageUrls(updatedUrls);
    // };

    const handleUtilityChange = async (e) => {
        const selectedUtilityId = e.target.value;
        const selectedUtility = await fetchUtilityById(selectedUtilityId);
        const updateUtilities = [...selectedUtilities];
        updateUtilities.push(selectedUtility);
        setSelectedUtilities(updateUtilities);
    };

    const handleRegister = async () => {
        for (let i = 0; i < hotelImagesLinks.length; i++) {
            await createHotelImageApi(hotelImagesLinks[i]);
        }
        await createHotelApi();
    };

    const createHotelApi = async () => {
        try {
            const request = await axios.post(`http://localhost:8080/api/hotels`, {
                ownerId: owner.id,
                name: hotelName,
                street: street,
                district: district,
                city: city,
                description: description,
                utilities: selectedUtilities,
                hotelImages: hotelImages
            });
            console.log("Register hotel successfully: ", request);
            window.alert("Đăng kí phòng thành công.");
            window.location.reload();
        }
        catch (error) {
            console.error("Cannot create new hotel: ", error);
        }
    }

    const handleRemoveAllSelectedUtilities = () => {
        setSelectedUtilities([]);
    }

    const createHotelImageApi = async (imageUrl) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/hotel-images`, {
                imageUrl: imageUrl
            });
            hotelImages.push(response.data.result);
        }
        catch (error) {
            console.error("Cannot create new image: ", error);
        }
    }

    const fetchUtilities = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/utilities`);
            setUtilities(response.data.result);
        }
        catch (error) {
            console.error("Cannot fetch utilities: ", error);
        }
    }

    const fetchUtilityById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/utilities/${id}`);
            return (response.data.result);
        }
        catch (error) {
            console.error("Cannot fetch utility by id: ", error);
        }
    }

    const fetchData = async () => {
        fetchUtilities();
    }

    const uploadImage = async (e) => {
        try {
            const files = e.target.files;
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
            const request = await axios.post("http://localhost:8080/api/uploadImages", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (request) {
                setUploadImageMessage("Tải ảnh thành công");
                setHotelImagesLinks(request.data.result);
            } else {
                setUploadImageMessage("Tải ảnh thất bại, vui lòng làm lại");
            }
        } catch (error) {
            console.error("Cannot upload images", error);
            setUploadImageMessage("Tải ảnh thất bại, vui lòng làm lại");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


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
                                type="text"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Thành phố</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Quận/huyện</label>
                            <input
                                type="text"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Tên đường</label>
                            <input
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Mô tả</label>
                        <textarea
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="utilities" className="block mb-2 text-sm font-medium text-gray-900">Các tiện ích</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleUtilityChange}
                        >
                            <option value="" >Hãy lựa chọn tiện ích</option>
                            {utilities.map((utility) => (
                                <option key={utility.id} value={utility.id}>
                                    {utility.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-wrap gap-4">
                            {selectedUtilities.map((utility) => {
                                if (utility) {
                                    return (
                                        <div className="flex flex-wrap gap-4 mt-2">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    alt="utility-icon"
                                                    src={utility.imageUrl}
                                                    className="w-6 h-6"
                                                />
                                                <span className="text-green-400 font-semibold">{utility.name}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                            <button onClick={handleRemoveAllSelectedUtilities} type="button" class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Xóa hết</button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Chọn ảnh</label>
                        <input type="file" multiple onChange={uploadImage} />
                    </div>
                    <div className="mb-6 text-red-500">
                        Lưu ý: Đợi hiện thông báo "Tải ảnh thành công" mới được nhấn đăng ký
                    </div>
                    <div className="mb-6">
                        {uploadImageMessage}
                    </div>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Đăng ký
                    </button>
                </form>
            </div >
        </div >
    );
}
