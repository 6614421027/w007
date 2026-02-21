import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';


export async function GET() {
  try {
    const products = await executeQuery<{}>(
      'SELECT year(release_date) release_year,sum(total_gross) sum_total_gross FROM `topopening` group by year(release_date) order by year(release_date);'
    );
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}
