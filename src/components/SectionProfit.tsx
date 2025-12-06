import React from 'react';

interface ProfitItem {
  title: string;
  description: string;
  images: string[];
}

interface SectionProfitProps {
  items: ProfitItem[];
}

const profitItems: ProfitItem[] = [
  {
    title: 'Наявність української кирилиці',
    description:
      'Шрифт підтримує українську мову, забезпечуючи повну адаптацію для локальних проєктів.',
    images: ['assets/images/about/img-3.png', 'assets/images/about/img-4.png'],  // Без / на початку — Vite знайде в public
  },
  {
    title: 'Гарна читабельність',
    description:
      'Збалансовані пропорції та продумана структура забезпечують легке сприйняття тексту на будь-якому носії.',
    images: ['assets/images/about/img-5.png', 'assets/images/about/img-6.png'],
  },
  {
    title: 'Різноманітність начертань',
    description:
      '7 варіантів (від Thin до Bold) дозволяють використовувати шрифт у різних стилях і форматах.',
    images: ['assets/images/about/img-7.png', 'assets/images/about/img-8.png'],
  },
  {
    title: 'Продуманий дизайн',
    description:
      'Кожен елемент літер ретельно опрацьований для гармонійного вигляду та відповідності сучасним тенденціям.',
    images: ['assets/images/about/img-9.png', 'assets/images/about/img-10.png'],
  },
  {
    title: 'Підтримка великої кількості символів',
    description:
      'Шрифт включає широкий набір символів, таких як: пунктуація, математичні знаки та спеціальні символи, що розширює можливості його використання.',
    images: ['assets/images/about/img-11.png', 'assets/images/about/img-12.png'],
  },
  {
    title: 'Професійний підхід до розробки',
    description:
      'Створений за допомогою Adobe Illustrator і FontForge, шрифт відповідає сучасним стандартам якості.',
    images: ['assets/images/about/img-13.png', 'assets/images/about/img-14.png'],
  },
  {
    title: 'Унікальні форми літер',
    description:
      'Цей шрифт вирізняється оригінальними, впізнаваними формами, які поєднують класичні елементи з сучасним дизайном.',
    images: ['assets/images/about/img-15.png', 'assets/images/about/img-16.png'],
  },
];

const SectionProfit = ({ items }: SectionProfitProps) => {
  return (
    <section className="description block-indent" id="section-profit">
      <div className="container">
        <h2 className="section__title">Переваги</h2>

        {items.map((item, index) => (
          <div key={index} className="category_description-box">
            <div className="category_description-img">
              <div className="category_description-img-box">
                {item.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={`${import.meta.env.BASE_URL}${img}`} 
                    alt={`img-${i + 1}`}
                    onError={(e) => (e.currentTarget.style.display = 'none')}  // Ховаємо, якщо 404
                  />
                ))}
              </div>
            </div>
            <div className="category_description bg-main">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

const ProfitSectionWrapper = () => {
  return <SectionProfit items={profitItems} />;
};

export default ProfitSectionWrapper;