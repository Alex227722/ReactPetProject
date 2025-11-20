import React, { useState } from 'react';

const JokeButton: React.FC = () => {
  const [joke, setJoke] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Переклад через серверний проксі (Vercel function)
  const translateJoke = async (text: string) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target_lang: 'UK' }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error('Server translation error', err);
        return text;
      }
      const data = await response.json();
      if (data.translations && data.translations[0]) {
        return data.translations[0].text;
      }
      return text;
    } catch (error) {
      console.error('Помилка перекладу:', error);
      return text;
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