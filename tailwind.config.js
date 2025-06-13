/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        point_text4: "24px",
        point_text3: "100px",
        point_text2: "200px",
        point_text1: "270px",
        Caption: "12px",
        Body3: "12px",
        Body2: "14px",
        Body1: "16px",
        Subtitle: "16px",
        Headline2: "20px",
        Headline1: "24px",
        Big_Headline: "82px",
        Display: "32px",
        Big_Display: "140px",
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        sbold: 600,
        bold: 700,
        bolder: 900,
      },
    },
  },
  plugins: [],
};
