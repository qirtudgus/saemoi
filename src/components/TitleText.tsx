import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.5em;
  padding: 30px 0;
  font-weight: bold;
`;

const TitleText = ({ text }: { text: string }) => {
  return <Title>{text}</Title>;
};
export default TitleText;
