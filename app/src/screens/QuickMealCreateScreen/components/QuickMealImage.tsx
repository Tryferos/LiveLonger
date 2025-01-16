import React, {FC} from 'react';
import {Image} from 'react-native';
import {Column} from '../../../components/elements/Column';
import {CustomIcon} from '../../../components/elements/CustomIcon';
import {Row} from '../../../components/elements/Row';
import {IconButton} from '../../../components/organisms/IconButton';
import {RoundButton} from '../../../components/organisms/RoundButton';
import {AppBorderRadius, AppColors} from '../../../constants/values';
import {ImageData, useGaleryPicker} from '../../../hooks/useGaleryPicker';
type Props = {
  imageData: ImageData | null;
  setImageData: React.Dispatch<React.SetStateAction<ImageData | null>>;
  clearImage: () => void;
  imageUrl?: string;
};
export const QuickMealImage: FC<Props> = ({
  imageData,
  setImageData,
  clearImage,
  imageUrl,
}) => {
  const photo = imageData?.uri ?? imageUrl;
  const {getImageFromGallery} = useGaleryPicker();
  const selectImage = async () => {
    const images = await getImageFromGallery();
    if (images.length > 0) {
      setImageData(images[0]);
    }
  };
  return (
    <Column>
      <Row
        onPress={selectImage}
        className="w-[100%] h-[32.5vh]"
        style={{
          borderColor: AppColors.gray,
          borderWidth: photo ? 0 : 2,
          borderRadius: AppBorderRadius.normal,
        }}>
        <Column className="w-full h-full items-center justify-center">
          {photo ? (
            <Image
              resizeMode="contain"
              source={{uri: photo}}
              style={{
                width: '99%',
                height: '99%',
                borderRadius: AppBorderRadius.normal,
              }}
            />
          ) : (
            <CustomIcon size="3xl" icon="photo" color="gray" />
          )}
        </Column>
      </Row>
      <Row className="w-full py-2 justify-between">
        <RoundButton
          style={{flexBasis: '82%'}}
          paddingVertical="2xs"
          text={'Upload a photo'}
          onPress={selectImage}
        />
        <IconButton icon="delete" color="error" onPress={() => clearImage()} />
      </Row>
    </Column>
  );
};
