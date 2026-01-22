
import React from 'react';

const Intro: React.FC = () => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border-2 border-zinc-200/50 mb-16 max-w-4xl mx-auto transform -rotate-1 relative">
      <div className="transform rotate-1">
        <p className="text-sm uppercase tracking-widest text-zinc-500 text-center">
          จากแฟ้มข่าวสู่ไทม์ไลน์
        </p>
        <h2 className="font-chonburi text-5xl md:text-6xl text-center text-red-700 my-4">
          2026
        </h2>
        <p className="text-2xl md:text-3xl font-light text-center text-zinc-700 mb-8 font-caveat tracking-wider">
          บันทึกเหตุการณ์สู่การเลือกตั้งที่โปร่งใส
        </p>
        <div className="max-w-xl mx-auto text-zinc-600 space-y-4 text-base md:text-lg leading-relaxed text-justify">
          <p>
            การเลือกตั้งครั้งสำคัญของประเทศไทยในวันที่ 8 กุมภาพันธ์ 2569 กำลังใกล้เข้ามาทุกขณะ
            หลายสิ่งหลายอย่างเกิดขึ้นระหว่างเส้นทางนี้ ทั้งประเด็นทางการเมืองที่ร้อนแรง สภาพสังคมที่เปลี่ยนแปลงไป
            และข้อกังขาต่อความโปร่งใสที่เกิดขึ้นในทุกที่
          </p>
          <p>
            สิ่งที่สังคมไทยเผชิญร่วมกันนั้นขึ้นอยู่กับว่าเราเป็นใครและอยู่ที่ไหน
            ในปีที่ความยุติธรรมเป็นสิ่งที่ทุกคนเรียกร้อง เราต่างมีประสบการณ์ร่วมต่อความหวังและความสิ้นหวังที่สลับกันไปมาอย่างรวดเร็ว
            แล้วเราจะบันทึกประวัติศาสตร์ของการเลือกตั้งครั้งนี้ไว้อย่างไร?
          </p>
          <p>
            ทีมงาน "จับตาเลือกตั้ง '69" ได้รวบรวมข้อมูลจากแหล่งข่าวต่างๆ ทั้งภาพถ่าย บทความ
            และหลักฐานอื่นๆ เพื่อบอกเล่าเรื่องราวที่เราทำได้: เรื่องราวที่ซับซ้อนและเต็มไปด้วยความแตกต่าง
            เป็นเศษเสี้ยวของความหวัง การสูญเสีย ความเฉลียวฉลาด และการเคลื่อนไหวภาคประชาชน
            ที่เราได้บันทึกไว้ตลอดมา
          </p>
        </div>
        <div className="mt-8 text-right">
          <p className="font-caveat text-xl text-red-500 -rotate-3">
             เผยแพร่: {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            จากทีมงานจับตาเลือกตั้ง '69
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
