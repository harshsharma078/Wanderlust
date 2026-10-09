const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1769542711791-73e9f2e134d2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85",
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1780402838687-fca79dd7a493?auto=format&fit=crop&w=1600&q=85",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Historic Canal House",
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=85",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1768823131582-ddef6cf86eee?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1780618611939-5279fc292bb9?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1600&q=85",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
  },
];

const extraListings = [
  // ROOMS — 4 listings
  {
    title: "Cozy Bedroom in Manali",
    description:
      "A comfortable mountain room with a cozy bedroom, pine forest views and easy access to local cafes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1723640583224-893e29941646?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2500,
    location: "Manali, Himachal Pradesh",
    country: "India",
  },
  {
    title: "Modern Apartment in Bengaluru",
    description:
      "A modern city apartment with stylish rooms, a comfortable bedroom and access to downtown Bengaluru.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3200,
    location: "Bengaluru, Karnataka",
    country: "India",
  },
  {
    title: "Luxury Bedroom in Jaipur",
    description:
      "An elegant bedroom in a heritage-style stay near Jaipur's iconic city attractions and markets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1775595224323-94a84b9be802?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2800,
    location: "Jaipur, Rajasthan",
    country: "India",
  },
  {
    title: "City Apartment in Tokyo",
    description:
      "A compact urban apartment with a modern bedroom in a lively downtown neighborhood.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1768823131582-ddef6cf86eee?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4500,
    location: "Tokyo",
    country: "Japan",
  },

  // ICONIC CITIES — 4 listings
  {
    title: "Heritage Stay in Udaipur City",
    description:
      "Explore the iconic city of Udaipur from a beautiful heritage stay near Lake Pichola and the old city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4000,
    location: "Udaipur, Rajasthan",
    country: "India",
  },
  {
    title: "Skyline Apartment in Mumbai",
    description:
      "A stylish urban apartment with skyline views in one of India's most energetic metropolitan cities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=85",
    },
    price: 5000,
    location: "Mumbai, Maharashtra",
    country: "India",
  },
  {
    title: "Downtown Stay in New York City",
    description:
      "Stay close to iconic city landmarks, downtown restaurants and the famous Manhattan skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=85",
    },
    price: 9000,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Urban Escape in Kolkata",
    description:
      "Discover Kolkata's iconic city architecture, historic streets, culture and delicious local food.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1768823131582-ddef6cf86eee?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2200,
    location: "Kolkata, West Bengal",
    country: "India",
  },

  // MOUNTAINS — 4 listings
  {
    title: "Himalayan Mountain Cabin in Shimla",
    description:
      "A peaceful mountain cabin surrounded by Himalayan hills, pine forests and beautiful valley views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1769542711791-73e9f2e134d2?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3500,
    location: "Shimla, Himachal Pradesh",
    country: "India",
  },
  {
    title: "Snowy Mountain Retreat in Gulmarg",
    description:
      "Enjoy a cozy retreat among snowy mountains, scenic Himalayan valleys and fresh mountain air.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4500,
    location: "Gulmarg, Jammu and Kashmir",
    country: "India",
  },
  {
    title: "Mountain View Cottage in Darjeeling",
    description:
      "Wake up to mountain views, green hills and the beautiful Himalayan valley around Darjeeling.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1780402838687-fca79dd7a493?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2800,
    location: "Darjeeling, West Bengal",
    country: "India",
  },
  {
    title: "Alpine Mountain Chalet in Switzerland",
    description:
      "A scenic alpine chalet with mountain views, fresh air and access to picturesque hiking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    },
    price: 12000,
    location: "Zermatt",
    country: "Switzerland",
  },

  // CASTLES — 4 listings
  {
    title: "Historic Castle Stay in Jaipur",
    description:
      "Experience a royal heritage stay inspired by Rajasthan's historic castles, forts and palaces.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1772976455832-9d6b078ac401?auto=format&fit=crop&w=1600&q=85",
    },
    price: 6500,
    location: "Jaipur, Rajasthan",
    country: "India",
  },
  {
    title: "Royal Fort Retreat in Jaisalmer",
    description:
      "Stay near the golden fort and explore the historic palace architecture of the Thar Desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3800,
    location: "Jaisalmer, Rajasthan",
    country: "India",
  },
  {
    title: "Palace Heritage Stay in Mysuru",
    description:
      "Discover royal history, palace architecture and heritage landmarks in beautiful Mysuru.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1772976455832-9d6b078ac401?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4200,
    location: "Mysuru, Karnataka",
    country: "India",
  },
  {
    title: "Stone Castle Retreat in Scotland",
    description:
      "A historic castle-inspired retreat surrounded by green hills, stone walls and Scottish countryside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1694086130011-3ea6866e6335?auto=format&fit=crop&w=1600&q=85",
    },
    price: 10000,
    location: "Edinburgh",
    country: "United Kingdom",
  },

  // AMAZING POOLS — 4 listings
  {
    title: "Infinity Pool Villa in Goa",
    description:
      "Relax beside a private swimming pool at this tropical villa near Goa's beautiful beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1778166135376-635f120a04d4?auto=format&fit=crop&w=1600&q=85",
    },
    price: 7000,
    location: "North Goa, Goa",
    country: "India",
  },
  {
    title: "Luxury Pool House in Kerala",
    description:
      "A tropical Kerala escape with a refreshing swimming pool, lush greenery and relaxing outdoor spaces.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85",
    },
    price: 6000,
    location: "Alleppey, Kerala",
    country: "India",
  },
  {
    title: "Rooftop Swimming Pool in Dubai",
    description:
      "Enjoy a luxury city stay with an outdoor pool, skyline views and modern interiors.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1600&q=85",
    },
    price: 11000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Private Pool Villa in Bali",
    description:
      "A tropical villa with a private infinity pool, open-air spaces and lush garden views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85",
    },
    price: 8500,
    location: "Ubud, Bali",
    country: "Indonesia",
  },

  // CAMPING — 4 listings
  {
    title: "Riverside Camping in Rishikesh",
    description:
      "Enjoy riverside camping, mountain views, outdoor adventures and peaceful evenings beside the Ganges.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1775542536213-007344f06feb?auto=format&fit=crop&w=1600&q=85",
    },
    price: 1800,
    location: "Rishikesh, Uttarakhand",
    country: "India",
  },
  {
    title: "Desert Tent Camping in Jaisalmer",
    description:
      "Experience tent camping, desert sunsets and starlit nights in the golden Thar Desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2500,
    location: "Sam Sand Dunes, Rajasthan",
    country: "India",
  },
  {
    title: "Forest Glamping in Coorg",
    description:
      "A peaceful glamping escape among forest trails, coffee plantations and lush green hills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3000,
    location: "Coorg, Karnataka",
    country: "India",
  },
  {
    title: "Lakeside Tent Camping in Canada",
    description:
      "Camp beside a peaceful lake, explore forest trails and enjoy outdoor adventures in nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4000,
    location: "Banff, Canada",
    country: "Canada",
  },

  // FARMS — 4 listings
  {
    title: "Green Farmhouse Stay in Punjab",
    description:
      "Relax at a countryside farmhouse surrounded by green fields, fresh air and rural village life.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1786913508060-40849d04df94?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3500,
    location: "Amritsar, Punjab",
    country: "India",
  },
  {
    title: "Organic Farm Retreat in Nashik",
    description:
      "Enjoy a rural farm stay among vineyards, orchards, open fields and peaceful countryside views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
    },
    price: 3200,
    location: "Nashik, Maharashtra",
    country: "India",
  },
  {
    title: "Countryside Farmhouse in Tuscany",
    description:
      "A relaxing farmhouse with rural scenery, vineyards, olive groves and open countryside.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=85",
    },
    price: 7500,
    location: "Tuscany",
    country: "Italy",
  },
  {
    title: "Rustic Ranch Stay in Rajasthan",
    description:
      "Experience rural life at a rustic ranch with wide open land, traditional hospitality and sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=85",
    },
    price: 2800,
    location: "Pushkar, Rajasthan",
    country: "India",
  },

  // ARCTIC / SNOW — 4 listings
  {
    title: "Snowy Mountain Cabin in Auli",
    description:
      "A cozy winter stay surrounded by snow, Himalayan peaks and beautiful mountain scenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85",
    },
    price: 4200,
    location: "Auli, Uttarakhand",
    country: "India",
  },
  {
    title: "Snow Retreat in Gulmarg",
    description:
      "Stay near snowy slopes and icy mountain landscapes in this winter escape in Kashmir.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1600&q=85",
    },
    price: 5000,
    location: "Gulmarg, Jammu and Kashmir",
    country: "India",
  },
  {
    title: "Winter Lodge in Lapland",
    description:
      "A cozy lodge with snowy scenery, frosty forests and a chance to experience Arctic winter nights.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=85",
    },
    price: 12000,
    location: "Rovaniemi",
    country: "Finland",
  },
  {
    title: "Glacier View Cabin in Iceland",
    description:
      "Discover icy landscapes, glacier views, snowy trails and the dramatic beauty of Iceland.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=85",
    },
    price: 10000,
    location: "Reykjavik",
    country: "Iceland",
  },
];

module.exports = {
  data: [...sampleListings, ...extraListings],
};