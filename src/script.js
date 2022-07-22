import createAppearance from "../api/createAppearance";
import saveAs from "./FileSaver";
import draw from "./index";

createAppearance(draw).then((res) => {
  saveAs(res, "appearance.pdf", true);
});

