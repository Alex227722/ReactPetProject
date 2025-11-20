export type FontStyle = {
  id: string;
  name: string;
  variant: string;
  previewImg: string;
  fullImg: string;
};

export const fontStyles: FontStyle[] = [
  { id: 'thin-roman', name: 'Thin', variant: 'Roman', previewImg: 'Thin.png', fullImg: 'Thin-01.png' },
  { id: 'thin-italic', name: 'Thin', variant: 'Italic', previewImg: 'Thin-Italic.png', fullImg: 'Thin-Italic-01.png' },
  { id: 'extra-light-roman', name: 'Extra Light', variant: 'Roman', previewImg: 'Extra-Light.png', fullImg: 'Extra-Light-01.png' },
  { id: 'extra-light-italic', name: 'Extra Light', variant: 'Italic', previewImg: 'Extra-Light-Italic.png', fullImg: 'Extra-Light-Italic-01.png' },
  { id: 'light-roman', name: 'Light', variant: 'Roman', previewImg: 'Light.png', fullImg: 'Light-01.png' },
  { id: 'light-italic', name: 'Light', variant: 'Italic', previewImg: 'Light-Italic.png', fullImg: 'Light-Italic-01.png' },
  { id: 'regular-roman', name: 'Regular', variant: 'Roman', previewImg: 'Regular.png', fullImg: 'Regular-01.png' },
  { id: 'regular-italic', name: 'Regular', variant: 'Italic', previewImg: 'Regular-Italic.png', fullImg: 'Regular-Italic-01.png' },
  { id: 'medium-roman', name: 'Medium', variant: 'Roman', previewImg: 'Medium.png', fullImg: 'Medium-01.png' },
  { id: 'medium-italic', name: 'Medium', variant: 'Italic', previewImg: 'Medium-Italic.png', fullImg: 'Medium-Italic-01.png' },
  { id: 'semi-bold-roman', name: 'Semi Bold', variant: 'Roman', previewImg: 'Semi-Bold.png', fullImg: 'Semi-Bold-01.png' },
  { id: 'semi-bold-italic', name: 'Semi Bold', variant: 'Italic', previewImg: 'Semi-Bold-Italic.png', fullImg: 'Semi-Bold-Italic-01.png' },
  { id: 'bold-roman', name: 'Bold', variant: 'Roman', previewImg: 'Bold.png', fullImg: 'Bold-01.png' },
  { id: 'bold-italic', name: 'Bold', variant: 'Italic', previewImg: 'Bold-Italic.png', fullImg: 'Bold-Italic-01.png' },
];