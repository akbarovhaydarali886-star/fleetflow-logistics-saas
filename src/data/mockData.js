export const INITIAL_SHIPMENTS = [
  {
    id: "FF-98214",
    sender: { name: "Silk Road Logistics Inc", city: "Tashkent", country: "Uzbekistan", address: "Chilanzar 12, Tashkent" },
    receiver: { name: "Bavaria Auto Components", city: "Munich", country: "Germany", address: "Industriestrasse 44, Munich" },
    cargo: "Industrial Electronics & Sensors",
    type: "Fragile / Temperature Controlled",
    weight: "4,850 kg",
    volume: "18.4 m³",
    value: "$142,000",
    status: "in_transit", // pending, in_transit, customs_hold, delivered, delayed
    priority: "High",
    progress: 68,
    carrier: "Scania R500 (V-882)",
    driver: "Aziz Rakhimov",
    driverPhone: "+998 90 123 45 67",
    currentLocation: "Baku, Azerbaijan (Port Transit)",
    eta: "Tomorrow, 16:30",
    departureDate: "2026-09-26",
    price: 6450,
    checkpoints: [
      { location: "Tashkent Hub", time: "Sep 26, 08:00", status: "completed", note: "Departed warehouse dispatch" },
      { location: "Samarkand Transit", time: "Sep 27, 02:15", status: "completed", note: "Fuel stop & seal inspection passed" },
      { location: "Turkmenbashi Port", time: "Sep 28, 14:00", status: "completed", note: "Ferry boarding completed" },
      { location: "Baku Customs Port", time: "Sep 29, 21:40", status: "current", note: "Transshipment in progress" },
      { location: "Tbilisi Hub", time: "Oct 01, 10:00", status: "upcoming", note: "Scheduled customs clearance" },
      { location: "Munich Final Hub", time: "Oct 02, 16:30", status: "upcoming", note: "Final delivery destination" }
    ]
  },
  {
    id: "FF-98215",
    sender: { name: "Navoi Agro Exports", city: "Navoi", country: "Uzbekistan", address: "Zarafshan Highway 5" },
    receiver: { name: "Nordic Fresh Foods AB", city: "Stockholm", country: "Sweden", address: "Hammarby Kaj 18, Stockholm" },
    cargo: "Organic Dried Fruits & Saffron",
    type: "Perishable Food Grade",
    weight: "12,200 kg",
    volume: "42.0 m³",
    value: "$89,500",
    status: "in_transit",
    priority: "Normal",
    progress: 42,
    carrier: "Volvo FH16 (V-401)",
    driver: "Dmitry Volkov",
    driverPhone: "+998 93 456 78 90",
    currentLocation: "Aktau Port, Kazakhstan",
    eta: "Oct 04, 12:00",
    departureDate: "2026-09-28",
    price: 9100,
    checkpoints: [
      { location: "Navoi Central Terminal", time: "Sep 28, 06:00", status: "completed", note: "Phytosanitary inspection cleared" },
      { location: "Nukus Logistics Park", time: "Sep 29, 12:30", status: "completed", note: "Reefer container temp verified at -4°C" },
      { location: "Aktau Port Hub", time: "Sep 30, 19:10", status: "current", note: "Awaiting Caspian sea crossing" },
      { location: "Moscow Central Hub", time: "Oct 02, 08:00", status: "upcoming", note: "Transit checkpoint" },
      { location: "Stockholm Terminal", time: "Oct 04, 12:00", status: "upcoming", note: "Scheduled arrival" }
    ]
  },
  {
    id: "FF-98216",
    sender: { name: "Samsung Display Parts", city: "Seoul", country: "South Korea", address: "Gangnam Blvd 102" },
    receiver: { name: "Artel Electronics Group", city: "Tashkent", country: "Uzbekistan", address: "Bektemir Tech Zone 8" },
    cargo: "OLED High-Precision Panels",
    type: "Hazardous / High-Value",
    weight: "2,100 kg",
    volume: "9.2 m³",
    value: "$480,000",
    status: "delivered",
    priority: "Urgent",
    progress: 100,
    carrier: "Air Cargo B-747 (F-102)",
    driver: "Captain Sherzod Alimov",
    driverPhone: "+998 97 888 11 22",
    currentLocation: "Delivered - Tashkent Hub",
    eta: "Delivered Sep 29",
    departureDate: "2026-09-27",
    price: 18200,
    checkpoints: [
      { location: "Incheon Cargo Terminal", time: "Sep 27, 22:00", status: "completed", note: "Air waybill dispatched" },
      { location: "Almaty Refuel Station", time: "Sep 28, 05:40", status: "completed", note: "Flight transit stop" },
      { location: "Tashkent International Airport", time: "Sep 28, 14:15", status: "completed", note: "Air customs cleared" },
      { location: "Bektemir Tech Hub", time: "Sep 29, 11:00", status: "completed", note: "Client signed delivery receipt" }
    ]
  },
  {
    id: "FF-98217",
    sender: { name: "Ankara Textile Machinery", city: "Ankara", country: "Turkey", address: "Ostim Sanayi 14" },
    receiver: { name: "Fergana Spinning Mills", city: "Fergana", country: "Uzbekistan", address: "Margilan Highway 21" },
    cargo: "Industrial Weaving Looms & Spares",
    type: "Heavy Machinery",
    weight: "24,500 kg",
    volume: "76.0 m³",
    value: "$235,000",
    status: "customs_hold",
    priority: "High",
    progress: 75,
    carrier: "Mercedes Actros (V-719)",
    driver: "Murat Yilmaz",
    driverPhone: "+90 532 987 65 43",
    currentLocation: "Sarakhs Border Crossing, Iran-Turkmenistan",
    eta: "Delayed (Audit required)",
    departureDate: "2026-09-22",
    price: 11400,
    checkpoints: [
      { location: "Ankara Industrial Zone", time: "Sep 22, 10:00", status: "completed", note: "Heavy cargo loaded and strapped" },
      { location: "Erzurum Transit Depot", time: "Sep 23, 19:30", status: "completed", note: "Weight station check ok" },
      { location: "Bazargan Border", time: "Sep 25, 08:20", status: "completed", note: "Iran entry permit stamped" },
      { location: "Sarakhs Customs Post", time: "Sep 28, 16:00", status: "current", note: "Held for customs code re-verification" }
    ]
  },
  {
    id: "FF-98218",
    sender: { name: "Oasis Chemical Supply", city: "Dubai", country: "UAE", address: "Jebel Ali Freezone" },
    receiver: { name: "Bukhara Petrochemical Complex", city: "Bukhara", country: "Uzbekistan", address: "Karakul Industrial Area" },
    cargo: "Catalytic Refining Agents",
    type: "Hazardous Class 3",
    weight: "18,900 kg",
    volume: "38.5 m³",
    value: "$310,000",
    status: "pending",
    priority: "Urgent",
    progress: 5,
    carrier: "MAN TGX Tanker (V-118)",
    driver: "Farrukh Kasimov",
    driverPhone: "+998 91 333 44 55",
    currentLocation: "Bandar Abbas Terminal (Awaiting Loading)",
    eta: "Oct 08, 18:00",
    departureDate: "2026-10-01",
    price: 14800,
    checkpoints: [
      { location: "Jebel Ali Terminal", time: "Sep 30, 10:00", status: "current", note: "Hazmat documentation verified" },
      { location: "Bandar Abbas Port", time: "Oct 01, 14:00", status: "upcoming", note: "Vessel loading scheduled" }
    ]
  },
  {
    id: "FF-98219",
    sender: { name: "PharmaNordic Meds", city: "Copenhagen", country: "Denmark", address: "Medicon Valley 9" },
    receiver: { name: "Central Medical Depot", city: "Tashkent", country: "Uzbekistan", address: "Mirabad St 4" },
    cargo: "Insulin & Cold-Chain Vaccines",
    type: "Cold Chain (+2°C to +8°C)",
    weight: "3,400 kg",
    volume: "12.0 m³",
    value: "$620,000",
    status: "in_transit",
    priority: "Urgent",
    progress: 88,
    carrier: "Volvo FH Electric Reefer (V-902)",
    driver: "Jonas Nielsen & Jamshid Bek",
    driverPhone: "+45 20 12 34 56",
    currentLocation: "Chimkent Bypass, Kazakhstan (210 km to Tashkent)",
    eta: "Today, 23:45",
    departureDate: "2026-09-25",
    price: 15900,
    checkpoints: [
      { location: "Copenhagen BioTech Hub", time: "Sep 25, 09:00", status: "completed", note: "Logger seal #8819 activated" },
      { location: "Warsaw Distribution Gate", time: "Sep 26, 17:40", status: "completed", note: "Driver swap & sensor health check" },
      { location: "Astana Logistics Center", time: "Sep 28, 22:10", status: "completed", note: "Dry ice supplement added" },
      { location: "Chimkent Highway", time: "Sep 30, 18:00", status: "current", note: "On schedule, 2.5 hours to Uzbekistan border" }
    ]
  }
];

