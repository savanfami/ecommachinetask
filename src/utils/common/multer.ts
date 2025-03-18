import multer from 'multer'

const storage = multer.diskStorage({
    destination: "src/asset/profileImages",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}`
      );
    },
  });


  export const upload = multer({ storage: storage });

  
