import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/temp/");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index (0 for January)
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const uniqueSuffix =
      day + "" + month + "" + year + "_" + hours + "" + minutes + "" + seconds;

    // console.log(file.fieldname + "_" + uniqueSuffix + "." + file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix + "." + file.originalname); // file name ki hobe otai
  },
});
// export const upload = multer({ storage, limits: 5 * 1024 * 1024 });
export const upload = multer({ storage });
