import db from "../Database/index.js";
function ModuleRoutes(app) {
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const course = db.courses
    .filter((c) => c._id === cid );
    const modules = db.modules
      .filter((m) => m.course == course[0].number);
    res.send(modules);
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const course = db.courses
    .filter((c) => c._id === cid );
    const newModule = {
      ...req.body,
      course: course[0].number,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(req.body);
  });

  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex(
      (m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body
    };
    res.sendStatus(204);
  });



}
export default ModuleRoutes;