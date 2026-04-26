export interface GlossaryItem {
  id: string;
  /** Path to the realistic illustration in /public/glossary/ */
  image: string;
  /** Emoji fallback if the image fails to load */
  emoji: string;
  es: { name: string; description: string };
  en: { name: string; description: string };
}

export const glossaryItems: GlossaryItem[] = [
  {
    id: "carnaval",
    image: "/glossary/carnaval.jpg",
    emoji: "\uD83C\uDFAD",
    es: {
      name: "Carnaval de Barranquilla",
      description:
        "La fiesta m\u00E1s grande de Colombia y Patrimonio Inmaterial de la Humanidad por la UNESCO. Cuatro d\u00EDas de m\u00FAsica, baile, desfiles y tradici\u00F3n que llenan las calles de color y alegr\u00EDa.",
    },
    en: {
      name: "Carnival of Barranquilla",
      description:
        "Colombia\u2019s biggest celebration and a UNESCO Intangible Cultural Heritage. Four days of music, dance, parades, and tradition that fill the streets with color and joy.",
    },
  },
  {
    id: "monocuco",
    image: "/glossary/monocuco.jpg",
    emoji: "\uD83C\uDFAA",
    es: {
      name: "Monocuco",
      description:
        "Personaje ic\u00F3nico del Carnaval de Barranquilla. Viste un traje colorido de rayas con capucha que cubre todo el cuerpo y una m\u00E1scara, permiti\u00E9ndole bailar y bromear de forma an\u00F3nima.",
    },
    en: {
      name: "Monocuco",
      description:
        "Iconic character of the Barranquilla Carnival. Wears a colorful striped costume with a hood covering the entire body and a mask, allowing anonymous dancing and joking.",
    },
  },
  {
    id: "sombrero-vueltiao",
    image: "/glossary/sombrero-vueltiao.jpg",
    emoji: "\uD83E\uDDE2",
    es: {
      name: "Sombrero Vueltiao",
      description:
        "Sombrero tejido a mano con fibras de ca\u00F1a flecha, s\u00EDmbolo nacional de Colombia. Originario de los pueblos Zen\u00FA del Caribe colombiano, es una obra maestra de artesan\u00EDa.",
    },
    en: {
      name: "Sombrero Vueltiao",
      description:
        "Handwoven hat made from cane arrow fibers, a national symbol of Colombia. Originating from the Zen\u00FA people of the Colombian Caribbean, it\u2019s a masterpiece of craftsmanship.",
    },
  },
  {
    id: "vallenato",
    image: "/glossary/vallenato.jpg",
    emoji: "\uD83C\uDFB5",
    es: {
      name: "Vallenato",
      description:
        "G\u00E9nero musical tradicional colombiano nacido en la costa caribe\u00F1a. Se toca con acorde\u00F3n, caja vallenata y guacharaca. Declarado Patrimonio Inmaterial de la Humanidad por la UNESCO.",
    },
    en: {
      name: "Vallenato",
      description:
        "Traditional Colombian music genre born on the Caribbean coast. Played with accordion, caja vallenata drum, and guacharaca. Declared UNESCO Intangible Cultural Heritage.",
    },
  },
  {
    id: "acordeon",
    image: "/glossary/acordeon.jpg",
    emoji: "\uD83E\uDE97",
    es: {
      name: "Acorde\u00F3n",
      description:
        "Instrumento central del vallenato colombiano. En manos de los juglares de la costa caribe\u00F1a, cuenta historias de amor, viajes y tradiciones a trav\u00E9s de su melod\u00EDa inconfundible.",
    },
    en: {
      name: "Accordion",
      description:
        "Central instrument of Colombian vallenato. In the hands of Caribbean coast troubadours, it tells stories of love, travel, and tradition through its unmistakable melody.",
    },
  },
  {
    id: "tambora",
    image: "/glossary/tambora.jpg",
    emoji: "\uD83E\uDD41",
    es: {
      name: "Tambora",
      description:
        "Tambor tradicional colombiano esencial en la cumbia y otros ritmos del Caribe. Su sonido profundo marca el pulso de las celebraciones y el carnaval.",
    },
    en: {
      name: "Tambora",
      description:
        "Traditional Colombian drum essential to cumbia and other Caribbean rhythms. Its deep sound sets the pulse of celebrations and carnival.",
    },
  },
  {
    id: "maracas",
    image: "/glossary/maracas.jpg",
    emoji: "\uD83C\uDFB6",
    es: {
      name: "Maracas",
      description:
        "Instrumento de percusi\u00F3n tradicional hecho con calabazas secas rellenas de semillas. Fundamentales en la m\u00FAsica colombiana, a\u00F1aden ritmo y alegr\u00EDa a cada celebraci\u00F3n.",
    },
    en: {
      name: "Maracas",
      description:
        "Traditional percussion instrument made from dried gourds filled with seeds. Essential in Colombian music, adding rhythm and joy to every celebration.",
    },
  },
  {
    id: "cumbia",
    image: "/glossary/cumbia.jpg",
    emoji: "\uD83D\uDC83",
    es: {
      name: "Cumbia",
      description:
        "G\u00E9nero musical y danza originaria de la costa caribe\u00F1a de Colombia. Fusi\u00F3n de ra\u00EDces africanas, ind\u00EDgenas y europeas, es el ritmo que une a todo un continente.",
    },
    en: {
      name: "Cumbia",
      description:
        "Music genre and dance originating from Colombia\u2019s Caribbean coast. A fusion of African, indigenous, and European roots, it\u2019s the rhythm that unites a continent.",
    },
  },
  {
    id: "cumbiambera",
    image: "/glossary/cumbiambera.jpg",
    emoji: "\uD83D\uDC57",
    es: {
      name: "Cumbiambera",
      description:
        "Bailarina tradicional de cumbia que viste una pollera colorida y blusa de encaje. Con velas encendidas en las manos, danza con gracia y alegr\u00EDa en el carnaval.",
    },
    en: {
      name: "Cumbiambera",
      description:
        "Traditional cumbia dancer who wears a colorful pollera skirt and lace blouse. With lit candles in hand, she dances with grace and joy during carnival.",
    },
  },
  {
    id: "pibe-valderrama",
    image: "/glossary/pibe-valderrama.jpg",
    emoji: "\u26BD",
    es: {
      name: "Carlos \u2018El Pibe\u2019 Valderrama",
      description:
        "Leyenda del f\u00FAtbol colombiano y barranquillero de coraz\u00F3n. Con su ic\u00F3nica melena rubia y la camiseta #10 del Junior, es s\u00EDmbolo del talento y la alegr\u00EDa del Caribe.",
    },
    en: {
      name: "Carlos \u2018El Pibe\u2019 Valderrama",
      description:
        "Colombian football legend and Barranquilla native at heart. With his iconic blonde mane and Junior #10 jersey, he symbolizes the talent and joy of the Caribbean.",
    },
  },
  {
    id: "junior",
    image: "/glossary/junior.jpg",
    emoji: "\uD83C\uDFDF\uFE0F",
    es: {
      name: "Junior de Barranquilla",
      description:
        "Club de f\u00FAtbol m\u00E1s querido de Barranquilla. Con sus colores rojo y blanco, el \u2018Tibur\u00F3n\u2019 es la pasi\u00F3n de toda una ciudad y s\u00EDmbolo de la identidad barranquillera.",
    },
    en: {
      name: "Junior de Barranquilla",
      description:
        "Barranquilla\u2019s most beloved football club. With its red and white colors, \u2018El Tibur\u00F3n\u2019 (The Shark) is the passion of an entire city and symbol of Barranquilla identity.",
    },
  },
  {
    id: "cerveza-aguila",
    image: "/glossary/cerveza-aguila.jpg",
    emoji: "\uD83C\uDF7A",
    es: {
      name: "Cerveza \u00C1guila",
      description:
        "La cerveza m\u00E1s ic\u00F3nica de Colombia, inseparable del f\u00FAtbol, el carnaval y las celebraciones. Donde hay fiesta colombiana, hay \u00C1guila.",
    },
    en: {
      name: "Cerveza \u00C1guila",
      description:
        "Colombia\u2019s most iconic beer, inseparable from football, carnival, and celebrations. Where there\u2019s a Colombian party, there\u2019s \u00C1guila.",
    },
  },
  {
    id: "colombiana",
    image: "/glossary/colombiana.jpg",
    emoji: "\uD83E\uDD64",
    es: {
      name: "Colombiana",
      description:
        "La gaseosa m\u00E1s colombiana de todas. Con su sabor \u00FAnico a champagne cola, es la bebida nacional no oficial que acompa\u00F1a almuerzos y celebraciones.",
    },
    en: {
      name: "Colombiana",
      description:
        "The most Colombian of all sodas. With its unique champagne cola flavor, it\u2019s the unofficial national drink that accompanies lunches and celebrations.",
    },
  },
  {
    id: "shakira",
    image: "/glossary/shakira.jpg",
    emoji: "\uD83C\uDF1F",
    es: {
      name: "Shakira",
      description:
        "La artista colombiana m\u00E1s famosa del mundo, nacida en Barranquilla. Su m\u00FAsica fusiona ritmos latinos con pop global, llevando el esp\u00EDritu barranquillero a todos los continentes.",
    },
    en: {
      name: "Shakira",
      description:
        "The world\u2019s most famous Colombian artist, born in Barranquilla. Her music fuses Latin rhythms with global pop, carrying the Barranquilla spirit to every continent.",
    },
  },
  {
    id: "garcia-marquez",
    image: "/glossary/garcia-marquez.jpg",
    emoji: "\uD83D\uDCDA",
    es: {
      name: "Gabriel Garc\u00EDa M\u00E1rquez",
      description:
        "Premio Nobel de Literatura colombiano y padre del realismo m\u00E1gico. \u2018Gabo\u2019 transform\u00F3 la literatura universal con obras como \u2018Cien A\u00F1os de Soledad\u2019.",
    },
    en: {
      name: "Gabriel Garc\u00EDa M\u00E1rquez",
      description:
        "Colombian Nobel Prize in Literature laureate and father of magical realism. \u2018Gabo\u2019 transformed world literature with works like \u2018One Hundred Years of Solitude\u2019.",
    },
  },
  {
    id: "macondo",
    image: "/glossary/macondo.jpg",
    emoji: "\u2728",
    es: {
      name: "Macondo",
      description:
        "El pueblo ficticio creado por Garc\u00EDa M\u00E1rquez en \u2018Cien A\u00F1os de Soledad\u2019. Se ha convertido en s\u00EDmbolo de la Colombia m\u00E1gica, donde la realidad y la fantas\u00EDa se entrelazan.",
    },
    en: {
      name: "Macondo",
      description:
        "The fictional town created by Garc\u00EDa M\u00E1rquez in \u2018One Hundred Years of Solitude\u2019. It has become a symbol of magical Colombia, where reality and fantasy intertwine.",
    },
  },
  {
    id: "sancocho",
    image: "/glossary/sancocho.jpg",
    emoji: "\uD83C\uDF72",
    es: {
      name: "Sancocho",
      description:
        "Sopa tradicional colombiana hecha con carnes, yuca, pl\u00E1tano, mazorca y papas. Es el plato que re\u00FAne a familias enteras alrededor de una olla en cada celebraci\u00F3n.",
    },
    en: {
      name: "Sancocho",
      description:
        "Traditional Colombian soup made with meats, yuca, plantain, corn, and potatoes. It\u2019s the dish that gathers entire families around a pot for every celebration.",
    },
  },
  {
    id: "chiva",
    image: "/glossary/chiva.jpg",
    emoji: "\uD83D\uDE8C",
    es: {
      name: "Chiva / Bus Escalera",
      description:
        "Autob\u00FAs tradicional colombiano pintado con colores vibrantes. Hoy transformado en \u2018chiva rumbera\u2019, un bus-fiesta ambulante con m\u00FAsica y baile por las calles.",
    },
    en: {
      name: "Chiva / Ladder Bus",
      description:
        "Traditional Colombian bus painted in vibrant colors. Now transformed into \u2018chiva rumbera\u2019, a mobile party bus with music and dancing through the streets.",
    },
  },
  {
    id: "guacamaya",
    image: "/glossary/guacamaya.jpg",
    emoji: "\uD83E\uDD9C",
    es: {
      name: "Guacamaya",
      description:
        "Ave tropical de colores vibrantes, s\u00EDmbolo de la biodiversidad colombiana. Colombia es el pa\u00EDs con m\u00E1s especies de aves en el mundo.",
    },
    en: {
      name: "Macaw",
      description:
        "Vibrant tropical bird, symbol of Colombian biodiversity. Colombia is the country with the most bird species in the world.",
    },
  },
  {
    id: "frutas-tropicales",
    image: "/glossary/frutas-tropicales.jpg",
    emoji: "\uD83E\uDD6D",
    es: {
      name: "Frutas Tropicales",
      description:
        "Colombia es para\u00EDso de frutas: guayaba, maracuy\u00E1, mango, papaya, guan\u00E1bana, lulo... Cada fruta cuenta la historia de una tierra generosa y tropical.",
    },
    en: {
      name: "Tropical Fruits",
      description:
        "Colombia is a fruit paradise: guava, passion fruit, mango, papaya, soursop, lulo... Each fruit tells the story of a generous, tropical land.",
    },
  },
  {
    id: "mochila",
    image: "/glossary/mochila.jpg",
    emoji: "\uD83D\uDC5C",
    es: {
      name: "Mochila Wayu\u00FA",
      description:
        "Bolso tejido a mano por los ind\u00EDgenas Wayu\u00FA de La Guajira. Cada mochila es \u00FAnica, con patrones que cuentan historias de la naturaleza y la cosmovisi\u00F3n ind\u00EDgena.",
    },
    en: {
      name: "Wayu\u00FA Mochila Bag",
      description:
        "Handwoven bag by the Wayu\u00FA indigenous people of La Guajira. Each bag is unique, with patterns telling stories of nature and indigenous worldview.",
    },
  },
];