export const FLEET_VEHICLES = [
  {
    id: "TRK-101",
    model: "Scania R500 Super",
    plate: "01 777 AAA",
    type: "Heavy Semi-Truck (40T)",
    status: "on_route", // on_route, idle, maintenance
    driver: "Aziz Rakhimov",
    assignedShipment: "FF-98214",
    fuelLevel: 78,
    speed: "74 km/h",
    mileage: "148,290 km",
    engineHealth: 96,
    tirePressure: "8.5 bar (Optimal)",
    temp: "19°C",
    lastService: "2026-08-15",
    lat: 40.4093,
    lng: 49.8671, // Baku
    city: "Baku, Azerbaijan"
  },
  {
    id: "TRK-102",
    model: "Volvo FH16 Globetrotter",
    plate: "01 882 BBB",
    type: "Refrigerated Carrier (Reefer)",
    status: "on_route",
    driver: "Dmitry Volkov",
    assignedShipment: "FF-98215",
    fuelLevel: 62,
    speed: "68 km/h",
    mileage: "212,400 km",
    engineHealth: 91,
    tirePressure: "8.4 bar (Optimal)",
    temp: "-4°C (Cargo Room)",
    lastService: "2026-07-28",
    lat: 43.6481,
    lng: 51.1722, // Aktau
    city: "Aktau, Kazakhstan"
  },
  {
    id: "TRK-103",
    model: "Mercedes-Benz Actros 1845",
    plate: "10 441 CCC",
    type: "Heavy Hauler Flatbed",
    status: "maintenance",
    driver: "Murat Yilmaz",
    assignedShipment: "FF-98217",
    fuelLevel: 45,
    speed: "0 km/h",
    mileage: "340,110 km",
    engineHealth: 74,
    tirePressure: "7.9 bar (Warning)",
    temp: "28°C",
    lastService: "2026-05-10",
    lat: 36.5444,
    lng: 61.1578, // Sarakhs
    city: "Sarakhs Customs Depot"
  },
  {
    id: "TRK-104",
    model: "Volvo FH Electric Heavy",
    plate: "01 902 EEE",
    type: "Clean Electric Reefer",
    status: "on_route",
    driver: "Jamshid Bek",
    assignedShipment: "FF-98219",
    fuelLevel: 84, // Battery %
    speed: "82 km/h",
    mileage: "42,000 km",
    engineHealth: 99,
    tirePressure: "8.6 bar (Optimal)",
    temp: "+4°C (Pharma Certified)",
    lastService: "2026-09-01",
    lat: 42.3417,
    lng: 69.5901, // Shymkent
    city: "Chimkent Transit Highway"
  },
  {
    id: "TRK-105",
    model: "MAN TGX 26.540",
    plate: "20 512 DDD",
    type: "ISO Chemical Tanker",
    status: "idle",
    driver: "Farrukh Kasimov",
    assignedShipment: "FF-98218",
    fuelLevel: 95,
    speed: "0 km/h",
    mileage: "115,000 km",
    engineHealth: 94,
    tirePressure: "8.5 bar (Optimal)",
    temp: "24°C",
    lastService: "2026-09-12",
    lat: 27.1832,
    lng: 56.2666, // Bandar Abbas
    city: "Bandar Abbas Hub"
  },
  {
    id: "TRK-106",
    model: "Ford Transit L4H3",
    plate: "01 303 FFF",
    type: "Express City Courier (3.5T)",
    status: "idle",
    driver: "Rustam Kadirov",
    assignedShipment: "None (Available)",
    fuelLevel: 89,
    speed: "0 km/h",
    mileage: "68,400 km",
    engineHealth: 98,
    tirePressure: "3.5 bar (Optimal)",
    temp: "22°C",
    lastService: "2026-09-20",
    lat: 41.3111,
    lng: 69.2797, // Tashkent
    city: "Tashkent Central Depot"
  }
];

