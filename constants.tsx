
import { Category, Product } from './types';

export const BRAND_NAME = "LUMINA STYLE";
export const TAGLINE = "Style Meets Strength";
export const WHATSAPP_NUMBER = "1234567890";
export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_.../viewform";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: "Midnight Silk Wrap Dress",
    price: "$89.00",
    category: Category.DRESSES,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    description: "Elegant evening wrap dress with a subtle sheen, perfect for sunset dinners and social events.",
    fabric: "Premium Mulberry Silk Blend",
    care: "Dry clean only. Do not bleach.",
    colors: ["Midnight Blue", "Emerald Green", "Rose Gold"]
  },
  {
    id: '2',
    name: "Aura Seamless Leggings",
    price: "$55.00",
    category: Category.GYM_WEAR,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    description: "High-waisted, squat-proof leggings with moisture-wicking technology for intense workouts.",
    fabric: "80% Nylon, 20% Spandex",
    care: "Machine wash cold with like colors. Tumble dry low.",
    colors: ["Stone Gray", "Sage Green", "Jet Black"]
  },
  {
    id: '3',
    name: "Zen Flow Yoga Set",
    price: "$75.00",
    category: Category.YOGA_FITNESS,
    image: "https://images.unsplash.com/photo-1518310321115-5a982ad340bc?q=80&w=800&auto=format&fit=crop",
    description: "Two-piece ribbed set designed for maximum flexibility and comfort during your yoga flow.",
    fabric: "Ribbed Eco-Cotton Blend",
    care: "Gentle cycle wash. Air dry recommended.",
    colors: ["Lavender", "Dusty Rose", "Oatmeal"]
  },
  {
    id: '4',
    name: "Urban Oversized Blazer",
    price: "$120.00",
    category: Category.TOPS_BOTTOMS,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    description: "A versatile essential for the modern wardrobe. Tailored fit with a relaxed feel.",
    fabric: "Structured Wool Blend",
    care: "Steam iron only. Professional dry clean.",
    colors: ["Charcoal", "Beige", "Cream"]
  },
  {
    id: '5',
    name: "Ethereal Lace Bralette Set",
    price: "$45.00",
    category: Category.LINGERIE,
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800&auto=format&fit=crop",
    description: "Intricately designed floral lace with adjustable straps and soft mesh lining for daily luxury.",
    fabric: "Soft French Lace & Silk Organza",
    care: "Hand wash only. Lay flat to dry.",
    colors: ["Pearl White", "Dusty Rose", "Noir"]
  },
  {
    id: '6',
    name: "Satin Muse Slip Gown",
    price: "$65.00",
    category: Category.LINGERIE,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    description: "A bias-cut satin slip that skims the body perfectly. Minimalist elegance for your quiet hours.",
    fabric: "100% High-Grade Vegan Satin",
    care: "Cool iron on reverse. Hand wash recommended.",
    colors: ["Champagne", "Mauve", "Midnight"]
  },
  {
    id: '7',
    name: "Celine Belted Jumpsuit",
    price: "$110.00",
    category: Category.JUMPSUITS,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    description: "A sophisticated one-piece featuring a cinched waist and wide-leg silhouette. Effortless day-to-night transitions.",
    fabric: "Breathable Linen-Tencel Blend",
    care: "Machine wash delicate. Low heat tumble dry.",
    colors: ["Terracotta", "Olive Green", "Soft Sand"]
  },
  {
    id: '8',
    name: "Active Tech Bodysuit",
    price: "$95.00",
    category: Category.JUMPSUITS,
    image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800&auto=format&fit=crop",
    description: "High-performance compression jumpsuit designed for high-impact training and aesthetic edge.",
    fabric: "Signature 'Strength' Microfiber",
    care: "Wash cold. No fabric softeners.",
    colors: ["Graphite", "Cobalt", "Black"]
  }
];
