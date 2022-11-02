import EventList from '../components/EventList';

const eventList = [
  { title: '첫번째 이벤트입니다.', date: '2022.02.10 - 2022.02.30' },
  { title: '두번째 이벤트입니다요.', date: '2022.02.10 - 2022.02.30' },
  { title: '세번째 세번째 세번째', date: '2022.02.10 - 2022.02.30' },
  { title: '네네네번째 네네번째 네번째', date: '2022.02.10 - 2022.02.30' },
  { title: '다섯번째', date: '2022.02.10 - 2022.02.30' },
  { title: '아아아', date: '2022.02.10 - 2022.02.30' },
];

const Clother = () => {
  return (
    <>
      <EventList
        title={'타이틀입니다'}
        eventList={eventList}
      ></EventList>{' '}
      {/* <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList>
      <EventList></EventList> */}
    </>
  );
};

export default Clother;
