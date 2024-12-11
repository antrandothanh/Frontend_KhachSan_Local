import React from "react";

export default function CustomerHomePage() {
    return (
        <div>
            {/* carousel */}
            <div id="default-carousel" className="relative w-full" data-carousel="slide" data-carousel-interval="5000">
                {/* <!-- Carousel wrapper --> */}
                <div className="relative h-[700px] overflow-hidden">
                    {/* <!-- Item 1 --> */}
                    <div className="hidden duration-1000 ease-in-out" data-carousel-item>
                        <img src="images/Carousels/Resort5SaoNhaTrang.jpg" className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-[300px]">
                            <div>
                                <p className="text-5xl font-bold">
                                    Trải nghiệm đỉnh cao của sự sang trọng và tiện nghi. Đặt ngay kỳ nghỉ trong mơ của bạn tại các điểm đến tuyệt đẹp.
                                </p>
                                <div className="my-10">
                                    <a href="#city-selection" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">ĐẶT PHÒNG NGAY</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Item 2 --> */}
                    <div className="hidden duration-1000 ease-in-out" data-carousel-item>
                        <img src="images/Carousels/HoChiMinhCity.jpg" className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-[300px]">
                            <div>
                                <p className="text-5xl font-bold">
                                    Nghỉ chân ngay trung tâm thành phố! Thưởng thức dịch vụ đẳng cấp với vị trí thuận lợi gần các điểm tham quan và khu vui chơi sôi động.
                                </p>
                                <div className="my-10">
                                    <a href="#city-selection" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">ĐẶT PHÒNG NGAY</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Item 3 --> */}
                    <div className="hidden duration-1000 ease-in-out" data-carousel-item>
                        <img src="images/Carousels/HoTramBeachResort.jpg" className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-[300px]">
                            <div>
                                <p className="text-5xl font-bold">
                                    Nghe tiếng sóng vỗ về, thả mình vào không gian bình yên tại khu nghỉ dưỡng ven biển, nơi những khoảnh khắc thư giãn trở nên tuyệt vời.
                                </p>
                                <div className="my-10">
                                    <a href="#city-selection" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">ĐẶT PHÒNG NGAY</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Item 4 --> */}
                    <div className="hidden duration-1000 ease-in-out" data-carousel-item>
                        <img src="images/Carousels/BeautifulRoom.jpg" className="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white p-[300px]">
                            <div>
                                <p className="text-5xl font-bold">
                                    Lựa chọn phòng nghỉ độc đáo phù hợp với nhu cầu của bạn. Từ những phòng thiết kế sáng tạo đến không gian sang trọng, tất cả đều đang chờ đón bạn.
                                </p>
                                <div className="my-10">
                                    <a href="#city-selection" type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">ĐẶT PHÒNG NGAY</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Slider indicators --> */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-lable="Slide 4" data-carousel-slide-to="3"></button>
                </div>
                {/* <!-- Slider controls --> */}
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg className="w-4 h-4 text-white  rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            <div className="mx-60 my-24">
                <div id="city-selection" className="font-bold text-5xl mb-10 text-center">
                    Lựa chọn điểm đến
                </div>
                <div className="flex justify-center">
                    <div className="min-w-[800px]">
                        <div className="mb-5 h-[300px] relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                            <a href="/HoChiMinh">
                                <img className="rounded-lg h-full w-full" src="images/Cities/NhaThoDucBa.jpg" alt="image description" />
                            </a>
                            <figcaption className="absolute px-4 font-bold text-4xl text-white top-6">
                                <p>Thành phố Hồ Chí Minh</p>
                            </figcaption>
                        </div>
                        <div className="mb-5 h-[300px] relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                            <a href="/VungTau">
                                <img className="rounded-lg h-full w-full" src="images/Cities/VungTau.jpg" alt="image description" />
                            </a>
                            <figcaption className="absolute px-4 font-bold text-4xl text-white top-6">
                                <p>Vũng Tàu</p>
                            </figcaption>
                        </div>
                        <div className="mb-5 h-[300px] relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                            <a href="/NhaTrang">
                                <img className="rounded-lg h-full w-full" src="images/Cities/NhaTrang.jpg" alt="image description" />
                            </a>
                            <figcaption className="absolute px-4 font-bold text-4xl text-white top-6">
                                <p>Nha Trang</p>
                            </figcaption>
                        </div>
                        <div className="mb-5 h-[300px] relative transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                            <a href="/Hue">
                                <img className="rounded-lg h-full w-full" src="images/Cities/Hue.jpg" alt="image description" />
                            </a>
                            <figcaption className="absolute px-4 font-bold text-4xl text-white top-6">
                                <p>Huế</p>
                            </figcaption>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}