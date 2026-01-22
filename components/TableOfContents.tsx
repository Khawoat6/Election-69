
import React, { useState, useEffect } from 'react';

interface TocItem {
  [year: string]: {
    [month: string]: number;
  };
}

interface EventMetadata {
  [eventId: number]: {
    year: string;
    month: string;
  };
}

interface TableOfContentsProps {
  tocItems: TocItem;
  eventMetadata: EventMetadata;
  activeEventId: number | null;
  pastEventIds: Set<number>;
}

const thaiMonthToEngAbbr: { [key: string]: string } = {
  มกราคม: 'JAN',
  กุมภาพันธ์: 'FEB',
  มีนาคม: 'MAR',
  เมษายน: 'APR',
  พฤษภาคม: 'MAY',
  มิถุนายน: 'JUN',
  กรกฎาคม: 'JUL',
  สิงหาคม: 'AUG',
  กันยายน: 'SEP',
  ตุลาคม: 'OCT',
  พฤศจิกายน: 'NOV',
  ธันวาคม: 'DEC',
};

const thaiMonthOrder = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

const TableOfContents: React.FC<TableOfContentsProps> = ({
  tocItems,
  eventMetadata,
  activeEventId,
  pastEventIds,
}) => {
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const activeMeta = activeEventId ? eventMetadata[activeEventId] : null;

  useEffect(() => {
    if (activeMeta && !expandedYears.has(activeMeta.year)) {
      setExpandedYears(prev => new Set(prev).add(activeMeta.year));
    }
  }, [activeMeta]);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  return (
    <nav className="hidden lg:block w-64 h-screen fixed top-0 left-0 pt-48 px-8 overflow-y-auto">
      <div className="space-y-6">
        {Object.keys(tocItems)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map((year) => {
            const isYearActive = activeMeta?.year === year;
            const monthEventIds = Object.values(tocItems[year]);
            const isYearCompletelyPast = monthEventIds.every(id => pastEventIds.has(id));
            const isYearStruck = isYearCompletelyPast && !isYearActive;

            return (
              <div key={year}>
                <h3 
                  className={`font-caveat text-3xl font-bold mb-2 pl-4 cursor-pointer transition-colors ${isYearStruck ? 'line-through text-zinc-400' : 'text-zinc-800 hover:text-red-600'}`}
                  onClick={() => toggleYear(year)}
                >
                  {year}
                </h3>
                {expandedYears.has(year) && (
                  <ul className="space-y-1 border-l-2 border-zinc-200 animate-fade-in">
                    {Object.keys(tocItems[year])
                      .sort((a, b) => thaiMonthOrder.indexOf(a) - thaiMonthOrder.indexOf(b))
                      .map((month) => {
                        const eventId = tocItems[year][month];
                        const isActive = activeMeta?.year === year && activeMeta?.month === month;
                        const isPast = pastEventIds.has(eventId) && !isActive;
                        
                        let monthClasses = 'relative flex items-center pl-4 py-1 transition-colors duration-200 font-caveat text-2xl ';
                        if (isActive) {
                          monthClasses += 'text-red-600 font-bold';
                        } else if (isPast) {
                          monthClasses += 'text-zinc-400 line-through';
                        } else {
                          monthClasses += 'text-zinc-500 hover:text-red-600';
                        }

                        return (
                          <li key={month} className="transform transition-transform hover:translate-x-1">
                            <a
                              href={`#event-${eventId}`}
                              className={monthClasses}
                            >
                              {isActive && (
                                <span className="absolute left-[-2px] h-full w-0.5 bg-red-600 rounded-full"></span>
                              )}
                              {thaiMonthToEngAbbr[month] || month}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            )
          })}
      </div>
       <style>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default TableOfContents;
