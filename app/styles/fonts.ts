import { Chivo_Mono, Rubik, Vollkorn } from "next/font/google";

// define your variable fonts
const rubik = Rubik({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const vollkorn = Vollkorn({
  weight: "400",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
});

// const clockFont = Fira_Mono({
// 	weight: '500',
// 	subsets: ['latin'],
// })

const clockFont = Chivo_Mono({
  weight: "600",
  subsets: ["latin"],
});

// const volkhov400 = Volkhov({
// 	weight: "400",
// 	subsets: ["latin"],
// })

// const zillaSlab400 = Zilla_Slab({weight: '400'})
// define 2 weights of a non-variable font
// const sourceCodePro400 = Source_Sans_Pro({ weight: '400' })
// const sourceCodePro700 = Source_Sans_Pro({ weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder

export { clockFont, rubik, vollkorn };
