import React from 'react';
import { assetPath } from '../utils/assetPath';

interface SectionDescriptionProps {
  title: string;
  paragraphText: string[];
  images: string[];
}

function SectionDescription({ title, paragraphText, images }: SectionDescriptionProps) {
  return (
    <section className="block-indent" id="section-description">
      <div className="container">
        <div className="section__title">{title}</div>
        <div className="category_description-box category_description-box-text">
          <div className="category_description-img">
            <div className="category_description-img-box">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>
          <div className="category_description bg-main customizable-block">
            {paragraphText.map((text, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: text }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// export default SectionDescription;

const title = 'Опис';

const paragraphText = [
  `Шрифтова родина <span class="color-text">Havryl</span>, створена українським графічним дизайнером Віктором Гаврилюком, гармонійно поєднує класичні форми, сучасну естетику та вишуканість. Назва шрифту походить з англійської транслітерації прізвища автора, підкреслюючи його українське походження, що знайшло відображення у ретельно розробленій кириличній частині, включаючи українські літери.`,
  `Шрифтова родина пропонує 14 стилів, об'єднаних у 7 начертань із чіткою ієрархією. Така різноманітність робить його ідеальним вибором для найрізноманітніших проєктів — від текстових блоків до акцентних заголовків. Завдяки повному набору символів ви зможете уникнути використання додаткових шрифтів, адже Havryl охоплює всі необхідні знаки.`,
  `Додатковою перевагою є наявність курсиву, який допомагає акцентувати увагу на окремих елементах тексту, додаючи вашому дизайну більше виразності та динаміки.`,
  `<span class="color-text">Havryl</span> — це баланс класичності та сучасності, що дарує вашим проєктам індивідуальність і довершеність.`,
];

const images = [
  assetPath('assets/images/about/img-1.png'),
  assetPath('assets/images/about/img-2.png'),
];

function Text() {
  return <SectionDescription title={title} paragraphText={paragraphText} images={images} />;
}

export default Text;

