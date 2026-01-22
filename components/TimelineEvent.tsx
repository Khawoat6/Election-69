
import React from 'react';
import { TimelineEventData } from '../types';
import { LinkIcon } from './icons';

interface TimelineEventProps {
  event: TimelineEventData;
  isOdd: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isOdd }) => {
  const rotationClass = isOdd ? 'rotate-1' : '-rotate-1';
  
  return (
    <div className={`relative animate-fade-in-up transform transition-transform duration-500 hover:scale-[1.03] ${rotationClass}`}>
      <div className="absolute left-1/2 -translate-x-1/2 -top-6">
        <span className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
        </span>
      </div>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-zinc-200/80 p-6">
        <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-red-600">{event.date}</p>
            <span className="text-xs font-medium bg-zinc-200 text-zinc-700 px-2 py-1 rounded-full">{event.category}</span>
        </div>
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-56 object-cover rounded-lg mb-4 shadow-md border border-zinc-100"
        />
        <h3 className="text-xl font-bold text-zinc-900 mb-2">{event.title}</h3>
        <p className="text-zinc-700 leading-relaxed">{event.description}</p>
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          อ่านเพิ่มเติมจาก: {event.sourceName}
        </a>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px) ${rotationClass};
          }
          100% {
            opacity: 1;
            transform: translateY(0) ${rotationClass};
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TimelineEvent;
