
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Header from './components/Header';
import TimelineEvent from './components/TimelineEvent';
import TableOfContents from './components/TableOfContents';
import Intro from './components/Intro';
import FilterControls from './components/FilterControls';
import { eventsData } from './data/events';
import { TimelineEventData } from './types';

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

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ทั้งหมด');
  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [pastEventIds, setPastEventIds] = useState<Set<number>>(new Set());

  const eventRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const categories = useMemo(() => {
    const allCategories = eventsData.map(event => event.category);
    const uniqueCategories = Array.from(new Set(allCategories)).sort((a, b) => a.localeCompare(b, 'th'));
    return ['ทั้งหมด', ...uniqueCategories];
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'ทั้งหมด') {
      return eventsData;
    }
    return eventsData.filter(event => event.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (filteredEvents.length > 0 && !activeEventId) {
      setActiveEventId(filteredEvents[0].id);
    }
  }, [filteredEvents, activeEventId]);

  const { tocItems, eventMetadata } = useMemo(() => {
    const tocItems: TocItem = {};
    const eventMetadata: EventMetadata = {};

    filteredEvents.forEach((event) => {
      const parts = event.date.split(' ');
      if (parts.length < 3) return;
      const [_, month, year] = parts;

      if (!tocItems[year]) {
        tocItems[year] = {};
      }
      if (!tocItems[year][month]) {
        tocItems[year][month] = event.id;
      }
      eventMetadata[event.id] = { year, month };
    });

    return { tocItems, eventMetadata };
  }, [filteredEvents]);

  useEffect(() => {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const eventId = parseInt(entry.target.id.split('-')[1]);
            setActiveEventId(eventId);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );
    
    const pastObserver = new IntersectionObserver(
      (entries) => {
        setPastEventIds(prev => {
          const newPastIds = new Set(prev);
          entries.forEach(entry => {
            const eventId = parseInt(entry.target.id.split('-')[1]);
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              newPastIds.add(eventId);
            } else {
              newPastIds.delete(eventId);
            }
          });
          return newPastIds;
        });
      },
      {
        rootMargin: '0px 0px -100% 0px',
        threshold: [0, 1],
      }
    );

    const currentRefs = Object.values(eventRefs.current);

    currentRefs.forEach((ref) => {
      if (ref instanceof Element) {
        activeObserver.observe(ref);
        pastObserver.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref instanceof Element) {
          activeObserver.unobserve(ref);
          pastObserver.unobserve(ref);
        }
      });
    };
  }, [filteredEvents]);

  return (
    <div className="bg-[#f8f8f8] min-h-screen text-zinc-800">
      <Header />
      <TableOfContents
        tocItems={tocItems}
        eventMetadata={eventMetadata}
        activeEventId={activeEventId}
        pastEventIds={pastEventIds}
      />
      <div className="lg:pl-64">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-48">
          <Intro />
          <FilterControls
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
          <div className="relative max-w-2xl mx-auto">
            <div
              className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-200 via-red-400 to-zinc-400"
              aria-hidden="true"
            ></div>
            <div className="relative space-y-12">
              {filteredEvents.map((event: TimelineEventData, index: number) => (
                <div
                  key={event.id}
                  id={`event-${event.id}`}
                  ref={(el) => (eventRefs.current[event.id] = el)}
                >
                  <TimelineEvent event={event} isOdd={index % 2 !== 0} />
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="text-center py-8 text-zinc-500 text-sm">
          <p>สร้างขึ้นเพื่อวัตถุประสงค์ในการสาธิตและสร้างความตระหนักรู้</p>
          <p>&copy; 2024 Election Watch '69. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
