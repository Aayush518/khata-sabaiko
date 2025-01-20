import { prisma } from '../db';
import type { Sale, SaleItem } from '@prisma/client';

export async function getSales() {
  return prisma.sale.findMany({
    include: {
      customer: true,
      items: {
        include: {
          stock: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
}

export async function createSale(data: {
  customerId: string;
  items: Array<{
    stockId: string;
    quantity: number;
    price: number;
  }>;
}) {
  const { customerId, items } = data;
  
  // Calculate totals
  const saleItems = items.map(item => ({
    ...item,
    total: item.quantity * item.price
  }));
  
  const total = saleItems.reduce((sum, item) => sum + item.total, 0);
  
  // Create sale with items in a transaction
  return prisma.$transaction(async (tx) => {
    // Create the sale
    const sale = await tx.sale.create({
      data: {
        customerId,
        total,
        items: {
          create: saleItems
        }
      },
      include: {
        customer: true,
        items: {
          include: {
            stock: true
          }
        }
      }
    });
    
    // Update stock quantities
    for (const item of items) {
      await tx.stock.update({
        where: { id: item.stockId },
        data: {
          quantity: {
            decrement: item.quantity
          }
        }
      });
    }
    
    return sale;
  });
}