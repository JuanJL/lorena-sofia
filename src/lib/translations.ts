export const translations = {
  es: {
    hero: {
      saveTheDate: "SAVE THE DATE",
      date: "27 \u00B7 06 \u00B7 26",
      name: "LORENA SOF\u00CDA",
      subtitle: "COMIENZA UNA NUEVA ERA",
    },
    story: {
      paragraphs: [
        "Nac\u00ED el 3 de junio de 1986 en Valledupar, al norte de Colombia, hija de mis hermosos padres, Carlos y Rosalba. Con mi llegada, se cerraba nuestro hogar en una familia de cinco, junto a mis dos hermanos mayores, Jimmy y Mauro.",
        "Crec\u00ED en una tierra donde el calor no solo se siente en la piel, sino tambi\u00E9n en el coraz\u00F3n. El norte de Colombia es m\u00FAsica, es tradici\u00F3n, es vida que se celebra sin medida. Es el sonido del vallenato contando historias, las reuniones llenas de risas, los colores, los abrazos largos y la cercan\u00EDa de la gente.",
        "Vengo de un lugar donde la alegr\u00EDa es esencia, donde las ra\u00EDces son profundas y donde el amor por la vida se respira en cada detalle. Esa energ\u00EDa, esa calidez y esa forma de sentir el mundo viven en m\u00ED\u2026 y son parte de todo lo que soy hoy.",
      ],
    },
    details: {
      title: "Detalles del Evento",
      date: "27 de Junio, 2026",
      day: "S\u00E1bado",
      location: "Barcelona, Espa\u00F1a",
      comingSoon: "Pr\u00F3ximamente m\u00E1s detalles",
      dressCode:
        "El lugar exacto y m\u00E1s informaci\u00F3n se revelar\u00E1n pronto",
      when: "Cu\u00E1ndo",
      where: "D\u00F3nde",
    },
    rsvp: {
      title: "Confirma tu Asistencia",
      subtitle: "Queremos contar contigo en esta celebraci\u00F3n",
      name: "Tu nombre completo",
      email: "Email (opcional)",
      guests: "N\u00FAmero de invitados",
      attendance: "\u00BFAsistir\u00E1s?",
      yes: "\u00A1S\u00ED, ah\u00ED estar\u00E9!",
      no: "No podr\u00E9 asistir",
      maybe: "A\u00FAn no estoy seguro/a",
      message: "Mensaje para Lorena (opcional)",
      messagePlaceholder: "Escribe un mensaje especial...",
      submit: "Confirmar Asistencia",
      submitting: "Enviando...",
      success:
        "\u00A1Gracias! Tu confirmaci\u00F3n ha sido registrada.",
      error: "Hubo un error. Por favor intenta de nuevo.",
      guest1: "1 persona",
      guest2: "2 personas",
      guest3: "3 personas",
      guest4: "4 personas",
      guest5: "5 personas",
    },
    glossary: {
      title: "Descubre la Cultura",
      subtitle:
        "Un viaje por las tradiciones de Barranquilla y Colombia",
    },
    footer: {
      madeWith: "Hecho con",
      forThe: "para la celebraci\u00F3n de",
    },
    langSwitch: "EN",
  },
  en: {
    hero: {
      saveTheDate: "SAVE THE DATE",
      date: "27 \u00B7 06 \u00B7 26",
      name: "LORENA SOF\u00CDA",
      subtitle: "A NEW ERA BEGINS",
    },
    story: {
      paragraphs: [
        "I was born on June 3, 1986 in Valledupar, in the north of Colombia, the daughter of my beautiful parents, Carlos and Rosalba. With my arrival, our home became complete \u2014 a family of five, alongside my two older brothers, Jimmy and Mauro.",
        "I grew up in a land where warmth is felt not only on the skin, but also in the heart. The north of Colombia is music, it is tradition, it is life celebrated without measure. It is the sound of vallenato telling stories, gatherings full of laughter, colors, long hugs, and the closeness of its people.",
        "I come from a place where joy is essence, where roots run deep, and where love for life breathes in every detail. That energy, that warmth, and that way of feeling the world live in me\u2026 and are part of everything I am today.",
      ],
    },
    details: {
      title: "Event Details",
      date: "June 27, 2026",
      day: "Saturday",
      location: "Barcelona, Spain",
      comingSoon: "More details coming soon",
      dressCode: "Exact venue and more info will be revealed soon",
      when: "When",
      where: "Where",
    },
    rsvp: {
      title: "RSVP",
      subtitle: "We want to count on you for this celebration",
      name: "Your full name",
      email: "Email (optional)",
      guests: "Number of guests",
      attendance: "Will you attend?",
      yes: "Yes, I\u2019ll be there!",
      no: "I won\u2019t be able to make it",
      maybe: "Not sure yet",
      message: "Message for Lorena (optional)",
      messagePlaceholder: "Write a special message...",
      submit: "Confirm Attendance",
      submitting: "Sending...",
      success: "Thank you! Your RSVP has been registered.",
      error: "There was an error. Please try again.",
      guest1: "1 person",
      guest2: "2 people",
      guest3: "3 people",
      guest4: "4 people",
      guest5: "5 people",
    },
    glossary: {
      title: "Discover the Culture",
      subtitle:
        "A journey through the traditions of Barranquilla and Colombia",
    },
    footer: {
      madeWith: "Made with",
      forThe: "for the celebration of",
    },
    langSwitch: "ES",
  },
} as const;

export type Translations = typeof translations;
export type Language = keyof Translations;
