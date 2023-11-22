import { API_HOST, CallAPI } from '../CallAPI';

export const requestPreSignedURLUpload = (imageFormat) => new Promise((resolve, reject) => {
  CallAPI({ url: `${API_HOST}/event/upload-request?fileFormat=${imageFormat}` })
    .then((r) => {
      const { url, photoURI } = r;
      resolve({ url, photoURI });
    })
    .catch(() => {
      const error = new Error();
      error.message = 'Gagal request upload foto, silahkan coba beberapa saat lagi!';
      reject(error);
    });
});

export const uploadPhoto = (imageData, preSignedURL, imageURI) => new Promise(async (resolve, reject) => {
  const error = new Error();
  try {
    const { uri } = imageData;

    const image = await fetch(uri);
    const imageBlob = await image.blob();
    const { _data: blobData } = imageBlob;
    const toImageFile = new File([imageBlob], blobData.name);

    const response = await fetch(preSignedURL, {
      method: 'PUT',
      body: toImageFile,
      headers: {
        'Content-Type': blobData.type,
      },
    });

    if (response.ok) {
      resolve({ imageURI });
    } else {
      error.message = 'Gagal mengunggah foto, silahkan coba beberapa saat lagi!';
      reject(error);
    }
  } catch (e) {
    error.message = e.toString();
    reject(error);
  }
});
