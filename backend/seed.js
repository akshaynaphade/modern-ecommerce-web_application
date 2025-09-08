require('dotenv').config();
const connectDB = require('./utils/db');
const Item = require('./models/Item');

const items = [
  { name: 'Wireless Headphones', description: 'Over-ear, comfortable', price: 1999, category: 'electronics', image: 'https://images.unsplash.com/photo-1580894908361-6c1fa038b02b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdoaXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MHx8fHwxNjk0Mjg2Njk0&ixlib=rb-4.0.3&q=80&w=300' },
  { name: 'Running Shoes', description: 'Lightweight running shoes', price: 2499, category: 'fashion', image: 'https://images.unsplash.com/photo-1600185362079-1d7a1d4e6c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { name: 'Coffee Mug', description: 'Ceramic 350ml', price: 299, category: 'home', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' },
  { name: 'Smart Watch', description: 'Fitness tracker', price: 4999, category: 'electronics', image: 'https://images.unsplash.com/photo-1603398938378-6c6e9ef7d3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300' }
];

(async () => {
  await connectDB(process.env.MONGO_URI);
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Seeded items');
  process.exit(0);
})();
