import React from 'react';

const SectionCharacteristics = () => {
  return (
     <section className="block-indent" id="section-characteristics">
          <div className="container">
            <div className="section__title">Характеристики</div>
            <div className="characteristics-box">
              <ul>
                <li>
                  <b>Назва:</b>
                  <span>Havryl</span>
                </li>
                <li>
                  <b>Тип шрифту:</b> Гуманістичний Гротеск</li>
                <li>
                  <b>Формати файлів:</b> ttf, otf, oet, woff, woff2</li>
                <li>
                  <b>Наявність стилів:</b> 14 (7 Roman, 7 Italic)</li>
                <li>
                  <b>Ієрархія:</b>
                  <span>
                    Thin, Extra-Light, Light, Regular, Medium, Semi-Bold, Bold
                  </span>
                </li>
                <li>
                  <b>Призначення:</b> універсальний</li>
                <li>
                  <b>Сумісність:</b> для екрану та друку</li>
                <li>
                  <b>Підтримка мов:</b> англійська, українська</li>
                <li>
                  <b>Автор:</b> Гаврилюк Віктор</li>
                <li>
                  <b>Рік випуску:</b> 2024</li>
              </ul>
            </div>
          </div>
        </section>
  );
};


export default SectionCharacteristics;
