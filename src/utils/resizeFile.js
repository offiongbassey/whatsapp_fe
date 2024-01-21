import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      70,
      0,
      
      (base64Image) => {
          const resizedFile = new File([base64Image], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          })
          resolve(resizedFile);
      },
      "base64"
    );
  });