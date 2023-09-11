import connectMongoDB from '@/libs/mongodb';
import Product from '@/models/products';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newName: name,
    newPrice: price,
    newColor: color,
    newCompany: company,
    newCategory: category,
  } = await request.json();
  await connectMongoDB();
  await Product.findByIdAndUpdate(id, {
    name,
    price,
    color,
    company,
    category,
  });
  return NextResponse.json({ message: 'Product updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
