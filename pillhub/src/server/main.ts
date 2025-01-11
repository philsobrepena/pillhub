import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { Sequelize, Model, DataTypes } from "sequelize";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

// initialize sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch((error) => {
  console.error("Unable to connect to the database:", error);
});

// define supplement model
class Supplement extends Model {}
Supplement.init({
  name: DataTypes.STRING,
  category: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('category');
      return rawValue ? rawValue.split(',') : [];
    },
    set(val: string[]) {
      this.setDataValue('category', val.join(','))
    }
  },
  description: DataTypes.STRING,
}, { sequelize, modelName: "supplement" });

sequelize.sync({force: true}).then(async () => {
  const count = await Supplement.count();
  if (count === 0) {
    await Supplement.bulkCreate([
      {
        name: "Multivitamin for Men",
        category: ["Men", "General", "Vitamins"],
        description: "Complete daily nutrition tailored for men"
      },
      {
        name: "Women's Daily Complex",
        category: ["Women", "General", "Vitamins"],
        description: "Essential nutrients optimized for women's health"
      },
      {
        name: "Children's Gummy Vitamins",
        category: ["Children", "General", "Vitamins"],
        description: "Kid-friendly complete vitamin supplement"
      },
      {
        name: "5-HTP",
        category: ["Mood", "Brain", "Stress"],
        description: "Supports positive mood and emotional well-being"
      },
      {
        name: "Melatonin Complex",
        category: ["Sleep", "Stress", "Hormones"],
        description: "Natural sleep support blend"
      },
      {
        name: "B-Complex + Caffeine",
        category: ["Energy", "Focus", "Vitamins"],
        description: "Sustained energy and metabolism support"
      },
      {
        name: "Lion's Mane + Alpha GPC",
        category: ["Brain", "Focus", "Nootropics"],
        description: "Cognitive function and memory support"
      },
      {
        name: "Vitamin C + Zinc",
        category: ["Immune", "Vitamins", "Minerals"],
        description: "Immune system defense blend"
      },
      {
        name: "Probiotic Complex",
        category: ["Gut", "Digestion", "Wellness"],
        description: "Digestive health and gut flora support"
      },
      {
        name: "Collagen + Biotin",
        category: ["Skin", "Beauty", "Anti-Aging"],
        description: "Skin elasticity and hydration support"
      },
      {
        name: "Biotin + Keratin",
        category: ["Hair", "Beauty", "Vitamins"],
        description: "Hair strength and growth support"
      },
      {
        name: "Green Tea Extract",
        category: ["Weight", "Energy", "Antioxidants"],
        description: "Metabolism and weight management support"
      },
      {
        name: "Turmeric Curcumin",
        category: ["Pain", "Inflammation", "Joints"],
        description: "Natural inflammatory response support"
      },
      {
        name: "Whey Protein Isolate",
        category: ["Muscle", "Protein", "Fitness"],
        description: "Premium protein for muscle growth and strength"
      },
      {
        name: "BCAA Complex",
        category: ["Recovery", "Muscle", "Fitness"],
        description: "Branch chain amino acids for muscle recovery and endurance"
      },
      {
        name: "Creatine Monohydrate",
        category: ["Muscle", "Strength", "Performance"],
        description: "Supports muscle strength, power output and recovery"
      },
    ]);
    console.log("Sample data inserted");
  } else {
    console.log("Data already exists, skipping seed");
  }
});

// parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define routes
app.get("/supplements", async (_, res) => {
  const supplements = await Supplement.findAll();
  res.json(supplements);
});

app.get('/supplements/:id', async (req, res) => {
  const supplement = await Supplement.findByPk(req.params.id);
  res.json(supplement);
});

app.post('/supplements', async (req, res) => {
  const supplement = await Supplement.create(req.body);
  res.json(supplement);
});

app.put('/supplements/:id', async (req, res) => {
  const supplement = await Supplement.findByPk(req.params.id);
  if (supplement) {
    await supplement.update(req.body);
    res.json(supplement);
  } else {
    res.status(404).send('Supplement not found');
  }
});

app.delete('/supplements/:id', async (req, res) => {
  const supplement = await Supplement.findByPk(req.params.id);
  if (supplement) {
    await supplement.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Supplement not found');
  }
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, port, () =>
  console.log("Server is listening on port 3000..."),
);
