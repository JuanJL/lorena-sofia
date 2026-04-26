export const translations = {
  es: {
    hero: {
      saveTheDate: "SAVE THE DATE",
      date: "27 \u00B7 06 \u00B7 26",
      name: "LORENA SOF\u00CDA",
      subtitle: "COMIENZA UNA NUEVA ERA",
    },
    story: {
      line1:
        "Un d\u00EDa para celebrar todo lo vivido,",
      line2: "todo lo que somos",
      line3: "y todo lo que est\u00E1 por venir.",
      line4:
        "Ritmo, ra\u00EDces y alegr\u00EDa",
      line5: "se encuentran para dar inicio",
      line6: "a lo extraordinario.",
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
      line1: "A day to celebrate everything we\u2019ve lived,",
      line2: "everything we are",
      line3: "and everything that\u2019s yet to come.",
      line4: "Rhythm, roots, and joy",
      line5: "come together to mark the beginning",
      line6: "of something extraordinary.",
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
