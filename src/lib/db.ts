import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database helper functions
export const db = {
  // Customers
  getCustomers: async () => {
    return await prisma.customer.findMany();
  },
  
  addCustomer: async (data: { name: string; address: string; contact: string }) => {
    return await prisma.customer.create({ data });
  },
  
  updateCustomer: async (id: string, data: { name: string; address: string; contact: string }) => {
    return await prisma.customer.update({ where: { id }, data });
  },
  
  deleteCustomer: async (id: string) => {
    return await prisma.customer.delete({ where: { id } });
  },

  // Stocks
  getStocks: async () => {
    return await prisma.stock.findMany();
  },
  
  addStock: async (data: { name: string; quantity: number; unit: string; unitPrice: number }) => {
    return await prisma.stock.create({ 
      data: {
        ...data,
        unitPrice: new Prisma.Decimal(data.unitPrice)
      }
    });
  },
  
  updateStock: async (id: string, data: { name: string; quantity: number; unit: string; unitPrice: number }) => {
    return await prisma.stock.update({ 
      where: { id },
      data: {
        ...data,
        unitPrice: new Prisma.Decimal(data.unitPrice)
      }
    });
  },
  
  deleteStock: async (id: string) => {
    return await prisma.stock.delete({ where: { id } });
  },

  // Sales
  getSales: async () => {
    return await prisma.sale.findMany({
      include: {
        customer: true,
        items: {
          include: {
            stock: true
          }
        }
      }
    });
  },

  // Purchases
  getPurchases: async () => {
    return await prisma.purchase.findMany({
      include: {
        dealer: true,
        items: true
      }
    });
  }
};