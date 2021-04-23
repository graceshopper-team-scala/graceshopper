const vehicles = [
  {
    make: "Nagasaki",
    model: "Dinghy",
    class: "boats",
    price: 12000,
    quantity: 6,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/9/92/Dinghy-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you like your dinghies like you like your prophylactics then this is the one for you. A lightweight, high capacity rigid-hulled inflatable boat that's good enough for a team of sailors on shore leave.",
  },
  {
    make: "Pegassi",
    model: "Tempesta",
    class: "sports",
    price: 300000,
    quantity: 3,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/d/db/Pegassi-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/76/Tempesta-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "At some point, asking \"So how fast it is?\" is like asking the guy who just put his fist through your ribs \"So how strong are you?\" It's not about the speed anymore. It's not about the style, either, because one touch of the gas and it's little more than a blur. You just know that deep down there's an itch only this car can scratch, and you lack any of the personal qualities you'll need to resist.",
  },
  {
    make: "Pegassi",
    model: "Tezeract",
    class: "sports",
    price: 400000,
    quantity: 5,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/d/db/Pegassi-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/e/e6/Tezeract-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Ladies and gentlemen, we have crossed the frontier. The motorcar has evolved. The first member of a new and alien species has arrived, and it does not come in peace. The Tezeract's only purpose is to wage a silent war of annihilation on anything else that dares to call itself a means of transport. As of now, there's a right side of history. Choose wisely.",
  },
  {
    make: "Albany",
    model: "Cavalcade",
    class: "suv",
    price: 50000,
    quantity: 4,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/1/1a/Albany-GTAO-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/1/14/Cavalcade2-GTAV-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "The glory days of the excessively-large, gas-guzzling SUV might be over, but the Cavalcade is here to stay.",
  },
  {
    make: "Coil",
    model: "Raiden",
    class: "electric",
    price: 70000,
    quantity: 2,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/5/5a/Coil-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/0/00/Raiden-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "The Raiden is a masterpiece of understatement. If it pulled up next to you, you wouldn't bother to look up. But then the lights go green, and you see it put down the kind of noiseless acceleration that internal combustion can only dream of. Your iFruit falls from your snotty grip, and you think: maybe the world's not so bad after all.",
  },
  {
    make: "Grotti",
    model: "Itali GTO",
    class: "sports",
    price: 130000,
    quantity: 7,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Grotti-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/76/ItaliGTO-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "When you think of lightweight redesigns, you probably think of carbon fiber bodywork and stripped-out interiors. But that's just for beginners. Step inside the Itali GTO, and the air you're breathing has increased hydrogen content for extra lift. Grotti have even taken the controversial step of obliging potential owners to do their part by shaving their body hair and removing at least one kidney. Sometimes you have to suffer for perfection.",
  },
  {
    make: "Grotti",
    model: "Furia",
    class: "sports",
    price: 120000,
    quantity: 7,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/3/35/Grotti-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/b/b9/Furia-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Who needs a super car? Who needs to throw their cash at the finest leather upholstery, godly specs and a body so seductive Aphrodite herself would have bowed down to it? Who needs an all-out-tarmac-tearing-sound-barrier-breaking-sexy-racing-dream-machine? You do. The Grotti Furia - worth selling your second kidney for.",
  },
  {
    make: "Progen",
    model: "GP1",
    class: "sports",
    price: 160000,
    quantity: 9,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/7/79/Progen-Logo-GTAO.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4b/GP1-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "Seasons will change, fashions will come and go, economies will tank, the wholesome popstars of today will be leaking their own bondage tapes tomorrow - but the GP1 will always remain. This is what defined supercars for a generation, perhaps for all time: as pure and flawless as the smile of a newborn.",
  },
  {
    make: "Jobiult",
    model: "P-996 Lazer",
    class: "planes",
    price: 1500000,
    quantity: 5,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/6/6e/Name-IV-Jobuilt.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/5/56/P996LAZER-GTAV-front.png/revision/latest/scale-to-width-down/700",
    description:
      "Who doesn't remember their first time? Borrowing one of these from Fort Zancudo for a joy ride. But now you're older and wiser, you're ready for a tactical fighter to call your own. Time to come of age.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
  {
    make: "Nagasaki",
    model: "Blazer Aqua",
    class: "offroad",
    price: 9000,
    quantity: 20,
    logoUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/4/4e/Nagasaki-GTAV-Logo.png/revision/latest/scale-to-width-down/210",
    imageUrl:
      "https://vignette.wikia.nocookie.net/gtawiki/images/2/29/BlazerAqua-GTAO-FrontQuarter.png/revision/latest/scale-to-width-down/700",
    description:
      "If you're a farmer in one of the close-knit communities on the shores of the Alamo Sea, chances are you're legally blind. But apart from that it's your lucky day, because not only does Nagasaki's latest quad come with weapons, it's also fully amphibious, so you can career off the road and into the highly infectious water without a second thought.",
  },
];

module.exports = vehicles;
