import { ImageCreateResultDto } from './../interfaces/image/ImageCreateResultDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 이미지 업로드
const uploadImage = async (location: string): Promise<ImageCreateResultDto> => {
  const data = await prisma.image.create({
    data: {
      image: location,
    },
  });

  const result: ImageCreateResultDto = {
    id: data.id,
    image: data.image as string,
  };

  return result;
};

const imageService = {
  uploadImage,
};

export default imageService;
