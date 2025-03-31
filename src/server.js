const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Lấy danh sách sản phẩm
app.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Thêm sản phẩm mới
app.post("/products", async (req, res) => {
  const { name, price, stock, category, rating, reviews } = req.body;
  try {
    await db.query(
      "INSERT INTO products (name, price, stock, category, rating, reviews) VALUES (?, ?, ?, ?, ?, ?)",
      [name, price, stock, category, rating, reviews]
    );
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
