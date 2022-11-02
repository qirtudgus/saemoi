import styled from 'styled-components';

const EventCardWrap = styled.div`
  position: relative;
  width: 300px;
  height: 210px;
  border-radius: 20px;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

const EventCardImgWrap = styled.div`
  width: 100%;
  height: 130px;
  background: #b4b4b4;
`;

const EventCardTextWrap = styled.div`
  width: 95%;
  height: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const EventCardTitle = styled.h1`
  position: relative;
  font-weight: bold;
  font-size: 1.2em;
  padding: 5px 0;
`;
const EventCardDate = styled.h1`
  position: relative;
`;
const EventCardDday = styled.p`
  position: relative;
  padding: 5px 0;
`;

const EventCard = (props: any) => {
  return (
    <>
      <EventCardWrap>
        <EventCardImgWrap></EventCardImgWrap>
        <EventCardTextWrap>
          <EventCardTitle>{props.title}</EventCardTitle>
          <EventCardDate>{props.date}</EventCardDate>
          <EventCardDday>{1}일 남음</EventCardDday>
        </EventCardTextWrap>
      </EventCardWrap>
    </>
  );
};

export default EventCard;
