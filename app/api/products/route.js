import connectMongoDB from '@/libs/mongodb';
import Product from '@/models/products';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, price, color, company, category } = await request.json();
  await connectMongoDB();
  await Product.create({ name, price, color, company, category });
  return NextResponse.json({ message: 'New Product Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const products = await Product.find();
  return NextResponse.json({ products });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
}
