/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        bebas: ['"Bebas Neue"', 'cursive'],
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
        point_text4: 400,
        point_text3: 400,
        point_text2: 400,
        point_text1: 400,
        Caption: 400,
        Body3: 500,
        Body2: 500,
        Body1: 500,
        Subtitle: 600,
        Headline2: 600,
        Headline1: 700,
        Big_Headline: 700,
        Display: 700,
        Big_Display: 700,
      },
      // 써틀아바타 크기 정의
      width: {
        s_ca: "32px", // small CircleAvatar
        m_ca: "36px", // medium CircleAvatar
        l_ca: "52px", // large CircleAvatar
        xl_ca: "78px", // x-large CircleAvatar
      },
      height: {
        s_ca: "32px",
        m_ca: "36px",
        l_ca: "52px",
        xl_ca: "78px",
      },
    },
  },
  plugins: [],
};