export const DRIVERS = [
  {
    id: "DRV-01",
    name: "Aziz Rakhimov",
    experience: "12 years",
    rating: 4.95,
    status: "On Trip",
    phone: "+998 90 123 45 67",
    tripsCompleted: 482,
    safetyScore: "99.2%",
    assignedVehicle: "Scania R500 (01 777 AAA)",
    currentShipment: "FF-98214"
  },
  {
    id: "DRV-02",
    name: "Dmitry Volkov",
    experience: "8 years",
    rating: 4.88,
    status: "On Trip",
    phone: "+998 93 456 78 90",
    tripsCompleted: 310,
    safetyScore: "98.5%",
    assignedVehicle: "Volvo FH16 (01 882 BBB)",
    currentShipment: "FF-98215"
  },
  {
    id: "DRV-03",
    name: "Jamshid Bek",
    experience: "15 years (ADR Hazmat)",
    rating: 4.99,
    status: "On Trip",
    phone: "+998 97 888 11 22",
    tripsCompleted: 640,
    safetyScore: "100%",
    assignedVehicle: "Volvo FH Electric (01 902 EEE)",
    currentShipment: "FF-98219"
  },
  {
    id: "DRV-04",
    name: "Murat Yilmaz",
    experience: "10 years",
    rating: 4.75,
    status: "Standby (Customs)",
    phone: "+90 532 987 65 43",
    tripsCompleted: 275,
    safetyScore: "96.8%",
    assignedVehicle: "Mercedes Actros (10 441 CCC)",
    currentShipment: "FF-98217"
  },
  {
    id: "DRV-05",
    name: "Farrukh Kasimov",
    experience: "7 years (Chemical Tanker)",
    rating: 4.90,
    status: "Resting",
    phone: "+998 91 333 44 55",
    tripsCompleted: 198,
    safetyScore: "99.0%",
    assignedVehicle: "MAN TGX 26.540 (20 512 DDD)",
    currentShipment: "FF-98218"
  },
  {
    id: "DRV-06",
    name: "Rustam Kadirov",
    experience: "4 years",
    rating: 4.82,
    status: "Available",
    phone: "+998 94 777 99 00",
    tripsCompleted: 145,
    safetyScore: "97.5%",
    assignedVehicle: "Ford Transit (01 303 FFF)",
    currentShipment: "None"
  }
];

