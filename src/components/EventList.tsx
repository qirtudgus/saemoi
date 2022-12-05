import { Pagination } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import EventCard from '../components/EventCard';
import TitleText from './TitleText';

const EventList = (props: any) => {
  return (
    <>
      <TitleText text={props.title}></TitleText>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        // grabCursor={true}
        pagination={{
          type: 'fraction',
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
        breakpoints={{
          // when window width is >= 768px
          0: {
            slidesPerView: 1,
          },
          375: {
            // width: 768,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            // width: 768,
            slidesPerView: 2,
          },
          1024: {
            // width: 768,
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {props.eventList.map((i: any, index: number) => (
          <SwiperSlide key={index}>
            <EventCard
              title={i.title}
              date={i.date}
            ></EventCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default EventList;
