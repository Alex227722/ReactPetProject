import React from 'react';
import SliderTemplate from './SliderTemplate';
import CardsTemplate from './CardsTemplate';

type SectionCardsProps = {
  isSlider?: boolean;
  title?: string;
  sectionId?: string;
};

const SectionCards: React.FC<SectionCardsProps> = ({ isSlider = false, title, sectionId }) => {
  return isSlider ? (
    <SliderTemplate title={title} sectionId={sectionId} />
  ) : (
    <CardsTemplate title={title} sectionId={sectionId} />
  );
};

export default SectionCards;