export const INVOICES = [
  {
    id: "INV-2026-881",
    shipmentId: "FF-98214",
    clientName: "Bavaria Auto Components GmbH",
    date: "2026-09-26",
    dueDate: "2026-10-15",
    amount: 6450,
    status: "paid", // paid, pending, overdue
    service: "International Intermodal Freight: Tashkent - Munich",
    distance: "5,180 km",
    taxRate: 12,
    paymentMethod: "SWIFT Wire Transfer"
  },
  {
    id: "INV-2026-882",
    shipmentId: "FF-98215",
    clientName: "Nordic Fresh Foods AB",
    date: "2026-09-28",
    dueDate: "2026-10-20",
    amount: 9100,
    status: "pending",
    service: "Cold-Chain Reefer Transportation: Navoi - Stockholm",
    distance: "4,920 km",
    taxRate: 12,
    paymentMethod: "Corporate Credit Account"
  },
  {
    id: "INV-2026-883",
    shipmentId: "FF-98216",
    clientName: "Artel Electronics Group LLC",
    date: "2026-09-27",
    dueDate: "2026-10-05",
    amount: 18200,
    status: "paid",
    service: "Charter Air Freight & Express Customs: Seoul - Tashkent",
    distance: "5,320 km",
    taxRate: 12,
    paymentMethod: "Bank Guarantee"
  },
  {
    id: "INV-2026-884",
    shipmentId: "FF-98217",
    clientName: "Fergana Spinning Mills",
    date: "2026-09-22",
    dueDate: "2026-09-30",
    amount: 11400,
    status: "overdue",
    service: "Heavy Heavy-Duty Machinery Transport: Ankara - Fergana",
    distance: "3,890 km",
    taxRate: 12,
    paymentMethod: "Escrow Letter of Credit"
  },
  {
    id: "INV-2026-885",
    shipmentId: "FF-98218",
    clientName: "Bukhara Petrochemical Complex",
    date: "2026-09-30",
    dueDate: "2026-10-25",
    amount: 14800,
    status: "pending",
    service: "Special Hazmat Tanker Haulage: Dubai - Bukhara",
    distance: "2,740 km",
    taxRate: 12,
    paymentMethod: "Corporate Wire Transfer"
  }
];

