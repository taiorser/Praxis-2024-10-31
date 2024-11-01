import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo organization
  const org = await prisma.organization.create({
    data: {
      name: 'Demo Company',
      domain: 'demo.com',
    },
  });

  // Create demo admin user
  await prisma.user.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@demo.com',
      password: await hash('demo1234', 12),
      role: 'ADMIN',
      orgId: org.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });