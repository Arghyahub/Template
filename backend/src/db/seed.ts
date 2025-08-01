import prisma from "./prisma";

async function seed() {
  console.log("Started seeding db");
  console.log("Creating Master roles");
  await prisma.accessRole.create({
    data: {
      is_master: true,
      for_type: "owner",
      name: "Owner",
      role: {},
    },
  });

  await prisma.accessRole.create({
    data: {
      is_master: true,
      for_type: "employee",
      name: "Employee",
      role: {},
    },
  });

  await prisma.accessRole.create({
    data: {
      is_master: true,
      for_type: "admin",
      name: "Admin",
      role: {},
    },
  });

  console.log("Creating default roles");
}

seed();