export const MONTHLY_METRICS = [
  { month: "Apr", revenue: 48200, shipments: 124, onTime: 97.2 },
  { month: "May", revenue: 56400, shipments: 142, onTime: 98.1 },
  { month: "Jun", revenue: 61000, shipments: 158, onTime: 96.5 },
  { month: "Jul", revenue: 74500, shipments: 186, onTime: 98.8 },
  { month: "Aug", revenue: 82300, shipments: 204, onTime: 99.1 },
  { month: "Sep", revenue: 95400, shipments: 238, onTime: 98.4 }
];

export const CARGO_CATEGORY_DATA = [
  { name: "Electronics & Tech", value: 38, color: "#06b6d4" },
  { name: "Perishable Food & Agri", value: 24, color: "#10b981" },
  { name: "Pharma Cold-Chain", value: 16, color: "#6366f1" },
  { name: "Heavy Machinery", value: 14, color: "#f59e0b" },
  { name: "Chemical & Hazmat", value: 8, color: "#ec4899" }
];

export const AUDIT_LOGS = [
  { id: "LOG-01", time: "10 mins ago", user: "Aziz Rakhimov (Driver)", action: "Checkpoint Updated", details: "Arrived at Baku Customs Port for ferry docking", type: "info" },
  { id: "LOG-02", time: "34 mins ago", user: "Admin (Dispatcher)", action: "Status Change", details: "Shipment FF-98217 marked as Customs Hold (Inspection required)", type: "warning" },
  { id: "LOG-03", time: "2 hours ago", user: "Jamshid Bek (Driver)", action: "Telemetry Ping", details: "Reefer chamber temperature certified +4.1°C", type: "success" },
  { id: "LOG-04", time: "4 hours ago", user: "Billing System", action: "Invoice Generated", details: "INV-2026-885 generated for Bukhara Petrochem ($14,800)", type: "info" },
  { id: "LOG-05", time: "Yesterday", user: "Client (Artel Tech)", action: "POD Signed", details: "Proof of Delivery digitally countersigned for FF-98216", type: "success" }
];
