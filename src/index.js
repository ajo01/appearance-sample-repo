import createAppearance from "../api/createAppearance";
import saveAs from "./FileSaver";

const draw = (ctx) => {
  // enter canvas methods here!
};

createAppearance(draw).then((res) => {
  saveAs(res, "appearance.pdf", true);
});
