export interface MenuItem {
  name: string
  price: number
  description: string
  popular?: boolean
}

export interface MenuCategory {
  name: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    name: 'Antipasti (Appetizers)',
    items: [
      { name: 'Bruschetta al Pomodoro', price: 12, description: 'Grilled bread with fresh tomatoes, basil, and extra virgin olive oil' },
      { name: 'Carpaccio di Manzo', price: 18, description: 'Thinly sliced beef tenderloin with arugula, capers, and Parmesan' },
      { name: 'Burrata Caprese', price: 16, description: 'Creamy burrata with heirloom tomatoes and aged balsamic' },
      { name: 'Calamari Fritti', price: 15, description: 'Crispy fried squid with marinara and lemon aioli' }
    ]
  },
  {
    name: 'Primi (First Courses)',
    items: [
      { name: 'Truffle Carbonara', price: 32, description: 'Fettuccine with pancetta, eggs, Parmigiano, and black truffles', popular: true },
      { name: 'Lobster Ravioli', price: 36, description: 'House-made ravioli filled with Maine lobster in saffron cream sauce' },
      { name: 'Pappardelle Bolognese', price: 28, description: 'Wide ribbon pasta with traditional meat ragù, slow-cooked 8 hours' },
      { name: 'Risotto ai Funghi', price: 26, description: 'Creamy Arborio rice with porcini mushrooms and truffle oil' }
    ]
  },
  {
    name: 'Secondi (Main Courses)',
    items: [
      { name: 'Osso Buco Milanese', price: 48, description: 'Braised veal shanks with saffron risotto and gremolata', popular: true },
      { name: 'Branzino al Forno', price: 42, description: 'Oven-roasted Mediterranean sea bass with lemon and herbs' },
      { name: 'Bistecca Fiorentina', price: 65, description: '24oz Porterhouse steak, grilled rare, with rosemary potatoes (serves 2)' },
      { name: 'Pollo alla Parmigiana', price: 32, description: 'Breaded chicken breast with tomato sauce and melted mozzarella' }
    ]
  },
  {
    name: 'Dolci (Desserts)',
    items: [
      { name: 'Tiramisu Classico', price: 12, description: 'Espresso-soaked ladyfingers with mascarpone cream', popular: true },
      { name: 'Panna Cotta', price: 10, description: 'Vanilla-infused cream with berry compote' },
      { name: 'Cannoli Siciliani', price: 11, description: 'Crispy shells filled with sweet ricotta and chocolate chips' },
      { name: 'Gelato Trio', price: 9, description: 'Three flavors of house-made Italian ice cream' }
    ]
  }
]

export function findMenuItem(name: string): MenuItem | undefined {
  for (const category of menuCategories) {
    const item = category.items.find((i) => i.name === name)
    if (item) return item
  }
  return undefined
}
