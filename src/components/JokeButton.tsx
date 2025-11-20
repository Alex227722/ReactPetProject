import React, { useState } from 'react';

const JokeButton: React.FC = () => {
  const [joke, setJoke] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функція для перекладу через DeepL API
  const translateJoke = async (text: string) => {
    const apiKey = '7e91acdd-7b78-40c1-b4fd-b91ffd098a6a:fx'; // Ваш DeepL API ключ
    try {
      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          auth_key: apiKey,
          text: text,
          target_lang: 'UK', // Українська мова
        }),
      });
      const data = await response.json();
      if (data.translations && data.translations[0]) {
        return data.translations[0].text;
      }
      return text; // Повертаємо оригінал, якщо переклад не вдався
    } catch (error) {
      console.error('Помилка перекладу:', error);
      return text; // Повертаємо оригінал у разі помилки
    }
  };

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
      const data = await response.json();
      const translatedJoke = await translateJoke(data.joke); // Перекладаємо жарт
      setJoke(translatedJoke);
      setIsModalOpen(true);
    } catch (error) {
      setJoke('Ой, жарт десь загубився!');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJoke('');
  };

  return (
    <>
      <section className="joke">
        <div className="container">
          <button onClick={fetchJoke} className="joke-button">
            Жарт
          </button>

          {/* {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <p>{joke}</p>
                <button onClick={closeModal} className="modal-close">✖</button>
              </div>
            </div>
          )} */}

          {isModalOpen ? (
            <div className="modal">
              <div className="modal-content">
                <p>{joke}</p>
                <button onClick={closeModal} className="modal-close">✖</button>
              </div>
            </div>
          ) : (
            <p className="joke-text">Натисни "Жарт"!</p>
          )}

        </div>
      </section>
    </>
  );
};

export default JokeButton;