import { PrismaClient } from "@prisma/client";
import { encrypt } from "../utils/bcrypt.utils.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeders in DB");
  // start seed rol
  const passwordHash = await encrypt("12345678");
  const rol1 = await prisma.rol.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Admin",
      user: {
        create: {
          name: "Roy Ramirez Pineda",
          email: "roy@gmail.com",
          password: passwordHash,
          imageSecureUrl:
            "https://res.cloudinary.com/dwn7fonh6/image/upload/v1661311142/samples/people/smiling-man.jpg",
          imagePublicId: "",
        },
      },
    },
  });
  const rol2 = await prisma.rol.upsert({
    where: { id: 2 },
    update: {},
    create: { name: "Organizador" },
  });
  const rol3 = await prisma.rol.upsert({
    where: { id: 3 },
    update: {},
    create: { name: "Fotografo" },
  });
  const rol4 = await prisma.rol.upsert({
    where: { id: 4 },
    update: {},
    create: { name: "Cliente" },
  });
  // end seed rol

  // start seed user
  // const user = await prisma.user.upsert({
  //   where: { id: 2 },
  //   update: {},
  //   create: {
  //     name: "Roy Ramirez Pineda",
  //     email: "roy@gmail.com",
  //     password: passwordHash,
  //     imageSecureUrl:
  //       "https://res.cloudinary.com/dwn7fonh6/image/upload/v1661311142/samples/people/smiling-man.jpg",
  //     imagePublicId: "",
  //     tokenMovil: "",
  //     rolId: rol2.id,
  //   },
  // });
  // end seed user
  console.log("Seeder implements successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
