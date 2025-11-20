import { useState } from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

const fontWeightOptions: Option[] = [
  { value: '100', label: 'Havryl Thin' },
  { value: '200', label: 'Havryl Extra Light' },
  { value: '300', label: 'Havryl Light' },
  { value: '400', label: 'Havryl Regular' },
  { value: '500', label: 'Havryl Medium' },
  { value: '600', label: 'Havryl Semi Bold' },
  { value: '700', label: 'Havryl Bold' },
];

const fontStyleOptions: Option[] = [
  { value: 'normal', label: 'Roman' },
  { value: 'italic', label: 'Italic' },
];

const SectionWrite = () => {
  const [fontWeight, setFontWeight] = useState<Option | null>(fontWeightOptions[3]); // 400 Regular
  const [fontStyle, setFontStyle] = useState<Option | null>(fontStyleOptions[0]); // normal
  const [fontSize, setFontSize] = useState('56');
  const [color, setColor] = useState('#FF4A1C');

  const handleFontWeightChange = (option: Option | null) => {
    setFontWeight(option);
  };

  const handleFontStyleChange = (option: Option | null) => {
    setFontStyle(option);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#D4E4ED',
      height: 26,
      borderRadius: 5,
      border: 'none',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    }),
    
    singleValue: (provided: any) => ({
      ...provided,
      color: '#000',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#D4E4ED'
        : state.isFocused
        ? '#FF4A1C'
        : '#eeeeee',
      color: state.isSelected ? '#000' : '#000',
      padding: '8px',
      cursor: 'pointer',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#eeeeee',
      zIndex: 1,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#000', // Ставит колір іконки вниз
    }),
  };

  return (
    <section className="block-indent" id="section-write">
      <div className="container">
        <div className="section__title">Візуалізація</div>
        <div className="editor-container">
          <div className="controls">
            <label htmlFor="font-weight">Жирність:</label>
            <Select
              inputId="font-weight"
              options={fontWeightOptions}
              value={fontWeight}
              onChange={handleFontWeightChange}
              styles={customStyles} // Застосовуємо кастомні стилі
              classNamePrefix="react-select"
              placeholder="Оберіть жирність"
            />

            <label htmlFor="font-style">Стиль:</label>
            <Select
              inputId="font-style"
              options={fontStyleOptions}
              value={fontStyle}
              onChange={handleFontStyleChange}
              styles={customStyles} // Застосовуємо кастомні стилі
              classNamePrefix="react-select"
              placeholder="Оберіть стиль"
            />

            <label htmlFor="font-size-slider">Розмір:</label>
            <input
              id="font-size-slider"
              type="range"
              min="12"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />

            <label htmlFor="color-picker">Колір:</label>
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <textarea
            id="editor"
            placeholder="Напишіть тут..."
            style={{
              marginTop: '1rem',
              fontWeight: fontWeight?.value,
              fontStyle: fontStyle?.value,
              fontSize: `${fontSize}px`,
              color,
              width: '100%',
              minHeight: '150px',
            }}
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default SectionWrite;
