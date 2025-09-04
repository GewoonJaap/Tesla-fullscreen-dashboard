export interface Site {
  name: string;
  url: string;
  // For popular sites with predefined Tailwind classes
  color?: string;
  // For custom sites with generated inline styles
  gradient?: string;
  // For custom sites with user-selected solid colors
  customColor?: string;
  textColor: string;
}