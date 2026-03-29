import { config } from "dotenv";
import Product from "../models/productModel.js";
import { connectDB } from "../config/connectDB.js";
config();
// add faker data for test app
const brands = ["Nike", "Adidas", "Puma", "Skechers"];
const categories = ["men", "women", "child"];

const productNames = {
  Nike: ["Air Max", "Revolution", "Pegasus", "ZoomX", "Flex Runner"],
  Adidas: ["Ultraboost", "NMD", "Superstar", "Forum Low", "Runfalcon"],
  Puma: ["RS-X", "Future Rider", "Suede Classic", "Ignite", "Velocity Nitro"],
  Skechers: ["Go Walk", "D'Lites", "Arch Fit", "Max Cushion", "Flex Appeal"],
};

const images = {
  Nike: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9c8e5b1c-7a3d-4f2e-9a0b-8c6b1e5f1a2c/air-max-270-shoe-KkLcGR.png",
  Adidas:
    "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ultraboost.jpg",
  Puma: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/rsx.jpg",
  Skechers:
    "https://images.skechers.com/image/upload/f_auto,q_auto/global/go-walk.jpg",
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateProducts() {
  const products = [];

  brands.forEach((brand) => {
    for (let i = 0; i < 5; i++) {
      const mrp = Math.floor(Math.random() * 100) + 100;
      const discount = Math.floor(Math.random() * 40) + 10;
      const sellPrice = Math.floor(mrp - (mrp * discount) / 100);

      products.push({
        img: images[brand],
        brand: brand,
        title: `${brand} ${productNames[brand][i]}`,
        rating: +(Math.random() * (5 - 3) + 3).toFixed(1),
        reviews: Math.floor(Math.random() * 2000) + 100,
        sellPrice: sellPrice,
        mrp: mrp,
        discount: discount,
        orders: (Math.floor(Math.random() * 9000) + 1000).toString(),
        category: getRandom(categories),
      });
    }
  });

  return products;
}

const products = generateProducts();

console.log(products);

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.insertMany(products);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
