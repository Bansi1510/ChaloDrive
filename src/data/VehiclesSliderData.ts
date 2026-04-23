import { Car, Bike, Truck, Bus, Zap } from "lucide-react";

export const vehiclesData = [
  {
    id: 1,
    name: "Sedan",
    desc: "Comfort city ride",
    price: "₹12/km",
    icon: Car,
    seats: 4,
  },
  {
    id: 2,
    name: "SUV",
    desc: "Family long trips",
    price: "₹18/km",
    icon: Truck,
    seats: 6,
  },
  {
    id: 3,
    name: "Sports",
    desc: "Luxury speed ride",
    price: "₹35/km",
    icon: Zap,
    seats: 2,
  },
  {
    id: 4,
    name: "Mini Van",
    desc: "Group travel",
    price: "₹15/km",
    icon: Bus,
    seats: 7,
  },
  {
    id: 5,
    name: "Bike",
    desc: "Fast solo ride",
    price: "₹6/km",
    icon: Bike,
    seats: 1,
  },
];