import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
type Props = {
  limit?: number;
};

export type ImageData = {
  uri: string;
  imageData: Uint8Array;
};
export const useGaleryPicker = (props?: Props) => {
  const limit = props?.limit ?? 1;
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: true,
    selectionLimit: limit,
  };
  const getImageFromGallery = async () => {
    const res = await launchImageLibrary(options);
    let data: ImageData[] = [];
    for (const selection of res?.assets ?? []) {
      const base64 = selection.base64;
      let imageData: Uint8Array | null = null;
      if (!base64 || !selection.uri) {
        continue;
      } else {
        imageData = new Uint8Array(
          atob(base64)
            .split('')
            .map(c => c.charCodeAt(0)),
        );
        data.push({uri: selection.uri, imageData: imageData});
      }
    }
    return data;
  };
  return {getImageFromGallery};
};
