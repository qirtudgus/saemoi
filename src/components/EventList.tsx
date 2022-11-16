import styled from 'styled-components';
import EventCard from '../components/EventCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css/bundle';
import TitleText from './TitleText';

const EventTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
  margin: 15px 0;
`;

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
