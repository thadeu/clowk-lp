import Image from 'next/image';
import type { Product } from '@/lib/products';

const SIZES = {
  sm: { box: 'w-8 h-8 rounded-full', image: 22 },
  md: { box: 'w-[52px] h-[52px] rounded-[14px]', image: 38 },
  lg: { box: 'w-[72px] h-[72px] rounded-[20px]', image: 54 },
};

export default function ProductMark({ product, size = 'md' }: { product: Product; size?: keyof typeof SIZES }) {
  const { box, image } = SIZES[size];

  return (
    <span className={`${box} bg-white grid place-items-center flex-none`}>
      <Image src={product.mark} alt="" width={image} height={image} />
    </span>
  );
}
