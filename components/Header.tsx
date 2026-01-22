
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50 border-b-4 border-red-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-800 tracking-tight font-chonburi">
          จับตาเลือกตั้ง '69
        </h1>
        <p className="text-lg text-red-700 font-semibold mt-1">
          ไทม์ไลน์ประเด็นทุจริตและข้อกังขา
        </p>
        <div className="mt-2 text-zinc-600">
          <p className="text-sm">
            รวบรวมเหตุการณ์สำคัญที่ส่งผลต่อความโปร่งใสของการเลือกตั้ง
          </p>
          <p className="font-bold text-base bg-zinc-800 text-white rounded-full px-4 py-1 inline-block mt-2">
            วันเลือกตั้ง: 8 กุมภาพันธ์ 2569
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
