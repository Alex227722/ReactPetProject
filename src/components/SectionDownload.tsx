import React, { useEffect } from 'react';
import { useGlobalContext } from '../GlobalContext';
import JSZip from 'jszip';

const SectionDownload = () => {
  const { addToCart } = useGlobalContext();

  const handleDownload = async () => {
    const isTelegram = /telegram/i.test(navigator.userAgent);
    console.log('isTelegram: ', isTelegram);

    const directLink = `${import.meta.env.BASE_URL}downloads/Havryl_Style.zip`;

    if (isTelegram) {
      alert('Перейдіть за цим посиланням, щоб завантажити архів: ' + directLink);
      setTimeout(() => {
        window.location.href = directLink;
      }, 2000);
      return;
    }

    const zip = new JSZip();

    const imagePath = `${import.meta.env.BASE_URL}assets/images/havril/HAVRYL.png`;
    const musicPath = `${import.meta.env.BASE_URL}assets/images/havril/HAVRYL.mp3`;

    async function fetchFile(path: string): Promise<Blob> {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Не вдалося завантажити файл: ${path}`);
      }
      return response.blob();
    }

    try {
      const [imageBlob, musicBlob] = await Promise.all([
        fetchFile(imagePath),
        fetchFile(musicPath),
      ]);

      zip.file('HAVRYL.png', imageBlob);
      zip.file('HAVRYL.mp3', musicBlob);

      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'Havryl_Style.zip';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Помилка завантаження файлів:', error);
    }
  };

  return (
    <section className="block-indent" id="section-download">
      <div className="container">
        <div className="section__title">Завантажити</div>
        <div className="characteristics-box">
          <div className="filter-box-inner">
            {[
              'Thin 100',
              'Thin 100 Italic',
              'Extra Light 200',
              'Extra Light 200 Italic',
              'Light 300',
              'Light 300 Italic',
              'Regular 400',
              'Regular 400 Italic',
              'Medium 500',
              'Medium 500 Italic',
              'Semi Bold 600',
              'Semi Bold 600 Italic',
              'Bold 700',
              'Bold 700 Italic',
            ].map((label, index) => (
              <span key={index}>
                <label className="form-label-check">
                  <input className="form-check-input" type="checkbox" value={label} />
                  {label}
                </label>
              </span>
            ))}
          </div>

          <div className="btn-download-box">
            <button className="btn-download" onClick={handleDownload}>
              Завантажити
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionDownload;