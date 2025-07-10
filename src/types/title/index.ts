export type Phrase = {
  ko: string;
  en: string;
};

export const PHRASES: Phrase[] = [
  {
    ko: "새로운 생각이 조용히 시작되는, 고요한 출발.",
    en: "A QUIET START, WHERE NEW THOUGHTS BEGIN.",
  },
  {
    ko: "차가운 날들에 따뜻함과 부드러운 사랑을 채워요.",
    en: "LET WARMTH AND GENTLE LOVE FILL THE COLD.",
  },
  {
    ko: "새로운 빛이 세상을 천천히 깨웁니다.",
    en: "NEW LIGHT ARRIVES, SLOWLY WAKING THE WORLD.",
  },
  {
    ko: "변화는 아침비처럼 부드럽게 찾아옵니다.",
    en: "CHANGE COMES SOFTLY, LIKE MORNING RAIN.",
  },
  {
    ko: "모든 것은 제 시간에 자라납니다.",
    en: "LET EVERYTHING GROW IN ITS OWN TIME.",
  },
  {
    ko: "햇살이 길게 뻗어요, 잠시 멈춰 숨을 쉬어요.",
    en: "SUNLIGHT STRETCHES LONG-PAUSE AND BREATHE.",
  },
  {
    ko: "탁 트인 하늘에서 자유를 느껴보세요.",
    en: "FEEL THE FREEDOM IN WIDE OPEN SKIES.",
  },
  {
    ko: "속도를 늦추고, 고요함이 당신을 찾게 하세요.",
    en: "SLOW DOWN AND LET STILLNESS FIND YOU.",
  },
  {
    ko: "계절이 바뀌기 전, 소중한 것을 담아두세요.",
    en: "COLLECT WHAT MATTERS BEFORE IT TURNS.",
  },
  {
    ko: "선선한 바람이 변화를 속삭입니다.",
    en: "CRISP AIR WHISPERS THAT IT'S TIME TO SHIFT.",
  },
  {
    ko: "조용한 위로를 주는 것을 가까이 하세요.",
    en: "HOLD CLOSE WHAT BRINGS QUIET COMFORT.",
  },
  {
    ko: "돌아보고, 놓아주고, 쉼을 위한 공간을 만들어요.",
    en: "REFLECT, RELEASE, AND MAKE ROOM FOR REST.",
  },
];

export function getRandomPhrase(): Phrase {
  const randomIndex = Math.floor(Math.random() * PHRASES.length);
  return PHRASES[randomIndex];
}