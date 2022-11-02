import styled from 'styled-components';
import EventCard from '../components/EventCard';

const EventTitle = styled.h1`
  font-size: 2em;
  font-weight: bold;
  margin: 15px 0;
`;

const EventForm = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const EventList = () => {
  return (
    <>
      {' '}
      <EventTitle>의류입니</EventTitle>
      <EventForm>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
        <EventCard></EventCard>
      </EventForm>{' '}
    </>
  );
};

export default EventList;
